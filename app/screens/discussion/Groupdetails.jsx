// imports
import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
// context
import {AuthContext} from '../../navigations/Context/AuthContext'; // a context for the authentication state

// constants
import {COLORS} from '../../constants'; // predefined colors for the app

// components
import {LogoutIcon, DeleteIcon, RoundLoadingAnimation} from '../../components'; // components for the status bar, buttons, icons and loading animation

// firebase
import firestore from '@react-native-firebase/firestore'; // a module for the firebase firestore

// fetch
import {fetchMembers, fetchAllMembers, deleteGroup} from '../../../fireStore'; // functions to interact with the group members in firestore

// layout
import Screen2 from '../../layout/Screen2';

const Groupdetails = ({route, navigation}) => {
  // get params
  const {data} = route.params;

  // get current user
  const {user, setErrorStatus, setError} = useContext(AuthContext);

  // loading state
  const [loading, setLoading] = React.useState(true);

  // get group members
  const [groupMembers, setGroupMembers] = React.useState([]);

  // handle leaving group
  const handleLeaveGroup = async () => {
    try {
      // create an object with current user data
      const currentUserData = {
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      // remove user from group
      await firestore()
        .collection('Groups')
        .doc(data.key)
        .update({
          Number_of_Members: firestore.FieldValue.arrayRemove(currentUserData),
        });
    } catch (error) {
      setError(error.message);
    } finally {
      navigation.navigate('Groups');
    }
  };

  // handle remove user from group
  const handleRemoveUser = async item => {
    try {
      // remove user from group
      await firestore()
        .collection('Groups')
        .doc(data.key)
        .update({
          Number_of_Members: firestore.FieldValue.arrayRemove({
            userId: item.userId,
            displayName: item.displayName,
            photoURL: item.photoURL,
          }),
        });

      // fetch members
      fetchMembers(setLoading, setGroupMembers, data);
    } catch (error) {
      setError(error.message);
    }
  };

  React.useEffect(() => {
    // fetch members
    fetchMembers(setLoading, setGroupMembers, data);
  }, []);

  return (
    <Screen2 nav={navigation} title={data.name}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={{uri: data.image}} style={styles.image} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                paddingVertical: 10,
                color: COLORS.primary,
              }}>
              Group: {data.Number_of_Members.length} participant
              {data.Number_of_Members.length > 1 ? 's' : null}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
              color: COLORS.primary,
            }}>
            Participants
          </Text>
          {loading ? (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <RoundLoadingAnimation width={80} height={80} />
            </View>
          ) : !groupMembers ? (
            <Text
              style={{
                width: '100%',
                paddingVertical: 20,
                textAlign: 'center',
                color: COLORS.black,
              }}>
              No Members
            </Text>
          ) : (
            <FlatList
              data={groupMembers}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View
                  style={{
                    position: 'relative',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      position: 'relative',
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Image
                      source={{uri: item.photoURL}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        width: '100%',
                        color: COLORS.primary,
                        paddingLeft: 10,
                      }}>
                      {item.displayName}
                    </Text>
                  </View>
                  {data.createdBy === item.userId ? null : data.createdBy ===
                    user.uid ? (
                    <TouchableOpacity onPress={() => handleRemoveUser(item)}>
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: COLORS.red,
                        }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
              keyExtractor={item => item.userId}
            />
          )}
          <TouchableOpacity
            onPress={() =>
              fetchAllMembers(setGroupMembers, data, setErrorStatus, setError)
            }>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'left',
                width: '100%',
                width: '100%',
                textAlign: 'center',
                color: COLORS.tertiary,
              }}>
              View all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'left',
                width: '100%',
                color: COLORS.primary,
              }}>
              Actions
            </Text>
            <TouchableOpacity
              onPress={handleLeaveGroup}
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  width: '100%',
                  paddingVertical: 10,
                }}>
                <LogoutIcon width={20} height={20} fill={COLORS.red} />
                <Text
                  style={{
                    paddingLeft: 10,
                    color: COLORS.black,
                  }}>
                  Exit group
                </Text>
              </View>
            </TouchableOpacity>
            {data.createdBy === user.uid ? (
              <TouchableOpacity
                onPress={() => {
                  deleteGroup(data, navigation);
                }}
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <DeleteIcon width={20} height={20} fill={COLORS.red} />
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: COLORS.black,
                    }}>
                    Delete group
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </Screen2>
  );
};

export default Groupdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: '100%',
    height: 'auto',
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
