// imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//General styles
import Styles from '../../constants/Styles'; // custom styles for the app

// screen
import Screen from '../../layout/Screen'; // a component for the screen layout

// constants
import {COLORS, SIZES} from '../../constants'; // predefined colors and sizes for the app

// icons
import {BackBtn} from '../../components'; // a component for the back button

// components
import {Checkbox, CurvedButton} from '../../components'; // components for the checkbox and the curved button

const Terms = ({route, navigation}) => {
  // get the params
  const {id, title} = route.params;

  // show or hide button
  const [showBtn, setShowBtn] = React.useState(false);

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text style={Styles.Screen_headings}>{title}</Text>
          <Text style={Styles.Screen_headings}>Test</Text>
        </View>

        {/* Content section */}
        <View style={Styles.Content}>
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
                Pre-condtion terms
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

            {/* The terms and conditons */}
            <View style={{paddingBottom: 120, paddingHorizontal: 10}}>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.terms_title}>
                  Acknowledgment of Limitations
                </Text>
                <Text style={styles.terms_text}>
                  The user acknowledges that the self-diagnosis test is not a
                  substitute for professional medical advice and should not be
                  relied upon as such.
                </Text>
                <Text style={styles.terms_title}>Confidentiality</Text>
                <Text style={styles.terms_text}>
                  The app will keep all user information confidential and will
                  not share it with any third party unless required by law.
                </Text>
                <Text style={styles.terms_title}>Accuracy of Information</Text>
                <Text style={styles.terms_text}>
                  The user promises to provide accurate information to the best
                  of their knowledge.
                </Text>
                <Text style={styles.terms_title}>No Liability</Text>
                <Text style={styles.terms_text}>
                  The app, its creators, and its affiliates will not be liable
                  for any damages resulting from the use of the self-diagnosis
                  test.
                </Text>
              </View>
              {/* Checkbox */}
              <Checkbox
                agree={showBtn}
                setAgree={() => setShowBtn(!showBtn)}
                text="By checking this, you agree to all the above terms and conditions"
              />

              {/* Button */}
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 100,
                }}>
                {showBtn ? (
                  <CurvedButton
                    text="Proceed with the test"
                    textColor={COLORS.primary}
                    style={{
                      backgroundColor: COLORS.secondary,
                      width: 200,
                      height: 50,
                      marginTop: 20,
                    }}
                    onPress={() =>
                      navigation.push('Test', {id: id, title: title})
                    }
                  />
                ) : (
                  ''
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default Terms;

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

  terms_title: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 10,
  },

  terms_text: {
    fontSize: SIZES.small,
    color: COLORS.black,
    marginBottom: 30,
  },
});
