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
import {COLORS, SIZES} from '../../constants'; // predefined colors and sizes for the app
import {BackBtn, CurvedButton} from '../../components'; // components for the back button and the curved button

const Test = ({route, navigation}) => {
  // handle password
  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [input3, setInput3] = React.useState('');
  const [input4, setInput4] = React.useState('');
  const [input5, setInput5] = React.useState('');

  // list of items in the form with their labels and placeholders for the input fields respectively using maps and their own keys
  const formItems = [
    {
      id: 1,
      value: input1,
      label: 'Have you been feeling sad or down most of the time?',
      placeholder: '',
    },
    {
      id: 2,
      value: input2,
      label: 'Have you lost interest in activities you used to enjoy?',
      placeholder: '',
    },
    {
      id: 3,
      value: input3,
      label:
        'Have you been having trouble sleeping, either sleeping too much or too little?',
      placeholder: '',
    },
    {
      id: 4,
      value: input4,
      label: 'Have you been feeling hopeless or helpless?',
      placeholder: '',
    },
    {
      id: 5,
      value: input5,
      label:
        'Have you been experiencing changes in your appetite, either eating too much or too little?',
      placeholder: '',
    },
    {
      id: 6,
      value: input4,
      label: 'Have you been experiencing changes in your sex drive?',
      placeholder: '',
    },
  ];

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
                {/* form items */}
                {formItems.map(item => (
                  <View key={item.id} style={Styles.Qgroup}>
                    <Text style={Styles.Qlabel}>{item.label}</Text>
                    <TextInput
                      style={Styles.Qinput}
                      placeholder={item.placeholder}
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

  // question form
  diagnosis_questions: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 200,
    paddingHorizontal: 10,
  },
});
