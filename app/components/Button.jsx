/* eslint-disable prettier/prettier */
import {Pressable, TouchableOpacity, Text, View} from 'react-native';
import {ICONS, Back} from '../constants';

export const CurvedButton = ({text, onPress, color, radius}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        width: 180,
        padding: 15,
        borderRadius: radius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text style={{color: color, fontSize: 18, fontWeight: 'bold'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const RecButton = props => {
  return (
    <Pressable
      style={{
        position: 'relative',
        backgroundColor: props.bgColor,
        width: props.w,
        padding: 10,
        borderRadius: 10,
        margin: 10,
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
      onPress={props.onPress}>
      <Text
        style={{
          position: 'absolute',
          left: 10,
        }}>
        {props.icon}
      </Text>
      <Text style={{color: props.textColor, fontSize: 18, fontWeight: 'bold'}}>
        {props.text}
      </Text>
    </Pressable>
  );
};

export const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Back width={26} height={26} />
    </TouchableOpacity>
  );
};
