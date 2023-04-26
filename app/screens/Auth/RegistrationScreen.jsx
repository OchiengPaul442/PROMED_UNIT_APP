import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

// components
import {RecButton, Checkbox} from '../../components';

// dropdown import
import DropDownPicker from 'react-native-dropdown-picker';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

//layout
import AuthScreen from '../../layout/AuthScreen';

const RegistrationScreen = ({navigation}) => {
  // form fields
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Accept terms and conditions
  const [agree, setAgree] = React.useState(false);

  const toggleCheckbox = () => {
    setAgree(!agree);
  };

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
      <View style={Styles.form}>
        {/* form items */}
        {formItems.map(item => (
          <View key={item.id} style={Styles.group}>
            <Text style={Styles.label}>{item.label}</Text>
            <TextInput
              style={Styles.input}
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
        <View style={Styles.group}>
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
        <Checkbox
          text="I agree to the terms & conditions"
          setAgree={toggleCheckbox}
          agree={agree}
        />

        {/* buttons */}
        <View style={Styles.recButton}>
          <RecButton
            text="Sign Up"
            bgColor={COLORS.primary}
            textColor={COLORS.white}
            onPress={() => navigation.push('Login')}
            w="100%"
          />
          <View style={Styles.separatorWrapper}>
            <View style={Styles.separator}></View>
            <Text style={Styles.separatorText}>OR</Text>
            <View style={Styles.separator}></View>
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
});

export default RegistrationScreen;
