// tab navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screen
import {Terms, Therapy, Test, TestResult} from '../screens';

const TherapyStack = createBottomTabNavigator();

const TherapyNavigation = () => {
  return (
    <TherapyStack.Navigator
      initialRouteName="Therapy"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <TherapyStack.Screen name="Therapy" component={Therapy} />
      <TherapyStack.Screen name="Terms" component={Terms} />
      <TherapyStack.Screen name="Test" component={Test} />
      <TherapyStack.Screen name="TestResult" component={TestResult} />
    </TherapyStack.Navigator>
  );
};

export default TherapyNavigation;
