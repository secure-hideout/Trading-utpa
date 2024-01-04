import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput, Card, Button } from 'react-native';

const TransactionModal = ({ isVisible, onClose, onTransaction, sellType, lastPrice, availableQuantity }) => {
  const [quantity, setQuantity] = useState('');

  const handleTransaction = () => {
    if (!quantity || isNaN(quantity)) {
      // Handle validation
      return;
    }

    onTransaction(quantity);
    setQuantity('');
  };
  const handleClose = () => {
    // Reset quantity and close the modal
    setQuantity('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.textContainer}>
              <Text style={styles.modalTitle}>{sellType === 'buy' ? 'Buy' : 'Sell'}</Text>
            </View>
            {/* <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="ios-close" size={28} color="black" />
            </TouchableOpacity> */}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Current Price:</Text>
              <Text style={styles.infoValue}>{lastPrice}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Available Quantity:</Text>
              <Text style={styles.infoValue}>{availableQuantity}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter Quantity:</Text>
            <TextInput
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleTransaction} style={styles.confirmButton}>
              <Text style={styles.buttonText}>{sellType === 'buy' ? 'Buy Now' : 'Sell Now'}</Text>
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
    width: '87%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 5,
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#4d4d4d',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
 
    justifyContent: 'space-between',
    marginTop: -5,
    
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#4d4d4d',
    
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent:'space-between',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
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
});

export default TransactionModal;
