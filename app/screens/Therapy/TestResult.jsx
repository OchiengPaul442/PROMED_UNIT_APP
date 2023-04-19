import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants';
import {BackBtn} from '../../components';

// screen
import Screen from '../../layout/Screen';

const TestResult = ({route, navigation}) => {
  // get params
  const {id, title} = route.params;

  return (
    <Screen>
      <View style={styles.Test_Screen}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text style={styles.title_text}>{title}</Text>
          <Text style={styles.title_text}>Test Results</Text>
        </View>

        {/* Body */}
        <View style={styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row-reverse',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 15,
                }}>
                Test Results
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackBtn width={30} height={30} fill={COLORS.yellow} />
              </TouchableOpacity>
            </View>

            {/* The Results section */}
            <View style={styles.results}></View>
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default TestResult;

const styles = StyleSheet.create({
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
  // This is the box that contains the title
  section_title: {
    position: 'relative',
    bottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
