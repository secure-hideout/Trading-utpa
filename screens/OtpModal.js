import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OtpModal = ({ isVisible, onClose, onConfirm, onOtpChange, otpError }) => {
    const [otp, setOtp] = useState('');

    const handleConfirm = () => {
        // You can perform any necessary actions before confirming OTP, such as validation
        onConfirm(otp);
    };

    const handleClose = () => {
        // Clear OTP input and close the modal if onClose is defined
        if (onClose) {
            setOtp('');
            onClose();
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.textContainer}>
                            <Text style={styles.modalTitle}>Enter OTP</Text>
                        </View>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="ios-close" size={28} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter OTP"
                            value={otp}
                            onChangeText={(text) => {
                                setOtp(text);
                                onOtpChange(text);
                            }}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    </View>
                    {otpError && <Text style={styles.errorText}>{otpError}</Text>}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
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
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        padding: 5,
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
    errorText: {
        color: 'red',
        marginBottom: 10,
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
        color: 'rgba(28, 30, 50, 1)',
    },
});

export default OtpModal;
