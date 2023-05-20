// imports
import React, {useContext} from 'react';
import {Text, View, FlatList} from 'react-native';
import moment from 'moment';

// context
import {AuthContext} from '../../navigations/Context/AuthContext'; // a context for the authentication state

// constants
import {COLORS} from '../../constants'; // predefined colors for the app
import Styles from '../../constants/Styles'; // custom styles for the app

// components
import {RoundLoadingAnimation} from '../../components'; // components for the status bar, buttons, icons and loading animation

// fetch function
import {sendLiveChatMessage, fetchLiveChatMessages} from '../../../fireStore'; // functions to interact with the live chat messages in firestore

// firebase
import auth from '@react-native-firebase/auth'; // a module for the firebase authentication
import firestore from '@react-native-firebase/firestore'; // a module for the firestore database

// layout
import ChatScreen from '../../layout/ChatScreen';

const Groupchat = ({route, navigation}) => {
  // get params
  const {groupdata} = route.params;

  // context
  const {setErrorStatus, setError} = useContext(AuthContext);

  // current user
  const currentUser = auth().currentUser;

  // set loading
  const [loading, setLoading] = React.useState(true);

  // text input
  const [message, setMessage] = React.useState(''); // message
  const [pastMessages, setPastMessages] = React.useState([]); // past messages

  // handle send message
  const handleSendMessage = () => {
    sendLiveChatMessage(
      setErrorStatus,
      setError,
      groupdata,
      message,
      setMessage,
    );
  };

  React.useEffect(() => {
    // get the current user id
    const uid = auth().currentUser.uid;

    // get the group document reference
    const groupRef = firestore().collection('Groups').doc(groupdata.key);

    // get the messages collection reference
    const messagesRef = groupRef
      .collection('Messages')
      .orderBy('createdAt', 'desc');

    // use onSnapshot to listen for changes in the group document
    const unsubscribeGroup = groupRef.onSnapshot(
      doc => {
        // get the members array from the document data
        const members = doc.data().Number_of_Members;

        // get userId from members array
        const isMember = members.some(member => member.userId === uid);

        // check if the user is a member of the group
        if (isMember) {
          // use onSnapshot to listen for changes in the messages collection
          const unsubscribeMessages = messagesRef.onSnapshot(
            querySnapshot => {
              const messages = [];
              querySnapshot.forEach(documentSnapshot => {
                messages.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
              setPastMessages(messages);

              // set loading to false
              setLoading(false);
            },
            error => {
              // handle error here
              console.error(error);
            },
          );

          // detach the messages listener
          return () => unsubscribeMessages();
        } else {
          // clear the past messages state if user is not a member
          setPastMessages([]);

          // set loading to false
          setLoading(false);
        }
      },
      error => {
        // handle error here
        console.error(error);

        // set loading to false
        setLoading(false);
      },
    );

    // detach the group listener
    return () => unsubscribeGroup();
  }, []);

  return (
    <ChatScreen
      nav={navigation}
      title={groupdata.name}
      data={groupdata}
      setMess={setMessage}
      text={message}
      nav_route="Groupdetails"
      submit={handleSendMessage}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <RoundLoadingAnimation width={80} height={80} />
        </View>
      ) : pastMessages.length === 0 ? (
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
          data={pastMessages}
          scrollEnabled={false}
          inverted={true}
          keyExtractor={item => item.key}
          extraData={pastMessages}
          renderItem={({item}) => (
            <View key={item.key}>
              <Text
                style={
                  item.userId === currentUser.uid
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

export default Groupchat;
