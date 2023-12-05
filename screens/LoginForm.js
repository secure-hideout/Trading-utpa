
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from '@react-native-material/core';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import CheckBox from 'react-native-check-box';
import Toast from "react-native-toast-message"

import ChangePasswordModal from './ChangePasswordModal';

import { useDispatch } from 'react-redux';

import { setToken } from '../redux/actions/authActions';
const LoginForm = ({ navigation, onSuccessfulLogin }) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('user9@gmail.com');
  const [password, setPassword] = useState('pass');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeButton, setActiveButton] = useState('login');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [networkError, setNetError] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // const [userEmail, setUserEmail] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setEmailError('');
    setNetError('');


    try {
      if (!email || !password) {
        setError('Please fill in both email and password.');
        return;
      } else {
        setError('');
      }

      const emailPattern = /\S+@gmail\.com$/;
      if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email address.');
        setLoading(false);
        return;
      } else {
        setEmailError('')
      }

      // Make an API request for authentication
      const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check the HTTP response status before accessing response data
      if (response.ok) {

        // Extract the token from the response
        const responseData = await response.json();
        const token = responseData.token.token;

        // Dispatch the token to the Redux store
        console.log('Dispatching Token:', token);
        dispatch(setToken(token));
        Toast.show({
          type: "success",
          text1: `Login Succesfull`,
        });
        // setIsRegistered(true);
        onSuccessfulLogin();

        // Log the token to the console
        // console.log('Token:', token);
        console.log('Navigating to BottomTabs...');

        navigation.navigate('BottomTabs');
      } else {
        // Handle the case where the response status is not ok
        setNetError('Please Check Your Credentials ');
      }
    } catch (err) {
      console.error(err);
      error('Check Your Network Connection');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    setActiveButton('login');
    // Handle login button press logic
  };

  const handleRegisterPress = () => {
    setActiveButton('register');
    // You should adjust this navigation action based on your navigation structure
    navigation.navigate('Signup');
  };

  const handleForgetPasswordPress = () => {
    // Handle forget password button press logic
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleChangePasswordPress = () => {
    setIsChangePassword(true);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsChangePassword(false);
    setModalVisible(false);
  };


  const handleChangePassword = (newPassword, email) => {
    console.log('New Password:', newPassword);
    console.log('User Email:', email);
    // setUserEmail(userEmail);
  };


  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}



      <View style={styles.head1}>
        <View>
          <TouchableOpacity onPress={() => handleLoginPress()}>
            <Text style={[styles.head1, styles.blueText]}>login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => handleRegisterPress()}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={[styles.buttonText2, isPressed && styles.hoveredText]}>Register</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {networkError && <Text style={styles.error1}>{networkError}</Text>}
      {/* {isRegistered && (
        <Text style={{ color: '#d68760', textAlign: 'center', top: 25 }}>
          Login successfully!
        </Text>
      )} */}
      <View style={styles.head2}>
        <TextInput
          label="Email"
          value={email}
          // onChangeText={setEmail}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          style={{ top: 12, margin: 16, width: 319 }}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ margin: 16, width: 319 }}
        />

        {isChangePassword && (
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={{ margin: 16, width: 319 }}
          />
        )}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleChangePasswordPress}>
            <Text style={styles.changePasswordText}>
              Change Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgetPasswordPress}>
            <Text style={styles.forgetPasswordText}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.button1}>
          <Button
            onPress={handleLogin}
            disabled={loading}
            contentStyle={styles.buttonContent2}
            labelStyle={styles.buttonText}
          >
            Login
          </Button>
        </View>
      </View>

      <ChangePasswordModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onChangePassword={handleChangePassword}
        initialEmail={email}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  token: state.auth.token,
});

