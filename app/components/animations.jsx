import React from 'react';
import Lottie from 'lottie-react-native';

export const ConfirmedAnimation = () => {
  return (
    <Lottie
      style={{width: 200, height: 200}}
      source={require('../assets/animations/confirmed.json')}
      autoPlay
      loop={false}
    />
  );
};

export const BadAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../assets/animations/feelbad.json')}
      autoPlay
      loop={true}
    />
  );
};

export const UnHappyAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../assets/animations/unhappy.json')}
      autoPlay
      loop={true}
    />
  );
};

export const WellAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../assets/animations/well.json')}
      autoPlay
      loop={true}
    />
  );
};

export const HappyAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../assets/animations/happy.json')}
      autoPlay
      loop={true}
    />
  );
};

export const ExcellentAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../assets/animations/excellent.json')}
      autoPlay
      loop={true}
    />
  );
};
