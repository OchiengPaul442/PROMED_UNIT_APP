// imports
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Styles from '../../constants/Styles';
import {COLORS, SIZES} from '../../constants';
import {BackBtn, MentalDoctorAnimation} from '../../components';
import Screen from '../../layout/Screen';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TestResult = ({route, navigation}) => {
  const {id, title, answers} = route.params;
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = 'https://cynthias-diagnosis-api.onrender.com';
  const BASE_URL2 = 'https://cynthias-ptsd-api.onrender.com';
  const api = axios.create({
    baseURL: `${BASE_URL}`,
  });
  const api2 = axios.create({
    baseURL: `${BASE_URL2}/pcl5`,
  });

  // send the data to the firestore database for storage new collection called Results if it doesn't exist already
  const sendToFireStore = async () => {
    const user = auth().currentUser;
    const docRef = firestore().collection('Results').doc(user.uid);
    const doc = await docRef.get();
    const data = {
      [title]: {
        id,
        title,
        answers,
        response,
        ...(title === 'Anxiety' && {score: generatePercentage2()}),
      },
    };

    if (!doc.exists) {
      await docRef.set(data);
    } else {
      await docRef.update(data);
    }

    // Save a backup of the data in the ResultHistory collection
    const historyDocRef = firestore().collection('ResultHistory').doc(user.uid);

    const historyDoc = await historyDocRef.get();
    const historyData = {
      [title]: {
        id,
        title,
        answers,
        response,
        ...(title === 'Anxiety' && {score: generatePercentage2()}),
        timestamp: new Date().toISOString(),
      },
    };

    if (!historyDoc.exists) {
      await historyDocRef.set(historyData);
    } else {
      // Check if the last update was more than 2 days ago
      const lastUpdate = new Date(historyDoc.data()[title].timestamp);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      if (lastUpdate < twoDaysAgo) {
        await historyDocRef.update(historyData);
      }
    }
  };

  const getResponse = async () => {
    setLoading(true);
    try {
      switch (title) {
        case 'Depression':
          const res1 = await api.post('/depression', {
            Schizophrenia: answers[0],
            BipolarDisorder: answers[1],
            EatingDisorders: answers[2],
            AnxietyDisorders: answers[3],
            DrugUseDisorders: answers[4],
            AlcoholUseDisorders: answers[5],
          });
          setResponse(res1.data);
          setTimeout(() => {
            setLoading(false);
          }, 2500);
          break;
        case 'Anxiety':
          const res2 = await api.post('/anxiety', {
            D1: answers[0],
            D2: answers[1],
            D3: answers[2],
            D4: answers[3],
            D5: answers[4],
            D6: answers[5],
            D7: answers[6],
          });
          setResponse(res2.data);
          setLoading(false);
          break;
        case 'PTSD':
          const res4 = await api2.post('', {
            answers: [
              answers[0],
              answers[1],
              answers[2],
              answers[3],
              answers[4],
              answers[5],
              answers[6],
              answers[7],
              answers[8],
              answers[9],
              answers[10],
              answers[11],
              answers[12],
              answers[13],
              answers[14],
              answers[15],
              answers[16],
              answers[17],
              answers[18],
              answers[19],
            ],
          });
          setResponse(res4.data);
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

  // send the data to the firestore database for storage if response is not null
  if (response) {
    sendToFireStore();
  }

  const generatePercentage1 = () => {
    const score = answers.reduce((total, answer) => total + (answer || 0), 0);
    return (score / 24) * 100;
  };

  const generatePercentage2 = () => {
    const score = answers.reduce((total, answer) => total + (answer || 0), 0);
    return (score / 28) * 100;
  };

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
                        {response
                          ? title === 'Depression'
                            ? response && generatePercentage1().toFixed(0) + '%'
                            : title === 'Anxiety'
                            ? response && generatePercentage2().toFixed(0) + '%'
                            : title === 'PTSD'
                            ? response && response.percentage.toFixed(0) + '%'
                            : '0%'
                          : null}
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
                            Accuracy score:
                          </Text>
                          <Text style={styles.summary_card_text}>
                            {response
                              ? title === 'Depression'
                                ? response.Accuracy_score.toFixed(2) * 100 + '%'
                                : title === 'Anxiety'
                                ? response &&
                                  generatePercentage2().toFixed(0) + '%'
                                : title === 'PTSD'
                                ? response &&
                                  response.percentage.toFixed(0) + '%'
                                : '0%'
                              : null}
                          </Text>
                        </View>
                        {title === 'PTSD' && (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              paddingVertical: 10,
                            }}>
                            <Text style={styles.summary_card_title}>
                              Test score:
                            </Text>
                            <Text style={styles.summary_card_text}>
                              {response &&
                                response.total_score +
                                  '/' +
                                  response.pcl5_max_score}
                            </Text>
                          </View>
                        )}

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
                              backgroundColor: response
                                ? response.prediction === 'NotDepressed' ||
                                  response.severity_level === 'Mild Anxiety' ||
                                  response.severity_level ===
                                    'Moderate Anxiety' ||
                                  response.severity_level === 'Minimal Anxiety'
                                  ? COLORS.cyan
                                  : response.severity_level === 'Severe Anxiety'
                                  ? COLORS.red
                                  : COLORS.red
                                : COLORS.red,
                              borderRadius: 10,
                              flex: title === 'PTSD' ? 1 : null,
                              paddingHorizontal: 10,
                            }}>
                            {response
                              ? title === 'Depression'
                                ? response &&
                                  response.prediction === 'Depressed'
                                  ? generatePercentage1().toFixed(0) < 30
                                    ? 'Minimal Depression'
                                    : generatePercentage1().toFixed(0) < 50
                                    ? 'Mild Depression'
                                    : generatePercentage1().toFixed(0) < 70
                                    ? 'Moderate Depression'
                                    : generatePercentage1().toFixed(0) < 100
                                    ? 'Severe Depression'
                                    : '----'
                                  : response.prediction
                                : title === 'Anxiety'
                                ? response && response.severity_level
                                : title === 'PTSD'
                                ? response && response.message
                                : null
                              : null}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingVertical: 10,
                          }}>
                          <Text style={styles.summary_card_title}>
                            Medical Advice:
                          </Text>
                          <Text
                            style={{
                              width: 'auto',
                              flex: 1,
                              color: COLORS.black,
                              backgroundColor: COLORS.peach,
                              borderRadius: 10,
                              paddingHorizontal: 10,
                            }}>
                            {response
                              ? title === 'Depression'
                                ? response && response.Advice
                                : title === 'Anxiety'
                                ? response && response.advice
                                : title === 'PTSD'
                                ? response && response.advice
                                : null
                              : null}
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
