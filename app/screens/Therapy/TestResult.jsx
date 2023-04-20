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

  // summary item
  const summary = [
    {
      test: 'Depression Test',
      score: '60%',
      questions_answered: '8/10',
      partial_diagnosis: 'Mild Depression',
      date: '12/12/2020',
    },
  ];

  const condition = summary[0].partial_diagnosis;

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
              <TouchableOpacity onPress={() => navigation.push('Therapy')}>
                <BackBtn width={30} height={30} fill={COLORS.secondary} />
              </TouchableOpacity>
            </View>

            {/* The Results section */}
            <View style={styles.results}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 'auto',
                }}>
                <View style={styles.Outer_ring}>
                  <View style={styles.result_box}>
                    <Text style={styles.result_percentage}>60%</Text>
                  </View>
                </View>
                <View style={styles.summary}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      width: '100%',
                      marginTop: 10,
                    }}>
                    <Text style={styles.summary_text}>Result Summary:</Text>
                  </View>
                  <View style={styles.summary_card_con}>
                    <View style={styles.summary_card}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          paddingVertical: 10,
                        }}>
                        <Text style={styles.summary_card_title}>Test:</Text>
                        <Text style={styles.summary_card_text}>
                          {summary[0].test}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          paddingVertical: 10,
                        }}>
                        <Text style={styles.summary_card_title}>
                          Questions answered:
                        </Text>
                        <Text style={styles.summary_card_text}>
                          {summary[0].questions_answered}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          paddingVertical: 10,
                        }}>
                        <Text style={styles.summary_card_title}>Score:</Text>
                        <Text style={styles.summary_card_text}>
                          {summary[0].score}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          paddingVertical: 10,
                        }}>
                        <Text style={styles.summary_card_title}>
                          Partial Diagnosis:
                        </Text>
                        <Text
                          style={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                          }}>
                          {summary[0].partial_diagnosis}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          paddingVertical: 10,
                        }}>
                        <Text style={styles.summary_card_title}>
                          Diagnosis Date:
                        </Text>
                        <Text style={styles.summary_card_title}>
                          {summary[0].date}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
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

  // Outer ring
  Outer_ring: {
    width: 208,
    height: 208,
    borderRadius: 200 / 2,
    backgroundColor: COLORS.tertiary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // results
  results: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    PaddingBottom: 100,
  },

  // result text
  result_percentage: {
    fontSize: 60,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  // result box
  result_box: {
    width: 195,
    height: 195,
    marginBottom: 20,
    borderRadius: 150 / 2,
    backgroundColor: COLORS.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // summary
  summary: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  summary_text: {
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-start',
    color: COLORS.primary,
  },

  summary_card_con: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  summary_card: {
    width: '100%',
    height: 'auto',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    display: 'flex',
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  summary_card_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 10,
  },

  summary_card_text: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 16,
    color: COLORS.black,
  },
});
