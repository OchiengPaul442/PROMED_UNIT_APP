// imports
import React, {useContext, Suspense, useReducer} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

//context
import {AuthContext} from '../../navigations/Context/AuthContext'; // a context for the authentication state

//General styles
import Styles from '../../constants/Styles'; // custom styles for the app

// constants
import {COLORS} from '../../constants'; // predefined colors for the app
import {
  Menu,
  Plus,
  Card,
  RecButton,
  RoundLoadingAnimation,
} from '../../components'; // components for the menu, icons, cards, buttons and loading animation

// lazy loading
const BottomModal = React.lazy(() =>
  import('../../components/Modals/BottomModal'),
); // a component for the bottom modal
const CenterHalf = React.lazy(() =>
  import('../../components/Modals/CenterHalf'),
); // a component for the center half modal

// screen layout
import Screen from '../../layout/Screen'; // a component for the screen layout

// fetch functions
import {
  fetchDiscussionBoard,
  createDiscussionBoard,
  searchDiscussionBoard,
  leaveGroup,
  joinGroup,
  checkIfMember,
} from '../../../fireStore'; // functions to interact with the discussion board in firestore

// firebase
import auth from '@react-native-firebase/auth'; // a module for the firebase authentication

const Groups = ({navigation}) => {
  // context
  const {setError, setErrorStatus, anonymous} = useContext(AuthContext);

  // current user
  const currentUser = auth().currentUser;

  // Modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);

  // selected group
  const [selectedGroup, setSelectedGroup] = React.useState('');

  // list of available Groups
  const [Groupdata, setGroup] = React.useState([]);

  // set loading state
  const [loading, setLoading] = React.useState(true);
  const [loading2, setLoading2] = React.useState(false);

  // set create group state
  const [createGroup, setCreateGroup] = React.useState(false);

  // set status
  const [status, setStatus] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  // handle create group
  const handleCreateGroup = () => {
    createDiscussionBoard(
      setLoading,
      setLoading2,
      setErrorStatus,
      setError,
      toggleModal2,
      setGroup,
      createGroup,
    );
  };

  // join group
  const handleJoinGroup = () => {
    const groupdata = selectedGroup;
    joinGroup(
      setLoading,
      groupdata,
      navigation,
      setErrorStatus,
      setError,
      setGroup,
      toggleModal,
    );
  };

  // leave group
  const handleLeaveGroup = () => {
    const groupdata = selectedGroup;
    leaveGroup(
      setLoading,
      groupdata,
      navigation,
      setErrorStatus,
      setError,
      setGroup,
      toggleModal,
    );
  };

  React.useEffect(() => {
    // if the route if focused
    const unsubscribe = navigation.addListener('focus', () => {
      // fetchDiscussionBoard
      fetchDiscussionBoard(setLoading)
        .then(response => {
          setGroup(response);
        })
        .catch(err => {
          setError(err.message);
        });
    });

    return unsubscribe;
  }, []);

  return (
    <Screen>
      <View style={Styles.Container}>
        {/* Add Group Button */}
        <View style={styles.Add_group_btn}>
          <TouchableOpacity
            onPress={toggleModal2}
            style={styles.Add_group_btn_icon}>
            <Plus width={30} height={30} fill={COLORS.black} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={Styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search input field section */}
            <View style={{paddingHorizontal: 10}}>
              <View style={styles.Search_input_container}>
                <TextInput
                  style={styles.Search_input}
                  placeholderTextColor={COLORS.black}
                  placeholder="Search ..."
                  onChangeText={searchText =>
                    searchDiscussionBoard(
                      setLoading,
                      setGroup,
                      setError,
                      searchText,
                    )
                  }
                />
              </View>
            </View>

            {/* list of available Groups */}
            <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
              List of communities to join:
            </Text>
            <View style={styles.Group_list}>
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                  }}>
                  <RoundLoadingAnimation width={80} height={80} />
                </View>
              ) : Groupdata.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={Styles.title2}>No groups available to join</Text>
                </View>
              ) : (
                <View>
                  <FlatList
                    scrollEnabled={false}
                    data={Groupdata}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <View style={{paddingHorizontal: 10}}>
                        <Card
                          Press={() => {
                            if (
                              item.Number_of_Members.map(
                                item => item.userId,
                              ).includes(currentUser.uid)
                            ) {
                              anonymous
                                ? setError(
                                    'Please login to view the group chat',
                                  )
                                : navigation.push('Groupchat', {
                                    groupdata: item,
                                  });
                            } else {
                              setError('Please join to view the group');
                              setErrorStatus('error');
                            }
                          }}
                          bgColor={COLORS.lightGray}
                          height={90}
                          key={index}>
                          <View
                            style={{
                              width: '20%',
                              height: '100%',
                              ...styles.group_image_container,
                            }}>
                            <Image
                              source={{uri: item.image}}
                              style={styles.group_image}
                            />
                          </View>
                          <View style={styles.group_information}>
                            <View
                              style={{
                                position: 'relative',
                                width: '100%',
                                height: '50%',
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={Styles.heading}>{item.name}</Text>
                              <Text style={Styles.text}>
                                Members: {item.Number_of_Members.length}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                checkIfMember(item, setError, setStatus);
                                setSelectedGroup(item);
                                toggleModal();
                              }}
                              style={styles.group_btn}>
                              <Menu
                                width={30}
                                height={30}
                                fill={COLORS.black}
                              />
                            </TouchableOpacity>
                          </View>
                        </Card>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Modal1 */}
      <Suspense fallback={<RoundLoadingAnimation width={80} height={80} />}>
        {selectedGroup && (
          <BottomModal Visibility={isModalVisible} hide={toggleModal}>
            <Text
              style={{textAlign: 'left', width: '100%', ...Styles.heading2}}>
              {selectedGroup.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                anonymous
                  ? setError('Please login to view the group chat')
                  : status
                  ? handleLeaveGroup()
                  : handleJoinGroup();
              }}
              style={{paddingVertical: 10}}>
              <Text style={Styles.title}>
                {status ? 'Leave group' : 'Join group'}
              </Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={toggleModal}
              style={{paddingVertical: 10}}>
              <Text style={{color: COLORS.red}}>Close</Text>
            </TouchableOpacity>
          </BottomModal>
        )}
        {/* modal2 */}
        <CenterHalf Visibility={isModalVisible2} hide={toggleModal2}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.primary,
            }}>
            Enter Group Name:
          </Text>
          {/* input field */}
          <TextInput
            style={{marginVertical: 10, ...Styles.Qinput}}
            placeholder="Group name"
            placeholderTextColor={COLORS.gray}
            onChangeText={text => setCreateGroup(text)}
          />
          <RecButton
            onPress={() =>
              anonymous
                ? setError('Please login to create a group')
                : handleCreateGroup()
            }
            text={
              loading2 ? (
                <RoundLoadingAnimation width={50} height={50} />
              ) : (
                'Create Group'
              )
            }
            bgColor={COLORS.secondary}
            textColor={COLORS.black}
          />
        </CenterHalf>
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
    marginBottom: 30,
  },

  // search input field container
  Search_input_container: {
    position: 'relative',
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },

  // search input field
  Search_input: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: COLORS.black,
  },

  // available therapist list
  Group_list: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    marginTop: 10,
    paddingBottom: 230,
  },

  // available therapist image container
  group_image_container: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },

  // available therapist image
  group_image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // available therapist info
  group_information: {
    position: 'relative',
    left: -40,
    width: '60%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // available therapist button
  group_btn: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Add Group Button
  Add_group_btn: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },

  // Add Group Button Icon
  Add_group_btn_icon: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
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

export default Groups;
