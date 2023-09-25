
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-paper'; // Import other components from react-native-paper
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { TextInput } from '@react-native-material/core'; // Import TextInput from @react-native-material/core

// const LoginForm = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('abega@gmail.com');
//   const [password, setPassword] = useState('abega');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isRegistered, setIsRegistered] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(null);

    

//  try {
//       if (!email || !password) {
//         setError('Please fill in both email and password.');
//         return;
//       }

//       const emailPattern = /\S+@gmail\.com$/;
//       if (!emailPattern.test(email)) {
//         setError('Please enter a valid email address.');
//         setLoading(false);
//         return;
//       }
//        // Make an API request for authentication
//       const response = await fetch("http://10.0.2.2:9000/api/auth/login", {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//       });
//       if (response.ok) {
//           // Successful login, navigate to another screen
//           setIsRegistered(true);
//           navigation.navigate('Dashboard02');
//       } else {
//         setError('Please Check Your password or Emailid');
       
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Check Your Network Connection');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = () => {
//     navigation.navigate('Signup');
//   };

//   return (
//     <View style={styles.container}>
//       {isRegistered && (
//           <Text style={{ color: '#d68760', textAlign: 'center' }}>
//            Login successfully!
//           </Text>
//       )}
//       {error && <Text style={styles.error}>{error}</Text>}
//       <TextInput
//        // variant="outlined"
//         label="Email"
//        // value={email}
//         onChangeText={setEmail}
//         value={email}
//         style={{ margin: 16, width: 319}}
//       />
//       <TextInput 
//        // varient="standard"
//         label="Password"
//        // value={password}
//         onChangeText={setPassword}
//         value={password}
//         secureTextEntry
//         style={{ margin: 16, width: 319}}
//       />

//       <View style={styles.buttons}>
//         <View style={styles.button1}>
//           <Button
//          //mode="contained"
//           onPress={handleLogin}
//           disabled={loading}
//           contentStyle={styles.buttonContent}
//           labelStyle={styles.buttonText}
//           >
//            Login
//         </Button>
//       </View>
//       <View style={styles.button2}>
//         <Button
//         //mode="contained"
//         onPress={handleSignup}
//         disabled={loading}
//         contentStyle={styles.buttonContent1}
//         labelStyle={styles.buttonText1}
//         >
//         Register
//         </Button>
//       </View>
//     </View>
//       {/* <TouchableOpacity onPress={handleSignup}>
//         <Text style={styles.signupText}>Signup</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 80,
//     paddingLeft: 9,
//     alignItems: 'center',
//   },
//   input: {
//     padding: 6,
//     width: '80%',
//     marginBottom: 10,
//   },
//   buttons:{
//     display:'flex',
//     flexDirection:'row',
//     marginLeft: -11
//   },
//   button1:{
//     Left: -30,
//   },
//   button2:
//   {
//     left: 10,
//   },
//   buttonContent: {
//     backgroundColor: '#8f8bcc', // Customize the button background color
//     paddingVertical: 4,
//     paddingHorizontal: 50,
//     paddingLeft:26,
//     //borderRadius: Border.br_81xl,
//   },
//   buttonContent1: {
//     backgroundColor: '#7bb2b5', // Customize the button background color
//     paddingVertical: 4,
//     paddingHorizontal: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     left:8
//   },
//   buttonText1:{
//     color: 'white',
//     fontSize: 16,
//     Left: 15,
//   },
//   signupContent: {
//     paddingTop: 17,
//   },
//   signupText: {
//     fontWeight: 'bold',
//     paddingTop: 15,
//     color: '#28A745', // Customize the text color
//   },
//   error: {
//     width: '80%',
//     color: '#d68760',
//     marginBottom: 10,
//     left: 8,
//   },
// });

// export default LoginForm;













import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginForm = ({ navigation, onSuccessfulLogin }) => {
  // Provide default email and password values
  const [email, setEmail] = useState('default@example.com');
  const [password, setPassword] = useState('defaultPassword');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);



// try {
//   // Simulate a successful login
//   if (email === 'default@example.com' && password === 'defaultPassword') {
//     // Successful login
//     navigation.navigate('Home'); // Navigate to the 'Dashboard02' page
//     onSuccessfulLogin();  // This sets isLoggedIn to true in App.js
//   } else {
//     setError('Login failed. Please check your credentials.');
//   }
// } catch (err) {
//   setError('An error occurred. Please try again later.');
// } finally {
//   setLoading(false);
// }


try {
  if (email === 'default@example.com' && password === 'defaultPassword') {
    onSuccessfulLogin();  // This sets isLoggedIn to true in App.js
    navigation.navigate('BottomTabs'); // Navigate to the main app
  } else {
    setError('Login failed. Please check your credentials.');
  }
} catch (err) {
  setError('An error occurred. Please try again later.');
} finally {
  setLoading(false);
}

};

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },


 
});

export default LoginForm;















//workinggg

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const LoginForm = ({ navigation, onSuccessfulLogin }) => {
//   // Provide default email and password values
//   const [email, setEmail] = useState('default@example.com');
//   const [password, setPassword] = useState('defaultPassword');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(null);



// try {
//   // Simulate a successful login
//   if (email === 'default@example.com' && password === 'defaultPassword') {
//     // Successful login
//     navigation.navigate('Home'); // Navigate to the 'Dashboard02' page
//     onSuccessfulLogin();  // This sets isLoggedIn to true in App.js
//   } else {
//     setError('Login failed. Please check your credentials.');
//   }
// } catch (err) {
//   setError('An error occurred. Please try again later.');
// } finally {
//   setLoading(false);
// }
// };

//   return (
//     <View style={styles.container}>
//       {error && <Text style={styles.error}>{error}</Text>}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={setEmail}
//         value={email}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={setPassword}
//         value={password}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} disabled={loading} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: '80%',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },


 
// });

// export default LoginForm;

//end