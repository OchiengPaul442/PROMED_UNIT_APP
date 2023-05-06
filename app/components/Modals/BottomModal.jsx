import {StyleSheet, View} from 'react-native';
import React from 'react';

// Modals
import Modal from 'react-native-modal';

const BottomModal = ({Visibility, hide, children}) => {
  return (
    <Modal
      style={{
        margin: 0,
      }}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      avoidKeyboard={true}
      backdropOpacity={0.4}
      isVisible={Visibility}
      onBackdropPress={hide}>
      <View style={styles.modalBottom}>{children}</View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  // Bottom Half modal
  modalBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
