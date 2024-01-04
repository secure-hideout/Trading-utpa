import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button } from "react-native-paper";
import { TextInput } from '@react-native-material/core';
import Modal from "react-native-modal";
import Deposit from './Deposite';


const WithDraw = ({withdraw , setWithdraw}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
 // const [setWithdraw ] = useState('');

  const handleWithdrawClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleWithdrawClick} style={styles.ellipse}>

        <Text style={[styles.text, styles.withdrawText]}>Withdraw</Text>
        <View style={styles.circle}>
          <Ionicons name="arrow-up-outline" size={30} color="black" />
        </View>
      </TouchableOpacity>

      <Modal  transparent={true} isVisible={isModalVisible}>
         <Card style={styles.cardContainer4}>
         <Text style={styles.conform}>
            Withdraw
        </Text>

         <TextInput
            variant="standard" 
            placeholder="Enter Amount"
            value={(Withdraw1)}
              onChangeText={(text) => setWithdraw(text)}
            style={{ top: 12, margin: 16, width: '87%', left: 5 }}
          />
            
             <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                    onPress={(withdraw)} 
                    labelStyle={styles.buttonText}
                  >
                    Withdraw
                  </Button>
              </View>
              <View style={styles.button2}>
                <Button
                    onPress={closeModal}
                    labelStyle={styles.buttonText1}
                >
                    Cancel
                </Button>
              </View>
            </View>
          </Card>
        </Modal>
    </View>
  );
};

export default WithDraw;