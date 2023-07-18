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
import React, {useContext, Suspense} from 'react';
import Styles from '../../constants/Styles';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../navigations/Context/AuthContext';
import {checkIfUserHasDoneTest} from '../../../fireStore';
import CenterHalf from '../../components/Modals/CenterHalf';

// mood tracker function
const MoodTracker = () => {
  // use the useContext hook to get the user data value
  const {
    setError,
    userData,
    anonymous,
    setErrorStatus,
    showMoodModel,
    setMoodModel,
    setTakeTest,
  } = useContext(AuthContext);
  const [mood, setMood] = React.useState('Well');
  const [loading, setLoading] = React.useState(false);
  const [hasDoneTest, setHasDoneTest] = React.useState(false);
  const currentUser = auth().currentUser.uid;

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

  React.useEffect(() => {
    // check if the user has done the test
    checkIfUserHasDoneTest(setHasDoneTest);
  }, []);

  return (
    <View>
      <View style={styles.feeling}>
        {moods.map((item, index) => {
          if (item.mood === mood) {
            return (
              <View key={index} style={styles.feelingCon}>
                {hasDoneTest ? (
                  <>
                    <Text style={{...Styles.heading, marginBottom: 10}}>
                      Your Mood today
                    </Text>
                    {}
                    <View>{item.animation}</View>
                    <Text style={Styles.text}>{item.mood}</Text>
                  </>
                ) : (
                  <View>
                    <Text
                      style={{
                        color: COLORS.primary,
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
          {hasDoneTest ? (
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
                    anonymous
                      ? setError('You need to login to access this feature')
                      : setTakeTest(true);

                    setMoodModel(false);
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
                    anonymous
                      ? setError('You need to login to access this feature')
                      : setTakeTest(true);
                  }}>
                  <HumanNotSureIcon width={60} height={60} fill={COLORS.red} />
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
          )}
        </View>
      </View>
      <CenterHalf
        Visibility={showMoodModel}
        hide={() => setMoodModel(!showMoodModel)}>
        <Text style={Styles.title}>How are you feeling today?</Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
          }}>
          {moods.map((item, index) => {
            return (
              <TouchableOpacity
                style={{margin: 10}}
                key={index}
                onPress={() => {
                  setMood(item.mood);
                  setMoodModel(false);
                }}>
                <View style={{...styles.feelingCon, marginBottom: 10}}>
                  {item.animation}
                  <Text style={Styles.text}>{item.mood}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
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
