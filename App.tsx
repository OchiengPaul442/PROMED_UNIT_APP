import React from 'react';
import AppNavigations from './app/navigations/AppNavigations';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigations />
    </NavigationContainer>
  );
};

export default App;
