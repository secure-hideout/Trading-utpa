import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Withdraw from './WithDraw';

import { styles } from './Styles';


const Deposit = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleDepositClick = () => {
    console.log('Deposit clicked');
    setModalText('Deposit clicked');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.container3}>
        <TouchableOpacity onPress={handleDepositClick} style={styles.ellipse}>
          <View style={styles.circle}>
            <Ionicons name="arrow-down-outline" size={30} color="black" />
          </View>
          <Text style={[styles.text, styles.withdrawText2]}>Deposit</Text>
        </TouchableOpacity>
        <View style={styles.spacing} />
        <Withdraw />
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>{modalText}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

export default Deposit;
