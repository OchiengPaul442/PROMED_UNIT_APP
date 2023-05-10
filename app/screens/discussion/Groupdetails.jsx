import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// constants
import {COLORS} from '../../constants';

// components
import {
  FocusedStatusBar,
  BackBtn,
  Card,
  Menu,
  RoundLoadingAnimation,
} from '../../components';
import Styles from '../../constants/Styles';

const Groupdetails = ({route, navigation}) => {
  // get params
  const {groupdata} = route.params;

  // useFocusEffect hook
  useFocusEffect(
    React.useCallback(() => {
      // Hide bottom navigator when this screen is focused
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });

      return () => {
        // Show bottom navigator when this screen is unfocused
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.menuBar,
        });
      };
    }, [navigation]),
  );

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
                      Group: 123 participants
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
                  {groupdata.Number_of_Members.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        position: 'relative',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.orange,
                        paddingVertical: 10,
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.red,
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
                    </View>
                  ))}
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
