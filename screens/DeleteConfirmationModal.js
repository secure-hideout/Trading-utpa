import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const DeleteConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundColor:'FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 350,
    backgroundColor: 'rgba(227, 233, 240, 1)',
    // backgroundColor:'FFFFFF',

    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#C1C2EB',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  cancelButton: {
    backgroundColor: '#B7DDD2',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    // lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
});

export default DeleteConfirmationModal;
