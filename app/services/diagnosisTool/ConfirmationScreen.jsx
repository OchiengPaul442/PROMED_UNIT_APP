// imports
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

// context
import {AuthContext} from '../../navigations/Context/AuthContext'; // a context for the authentication state

// screens
import Screen from '../../layout/Screen'; // a component for the screen layout

//General styles
import Styles from '../../constants/Styles'; // custom styles for the app

// constants
import {COLORS} from '../../constants'; // predefined colors for the app
import {
  ConfirmIcon,
  EditIcon,
  CurvedButton,
  RoundLoadingAnimation,
} from '../../components'; // components for the icons, buttons and loading animation

// fetch function
import {confirmUserBooking} from '../../../fireStore'; // a function to confirm the user booking in firestore

const ConfirmationScreen = ({route, navigation}) => {
  // context
  const {userData, setError, setErrorStatus} = useContext(AuthContext);

  // get params from route
  const {name, title, image, date, time, therapistId, token} = route.params;

  // set loading state
  const [loading, setLoading] = React.useState(false);

  // Handle Booking Confirmation
  const handleBooking = async () => {
    confirmUserBooking(
      therapistId,
      date,
      time,
      setLoading,
      setErrorStatus,
      setError,
      userData,
      token,
      navigation,
      name,
    );
  };

  // function to cancel booking
  const cancelAppointment = () => {
    //  set error status
    setErrorStatus('');
    // set error message
    setError('');

    navigation.navigate('Therapy');
  };

  return (
    <Screen>
      <View style={Styles.Container}>
        <View style={styles.Head}>
          <ConfirmIcon width={100} height={100} fill={COLORS.secondary} />
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
            Booking Confirmation
          </Text>
          <Text style={{fontSize: 12, color: COLORS.white}}>
            Your booking is almost complete
          </Text>
        </View>
        {/* Content */}
        <View style={{marginTop: 100, ...Styles.Content}}>
          <View style={styles.details_container}>
            <View style={styles.details_box}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={Styles.text}>
                  TokenID:{' '}
                  <Text style={Styles.text4}>
                    {userData.phoneNumber + token}
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <EditIcon width={20} height={20} fill={COLORS.black} />
                </TouchableOpacity>
              </View>
              <View style={styles.Therapist_details}>
                <Image
                  source={{uri: image}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                />
                <View
                  style={{
                    position: 'relative',
                  }}>
                  <Text style={Styles.title}>{name}</Text>
                  <Text style={Styles.text}>{title}</Text>
                </View>
              </View>
              {/* separator */}
              <View style={styles.separator}></View>
              <View>
                <View style={styles.schedule_details}>
                  <Text style={Styles.title2}>Name:</Text>
                  <Text style={Styles.text}>{userData.userName}</Text>
                </View>
                <View style={styles.schedule_details}>
                  <Text style={Styles.title2}>Date:</Text>
                  <Text style={Styles.text}>{date}</Text>
                </View>
                <View style={styles.schedule_details}>
                  <Text style={Styles.title2}>Time:</Text>
                  <Text style={Styles.text}>{time}</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              height: 130,
              paddingHorizontal: 10,
            }}>
            <CurvedButton
              text={
                loading ? (
                  <RoundLoadingAnimation width={50} height={50} />
                ) : (
                  'Confirm Booking'
                )
              }
              textColor={COLORS.black}
              style={{
                backgroundColor: COLORS.secondary,
                width: '100%',
                height: 50,
              }}
              onPress={handleBooking}
            />
            <CurvedButton
              text="Cancel Booking"
              textColor={COLORS.white}
              style={{
                backgroundColor: COLORS.tertiary,
                width: '100%',
                height: 50,
              }}
              onPress={cancelAppointment}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  // This is the Head that holds the header
  Head: {
    paddingVertical: 10,
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // This is the details_container that holds the details_box
  details_container: {
    position: 'relative',
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  // This is the details_box that holds the details
  details_box: {
    position: 'relative',
    top: -45,
    padding: 10,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
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
        elevation: 5,
      },
    }),
  },

  Therapist_details: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  // This is the separator that holds the separator
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black,
    marginVertical: 10,
  },

  schedule_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
