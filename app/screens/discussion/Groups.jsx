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

//General styles
import Styles from '../../constants/Styles';

// constants
import {COLORS} from '../../constants';
import {Menu, Plus, Card, BottomModal, CenterHalf} from '../../components';

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
            <View style={styles.Search_input_container}>
              <TextInput
                style={styles.Search_input}
                placeholderTextColor={COLORS.black}
                placeholder="Search ..."
              />
            </View>

            {/* list of available Groups */}
            <Text style={{paddingHorizontal: 10, ...Styles.heading}}>
              List of communities to join:
            </Text>
            <View style={styles.Group_list}>
              {groups.map((item, index) => (
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
    paddingHorizontal: 10,
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
});

export default Groups;
