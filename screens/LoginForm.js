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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        {/* <LottieView
          ref={animationRef}
          source={require('../assets/animations/Animationf.json')}
          style={styles.animationBackground}
        /> */}
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
          {/* <TouchableOpacity onPress={handleChangePasswordPress}>
            <Text style={styles.linkText}>Change Password</Text>
          </TouchableOpacity> */}
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




















































// //loginform with otp change 
// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../redux/actions/authActions';
// import ChangePasswordModal from './ChangePasswordModal';
// import ForgotPasswordModal from './ForgotPasswordModal';
// import LottieView from 'lottie-react-native';
// import { Ionicons } from '@expo/vector-icons';
// import NetworkErrorModal from './NetworkErrorModal';



// const LoginForm = ({ navigation, onSuccessfulLogin }) => {
//   const animationRef = useRef(null);
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('user4@gmail.com');
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
//   const [networkErrorModalVisible, setNetworkErrorModalVisible] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [showOtpInput, setShowOtpInput] = useState(false);


//   useEffect(() => {
//     if (animationRef.current) {
//       animationRef.current.play();
//     }
//   }, []);

//   const performLogin = async () => {
//     const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const responseData = await response.json();

//     if (response.ok) {
//       const token = responseData.token.token;
//       console.log('Dispatching Token:', token);
//       dispatch(setToken(token));

//       onSuccessfulLogin();
//       console.log('Navigating to BottomTabs...');
//       navigation.navigate('BottomTabs');
//     } else {
//       const errorData = await response.json();
//       if (errorData.status === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
//         setError('Incorrect password. Please try again.');
//       } else {
//         setNetError('Please Check Your Credentials');
//       }
//     }
//   };

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

//       await performLogin();

//     } catch (err) {
//       // console.error(err);
//       if (err instanceof TypeError && err.message === 'Already read') {
//         setError('Your password is incorrect');
//       } else {
//         // setError('Check Your Network Connection');
//         setNetworkErrorModalVisible(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginPress = () => {
//     setActiveButton('login');
//   };

//   const handleRegisterPress = () => {
//     setActiveButton('register');
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
//           source={require('../assets/animations/Animationf.json')}
//           style={styles.animationBackground}
//         />
//         <View style={styles.tabsContainer}>
//           <TouchableOpacity onPress={handleLoginPress} style={[styles.tab]}>
//             <Text style={[styles.tabText, { color: '#B7DDD2' }]}>Login</Text>
//           </TouchableOpacity>
//           <TouchableWithoutFeedback
//             onPress={handleRegisterPress}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//           >
//             <Text style={[styles.tabText, { color: 'black' }]}>Register</Text>
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

//         <View style={styles.passwordContainer}>
//           <TextInput
//             label="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//             style={styles.input}
//           />
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

//         {loading && <ActivityIndicator size="large" color="#0000ff" />}


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
//             console.log('Sending OTP to:', email);
//             // setForgotPasswordModalVisible(false);
//           }}

//         />

//         <NetworkErrorModal
//           isVisible={networkErrorModalVisible}
//           onClose={() => setNetworkErrorModalVisible(false)}
//         />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: "#FFFFFF",

//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
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
//     paddingVertical: 30,
//   },
//   tab: {
//     marginRight: 20,
//   },
//   tabText: {
//     fontSize: 20,

//     fontWeight: 'bold',
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
//     top: 25,
//   },
//   error: {
//     color: 'red',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   passwordError: {
//     marginBottom: 1,
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














