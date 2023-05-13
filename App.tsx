import React from 'react';
import AppNavigations from './app/navigations/AppNavigations';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    // Hide splash screen on app load
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigations />
    </NavigationContainer>
  );
};

export default App;
