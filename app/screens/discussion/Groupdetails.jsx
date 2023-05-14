// imports
import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// context
import {AuthContext} from '../../navigations/Context/AuthContext'; // a context for the authentication state

// constants
import {COLORS} from '../../constants'; // predefined colors for the app

// components
import {
  FocusedStatusBar,
  BackBtn,
  Menu,
  LogoutIcon,
  DeleteIcon,
  RoundLoadingAnimation,
} from '../../components'; // components for the status bar, buttons, icons and loading animation

// firebase
import firestore from '@react-native-firebase/firestore'; // a module for the firebase firestore

// fetch
import {fetchMembers, fetchAllMembers, deleteGroup} from '../../../fireStore'; // functions to interact with the group members in firestore

const Groupdetails = ({route, navigation}) => {
  // get params
  const {groupdata} = route.params;

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
        .doc(groupdata.key)
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
        .doc(groupdata.key)
        .update({
          Number_of_Members: firestore.FieldValue.arrayRemove({
            userId: item.userId,
            displayName: item.displayName,
            photoURL: item.photoURL,
          }),
        });

      // fetch members
      fetchMembers(setLoading, setGroupMembers, groupdata);
    } catch (error) {
      setError(error.message);
    }
  };

  // code to hide the tab bar when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener('focus', () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      });

      return () => {
        // Show bottom navigator when this screen is unfocused
        navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
      };
    }, [navigation]),
  );

  React.useEffect(() => {
    fetchMembers(setLoading, setGroupMembers, groupdata);
  }, []);

  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.groupdetails}>
        {/* Head section */}
        <View
          style={{
            padding: 10,
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.goBack()}>
            <BackBtn width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.white,
              }}>
              {groupdata.name}
            </Text>
          </View>
          <TouchableOpacity style={{padding: 10}} onPress={null}>
            <Menu width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {/* Main content section */}
        <View style={styles.Content}>
          <View style={{paddingVertical: 10}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.card}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: groupdata.image}}
                      style={styles.image}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        paddingVertical: 10,
                        color: COLORS.primary,
                      }}>
                      Group: {groupdata.Number_of_Members.length} participant
                      {groupdata.Number_of_Members.length > 1 ? 's' : null}
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
                          {groupdata.createdBy ===
                          item.userId ? null : groupdata.createdBy ===
                            user.uid ? (
                            <TouchableOpacity
                              onPress={() => handleRemoveUser(item)}>
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
                      fetchAllMembers(
                        setGroupMembers,
                        groupdata,
                        setErrorStatus,
                        setError,
                      )
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
                    {groupdata.createdBy === user.uid ? (
                      <TouchableOpacity
                        onPress={() => {
                          deleteGroup(groupdata, navigation);
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
                          <DeleteIcon
                            width={20}
                            height={20}
                            fill={COLORS.red}
                          />
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
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Groupdetails;

const styles = StyleSheet.create({
  groupdetails: {
    height: '100%',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },

  Content: {
    // height: '92%',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },

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

  menuBar: {
    position: 'absolute',
    bottom: 3,
    marginHorizontal: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
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
        elevation: 20,
      },
    }),
  },
});
