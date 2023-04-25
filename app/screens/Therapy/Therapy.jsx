import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS} from '../../constants';
import {Menu, Card} from '../../components';

// layout
import Screen from '../../layout/Screen';

// diagnosis tool
import DiagnosisTools from '../../services/diagnosisTool/DiagnosisTools';

// modal
import {BottomModal} from '../../components';

const Therapy = ({navigation}) => {
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
    {
      name: 'Dr. Richard Doe',
      location: 'Lagos, Nigeria',
      title: 'Psychiatrist',
      image: require('../../assets/images/profilepic.jpg'),
    },
  ];

  // Modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* Content */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Diagnosis Tools */}
            <View style={styles.Heading_container}>
              <Text style={Styles.heading}>Self Diagnosis</Text>
              <DiagnosisTools />
            </View>

            {/* Therapist list */}
            <View style={styles.Therapist_Container}>
              <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
                Available Therapist
              </Text>
              <View style={styles.Therapist_list}>
                <FlatList
                  style={{marginTop: 15}}
                  scrollEnabled={false}
                  data={therapist}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View style={{paddingHorizontal: 10}}>
                      <Card
                        Press={() =>
                          navigation.push('Therapist', {
                            name: item.name,
                            location: item.location,
                            title: item.title,
                            image: item.image,
                          })
                        }
                        bgColor={COLORS.lightGray}
                        height={90}
                        key={index}>
                        <View
                          style={{
                            width: '20%',
                            height: '100%',
                            ...styles.image_container,
                          }}>
                          <Image
                            source={item.image}
                            style={styles.Therapist_img}
                          />
                        </View>
                        <View style={styles.Therapist_information}>
                          <View
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '80%',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={Styles.title}>{item.name}</Text>
                            <Text style={Styles.text}>{item.location}</Text>
                            <Text style={Styles.text}>{item.title}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedTherapist(item);
                            toggleModal();
                          }}
                          style={styles.Therapist_btn}>
                          <Menu width={30} height={30} fill={COLORS.black} />
                        </TouchableOpacity>
                      </Card>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Modal */}
      {selectedTherapist ? (
        <BottomModal Visibility={isModalVisible} hide={toggleModal}>
          <Text style={{textAlign: 'left', width: '100%', ...Styles.heading2}}>
            {selectedTherapist.name}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Therapist', {
                name: selectedTherapist.name,
                location: selectedTherapist.location,
                title: selectedTherapist.title,
                image: selectedTherapist.image,
              })
            }
            style={{paddingVertical: 10}}>
            <Text style={Styles.title}>Schedule a Session</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <TouchableOpacity onPress={toggleModal} style={{paddingVertical: 10}}>
            <Text style={Styles.title}>Close</Text>
          </TouchableOpacity>
        </BottomModal>
      ) : null}
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  // This is the body header that contains the title
  Heading_container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  // available therapist container
  Therapist_Container: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },

  // available therapist list
  Therapist_list: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    paddingBottom: 100,
  },

  // available therapist image container
  image_container: {
    position: 'relative',
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
  Therapist_information: {
    position: 'relative',
    width: '60%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // available therapist button
  Therapist_btn: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // separator
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black,
  },
});

export default Therapy;
