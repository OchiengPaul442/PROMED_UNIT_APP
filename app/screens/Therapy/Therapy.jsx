import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

// constants
import {COLORS, Three_btn_menu} from '../../constants';

// layout
import Screen from '../../layout/Screen';

// diagnosis tool
import DiagnosisTools from '../../services/diagnosisTool/DiagnosisTools';

const Therapy = () => {
  // List of available therapist
  const therapist = [
    {
      name: 'Dr. John Doe',
      location: 'Lagos, Nigeria',
      title: 'Psychiatrist',
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Dr. Awio Cook',
      location: 'Kampala, Uganda',
      title: 'Psychiatrist',
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Dr. Sam Rich',
      location: 'Nairobi, Kenya',
      title: 'Psychiatrist',
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Dr. Richard Doe',
      location: 'Lagos, Nigeria',
      title: 'Psychiatrist',
      image: require('../../assets/images/profilepic.jpg'),
    },
  ];

  return (
    <Screen>
      <View style={styles.Therapy_Screen}>
        {/* Content */}
        <View style={styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Heading_container}>
              <Text style={styles.Heading_title}>Self Diagnosis</Text>
              {/* Diagnosis Tools */}
              <DiagnosisTools />
            </View>
            <View style={styles.Therapist_Con}>
              <Text style={styles.Heading_title}>Available Therapist</Text>
              <View style={styles.Therapist_list}>
                {/* list of available therapist */}
                {therapist.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.Therapist_card}>
                    <View style={styles.Therapist_img_con}>
                      <Image source={item.image} style={styles.Therapist_img} />
                    </View>
                    <View style={styles.Therapist_info}>
                      <View
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '80%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.Therapist_name}>{item.name}</Text>
                        <Text style={styles.Therapist_location}>
                          {item.location}
                        </Text>
                        <Text style={styles.Therapist_title}>{item.title}</Text>
                      </View>
                      <TouchableOpacity style={styles.Therapist_btn}>
                        <Three_btn_menu width={30} height={30} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
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
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  // This is the body header that contains the title
  Heading_container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    marginBottom: 20,
  },

  // This is the body header title
  Heading_title: {
    fontSize: 15,
    color: COLORS.primary,
  },

  // available therapist container
  Therapist_Con: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },

  // available therapist list
  Therapist_list: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    marginTop: 10,
    paddingBottom: 160,
  },

  // available therapist card
  Therapist_card: {
    position: 'relative',
    width: '100%',
    height: 100,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },

  // available therapist image container
  Therapist_img_con: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },

  // available therapist image
  Therapist_img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // available therapist info
  Therapist_info: {
    position: 'relative',
    left: -40,
    width: '60%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // available therapist name
  Therapist_name: {
    fontSize: 15,
    color: COLORS.primary,
  },

  // available therapist title
  Therapist_title: {
    fontSize: 12,
    color: COLORS.black,
  },

  // available therapist location
  Therapist_location: {
    fontSize: 12,
    color: COLORS.black,
  },

  // available therapist rating
  Therapist_rating: {
    position: 'relative',
    width: 30,
    height: 30,
    marginTop: 4,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // available therapist rating text
  Therapist_rating_text: {
    fontSize: 12,
    color: COLORS.white,
  },

  // available therapist button
  Therapist_btn: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Therapy;
