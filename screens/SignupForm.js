import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from '@react-native-material/core';
import Toast from 'react-native-toast-message';
import ResetPassword from './ResetPassword';  // Import your reset password modal component
import { useNavigation } from '@react-navigation/native';

const SignupForm = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    oversee_user: '',
  });

  const [loading, setLoading] = useState(false);
  const [isResetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    firstname: '',
    email: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    if (name === 'firstname' && !/^[a-zA-Z]+$/.test(value)) {
      setValidationErrors({
        ...validationErrors,
        firstname: 'First name should only contain alphabets.',
      });
    } else {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setValidationErrors({
      firstname: '',
      email: '',
    });

    for (const field in formData) {
      if (!formData[field]) {
        setValidationErrors({
          ...validationErrors,
          [field]: `Please Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}.`,
        });
        setLoading(false);
        return;
      }
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(formData.email)) {
      setValidationErrors({
        ...validationErrors,
        email: 'Please enter a valid email address.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://35.154.235.224:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData,user_role:'IU'}),
      });

      if (response.ok) {
        handleRegistrationSuccess();
      } else {
        handleRegistrationFailure();
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Check your internet connection',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    setResetPasswordModalVisible(true);
    // Additional success handling or navigation if needed
  };

  const handleRegistrationFailure = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Registration failed. Please try again.',
      visibilityTime: 3000,
    });
  };

  const handleCancel = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      oversee_user: '',
    });
  };

  const handleResetPasswordModalClose = () => {
    setResetPasswordModalVisible(false);
    navigation.navigate('Login');  // Navigate to the login screen or any other screen as needed
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.centeredContent}>
        <View style={styles.container1}>
          <View style={styles.head1}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
              <Text style={styles.tabTextLogin}>Login</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { }}>
              <Text style={styles.tabText}>Register</Text>
            </TouchableWithoutFeedback>
          </View>

          {Object.keys(formData).map((field) => (
            <React.Fragment key={field}>
              <View style={styles.inputContainer}>
                <TextInput
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChangeText={(text) => handleInputChange(field, text)}
                  style={styles.inputField}
                />
              </View>
              
              {validationErrors[field] && (
                <Text style={styles.error}>{validationErrors[field]}</Text>
              )}
            </React.Fragment>
          ))}

          <View style={styles.buttons}>
            <Button
              mode="contained"
              onPress={handleSignup}
              disabled={loading}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonText}
              style={styles.button}
            >
              Signup
            </Button>
            <Button
              onPress={handleCancel}
              disabled={loading}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonText}
              style={styles.button}
            >
              Reset
            </Button>
          </View>
        </View>

        <ResetPassword
          isVisible={isResetPasswordModalVisible}
          onClose={handleResetPasswordModalClose}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',

  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    position: 'relative',
  },
  container1: {
    width: '100%',
    maxWidth: 350,
  },
  head1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  tabTextLogin: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tabText: {
    color: '#B7DDD2',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 15,
  },
  error: {
    color: 'red',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    maxWidth: '40%',
  },
  buttonContent: {
    flex: 1,
    backgroundColor: '#B7DDD2',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  iconContainer: {
    position: 'absolute',
    top: 25,
    right: 10,
  },
});

export default SignupForm;




















//registerapi 
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import Toast from 'react-native-toast-message';
// import OtpModal from './OtpModal';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const SignupForm = () => {
//   const navigation = useNavigation();

//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     agentId: '',  // Added agentId field
//   });

//   const [loading, setLoading] = useState(false);
//   const [isOtpModalVisible, setOtpModalVisible] = useState(false);
//   const [userOtp, setUserOtp] = useState('');
  
//   const [validationErrors, setValidationErrors] = useState({
//     firstname: '',
//     email: '',
//     otp: '',
//   });

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });

//     if (name === 'firstname' && !/^[a-zA-Z]+$/.test(value)) {
//       setValidationErrors({
//         ...validationErrors,
//         firstname: 'First name should only contain alphabets.',
//       });
//     } else {
//       setValidationErrors({ ...validationErrors, [name]: '' });
//     }
//   };

