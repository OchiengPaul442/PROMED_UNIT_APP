import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS, ProfileImage} from '../../constants';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// icons
import {Bell} from '../icons/Icons';

const Header = () => {
  // navigation
  const navigation = useNavigation();

  // Get users info
  const [user, setUser] = React.useState({
    date: '11 Feb 2023',
  });

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
            source={ProfileImage}
          />
        </TouchableOpacity>
        {/* Date section */}
        <View style={styles.date}>
          <Text style={styles.dateText}>{user.date}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={styles.iconCon}>
          <Bell width={30} height={30} fill={COLORS.white} />
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
