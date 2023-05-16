import {StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';

// components
import {FocusedStatusBar, CurvedButton} from '../../components';

// Constants
import {COLORS, SIZES, RightPam, LeftPam} from '../../constants';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor="black" />

      {/* Images */}
      <View style={styles.images}>
        <Image style={{transform: [{rotate: '5deg'}]}} source={LeftPam} />
        <Image style={{transform: [{rotate: '-5deg'}]}} source={RightPam} />
      </View>

      {/* Detail */}
      <View style={styles.detail}>
        <Text style={styles.detailHeading}>Therapy & Care</Text>
        <Text style={styles.detailText}>
          We help professionals and patients find each other
        </Text>
        <View style={styles.button}>
          <CurvedButton
            text="Get Started"
            textColor={COLORS.primary}
            style={{
              backgroundColor: COLORS.white,
              width: 200,
              height: 50,
              borderRadius: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 5,
            }}
            onPress={() => {
              navigation.navigate('Access');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  detail: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailHeading: {
    fontSize: SIZES.xxl,
    color: COLORS.white,
    fontWeight: 'bold',
  },

  detailText: {
    textAlign: 'center',
    fontSize: 15,
    color: COLORS.white,
    paddingTop: 10,
    width: 230,
  },

  button: {
    marginTop: 40,
  },

  images: {
    position: 'absolute',
    top: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default WelcomeScreen;
