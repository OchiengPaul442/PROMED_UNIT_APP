import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import React from 'react';

const CardView = props => {
  return (
    <TouchableOpacity
      onPress={props.Press}
      style={{
        height: props.height,
        ...styles.container,
      }}>
      {props.children}
    </TouchableOpacity>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
});
