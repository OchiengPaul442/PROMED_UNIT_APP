// imports
import React, {useContext, Suspense} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

// components
import {Menu, Card, RoundLoadingAnimation} from '../../components';
import Screen from '../../layout/Screen';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// lazy loading
const DiagnosisTools = React.lazy(() =>
  import('../../services/diagnosisTool/DiagnosisTools'),
);
const BottomModal = React.lazy(() =>
  import('../../components/Modals/BottomModal'),
);

// fetch functions
import {fetchTherapist, fetchMoreTherapist} from '../../../fireStore';

const Therapy = ({navigation}) => {
  // context
  const {setError} = useContext(AuthContext);

  // set therapist list to state
  const [therapist, setTherapist] = React.useState([]);

  // set loading state
  const [Loading, setLoading] = React.useState(true);
  const [Loading2, setLoading2] = React.useState(false);

  // Modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState(null);

  React.useEffect(() => {
    // if the route is focused, get therapist
    const unsubscribe = navigation.addListener('focus', () => {
      // get therapist
      fetchTherapist(setLoading)
        .then(therapist => {
          setTherapist(therapist);
        })
        .catch(e => console.log(e));
    });

    // unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  // toggle modal
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
              <Suspense
                fallback={<RoundLoadingAnimation width={80} height={80} />}>
                <DiagnosisTools />
              </Suspense>
            </View>

            {/* Therapist list */}
            <View style={styles.Therapist_Container}>
              <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
                Available Therapist
              </Text>
              <View style={styles.Therapist_list}>
                {Loading ? (
                  <View
                    style={{
                      width: '100%',
                      height: 300,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RoundLoadingAnimation width={80} height={80} />
                  </View>
                ) : therapist.length === 0 ? (
                  <View
                    style={{
                      width: '100%',
                      height: 200,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{...Styles.title2}}>
                      No Therapist Available
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      style={{marginTop: 15}}
                      scrollEnabled={false}
                      data={therapist}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                        <View style={{paddingHorizontal: 10}}>
                          <Card
                            Press={() =>
                              navigation.navigate('Therapist', {
                                item,
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
                                <Text style={Styles.text}>{item.Location}</Text>
                                <Text style={Styles.text}>{item.title}</Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedTherapist(item);
                                toggleModal();
                              }}
                              style={styles.Therapist_btn}>
                              <Menu
                                width={30}
                                height={30}
                                fill={COLORS.black}
                              />
                            </TouchableOpacity>
                          </Card>
                        </View>
                      )}
                    />
                    {Loading2 ? (
                      <View
                        style={{
                          width: '100%',
                          height: 'auto',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RoundLoadingAnimation width={80} height={80} />
                      </View>
                    ) : therapist.length < 4 ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          fetchMoreTherapist(
                            setLoading2,
                            therapist,
                            setTherapist,
                            setError,
                          );
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
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Modal */}
      <Suspense fallback={<RoundLoadingAnimation width={80} height={80} />}>
        {selectedTherapist ? (
          <BottomModal Visibility={isModalVisible} hide={toggleModal}>
            <Text
              style={{textAlign: 'left', width: '100%', ...Styles.heading2}}>
              {selectedTherapist.name}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push('Therapist', {
                  item: selectedTherapist,
                })
              }
              style={{paddingVertical: 10}}>
              <Text style={Styles.title}>Schedule a Session</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={toggleModal}
              style={{paddingVertical: 10}}>
              <Text style={{color: COLORS.red}}>Close</Text>
            </TouchableOpacity>
          </BottomModal>
        ) : null}
      </Suspense>
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