//   const handleSignup = async () => {
//     setLoading(true);
//     setValidationErrors({
//       firstname: '',
//       email: '',
//       otp: '',
//     });

//     for (const field in formData) {
//       if (!formData[field]) {
//         setValidationErrors({
//           ...validationErrors,
//           [field]: `Please Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}.`,
//         });
//         setLoading(false);
//         return;
//       }
//     }

//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     if (!emailPattern.test(formData.email)) {
//       setValidationErrors({
//         ...validationErrors,
//         email: 'Please enter a valid email address.',
//       });
//       setLoading(false);
//       return;
//     }

//     setOtpModalVisible(true);
//     setLoading(false);
//   };

//   const handleOtpSubmit = async () => {
//     if (userOtp === '0000') {
//       await registerUser();
//       setOtpModalVisible(false);
//     } else {
//       setValidationErrors({ ...validationErrors, otp: 'Incorrect OTP' });
//     }
//   };

//   const registerUser = async () => {
//     try {
//       const response = await fetch('http://35.154.235.224:9000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         handleRegistrationSuccess();
//       } else {
//         handleRegistrationFailure();
//       }
//     } catch (err) {
//       setError('Check your internet connection');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegistrationSuccess = () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Success',
//       text2: 'Register Successful',
//       visibilityTime: 3000,
//     });
//     navigation.navigate('Login');
//     setFormData({
//       firstname: '',
//       lastname: '',
//       email: '',
//       agentId: '',  // Added agentId field
//     });
//   };

//   const handleRegistrationFailure = () => {
//     Toast.show({
//       type: 'error',
//       text1: 'Error',
//       text2: 'Email Address Already Exist',
//       visibilityTime: 3000,
//     });
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstname: '',
//       lastname: '',
//       email: '',
//       agentId: '',  // Added agentId field
//     });
//   };

//   const handleOtpCancel = () => {
//     setOtpModalVisible(false);
//     setUserOtp('');
//     setValidationErrors({ ...validationErrors, otp: '' });
//   };

//   const handleLoginPress = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.centeredContent}>
//         <View style={styles.container1}>
//           <View style={styles.head1}>
//             <TouchableWithoutFeedback onPress={handleLoginPress}>
//               <Text style={styles.tabTextLogin}>Login</Text>
//             </TouchableWithoutFeedback>
//             <TouchableWithoutFeedback onPress={() => { }}>
//               <Text style={styles.tabText}>Register</Text>
//             </TouchableWithoutFeedback>
//           </View>

//           {Object.keys(formData).map((field) => (
//             <React.Fragment key={field}>
//               {field !== 'password' && field !== 'confirmPassword' && (
//                 <View style={styles.inputContainer}>
//                   <TextInput
//                     label={field.charAt(0).toUpperCase() + field.slice(1)}
//                     value={formData[field]}
//                     onChangeText={(text) => handleInputChange(field, text)}
//                     style={styles.inputField}
//                   />
//                 </View>
//               )}
//               {validationErrors[field] && (
//                 <Text style={styles.error}>{validationErrors[field]}</Text>
//               )}
//             </React.Fragment>
//           ))}

//           <View style={styles.buttons}>
//             <Button
//               mode="contained"
//               onPress={handleSignup}
//               disabled={loading}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonText}
//               style={styles.button}
//             >
//               Signup
//             </Button>
//             <Button
//               onPress={handleCancel}
//               disabled={loading}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonText}
//               style={styles.button}
//             >
//               Reset
//             </Button>
//           </View>
//         </View>
// {/* 
//         <OtpModal
//           isVisible={isOtpModalVisible}
//           onConfirm={handleOtpSubmit}
//           onClose={handleOtpCancel}
//           onOtpChange={setUserOtp}
//           otpError={validationErrors.otp}
//         /> */}
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   contentContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',

//   },
//   centeredContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     position: 'relative',
//   },
//   container1: {
//     width: '100%',
//     maxWidth: 350,
//   },
//   head1: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },

