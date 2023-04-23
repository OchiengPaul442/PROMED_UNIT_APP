import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS, SIZES} from '../../constants';
import {Card, CenterHalf} from '../../components';

// screen layout
import Screen from '../../layout/Screen';

// services
import MoodTracker from '../../services/moodTracker/MoodTracker';

const HomeScreen = () => {
  // model
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  // Get users info
  const [user, setUser] = React.useState({
    name: 'Kirabo',
    mood: 'Happy',
    sessions: 2,
    date: '11 Feb 2023',
  });

  // Get the greeting based on the time of the day
  const [greeting, setGreeting] = React.useState('');

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

  React.useEffect(() => {
    getGreetings();
  }, []);

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

  // get daily tipcard list
  const tipcard = [
    {
      id: 1,
      title: 'Be Kind to your self',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli',
    },
    {
      id: 2,
      title: 'Be Kind to your self',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli',
    },
    {
      id: 3,
      title: 'Be Kind to your self',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli',
    },
    {
      id: 4,
      title: 'Be Kind to your self',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli',
    },
    {
      id: 5,
      title: 'Be Kind to your self',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli',
    },
  ];

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* intro text */}
        <View style={styles.greeting_container}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.sessions}>
            You have {user.sessions} sessions today
          </Text>
        </View>

        {/* Body */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Heading_container}>
              <Text style={Styles.heading}>How do you feel today?</Text>
              {/* mood tracker */}
              <MoodTracker />
            </View>

            {/* daily mental health Tips */}
            <View style={styles.Health_tips}>
              <Text style={Styles.heading}>Daily Mental Health Tips</Text>
              <View style={styles.Tips}>
                {tipcard.map(tip => (
                  <Card
                    Press={toggleModal}
                    bgColor={COLORS.lightGray}
                    height={90}
                    key={tip.id}>
                    <View
                      style={{
                        backgroundColor: randomColor(),
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.Tip_Number}>{tip.id}</Text>
                    </View>
                    <View style={styles.Tip_Container}>
                      <Text style={Styles.title}>{tip.title}</Text>
                      <Text style={Styles.text}>{tip.text}</Text>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* model */}
      <CenterHalf Visibility={open} hide={toggleModal}>
        <Text style={{color: COLORS.black}}>Health Tip</Text>
      </CenterHalf>
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
  },

  // This is the body content that contains the feelings and Tips sections
  Health_tips: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 200,
  },

  // This is the Tips section that contains the cards for different Tips
  Tips: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
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
    width: '90%',
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
