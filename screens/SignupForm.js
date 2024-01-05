import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from '@react-native-material/core';
import Toast from 'react-native-toast-message';
import ResetPassword from './ResetPassword';
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
    first_name: '',
    email: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    if (name === 'first_name' && !/^[a-zA-Z]+$/.test(value)) {
      setValidationErrors({
        ...validationErrors,
        first_name: 'First name should only contain alphabets.',
      });
    } else {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setValidationErrors({
      first_name: '',
      email: '',
    });

    for (const field in formData) {
      if (!formData[field]) {
        setValidationErrors({
          ...validationErrors,
          [field]: `Please Enter Your ${getFieldLabel(field)}.`,
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
        body: JSON.stringify({ ...formData, user_role: 'IU' }),
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
      first_name: '',
      last_name: '',
      email: '',
      oversee_user: '',
    });
  };

  const handleResetPasswordModalClose = () => {
    setResetPasswordModalVisible(false);
    navigation.navigate('Login'); // Navigate to the login screen or any other screen as needed
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      <ScrollView contentContainerStyle={styles.contentContainer}>
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
                {/* {console.log('KeyboardAvoidingView is executing')} */}
                  <TextInput
                    label={getFieldLabel(field)}
                    // placeholder={`Enter your ${getFieldLabel(field)}`}
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
    </KeyboardAvoidingView>
  );
};

const getFieldLabel = (field) => {
  switch (field) {
    case 'first_name':
      return 'Firstname';
    case 'last_name':
      return 'Lastname';
    case 'email':
      return 'Email';
    case 'oversee_user':
      return 'Agent ID';
    default:
      return field;
  }
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
    color: '#aae6d4',
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
    backgroundColor: '#aae6d4',
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


//without keyboard
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import Toast from 'react-native-toast-message';
// import ResetPassword from './ResetPassword';  // Import your reset password modal component
// import { useNavigation } from '@react-navigation/native';

// const SignupForm = () => {
//   const navigation = useNavigation();

//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     oversee_user: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [isResetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({
//     firstname: '',
//     email: '',
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

//     try {
//       const response = await fetch('http://35.154.235.224:8000/user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({...formData,user_role:'IU'}),
//       });

//       if (response.ok) {
//         handleRegistrationSuccess();
//       } else {
//         handleRegistrationFailure();
//       }
//     } catch (err) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Check your internet connection',
//         visibilityTime: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegistrationSuccess = () => {
//     setResetPasswordModalVisible(true);
//     // Additional success handling or navigation if needed
//   };

//   const handleRegistrationFailure = () => {
//     Toast.show({
//       type: 'error',
//       text1: 'Error',
//       text2: 'Registration failed. Please try again.',
//       visibilityTime: 3000,
//     });
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstname: '',
//       lastname: '',
//       email: '',
//       oversee_user: '',
//     });
//   };

//   const handleResetPasswordModalClose = () => {
//     setResetPasswordModalVisible(false);
//     navigation.navigate('Login');  // Navigate to the login screen or any other screen as needed
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.centeredContent}>
//         <View style={styles.container1}>
//           <View style={styles.head1}>
//             <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.tabTextLogin}>Login</Text>
//             </TouchableWithoutFeedback>
//             <TouchableWithoutFeedback onPress={() => { }}>
//               <Text style={styles.tabText}>Register</Text>
//             </TouchableWithoutFeedback>
//           </View>

//           {Object.keys(formData).map((field) => (
//             <React.Fragment key={field}>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   label={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={formData[field]}
//                   onChangeText={(text) => handleInputChange(field, text)}
//                   style={styles.inputField}
//                 />
//               </View>
              
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

//         <ResetPassword
//           isVisible={isResetPasswordModalVisible}
//           onClose={handleResetPasswordModalClose}
//         />
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



















