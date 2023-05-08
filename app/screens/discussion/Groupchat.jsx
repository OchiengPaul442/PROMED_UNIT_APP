import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// constants
import {COLORS} from '../../constants';

// components
import {
  FocusedStatusBar,
  BackBtn,
  Menu,
  SendIcon,
  RoundLoadingAnimation,
} from '../../components';
import Styles from '../../constants/Styles';

// fetch function
import {sendLiveChatMessage, fetchLiveChatMessages} from '../../../fireStore';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Groupchat = ({route, navigation}) => {
  // get params
  const {groupdata} = route.params;

  // context
  const {setErrorStatus, setError} = useContext(AuthContext);

  // current user
  const currentUser = auth().currentUser;

  // set loading
  const [loading, setLoading] = React.useState(false);

  // text input
  const [message, setMessage] = React.useState(''); // message
  const [pastMessages, setPastMessages] = React.useState([]); // past messages

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

  // handle send message
  const handleSendMessage = () => {
    sendLiveChatMessage(
      setErrorStatus,
      setError,
      groupkey,
      message,
      setMessage,
    );
  };

  // function to delete all messages
  // const deleteAllMessages = () => {
  //   firestore()
  //     .collection('Groups')
  //     .doc(groupkey)
  //     .collection('Messages')
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(documentSnapshot => {
  //         documentSnapshot.ref.delete();
  //       });
  //     });
  // };

  React.useEffect(() => {
    // deleteAllMessages();
    // fetch messages
    fetchLiveChatMessages(setLoading, setPastMessages, groupdata);
  }, []);

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
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.navigate('Groups')}>
            <BackBtn width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.white,
              }}>
              {groupdata.name}
            </Text>
          </View>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.navigate('Groupdetails', {groupdata})}>
            <Menu width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.Content}>
          <View style={Styles.chats}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                  inverted={true}
                  keyExtractor={item => item.id}
                  extraData={pastMessages}
                  renderItem={({item}) =>
                    item.userId === currentUser.uid ? (
                      <Text key={item.id} style={Styles.rightChat}>
                        {item.message}
                        <Text style={Styles.timestamp}>
                          {moment(item.createdAt).format('h:mm a')}
                        </Text>
                      </Text>
                    ) : (
                      <Text key={item.id} style={Styles.leftChat}>
                        {item.message}
                        <Text style={Styles.timestamp}>
                          {moment(item.createdAt).format('h:mm a')}
                        </Text>
                      </Text>
                    )
                  }
                />
              )}
            </ScrollView>
          </View>
          {/* message input */}
          <View
            style={{
              bottom: keyboardHeight2 ? 18 : 2,
              ...Styles.inputfield_con,
            }}>
            <TextInput
              onChangeText={setMessage}
              value={message}
              placeholder="Ask me..."
              style={Styles.inputfield}
            />
            <TouchableOpacity onPress={handleSendMessage}>
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
