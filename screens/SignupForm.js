//api


import React, { useState } from 'react';
import { View, Text, StyleSheet, label } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { TextInput } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const SignupForm = ({ }) => {
  const navigation = useNavigation();
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignupp = async () => {

    setLoading(true);
    setError('');

    try {
      if (!firstname || !lastname || !email || !password) {
        setError('Please fill your credentials..');
        return;
      }

      const emailPattern = /\S+@gmail\.com$/;
      if (!emailPattern.test(email)) {
        setError('Please enter a valid email address.');
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
        setfirstname('');
        setlastname('');
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
    setfirstname('');
    setlastname('');
    setEmail('');
    setPassword('');
  };



  return (
    <ScrollView>
      <View style={styles.container}>
        {isRegistered && (
          <Text style={{ color: '#d68760', textAlign: 'center' }}>
            Registered successfully!
          </Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          //mode="outlined" // Set the mode to "outlined" for standard text input
          label="firstname"
          value={firstname}
          onChangeText={setfirstname}
          style={{ margin: 16, width: 310 }}
        />
        <TextInput
          //mode="outlined" // Set the mode to "outlined" for standard text input
          label="lastname"
          value={lastname}
          onChangeText={setlastname}
          style={{ margin: 16, width: 310 }}
        />
        <TextInput
          // mode="outlined" // Set the mode to "outlined" for standard text input
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{ margin: 16, width: 310 }}
        />
        <TextInput
          // mode="outlined" // Set the mode to "outlined" for standard text input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ margin: 16, width: 310 }}
        />
        <View style={styles.buttons}>
          <View style={styles.button1}>
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
          <View style={styles.button2}>
            <Button
              //mode="contained"
              onPress={handleCancel}
              disabled={loading}
              contentStyle={styles.buttonContent1}
              labelStyle={styles.buttonText1}
            >
              Cancel
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
    paddingTop: 80,
    paddingLeft: 9,
    justifyContent: 'center',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: -3,
  },
  buttonContent: {
    backgroundColor: '#8f8bcc', // Customize the button background color
    paddingVertical: 4,
    paddingHorizontal: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,

  },
  buttonContent1: {
    backgroundColor: '#7bb2b5',
    paddingVertical: 4,
    paddingHorizontal: 35,

  },
  buttonText1: {
    color: 'white',
    fontSize: 16,

  },
  button1: {
    Left: -30,
  },
  button2:
  {
    left: 10,
  },
});

export default SignupForm;