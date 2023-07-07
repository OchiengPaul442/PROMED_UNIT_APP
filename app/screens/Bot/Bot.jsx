// imports
import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// constants
import Styles from '../../constants/Styles'; // custom styles for the app

// layout
import ChatScreen from '../../layout/ChatScreen';

// import axios
import axios from 'axios';

// create a custom component for each chat message
const ChatMessage = ({sender, text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
      }}>
      <Text
        style={{
          fontSize: 14,
          color: sender === 'user' ? 'black' : 'grey',
          fontFamily: 'Montserrat-Regular',
          textAlign: sender === 'user' ? 'right' : 'left',
          padding: 10,
          borderRadius: 10,
          backgroundColor: sender === 'user' ? '#e6e6e6' : '#f2f2f2',
          margin: 10,
          width: 'auto',
        }}>
        {text}
      </Text>
    </View>
  );
};

// create the main component for the bot
const Bot = ({navigation}) => {
  // text input
  const [text, setText] = useState('');
  // message
  const [messages, setMessages] = useState([
    {sender: 'bot', text: 'Hello, I am a chatbot here to help you.'},
  ]);
  // loading
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://cynthias-api.onrender.com';

  const api = axios.create({
    baseURL: `${BASE_URL}/chat`,
  });

  const onChangeText = async () => {
    setMessages([...messages, {sender: 'user', text}]);
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
      // keep adding the response to the messages array
      setMessages([...messages, {sender: 'bot', text: res.data.response}]);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 504) {
        alert('Please try again');
      }
      console.log(err);
      setLoading(false);
    }
  };

  // code to hide the bottom tab bar
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

  console.log('ll', messages);

  return (
    <ChatScreen
      title="Bot"
      nav={navigation}
      setMess={setText}
      text={text}
      submit={onChangeText}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          // use the custom component for each message
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))
      ) : (
        <View>
          <Text
            style={{
              fontSize: 14,
              color: 'grey',
              fontFamily: 'Montserrat-Regular',
              textAlign: 'left',
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#f2f2f2',
              margin: 10,
              width: 'auto',
            }}>
            No responses yet
          </Text>
        </View>
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading...</Text>
        </View>
      )}
    </ChatScreen>
  );
};

export default Bot;
