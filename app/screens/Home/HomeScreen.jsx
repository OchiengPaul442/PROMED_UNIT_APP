import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// firebase imports
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS, SIZES} from '../../constants';
import {Card, CenterHalf, RoundLoadingAnimation} from '../../components';

// screen layout
import Screen from '../../layout/Screen';

// services
import MoodTracker from '../../services/moodTracker/MoodTracker';

const HomeScreen = ({navigation, route}) => {
  // use the useContext hook to get the user data value
  const {userData, anonymous} = useContext(AuthContext);

  // loading
  const [Healthlistloading, setHealthlistLoading] = React.useState(false);

  // show load more button
  const [showLoadMore, setShowLoadMore] = React.useState(false);

  // model
  const [open, setOpen] = React.useState(false);
  const [selectedTip, setSelectedTip] = React.useState('');

  // Get the greeting based on the time of the day
  const [greeting, setGreeting] = React.useState('');

  // Health tips
  const [healthTips, setHealthTips] = React.useState([]);

  const toggleModal = () => {
    setOpen(!open);
  };

  // Get users info
  const [user, setUser] = React.useState({
    sessions: 2,
  });

  // greetings function
  const getGreetings = () => {
    // get the current time of the day
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

  // generate random colors
  const randomColor = () => {
    const colors = [
      // dull colors of the dark orange, dark blue, dark green, dark red, dark purple, dark yellow and dark gray with opacity of 0.4
      'rgba(255, 165, 0, 0.5)', // dark orange
      'rgba(0, 0, 255, 0.5)', // dark blue
      'rgba(0, 128, 0, 0.5)', // dark green
      'rgba(255, 0, 0, 0.5)', // dark red
      'rgba(128, 0, 128, 0.5)', // dark purple
      'rgba(255, 205, 220, 0.5)', // dark yellow
      'rgba(128, 128, 128, 0.5)', // dark gray
    ];

    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  // function to fetch the live stream of the health tips from firestore once the component mounts but 10 and then load more when the user scrolls
  const fetchHealthTipsTen = async () => {
    try {
      // set loading to true
      setHealthlistLoading(true);

      const list = [];

      await firestore()
        .collection('HealthTips')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get()
        .then(querySnapshot => {
          // console.log('Total Health Tips: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {title, description, mood, createdAt} = doc.data();
            list.push({
              id: doc.id,
              title,
              mood,
              description,
              createdAt: createdAt.toDate(),
            });
          });
        });

      setHealthTips(list);

      // console.log('Health Tips: ', healthTips);
    } catch (e) {
      console.log(e);
    }

    // set loading to false
    setHealthlistLoading(false);
  };

  // function to fetch more health tips when the user scrolls
  const fetchMoreHealthTips = async () => {
    try {
      // set loading to true
      setHealthlistLoading(true);

      const list = [];

      await firestore()
        .collection('HealthTips')
        .orderBy('createdAt', 'desc')
        .startAfter(healthTips[healthTips.length - 1].createdAt)
        .limit(10)
        .get()
        .then(querySnapshot => {
          // console.log('Total Health Tips: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {title, description, mood, createdAt} = doc.data();
            list.push({
              id: doc.id,
              title,
              mood,
              description,
              createdAt: createdAt.toDate(),
            });
          });
        });

      setHealthTips([...healthTips, ...list]);

      // console.log('Health Tips: ', healthTips);
    } catch (e) {
      console.log(e);
    }

    // set loading to false
    setHealthlistLoading(false);
  };

  // fetch the health tips once the component mounts
  React.useEffect(() => {
    // fetch the data only is the route is focused
    const unsubscribe = navigation.addListener('focus', () => {
      // get the greetings
      fetchHealthTipsTen();

      // get the greetings
      getGreetings();

      // set selected tip to empty
      setSelectedTip('');

      // set health tips to empty
      setHealthTips([]);

      // set loading to false
      setHealthlistLoading(true);
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
          <Text style={styles.sessions}>
            You have {user.sessions} sessions today
          </Text>
        </View>

        {/* Body */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Heading_container}>
              <Text style={Styles.heading}>How do you feel today?</Text>
              <Text style={Styles.text2}>
                Track Your Mood to get customized daily health tips
              </Text>
              {/* mood tracker */}
              <MoodTracker />
            </View>

            {/* Health tips */}
            <View style={styles.Health_tips}>
              <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
                Daily Mental Health Tips
              </Text>
              <FlatList
                style={{marginTop: 15}}
                scrollEnabled={false}
                data={healthTips}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View key={item.id} style={{paddingHorizontal: 10}}>
                    <Card
                      Press={() => {
                        setSelectedTip(item);
                        toggleModal();
                      }}
                      bgColor={COLORS.lightGray}
                      height={90}>
                      <View
                        style={{
                          backgroundColor: randomColor(),
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.Tip_Number}>{index + 1}</Text>
                      </View>
                      <View style={styles.Tip_Container}>
                        <Text style={Styles.title}>
                          {item.title.substring(0, 30)}
                        </Text>
                        <Text style={Styles.text}>
                          {item.description.substring(0, 85) + '...'}
                        </Text>
                      </View>
                    </Card>
                  </View>
                )}
              />

              {/* load more */}
              {Healthlistloading ? (
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
                    fetchMoreHealthTips();
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
          </ScrollView>
        </View>
      </View>

      {/* model */}
      {selectedTip ? (
        <CenterHalf Visibility={open} hide={toggleModal}>
          <Text style={Styles.title}>{selectedTip.title}</Text>
          <Text style={{paddingVertical: 10, ...Styles.text}}>
            {selectedTip.description}
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                paddingVertical: 10,
                color: COLORS.red,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </CenterHalf>
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
});

export default HomeScreen;
