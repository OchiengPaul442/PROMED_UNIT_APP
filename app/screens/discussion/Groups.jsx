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
import React from 'react';

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS} from '../../constants';
import {
  Menu,
  Plus,
  Card,
  BottomModal,
  CenterHalf,
  RecButton,
} from '../../components';

// screen layout
import Screen from '../../layout/Screen';

const Groups = ({navigation}) => {
  // List of available Groups
  const groups = [
    {
      name: 'Group 1',
      Number_Of_Members: 15,
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Group 2',
      Number_Of_Members: 5,
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Group 3',
      Number_Of_Members: 5,
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Group 4',
      Number_Of_Members: 25,
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Group 5',
      Number_Of_Members: 15,
      image: require('../../assets/images/profilepic.jpg'),
    },
    {
      name: 'Group 6',
      Number_Of_Members: 50,
      image: require('../../assets/images/profilepic.jpg'),
    },
  ];

  // Modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

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
                />
              </View>
            </View>

            {/* list of available Groups */}
            <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
              List of communities to join:
            </Text>
            <View style={styles.Group_list}>
              <FlatList
                scrollEnabled={false}
                data={groups}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={{paddingHorizontal: 10}}>
                    <Card
                      Press={() =>
                        navigation.push('Groupchat', {
                          groupname: item.name,
                        })
                      }
                      bgColor={COLORS.lightGray}
                      height={90}
                      key={index}>
                      <View
                        style={{
                          width: '20%',
                          height: '100%',
                          ...styles.group_image_container,
                        }}>
                        <Image source={item.image} style={styles.group_image} />
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
                            Members: {item.Number_Of_Members}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedGroup(item);
                            toggleModal();
                          }}
                          style={styles.group_btn}>
                          <Menu width={30} height={30} fill={COLORS.black} />
                        </TouchableOpacity>
                      </View>
                    </Card>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Modal1 */}
      {selectedGroup ? (
        <BottomModal Visibility={isModalVisible} hide={toggleModal}>
          <Text style={{textAlign: 'left', width: '100%', ...Styles.heading2}}>
            {selectedGroup.name}
          </Text>
          <TouchableOpacity style={{paddingVertical: 10}}>
            <Text style={Styles.title}>Leave Group</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <TouchableOpacity
            onPress={() =>
              navigation.push('Groupchat', {
                groupname: selectedGroup.name,
              })
            }
            style={{paddingVertical: 10}}>
            <Text style={Styles.title}>Join Group</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <TouchableOpacity onPress={toggleModal} style={{paddingVertical: 10}}>
            <Text style={{color: COLORS.red}}>Close</Text>
          </TouchableOpacity>
        </BottomModal>
      ) : null}

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
        />
        <RecButton
          text="Create Group"
          bgColor={COLORS.secondary}
          textColor={COLORS.black}
        />
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
