// imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// constants
import {COLORS} from '../constants'; // predefined colors for the app
import Styles from '../constants/Styles'; // custom styles for the app

// components
import {FocusedStatusBar, BackBtn, DetailsIcon} from '../components'; // components for the status bar, buttons, icons and loading animation

const Screen2 = ({nav, title, data, nav_route, children}) => {
  // useFocusEffect hook
  useFocusEffect(
    React.useCallback(() => {
      nav.addListener('focus', () => {
        nav.getParent()?.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      });

      return () => {
        // Show bottom navigator when this screen is unfocused
        nav.getParent()?.setOptions({
          tabBarStyle: Styles.menuBar,
        });
      };
    }, [nav]),
  );

  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />

      <View style={styles.Screen2}>
        {/* Head */}
        <View style={styles.nav}>
          <TouchableOpacity style={{padding: 10}} onPress={() => nav.goBack()}>
            <BackBtn width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() =>
              nav && data && nav_route ? nav.navigate(nav_route, {data}) : null
            }>
            <DetailsIcon width={30} height={30} fill={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.Content}>
          <View style={Styles.chats}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  // This is the main container that holds all the components
  Screen2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },

  // navigation
  nav: {
    padding: 10,
    display: 'flex',
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // chat name
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
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
