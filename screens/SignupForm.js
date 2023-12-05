//api


import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, label, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { TextInput } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from "react-native-toast-message"

const SignupForm = ({ }) => {
  const navigation = useNavigation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailErrorr, setEmailErrorr] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleSignupp = async () => {

    setLoading(true);
    setError('');

    try {

      if (!firstname) {
        setFirstnameError('Please fill in your firstname.');
        return;
      } else {
        setFirstnameError('');
      }

      if (!lastname) {
        setLastnameError('Please fill in your lastname.');
        return;
      } else {
        setLastnameError('');
      }


      if (!email) {
        setEmailErrorr('Please fill in your email.');
        return;
      } else {
        setEmailErrorr('');
      }

      if (!password) {
        setPasswordError('Please fill in your password.');
        return;
      } else {
        setPasswordError('');
      }
  
      // if ( !firstname || !lastname ||!email || !password) {
      //   setError('Please fill your credentials..');
      //   return;
      // }

      // const emailPattern = /\S+@gmail\.com$/;
      // if (!emailPattern.test(email)) {
      //   setEmailError('Please enter a valid email address.');
      //   setLoading(false);
      //   return;
      // }

      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      






      const response = await fetch('http://10.0.2.2:9000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });


      if (response.ok) {
        // Signup successful, you can navigate to another screen or show a success message
        setIsRegistered(true);
          setIsRegistered(true);
          Toast.show({
            type: "success",
            text1: `Register Succesfull`,
         });
         navigation.navigate('Login');

         setFirstname('');
         setLastname('');
         setEmail('');
         setPassword('');
      } else {
        // Signup failed, handle error
        // navigation.navigate('Login');
        setError('this Email address is already exists');
      }
    } catch (err) {
      // Handle network errors or other issues
      setError('Check your internet connection');
    } finally {
      setLoading(false);
    }
  };

  const loginFormin = () => {
    navigation.navigate('Login');
  };


  const handleCancel = () => {
    // Clear the input fields by setting the state variables to empty strings
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };


  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };


  const handleLoginPress = () => {
    navigation.navigate('Login');
    // Handle login button press logic
  };



  return (
    <ScrollView >
      <View style={styles.container}>
      <View style={styles.container1}>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.head1}>
      <View>
      <TouchableWithoutFeedback onPress={() => handleLoginPress()}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut} >
        <Text  style={[styles.buttonText2,isPressed && styles.hoveredText]}>Login</Text>
       </TouchableWithoutFeedback>

      </View>
      <View>
      <View>
          <Text style={[styles.head1, styles.blueText]}>Register</Text>
      </View>
      </View>
      </View>
        {isRegistered && (
          <Text style={{ color: '#d68760', textAlign: 'center' }}>
            Registered successfully!
          </Text>
        )}
        <TextInput
          //mode="outlined" // Set the mode to "outlined" for standard text input
          label="Firstname"
          value={firstname}
          onChangeText={(text) => {
            setFirstname(text);
            setFirstnameError('');
          }} 
          style={{ margin: 16, width: 310 }}
        />
        {firstnameError && <Text style={styles.error}>{firstnameError}</Text>}

        <TextInput
          //mode="outlined" // Set the mode to "outlined" for standard text input
          label="Lastname"
          value={lastname}
          onChangeText={(text) => {
            setLastname(text);
            setLastnameError('');
          }}
          style={{ margin: 16, width: 310 }}
        />
        {lastnameError && <Text style={styles.error}>{lastnameError}</Text>}

        <TextInput
          // mode="outlined" // Set the mode to "outlined" for standard text input
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailErrorr(''); }}
          style={{ margin: 16, width: 310 }}
        />
        {emailErrorr && <Text style={styles.error}>{emailErrorr}</Text>}
        {emailError && <Text style={styles.error}>{emailError}</Text>}
        <TextInput
          // mode="outlined" // Set the mode to "outlined" for standard text input
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          secureTextEntry
          style={{ margin: 16, width: 310 }}
        />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}


        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <Button
              //mode="contained"
              onPress={handleSignupp}
              disabled={loading}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonText}
            >
              Signup
            </Button>
          </View> 
          <View style={styles.buttonContainer1}>
            <Button
              //mode="contained"
              onPress={handleCancel}
              disabled={loading}
              contentStyle={styles.buttonContent1}
              labelStyle={styles.buttonText1}
            >
              Reset
            </Button>
          </View>
        </View>
        {/* <Text style={styles.loginText} onPress={loginFormin}>Login</Text> */}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
  },
  container1:{
    alignItems: 'center',
  },
  head:{
    fontWeight: 'bold',
    marginBottom: 30,
    fontSize: 20
  },
  head1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft : 10, 
  },
  head2:{
    paddingTop: 20,
  },
  blueText: {
    fontSize: 20,
    fontWeight: 'bold', 
    color: 'black', // Color when text is active
  },
  buttonText2: {
    paddingTop: 2,
    color: 'gray', // Default text color
    fontSize: 18,
    fontWeight: 'bold', 
  },
  hoveredText: {
   color: 'black', // Change this to the color you want on hover
  },
  loginText: {
    fontWeight: 'bold',
    paddingTop: 15,
    color: 'green',
  },
  error: {
    color: '#d68760',
    marginBottom: 10,
  },
  buttons: {
    display:  'flex',
    flexDirection: 'row', 
    justifyContent: 'space-around', 
  },
  buttonContent: {
    backgroundColor: '#8f8bcc', // Customize the button background color
    paddingVertical: 4,
    paddingHorizontal: 35,
  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'

  },
  buttonContent1: {
    flex: 1,
    backgroundColor: '#7bb2b5',
    paddingVertical: 4,
    paddingHorizontal: 39,
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer:{
    marginLeft: 33,
  },
  buttonContainer1:{
    marginRight: 30,
  }
});

export default SignupForm;