const mapDispatchToProps = {
  loginUser,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 150,
    paddingLeft: 9,
    alignItems: 'center',
    // backgroundColor: 'powderblue'
  },
  head: {
    fontWeight: 'bold',
    marginBottom: 30,
    fontSize: 20
  },
  head1: {

    flexDirection: 'row',
    justifyContent: 'space-between',

    marginRight: 16
  },

  error1: {
    color: '#d68760'
  },

  input: {
    padding: 10,
    width: '90%',
    marginBottom: 10,
  },
  blueText: {
    fontSize: 20,

    fontWeight: 'bold',
    color: 'black',
  },
  buttonText2: {
    paddingTop: 1.80,
    color: 'gray', // Default text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  hoveredText: {
    color: 'black',
  },
  buttons: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',

  },
  button1: {

    width: '60%',

  },
  button2:
  {
    left: 10,
  },
  buttonContent2: {
    backgroundColor: '#8f8bcc',
    paddingVertical: 4,
    paddingHorizontal: 40,
    paddingLeft: 26,
    borderRadius: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContent1: {
    backgroundColor: '#7bb2b5',
    paddingVertical: 4,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    left: 8
  },
  signupContent: {
    //  paddingTop: 17,
  },


  signupText: {
    fontWeight: 'bold',

    color: '#28A745',
  },
  error: {
    width: '80%',
    color: '#d68760',
    // marginBottom: 10,
    left: 17,
  },

  checkboxContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItms: 'center',
    margin: 16,
  },
  checkboxLabel: {
    paddingRight: 50
  },
  forgetPasswordText: {
    color: 'blue',
    fontSize: 16,
  },


  changePasswordText: {
    color: 'blue',
    fontSize: 16,

  },


});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);











//old wo changepassword
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { connect } from 'react-redux';
// import { loginUser } from '../redux/actions/authActions';
// import CheckBox from 'react-native-check-box';

// import { useDispatch } from 'react-redux';

// import { setToken } from '../redux/actions/authActions';
// const LoginForm = ({ navigation, onSuccessfulLogin }) => {

//   const dispatch = useDispatch(); const [email, setEmail] = useState('user9@gmail.com');
//   const [password, setPassword] = useState('pass');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [activeButton, setActiveButton] = useState('login');
//   const [rememberPassword, setRememberPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [networkError, setNetError] = useState('');
//   const [isPressed, setIsPressed] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(null);
//     setEmailError('');
//     setNetError('');


//     try {
//       if (!email || !password) {
//         setError('Please fill in both email and password.');
//         return;
//       } else {
//         setError('');
//       }

//       const emailPattern = /\S+@gmail\.com$/;
//       if (!emailPattern.test(email)) {
//         setEmailError('Please enter a valid email address.');
//         setLoading(false);
//         return;
//       } else {
//         setEmailError('')
//       }

//       // Make an API request for authentication
//       const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       // Check the HTTP response status before accessing response data
//       if (response.ok) {

//         // Extract the token from the response
//         const responseData = await response.json();
//         const token = responseData.token.token;

//         // Dispatch the token to the Redux store
//         console.log('Dispatching Token:', token);
//         dispatch(setToken(token));

//         setIsRegistered(true);
//         onSuccessfulLogin();

//         // Log the token to the console
//         // console.log('Token:', token);
//         console.log('Navigating to BottomTabs...');

//         navigation.navigate('BottomTabs');
//       } else {
//         // Handle the case where the response status is not ok
//         setNetError('Please Check Your Credentials ');
//       }
//     } catch (err) {
//       console.error(err);
//       error('Check Your Network Connection');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginPress = () => {
//     setActiveButton('login');
//     // Handle login button press logic
//   };

//   const handleRegisterPress = () => {
//     setActiveButton('register');
//     // You should adjust this navigation action based on your navigation structure
//     navigation.navigate('Signup');
//   };

//   const handleForgetPasswordPress = () => {
//     // Handle forget password button press logic
//   };

//   const handlePressIn = () => {
//     setIsPressed(true);
//   };

//   const handlePressOut = () => {
//     setIsPressed(false);
//   };



//   return (
//     <View style={styles.container}>
//       {/* {isRegistered && (
//         <Text style={{ color: '#d68760', textAlign: 'center' }}>
//           Login successfully!
//         </Text>
//       )} */}
//       {error && <Text style={styles.error}>{error}</Text>}



