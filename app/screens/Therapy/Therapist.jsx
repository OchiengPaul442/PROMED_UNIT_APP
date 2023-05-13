import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
// moment
import moment from 'moment';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// radio button
import RadioGroup from 'react-native-radio-buttons-group';

//General styles
import Styles from '../../constants/Styles';

// screens
import Screen from '../../layout/Screen';

// constants
import {COLORS, ProfileMale} from '../../constants';
import {
  BackBtn,
  MessageIcon,
  CallIcon,
  CurvedButton,
  EditIcon,
  DeleteIcon,
} from '../../components';

// Lazy load the Table and Datepicker components
const Table = React.lazy(() => import('../../components/table/Table'));
const Datepicker = React.lazy(() =>
  import('../../components/date&timepicker/Datepicker'),
);

// checkbox
import CheckBox from '@react-native-community/checkbox';

// dropdown
import DropDownPicker from 'react-native-dropdown-picker';

// fetch functions
import {
  fetchTherapistSchedule,
  editTherapistDetailsInFirestore,
  fetchSelectedTherapist,
} from '../../../fireStore';

const Therapy = ({navigation, route}) => {
  // context
  const {anonymous, setError, setErrorStatus, userData} =
    useContext(AuthContext);

  // get params
  const {item} = route.params;

  // set loading state
  const [Loading, setLoading] = React.useState(true);

  // items
  const [details, setDetails] = React.useState([]);

  // time and date
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  // set schedule
  const [schedule, setSchedule] = React.useState([]);

  // set edit mode
  const [editMode, setEditMode] = React.useState(false);

  // about
  const [about, setAbout] = React.useState(details.about);

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

  // function to BookAppointment
  const bookAppointment = () => {
    try {
      // check if date and time is selected
      if (date === '' || time === '') {
        // set error message
        setError('Please select a date and time');
        return;
      } else {
        // before booking check if that day and time is available
        const check = schedule.filter(
          items => items.date === date && items.time === time,
        );

        // if check is not empty
        if (check.length !== 0) {
          // set error message
          setError('This time slot is not available');
          return;
        } else {
          // navigate to confirmation screen
          navigation.push('Confirmation', {
            name: details.name,
            therapistId: details.key,
            title: details.title,
            image: details.image,
            date: date,
            time: time,
            token: Math.random().toString(36).substring(2),
          });
        }
      }
    } catch (error) {
      // set error message
      setError(error.message);
    }
  };

  // function to edit therapist details
  const editTherapistDetails = () => {
    editTherapistDetailsInFirestore(
      setLoading,
      setErrorStatus,
      setError,
      about,
      status,
      availability,
      appointmentTime,
    );

    // set edit mode to false
    setEditMode(false);

    // call fetchSelectedTherapist function
    fetchSelectedTherapist(item).then(res => {
      setDetails(res);
    });
  };

  React.useEffect(() => {
    // fetch data if screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      // fetch therapist details
      fetchSelectedTherapist(item).then(res => {
        setDetails(res);
      });

      // fetchSchedule
      fetchTherapistSchedule(setLoading, item)
        .then(res => {
          setSchedule(res);
        })
        .catch(err => {
          setError(err.message);
        });
    });
    return unsubscribe;
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
  }, [details.appointmentValue]);

  // table content
  const TABLECONTENT = {
    tableHead: ['Day', 'Time', 'Status'],
    tableData: schedule.map(item => [
      moment(item.date, 'YYYY/MM/DD').format('dddd'),
      item.time,
      item.status,
    ]),
  };

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* Content */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
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
              <View
                style={{
                  paddingHorizontal: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <BackBtn width={30} height={30} fill={COLORS.primary} />
                </TouchableOpacity>
                {userData.userType === 'Therapist' ? (
                  editMode ? (
                    <TouchableOpacity onPress={editTherapistDetails}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: 16,
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: COLORS.orange,
                        }}>
                        Save changes
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setEditMode(true)}>
                      <EditIcon width={30} height={30} fill={COLORS.tertiary} />
                    </TouchableOpacity>
                  )
                ) : null}
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
                                  {index === details.languageValue.length - 1
                                    ? ''
                                    : ', '}
                                </Text>
                              );
                            })
                          : 'Loading...'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'relative',
                      right: 8,
                      height: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity>
                      <MessageIcon
                        width={25}
                        height={25}
                        fill={COLORS.primary}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        position: 'relative',
                        height: 2,
                        backgroundColor: COLORS.black,
                        width: 40,
                        marginVertical: 15,
                      }}
                    />
                    <TouchableOpacity>
                      <CallIcon width={25} height={25} fill={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* About section */}
                <View style={styles.card}>
                  <View style={{width: '100%'}}>
                    <Text style={Styles.heading2}>About</Text>
                    {editMode ? (
                      <TextInput
                        multiline={true}
                        cursorColor={
                          Platform.OS === 'ios' ? COLORS.primary : COLORS.black
                        }
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          width: '100%',
                          height: 100,
                          backgroundColor: COLORS.white,
                          borderRadius: 10,
                          padding: 10,
                          marginTop: 10,
                          ...Styles.text,
                        }}
                        onChangeText={text => setAbout(text)}
                        value={about}></TextInput>
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
                          <Text style={{paddingVertical: 10, ...Styles.text}}>
                            Availability Status
                          </Text>
                          <View style={{height: 'auto', position: 'relative'}}>
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
                          <Text style={{paddingVertical: 10, ...Styles.text}}>
                            {details.dayValue
                              ? details.dayValue.map((day, index) => {
                                  return (
                                    <Text key={index}>
                                      {day}
                                      {index === details.dayValue.length - 1
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
                {userData.userType === 'Therapist' ? (
                  <View style={styles.card}>
                    <View style={{flex: 1}}>
                      <Text style={Styles.heading2}>Schedule</Text>
                      {/* table */}
                      <View style={{width: '100%', paddingVertical: 10}}>
                        {schedule.length === 0 ? (
                          <Text style={{...Styles.text, textAlign: 'center'}}>
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
                          <Text style={{...Styles.text, textAlign: 'center'}}>
                            Loading schedule...
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                ) : null}

                {/* Date picker */}
                <View
                  style={{
                    ...styles.card2,
                  }}>
                  <Text style={{paddingVertical: 10, ...Styles.heading2}}>
                    Select Appointment Date
                  </Text>
                  <Datepicker datachange={e => setDate(e)} />
                </View>

                {/* Time picker */}
                <View style={styles.card}>
                  <View>
                    <Text style={Styles.heading2}>Select Appointment Time</Text>
                    {editMode ? (
                      appointments.map((option, index) => (
                        <View
                          key={index}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <CheckBox
                            disabled={false}
                            value={option.checked}
                            onValueChange={() => handleCheck2(index)}
                          />
                          <Text>{option.label + ' ' + 'Session'}</Text>
                        </View>
                      ))
                    ) : (
                      <View>
                        <Text style={{paddingBottom: 10, ...Styles.text}}>
                          select based on Therapists availability!
                        </Text>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                          }}>
                          <RadioGroup
                            radioButtons={radioButtons}
                            onPress={time => {
                              setTime(time);
                            }}
                            value={time}
                            selectedId={time}
                            layout="column"
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* payment method */}
                <View style={styles.card}>
                  <View>
                    <Text style={Styles.heading2}>Select Payment Method</Text>
                    <View
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          ...Styles.title2,
                        }}>
                        N/A
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* submit button */}
              <View style={{paddingHorizontal: 10}}>
                <CurvedButton
                  text="Book Appointment"
                  textColor={COLORS.black}
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: '100%',
                    height: 50,
                  }}
                  onPress={anonymous ? null : bookAppointment}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

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

export default Therapy;
