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
import {COLORS, Back} from '../../constants';

// components
import {Checkbox, CurvedButton} from '../../components';

// navigation
import {useNavigation} from '@react-navigation/native';

const Terms = ({route}) => {
  // navigation
  const navigation = useNavigation();

  // get the params
  const {id, title} = route.params;

  // disable button
  const [disabled, setDisabled] = React.useState(true);

  return (
    <Screen>
      <View style={styles.Terms_Screen}>
        {/* intro text */}
        <View style={styles.section_title}>
          <Text style={styles.title_text}>{title}</Text>
          <Text style={styles.title_text}>Test</Text>
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
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 15,
                }}>
                Pre-condtion terms
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    padding: 5,
                  }}>
                  <Back />
                </Text>
              </TouchableOpacity>
            </View>

            {/* The terms and conditons */}
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.terms_title}>
                1. Acknowledgment of Limitations
              </Text>
              <Text style={styles.terms_text}>
                The user acknowledges that the self-diagnosis test is not a
                substitute for professional medical advice and should not be
                relied upon as such.
              </Text>
              <Text style={styles.terms_title}>2. Confidentiality</Text>
              <Text style={styles.terms_text}>
                The app will keep all user information confidential and will not
                share it with any third party unless required by law.
              </Text>
              <Text style={styles.terms_title}>3. Accuracy of Information</Text>
              <Text style={styles.terms_text}>
                The user promises to provide accurate information to the best of
                their knowledge.
              </Text>
              <Text style={styles.terms_title}>4. No Liability</Text>
              <Text style={styles.terms_text}>
                The app, its creators, and its affiliates will not be liable for
                any damages resulting from the use of the self-diagnosis test.
              </Text>
            </View>
            {/* Checkbox */}
            <Checkbox text="By checking this, you agree to all the above terms and conditions" />

            {/* Button */}
            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 100,
              }}>
              <CurvedButton
                text="Proceed with the test"
                textColor={COLORS.primary}
                style={{
                  backgroundColor: COLORS.secondary,
                  width: 200,
                  height: 50,
                  marginTop: 20,
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
                  navigation.navigate('Test', {id: id, title: title})
                }
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default Terms;

const styles = StyleSheet.create({
  // This is the main container that holds all the components
  Terms_Screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
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

  terms_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 8,
  },

  terms_text: {
    fontSize: 15,
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    color: COLORS.darkGray,
    marginBottom: 10,
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
});
