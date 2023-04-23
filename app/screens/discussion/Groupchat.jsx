import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import {FocusedStatusBar, BackBtn, SendIcon} from '../../components';

const Groupchat = ({route, navigation}) => {
  // text input
  const [text, onChangeText] = React.useState('');

  // get params
  const {groupname} = route.params;

  // Define a state variable to store the keyboard height
  const [keyboardStatus, setKeyboardStatus] = React.useState(0);

  // hide navigator on this screen
  React.useEffect(() => {
    // detect keyoard and get its height
    const keyboardOpen = Keyboard.addListener('keyboardDidShow', () => {
      // Set the keyboard height to the endCoordinates.height of the event
      setKeyboardStatus(1);
    });
    const keyboardClosed = Keyboard.addListener('keyboardDidHide', () => {
      // Set the keyboard height back to zero
      setKeyboardStatus(0);
    });

    // hide bottom tab
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    return () => {
      // Remove the listeners when the component is unmounted
      keyboardOpen.remove();
      keyboardClosed.remove();

      // for Bottom tab
      navigation.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />

      <View style={styles.groupchat_screen}>
        {/* Head */}
        <View
          style={{
            padding: 10,
            display: 'flex',
            width: '100%',
            height: '8%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={(padding = 10)}
            onPress={() => navigation.goBack()}>
            <BackBtn width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.white,
              }}>
              {groupname}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.Content}>
          <View style={styles.chats}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.leftChat}>Hello world</Text>
              <Text style={styles.rightChat}>Hello world</Text>
            </ScrollView>
          </View>
          <View
            style={{bottom: keyboardStatus ? 18 : 2, ...styles.inputfield_con}}>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              placeholder="Ask me..."
              style={styles.inputfield}
            />
            <TouchableOpacity>
              <SendIcon width={50} height={50} fill={COLORS.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Groupchat;

const styles = StyleSheet.create({
  // This is the main container that holds all the components
  groupchat_screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.primary,
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

  chats: {
    position: 'relative',
    width: '100%',
    height: '92%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
  },

  inputfield_con: {
    position: 'relative',
    width: '100%',
    height: 50,
    paddingHorizontal: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputfield: {
    width: '100%',
    height: 45,
    position: 'relative',
    padding: 10,
    backgroundColor: COLORS.darkGray,
    borderRadius: 10,
  },

  leftChat: {
    color: COLORS.white,
    width: 'auto',
    height: 'auto',
    textAlign: 'left',
    padding: 15,
    marginBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLORS.cyan,
  },

  rightChat: {
    color: COLORS.white,
    width: 'auto',
    height: 'auto',
    textAlign: 'right',
    padding: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.tertiary,
  },
});
