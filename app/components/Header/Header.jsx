import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// constants
import {COLORS, ProfileMale} from '../../constants';

// components
import {DotBeconAnimation} from '../animations/animations';

// icons
import {Bell} from '../icons/Icons';

const Header = () => {
  // use the useContext hook to get the user data value
  const {userData, notificationCount, setNotificationCount} =
    useContext(AuthContext);

  // navigation
  const navigation = useNavigation();

  // handle press notification icon
  const handlePressNotification = () => {
    setNotificationCount(0);
    navigation.navigate('Notification');
  };

  // get current date in the formate of 11 April 2023
  const date = new Date();
  const currentDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getFullYear()}`;

  return (
    <View style={styles.Header}>
      <View style={styles.HeadBar}>
        {/* Profile image */}
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.profileImage}>
          <Image
            style={{
              width: 48,
              height: 48,
              borderRadius: 50,
            }}
            source={userData.photoURL ? {uri: userData.photoURL} : ProfileMale}
          />
        </TouchableOpacity>
        {/* Date section */}
        <View style={styles.date}>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <TouchableOpacity
          onPress={handlePressNotification}
          style={styles.iconCon}>
          <Bell width={30} height={30} fill={COLORS.white} />
          {notificationCount > 0 ? (
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}>
              <DotBeconAnimation width={20} height={20} />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  // This is the header bar that contains the user's profile picture and date
  HeadBar: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // This is the header that contains the user's name and session information
  Header: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },

  // This is the container for the user's profile picture
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // This is the container for the date information
  date: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // This is the text for the date information
  dateText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // This is the container for icons
  iconCon: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
