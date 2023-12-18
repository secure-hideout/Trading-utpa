// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const DepositForm = () => {
//   const [amount, setAmount] = useState('');

//   const handleDeposit = () => {
//     // Implement your deposit logic here
//     console.log(`Deposit amount: ${amount}`);
//     // Reset the amount after deposit
//     setAmount('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter Deposit Amount</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Amount"
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={(text) => setAmount(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleDeposit}>
//         <Text style={styles.buttonText}>Deposit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default DepositForm;