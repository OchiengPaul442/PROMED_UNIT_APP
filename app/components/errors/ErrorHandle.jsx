import {StyleSheet, Text, View, Animated, Alert} from 'react-native';
import React, {useContext} from 'react';

// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

// components
import {TickIcon, CloseIcon} from '../icons/Icons';

const ErrorHandle = props => {
  // context
  const {error, setError, errorStatus} = useContext(AuthContext);

  // Generate full code to handle showing and hiding the error when it appear using the Animated API
  const [animation, setAnimation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  if (!error) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.errorContainer,
        {
          transform: [
            {
              translateY: translateY,
            },
          ],
        },
      ]}>
      <View style={styles.error}>
        <View>
          {errorStatus === 'success' ? (
            <TickIcon width={30} height={30} fill={COLORS.primary} />
          ) : (
            <CloseIcon width={30} height={30} fill={COLORS.red} />
          )}
        </View>
        <Text style={{marginLeft: 10, ...Styles.text}}>{props.message}</Text>
      </View>
    </Animated.View>
  );
};

export default ErrorHandle;

const styles = StyleSheet.create({
  errorContainer: {
    top: 20,
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    width: 'auto',
    height: 'auto',
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
});
