// NetworkErrorModal.js
import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons or your preferred icon library

const NetworkErrorModal = ({ isVisible, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <LottieView
                        source={require('../assets/animations/wifi.json')} // Replace with your animation source
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                    <Text style={styles.modalText}>Check Your Network Connection</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: 350,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative',
    },
    animation: {
        width: 100,
        height: 100,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default NetworkErrorModal;
