/* eslint-disable prettier/prettier */
import {Pressable, TouchableOpacity, Text} from 'react-native';

// constants
import {Back} from '../../constants';

export const CurvedButton = props => {
  return (
    <TouchableOpacity
      style={{
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
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text style={{color: props.textColor, fontSize: 18, fontWeight: 'bold'}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export const RecButton = props => {
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
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
