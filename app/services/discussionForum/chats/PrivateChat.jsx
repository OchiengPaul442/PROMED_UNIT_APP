import React, {useRef} from 'react';
import {View, Text, FlatList} from 'react-native';
import moment from 'moment';

// context
import {AuthContext} from '../../../navigations/Context/AuthContext'; // a context for the authentication state

// constants
import {COLORS} from '../../../constants'; // predefined colors for the app
import Styles from '../../../constants/Styles'; // custom styles for the app

// components
import {RoundLoadingAnimation} from '../../../components'; // components for the status bar, buttons, icons and loading animation

//layout
import ChatScreen from '../../../layout/ChatScreen';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {sendPrivateMessage} from '../../../../fireStore';

const PrivateChat = ({navigation, route}) => {
  // context
  const {setErrorStatus, setError} = React.useContext(AuthContext);

  // current user
  const currentuser = auth().currentUser;

  // get params
  const {
    therapistId,
    userUid,
    therapistImage,
    therapistName,
    userName,
    userImage,
  } = route.params;
  // SCROLL TO BOTTOM
  // const scrollRef = useRef();

  // text input
  const [text, onChangeText] = React.useState('');

  // message
  const [message, setMessage] = React.useState([]);

  // use useEffect hook to fetch messages on component mount
  React.useEffect(() => {
    // create a reference to the document that contains the messages
    const RefDoc = firestore()
      .collection('Therapists')
      .doc(therapistId)
      .collection('PrivateMessages')
      .doc(`${userUid}-${therapistId}`);

    // attach a listener to get the current data and listen for updates
    const unsubscribe = RefDoc.onSnapshot(doc => {
      // check if document exists
      if (doc.exists) {
        // extract the messages array from the document data
        const messagesData = doc.data().messages;

        // sort the messages by timestamp in descending order
        const sortedMessages = messagesData.sort(
          (a, b) => b.createdAt - a.createdAt,
        );

        // update the state variable with the sorted messages array
        setMessage(sortedMessages);

        // scroll to bottom
        // scrollRef.current.scrollToEnd({animated: true});
      }
    });

    // unsubscribe when unmounting
    return () => unsubscribe();
  }, [therapistId, userUid]);

  // handle private chat
  const handlePrivateChat = () => {
    sendPrivateMessage(
      setErrorStatus,
      setError,
      text,
      therapistId,
      therapistName,
      therapistImage,
      userName,
      userImage,
      userUid,
    );

    // clear text input
    onChangeText('');
  };

  return (
    <ChatScreen
      // scrollBottom={scrollRef}
      title="Private Chat"
      nav={navigation}
      text={text}
      setMess={onChangeText}
      submit={handlePrivateChat}>
      {message.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text style={{color: COLORS.black}}>No messages yet...</Text>
        </View>
      ) : (
        <FlatList
          data={message}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          inverted={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View key={index}>
              <Text
                style={
                  item.user._id === currentuser.uid
                    ? Styles.rightChat
                    : Styles.leftChat
                }>
                {item.message + ' '}
                <Text style={Styles.timestamp}>
                  {moment(item.createdAt).format('h:mm a')}
                </Text>
              </Text>
            </View>
          )}
        />
      )}
    </ChatScreen>
  );
};

export default PrivateChat;
