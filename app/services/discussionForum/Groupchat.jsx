// imports
import React, {useContext, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import moment from 'moment';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

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

  useEffect(() => {
    fetchLiveChatMessages(
      setErrorStatus,
      setError,
      groupdata,
      setPastMessages,
      setLoading,
    );
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
