import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';

//General styles
import Styles from '../../constants/Styles';
// constants
import {COLORS, ProfileImage} from '../../constants';
import {
  FocusedStatusBar,
  BackBtn,
  RecButton,
  CenterHalf,
  EditIcon,
} from '../../components';

const Profile = ({navigation}) => {
  // MODAL
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  return (
    <SafeAreaView>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      {/* Head */}
      <View style={Styles.Container}>
        <View style={styles.Profile_screen}>
          <View
            style={{
              padding: 10,
              display: 'flex',
              width: '100%',
              height: '8%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackBtn width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <EditIcon width={30} height={30} fill={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View style={styles.Profile_image}>
            <Image
              source={ProfileImage}
              style={{width: 120, height: 120, borderRadius: 100}}
            />
          </View>

          {/* Content */}
          <View style={Styles.Content}>
            <View style={styles.Profile_container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: 10, paddingBottom: 180}}>
                  <View
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          2
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Appointments</Text>
                    </View>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          2
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Communities Joined</Text>
                    </View>
                    <View style={styles.card_container}>
                      <View style={{width: 100, ...styles.card}}>
                        <Text style={{textAlign: 'center', ...Styles.heading2}}>
                          2
                        </Text>
                      </View>
                      <Text style={Styles.text2}>Recent Test score</Text>
                    </View>
                  </View>
                  {/* personal details */}
                  <View
                    style={{
                      width: '100%',
                      ...styles.card,
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        width: '100%',
                        ...Styles.title,
                      }}>
                      Personal Details
                    </Text>
                    <View style={styles.pesonal_details}>
                      <Text style={Styles.title2}>Name:</Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'right',
                          ...Styles.text,
                        }}>
                        Kirabo Cynthia
                      </Text>
                    </View>
                    <View style={styles.pesonal_details}>
                      <Text style={Styles.title2}>Email address:</Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'right',
                          ...Styles.text,
                        }}>
                        Kirabocynthia@gmail.com
                      </Text>
                    </View>
                    <View style={styles.pesonal_details}>
                      <Text style={Styles.title2}>Phone number:</Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'right',
                          ...Styles.text,
                        }}>
                        +256-777-885-433
                      </Text>
                    </View>
                  </View>

                  {/* change password section */}
                  <View style={{width: '100%', ...styles.card}}>
                    <Text
                      style={{
                        textAlign: 'left',
                        width: '100%',
                        marginBottom: 10,
                        ...Styles.title,
                      }}>
                      Change Password
                    </Text>
                    <View>
                      <View style={{width: '100%', ...Styles.Qgroup}}>
                        <Text style={Styles.Qlabel}>Old Password</Text>
                        <TextInput
                          style={Styles.Qinput}
                          placeholder="Old Password"
                        />
                      </View>
                      <View style={{width: '100%', ...Styles.Qgroup}}>
                        <Text style={Styles.Qlabel}>New Password</Text>
                        <TextInput
                          style={Styles.Qinput}
                          placeholder="Old Password"
                        />
                      </View>
                      <View style={{width: '100%', ...Styles.Qgroup}}>
                        <Text style={Styles.Qlabel}>Confirm Password</Text>
                        <TextInput
                          style={Styles.Qinput}
                          placeholder="Old Password"
                        />
                      </View>
                      {/* submit button */}
                      <RecButton
                        text="Change Password"
                        bgColor={COLORS.secondary}
                        textColor={COLORS.black}
                      />
                    </View>
                  </View>

                  {/* Delete account */}
                  <View style={{width: '100%', ...styles.card}}>
                    <Text
                      style={{
                        textAlign: 'left',
                        width: '100%',
                        marginBottom: 10,
                        ...Styles.title,
                      }}>
                      Delete account
                    </Text>
                    <View>
                      <RecButton
                        onPress={toggleModal2}
                        text="Delete Account"
                        textColor={COLORS.white}
                        bgColor={COLORS.tertiary}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>

      {/* MODAL1 */}
      <CenterHalf Visibility={isModalVisible} hide={toggleModal}>
        <Text style={Styles.title}>Edit details</Text>
        <View
          style={{
            width: '100%',
            position: 'relative',
          }}>
          <View style={Styles.Qgroup}>
            <Text style={Styles.Qlabel}>Username</Text>
            <TextInput style={Styles.Qinput} />
          </View>
          <View style={Styles.Qgroup}>
            <Text style={Styles.Qlabel}>Email address</Text>
            <TextInput style={Styles.Qinput} />
          </View>
          <View style={Styles.Qgroup}>
            <Text style={Styles.Qlabel}>Phone number</Text>
            <TextInput style={Styles.Qinput} />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <RecButton
              w={100}
              text="Edit data"
              bgColor={COLORS.primary}
              textColor={COLORS.white}
            />
            <RecButton
              onPress={toggleModal}
              w={100}
              text="Close"
              bgColor={COLORS.tertiary}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </CenterHalf>

      {/* MODAL2 */}
      <CenterHalf Visibility={isModalVisible2} hide={toggleModal2}>
        <Text style={Styles.title}>Are You sure about this?</Text>
        <View
          style={{
            width: 'auto',
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <RecButton
            text="Yes"
            w={100}
            bgColor={COLORS.red}
            textColor={COLORS.white}
          />
          <RecButton
            onPress={toggleModal2}
            text="No"
            w={100}
            bgColor={COLORS.primary}
            textColor={COLORS.white}
          />
        </View>
      </CenterHalf>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Profile_screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },

  Profile_image: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  Profile_container: {
    width: '100%',
    height: '100%',
    paddingVertical: 20,
  },

  card_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  card: {
    position: 'relative',
    height: 'auto',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: COLORS.black,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  pesonal_details: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
