import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import Styles from '../../constants/Styles';
import ChatScreen from '../../layout/ChatScreen';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import bot from '../../assets/images/bot.png';

// create a custom component for each chat message
const ChatMessage = ({sender, botName, text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={sender === 'user' ? styles.containerRight : styles.container}>
        {sender === 'user' ? null : (
          <Image
            source={bot}
            style={sender === 'user' ? styles.photoRight : styles.photo}
          />
        )}
        <View
          style={
            sender === 'user'
              ? styles.messageContainerRight
              : styles.messageContainer
          }>
          <Text
            style={sender === 'user' ? styles.userNameRight : styles.userName}>
            {sender === 'user' ? auth().currentUser.displayName : botName}
          </Text>
          <Text
            style={sender === 'user' ? styles.messageRight : styles.message}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ChatBot = ({navigation}) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('Sunny');
  const [messages, setMessages] = useState([
    {
      sender: `${name}`,
      text: `Hi, I'm ${name}. How can I help you?`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://cynthias-api.onrender.com';

  const api = axios.create({
    baseURL: `${BASE_URL}/chat`,
  });

  const onChangeText = async () => {
    // Add the user's message to the messages array
    setMessages(prevMessages => [...prevMessages, {sender: 'user', text}]);
    setText('');
    setLoading(true);
    try {
      const res = await api.post('', {
        messages: [
          {
            role: 'user',
            content: text,
          },
        ],
      });

      // Add the bot's response to the messages array
      setMessages(prevMessages => [
        ...prevMessages,
        {sender: res.data.messages[1].role, text: res.data.messages[1].content},
      ]);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 504) {
        alert('Please try again');
      }
      console.log(err);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener('focus', () => {
        navigation.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      });
      navigation.addListener('blur', () => {
        navigation.setOptions({
          tabBarStyle: {
            display: 'flex',
          },
        });
      });
    }, [navigation]),
  );

  return (
    <ChatScreen
      title={name}
      nav={navigation}
      setMess={setText}
      text={text}
      submit={onChangeText}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <ChatMessage
            key={index}
            botName={name}
            sender={message.sender}
            text={message.text}
          />
        ))
      ) : (
        <View>
          <Text>No responses yet</Text>
        </View>
      )}
      {loading && (
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
          }}>
          <Text>Loading...</Text>
        </View>
      )}
    </ChatScreen>
  );
};

export default ChatBot;

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
    marginRight: 55,
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  messageContainerRight: {
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
