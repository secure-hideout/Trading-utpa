import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button } from 'react-native';

const MyWatchList = () => {

  const [isMtdModalVisible, setIsMtdModalVisible] = useState(false);
  const [isYtdModalVisible, setIsYtdModalVisible] = useState(false);

  const toggleMtdModal = () => {
    setIsMtdModalVisible(!isMtdModalVisible);
  };

  const toggleYtdModal = () => {
    setIsYtdModalVisible(!isYtdModalVisible);
  };
  
    return(
    <View style={styles.container4}>
      <Text style={styles.title}>My Watchlist</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleMtdModal}>
          <Text style={styles.buttonText}>MTD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleYtdModal}>
          <Text style={styles.buttonText}>YTD</Text>
        </TouchableOpacity>
      </View>
      

      <Modal visible={isMtdModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>MTD Modal</Text>
          {/* Add your MTD modal content here */}
          <TouchableOpacity style={styles.modalCloseButton} onPress={toggleMtdModal}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* YTD Modal */}
      <Modal visible={isYtdModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>YTD Modal</Text>
          {/* Add your YTD modal content here */}
          <TouchableOpacity style={styles.modalCloseButton} onPress={toggleYtdModal}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    );
};

const styles = {
    container4: {
      padding:10,
       borderRadius:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //padding: 13,
        backgroundColor: '#F5F5F5',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      buttonsContainer: {
        flexDirection: 'row',
      },
      button: {
        marginLeft: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#1C1E32',
        borderRadius: 10,
        backgroundColor:'black',
      },
      buttonText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight:900,
        lineHeight:11.93,
        textAlign:'center',
      },
      
      modalCloseButton: {
        marginTop: 16,
        padding: 8,
        backgroundColor: '#ECECEC',
        borderRadius: 4,
      },
      modalCloseButtonText: {
        fontSize: 14,
        color: 'black',
      },
}

export default MyWatchList;