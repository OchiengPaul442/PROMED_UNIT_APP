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
  RetryIcon,
  HumanNotSureIcon,
  MentalHealthAnimation,
  RecButton,
} from '../../components';
import React, {useContext} from 'react';
import Styles from '../../constants/Styles';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {AuthContext} from '../../navigations/Context/AuthContext';
import {checkIfUserHasDoneTest} from '../../../fireStore';

// mood tracker function
const MoodTracker = () => {
  // use the useContext hook to get the user data value
  const {setError, userData, anonymous, setErrorStatus, setTakeTest} =
    useContext(AuthContext);
  const [mood, setMood] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [hasDoneTest, setHasDoneTest] = React.useState(false);

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

  // get the user's mood from diagnosis tool api
  const userMood = 'Well';

  React.useEffect(() => {
    // check if the user has done the test
    checkIfUserHasDoneTest(setHasDoneTest);
  }, []);

  return (
    <View>
      <View style={styles.feeling}>
        {moods.map((item, index) => {
          if (item.mood === userMood) {
            return (
              <View key={index} style={styles.feelingCon}>
                {hasDoneTest ? (
                  <>
                    <Text style={{...Styles.heading, marginBottom: 10}}>
                      Your Mood today?
                    </Text>
                    <TouchableOpacity
                      style={styles.feelingsBtn}
                      onPress={() => {
                        let mood = item.mood;
                        trackMood(mood);
                      }}>
                      {loading && mood == item.mood ? (
                        <RoundLoadingAnimation width={40} height={40} />
                      ) : (
                        item.animation
                      )}
                    </TouchableOpacity>
                    <Text style={Styles.text}>{item.mood}</Text>
                  </>
                ) : (
                  <View
                    style={{
                      paddingHorizontal: 12,
                    }}>
                    <Text
                      style={{
                        color: COLORS.orange,
                        fontSize: 16,
                        marginBottom: 10,
                      }}>
                      Not sure of your mental health status?
                    </Text>
                    <MentalHealthAnimation width={500} height={200} />
                  </View>
                )}
              </View>
            );
          }
        })}
        <View>
          {userData.userType !== 'Client' ||
            ('Therapist' &&
              (hasDoneTest ? (
                <View>
                  <Text
                    style={{
                      color: COLORS.orange,
                      fontSize: 16,
                      marginBottom: 10,
                    }}>
                    Redo test
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{...styles.feelingsBtn, width: 40, height: 40}}
                      onPress={() => {
                        setTakeTest(true);
                      }}>
                      <RetryIcon width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{...styles.feelingsBtn, width: 40, height: 40}}
                      onPress={() => {
                        setTakeTest(true);
                      }}>
                      <HumanNotSureIcon
                        width={60}
                        height={60}
                        fill={COLORS.red}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 16,
                      marginTop: 15,
                    }}>
                    Have a check
                  </Text>
                </View>
              )))}
        </View>
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
