import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ResetPassword from './ResetPassword';

import { TextInput as MaterialTextInput } from '@react-native-material/core';

const ForgotPasswordModal = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Reset input fields when the modal becomes visible
    if (isVisible) {
      setEmail('');
      setIsEmailValid(false);
    }
  }, [isVisible]);

  const handleSendOTP = async () => {
    try {
      // Make a POST request to the forgot-password endpoint
      const response = await fetch('http://35.154.235.224:8000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Assuming the API response contains relevant information, you can handle it here
        const responseData = await response.json();
        console.log('Password sent successfully:', responseData);

        // Show success modal after successful API call
        setShowSuccessModal(true);
      } else {
        // Handle non-successful responses, e.g., show an error message to the user
        console.error('Error sending password. Status:', response.status);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error('Error sending password:', error);
    }
  };

  const validateEmail = (email) => {
    // Add your email validation logic here
    const emailPattern = /\S+@\S+\.\S+/;
    const isValid = emailPattern.test(email);
    setIsEmailValid(isValid);
  };

  const handleClose = () => {
    // Close the modals and reset input fields
    onClose();
    setShowSuccessModal(false);
    setEmail('');
    setIsEmailValid(false);
  };

  return (
    <View>
      {/* Main Modal */}
      <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={handleClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.textContainer}>
                <Text style={styles.modalTitle}>Forgot Password</Text>
              </View>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="ios-close" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
            <MaterialTextInput
  label="Enter your email address"
  value={email}
  onChangeText={(text) => {
    setEmail(text);
    validateEmail(text);
  }}
  style={styles.input}
/>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSendOTP}
                disabled={!isEmailValid}
                style={!isEmailValid ? styles.disabledButton : styles.confirmButton}
              >
                <Text style={styles.buttonText}>Send password</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <ResetPassword isVisible={showSuccessModal} onClose={handleClose} />
    </View>
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
        // marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        padding: 5,
    },
    closeIcon: {
        fontSize: 28,
        color: 'black',
    },
    modalText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19.09,
        color: 'rgba(28, 30, 50, 1)',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    // input: {

    //     borderColor: '#C1C2EB',
    //     borderWidth: 1,
    //     padding: 10,
    //     width: '100%',
    //     fontWeight: '500',
    //     fontSize: 16,
    // },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',


    },

    disabledButton: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
        margin: 10,
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
        color: 'rgba(28, 30, 50, 1)',
    },
});

export default ForgotPasswordModal;