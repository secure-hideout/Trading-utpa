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
            <Ionicons name="arrow-up-outline" size={30} color="black" />
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




// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button } from 'react-native';

// import { Ionicons } from '@expo/vector-icons';


// const Deposit = () => {
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [modalText, setModalText] = useState('');

//     const handleDepositClick = () => {
//         console.log('Deposit clicked');
//         setModalText('Deposit clicked');
//         setModalVisible(true);
//       };
    
//       const handleWithdrawClick = () => {
//         console.log('Withdraw clicked');
//         setModalText('Withdraw clicked');
//         setModalVisible(true);
//       };
    
//       const closeModal = () => {
//         setModalVisible(false);
//       };
    
//     return (
// <View>
// <View style={styles.container3}>
// <TouchableOpacity onPress={handleDepositClick} style={styles.ellipse}>
// <View style={styles.circle}>
// <Ionicons name="arrow-up-outline" size={30} color="black" />
// </View>
// <Text style={[styles.text, styles.withdrawText2]}>Deposit</Text>
// </TouchableOpacity>
// <View style={styles.spacing} />
// <TouchableOpacity onPress={handleWithdrawClick} style={styles.ellipse}>
// <View style={styles.circle}>
// <Ionicons name="arrow-down-outline" size={30} color="black" />
// </View>
// <Text style={[styles.text, styles.withdrawText]}>Withdraw</Text>
// </TouchableOpacity>
// <Modal visible={isModalVisible} animationType="slide">
// <View style={styles.modalContainer}>
// <Text>{modalText}</Text>
// <Button title="Close" onPress={closeModal} />
// </View>
// </Modal>
// </View>
// </View>
//     );
// };

// const styles = {
//     container3: {
//         paddingVertical:10,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft:0,
//       },
//       ellipse: {
//         width: 166,
//         height: 48,
//         //left:16,
//         borderRadius: 100,
//         backgroundColor: '#ECECEC',
//         justifyContent: 'center',
//         alignItems: 'center',
//         //paddingLeft: 16,
    
//         // width:166,
//         // height:48,
       
//         // left:16,
//         // borderRadius:100,
//         // backgroundColor: '#ECECEC',
    
    
//       },
//       circle: {
//         width: 40,
//         height: 40,
//         borderRadius: 100,
//         backgroundColor: '#B1A4FF',
//         position: 'absolute',
//         left: 0,
//         marginLeft:5,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       spacing: {
//         width: 50,
//       },
//       text: {
//         marginLeft: 16,
//         fontSize: 20,
//         color: 'black',
//         textAlign:'center',
//         color:'#1C1E32',
        
        
//       },
//       withdrawText: {
//         marginRight: -10, // Adjust this value as needed
//         lineHeight:19.09,
//         fontWeight:54,
//       },
//       withdrawText2: {
//         marginRight: -10,
//         lineHeight:19.09,
//         fontWeight:54,
        
       
//       },
      
//       container5: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding:0,
//       },
//       gridContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height:100,
        
//         margin: 5,
//         borderRadius: 10,
//         backgroundColor: 'lightgray',
//       },
//       firstLine: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
        
//       },
//       secondLine: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop:20,
        
//       },
//       logo2: {
//         width: 20,
//         height: 20,
//         marginBottom:8,
//       },
//       textContainer: {
//         marginLeft: 5,
//       },
//       gridText: {
//         fontSize: 16,
//         fontWeight: 'bold',
       
//       },
//       gridSubText: {
//         fontSize: 12,
//         color: 'gray',
//         fontWeight: 'bold',
//         marginLeft: 3,
//       },
//       value2: {
//         fontSize: 10,
//         fontWeight: 'bold',
        
//       },
//       button2: {
//         backgroundColor: 'blue',
//         borderRadius:5 ,
//         padding: 1,
//         marginLeft: 5,
//       },
//       buttonValue: {
//         color: 'white',
//         fontSize: 10,
//         fontWeight: 'bold',
//       },
// }

// export default Deposit;