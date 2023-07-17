import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants';

const DiagnosisTools = () => {
  const navigation = useNavigation();

  // List of diagnosis tools
  const diagnosis = [
    {
      id: 1,
      title: 'Depression',
      textColor: COLORS.white,
      color: COLORS.yellow,
    },
    {
      id: 2,
      title: 'Anxiety',
      textColor: COLORS.white,
      color: COLORS.orange,
    },
    {
      id: 3,
      title: 'PTSD',
      textColor: COLORS.white,
      color: COLORS.cyan,
    },
  ];

  return (
    <View style={styles.diagnosis_Con}>
      {/* list of diagnosis tools */}
      {diagnosis.map(item => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Terms', {
              id: item.id,
              title: item.title,
            })
          }
          key={item.id}
          style={{
            backgroundColor: item.color,
            ...styles.diagnosis,
          }}>
          <Text style={{color: item.textColor, ...styles.text}}>
            {item.title}
          </Text>
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
    marginBottom: 180,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // This is the body header title
  diagnosis: {
    position: 'relative',
    width: '100%',
    height: 150,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  // This is the body header title
  text: {
    fontSize: 15,
  },
});
