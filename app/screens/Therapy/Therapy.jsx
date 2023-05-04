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

// firebase imports
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS} from '../../constants';
import {Menu, Card, RoundLoadingAnimation} from '../../components';

// layout
import Screen from '../../layout/Screen';

// diagnosis tool
import DiagnosisTools from '../../services/diagnosisTool/DiagnosisTools';

// modal
import {BottomModal} from '../../components';

const Therapy = ({navigation}) => {
  // set therapist list to state
  const [therapist, setTherapist] = React.useState([]);

  // set loading state
  const [Therapyloading, setTherapyLoading] = React.useState(true);

  // function to get therapist list from firestore
  const getTherapist = async () => {
    try {
      // set loading to true
      setTherapyLoading(true);

      // get the first 4 therapist from firestore
      const therapist = await firestore()
        .collection('Therapists')
        .orderBy('createdAt', 'desc')
        .limit(4)
        .get();

      // convert therapist to array
      const therapistList = therapist.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      });

      // set therapist state
      setTherapist(therapistList);
    } catch (e) {
      console.log(e);
    }

    // set loading to false
    setTherapyLoading(false);
  };

  // function to get 4 more therapist from firestore continuin from the last therapist
  const getMoreTherapist = async () => {
    try {
      // set loading to true
      setTherapyLoading(true);

      const List = [];

      await firestore()
        .collection('Therapists')
        .orderBy('createdAt', 'desc')
        .startAfter(therapist[therapist.length - 1].createdAt)
        .limit(4)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            List.push(documentSnapshot.data());
          });
        });

      //set therapist state
      setTherapist([...therapist, ...List]);
    } catch (e) {
      console.log(e);
    }

    // set loading to false
    setTherapyLoading(false);
  };

  React.useEffect(() => {
    // if the route is focused, get therapist
    const unsubscribe = navigation.addListener('focus', () => {
      // get therapist
      getTherapist();

      // set selected therapist to null
      setSelectedTherapist(null);

      // set therapist list to empty array
      setTherapist([]);

      // set loading to true
      setTherapyLoading(true);
    });

    // unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

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
                            about: item.about,
                            language: item.language,
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
                            source={{uri: item.image}}
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

                {/* load more */}
                {Therapyloading ? (
                  <View
                    style={{
                      width: '100%',
                      height: 'auto',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RoundLoadingAnimation width={100} height={100} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      getMoreTherapist();
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 10,
                        color: COLORS.red,
                      }}>
                      Load More
                    </Text>
                  </TouchableOpacity>
                )}
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
                about: selectedTherapist.about,
                language: selectedTherapist.language,
                image: selectedTherapist.image,
              })
            }
            style={{paddingVertical: 10}}>
            <Text style={Styles.title}>Schedule a Session</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <TouchableOpacity onPress={toggleModal} style={{paddingVertical: 10}}>
            <Text style={{color: COLORS.red}}>Close</Text>
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
