import React, {useRef} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import moment from 'moment';
import {AuthContext} from '../../../navigations/Context/AuthContext';
import {COLORS} from '../../../constants';
import Styles from '../../../constants/Styles';
import {RoundLoadingAnimation} from '../../../components';
import ChatScreen from '../../../layout/ChatScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {sendPrivateMessage} from '../../../../fireStore';

const PrivateChat = ({navigation, route}) => {
  const {setErrorStatus, setError} = React.useContext(AuthContext);
  const currentUser = auth().currentUser;
  const {
    therapistId,
    userUid,
    therapistImage,
    therapistName,
    userName,
    userImage,
  } = route.params;
  const [text, onChangeText] = React.useState('');
  const [message, setMessage] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState([]);

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

  React.useEffect(() => {
    getUserData();

    const RefDoc = firestore()
      .collection('Therapists')
      .doc(therapistId)
      .collection('PrivateMessages')
      .doc(`${userUid}-${therapistId}`);

    const unsubscribe = RefDoc.onSnapshot(doc => {
      setLoading(true);
      if (doc.exists) {
        const messagesData = doc.data().messages;
        setMessage(messagesData);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [therapistId, userUid]);
  console.log(message);
  return (
    <ChatScreen
      title="Private Chat"
      nav={navigation}
      text={text}
      setMess={onChangeText}
      submit={handlePrivateChat}>
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
      ) : message.length === 0 ? (
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
          scrollEnabled={false}
          inverted={false}
          keyExtractor={item => item.key}
          extraData={message}
          renderItem={({item}) =>
            userData.length > 0 &&
            userData.map(data => {
              if (item.user._id === data.key)
                return (
                  <View
                    key={Math.random()}
                    style={
                      currentUser.uid === item.user._id
                        ? styles.containerRight
                        : styles.container
                    }>
                    {currentUser.uid === item.user._id ? null : (
                      <Image
                        source={{uri: data.photoURL}}
                        style={
                          currentUser.uid === item.user._id
                            ? styles.photoRight
                            : styles.photo
                        }
                      />
                    )}
                    <View
                      style={
                        currentUser.uid === item.user._id
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
                          currentUser.uid === item.user._id
                            ? styles.messageRight
                            : styles.message
                        }>
                        {item.message}
                      </Text>
                      <Text
                        style={
                          currentUser.uid === item.user._id
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

export default PrivateChat;
