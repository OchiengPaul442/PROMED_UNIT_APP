import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants';

const DiagnosisTools = () => {
  // List of diagnosis tools
  const diagnosis = [
    {
      title: 'Depression',
      color: COLORS.peach,
    },
    {
      title: 'Anxiety',
      color: COLORS.yellow,
    },
    {
      title: 'Stress',
      color: COLORS.gray,
    },
    {
      title: 'PTSD',
      color: COLORS.secondary,
    },
  ];

  return (
    <View style={styles.diagnosis_Con}>
      {/* list of diagnosis tools */}
      {diagnosis.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: item.color,
            ...styles.diagnosis,
          }}>
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DiagnosisTools;

const styles = StyleSheet.create({
  // this will contain the list of diagnosis tools
  diagnosis_Con: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // This is the body header title
  diagnosis: {
    position: 'relative',
    width: '48%',
    height: 100,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // This is the body header title
  text: {
    fontSize: 15,
    color: COLORS.primary,
  },
});
