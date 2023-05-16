// imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// constants
import {COLORS} from '../constants'; // predefined colors for the app
import Styles from '../constants/Styles'; // custom styles for the app

// components
import {FocusedStatusBar, BackBtn, DetailsIcon, SendIcon} from '../components'; // components for the status bar, buttons, icons and loading animation

const ChatScreen = ({
  nav,
  title,
  data,
  nav_route,
  children,
  setMess,
  text,
  submit,
}) => {
  // Height of the keyboard
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  // Keyboard event
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
  }, []);

  // useFocusEffect hook
  useFocusEffect(
    React.useCallback(() => {
      nav.addListener('focus', () => {
        nav.getParent()?.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      });

      return () => {
        // Show bottom navigator when this screen is unfocused
        nav.getParent()?.setOptions({
          tabBarStyle: Styles.menuBar,
        });
      };
    }, [nav]),
  );

  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />

      <View style={styles.chat_screen}>
        {/* Head */}
        <View style={styles.nav}>
          <TouchableOpacity style={{padding: 10}} onPress={() => nav.goBack()}>
            <BackBtn width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
          <View>
            <Text style={styles.chatName}>{title}</Text>
          </View>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() =>
              nav_route && data ? nav.navigate(nav_route, {data}) : null
            }>
            <DetailsIcon width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.Content}>
          <View style={Styles.chats}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </View>
          {/* message input */}
          <View
            style={{
              display: 'flex',
              bottom: keyboardHeight ? 18 : 2,
              ...Styles.inputfield_con,
            }}>
            <TextInput
              onChangeText={setMess}
              value={text}
              placeholder="Message..."
              style={Styles.inputfield}
            />
            <TouchableOpacity onPress={submit}>
              <SendIcon width={50} height={50} fill={COLORS.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  // This is the main container that holds all the components
  chat_screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },

  // navigation
  nav: {
    padding: 10,
    display: 'flex',
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // chat name
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // This is the Content that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '92%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
