import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
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

// fetch functions
import {
  editUserProfile,
  changeUserPassword,
  deleteUserAccount,
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

  // show password
  const [showPassword1, setShowPassword1] = React.useState(true);
  const [showPassword2, setShowPassword2] = React.useState(true);
  const [showPassword3, setShowPassword3] = React.useState(true);

  // MODAL
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);

  // groups
  const [groups, setGroups] = React.useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  // Edit user profile function
  const editProfile = async (values, resetForm) => {
    editUserProfile(
      setLoading,
      setErrorStatus,
      setError,
      toggleModal,
      values,
      resetForm,
    );
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
            <TouchableOpacity onPress={toggleModal}>
              <EditIcon width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View style={styles.Profile_image}>
            <Image
              source={userData ? {uri: userData.photoURL} : ProfileMale}
              style={{width: 120, height: 120, borderRadius: 100}}
            />
          </View>

          {/* Content */}
          <View style={Styles.Content}>
            <View style={styles.Profile_container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: 10, paddingBottom: 180}}>
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
                          {anonymous ? 'N/A' : '2'}
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Appointments</Text>
                    </View>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          {anonymous ? 'N/A' : '2'}
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Communities Joined</Text>
                    </View>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          {anonymous ? 'N/A' : '2'}
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
                          : userData
                          ? userData.displayName
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
        {/* MODAL1 */}
        <CenterHalf Visibility={isModalVisible} hide={toggleModal}>
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
              <View style={{width: '100%'}}>
                <Text style={Styles.title}>Edit details</Text>
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
                      <Text style={Styles.error}>{errors.username}</Text>
                    )}
                  </View>
                  <View style={Styles.Qgroup}>
                    <Text style={Styles.Qlabel}>Email Address</Text>
                    <TextInput
                      style={{marginBottom: 10, ...Styles.Qinput}}
                      placeholder=""
                      onBlur={handleBlur('email')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />
                    {errors.email && touched.email && (
                      <Text style={Styles.error}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={Styles.Qgroup}>
                    <Text style={Styles.Qlabel}>Phone Number</Text>
                    <TextInput
                      style={{marginBottom: 10, ...Styles.Qinput}}
                      placeholder=""
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                    />
                    {errors.phone && touched.phone && (
                      <Text style={Styles.error}>{errors.phone}</Text>
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
                      text={anonymous ? 'N/A' : 'Save'}
                      bgColor={COLORS.primary}
                      textColor={COLORS.white}
                    />
                    <RecButton
                      onPress={toggleModal}
                      w={100}
                      text="Close"
                      bgColor={COLORS.tertiary}
                      textColor={COLORS.white}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </CenterHalf>
        {/* MODAL2 */}
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
