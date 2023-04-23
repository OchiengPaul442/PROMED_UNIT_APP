import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

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
  const {name, title, location, image} = route.params;
  // Modal
  const [isVisible, setModalVisible] = React.useState(false);

  // time and date
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

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
                  justifyContent: 'space-between',
                  flexDirection: 'row-reverse',
                  paddingTop: 20,
                  paddingHorizontal: 10,
                }}>
                <Text style={Styles.heading}>Therapist</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <BackBtn width={30} height={30} fill={COLORS.primary} />
                </TouchableOpacity>
              </View>
              {/* Therapist information */}
              <View style={styles.Therapist_information}>
                <View style={styles.card}>
                  <View>
                    <Image
                      source={image}
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
                      <Text style={Styles.text}>Rating: Good</Text>
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed vitae nisl vitae nisl luctus lacinia. Sed vitae nisl
                      vitae nisl luctus lacinia. Sed vitae nisl vitae nisl
                      luctus lacinia.
                    </Text>
                  </View>
                </View>

                {/* Schedule section */}
                <View style={styles.card}>
                  <Text style={Styles.heading2}>
                    Select Appointment Date & Time
                  </Text>
                </View>
                {/* Date picker */}
                <Datepicker style={styles.card} />
                {/* Time picker */}
                <RecButton
                  text="Select Time"
                  bgColor={COLORS.tertiary}
                  textColor={COLORS.white}
                  onPress={toggleModalVisibility}
                />
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
});

export default Therapy;
