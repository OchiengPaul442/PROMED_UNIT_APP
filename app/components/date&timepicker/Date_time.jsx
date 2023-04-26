import {COLORS} from '../../constants';
import DatePicker from 'react-native-modern-datepicker';

export const Datepicker = props => {
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
      current="2020-07-13"
      selected={props.datachange}
      //   selected={getFormatedDate(new Date(), 'YYYY/MM/DD')}
      mode="calendar"
      minuteInterval={30}
      style={{...props.style}}
    />
  );
};

export const Timepicker = props => {
  return (
    <DatePicker
      mode="time"
      minuteInterval={3}
      options={{
        textHeaderColor: COLORS.primary,
        textDefaultColor: COLORS.black,
        selectedTextColor: COLORS.white,
        mainColor: COLORS.primary,
        textSecondaryColor: COLORS.tertiary,
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      style={{...props.style}}
      onTimeChange={props.timechange}
    />
  );
};