//   tabTextLogin: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   tabText: {
//     color: '#B7DDD2',
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginHorizontal: 15,
//   },
//   error: {
//     color: 'red',
//     fontWeight: '600',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   inputField: {
//     marginVertical: 8,
//     fontSize: 16,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 4,
//     maxWidth: '40%',
//   },
//   buttonContent: {
//     flex: 1,
//     backgroundColor: '#B7DDD2',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '600',
//   },
//   iconContainer: {
//     position: 'absolute',
//     top: 25,
//     right: 10,
//   },
// });

// export default SignupForm;












//wo animation
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { Button, TextInput } from 'react-native-paper';
// import Toast from 'react-native-toast-message';
// import OtpModal from './OtpModal';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const SignupForm = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [isOtpModalVisible, setOtpModalVisible] = useState(false);
//   const [userOtp, setUserOtp] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [validationErrors, setValidationErrors] = useState({
//     firstname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     otp: '',
//   });

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleShowConfirmPassword = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });

//     if (name === 'firstname' && !/^[a-zA-Z]+$/.test(value)) {
//       setValidationErrors({
//         ...validationErrors,
//         firstname: 'First name should only contain alphabets.',
//       });
//     } else {
//       setValidationErrors({ ...validationErrors, [name]: '' });
//     }
//   };

//   const handleSignup = async () => {
//     setLoading(true);
//     setValidationErrors({
//       firstname: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       otp: '',
//     });

//     for (const field in formData) {
//       if (!formData[field]) {
//         setValidationErrors({
//           ...validationErrors,
//           [field]: `Please Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}.`,
//         });
//         setLoading(false);
//         return;
//       }
//     }

