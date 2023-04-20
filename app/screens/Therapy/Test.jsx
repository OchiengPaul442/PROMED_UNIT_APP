import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// screen
import Screen from '../../layout/Screen';

// constants
import {COLORS} from '../../constants';
import {BackBtn, CurvedButton} from '../../components';

// navigation
import {useNavigation} from '@react-navigation/native';

const Test = ({route, navigation}) => {
  // handle password
  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [input3, setInput3] = React.useState('');
  const [input4, setInput4] = React.useState('');
  const [input5, setInput5] = React.useState('');
  const [input6, setInput6] = React.useState('');

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
      <View style={styles.Test_Screen}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text style={styles.title_text}>{title}</Text>
          <Text style={styles.title_text}>Test Questions</Text>
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
                Questions
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackBtn width={30} height={30} fill={COLORS.secondary} />
              </TouchableOpacity>
            </View>

            {/* The Question section */}
            <View style={styles.questions}>
              <View style={styles.questionForm}>
                {/* form items */}
                {formItems.map(item => (
                  <View key={item.id} style={styles.group}>
                    <Text style={styles.label}>{item.label}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={item.placeholder}
                      value={item.value}
                      // onChangeText={text => {
                      //   if (item.id === 1) {
                      //     setUsername(text);
                      //   } else if (item.id === 2) {
                      //     setPassword(text);
                      //   }
                      // }}
                      // secureTextEntry={item.id === 2 ? true : false}
                    />
                  </View>
                ))}
                <CurvedButton
                  text="Submit"
                  textColor={COLORS.primary}
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: '100%',
                    height: 50,
                    borderRadius: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 5,
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

  // question form
  questions: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 190,
  },

  // Styles for a group of related form elements
  group: {
    width: '100%',
    height: 50,
    position: 'relative',
    marginBottom: 40,
  },

  // Styles for a form input field
  input: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    fontSize: 18,
    color: COLORS.primary,
    padding: 10,
    marginTop: 10,
  },

  // Styles for a label associated with a form input field
  label: {
    position: 'absolute',
    left: 0,
    top: -24,
    fontSize: 18,
    color: COLORS.primary,
    paddingHorizontal: 5,
  },
});
