import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

// context
import {AuthContext} from '../../../navigations/Context/AuthContext';

import moment from 'moment';

// styles
import Styles from '../../../constants/Styles';

// layout
import Screen2 from '../../../layout/Screen2';
import {COLORS} from '../../../constants';

// fetch functions
import {fetchPrivateChats, fetchUserPrivateChats} from '../../../../fireStore';

// firebase
import auth from '@react-native-firebase/auth';

// components
import {RoundLoadingAnimation} from '../../../components'; // components for the status bar, buttons, icons and loading animation

const PrivateChatList = ({navigation}) => {
  // get user from context
  const {userData} = React.useContext(AuthContext);

  // fetch private chats
  const [privateChats, setPrivateChats] = React.useState([]);

  // current user
  const currentUser = auth().currentUser;

  // set loading animation
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (userData.userType !== 'Therapist') {
      fetchUserPrivateChats(setPrivateChats, setLoading);
    } else {
      fetchPrivateChats(setPrivateChats, setLoading);
    }
  }, [userData.userType]);

  return (
    <Screen2
      nav={navigation}
      title="Private Chat List"
      data={undefined}
      nav_route={undefined}>
      {/* display list of private chats */}
      <View style={styles.container}>
        {loading ? (
          <RoundLoadingAnimation
            style={{marginTop: 50}}
            size={100}
            color={COLORS.primary}
          />
        ) : privateChats.length === 0 ? (
          <Text style={{...Styles.title2, textAlign: 'center', marginTop: 50}}>
            No private chats
          </Text>
        ) : (
          privateChats.map(chat => (
            <TouchableOpacity
              key={chat.key}
              style={styles.card}
              onPress={() =>
                navigation.navigate('PrivateChats', {
                  therapistId: chat.therapistId,
                  therapistName: chat.therapistName,
                  therapistImage: chat.therapistImage,
                  userUid:
                    userData.userType !== 'Therapist'
                      ? currentUser.uid
                      : chat.userId,
                  userName:
                    userData.userType !== 'Therapist'
                      ? userData.userName
                      : chat.userName,
                  userImage:
                    userData.userType !== 'Therapist'
                      ? userData.photoURL
                      : chat.userImage,
                })
              }>
              <View style={styles.img}>
                <Image
                  style={styles.userImg}
                  source={{
                    uri:
                      userData.userType !== 'Therapist'
                        ? chat.therapistImage
                        : chat.userImage,
                  }}
                />
              </View>
              <View style={{flex: 1, ...styles.details}}>
                <Text style={Styles.title2}>
                  {userData.userType !== 'Therapist'
                    ? chat.therapistName
                    : chat.userName}
                </Text>
                <Text style={Styles.text}>
                  {chat.lastMessage.substring(0, 35) + '...'}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 5,
                    ...Styles.text,
                  }}>
                  {moment(chat.lastMessageTime).format('hh:mm A')}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </Screen2>
  );
};

export default PrivateChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    height: '100%',
    width: '100%',
  },

  card: {
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
  },

  img: {
    width: 75,
    height: 75,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 40,
  },

  userImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  details: {
    marginLeft: 10,
  },
});
