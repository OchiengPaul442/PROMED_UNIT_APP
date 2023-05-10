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

  // hide bottom tab bar
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
      return () =>
        // Show bottom navigator when this screen is unfocused
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.menuBar,
        });
    }, [navigation]),
  );

  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />
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
});
