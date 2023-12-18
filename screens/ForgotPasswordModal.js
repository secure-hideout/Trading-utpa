// ForgotPasswordModal.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPasswordModal = ({ isVisible, onClose, onSendOTP }) => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleSendOTP = () => {
        // You can perform any necessary actions before sending OTP, such as validation
        onSendOTP(email);
    };

    const validateEmail = (email) => {
        // Add your email validation logic here
        const emailPattern = /\S+@\S+\.\S+/;
        const isValid = emailPattern.test(email);
        setIsEmailValid(isValid);
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.textContainer}>
                            <Text style={styles.modalTitle}>Forgot Password</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="ios-close" size={28} color="black" />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter your email address"
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
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
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
    input: {

        borderColor: '#C1C2EB',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        fontWeight: '500',
        fontSize: 16,
    },
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
