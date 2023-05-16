import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useContext, Suspense} from 'react';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

//General styles
import Styles from '../../constants/Styles';

// yup and formik imports
import {object, string, ref} from 'yup';
import {Formik} from 'formik';

// constants
import {COLORS, ProfileMale} from '../../constants';
import {
  FocusedStatusBar,
  BackBtn,
  RecButton,
  ViewIconeye,
  CloseIconeye,
  EditIcon,
  DeleteIcon,
  RoundLoadingAnimation,
} from '../../components';

// lazy load centerhalf modal
const CenterHalf = React.lazy(() =>
  import('../../components/Modals/CenterHalf'),
);

// checkbox
import CheckBox from '@react-native-community/checkbox';

// dropdown
import DropDownPicker from 'react-native-dropdown-picker';

// fetch functions
import {
  editUserProfile,
  changeUserPassword,
  deleteUserAccount,
  uploadTherapistDetailsToFirestore,
  checkIfTherapistDetailsExists,
  fetchUserAppointments,
  fetchUserDiscussionBoards,
  getUpdatedUserData,
} from '../../../fireStore';

// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// phone number regex
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// form validation schema
let EditValidationSchema = object({
  // username
  username: string().required(),
  // email
  email: string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  // phone number
  phone: string()
    .matches(phoneRegex, 'Phone number is not valid!')
    .required('Phone number is required!'),
});

// form validation schema
let PasswordValidationSchema = object({
  // current password
  currentPassword: string()
    .min(6, ({min}) => `Password must be at least ${min} characters!`)
    .matches(passwordRules, 'Password is not valid!')
    .required('Current Password is required!'),
  // new password
  newPassword: string()
    .min(6, ({min}) => `Password must be at least ${min} characters!`)
    .matches(passwordRules, 'Password is not valid!')
    .required('New Password is required!'),
  // confirm new password
  confirmPassword: string()
    .min(6, ({min}) => `Password must be at least ${min} characters!`)
    .oneOf([ref('newPassword'), null], 'Passwords must match')
    .required('Confirmation password is required!'),
});

