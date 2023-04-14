// constants
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {
  BadAnimation,
  UnHappyAnimation,
  WellAnimation,
  HappyAnimation,
} from '../../components/Animations/animations';
import React from 'react';

const MoodTracker = () => {
  // Get the user's current mood
  const [mood, setMood] = React.useState('');

  return (
    <View style={styles.feeling}>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => setMood('Angry')}>
          <BadAnimation />
        </TouchableOpacity>
        <Text>Angry</Text>
      </View>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => setMood('Sad')}>
          <UnHappyAnimation />
        </TouchableOpacity>
        <Text>Sad</Text>
      </View>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => setMood('Well')}>
          <WellAnimation />
        </TouchableOpacity>
        <Text>Well</Text>
      </View>
      <View style={styles.feelingCon}>
        <TouchableOpacity
          style={styles.feelingsBtn}
          onPress={() => setMood('Happy')}>
          <HappyAnimation />
        </TouchableOpacity>
        <Text>Happy</Text>
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
