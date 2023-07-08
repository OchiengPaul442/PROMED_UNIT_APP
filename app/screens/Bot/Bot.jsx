import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Styles from '../../constants/Styles';
import ChatScreen from '../../layout/ChatScreen';
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
          color: '#000',
          fontFamily: 'Montserrat-Regular',
          textAlign: sender === 'user' ? 'right' : 'left',
          padding: 10,
          borderRadius: 10,
          backgroundColor:
            sender === 'user' ? '#e6e6e6' : '#rgba(202,11, 132, 0.1)',
          margin: 10,
          width: 'auto',
        }}>
        {text}
      </Text>
    </View>
  );
};

const Bot = ({navigation}) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    {sender: 'bot', text: 'Hello, I am a chatbot here to help you.'},
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
        {sender: 'bot', text: res.data.response},
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
      title="Bot"
      nav={navigation}
      setMess={setText}
      text={text}
      submit={onChangeText}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <ChatMessage
            key={index}
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

export default Bot;
