import {StyleSheet, View, SafeAreaView} from 'react-native';
import {FocusedStatusBar, Header} from '../components';
import {COLORS} from '../constants';

const Screen = props => {
  return (
    <SafeAreaView>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        {/* Header component */}
        <Header />

        {/* Content */}
        <View>{props.children}</View>
      </View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  // This is the container that holds all the components
  container: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});