const Profile = ({navigation}) => {
  // use the useContext hook to get the user data value
  const {
    userData,
    anonymous,
    setError,
    setErrorStatus,
    setUserToken,
    setLoading,
  } = useContext(AuthContext);

  // edit mode
  const [editMode, setEditMode] = React.useState(false);

  // upload status
  const [uploadStatus, setUploadStatus] = React.useState(false);

  // Get the user appointments
  const [userAppointments, setUserAppointments] = React.useState(0);

  // get the user discussion boards
  const [userDiscussionBoards, setUserDiscussionBoards] = React.useState(0);

  // show password
  const [showPassword1, setShowPassword1] = React.useState(true);
  const [showPassword2, setShowPassword2] = React.useState(true);
  const [showPassword3, setShowPassword3] = React.useState(true);

  // MODAL
  const [isModalVisible2, setModalVisible2] = React.useState(false);

  // therapist details
  const [TherapistDetailsExists, setTherapistDetailsExists] =
    React.useState(false);
  const [name, setName] = React.useState('');
  const [Location, setLocation] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [workplace, setWorkplace] = React.useState('');
  const [about, setAbout] = React.useState('');

  // dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'active', value: 'active'},
    {label: 'inactive', value: 'inactive'},
  ]);

  // days available
  const [dayValue, setDayValue] = React.useState([]);
  const [days, setDays] = React.useState([
    {label: 'Mon', checked: false},
    {label: 'Tue', checked: false},
    {label: 'Wed', checked: false},
    {label: 'Thus', checked: false},
    {label: 'Frid', checked: false},
  ]);

  // appointment time
  const [appointmentValue, setAppointmentValue] = React.useState([]);
  const [appointment, setAppointment] = React.useState([
    {label: '8 Am', checked: false},
    {label: '9 Am', checked: false},
    {label: '12 Pm', checked: false},
    {label: '3 Pm', checked: false},
    {label: '4 Pm', checked: false},
  ]);

  // Languages
  const [languageValue, setLanguageValue] = React.useState([]);
  const [language, setLanguage] = React.useState([
    {label: 'English', checked: false},
    {label: 'Acholi', checked: false},
    {label: 'Luganda', checked: false},
  ]);

  const handleCheck1 = index => {
    // copy the options array
    const newOptions = [...days];
    // toggle the checked value of the selected option
    newOptions[index].checked = !newOptions[index].checked;
    // update the state
    setDays(newOptions);

    // allow multiple selection of days and add setDaysValue to the array
    const selectedDays = newOptions
      .filter(option => option.checked)
      .map(option => option.label);
    setDayValue(selectedDays);
  };

  const handleCheck2 = index => {
    // copy the options array
    const newOptions = [...appointment];
    // toggle the checked value of the selected option
    newOptions[index].checked = !newOptions[index].checked;
    // update the state
    setAppointment(newOptions);

    // allow multiple selection of appointments and add setAppointmentValue to the array
    const selectedAppointments = newOptions
      .filter(option => option.checked)
      .map(option => option.label);
    setAppointmentValue(selectedAppointments);
  };

  const handleCheck3 = index => {
    // copy the options array
    const newOptions = [...language];
    // toggle the checked value of the selected option
    newOptions[index].checked = !newOptions[index].checked;
    // update the state
    setLanguage(newOptions);

    // allow multiple selection of languages and add setLanguageValue to the array
    const selectedLanguages = newOptions
      .filter(option => option.checked)
      .map(option => option.label);
    setLanguageValue(selectedLanguages);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  // function upload therapist details to firestore
  const uploadTherapistDetails = async () => {
    // check if the user is anonymous
    if (anonymous) {
      // if the user is anonymous, show an alert
      Alert.alert(
        'Anonymous User',
        'You need to create an account to access this feature',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Create Account',
            onPress: () => navigation.navigate('Register'),
          },
        ],
      );
    } else {
      // if the user is not anonymous, upload the therapist details to firestore
      uploadTherapistDetailsToFirestore(
        setLoading,
        setErrorStatus,
        setError,
        name,
        Location,
        title,
        workplace,
        about,
        value,
        dayValue,
        appointmentValue,
        languageValue,
        setUploadStatus,
      );

      // set therapist details exists to true
      setTherapistDetailsExists(true);
    }
  };

  // Edit user profile function
  const editProfile = async (values, resetForm) => {
    editUserProfile(setLoading, setErrorStatus, setError, values, resetForm);

    // set edit mode to false
    setEditMode(false);
  };

  // Change user password function
  const changePassword = async (values, resetForm) => {
    changeUserPassword(setLoading, setErrorStatus, setError, values, resetForm);
  };

  // Delete user account function
  const deleteAccount = async () => {
    deleteUserAccount(
      setLoading,
      setErrorStatus,
      setError,
      toggleModal2,
      setUserToken,
    );
  };

  React.useEffect(() => {
    // check if therapist details exists
    checkIfTherapistDetailsExists(setTherapistDetailsExists);

    // fetch number of discussion boards joined
    fetchUserDiscussionBoards()
      .then(count => {
        setUserDiscussionBoards(count);
      })
      .catch(e => {
        // set the user discussion boards to 0
        setUserDiscussionBoards(0);

        // set the error
        setError(e.message);
      });

    // fetch the user appointments
    fetchUserAppointments()
      .then(count => {
        setUserAppointments(count);
      })
      .catch(e => {
        // set the user appointments to 0
        setUserAppointments(0);

        // set the error
        setError(e.message);
      });
  }, []);

  return (
    <SafeAreaView>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      {/* Head */}
      <View style={Styles.Container}>
        <View style={styles.Profile_screen}>
          <View
            style={{
              padding: 10,
              display: 'flex',
              width: '100%',
              height: '8%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackBtn width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <EditIcon width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View style={styles.Profile_image}>
            <Image
              source={
                userData.photoURL ? {uri: userData.photoURL} : ProfileMale
              }
              style={{width: 120, height: 120, borderRadius: 100}}
            />
          </View>

          {/* Content */}
          <View style={Styles.Content}>
            <View style={styles.Profile_container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* dashboard */}
                <View style={{paddingHorizontal: 10, paddingBottom: 180}}>
                  <Text style={{paddingVertical: 10, ...Styles.heading2}}>
                    Dashboard
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          {anonymous ? 'N/A' : userAppointments}
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Appointments</Text>
                    </View>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          {anonymous ? 'N/A' : userDiscussionBoards}
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Communities Joined</Text>
                    </View>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          {anonymous ? 'N/A' : '0%'}
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Recent Test score</Text>
                    </View>
                  </View>
                  {/* personal details */}
                  <View
                    style={{
                      width: '100%',
                      ...styles.card,
                    }}>
                    {!editMode ? (
                      <View>
                        <Text
                          style={{
                            textAlign: 'left',
                            width: '100%',
                            ...Styles.title,
                          }}>
                          Personal Details
                        </Text>
                        <View style={styles.pesonal_details}>
                          <Text style={Styles.title2}>Name:</Text>
                          <Text
                            style={{
                              flex: 1,
                              textAlign: 'right',
                              textTransform: 'capitalize',
                              ...Styles.text,
                            }}>
                            {anonymous
                              ? 'N/A'
                              : userData.userName
                              ? userData.userName
                              : 'Loading...'}
                          </Text>
                        </View>
                        <View style={styles.pesonal_details}>
                          <Text style={Styles.title2}>Email address:</Text>
                          <Text
                            style={{
                              flex: 1,
                              textAlign: 'right',
                              ...Styles.text,
                            }}>
                            {anonymous
                              ? 'N/A'
                              : userData
                              ? userData.email
                              : 'Loading...'}
                          </Text>
                        </View>
                        <View style={styles.pesonal_details}>
                          <Text style={Styles.title2}>Phone number:</Text>
                          <Text
                            style={{
                              flex: 1,
                              textAlign: 'right',
                              ...Styles.text,
                            }}>
                            {anonymous
                              ? 'N/A'
                              : userData
                              ? userData.phoneNumber
                              : 'Loading...'}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Formik
                        initialValues={{
                          username: anonymous
                            ? 'N/A'
                            : userData
                            ? userData.displayName
                            : 'Loading...',
                          email: anonymous
                            ? 'N/A'
                            : userData
                            ? userData.email
                            : 'Loading...',
                          phone: anonymous
                            ? 'N/A'
                            : userData
                            ? userData.phoneNumber
                            : 'Loading...',
                        }}
                        validateOnMount={true}
                        validationSchema={EditValidationSchema}
                        onSubmit={(values, {resetForm}) => {
                          editProfile(values, resetForm);
                        }}>
                        {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          errors,
                          touched,
                        }) => (
                          <KeyboardAvoidingView>
                            <View style={{width: '100%'}}>
                              <Text style={Styles.title}>
                                Edit Personal details
                              </Text>
                              <View
                                style={{
                                  width: '100%',
                                  position: 'relative',
                                }}>
                                <View style={Styles.Qgroup}>
                                  <Text style={Styles.Qlabel}>Username</Text>
                                  <TextInput
                                    style={{marginBottom: 10, ...Styles.Qinput}}
                                    placeholder=""
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                  />
                                  {errors.username && touched.username && (
                                    <Text style={Styles.error}>
                                      {errors.username}
                                    </Text>
                                  )}
                                </View>
                                <View style={Styles.Qgroup}>
                                  <Text style={Styles.Qlabel}>
                                    Email Address
                                  </Text>
                                  <TextInput
                                    style={{marginBottom: 10, ...Styles.Qinput}}
                                    placeholder=""
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                  />
                                  {errors.email && touched.email && (
                                    <Text style={Styles.error}>
                                      {errors.email}
                                    </Text>
                                  )}
                                </View>
                                <View style={Styles.Qgroup}>
                                  <Text style={Styles.Qlabel}>
                                    Phone Number
                                  </Text>
                                  <TextInput
                                    style={{marginBottom: 10, ...Styles.Qinput}}
                                    placeholder=""
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                  />
                                  {errors.phone && touched.phone && (
                                    <Text style={Styles.error}>
                                      {errors.phone}
                                    </Text>
                                  )}
                                </View>
                                <View
                                  style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <RecButton
                                    onPress={anonymous ? null : handleSubmit}
                                    w={100}
                                    text={anonymous ? 'N/A' : 'Edit'}
                                    bgColor={COLORS.primary}
                                    textColor={COLORS.white}
                                  />
                                  <RecButton
                                    onPress={() => setEditMode(false)}
                                    w={100}
                                    text="Close"
                                    bgColor={COLORS.tertiary}
                                    textColor={COLORS.white}
                                  />
                                </View>
                              </View>
                            </View>
                          </KeyboardAvoidingView>
                        )}
                      </Formik>
                    )}
                  </View>

                  {/* change password section */}
                  <Formik
                    initialValues={{
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    }}
                    validateOnMount={true}
                    validationSchema={PasswordValidationSchema}
                    onSubmit={(values, {resetForm}) => {
                      changePassword(values, resetForm);
                    }}>
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                    }) => (
                      <View style={{width: '100%', ...styles.card}}>
                        <Text
                          style={{
                            textAlign: 'left',
                            width: '100%',
                            marginBottom: 10,
                            ...Styles.title,
                          }}>
                          Change Password
                        </Text>
                        <View>
                          {/* current password */}
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>Current Password</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              onBlur={handleBlur('currentPassword')}
                              value={values.currentPassword}
                              onChangeText={handleChange('currentPassword')}
                              secureTextEntry={showPassword1}
                            />
                            <TouchableOpacity
                              style={{marginTop: 5, ...Styles.icon}}
                              onPress={() => setShowPassword1(!showPassword1)}>
                              {!showPassword1 ? (
                                <ViewIconeye
                                  width={24}
                                  height={24}
                                  fill={COLORS.primary}
                                />
                              ) : (
                                <CloseIconeye
                                  width={24}
                                  height={24}
                                  fill={COLORS.primary}
                                />
                              )}
                            </TouchableOpacity>
                            {errors.currentPassword &&
                              touched.currentPassword && (
                                <Text style={Styles.error}>
                                  {errors.currentPassword}
                                </Text>
                              )}
                          </View>
                          {/* new password */}
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>New Password</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              onBlur={handleBlur('newPassword')}
                              value={values.newPassword}
                              onChangeText={handleChange('newPassword')}
                              secureTextEntry={showPassword2}
                            />
                            <TouchableOpacity
                              style={{marginTop: 5, ...Styles.icon}}
                              onPress={() => setShowPassword2(!showPassword2)}>
                              {!showPassword2 ? (
                                <ViewIconeye
                                  width={24}
                                  height={24}
                                  fill={COLORS.primary}
                                />
                              ) : (
                                <CloseIconeye
                                  width={24}
                                  height={24}
                                  fill={COLORS.primary}
                                />
                              )}
                            </TouchableOpacity>
                            {errors.newPassword && touched.newPassword && (
                              <Text style={Styles.error}>
                                {errors.newPassword}
                              </Text>
                            )}
                          </View>
                          {/* confirm password */}
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>Confirm Password</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              onBlur={handleBlur('confirmPassword')}
                              value={values.confirmPassword}
                              onChangeText={handleChange('confirmPassword')}
                              secureTextEntry={showPassword3}
                            />
                            <TouchableOpacity
                              style={{marginTop: 5, ...Styles.icon}}
                              onPress={() => setShowPassword3(!showPassword3)}>
                              {!showPassword3 ? (
                                <ViewIconeye
                                  width={24}
                                  height={24}
                                  fill={COLORS.primary}
                                />
                              ) : (
                                <CloseIconeye
                                  width={24}
                                  height={24}
                                  fill={COLORS.primary}
                                />
                              )}
                            </TouchableOpacity>
                            {errors.confirmPassword &&
                              touched.confirmPassword && (
                                <Text style={Styles.error}>
                                  {errors.confirmPassword}
                                </Text>
                              )}
                          </View>
                          {/* submit button */}
                          <RecButton
                            onPress={anonymous ? null : handleSubmit}
                            text={anonymous ? 'N/A' : 'Change Password'}
                            bgColor={COLORS.secondary}
                            textColor={COLORS.black}
                          />
                        </View>
                      </View>
                    )}
                  </Formik>

                  {/* Therapist details */}
                  {userData && userData.userType === 'Therapist' ? (
                    <View style={{width: '100%', ...styles.card}}>
                      <Text
                        style={{
                          textAlign: 'left',
                          width: '100%',
                          marginBottom: 10,
                          ...Styles.title,
                        }}>
                        Therapist account settings
                      </Text>
                      {TherapistDetailsExists ? (
                        <View
                          style={{
                            width: '100%',
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: '100%',
                              marginBottom: 10,
                              ...Styles.text,
                            }}>
                            You have already filled in your therapist details.
                          </Text>
                        </View>
                      ) : !uploadStatus ? (
                        <KeyboardAvoidingView>
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>Doctors Name</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              value={name}
                              onChangeText={setName}
                            />
                          </View>
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>Location</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              value={Location}
                              onChangeText={setLocation}
                            />
                          </View>
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>Job title</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              value={title}
                              onChangeText={setTitle}
                            />
                          </View>
                          <View style={{width: '100%', ...Styles.Qgroup}}>
                            <Text style={Styles.Qlabel}>Workplace</Text>
                            <TextInput
                              style={{marginBottom: 10, ...Styles.Qinput}}
                              placeholder=""
                              value={workplace}
                              onChangeText={setWorkplace}
                            />
                          </View>
                          <View style={{width: '100%'}}>
                            <Text style={Styles.Qlabel}>About</Text>
                            <TextInput
                              multiline={true}
                              style={{
                                marginBottom: 10,
                                ...Styles.Qinput,
                                height: 100,
                              }}
                              placeholder=""
                              value={about}
                              onChangeText={setAbout}
                            />
                          </View>
                          <View style={{width: '100%', marginBottom: 10}}>
                            <Text style={Styles.Qlabel}>Language</Text>
                            <View>
                              {language.map((option, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <CheckBox
                                    disabled={false}
                                    value={option.checked}
                                    onValueChange={() => handleCheck3(index)}
                                  />
                                  <Text>{option.label}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                          <View style={{width: '100%', marginBottom: 10}}>
                            <Text style={Styles.Qlabel}>
                              Availability Status
                            </Text>
                            <DropDownPicker
                              listMode="SCROLLVIEW"
                              showsVerticalScrollIndicator={false}
                              open={open}
                              setOpen={setOpen}
                              items={items}
                              setItems={setItems}
                              value={value}
                              setValue={setValue}
                              onChangeItem={item => setValue(item.value)}
                              placeholder="Select Status"
                              dropDownDirection="TOP"
                              dropDownContainerStyle={{
                                backgroundColor: COLORS.white,
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={{width: '100%', marginBottom: 10}}>
                            <Text style={Styles.Qlabel}>Days Available</Text>
                            <View>
                              {days.map((option1, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <CheckBox
                                    disabled={false}
                                    value={option1.checked}
                                    onValueChange={() => handleCheck1(index)}
                                  />
                                  <Text>{option1.label}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                          <View style={{width: '100%', marginBottom: 10}}>
                            <Text style={Styles.Qlabel}>Appointment Times</Text>
                            <View>
                              {appointment.map((option, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <CheckBox
                                    disabled={false}
                                    value={option.checked}
                                    onValueChange={() => handleCheck2(index)}
                                  />
                                  <Text>{option.label + ' ' + 'Session'}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                          <View style={{width: '100%', marginTop: 10}}>
                            <RecButton
                              onPress={uploadTherapistDetails}
                              text="Upload data"
                              textColor={COLORS.black}
                              bgColor={COLORS.secondary}
                            />
                          </View>
                        </KeyboardAvoidingView>
                      ) : (
                        <View
                          style={{
                            width: '100%',
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: '100%',
                              marginBottom: 10,
                              ...Styles.text,
                            }}>
                            Your details have been Uploaded
                          </Text>
                        </View>
                      )}
                    </View>
                  ) : null}

                  {/* Delete account */}
                  <View style={{width: '100%', ...styles.card}}>
                    <Text
                      style={{
                        textAlign: 'left',
                        width: '100%',
                        marginBottom: 10,
                        ...Styles.title,
                      }}>
                      Delete account
                    </Text>
                    <View>
                      <RecButton
                        onPress={toggleModal2}
                        text="Delete Account"
                        textColor={COLORS.white}
                        bgColor={COLORS.tertiary}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>

      <Suspense fallback={<RoundLoadingAnimation width={80} height={80} />}>
        {/* MODAL */}
        <CenterHalf Visibility={isModalVisible2} hide={toggleModal2}>
          <Text style={Styles.title}>Are You sure about this?</Text>
          <View
            style={{
              width: 'auto',
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <RecButton
              onPress={anonymous ? null : deleteAccount}
              text={anonymous ? 'N/A' : 'Yes'}
              w={100}
              bgColor={COLORS.red}
              textColor={COLORS.white}
            />
            <RecButton
              onPress={toggleModal2}
              text="No"
              w={100}
              bgColor={COLORS.primary}
              textColor={COLORS.white}
            />
          </View>
        </CenterHalf>
      </Suspense>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Profile_screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },

  Profile_image: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  Profile_container: {
    width: '100%',
    height: '100%',
    paddingVertical: 20,
  },

  card_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  card: {
    position: 'relative',
    height: 'auto',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: COLORS.black,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  pesonal_details: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
