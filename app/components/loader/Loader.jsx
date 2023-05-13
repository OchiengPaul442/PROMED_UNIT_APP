import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import Styles from '../../constants/Styles';

const Loader = props => {
  return (
    <AnimatedLoader
      visible={props.loading}
      source={require('../../assets/animations/Loader.json')}
      overlayColor="rgba(0,0,0,0.58)"
      animationStyle={Styles.lottie}
      speed={1}>
      <Text>Loading...</Text>
    </AnimatedLoader>
  );
};

export default Loader;

const styles = StyleSheet.create({});
