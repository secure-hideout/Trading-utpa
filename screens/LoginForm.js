import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from '@react-native-material/core';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/authActions';
import ChangePasswordModal from './ChangePasswordModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import NetworkErrorModal from './NetworkErrorModal';



const LoginForm = ({ navigation, onSuccessfulLogin }) => {
  const animationRef = useRef(null);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('user9@gmail.com');
  const [password, setPassword] = useState('pass');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('login');
  const [networkError, setNetError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [networkErrorModalVisible, setNetworkErrorModalVisible] = useState(false);


  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const performLogin = async () => {
    const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      const token = responseData.token.token;
      console.log('Dispatching Token:', token);
      dispatch(setToken(token));

      onSuccessfulLogin();
      console.log('Navigating to BottomTabs...');
      navigation.navigate('BottomTabs');
    } else {
      const errorData = await response.json();
      if (errorData.status === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
        setError('Incorrect password. Please try again.');
      } else {
        setNetError('Please Check Your Credentials');
      }
    }
  };

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
        setEmailError('Email is not valid or not register yet.');
        setLoading(false);
        return;
      } else {
        setEmailError('');
      }

      await performLogin();

    } catch (err) {
      // console.error(err);
      if (err instanceof TypeError && err.message === 'Already read') {
        setError('Your password is incorrect');
      } else {
        // setError('Check Your Network Connection');
        setNetworkErrorModalVisible(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    setActiveButton('login');
  };

  const handleRegisterPress = () => {
    setActiveButton('register');
    navigation.navigate('Signup');
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
  };

  const handleForgetPasswordPress = () => {
    setForgotPasswordModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.overlay}>
        <LottieView
          ref={animationRef}
          source={require('../assets/animations/Animationf.json')}
          style={styles.animationBackground}
        />
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={handleLoginPress} style={[styles.tab]}>
            <Text style={[styles.tabText, { color: '#B7DDD2' }]}>Login</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={handleRegisterPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={[styles.tabText, { color: 'black' }]}>Register</Text>
          </TouchableWithoutFeedback>
        </View>

        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          style={styles.input}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {error && !emailError && (
          <Text style={[styles.error, styles.passwordError]}>{error}</Text>
        )}

        {isChangePassword && (
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
        )}

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleChangePasswordPress}>
            <Text style={styles.linkText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgetPasswordPress}>
            <Text style={styles.linkText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleLogin}
            disabled={loading}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonText}
          >
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </View>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}


        <ChangePasswordModal
          isVisible={modalVisible}
          onClose={handleCloseModal}
          onChangePassword={handleChangePassword}
          initialEmail={email}
        />

        <ForgotPasswordModal
          isVisible={forgotPasswordModalVisible}
          onClose={() => setForgotPasswordModalVisible(false)}
          onSendOTP={(email) => {
            console.log('Sending OTP to:', email);
            setForgotPasswordModalVisible(false);
          }}
        />

        <NetworkErrorModal
          isVisible={networkErrorModalVisible}
          onClose={() => setNetworkErrorModalVisible(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",

  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  animationBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '60%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 30,
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    fontSize: 20,

    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 25,
  },
  error: {
    color: 'red',
    fontWeight: '600',
    fontSize: 14,
  },
  passwordError: {
    marginBottom: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonContent: {
    height: 50,
    backgroundColor: '#B7DDD2',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});

export default LoginForm;



























// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../redux/actions/authActions';
// import ChangePasswordModal from './ChangePasswordModal';
// import ForgotPasswordModal from './ForgotPasswordModal';
// import LottieView from 'lottie-react-native';
// // import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';



// const LoginForm = ({ navigation, onSuccessfulLogin }) => {
//   const animationRef = useRef(null);
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('user9@gmail.com');
//   const [password, setPassword] = useState('pass');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [emailError, setEmailError] = useState('');
//   const [isChangePassword, setIsChangePassword] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
//   const [activeButton, setActiveButton] = useState('login');
//   const [networkError, setNetError] = useState('');
//   const [isPressed, setIsPressed] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);



//   useEffect(() => {
//     if (animationRef.current) {
//       animationRef.current.play();
//     }
//   }, []);

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
//         setEmailError('Email is not valid or not register yet.');
//         setLoading(false);
//         return;
//       } else {
//         setEmailError('');
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

//         onSuccessfulLogin();
//         console.log('Navigating to BottomTabs...');
//         navigation.navigate('BottomTabs');
//       } else {
//         // setNetError('Please Check Your Credentials ');
//         const errorData = await response.json();
//         if (errorData.status === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
//           setError('Incorrect password. Please try again.');
//         } else {
//           setNetError('Please Check Your Credentials');
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Check Your Network Connection');
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

//   const handlePressIn = () => {
//     setIsPressed(true);
//   };

//   const handlePressOut = () => {
//     setIsPressed(false);
//   };

//   const handleChangePasswordPress = () => {
//     setIsChangePassword(true);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsChangePassword(false);
//     setModalVisible(false);
//   };

//   const handleChangePassword = (newPassword, email) => {
//     console.log('New Password:', newPassword);
//     console.log('User Email:', email);
//   };

//   const handleForgetPasswordPress = () => {
//     setForgotPasswordModalVisible(true);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.overlay}>
//         <LottieView
//           ref={animationRef}
//           source={require('../assets/animations/Animationf.json')} // Replace with the path to your Lottie animation JSON file
//           style={styles.animationBackground}
//         />





//         <View style={styles.tabsContainer}>
//           <TouchableOpacity onPress={handleLoginPress} style={styles.tab}>
//             <Text style={[styles.tabText, activeButton === 'login' && styles.activeTabText]}>Login</Text>
//           </TouchableOpacity>
//           <TouchableWithoutFeedback
//             onPress={handleRegisterPress}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//           >
//             <Text style={[styles.tabText, activeButton === 'register' && styles.activeTabText]}>Register</Text>
//           </TouchableWithoutFeedback>
//         </View>

//         <TextInput
//           label="Email"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             setEmailError('');
//           }}
//           style={styles.input}
//         />
//         {emailError && <Text style={styles.error}>{emailError}</Text>}

//         {/* <TextInput
//           label="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         /> */}
//         <View style={styles.passwordContainer}>
//           <TextInput
//             label="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//             style={styles.input}
//           />
//           {/* {error && <Text style={styles.error}>{error}</Text>} */}
//           <TouchableOpacity
//             onPress={() => setShowPassword(!showPassword)}
//             style={styles.eyeIcon}
//           >
//             <Ionicons
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={24}
//               color="#555"
//             />
//           </TouchableOpacity>
//         </View>
//         {error && !emailError && (
//           <Text style={[styles.error, styles.passwordError]}>{error}</Text>
//         )}


//         {isChangePassword && (
//           <TextInput
//             label="New Password"
//             value={newPassword}
//             onChangeText={setNewPassword}
//             secureTextEntry
//             style={styles.input}
//           />
//         )}

//         <View style={styles.actionsContainer}>
//           <TouchableOpacity onPress={handleChangePasswordPress}>
//             <Text style={styles.linkText}>Change Password</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleForgetPasswordPress}>
//             <Text style={styles.linkText}>Forget Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             onPress={handleLogin}
//             disabled={loading}
//             contentStyle={styles.buttonContent}
//             labelStyle={styles.buttonText}
//           >
//             {loading ? 'Logging In...' : 'Login'}
//           </Button>
//         </View>



//         <ChangePasswordModal
//           isVisible={modalVisible}
//           onClose={handleCloseModal}
//           onChangePassword={handleChangePassword}
//           initialEmail={email}
//         />

//         <ForgotPasswordModal
//           isVisible={forgotPasswordModalVisible}
//           onClose={() => setForgotPasswordModalVisible(false)}
//           onSendOTP={(email) => {
//             // Implement the logic for sending OTP here
//             console.log('Sending OTP to:', email);
//             // Close the modal after sending OTP
//             setForgotPasswordModalVisible(false);
//           }}
//         />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: "#C1C2EB",

//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,

//   },
//   animationBackground: {
//     ...StyleSheet.absoluteFillObject,
//     width: '100%',
//     height: '60%',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//     // marginTop: 40,
//     paddingVertical: 30,
//   },
//   tab: {
//     marginRight: 20,

//   },
//   tabText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontWeight: '800',
//   },
//   activeTabText: {
//     color: 'black',
//     fontWeight: '800',
//     fontSize: 18,
//   },
//   input: {
//     marginVertical: 10,
//     width: '100%',
//   },
//   passwordContainer: {
//     position: 'relative',
//     width: '100%',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 15,
//     top: 25, // Adjust the position as needed
//   },
//   error: {
//     color: 'red',
//     // margBottom: 10,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   linkText: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '600',
//   },
//   buttonContainer: {
//     width: '100%',

//   },


//   loginButton: {
//     marginTop: 20,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   buttonContent: {
//     height: 50,
//     backgroundColor: '#B7DDD2',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '600',
//   },

// });

// export default LoginForm;


















// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../redux/actions/authActions';
// import ChangePasswordModal from './ChangePasswordModal';
// import ForgotPasswordModal from './ForgotPasswordModal';
// import LottieView from 'lottie-react-native';


// const LoginForm = ({ navigation, onSuccessfulLogin }) => {
//   const animationRef = useRef(null);
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('user9@gmail.com');
//   const [password, setPassword] = useState('pass');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [emailError, setEmailError] = useState('');
//   const [isChangePassword, setIsChangePassword] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
//   const [activeButton, setActiveButton] = useState('login');
//   const [networkError, setNetError] = useState('');
//   const [isPressed, setIsPressed] = useState(false);


//   useEffect(() => {
//     // Start animation when component mounts
//     if (animationRef.current) {
//       animationRef.current.play();
//     }
//   }, []);


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
//         // Toast.show({
//         //   type: "success",
//         //   text1: `Login Succesfull`,
//         // });

//         onSuccessfulLogin();
//         console.log('Navigating to BottomTabs...');

//         navigation.navigate('BottomTabs');
//       } else {
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



//   const handlePressIn = () => {
//     setIsPressed(true);
//   };

//   const handlePressOut = () => {
//     setIsPressed(false);
//   };

//   const handleChangePasswordPress = () => {
//     setIsChangePassword(true);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsChangePassword(false);
//     setModalVisible(false);
//   };


//   const handleChangePassword = (newPassword, email) => {
//     console.log('New Password:', newPassword);
//     console.log('User Email:', email);
//   };

//   const handleForgetPasswordPress = () => {
//     setForgotPasswordModalVisible(true);
//   };

//   return (

//     <View style={styles.container}>

//       <LottieView
//         ref={animationRef}
//         source={require('../assets/animations/Animationf.json')} // Replace with the path to your Lottie animation JSON file
//         style={styles.animationBackground}
//       />


//       {error && <Text style={styles.error}>{error}</Text>}


//       <View style={styles.overlay}>
//         {emailError && <Text style={styles.error}>{emailError}</Text>}
//         <View style={styles.tabsContainer}>
//           <TouchableOpacity onPress={handleLoginPress} style={styles.tab}>
//             <Text style={[styles.tabText, activeButton === 'login' && styles.activeTabText]}>Login</Text>
//           </TouchableOpacity>
//           <TouchableWithoutFeedback
//             onPress={handleRegisterPress}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//           >
//             <Text style={[styles.tabText, activeButton === 'register' && styles.activeTabText]}>Register</Text>
//           </TouchableWithoutFeedback>
//         </View>
//         <TextInput
//           label="Email"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             setEmailError('');
//           }}
//           style={styles.input}
//         />

//         <TextInput
//           label="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />

//         {isChangePassword && (
//           <TextInput
//             label="New Password"
//             value={newPassword}
//             onChangeText={setNewPassword}
//             secureTextEntry
//             style={styles.input}
//           />
//         )}

//         <View style={styles.actionsContainer}>
//           <TouchableOpacity onPress={handleChangePasswordPress}>
//             <Text style={styles.linkText}>Change Password</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleForgetPasswordPress}>
//             <Text style={styles.linkText}>Forget Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             onPress={handleLogin}
//             disabled={loading}
//             contentStyle={styles.buttonContent}
//             labelStyle={styles.buttonText}
//           >
//             Login
//           </Button>
//         </View>



//         <ChangePasswordModal
//           isVisible={modalVisible}
//           onClose={handleCloseModal}
//           onChangePassword={handleChangePassword}
//           initialEmail={email}
//         />

//         <ForgotPasswordModal
//           isVisible={forgotPasswordModalVisible}
//           onClose={() => setForgotPasswordModalVisible(false)}
//           onSendOTP={(email) => {
//             // Implement the logic for sending OTP here
//             console.log('Sending OTP to:', email);
//             // Close the modal after sending OTP
//             setForgotPasswordModalVisible(false);
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,

//     backgroundColor: "#C1C2EB"

//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   // animationBackground: {
//   //   position: 'absolute',
//   //   width: '200%',
//   //   height: '200%',
//   // },
//   animationBackground: {
//     ...StyleSheet.absoluteFillObject,
//     width: '100%',
//     height: '60%',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//     marginTop: 40,
//   },
//   tab: {
//     marginRight: 20,
//   },
//   tabText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontWeight: 800,
//   },
//   activeTabText: {
//     // fontWeight: 'bold',
//     color: 'black',
//     fontWeight: 800,
//     fontSize: 18,
//   },
//   input: {
//     marginVertical: 10,
//     width: '100%',

//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//     width: '100%',

//     marginBottom: 20,
//   },
//   linkText: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '800',
//   },
//   buttonContainer: {
//     width: '100%',
//   },
//   buttonContent: {
//     height: 50,
//     backgroundColor: '#B7DDD2',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '800',
//   },
// });

// export default LoginForm;





















// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { connect } from 'react-redux';
// import { loginUser } from '../redux/actions/authActions';
// import Toast from "react-native-toast-message"
// import ChangePasswordModal from './ChangePasswordModal';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../redux/actions/authActions';
// import ForgotPasswordModal from './ForgotPasswordModal';



// const LoginForm = ({ navigation, onSuccessfulLogin }) => {

//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('user9@gmail.com');
//   const [password, setPassword] = useState('pass');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [activeButton, setActiveButton] = useState('login');
//   const [rememberPassword, setRememberPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [networkError, setNetError] = useState('');
//   const [isPressed, setIsPressed] = useState(false);
//   const [isChangePassword, setIsChangePassword] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

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
//         // Toast.show({
//         //   type: "success",
//         //   text1: `Login Succesfull`,
//         // });

//         onSuccessfulLogin();
//         console.log('Navigating to BottomTabs...');

//         navigation.navigate('BottomTabs');
//       } else {
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



//   const handlePressIn = () => {
//     setIsPressed(true);
//   };

//   const handlePressOut = () => {
//     setIsPressed(false);
//   };

//   const handleChangePasswordPress = () => {
//     setIsChangePassword(true);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsChangePassword(false);
//     setModalVisible(false);
//   };


//   const handleChangePassword = (newPassword, email) => {
//     console.log('New Password:', newPassword);
//     console.log('User Email:', email);
//   };

//   const handleForgetPasswordPress = () => {
//     setForgotPasswordModalVisible(true);
//   };


//   return (
//     <View style={styles.container}>
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

//         {isChangePassword && (
//           <TextInput
//             label="New Password"
//             value={newPassword}
//             onChangeText={setNewPassword}
//             secureTextEntry
//             style={{ margin: 16, width: 319 }}
//           />
//         )}
//         <View style={styles.checkboxContainer}>
//           <TouchableOpacity onPress={handleChangePasswordPress}>
//             <Text style={styles.changePasswordText}>
//               Change Password
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleForgetPasswordPress}>
//             <Text style={styles.forgetPasswordText}>
//               Forget Password?
//             </Text>
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
//       </View>

