import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
//  moment
import moment from 'moment';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// screens
import Screen from '../../layout/Screen';

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS} from '../../constants';
import {
  ConfirmIcon,
  EditIcon,
  CurvedButton,
  RoundLoadingAnimation,
} from '../../components';

const ConfirmationScreen = ({route, navigation}) => {
  // context
  const {userData, setError, setErrorStatus} = useContext(AuthContext);

  // get params from route
  const {name, title, image, date, time, therapistId, token} = route.params;

  // set loading state
  const [loading, setLoading] = React.useState(false);

  // function to save booking to firestore
  const saveBooking = async () => {
    // set loading to true
    setLoading(true);
    // get current user
    const user = auth().currentUser;

    try {
      // save booking to firestore
      await firestore()
        .collection('Appointments')
        .add({
          userId: user.uid,
          therapistId: therapistId,
          date: date,
          time: time,
          token: `${userData.phoneNumber}${token}`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      // set error status
      setErrorStatus('success');
      // set error message
      setError('Appointment booked successfully');

      // send notification to user
      sendNotification();

      // Update therapist schedule in firestore
      await firestore()
        .collection('Therapists')
        .doc(therapistId)
        .collection('Schedule')
        .add({
          client: user.uid,
          date: date,
          time: time,
          status: 'Booked',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      // set timeout
      setTimeout(() => {
        // set error status
        setErrorStatus('');
        // set error message
        setError('');
        // navigate to home screen
        navigation.navigate('Therapy');
      }, 1000);
    } catch (error) {
      // set error message
      setError(error.message);
    }

    // set loading to false
    setLoading(false);
  };

  // function to cancel booking
  const cancelAppointment = () => {
    //  set error status
    setErrorStatus('');
    // set error message
    setError('');

    navigation.navigate('Therapy');
  };

  // function to send a notification to user after booking
  const sendNotification = async () => {
    // get current user
    const user = auth().currentUser;

    // get user data from firestore
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        // check if document exists
        if (documentSnapshot.exists) {
          // get user data
          const userData = documentSnapshot.data();

          // send notification to user (create collection of notification under Users collection)
          firestore()
            .collection('Users')
            .doc(user.uid)
            .collection('Notifications')
            .add({
              userId: user.uid,
              title: 'Appointment Booked',
              body: `Your appointment with ${name} has been booked for ${date} at ${time}`,
              createdAt: firestore.FieldValue.serverTimestamp(),
            });
        }
      });
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
              onPress={saveBooking}
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
