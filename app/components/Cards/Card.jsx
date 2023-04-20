import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Card = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        height: props.height,
        backgroundColor: props.bgColor,
        ...styles.Tip_card,
      }}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  // This is the card for each tip
  Tip_card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
});
