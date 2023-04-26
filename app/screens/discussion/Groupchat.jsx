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
import {useFocusEffect} from '@react-navigation/native';
import Styles from '../../constants/Styles';

const Groupchat = ({route, navigation}) => {
  // text input
  const [text, onChangeText] = React.useState('');

  // get params
  const {groupname} = route.params;

  // Height of the keyboard
  const [keyboardHeight2, setKeyboardHeight2] = React.useState(0);

  // Keyboard event
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight2(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight2(0);
    });
  }, []);

  // useFocusEffect hook
  useFocusEffect(
    React.useCallback(() => {
      // Hide bottom navigator when this screen is focused
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });

      return () => {
        // Show bottom navigator when this screen is unfocused
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.menuBar,
        });
      };
    }, [navigation]),
  );

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
            onPress={() => navigation.push('Groups')}>
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
          <View style={Styles.chats}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={Styles.leftChat}>Hello world</Text>
              <Text style={Styles.rightChat}>Hello world</Text>
            </ScrollView>
          </View>
          <View
            style={{
              bottom: keyboardHeight2 ? 18 : 2,
              ...Styles.inputfield_con,
            }}>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              placeholder="Ask me..."
              style={Styles.inputfield}
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
  menuBar: {
    position: 'absolute',
    bottom: 3,
    marginHorizontal: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  },
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
});
