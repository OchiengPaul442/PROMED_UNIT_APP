// imports
import React from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// constants
import Styles from '../../constants/Styles'; // custom styles for the app

// layout
import ChatScreen from '../../layout/ChatScreen';

const Bot = ({navigation}) => {
  // text input
  const [text, onChangeText] = React.useState('');

  // useFocusEffect hook
  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener('focus', () => {
        navigation.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      });

      return () => {
        // Show bottom navigator when this screen is unfocused
        navigation.setOptions({
          tabBarStyle: Styles.menuBar,
        });
      };
    }, [navigation]),
  );

  return (
    <ChatScreen
      title="PRO-Bot"
      nav={navigation}
      text={text}
      submit={onChangeText}>
      <Text style={Styles.leftChat}>Hello world</Text>
      <Text style={Styles.rightChat}>Hello world</Text>
    </ChatScreen>
  );
};

export default Bot;
