// imports
import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import moment from 'moment';
import RadioGroup from 'react-native-radio-buttons-group';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import {Formik} from 'formik';
import {COLORS, ProfileMale} from '../../constants';
import Styles from '../../constants/Styles';
import {BackBtn, MessageIcon, EditIcon, ViewIconeye} from '../../components';
import Screen from '../../layout/Screen';
import {AuthContext} from '../../navigations/Context/AuthContext';
import {editTherapistDetailsInFirestore} from '../../../fireStore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// lazy loading
const Table = React.lazy(() => import('../../components/table/Table'));
const Datepicker = React.lazy(() =>
  import('../../components/date&timepicker/Datepicker'),
);
const CenterHalf = React.lazy(() =>
  import('../../components/Modals/CenterHalf'),
);

const TherapistProfile = ({navigation}) => {
  // context
  const {anonymous, setError, setErrorStatus, userData} =
    useContext(AuthContext);
  const [Loading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const userUid = auth().currentUser.uid;
  const currentUser = auth().currentUser;
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [schedule, setSchedule] = React.useState([]);
  const [editMode, setEditMode] = React.useState(false);

  // dropdown
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [items, setItems] = React.useState([
    {label: 'active', value: 'active'},
    {label: 'inactive', value: 'inactive'},
  ]);

  // availability
  const [availability, setAvailability] = React.useState([]);
  const [availabe, setAvailable] = React.useState([
    {label: 'Mon', checked: false},
    {label: 'Tue', checked: false},
    {label: 'Wed', checked: false},
    {label: 'Thus', checked: false},
    {label: 'Frid', checked: false},
  ]);

  // appointment time
  const [appointmentTime, setAppointmentTime] = React.useState([]);
  const [appointments, setAppointments] = React.useState([
    {label: '8 Am', checked: false},
    {label: '9 Am', checked: false},
    {label: '12 Pm', checked: false},
    {label: '3 Pm', checked: false},
    {label: '4 Pm', checked: false},
  ]);

  const handleCheck = index => {
    // copy the options array
    const newOptions = [...availabe];
    // toggle the checked value of the selected option
    newOptions[index].checked = !newOptions[index].checked;
    // update the state
    setAvailable(newOptions);

    const availabilityValue = [];
    newOptions.forEach(item => {
      if (item.checked) {
        availabilityValue.push(item.label);
      }
    });
    setAvailability(availabilityValue);
  };

  const handleCheck2 = index => {
    // copy the options array
    const newOptions = [...appointments];
    // toggle the checked value of the selected option
    newOptions[index].checked = !newOptions[index].checked;
    // update the state
    setAppointments(newOptions);

    const appointmentValue = [];
    newOptions.forEach(item => {
      if (item.checked) {
        appointmentValue.push(item.label);
      }
    });
    setAppointmentTime(appointmentValue);
  };

  // function to edit therapist details
  const editTherapistDetails = values => {
    editTherapistDetailsInFirestore(
      setLoading,
      setErrorStatus,
      setError,
      values,
      status,
      availability,
      appointmentTime,
    );

    // set edit mode to false
    setEditMode(false);
  };

  // function to fetch the therapist schedule
  const fetchSchedule = async () => {
    setLoading(true);
    await firestore()
      .collection('Therapists')
      .doc(userUid)
      .collection('Schedule')
      .onSnapshot(querySnapshot => {
        const schedule = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });
        setSchedule(schedule);
      });

    setLoading(false);
  };

  // function to fetch the therapist details
  const fetchDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('Therapists')
      .doc(userUid)
      .onSnapshot(documentSnapshot => {
        setDetails(documentSnapshot.data());
      });
    setLoading(false);
  };

  React.useEffect(() => {
    fetchDetails();
    fetchSchedule();
  }, []);

  // radio buttons Options for time using iteration for appointmentValue array
  const radioButtons = React.useMemo(() => {
    const options = [];
    if (details.appointmentValue) {
      details.appointmentValue.forEach((time, index) => {
        options.push({
          id: time + ' Session',
          label: time + ' Session',
          value: time,
          color: COLORS.primary,
          labelStyle: {
            fontSize: 14,
            color: COLORS.black,
          },
        });
      });
    } else {
      options.push({
        disabled: true,
        id: 'No Session Available',
        label: 'No Session Available',
        value: 'No Session Available',
        color: COLORS.primary,
        labelStyle: {
          fontSize: 14,
          color: COLORS.black,
        },
      });
    }

    return options;
  }, []);

  // table content
  const TABLECONTENT = {
    tableHead: ['Day', 'Time'],
    tableData: schedule.map(item => [
      moment(item.date, 'YYYY/MM/DD').format('MMMM Do YYYY'),
      item.time,
    ]),
  };

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* Content */}

        <Formik
          initialValues={{
            about: details ? details.about : '',
          }}
          onSubmit={values => {
            editTherapistDetails(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={Styles.Content}>
              {details ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.wrapper}>
                    {userData.userType === 'Client' && (
                      <View
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: 20,
                          paddingVertical: 20,
                          paddingHorizontal: 10,
                        }}>
                        <Text style={Styles.heading}>Therapist</Text>
                      </View>
                    )}

                    <View
                      style={{
                        paddingHorizontal: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      {userData.userType === 'Client' ? (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <BackBtn
                            width={30}
                            height={30}
                            fill={COLORS.primary}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Text style={Styles.heading}>Therapist</Text>
                      )}
                      {editMode ? (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity onPress={handleSubmit}>
                            <Text
                              style={{
                                color: COLORS.white,
                                fontSize: 16,
                                padding: 10,
                                borderRadius: 10,
                                backgroundColor: COLORS.orange,
                                marginRight: 10,
                              }}>
                              Save changes
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setEditMode(false)}>
                            <Text
                              style={{
                                color: COLORS.white,
                                fontSize: 16,
                                padding: 10,
                                borderRadius: 10,
                                backgroundColor: COLORS.red,
                                textAlign: 'center',
                              }}>
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            style={{marginHorizontal: 20}}
                            onPress={() => setEditMode(true)}>
                            <EditIcon
                              width={30}
                              height={30}
                              fill={COLORS.tertiary}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                    {/* Therapist information */}
                    <View style={styles.Therapist_information}>
                      {/* top info section */}
                      <View style={styles.card}>
                        <View>
                          <Image
                            source={
                              details.image ? {uri: details.image} : ProfileMale
                            }
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 50,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}>
                          <View style={{position: 'relative'}}>
                            <Text style={Styles.heading2}>
                              {details.name ? details.name : 'Loading...'}
                            </Text>
                            <Text style={Styles.title2}>
                              {details.title ? details.title : 'Loading...'}
                            </Text>
                            <Text style={Styles.text}>
                              Language:
                              {details.languageValue
                                ? details.languageValue.map((lang, index) => {
                                    return (
                                      <Text key={index}>
                                        {lang}
                                        {index ===
                                        details.languageValue.length - 1
                                          ? ''
                                          : ', '}
                                      </Text>
                                    );
                                  })
                                : 'Loading...'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* About section */}
                      <View style={styles.card}>
                        <View style={{width: '100%'}}>
                          <Text style={Styles.heading2}>About</Text>
                          {editMode ? (
                            <TextInput
                              style={{
                                marginBottom: 10,
                                width: '100%',
                                height: 'auto',
                                borderWidth: 1,
                                borderColor: COLORS.gray,
                                borderRadius: 10,
                                padding: 5,
                              }}
                              multiline={true}
                              defaultValue={details.about}
                              value={values.about}
                              onBlur={handleBlur('about')}
                              onChangeText={handleChange('about')}
                            />
                          ) : (
                            <Text style={Styles.text}>
                              {details.about ? details.about : 'Loading...'}
                            </Text>
                          )}
                        </View>
                      </View>

                      {/* Availability section */}
                      <View style={styles.card}>
                        <View style={{flex: 1}}>
                          <Text style={{paddingBottom: 10, ...Styles.heading2}}>
                            Availability
                          </Text>
                          <View>
                            {editMode ? (
                              <View>
                                {availabe.map((option, index) => (
                                  <View
                                    key={index}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CheckBox
                                      disabled={false}
                                      value={option.checked}
                                      onValueChange={() => handleCheck(index)}
                                    />
                                    <Text>{option.label}</Text>
                                  </View>
                                ))}
                                <Text
                                  style={{paddingVertical: 10, ...Styles.text}}>
                                  Availability Status
                                </Text>
                                <View
                                  style={{
                                    height: 'auto',
                                    position: 'relative',
                                  }}>
                                  <DropDownPicker
                                    listMode="SCROLLVIEW"
                                    showsVerticalScrollIndicator={false}
                                    open={open}
                                    setOpen={setOpen}
                                    items={items}
                                    setItems={setItems}
                                    value={status}
                                    setValue={setStatus}
                                    onChangeItem={item => setStatus(item.value)}
                                    placeholder="Select Status"
                                    dropDownDirection="TOP"
                                    dropDownContainerStyle={{
                                      backgroundColor: COLORS.white,
                                      borderRadius: 10,
                                    }}
                                  />
                                </View>
                              </View>
                            ) : (
                              <View
                                style={{
                                  width: 'auto',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{paddingVertical: 10, ...Styles.text}}>
                                  {details.dayValue
                                    ? details.dayValue.map((day, index) => {
                                        return (
                                          <Text key={index}>
                                            {day}
                                            {index ===
                                            details.dayValue.length - 1
                                              ? ''
                                              : ', '}
                                          </Text>
                                        );
                                      })
                                    : 'Loading...'}
                                </Text>
                                <Text
                                  style={{
                                    padding: 5,
                                    backgroundColor:
                                      details.value === 'active'
                                        ? COLORS.primary
                                        : details.value
                                        ? COLORS.red
                                        : null,
                                    borderRadius: 8,
                                    textAlign: 'center',
                                    ...Styles.text3,
                                  }}>
                                  {details.value}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>

                      {/* Schedule section */}
                      {userData.userType === 'Therapist' && (
                        <View style={styles.card}>
                          <View style={{flex: 1}}>
                            <Text style={Styles.heading2}>Schedule</Text>
                            <View style={{width: '100%', paddingVertical: 10}}>
                              {schedule.length === 0 ? (
                                <Text
                                  style={{...Styles.text, textAlign: 'center'}}>
                                  No schedule available
                                </Text>
                              ) : !Loading ? (
                                <Table
                                  tableHead={TABLECONTENT.tableHead}
                                  tableData={TABLECONTENT.tableData}
                                  BorderColor={COLORS.primary}
                                  BorderWidth={1}
                                  tableDataColor={COLORS.black}
                                  HeaderTextColor={COLORS.white}
                                  HeaderBackgroundColor={COLORS.primary}
                                />
                              ) : (
                                <Text
                                  style={{...Styles.text, textAlign: 'center'}}>
                                  Loading schedule...
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      )}

                      {/* Date picker */}
                      {userData.userType === 'Client' ? (
                        <View
                          style={{
                            ...styles.card2,
                          }}>
                          <Text
                            style={{paddingVertical: 10, ...Styles.heading2}}>
                            Select Appointment Date
                          </Text>
                          <Datepicker datachange={e => setDate(e)} />
                        </View>
                      ) : null}

                      {/* Time picker */}
                      <View style={styles.card}>
                        <View
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            paddingVertical: 10,
                          }}>
                          <Text style={Styles.heading2}>
                            {userData.userType === 'Client'
                              ? 'Select Appointment Time'
                              : 'Appointment Time'}
                          </Text>
                          {editMode ? (
                            appointments.map((option, index) => (
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
                            ))
                          ) : userData.userType === 'Client' ? (
                            <View>
                              <Text style={{paddingBottom: 10, ...Styles.text}}>
                                select based on Therapists availability!
                              </Text>
                              <View
                                style={{
                                  position: 'relative',
                                }}>
                                <RadioGroup
                                  radioButtons={radioButtons}
                                  onPress={time => {
                                    setTime(time);
                                  }}
                                  value={time}
                                  selectedId={time}
                                  layout="column"
                                  containerStyle={{
                                    height: 'auto',
                                    width: '100%',
                                    position: 'relative',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                  }}
                                />
                              </View>
                            </View>
                          ) : details.appointmentValue ? (
                            details.appointmentValue.map((time, index) => (
                              <Text
                                key={index + 1}
                                style={{padding: 10, ...Styles.text}}>
                                {time} Session
                              </Text>
                            ))
                          ) : (
                            <Text style={{padding: 10, ...Styles.text}}>
                              Loading...
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...Styles.text,
                      textAlign: 'center',
                      paddingHorizontal: 20,
                    }}>
                    Your details have not been uploaded yet please redirect to
                    the profile page to upload your details.
                  </Text>
                </View>
              )}
            </View>
          )}
        </Formik>
      </View>
      {/* MODAL */}
      <CenterHalf Visibility={showModal} hide={() => setShowModal(!showModal)}>
        <View
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...Styles.title,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}>
            User Brief Report
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <Text style={{marginTop: 15, ...Styles.text}}>
              Test taken: Depression
            </Text>
            <Text style={{paddingVertical: 5, ...Styles.text}}>
              Depression Level: 80%
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}>
            <Text
              style={{
                color: 'green',
              }}>
              Cancel Session
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(!showModal)}>
            <Text
              style={{
                color: COLORS.red,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </CenterHalf>
    </Screen>
  );
};

export default TherapistProfile;

// Styles
const styles = StyleSheet.create({
  // wrapper
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingBottom: 120,
  },
  // Therapists_information
  Therapist_information: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  // This is the card that holds the therapist information
  card: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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

  card2: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  // table styles
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
});
