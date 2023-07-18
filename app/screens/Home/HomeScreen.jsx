import React, {useContext, Suspense} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Styles from '../../constants/Styles';
import {
  CardView,
  RoundLoadingAnimation,
  CloseIcon,
  ViewIconeye,
} from '../../components';
import Screen from '../../layout/Screen';
import {AuthContext} from '../../navigations/Context/AuthContext';
import {
  fetchUserAppointments,
  fetchDailyMentalHealthTips,
  fetchMoreDailyMentalHealthTips,
} from '../../../fireStore';

const MoodTracker = React.lazy(() =>
  import('../../services/moodTracker/MoodTracker'),
);
const CenterHalf = React.lazy(() =>
  import('../../components/Modals/CenterHalf'),
);
const DiagnosisTools = React.lazy(() =>
  import('../../services/diagnosisTool/DiagnosisTools'),
);

// ...

const HomeScreen = ({navigation, route}) => {
  // use the useContext hook to get the user data value
  const {userData, anonymous, setError, takeTest, setTakeTest} =
    useContext(AuthContext);

  const [Loading, setLoading] = React.useState(false);
  const [Loading2, setLoading2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedTip, setSelectedTip] = React.useState('');
  const [greeting, setGreeting] = React.useState('');
  const [healthTips, setHealthTips] = React.useState([]);
  const [userAppointments, setUserAppointments] = React.useState(0);

  const toggleModal = () => {
    setOpen(!open);
  };

  // greetings function
  const getGreetings = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours >= 12 && hours <= 17) {
      setGreeting('Good Afternoon');
    } else if (hours >= 17 && hours <= 24) {
      setGreeting('Good Evening');
    }
  };

  // fetch the health tips once the component mounts
  React.useEffect(() => {
    // fetch the data only is the route is focused
    const unsubscribe = navigation.addListener('focus', () => {
      // get the greetings
      getGreetings();

      // fetch the health tips
      fetchDailyMentalHealthTips(setLoading)
        .then(tips => {
          setHealthTips(tips);
        })
        .catch(e => {
          // set the error
          setError(e.message);
        });

      // fetch the user appointments
      fetchUserAppointments()
        .then(count => {
          setUserAppointments(count);
        })
        .catch(e => {
          // set the user appointments to 0
          setUserAppointments(0);

          // set the error
          setError(e.message);
        });
    });

    return unsubscribe;
  }, []);

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* intro text */}
        <View style={styles.greeting_container}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.username}>
            {anonymous ? (
              'guest user'
            ) : userData ? (
              userData.userName
            ) : (
              <Text style={Styles.text3}>loading...</Text>
            )}
          </Text>
          {userData &&
            (userData.userType === 'Client' ? (
              <Text style={styles.sessions}>
                You have
                {userAppointments ? ' ' + userAppointments + ' ' : ' 0 '}
                Appointments
              </Text>
            ) : userData.userType === 'Therapist' ? (
              <Text style={styles.sessions}>Therapist Account</Text>
            ) : null)}
        </View>
        {/* Body */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {!takeTest ? (
              <View>
                <View style={styles.Heading_container}>
                  {/* mood tracker */}
                  <Suspense
                    fallback={<RoundLoadingAnimation width={80} height={80} />}>
                    <MoodTracker />
                  </Suspense>
                </View>

                {/* Health tips */}
                <View style={styles.Health_tips}>
                  <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
                    Daily Mental Health Tips
                  </Text>
                  {Loading ? (
                    <View
                      style={{
                        width: '100%',
                        height: 300,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RoundLoadingAnimation width={100} height={100} />
                    </View>
                  ) : healthTips.length === 0 ? (
                    <View
                      style={{
                        width: '100%',
                        height: 300,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={Styles.title2}>
                        No health tips available at the moment
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        style={{marginTop: 15}}
                        scrollEnabled={false}
                        data={healthTips}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                          <View key={item.id} style={{paddingHorizontal: 10}}>
                            <CardView
                              Press={() => {
                                setSelectedTip(item);
                                toggleModal();
                              }}
                              height={110}
                              style={styles.container2}>
                              <Image
                                style={styles.image}
                                source={{
                                  uri: `https://source.unsplash.com/featured/?mental-health,${index}`,
                                }}
                                alt=""
                              />
                              <View style={styles.contentContainer}>
                                <Text style={styles.title}>
                                  {item.title.substring(0, 30)}
                                </Text>
                                <Text
                                  style={{
                                    color: COLORS.darkGray,
                                  }}>
                                  {item.description.substring(0, 85, +'...')}
                                </Text>
                              </View>
                            </CardView>
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
                          <RoundLoadingAnimation width={100} height={100} />
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            fetchMoreDailyMentalHealthTips(
                              setLoading2,
                              setHealthTips,
                              healthTips,
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
            ) : (
              <View style={styles.Heading_container}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  <View>
                    <Text style={Styles.heading2}>Self Diagnosis</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setTakeTest(false);
                      }}>
                      <CloseIcon width={30} height={30} fill={COLORS.red} />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* diagnosis tool */}
                <DiagnosisTools />
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      {/* model */}
      <Suspense fallback={<RoundLoadingAnimation width={80} height={80} />}>
        {selectedTip ? (
          <CenterHalf Visibility={open} hide={toggleModal}>
            <Text style={styles.title}>{selectedTip.title}</Text>
            <Text style={styles.text}>{selectedTip.description}</Text>
            <TouchableOpacity
              style={{
                paddingHorizontal: 6,
                marginVertical: 10,
                width: '100%',
              }}
              onPress={() => Linking.openURL('https://www.mindful.org/')}>
              <Text
                style={{
                  color: COLORS.blue,
                }}>
                Read more
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={[styles.text, {color: COLORS.red}]}>Close</Text>
            </TouchableOpacity>
          </CenterHalf>
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
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  // This is the body content that contains the feelings and Tips sections
  Health_tips: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 190,
  },

  // This is the text for the tip number
  Tip_Number: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },

  // This is the container for the tip content
  Tip_Container: {
    padding: 10,
    flex: 1,
    position: 'relative', // adding this property to make it relative to its parent
  },

  // This is the box that contains the greeting message
  greeting_container: {
    position: 'relative',
    bottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  // This is the greeting message
  greeting: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },

  // This is the user's name
  username: {
    textTransform: 'capitalize',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },

  // This is the session information
  sessions: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },

  imageContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 140,
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
});

export default HomeScreen;
