import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

// constants
import {COLORS} from '../../constants';

// layout
import Screen from '../../layout/Screen';

const Bot = () => {
  return (
    <Screen>
      <View style={styles.Bot_Screen}>
        {/* Content */}
        <ScrollView style={styles.Content} showsVerticalScrollIndicator={false}>
          <View style={styles.Heading_container}>
            <Text style={styles.Heading_title}>Bot SCREEN</Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  // This is the main container that holds all the components
  Bot_Screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  // This is the Content that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingVertical: 20,
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
});

export default Bot;
