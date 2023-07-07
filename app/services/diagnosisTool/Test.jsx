// imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//General styles
import Styles from '../../constants/Styles'; // custom styles for the app

// screen
import Screen from '../../layout/Screen'; // a component for the screen layout

// constants
import {COLORS} from '../../constants'; // predefined colors and sizes for the app
import {BackBtn, CurvedButton} from '../../components'; // components for the back button and the curved button

import RadioForm from 'react-native-simple-radio-button';

const Test = ({route, navigation}) => {
  const depressionQnz = [
    {
      question:
        'How often have you been bothered by feeling down, depressed, or hopeless over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by little interest or pleasure in doing things over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by trouble falling or staying asleep, or sleeping too much over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by feeling tired or having little energy over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by poor appetite or overeating over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by feeling bad about yourself - or that you are a failure or have let yourself or your family down over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
  ];

  const stressQnz = [
    {
      question:
        'How often have you been bothered by feeling nervous, anxious, or on edge over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by not being able to stop or control worrying over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by trouble relaxing over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by becoming easily annoyed or irritable over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by feeling afraid as if something awful might happen over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by feeling restless or fidgety over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
  ];

  const anxietyQnz = [
    {
      question:
        'How often have you been bothered by feeling nervous, anxious, or on edge over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by not being able to stop or control worrying over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by worrying too much about different things over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by trouble relaxing over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by being so restless that it is hard to sit still over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
    {
      question:
        'How often have you been bothered by becoming easily annoyed or irritable over the past two weeks?',
      options: [
        {label: 'Not at all', value: 0},
        {label: 'Several days', value: 1},
        {label: 'More than half the days', value: 2},
        {label: 'Nearly every day', value: 3},
      ],
    },
  ];

  const ptsdQnz = [
    {
      question:
        'Have you experienced or witnessed a traumatic event that involved actual or threatened death, serious injury, or sexual violence?',
      options: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0},
      ],
    },
    {
      question:
        'Do you have recurrent, involuntary, and intrusive distressing memories of the traumatic event?',
      options: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0},
      ],
    },
    {
      question:
        'Do you have recurrent distressing dreams in which the content and/or affect of the dream are related to the traumatic event?',
      options: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0},
      ],
    },
    {
      question:
        'Do you experience dissociative reactions (e.g., flashbacks) in which the traumatic event feels like it is recurring?',
      options: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0},
      ],
    },
    {
      question:
        'Do you experience intense or prolonged psychological distress at exposure to internal or external cues that symbolize or resemble an aspect of the traumatic event?',
      options: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0},
      ],
    },
    {
      question:
        'Do you experience marked physiological reactions to internal or external cues that symbolize or resemble an aspect of the traumatic event?',
      options: [
        {label: 'Yes', value: 1},
        {label: 'No', value: 0},
      ],
    },
  ];

  const [answers, setAnswers] = React.useState(
    Array(depressionQnz.length).fill(''),
  );

  // console.log(answers);

  // get the params
  const {id, title} = route.params;

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text style={Styles.Screen_headings}>{title}</Text>
          <Text style={Styles.Screen_headings}>Test Questions</Text>
        </View>

        {/* Content section */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                paddingTop: 10,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{width: '100%', textAlign: 'center', ...Styles.heading}}>
                Questions
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 15,
                paddingLeft: 15,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackBtn width={30} height={30} fill={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* The Question section */}
            <View style={styles.diagnosis_questions}>
              <View style={styles.questionForm}>
                {title === 'Depression' &&
                  depressionQnz.map((item, index) => (
                    <View key={index} style={styles.fieldContainer}>
                      <Text style={styles.question}>{item.question}</Text>
                      <RadioForm
                        styles={{marginVertical: 10}}
                        radio_props={item.options}
                        formHorizontal={false}
                        labelHorizontal={true}
                        initial={-1}
                        buttonColor={COLORS.primary}
                        selectedButtonColor={COLORS.primary}
                        labelStyle={{fontSize: 16, color: COLORS.primary}}
                        buttonSize={10}
                        buttonOuterSize={20}
                        animation={true}
                        onPress={value => {
                          setAnswers(prevAnswers => {
                            const newAnswers = [...prevAnswers];
                            newAnswers[index] = value;
                            return newAnswers;
                          });
                        }}
                      />
                    </View>
                  ))}
                {title === 'Stress' &&
                  stressQnz.map((item, index) => (
                    <View key={index} style={styles.fieldContainer}>
                      <Text style={styles.question}>{item.question}</Text>
                      <RadioForm
                        styles={{marginVertical: 10}}
                        radio_props={item.options}
                        formHorizontal={false}
                        labelHorizontal={true}
                        initial={-1}
                        buttonColor={COLORS.primary}
                        selectedButtonColor={COLORS.primary}
                        labelStyle={{fontSize: 16, color: COLORS.primary}}
                        buttonSize={10}
                        buttonOuterSize={20}
                        animation={true}
                        onPress={value => {
                          setAnswers(prevAnswers => {
                            const newAnswers = [...prevAnswers];
                            newAnswers[index] = value;
                            return newAnswers;
                          });
                        }}
                      />
                    </View>
                  ))}
                {title === 'Anxiety' &&
                  anxietyQnz.map((item, index) => (
                    <View key={index} style={styles.fieldContainer}>
                      <Text style={styles.question}>{item.question}</Text>
                      <RadioForm
                        styles={{marginVertical: 10}}
                        radio_props={item.options}
                        formHorizontal={false}
                        labelHorizontal={true}
                        initial={-1}
                        buttonColor={COLORS.primary}
                        selectedButtonColor={COLORS.primary}
                        labelStyle={{fontSize: 16, color: COLORS.primary}}
                        buttonSize={10}
                        buttonOuterSize={20}
                        animation={true}
                        onPress={value => {
                          setAnswers(prevAnswers => {
                            const newAnswers = [...prevAnswers];
                            newAnswers[index] = value;
                            return newAnswers;
                          });
                        }}
                      />
                    </View>
                  ))}
                {title === 'PTSD' &&
                  ptsdQnz.map((item, index) => (
                    <View key={index} style={styles.fieldContainer}>
                      <Text style={styles.question}>{item.question}</Text>
                      <RadioForm
                        styles={{marginVertical: 10}}
                        radio_props={item.options}
                        formHorizontal={false}
                        labelHorizontal={true}
                        initial={-1}
                        buttonColor={COLORS.primary}
                        selectedButtonColor={COLORS.primary}
                        labelStyle={{fontSize: 16, color: COLORS.primary}}
                        buttonSize={10}
                        buttonOuterSize={20}
                        animation={true}
                        onPress={value => {
                          setAnswers(prevAnswers => {
                            const newAnswers = [...prevAnswers];
                            newAnswers[index] = value;
                            return newAnswers;
                          });
                        }}
                      />
                    </View>
                  ))}

                <CurvedButton
                  text="Submit"
                  textColor={COLORS.primary}
                  style={{
                    marginTop: 20,
                    backgroundColor: COLORS.secondary,
                    width: '100%',
                    height: 50,
                  }}
                  onPress={() =>
                    navigation.push('TestResults', {id: id, title: title})
                  }
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default Test;

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
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  questionForm: {
    width: '100%',
    paddingHorizontal: 10,
  },
  // question form
  diagnosis_questions: {
    width: '100%',
    paddingBottom: 200,
    paddingHorizontal: 15,
  },

  fieldContainer: {
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});
