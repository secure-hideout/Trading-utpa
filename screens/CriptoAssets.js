// // import React from 'react';
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity,Modal } from 'react-native';

// const CryptoAssets = () => {
//     const [modalVisible, setModalVisible] = useState(false);
  
//     const handleSeeAll = () => {
//       setModalVisible(true);
//     };
  
//     const closeModal = () => {
//       setModalVisible(false);
//     };

//   return (
//     // <View style={styles.containerAssets}>
      
//     //   <Text style={styles.assetText}>Crypto Assets</Text>
//     //   <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
//     //     <Text style={styles.buttonText}>See All</Text>
//     //   </TouchableOpacity>

//     //   <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
//     //     <View style={styles.modalContainer}>
//     //       <Text style={styles.modalText}>Crypto Asset List</Text>
//     //       <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
//     //         <Text style={styles.modalCloseButtonText}>Close</Text>
//     //       </TouchableOpacity>
//     //     </View>
//     //   </Modal>



      
//     // </View>



//   );
// };


import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CryptoAssets = () => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    navigation.navigate('SeeAllItems');
  };

  return (
    <View style={styles.containerAssets}>
      <Text style={styles.assetText}>Crypto Assets</Text>
      <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
        <Text style={styles.buttonText}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = {
//   containerAssets: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//    backgroundColor: '#f2f2f2',
//   },

containerAssets: {
    //marginTop:20,
    //padding:10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16, // Increase the vertical padding to increase the height
    backgroundColor: '#f2f2f2',
    //height:500,
    borderRadius:30
  },
  button: {
    // backgroundColor: 'black',
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    // borderRadius: 15,

    width:50,
    height:20,
    borderRadius:100,
    backgroundColor:'#1c1e32',
  },
  buttonText: {
    // color: '#fff',
    // fontSize: 16,
    // fontWeight: 'bold',

  fontSize:12,
  fontWeight:600,
  lineHeight:17.93,
  textAlign:'center',
  color:'#FFFFFF',

  },
  assetText: {
    // fontSize: 18,
    // fontWeight: 'bold',
    fontSize:18,
    fontWeight:500,
    lineHeight:19.93,
    color:'#A1A1A1',
  },
};

export default CryptoAssets;