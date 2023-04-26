import React from 'react';
import {Text, View} from 'react-native';

// constants
import {COLORS} from '../../constants';
// checkbox
import CheckBox from '@react-native-community/checkbox';

const Checkbox = props => {
  // handle checkbox
  const [agree, setAgree] = React.useState(false);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <CheckBox
        value={props.agree}
        onValueChange={props.setAgree}
        tintColors={{true: COLORS.primary, false: COLORS.darkGray}}
        style={{marginRight: 10}}
      />
      <View>
        <Text
          style={{
            color: COLORS.black,
          }}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default Checkbox;
