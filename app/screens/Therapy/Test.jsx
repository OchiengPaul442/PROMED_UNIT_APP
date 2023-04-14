import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// screen
import Screen from '../../layout/Screen';

// constants
import {COLORS} from '../../constants';

// navigation
import {useNavigation} from '@react-navigation/native';

const Test = () => {
  // navigation
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={styles.Test_Screen}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text>Yes man</Text>
        </View>

        {/* Body */}
        <View style={styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text>Hello</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.text}>Go back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default Test;

const styles = StyleSheet.create({
  // This is the main container that holds all the components
  Test_Screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  text: {
    color: COLORS.primary,
  },

  // This is the Container that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  // This is the box that contains the greeting message
  section_title: {
    position: 'relative',
    bottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