//       <ChangePasswordModal
//         isVisible={modalVisible}
//         onClose={handleCloseModal}
//         onChangePassword={handleChangePassword}
//         initialEmail={email}
//       />

//       <ForgotPasswordModal
//         isVisible={forgotPasswordModalVisible}
//         onClose={() => setForgotPasswordModalVisible(false)}
//         onSendOTP={(email) => {
//           // Implement the logic for sending OTP here
//           console.log('Sending OTP to:', email);
//           // Close the modal after sending OTP
//           setForgotPasswordModalVisible(false);
//         }}
//       />
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
//     backgroundColor: '#FFFFFF',
//     flex: 1,
//     paddingTop: 150,
//     paddingLeft: 9,
//     alignItems: 'center',

//   },
//   head: {
//     fontWeight: 'bold',
//     marginBottom: 30,
//     fontSize: 20
//   },
//   head1: {

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginRight: 16
//   },

//   error1: {
//     color: 'red',
//   },

//   input: {
//     padding: 10,
//     width: '90%',
//     marginBottom: 10,
//   },
//   blueText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   buttonText2: {
//     paddingTop: 1.80,
//     color: 'gray', // Default text color
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   hoveredText: {
//     color: 'black',
//   },
//   buttons: {
//     paddingTop: 20,
//     display: 'flex',
//     flexDirection: 'row',

//   },
//   button1: {
//     width: '60%',
//   },

//   buttonContent2: {
//     backgroundColor: '#8f8bcc',
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
//     backgroundColor: '#7bb2b5',
//     paddingVertical: 4,
//     paddingHorizontal: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     left: 8
//   },
//   signupText: {
//     fontWeight: 'bold',
//     color: '#28A745',
//   },
//   error: {
//     width: '80%',
//     color: 'red',
//     left: 17,
//   },

//   checkboxContainer: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItms: 'center',
//     margin: 16,
//   },
//   checkboxLabel: {
//     paddingRight: 50
//   },
//   forgetPasswordText: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   changePasswordText: {
//     color: 'blue',
//     fontSize: 16,
//   },


// });

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);











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
