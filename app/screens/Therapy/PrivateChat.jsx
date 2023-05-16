import React from 'react';
import {View, Text} from 'react-native';

// constants
import {COLORS} from '../../constants'; // predefined colors for the app
import Styles from '../../constants/Styles'; // custom styles for the app

//layout
import ChatScreen from '../../layout/ChatScreen';

const PrivateChat = ({navigation}) => {
  // text input
  const [text, onChangeText] = React.useState('');

  return (
    <ChatScreen
      title="Private Chat"
      nav={navigation}
      text={text}
      submit={onChangeText}>
      <Text style={Styles.leftChat}>Hello world</Text>
      <Text style={Styles.rightChat}>Hello world</Text>
    </ChatScreen>
  );
};

export default PrivateChat;
