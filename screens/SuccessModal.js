// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const SuccessMessage = ({ message, visible }) => {
//   if (!visible) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>{message}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // position: 'absolute',

//     // left: 20, 
//     backgroundColor: '#EAC9B1',
//     padding: 10,
//     borderRadius: 25,
//     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//     boxType: 'rounded',
//     alignItems: 'center',
//     maxWidth:250,
//     // marginRight:20,
    
   
//   },
//   text: {
//     color: 'black', 
//     fontSize: 16,
//     fontWeight: '500',
  
//   },
// });

// export default SuccessMessage;


// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

// const SuccessModal = ({ message, visible, onClose }) => {
//   useEffect(() => {
//     if (visible) {
//       // Automatically close the modal after 3 seconds
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [visible, onClose]);

//   if (!visible) {
//     return null;
//   }

//   return (
//     <Modal transparent={true} animationType="slide" visible={visible}>
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.text}>{message}</Text>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // modalContent: {
//   //   backgroundColor: 'white',
//   //   borderRadius: 10,
//   //   padding: 20,
//   //   shadowColor: 'black',
//   //   shadowOffset: { width: 0, height: 2 },
//   //   shadowOpacity: 0.3,
//   //   elevation: 5,
//   // },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   // closeButton: {
//   //   backgroundColor: 'blue',
//   //   padding: 10,
//   //   borderRadius: 5,
//   // },
//   closeButton: {
//     fontSize: 16,
//     color: 'blue',
//   },
//   closeText: {
//     color: 'white',
//     fontWeight: '500',
//   },
// });

// export default SuccessModal;

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const SuccessModal = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      // Automatically close the modal after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  modalContent: {
    // backgroundColor: 'white',
    backgroundColor: 'rgba(227, 233, 240, 1)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    // color: 'blue',
    backgroundColor:'#B7DDD2',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  // closeText: {
  //   color: 'blue',
  //   fontWeight: '500',
  // },
});

export default SuccessModal;
