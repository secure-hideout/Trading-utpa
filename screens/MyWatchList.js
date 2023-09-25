//cryptoAsset list


import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button } from 'react-native';

import { StyleSheet } from 'react-native';
const MyWatchList = () => {

  const [isMtdModalVisible, setIsMtdModalVisible] = useState(false);
  const [isYtdModalVisible, setIsYtdModalVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('MTD');

  const toggleMtdModal = () => {
    setIsMtdModalVisible(!isMtdModalVisible);
    setActiveButton('MTD');
  };
  
  const toggleYtdModal = () => {
    setIsYtdModalVisible(!isYtdModalVisible);
    setActiveButton('YTD');
  };
  
 
  
    return(
    <View style={styles.container4}>
      <Text style={styles.title}>Crypto Asset List</Text>
      <View style={styles.buttonsContainer}>
      {/* <TouchableOpacity 
  style={[styles.button, activeButton === 'MTD' ? styles.buttonActive : {}]} 
  onPress={toggleMtdModal}
>
  <Text style={styles.buttonText}>MTD</Text>
</TouchableOpacity>
<TouchableOpacity 
  style={[styles.button, activeButton === 'YTD' ? styles.buttonActive : {}]} 
  onPress={toggleYtdModal}
>
  <Text style={styles.buttonText}>YTD</Text>
</TouchableOpacity> */}
<TouchableOpacity 
  style={[styles.button, activeButton === 'MTD' ? styles.buttonActive : {}]} 
  onPress={toggleMtdModal}
>
  <Text style={activeButton === 'MTD' ? styles.buttonTextActive : styles.buttonText}>MTD</Text>
</TouchableOpacity>
<TouchableOpacity 
  style={[styles.button, activeButton === 'YTD' ? styles.buttonActive : {}]} 
  onPress={toggleYtdModal}
>
  <Text style={activeButton === 'YTD' ? styles.buttonTextActive : styles.buttonText}>YTD</Text>
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






const styles = StyleSheet.create({
  container4: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#A1A1A1',
    lineHeight: 19.09,
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
  },
  buttonActive: {
    backgroundColor: 'rgba(236, 236, 236, 1)', // Your preferred active color
  },
  buttonTextActive: {
    fontSize: 12,
    color: 'rgba(28, 30, 50, 1)', // Your preferred active text color
    fontWeight: '600',
    lineHeight: 11.93,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 11.93,
    textAlign: 'center',
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
});

export default MyWatchList;
















// const styles = {
//     container4: {
//       padding:15,
//        //borderRadius:20,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         //padding: 13,
//         backgroundColor: '#FFFFFF',
//       },
//       title: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: '#A1A1A1',
//         lineHeight: 19.09,
//       },
//       buttonsContainer: {
//         flexDirection: 'row',
//       },
//       button: {
//         marginLeft: 8,
//         paddingVertical: 4,
//         paddingHorizontal: 8,
//         backgroundColor: '#1C1E32',
//         borderRadius: 10,
//         //backgroundColor:'black',
//       },

//       buttonActive: {
//         backgroundColor:'rgba(236, 236, 236, 1)',  // This color is just an example. You can choose your preferred active color.
        
//       },


//       buttonTextActive: {
//         fontSize: 12,
//         color: 'rgba(28, 30, 50, 1)',  // This color is just an example. Choose your preferred active text color.
//         fontWeight: 600,
//         lineHeight: 11.93,
//         textAlign: 'center',
//       },
      

//       buttonText: {
//         fontSize: 12,
//         color: '#FFFFFF',
//         fontWeight:600,
//         lineHeight:11.93,
//         textAlign:'center',
//       },
      
//       modalCloseButton: {
//         marginTop: 16,
//         padding: 8,
//         backgroundColor: '#ECECEC',
//         borderRadius: 4,
//       },
//       modalCloseButtonText: {
//         fontSize: 14,
//         color: 'black',
//       },
// }

// export default MyWatchList;






