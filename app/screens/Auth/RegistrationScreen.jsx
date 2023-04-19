import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

// components
import {RecButton, Checkbox} from '../../components';

// dropdown import
import DropDownPicker from 'react-native-dropdown-picker';

// constants
import {COLORS} from '../../constants';

//layout
import AuthScreen from '../../layout/AuthScreen';

const RegistrationScreen = ({navigation}) => {
  // form fields
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  // list of items in the form with their labels and placeholders for the input fields respectively using maps and their own keys
  const formItems = [
    {
      id: 1,
      value: username,
      label: 'Username',
      placeholder: '',
    },
    {
      id: 2,
      value: email,
      label: 'Email Address',
      placeholder: 'example@gmail.com',
    },
    {
      id: 3,
      value: phone,
      label: 'Phone Number',
      placeholder: '+256-444-445-666',
    },
    {
      id: 4,
      value: password,
      label: 'Password',
      placeholder: '',
    },
  ];

  // handle dropdown
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Female', value: 'Female'},
    {label: 'Male', value: 'Male'},
    {label: 'Other', value: 'Other'},
  ]);

  return (
    <AuthScreen form_title="SIGN UP FORM">
      <View style={styles.form}>
        {/* form items */}
        {formItems.map(item => (
          <View key={item.id} style={styles.group}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={text => {
                if (item.id === 1) {
                  setUsername(text);
                } else if (item.id === 2) {
                  setEmail(text);
                } else if (item.id === 3) {
                  setPhone(text);
                } else if (item.id === 4) {
                  setPassword(text);
                }
              }}
              secureTextEntry={item.id === 4 ? true : false}
            />
          </View>
        ))}

        {/* dropdown */}
        <View style={styles.group}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            showsVerticalScrollIndicator={false}
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            placeholder="Select your Gender"
            style={styles.dropdown}
            dropDownDirection="TOP"
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        {/* checkbox */}
        <Checkbox text="I agree to the terms & conditions" />

        {/* buttons */}
        <View style={styles.recButton}>
          <RecButton
            text="Sign Up"
            bgColor={COLORS.primary}
            textColor={COLORS.white}
            onPress={() => navigation.push('Login')}
            w="100%"
          />
          <View style={styles.separatorWrapper}>
            <View style={styles.separator}></View>
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separator}></View>
          </View>
          <RecButton
            text="Login"
            bgColor={COLORS.secondary}
            textColor={COLORS.primary}
            onPress={() => navigation.push('Login')}
            w="100%"
          />
        </View>
      </View>
    </AuthScreen>
  );
};

// styles
const styles = StyleSheet.create({
  // Styles for the form section within the main container
  form: {
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingBottom: 10,
    paddingTop: 12,
  },

  // Styles for a group of related form elements
  group: {
    width: '100%',
    height: 50,
    position: 'relative',
    marginBottom: 30,
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
    top: -10,
    fontSize: 18,
    color: COLORS.primary,
    paddingHorizontal: 5,
  },

  // dropdown styles here
  dropdown: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    width: '100%',
  },

  // Styles for a dropdown menu container
  dropdownContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 100,
  },

  // Styles for a dropdown menu
  dropdownStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
  },

  // Styles for a wrapper element containing multiple form elements
  wrapper: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Styles for a forward button or link
  fwdPassword: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // Styles for text within a forward button or link
  fwdText: {
    color: COLORS.primary,
    fontSize: 18,
  },

  // Styles for a button or link to recover a forgotten password
  recButton: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },

  // Styles for a separator element used to visually divide sections of the form
  separatorWrapper: {
    width: '100%',
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles for the separator line within the separator element
  separator: {
    width: '30%',
    height: 1,
    backgroundColor: COLORS.primary,
  },

  // Styles for text within the separator element
  separatorText: {
    color: COLORS.primary,
    fontSize: 18,
    paddingHorizontal: 10,
  },
});

export default RegistrationScreen;
