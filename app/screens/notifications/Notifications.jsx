import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useContext} from 'react';
// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// constants
import {COLORS} from '../../constants';

// components
import {
  BackBtn,
  FocusedStatusBar,
  CenterHalf,
  Card,
  RoundLoadingAnimation,
} from '../../components';

//General styles
import Styles from '../../constants/Styles';

const Notifications = ({navigation}) => {
  // context
  const {userData, setError, setErrorStatus} = useContext(AuthContext);

  // modal
  const [open, setOpen] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState(null);

  // set loading state
  const [loading, setLoading] = React.useState(false);

  // set notifications state
  const [notifications, setNotifications] = React.useState([]);

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

  // function to get notifications
  const getNotifications = async () => {
    // set loading to true
    setLoading(true);

    // get current user
    const user = auth().currentUser;

    try {
      // get notifications from firestore under the Users collection
      firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Notifications')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const notifications = [];
          querySnapshot.forEach(documentSnapshot => {
            notifications.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          // set notifications state
          setNotifications(notifications);
          // set loading to false
          setLoading(false);
        });
    } catch (error) {
      // set loading to false
      setLoading(false);
      // set error
      setError(error.message);
      // set error status
      setErrorStatus('error');
    }
  };

  React.useEffect(() => {
    // if route is focused
    const unsubscribe = navigation.addListener('focus', () => {
      // get notifications
      getNotifications();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

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
            {loading ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 300,
                }}>
                <RoundLoadingAnimation width={50} height={50} />
              </View>
            ) : (
              notifications.map((item, index) => (
                <View style={{paddingHorizontal: 10}} key={index}>
                  <Card
                    Press={() => {
                      setSelectedNotification(item);
                      toggleModal();
                    }}
                    bgColor={COLORS.lightGray}
                    height={90}>
                    <View
                      style={{
                        backgroundColor: randomColor(),
                        ...styles.notification_number,
                      }}>
                      <Text>{index + 1}</Text>
                    </View>
                    <View style={{width: '100%', paddingHorizontal: 10}}>
                      <Text style={styles.notification_title}>
                        {item.title}
                      </Text>
                      <Text style={styles.notification_description}>
                        {item.body}
                      </Text>
                    </View>
                  </Card>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>

      {/* model */}
      {selectedNotification ? (
        <CenterHalf Visibility={open} hide={toggleModal}>
          <Text style={Styles.title}>{selectedNotification.title}</Text>
          <Text style={{paddingVertical: 10, ...Styles.text}}>
            {selectedNotification.body}
          </Text>
          <Text style={{paddingVertical: 10, ...Styles.text}}>
            {selectedNotification.createdAt.toDate().toDateString()}
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
    paddingBottom: 120,
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
