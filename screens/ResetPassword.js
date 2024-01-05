import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuccessModal = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.textContainer}>
              <Text style={styles.modalTitle}>Success</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="ios-close" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/animations/mail.json')} // Replace with the actual path to your Lottie animation
              autoPlay
              loop={true}
            />
          </View>
          <Text style={[styles.modalText, styles.centerText]}>
            Please check your email for the new password.
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(28, 30, 50, 1)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 5,
  },
  animationContainer: {
    width: '100%',
    height: 150, // Adjust the height based on your animation
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(28, 30, 50, 1)',
    marginBottom: 10,
  },
  centerText: {
    textAlign: 'center',
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
    color: 'rgba(28, 30, 50, 1)',
  },
});

export default SuccessModal;