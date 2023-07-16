// imports
import React, {useContext, useEffect} from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import moment from 'moment';
import {AuthContext} from '../../navigations/Context/AuthContext';
import {COLORS} from '../../constants';
import {RoundLoadingAnimation} from '../../components';
import {sendLiveChatMessage} from '../../../fireStore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ChatScreen from '../../layout/ChatScreen';

const Groupchat = ({route, navigation}) => {
  // get params
  const {groupdata} = route.params;
  const {setErrorStatus, setError} = useContext(AuthContext);
  const currentUser = auth().currentUser;
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [pastMessages, setPastMessages] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

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

  const getUserData = async () => {
    setLoading(true);
    const users = [];
    const querySnapshot = await firestore().collection('Users').get();
    querySnapshot.forEach(documentSnapshot => {
      users.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
    });
    setUserData(users);
    setLoading(false);
  };
  const fetchLiveChatMessages = () => {
    return firestore()
      .collection('Groups')
      .doc(groupdata.key)
      .collection('Messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(documentSnapshot => {
          messages.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setPastMessages(messages);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
    const unsubscribe = fetchLiveChatMessages();
    return () => unsubscribe();
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
      {loading && userData ? (
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
          inverted={false}
          keyExtractor={item => item.key}
          extraData={pastMessages}
          renderItem={({item}) =>
            userData.length > 0 &&
            userData.map(data => {
              if (item.userId === data.key)
                return (
                  <View
                    key={item.key}
                    style={
                      currentUser.uid === item.userId
                        ? styles.containerRight
                        : styles.container
                    }>
                    {currentUser.uid === item.userId ? null : (
                      <Image
                        source={{uri: data.photoURL}}
                        style={
                          currentUser.uid === item.userId
                            ? styles.photoRight
                            : styles.photo
                        }
                      />
                    )}
                    <View
                      style={
                        currentUser.uid === item.userId
                          ? styles.messageContainerRight
                          : styles.messageContainer
                      }>
                      <Text
                        style={
                          currentUser.uid === item.userId
                            ? styles.userNameRight
                            : styles.userName
                        }>
                        {data.userName}
                      </Text>
                      <Text
                        style={
                          currentUser.uid === item.userId
                            ? styles.messageRight
                            : styles.message
                        }>
                        {item.message}
                      </Text>
                      <Text
                        style={
                          currentUser.uid === item.userId
                            ? styles.timeRight
                            : styles.time
                        }>
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  </View>
                );
            })
          }
        />
      )}
    </ChatScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  containerRight: {
    flexDirection: 'row-reverse',
    marginVertical: 8,
  },
  photo: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 8,
  },
  photoRight: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginLeft: 8,
  },
  messageContainer: {
    // flex: 1,
    width: 'auto',
    marginRight: 17,
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  messageContainerRight: {
    // flex: 1,
    width: 'auto',
    marginRight: 10,
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.black,
  },
  userNameRight: {
    textAlign: 'right',
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,
  },
  message: {
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  messageRight: {
    textAlign: 'right',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  time: {
    alignSelf: 'flex-end',
    color: '#808080',
    fontSize: 12,
  },
  timeRight: {
    alignSelf: 'flex-start',
    color: '#808080',
    fontSize: 12,
  },
});

export default Groupchat;
