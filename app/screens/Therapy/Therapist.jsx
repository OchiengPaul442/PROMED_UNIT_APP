import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';

// table component
import {Table, Row, Rows} from 'react-native-table-component';
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
  RecButton,
  Datepicker,
} from '../../components';

const Therapy = ({navigation, route}) => {
  // get params
  const {name, title, location, language, about, image} = route.params;
  // Modal
  const [isVisible, setModalVisible] = React.useState(false);

  // time and date
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  const Schedule = [
    {
      id: 1,
      date: '12/12/2021',
      time: '9 - 11 Am',
      status: 'Pending',
    },
    {
      id: 2,
      date: '12/12/2021',
      time: '12 - 2 Pm',
      status: 'Pending',
    },
    {
      id: 3,
      date: '12/12/2021',
      time: '3 - 5 Pm',
      status: 'Booked',
    },
  ];

  const TABLECONTENT = {
    tableHead: ['Date', 'Time', 'Status'],
    tableData: Schedule.map(item => [item.date, item.time, item.status]),
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
                      source={{uri: image}}
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
                      <Text style={Styles.heading2}>{name}</Text>
                      <Text style={Styles.title2}>{title}</Text>
                      <Text style={Styles.text}>Language: {language}</Text>
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
                    <Text style={Styles.text}>{about}</Text>
                  </View>
                </View>

                {/* Availability section */}
                <View style={styles.card}>
                  <View>
                    <Text style={Styles.heading2}>Availability</Text>
                    <Text style={{paddingVertical: 10, ...Styles.text}}>
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </Text>
                  </View>
                </View>

                {/* Schedule section */}
                <View style={styles.card}>
                  <View style={{flex: 1}}>
                    <Text style={Styles.heading2}>Schedule</Text>
                    {/* table */}
                    <View style={{width: '100%', paddingVertical: 10}}>
                      <Table
                        borderStyle={{
                          borderWidth: 2,
                          borderColor: COLORS.tertiary,
                        }}>
                        <Row
                          data={TABLECONTENT.tableHead}
                          style={styles.head}
                          textStyle={{padding: 10, ...Styles.text}}
                        />

                        <Rows
                          data={TABLECONTENT.tableData}
                          textStyle={{padding: 10, ...Styles.text}}
                        />
                      </Table>
                    </View>
                  </View>
                </View>

                {/* Schedule section */}
                <View style={styles.card}>
                  <Text style={Styles.heading2}>
                    Select Appointment Date & Time
                  </Text>
                </View>
                {/* Date picker */}
                <Datepicker style={styles.card} datachange={e => setDate(e)} />
                {/* Time picker */}
                <View style={styles.card}>
                  <KeyboardAvoidingView style={{width: '100%'}}>
                    <View style={Styles.Qgroup}>
                      <Text style={Styles.heading2}>
                        Enter time for the appointment
                      </Text>
                      <Text style={{paddingBottom: 10, ...Styles.text}}>
                        select based on Therapists availability!
                      </Text>
                      <TextInput
                        style={Styles.Qinput}
                        placeholder=""
                        onChangeText={text => setTime(text)}
                      />
                    </View>
                  </KeyboardAvoidingView>
                </View>
                {/* payment method */}
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

              {/* submit button */}
              <View style={{paddingHorizontal: 10}}>
                <CurvedButton
                  text="Schedule Appointment"
                  textColor={COLORS.white}
                  style={{
                    backgroundColor: COLORS.tertiary,
                    width: '100%',
                    height: 50,
                  }}
                  onPress={() =>
                    navigation.push('Confirmation', {
                      name: name,
                      title: title,
                      image: image,
                    })
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
