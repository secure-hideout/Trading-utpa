import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuccessModal = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.textContainer}>
              <Text style={styles.modalTitle}>Success</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="ios-close" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/animations/mail.json')} // Replace with the actual path to your Lottie animation
              autoPlay
              loop={true}
            />
          </View>
          <Text style={[styles.modalText, styles.centerText]}>
            Please check your email for the new password.
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
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
    width: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(28, 30, 50, 1)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 5,
  },
  animationContainer: {
    width: '100%',
    height: 150, // Adjust the height based on your animation
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(28, 30, 50, 1)',
    marginBottom: 10,
  },
  centerText: {
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#B7DDD2',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(28, 30, 50, 1)',
  },
});

export default SuccessModal;



















// import React, { useState, useEffect } from 'react';
// import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Toast from 'react-native-toast-message';
// import { useNavigation } from '@react-navigation/native'; 


// // Validation logic moved outside the component
// const validatePassword = (password) => {
//   const minLength = 8;
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   const hasSymbol = /[!@#$%^&*]/.test(password);

//   return password.length >= minLength && hasUpperCase && hasNumber && hasSymbol;
// };

// const ResetPasswordModal = ({ isVisible, onClose, onChangePassword, initialEmail }) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordsMatchError, setPasswordsMatchError] = useState('');
//   const [passwordsValid, setPasswordsValid] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (!isVisible) {
//       setNewPassword('');
//       setConfirmPassword('');
//       setPasswordsMatchError('');
//     }
//   }, [isVisible]);

//   useEffect(() => {
//     setPasswordsValid(validatePassword(newPassword) && validatePassword(confirmPassword));
//     setPasswordsMatchError('');
//   }, [newPassword, confirmPassword]);

 

//   return (
//     <Modal
//       transparent={true}
//       animationType="slide"
//       visible={isVisible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalBackground}>
//         <View style={styles.modalContainer}>
//           <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
//             <Ionicons name="ios-close" size={28} color="black" />
//           </TouchableOpacity>

//           <Text style={styles.modalText}>Reset Your Password</Text>

//           {/* New Password */}
//           <View style={styles.passwordContainer}>
//             <TextInput
//               placeholder="New Password"
//               value={newPassword}
//               onChangeText={(text) => setNewPassword(text)}
//               secureTextEntry={!showNewPassword}
//               style={styles.inputWithIcon}
//             />
//             <TouchableOpacity
//               onPress={() => setShowNewPassword(!showNewPassword)}
//               style={styles.showPasswordIcon}
//             >
//               <Ionicons
//                 name={showNewPassword ? 'ios-eye' : 'ios-eye-off'}
//                 size={24}
//                 color="#555"
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Confirm Password */}
//           <View style={styles.passwordContainer}>
//             <TextInput
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChangeText={(text) => setConfirmPassword(text)}
//               secureTextEntry={!showConfirmPassword}
//               style={styles.inputWithIcon}
//             />
//             <TouchableOpacity
//               onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               style={styles.showPasswordIcon}
//             >
//               <Ionicons
//                 name={showConfirmPassword ? 'ios-eye' : 'ios-eye-off'}
//                 size={24}
//                 color="#555"
//               />
//             </TouchableOpacity>
//           </View>

//           {passwordsMatchError !== '' && (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>{passwordsMatchError}</Text>
//             </View>
//           )}

//           <View style={styles.buttonContainer}>
//             {passwordsValid ? (
//               <TouchableOpacity onPress={handleResetPassword} style={styles.confirmButton}>
//                 <Text style={styles.buttonText}>Reset Password</Text>
//               </TouchableOpacity>
//             ) : (
//               <View style={[styles.confirmButton, styles.disabledButton]}>
//                 <Text style={styles.buttonText}>Reset Password</Text>
//               </View>
//             )}
//             <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: 350,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: 20,
//     right: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'rgba(28, 30, 50, 1)',
//     marginBottom: 20,
//   },
//   inputWithIcon: {
//     width: '100%',
//     marginVertical: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#C1C2EB',
//     borderRadius: 5,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   passwordContainer: {
//     position: 'relative',
//     width: '100%',
//   },
//   showPasswordIcon: {
//     position: 'absolute',
//     top: '50%',
//     right: 10,
//     transform: [{ translateY: -12 }],
//   },
//   errorContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   confirmButton: {
//     backgroundColor: '#C1C2EB',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
// },
// cancelButton: {
//     backgroundColor: '#B7DDD2',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
// },
// buttonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: 'rgba(28, 30, 50, 1)',
// },
// disabledButton: {
//     backgroundColor: '#A9A9A9',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//     opacity: 0.7,
// },
// });

// export default ResetPasswordModal;
