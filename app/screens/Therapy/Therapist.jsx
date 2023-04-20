import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Screen from '../../layout/Screen';
import {COLORS} from '../../constants';
import {BackBtn, MessageIcon, CallIcon, CurvedButton} from '../../components';
import React from 'react';

const Therapy = ({navigation, route}) => {
  // get params
  const {name, title, location, image} = route.params;

  return (
    <Screen>
      <View style={styles.Therapy_Screen}>
        {/* Content */}
        <ScrollView style={styles.Content} showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 15,
              }}>
              Therapist
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackBtn width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            {/* Therapist info */}
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
                <View style={{position: 'relative', left: -140}}>
                  <Text style={{fontSize: 20, ...styles.text}}>{name}</Text>
                  <Text style={styles.text}>Rating: Good</Text>
                </View>
                <View
                  style={{
                    position: 'relative',
                    left: 13,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity>
                    <MessageIcon width={25} height={25} fill={COLORS.primary} />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: '100%',
                      backgroundColor: COLORS.black,
                      width: 2,
                      marginHorizontal: 15,
                    }}
                  />
                  <TouchableOpacity>
                    <CallIcon width={25} height={25} fill={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* About section */}
            <View style={styles.card}>
              <View>
                <Text style={{fontSize: 18, ...styles.text}}>About</Text>
                <Text style={{...styles.text}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  vitae nisl vitae nisl luctus lacinia. Sed vitae nisl vitae
                  nisl luctus lacinia. Sed vitae nisl vitae nisl luctus lacinia.
                </Text>
              </View>
            </View>
            {/* Schedule section */}
            <View style={styles.card}>
              <View>
                <Text style={{fontSize: 18, ...styles.text}}>
                  Select Appointment Date and Time
                </Text>
                <View></View>
              </View>
            </View>
          </View>
          <CurvedButton
            text="Schedule Appointment"
            textColor={COLORS.white}
            style={{
              backgroundColor: COLORS.tertiary,
              width: '100%',
              height: 50,
              borderRadius: 50,
              display: 'flex',
              marginBottom: 10,
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
            // onPress={() =>
            //   navigation.push('TestResults', {id: id, title: title})
            // }
          />
        </ScrollView>
      </View>
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  // This is the main container that holds all the components
  Therapy_Screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  // This is the Content that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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

  // This is the name of the therapist
  text: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default Therapy;
