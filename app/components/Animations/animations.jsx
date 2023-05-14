import React from 'react';
import Lottie from 'lottie-react-native';

//Confirmed animation
export const ConfirmedAnimation = () => {
  return (
    <Lottie
      style={{width: 200, height: 200}}
      source={require('../../assets/animations/confirmed.json')}
      autoPlay
      loop={false}
    />
  );
};

//Bad animation
export const BadAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../../assets/animations/feelbad.json')}
      autoPlay
      loop={true}
    />
  );
};

// Unhappy animation
export const UnHappyAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../../assets/animations/unhappy.json')}
      autoPlay
      loop={true}
    />
  );
};

// Well animation
export const WellAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../../assets/animations/well.json')}
      autoPlay
      loop={true}
    />
  );
};

// Happy animation
export const HappyAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../../assets/animations/happy.json')}
      autoPlay
      loop={true}
    />
  );
};

// Excellent animation
export const ExcellentAnimation = () => {
  return (
    <Lottie
      style={{width: 40, height: 40}}
      source={require('../../assets/animations/excellent.json')}
      autoPlay
      loop={true}
    />
  );
};

// Round Loading animation
export const RoundLoadingAnimation = props => {
  return (
    <Lottie
      style={{width: props.width, height: props.height}}
      source={require('../../assets/animations/loadingRound.json')}
      autoPlay
      loop={true}
    />
  );
};

// dot becon animation
export const DotBeconAnimation = props => {
  return (
    <Lottie
      style={{width: props.width, height: props.height}}
      source={require('../../assets/animations/dotBecon.json')}
      autoPlay
      loop={true}
    />
  );
};
