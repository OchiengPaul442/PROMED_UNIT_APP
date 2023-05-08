import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
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
  Menu,
  SendIcon,
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
      <View style={styles.groupchat_screen}>
        {/* Head */}
        <View
          style={{
            padding: 10,
            display: 'flex',
            width: '100%',
            height: '8%',
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
              {groupdata.name + ' details'}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.Content}>
          <Text>Group Details</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Groupdetails;

const styles = StyleSheet.create({
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
  // This is the main container that holds all the components
  groupchat_screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },

  // This is the Content that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '92%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
