import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import {Logo} from '../../constants';

const Splash = () => {
  return (
    <View style={styles.splash_screen}>
      <View>
        <Image width={50} height={50} source={Logo} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splash_screen: {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});
