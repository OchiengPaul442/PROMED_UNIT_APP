import {COLORS} from '../../constants';
import DatePicker from 'react-native-modern-datepicker';
import React from 'react';

const Datepicker = props => {
  return (
    <DatePicker
      options={{
        backgroundColor: COLORS.lightGray,
        textHeaderColor: COLORS.primary,
        textDefaultColor: COLORS.black,
        selectedTextColor: COLORS.white,
        mainColor: COLORS.primary,
        textSecondaryColor: COLORS.tertiary,
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      current="2023-01-1"
      onSelectedChange={props.datachange}
      // format="YYYY/MM/DD"
      mode="calendar"
      minuteInterval={30}
      style={{...props.style}}
    />
  );
};

export default Datepicker;
