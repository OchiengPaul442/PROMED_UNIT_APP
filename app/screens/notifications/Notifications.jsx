import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import {BackBtn, FocusedStatusBar, CenterHalf} from '../../components';

const Notifications = ({navigation}) => {
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
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

  // Notification list
  const notificationList = [
    {
      id: 1,
      title: 'New session',
      description: 'You have a new session with your therapist',
    },
    {
      id: 2,
      title: 'New session',
      description: 'You have a new session with your therapist',
    },
    {
      id: 3,
      title: 'New session',
      description: 'You have a new session with your therapist',
    },
    {
      id: 4,
      title: 'New session',
      description: 'You have a new session with your therapist',
    },
    {
      id: 5,
      title: 'New session',
      description: 'You have a new session with your therapist',
    },
    {
      id: 6,
      title: 'New session',
      description: 'You have a new session with your therapist',
    },
  ];

  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.Notification_Screen}>
        {/* Head */}
        <View>
          <View
            style={{
              padding: 15,
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackBtn width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.white,
              }}>
              Notifications
            </Text>
          </View>
        </View>

        {/* Content section */}
        <View style={styles.notification_container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {notificationList.map(notif => (
              <TouchableOpacity
                onPress={toggleModal}
                key={notif.id}
                style={styles.notification}>
                <View
                  style={{
                    backgroundColor: randomColor(),
                    ...styles.notification_number,
                  }}>
                  <Text>{notif.id}</Text>
                </View>
                <View style={{width: '100%', paddingHorizontal: 10}}>
                  <Text style={styles.notification_title}>{notif.title}</Text>
                  <Text style={styles.notification_description}>
                    {notif.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* model */}
      <CenterHalf Visibility={open} hide={toggleModal}>
        <Text style={{color: COLORS.black}}>Notification</Text>
      </CenterHalf>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  Notification_Screen: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  notification_container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },

  notification: {
    position: 'relative',
    width: '100%',
    height: 95,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.Tuscany,
    borderRadius: 10,
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },

  notification_number: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notification_title: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  notification_description: {
    color: COLORS.black,
    flexWrap: 'wrap',
    width: '88%',
    height: 'auto',
    position: 'relative',
  },
});
