import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { styles } from './Styles';
import { Ionicons } from '@expo/vector-icons';
const WithDraw = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleWithdrawClick = () => {
    console.log('Withdraw clicked');
    setModalText('Withdraw clicked');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleWithdrawClick} style={styles.ellipse}>
        <View style={styles.circle}>
          <Ionicons name="arrow-down-outline" size={30} color="black" />
        </View>
        <Text style={[styles.text, styles.withdrawText]}>Withdraw</Text>
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

export default WithDraw;