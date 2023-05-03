// constants
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {
  BadAnimation,
  UnHappyAnimation,
  WellAnimation,
  HappyAnimation,
  RoundLoadingAnimation,
} from '../../components';
import React, {useContext} from 'react';
import Styles from '../../constants/Styles';

// firebase imports
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// mood tracker function
const MoodTracker = () => {
  // use the useContext hook to get the user data value
  const {setError, error, anonymous, setErrorStatus} = useContext(AuthContext);

  // mood
  const [mood, setMood] = React.useState('');

  // loading
  const [loading, setLoading] = React.useState(false);

  // Function to track the user's mood
  const trackMood = mood => {
    setMood(mood);
    // set loading to true
    setLoading(true);

    // get the current date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // get the current time of the day
    const hours = date.getHours();

    // get the current user
    const user = firebase.auth().currentUser;

    // check if the user is logged in
    if (user) {
      // check if the user is anonymous
      if (anonymous) {
        setLoading(false);
        setError('You need to login to track your mood');
        setErrorStatus('error');
      } else {
        // check if the user has tracked his/her mood today
        firestore()
          .collection('MoodTracker')
          .doc(user.uid)
          .collection('Mood')
          .doc(`${day}-${month}-${year}`)
          .get()
          .then(documentSnapshot => {
            // check if the user has tracked his/her mood today
            if (documentSnapshot.exists) {
              setLoading(false);
              setError('You have already tracked your mood today');
              setErrorStatus('error');
            } else {
              // check if the user is tracking his/her mood in the morning
              if (hours < 12) {
                // save the user's mood to the database
                firestore()
                  .collection('MoodTracker')
                  .doc(user.uid)
                  .collection('Mood')
                  .doc(`${day}-${month}-${year}`)
                  .set({
                    user_id: user.uid,
                    mood: mood,
                    date: `${day}-${month}-${year}`,
                    time: 'Morning',
                  })
                  .then(() => {
                    setLoading(false);
                    setError('Mood recorded successfully');
                    setErrorStatus('success');
                  });
              } else if (hours >= 12 && hours <= 17) {
                // save the user's mood to the database
                firestore()
                  .collection('MoodTracker')
                  .doc(user.uid)
                  .collection('Mood')
                  .doc(`${day}-${month}-${year}`)
                  .set({
                    user_id: user.uid,
                    mood: mood,
                    date: `${day}-${month}-${year}`,
                    time: 'Afternoon',
                    CreatedAt: firestore.FieldValue.serverTimestamp(),
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                  })
                  .then(() => {
                    setLoading(false);
                    setError('Mood recorded successfully');
                    setErrorStatus('success');
                  });
              } else {
                // save the user's mood to the database
                firestore()
                  .collection('MoodTracker')
                  .doc(user.uid)
                  .collection('Mood')
                  .doc(`${day}-${month}-${year}`)
                  .set({
                    user_id: user.uid,
                    mood: mood,
                    date: `${day}-${month}-${year}`,
                    time: 'Evening',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                  })
                  .then(() => {
                    setLoading(false);
                    setError('Mood recorded successfully');
                    setErrorStatus('success');
                  });
              }
            }
          });
      }
    } else {
      setLoading(false);
      setError('You need to login to track your mood');
      setErrorStatus('error');
    }
  };

  return (
    <View style={styles.feeling}>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => {
            let mood = 'Angry';
            trackMood(mood);
          }}>
          {/* This is the animation for the angry mood */}
          {loading && mood == 'Angry' ? (
            <RoundLoadingAnimation width={40} height={40} />
          ) : (
            <BadAnimation />
          )}
        </TouchableOpacity>
        <Text style={Styles.text}>Angry</Text>
      </View>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => {
            let mood = 'Sad';
            trackMood(mood);
          }}>
          {/* This is the animation for the sad mood */}
          {loading && mood == 'Sad' ? (
            <RoundLoadingAnimation width={40} height={40} />
          ) : (
            <UnHappyAnimation />
          )}
        </TouchableOpacity>
        <Text style={Styles.text}>Sad</Text>
      </View>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => {
            let mood = 'Well';
            trackMood(mood);
          }}>
          {/* This is the animation for the well mood */}
          {loading && mood == 'Well' ? (
            <RoundLoadingAnimation width={40} height={40} />
          ) : (
            <WellAnimation />
          )}
        </TouchableOpacity>
        <Text style={Styles.text}>Well</Text>
      </View>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => {
            let mood = 'Happy';
            trackMood(mood);
          }}>
          {/* This is the animation for the happy mood */}
          {loading && mood == 'Happy' ? (
            <RoundLoadingAnimation width={40} height={40} />
          ) : (
            <HappyAnimation />
          )}
        </TouchableOpacity>
        <Text style={Styles.text}>Happy</Text>
      </View>
    </View>
  );
};

export default MoodTracker;

const styles = StyleSheet.create({
  // This is the feeling section that contains the buttons for different feelings
  feeling: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

  // This is the container for each feeling button
  feelingCon: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // This is the button for each feeling
  feelingsBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
});
