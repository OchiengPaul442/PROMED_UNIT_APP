import {StyleSheet, View} from 'react-native';
import React from 'react';

// Modals
import Modal from 'react-native-modal';

const CenterHalf = ({Visibility, hide, children}) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      avoidKeyboard={true}
      backdropOpacity={0.4}
      isVisible={Visibility}
      onBackdropPress={hide}>
      <View style={styles.modalCenter}>{children}</View>
    </Modal>
  );
};

export default CenterHalf;

const styles = StyleSheet.create({
  // Center Half modal
  modalCenter: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
