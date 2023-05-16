// constants
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS} from '../../constants';
import {
  BadAnimation,
  UnHappyAnimation,
  WellAnimation,
  HappyAnimation,
  RoundLoadingAnimation,
  RecButton,
} from '../../components';
import React, {useContext} from 'react';
import Styles from '../../constants/Styles';

// firebase imports
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

const CenterHalf = React.lazy(() =>
  import('../../components/Modals/CenterHalf'),
);

// mood tracker function
const MoodTracker = () => {
  // use the useContext hook to get the user data value
  const {setError, anonymous, setErrorStatus} = useContext(AuthContext);

  // mood
  const [mood, setMood] = React.useState('');

  // loading
  const [loading, setLoading] = React.useState(false);

  // open modal
  const [open, setOpen] = React.useState(false);

  // toggle modal
  const moodModalForm = set => {
    setOpen(set);
  };

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
                    // capture why the user is feeling that way
                    setTimeout(() => {
                      moodModalForm(true);
                    }, 1500);
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
                    // capture why the user is feeling that way
                    setTimeout(() => {
                      moodModalForm(true);
                    }, 1500);
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
                    // capture why the user is feeling that way
                    setTimeout(() => {
                      moodModalForm(true);
                    }, 1500);
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

  // Array of moods
  const moods = [
    {
      mood: 'Angry',
      animation: <BadAnimation />,
    },
    {
      mood: 'Sad',
      animation: <UnHappyAnimation />,
    },
    {
      mood: 'Well',
      animation: <WellAnimation />,
    },
    {
      mood: 'Happy',
      animation: <HappyAnimation />,
    },
  ];

  return (
    <View>
      <View style={styles.feeling}>
        {moods.map((item, index) => (
          <View key={index} style={styles.feelingCon}>
            <TouchableOpacity
              style={styles.feelingsBtn}
              onPress={() => {
                let mood = item.mood;
                trackMood(mood);
              }}>
              {/* This is the animation for the sad mood */}
              {loading && mood == item.mood ? (
                <RoundLoadingAnimation width={40} height={40} />
              ) : (
                item.animation
              )}
            </TouchableOpacity>
            <Text style={Styles.text}>{item.mood}</Text>
          </View>
        ))}
      </View>
      {/* why they selected that mood */}
      <CenterHalf Visibility={open} hide={() => moodModalForm(false)}>
        {/* title */}
        <Text style={{paddingVertical: 10, ...Styles.heading2}}>
          Follow up Questions
        </Text>
        <View style={Styles.Qgroup}>
          <Text style={Styles.Qlabel}>
            How do you feel about your mood today? What factors influenced it?
          </Text>
          <TextInput
            style={Styles.Qinput}
            placeholder="Enter your answer here"
          />
        </View>
        <View style={Styles.Qgroup}>
          <Text style={Styles.Qlabel}>
            What are some goals or habits that you want to work on to support
            your mental health?
          </Text>
          <TextInput
            style={Styles.Qinput}
            placeholder="Enter your answer here"
          />
        </View>
        {/* submit button */}
        <View style={{paddingTop: 15}}>
          <RecButton
            text="Submit Response"
            textColor={COLORS.black}
            bgColor={COLORS.secondary}
            onPress={() => moodModalForm(false)}
          />
        </View>
        <TouchableOpacity onPress={() => moodModalForm(false)}>
          <Text
            style={{
              paddingVertical: 10,
              color: COLORS.red,
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </CenterHalf>
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
