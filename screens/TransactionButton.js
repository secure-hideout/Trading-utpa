import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';

const TransactionButton = ({ iconName, label }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    const handleTransactionClick = () => {
        console.log(`${label} clicked`);
        setModalText(`${label} clicked`);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={handleTransactionClick} style={styles.ellipse}>
                <Text style={[styles.text, styles.withdrawText]}>{label}</Text>
                <View style={styles.circle}>
                    <Ionicons name={iconName} size={30} color="black" />
                </View>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text>{modalText}</Text>
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
        </View>
    );
};

export default TransactionButton;

