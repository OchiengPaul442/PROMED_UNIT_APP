import {
  View,
  Text,
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

// firebase imports
import firestore from '@react-native-firebase/firestore';

//General styles
import Styles from '../../constants/Styles';

// screens
import Screen from '../../layout/Screen';

// constants
import {COLORS} from '../../constants';
import {
  BackBtn,
  MessageIcon,
  CallIcon,
  CurvedButton,
  Table,
  Datepicker,
} from '../../components';

const Therapy = ({navigation, route}) => {
  // context
  const {anonymous, setError, setErrorStatus} = useContext(AuthContext);

  // get params
  const {item} = route.params;

  // Modal
  const [isVisible, setModalVisible] = React.useState(false);

  // time and date
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [schedule, setSchedule] = React.useState([]);

  // function to fetch the live stream of the therapists schedule list from firestore
  const fetchSchedule = () => {
    try {
      firestore()
        .collection('Therapists')
        .doc(item.id)
        .collection('Schedule')
        .onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const {date, time, status} = doc.data();
            list.push({
              id: doc.id,
              date,
              time,
              status,
            });
          });
          setSchedule(list);
        });
    } catch (error) {
      // set error message
      setError(error.message);
    }
  };

  // function to book a session
  const bookSession = () => {
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
            name: item.name,
            therapistId: item.id,
            title: item.title,
            image: item.image,
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

  React.useEffect(() => {
    // fetch data if screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSchedule();

      // set error message to null
      setError(null);

      // set schedule to empty array
      setSchedule([]);
    });
    return unsubscribe;
  }, []);

  // radio buttons Options for time using iteration for item.sessionTime array
  const radioButtons = React.useMemo(() => {
    const options = [];
    if (item.sessionTime) {
      item.sessionTime.forEach((time, index) => {
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
  }, [item.sessionTime]);

  // table content
  const TABLECONTENT = {
    tableHead: ['Day', 'Time', 'Status'],
    tableData: schedule.map(item => [
      moment(item.date, 'YYYY/MM/DD').format('dddd'),
      item.time,
      item.status,
    ]),
  };

  const toggleModalVisibility = () => {
    setModalVisible(!isVisible);
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
              <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <BackBtn width={30} height={30} fill={COLORS.primary} />
                </TouchableOpacity>
              </View>
              {/* Therapist information */}
              <View style={styles.Therapist_information}>
                <View style={styles.card}>
                  <View>
                    <Image
                      source={{uri: item.image}}
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
                      <Text style={Styles.heading2}>{item.name}</Text>
                      <Text style={Styles.title2}>{item.title}</Text>
                      <Text style={Styles.text}>Language: {item.language}</Text>
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
                  <View>
                    <Text style={Styles.heading2}>About</Text>
                    <Text style={Styles.text}>
                      {item.about ? item.about : 'N/A'}
                    </Text>
                  </View>
                </View>

                {/* Availability section */}
                <View style={styles.card}>
                  <View style={{flex: 1}}>
                    <Text style={Styles.heading2}>Availability</Text>
                    <View
                      style={{
                        width: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{paddingVertical: 10, ...Styles.text}}>
                        {item.daysAvailable
                          ? item.daysAvailable.map((day, index) => {
                              return (
                                <Text key={index}>
                                  {day}
                                  {index === item.daysAvailable.length - 1
                                    ? ''
                                    : ', '}
                                </Text>
                              );
                            })
                          : 'N/A'}
                      </Text>
                      <Text
                        style={{
                          width: 50,
                          padding: 5,
                          backgroundColor:
                            item.availabilityStatus === 'active'
                              ? COLORS.primary
                              : item.availabilityStatus
                              ? COLORS.red
                              : null,
                          borderRadius: 8,
                          textAlign: 'center',
                          ...Styles.text3,
                        }}>
                        {item.availabilityStatus}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Schedule section */}
                <View style={styles.card}>
                  <View style={{flex: 1}}>
                    <Text style={Styles.heading2}>Schedule</Text>
                    {/* table */}
                    <View style={{width: '100%', paddingVertical: 10}}>
                      {schedule.length === 0 ? (
                        <Text style={{...Styles.text, textAlign: 'center'}}>
                          No schedule available
                        </Text>
                      ) : (
                        <Table
                          tableHead={TABLECONTENT.tableHead}
                          tableData={TABLECONTENT.tableData}
                          BorderColor={COLORS.primary}
                          BorderWidth={1}
                          tableDataColor={COLORS.black}
                          HeaderTextColor={COLORS.white}
                          HeaderBackgroundColor={COLORS.primary}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.card}>
                  <Text style={Styles.heading2}>Select Appointment Date</Text>
                </View>

                {/* Date picker */}
                <Datepicker style={styles.card} datachange={e => setDate(e)} />

                {/* Time picker */}
                <View style={styles.card}>
                  <View>
                    <Text style={Styles.heading2}>Select Appointment Time</Text>
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
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          ...Styles.text,
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
                  text="Book Session"
                  textColor={COLORS.black}
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: '100%',
                    height: 50,
                  }}
                  onPress={anonymous ? null : bookSession}
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

  // table styles
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
});

export default Therapy;
