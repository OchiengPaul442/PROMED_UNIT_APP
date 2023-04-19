import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// constants
import {COLORS} from '../../constants';
import {Menu, Plus} from '../../components';

// screen layout
import Screen from '../../layout/Screen';

// card
import Card from '../../components/Cards/Card';

// modal
import {BottomModal, CenterHalf} from '../../components';

const Groups = () => {
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

  // modal

  // Modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  return (
    <Screen>
      <View style={styles.Groups_Screen}>
        {/* Add Group Button */}
        <View style={styles.Add_group_btn}>
          <TouchableOpacity
            onPress={toggleModal2}
            style={styles.Add_group_btn_icon}>
            <Plus width={30} height={30} fill={COLORS.black} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.Content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search input field section */}
            <View style={styles.Search_input_con}>
              <TextInput
                style={styles.Search_input}
                placeholderTextColor={COLORS.black}
                placeholder="Search ..."
              />
            </View>

            {/* list of available Groups */}
            <Text style={styles.Heading_title}>
              List of communities to join:
            </Text>
            <View style={styles.Group_list}>
              {groups.map((item, index) => (
                <Card key={index}>
                  <View style={styles.group_img_con}>
                    <Image source={item.image} style={styles.group_img} />
                  </View>
                  <View style={styles.group_info}>
                    <View
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '50%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.group_name}>{item.name}</Text>
                      <Text style={styles.group_title}>
                        Members: {item.Number_Of_Members}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={styles.group_btn}>
                      <Menu width={30} height={30} fill={COLORS.black} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      {/* Modal1 */}
      <BottomModal Visibility={isModalVisible} hide={toggleModal}>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.primary,
          }}>
          Modal
        </Text>
      </BottomModal>
      {/* modal2 */}
      <CenterHalf Visibility={isModalVisible2} hide={toggleModal2}>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.primary,
          }}>
          Modal2
        </Text>
      </CenterHalf>
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  // This is the main container that holds all the components
  Groups_Screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  // This is the Content that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  // This is the body header that contains the title
  Heading_container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    marginBottom: 30,
  },

  // This is the body header title
  Heading_title: {
    fontSize: 15,
    color: COLORS.primary,
  },

  // search input field container
  Search_input_con: {
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
    paddingBottom: 220,
  },

  // available therapist image container
  group_img_con: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },

  // available therapist image
  group_img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // available therapist info
  group_info: {
    position: 'relative',
    left: -40,
    width: '60%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // available therapist name
  group_name: {
    fontSize: 15,
    color: COLORS.primary,
  },

  // available therapist title
  group_title: {
    fontSize: 12,
    color: COLORS.black,
  },

  // available therapist location
  Therapist_location: {
    fontSize: 12,
    color: COLORS.black,
  },

  // available therapist rating
  Therapist_rating: {
    position: 'relative',
    width: 30,
    height: 30,
    marginTop: 4,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // available therapist rating text
  Therapist_rating_text: {
    fontSize: 12,
    color: COLORS.white,
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
});

export default Groups;