//       <View style={styles.head1}>
//         <View>
//           <TouchableOpacity onPress={() => handleLoginPress()}>
//             <Text style={[styles.head1, styles.blueText]}>login</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <TouchableWithoutFeedback onPress={() => handleRegisterPress()}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//           >
//             <Text style={[styles.buttonText2, isPressed && styles.hoveredText]}>Register</Text>
//           </TouchableWithoutFeedback>
//         </View>
//       </View>
//       {networkError && <Text style={styles.error1}>{networkError}</Text>}
//       {isRegistered && (
//         <Text style={{ color: '#d68760', textAlign: 'center', top: 25 }}>
//           Login successfully!
//         </Text>
//       )}
//       <View style={styles.head2}>
//         <TextInput
//           label="Email"
//           value={email}
//           // onChangeText={setEmail}
//           onChangeText={(text) => {
//             setEmail(text);
//             setEmailError('');
//           }}
//           style={{ top: 12, margin: 16, width: 319 }}
//         />
//         {emailError && <Text style={styles.error}>{emailError}</Text>}

//         <TextInput
//           label="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={{ margin: 16, width: 319 }}
//         />

//         <View style={styles.checkboxContainer}>
//           {/* <CheckBox
//           value={rememberPassword}
//           onValueChange={() => setRememberPassword()}
//         />
//         <Text style={styles.checkboxLabel}>Remember Password</Text> */}


//           <TouchableOpacity onPress={handleForgetPasswordPress}>
//             <Text style={styles.forgetPasswordText}>Forget Password?</Text>
//           </TouchableOpacity>
//         </View>







//       </View>
//       <View style={styles.buttons}>
//         <View style={styles.button1}>
//           <Button
//             onPress={handleLogin}
//             disabled={loading}
//             contentStyle={styles.buttonContent2}
//             labelStyle={styles.buttonText}
//           >
//             Login
//           </Button>
//         </View>

//         {/* <View style={styles.button2}>
//           <Button
//             onPress={handleSignup}
//             disabled={loading}
//             contentStyle={styles.buttonContent1}
//             labelStyle={styles.buttonText1}
//           >
//             Register
//           </Button>
//         </View> */}
//       </View>
//     </View>
//   );
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.auth.error,
//   token: state.auth.token,
// });

// const mapDispatchToProps = {
//   loginUser,
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//     paddingTop: 150,
//     //paddingTop: 80,
//     paddingLeft: 9,
//     // alignItems: 'center',
//     //  justifyContent: 'center',
//     alignItems: 'center',
//     // textAlign: 'center'
//   },
//   head: {
//     fontWeight: 'bold',
//     marginBottom: 30,
//     fontSize: 20
//   },
//   head1: {
//     // fontWeight: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     //flex: 1
//     marginRight: 16
//   },
//   head2: {
//     // paddingTop:,
//   },
//   error1: {
//     color: '#d68760'
//   },

//   input: {
//     padding: 10,
//     width: '90%',
//     marginBottom: 10,
//   },
//   blueText: {
//     fontSize: 20,

//     fontWeight: 'bold',
//     color: 'black', // Color when text is active
//   },
//   buttonText2: {
//     color: 'gray', // Default text color
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   hoveredText: {
//     color: 'black', // Change this to the color you want on hover
//   },
//   buttons: {
//     paddingTop: 20,
//     display: 'flex',
//     flexDirection: 'row',
//     // marginLeft: -11
//   },
//   button1: {
//     // Left: -30,
//     width: '60%',
//     // borderRadius: 1,
//   },
//   button2:
//   {
//     left: 10,
//   },
//   buttonContent2: {
//     backgroundColor: '#8f8bcc', // Customize the button background color
//     paddingVertical: 4,
//     paddingHorizontal: 40,
//     paddingLeft: 26,
//     borderRadius: 0,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   buttonContent1: {
//     backgroundColor: '#7bb2b5', // Customize the button background color
//     paddingVertical: 4,
//     paddingHorizontal: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     left: 8
//   },
//   // buttonText1: {
//   //   color: 'white',
//   //   fontSize: 16,
//   //   Left: 15,
//   // },
//   signupContent: {
//     //  paddingTop: 17,
//   },
//   signupText: {
//     fontWeight: 'bold',
//     // paddingTop: 15,
//     color: '#28A745', // Customize the text color
//   },
//   error: {
//     width: '80%',
//     color: '#d68760',
//     // marginBottom: 10,
//     left: 17,
//   },

//   checkboxContainer: {
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 16,
//   },
//   checkboxLabel: {
//     paddingRight: 50
//   },
//   forgetPasswordText: {
//     color: 'blue',
//   },


// });

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
