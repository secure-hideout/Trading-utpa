
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from '@react-native-material/core';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';


import { useDispatch } from 'react-redux';

import { setToken } from '../redux/actions/authActions';
const LoginForm = ({ navigation, onSuccessfulLogin }) => {

  const dispatch = useDispatch(); const [email, setEmail] = useState('user9@gmail.com');
  const [password, setPassword] = useState('pass');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        setError('Please fill in both email and password.');
        return;
      }

      const emailPattern = /\S+@gmail\.com$/;
      if (!emailPattern.test(email)) {
        setError('Please enter a valid email address.');
        setLoading(false);
        return;
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

        setIsRegistered(true);
        onSuccessfulLogin();

        // Log the token to the console
        // console.log('Token:', token);
        console.log('Navigating to BottomTabs...');

        navigation.navigate('BottomTabs');
      } else {
        // Handle the case where the response status is not ok
        setError('Please Check Your password or Emailid');
      }
    } catch (err) {
      console.error(err);
      setError('Check Your Network Connection');
    } finally {
      setLoading(false);
    }
  };



  const handleSignup = () => {
    // You should adjust this navigation action based on your navigation structure
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      {isRegistered && (
        <Text style={{ color: '#d68760', textAlign: 'center' }}>
          Login successfully!
        </Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ margin: 16, width: 319 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ margin: 16, width: 319 }}
      />

      <View style={styles.buttons}>
        <View style={styles.button1}>
          <Button
            onPress={handleLogin}
            disabled={loading}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonText}
          >
            Login
          </Button>
        </View>
        <View style={styles.button2}>
          <Button
            onPress={handleSignup}
            disabled={loading}
            contentStyle={styles.buttonContent1}
            labelStyle={styles.buttonText1}
          >
            Register
          </Button>
        </View>
      </View>
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
    flex: 1,
    paddingTop: 80,
    paddingLeft: 9,
    alignItems: 'center',
  },
  input: {
    padding: 6,
    width: '80%',
    marginBottom: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: -11
  },
  button1: {
    Left: -30,
  },
  button2:
  {
    left: 10,
  },
  buttonContent: {
    backgroundColor: '#8f8bcc', // Customize the button background color
    paddingVertical: 4,
    paddingHorizontal: 50,
    paddingLeft: 26,
    //borderRadius: Border.br_81xl,
  },
  buttonContent1: {
    backgroundColor: '#7bb2b5', // Customize the button background color
    paddingVertical: 4,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    left: 8
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
    Left: 15,
  },
  signupContent: {
    paddingTop: 17,
  },
  signupText: {
    fontWeight: 'bold',
    paddingTop: 15,
    color: '#28A745', // Customize the text color
  },
  error: {
    width: '80%',
    color: '#d68760',
    marginBottom: 10,
    left: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
