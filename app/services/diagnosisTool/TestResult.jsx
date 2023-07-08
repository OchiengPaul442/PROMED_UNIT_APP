// imports
import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS, SIZES} from '../../constants';
import {BackBtn, MentalDoctorAnimation} from '../../components';

// screen
import Screen from '../../layout/Screen';

import axios from 'axios';

const TestResult = ({route, navigation}) => {
  // get params
  const {id, title, answers} = route.params;

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://cynthias-diagnosis-api.onrender.com';

  const api = axios.create({
    baseURL: `${BASE_URL}/predict`,
  });

  const getResponse = async () => {
    setLoading(true);
    try {
      switch (title) {
        case 'Depression':
          const res1 = await api.post('', {
            Schizophrenia: answers[0],
            BipolarDisorder: answers[1],
            EatingDisorders: answers[2],
            AnxietyDisorders: answers[3],
            DrugUseDisorders: answers[4],
            AlcoholUseDisorders: answers[5],
          });
          setResponse(res1.data.prediction);
          setTimeout(() => {
            setLoading(false);
          }, 4500);
          break;
        case 'Anxiety':
          const res2 = await api.post('', {
            Schizophrenia: answers[0],
            BipolarDisorder: answers[1],
            EatingDisorders: answers[2],
            AnxietyDisorders: answers[3],
            DrugUseDisorders: answers[4],
            AlcoholUseDisorders: answers[5],
          });
          setResponse(res2.data.prediction);
          setLoading(false);
          break;
        case 'Stress':
          const res3 = await api.post('', {
            Schizophrenia: answers[0],
            BipolarDisorder: answers[1],
            EatingDisorders: answers[2],
            AnxietyDisorders: answers[3],
            DrugUseDisorders: answers[4],
            AlcoholUseDisorders: answers[5],
          });
          setResponse(res3.data.prediction);
          setLoading(false);
          break;
        case 'PTSD':
          const res4 = await api.post('', {
            Schizophrenia: answers[0],
            BipolarDisorder: answers[1],
            EatingDisorders: answers[2],
            AnxietyDisorders: answers[3],
            DrugUseDisorders: answers[4],
            AlcoholUseDisorders: answers[5],
          });
          setResponse(res4.data.prediction);
          setLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  // Calculate the result percentage based on the intensity of the disorder
  const resultPercentage = Math.round(
    (answers.reduce((acc, cur) => acc + cur, 0) / (answers.length * 3)) * 100,
  );

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text style={Styles.Screen_headings}>{title}</Text>
          <Text style={Styles.Screen_headings}>Test Results</Text>
        </View>

        {/* Content section */}
        <View style={Styles.Content}>
          {loading ? (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 85,
              }}>
              <MentalDoctorAnimation width={320} height={350} />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    ...Styles.heading,
                  }}>
                  Test Results
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 15,
                  paddingVertical: 15,
                }}>
                <TouchableOpacity onPress={() => navigation.push('HomeScreen')}>
                  <BackBtn width={30} height={30} fill={COLORS.primary} />
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
                    height: '100%',
                  }}>
                  <View style={styles.Outer_ring}>
                    <View style={styles.result_box}>
                      <Text style={styles.result_percentage}>
                        {resultPercentage + '%'}
                      </Text>
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
                            {title + ' Test'}
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
                            {answers.filter(answer => answer !== '').length +
                              '/' +
                              answers.length}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingVertical: 10,
                          }}>
                          <Text style={styles.summary_card_title}>
                            {title + ' level'}:
                          </Text>
                          <Text style={styles.summary_card_text}>
                            {resultPercentage + '%'}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingVertical: 10,
                          }}>
                          <Text style={styles.summary_card_title}>
                            Diagnosis:
                          </Text>
                          {/* based on the percentage level show different label with different background colors of need help, self care or okay and also the diagnosis from the AI */}
                          <Text
                            style={{
                              borderRadius: 10,
                              paddingHorizontal: 10,
                              color:
                                resultPercentage > 50
                                  ? COLORS.white
                                  : COLORS.black,
                              backgroundColor:
                                resultPercentage > 50
                                  ? COLORS.red
                                  : resultPercentage > 30
                                  ? COLORS.yellow
                                  : COLORS.green,
                            }}>
                            {resultPercentage > 50
                              ? 'Need Help'
                              : resultPercentage > 30
                              ? 'Self Care'
                              : 'Okay'}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingVertical: 10,
                          }}>
                          <Text style={styles.summary_card_title}>
                            Mental state:
                          </Text>
                          <Text
                            style={{
                              color: COLORS.white,
                              backgroundColor: COLORS.cyan,
                              borderRadius: 10,
                              paddingHorizontal: 10,
                            }}>
                            {response}
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
                            {new Date().toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Screen>
  );
};

export default TestResult;

const styles = StyleSheet.create({
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
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 235,
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
    paddingTop: 10,
  },

  summary_text: {
    fontSize: SIZES.medium,
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
    backgroundColor: COLORS.lightGray,
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
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 10,
  },

  summary_card_text: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
});