//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     if (!emailPattern.test(formData.email)) {
//       setValidationErrors({
//         ...validationErrors,
//         email: 'Please enter a valid email address.',
//       });
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setValidationErrors({
//         ...validationErrors,
//         confirmPassword: 'Passwords do not match.',
//       });
//       setLoading(false);
//       return;
//     }

//     setOtpModalVisible(true);
//     setLoading(false);
//   };

//   const handleOtpSubmit = async () => {
//     if (userOtp === '0000') {
//       await registerUser();
//       setOtpModalVisible(false);
//     } else {
//       setValidationErrors({ ...validationErrors, otp: 'Incorrect OTP' });
//     }
//   };

//   const registerUser = async () => {
//     try {
//       const response = await fetch('http://35.154.235.224:9000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         handleRegistrationSuccess();
//       } else {
//         handleRegistrationFailure();
//       }
//     } catch (err) {
//       setError('Check your internet connection');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegistrationSuccess = () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Success',
//       text2: 'Register Successful',
//       visibilityTime: 3000,
//     });
//     navigation.navigate('Login');
//     setFormData({
//       firstname: '',
//       lastname: '',
//       email: '',
//       password: '',
//     });
//   };

//   const handleRegistrationFailure = () => {
//     Toast.show({
//       type: 'error',
//       text1: 'Error',
//       text2: 'Email Address Already Exist',
//       visibilityTime: 3000,
//     });
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstname: '',
//       lastname: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     });
//   };

//   const handleOtpCancel = () => {
//     setOtpModalVisible(false);
//     setUserOtp('');
//     setValidationErrors({ ...validationErrors, otp: '' });
//   };

//   const handleLoginPress = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.container1}>
//         <View style={styles.head1}>
//           <TouchableWithoutFeedback onPress={handleLoginPress}>
//             <Text style={styles.tabTextLogin}>Login</Text>
//           </TouchableWithoutFeedback>
//           <TouchableWithoutFeedback onPress={() => { }}>
//             <Text style={styles.tabText}>Register</Text>
//           </TouchableWithoutFeedback>
//         </View>

//         {Object.keys(formData).map((field) => (
//           <React.Fragment key={field}>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 label={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={formData[field]}
//                 onChangeText={(text) => handleInputChange(field, text)}
//                 style={styles.inputField}
//                 secureTextEntry={
//                   (field === 'password' && !showPassword) ||
//                   (field === 'confirmPassword' && !showConfirmPassword)
//                 }
//               />
//               {(field === 'password' || field === 'confirmPassword') && (
//                 <TouchableWithoutFeedback
//                   onPress={
//                     field === 'password'
//                       ? toggleShowPassword
//                       : toggleShowConfirmPassword
//                   }
//                 >
//                   <View style={styles.iconContainer}>
//                     <Ionicons
//                       name={
//                         field === 'password'
//                           ? showPassword
//                             ? 'eye'
//                             : 'eye-off'
//                           : showConfirmPassword
//                             ? 'eye'
//                             : 'eye-off'
//                       }
//                       size={24}
//                       color="#555"
//                     />
//                   </View>
//                 </TouchableWithoutFeedback>
//               )}
//             </View>
//             {validationErrors[field] && (
//               <Text style={styles.error}>{validationErrors[field]}</Text>
//             )}
//           </React.Fragment>
//         ))}

//         <View style={styles.buttons}>
//           <Button
//             mode="contained"
//             onPress={handleSignup}
//             disabled={loading}
//             contentStyle={styles.buttonContent}
//             labelStyle={styles.buttonText}
//             style={styles.button}
//           >
//             Signup
//           </Button>
//           <Button
//             onPress={handleCancel}
//             disabled={loading}
//             contentStyle={styles.buttonContent}
//             labelStyle={styles.buttonText}
//             style={styles.button}
//           >
//             Reset
//           </Button>
//         </View>
//       </View>

//       <OtpModal
//         isVisible={isOtpModalVisible}
//         onConfirm={handleOtpSubmit}
//         onClose={handleOtpCancel}
//         onOtpChange={setUserOtp}
//         otpError={validationErrors.otp}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#C1C2EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     position: 'relative',
//   },
//   container1: {
//     width: '100%',
//     maxWidth: 350,
//   },
//   head1: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },

//   tabTextLogin: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   tabText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginHorizontal: 15,
//   },
//   error: {
//     color: 'red',
//     fontWeight: '600',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   inputField: {
//     marginVertical: 8,
//     fontSize: 16,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 4,
//     maxWidth: '40%',
//   },
//   buttonContent: {
//     flex: 1,
//     backgroundColor: '#B7DDD2',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '600',
//   },
//   iconContainer: {
//     position: 'absolute',
//     top: 25,
//     right: 10,
//   },
// });

// export default SignupForm;





































// //working old
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from "@react-native-material/core";
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';
// import Toast from "react-native-toast-message";
// import OtpModal from './OtpModal';

// const SignupForm = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isPressed, setIsPressed] = useState(false);

//   const [validationErrors, setValidationErrors] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     otp: '',
//   });
//   const [isOtpModalVisible, setOtpModalVisible] = useState(false);
//   const [userOtp, setUserOtp] = useState('');

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//     setValidationErrors({ ...validationErrors, [name]: '' });
//   };

//   const handleSignupp = async () => {
//     setLoading(true);
//     setError('');

//     // Reset all error states
//     setValidationErrors({
//       firstname: '',
//       lastname: '',
//       email: '',
//       password: '',
//       otp: '',
//     });

//     // Check if all fields are filled
//     for (const field in formData) {
//       if (!formData[field]) {
//         setValidationErrors({
//           ...validationErrors,
//           [field]: `Please fill in your ${field}.`,
//         });
//         setLoading(false);
//         return;
//       }
//     }

//     // Validate email pattern
//     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     if (!emailPattern.test(formData.email)) {
//       setValidationErrors({
//         ...validationErrors,
//         email: 'Please enter a valid email address.',
//       });
//       setLoading(false);
//       return;
//     }

//     // All validations pass, show OTP modal
//     setOtpModalVisible(true);
//     setLoading(false);
//   };

//   const handleOtpSubmit = async () => {
//     if (userOtp === '0000') {
//       // Proceed with the registration process
//       await registerUser();
//       setIsRegistered(true);
//       setOtpModalVisible(false);
//     } else {
//       setValidationErrors({ ...validationErrors, otp: 'Incorrect OTP' });
//     }
//   };

//   const registerUser = async () => {
//     try {
//       const response = await fetch('http://35.154.235.224:9000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Toast.show({
//           type: "success",
//           text1: `Register Successful`,
//         });
//         navigation.navigate('Login');
//         // Reset form fields if needed
//         setFormData({
//           firstname: '',
//           lastname: '',
//           email: '',
//           password: '',
//         });
//       } else {
//         setError('This Email address already exists');
//       }
//     } catch (err) {
//       setError('Check your internet connection');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const loginFormin = () => {
//   //   navigation.navigate('Login');
//   // };

//   const handleCancel = () => {
//     setFormData({
//       firstname: '',
//       lastname: '',
//       email: '',
//       password: '',
//     });
//   };

//   const handleOtpCancel = () => {
//     setOtpModalVisible(false);
//     setUserOtp('');
//     setValidationErrors({ ...validationErrors, otp: '' });
//   };

//   const handlePressIn = () => {
//     setIsPressed(true);
//   };

//   const handlePressOut = () => {
//     setIsPressed(false);
//   };

//   const handleLoginPress = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.container1}>
//           {error && <Text style={styles.error}>{error}</Text>}
//           <View style={styles.head1}>
//             <View>
//               <TouchableWithoutFeedback
//                 onPress={() => handleLoginPress()}
//                 onPressIn={handlePressIn}
//                 onPressOut={handlePressOut}
//               >
//                 <Text style={[styles.buttonText2, isPressed && styles.hoveredText]}>
//                   Login
//                 </Text>
//               </TouchableWithoutFeedback>
//             </View>
//             <View>
//               <View>
//                 <Text style={[styles.head1, styles.blueText]}>Register</Text>
//               </View>
//             </View>
//           </View>
//           {isRegistered && (
//             <Text style={{ color: '#d68760', textAlign: 'center' }}>
//               Registered successfully!
//             </Text>
//           )}
//           {Object.keys(formData).map((field) => (
//             <React.Fragment key={field}>
//               <TextInput
//                 label={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={formData[field]}
//                 onChangeText={(text) => handleInputChange(field, text)}
//                 style={{ margin: 16, width: 310 }}
//               />
//               {validationErrors[field] && (
//                 <Text style={styles.error}>{validationErrors[field]}</Text>
//               )}
//             </React.Fragment>
//           ))}
//         </View>
//         <View style={styles.buttons}>
//           <View style={styles.buttonContainer}>
//             <Button
//               onPress={handleSignupp}
//               disabled={loading}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonText}
//             >
//               Signup
//             </Button>
//           </View>
//           <View style={styles.buttonContainer1}>
//             <Button
//               onPress={handleCancel}
//               disabled={loading}
//               contentStyle={styles.buttonContent1}
//               labelStyle={styles.buttonText1}
//             >
//               Reset
//             </Button>
//           </View>
//         </View>
//         <OtpModal
//           isVisible={isOtpModalVisible}
//           onConfirm={handleOtpSubmit}
//           onClose={() => setOtpModalVisible(false)}
//           onOtpChange={setUserOtp}
//           otpError={validationErrors.otp}
//         />
//       </View>
//     </ScrollView>
//   );
// };





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 100,
//   },
//   container1: {
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
//     flex: 1,
//     marginLeft: 10,
//   },
//   head2: {
//     paddingTop: 20,
//   },
//   blueText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black', // Color when text is active
//   },
//   buttonText2: {
//     paddingTop: 2,
//     color: 'gray', // Default text color
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   hoveredText: {
//     color: 'black', // Change this to the color you want on hover
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   buttons: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   buttonContent: {
//     backgroundColor: '#8f8bcc', // Customize the button background color
//     paddingVertical: 4,
//     paddingHorizontal: 35,

//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold'

//   },
//   buttonContent1: {
//     flex: 1,
//     backgroundColor: '#7bb2b5',
//     paddingVertical: 4,
//     paddingHorizontal: 39,
//   },
//   buttonText1: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   buttonContainer: {
//     marginLeft: 33,
//   },
//   buttonContainer1: {
//     marginRight: 30,
//   }
// });

// export default SignupForm;









