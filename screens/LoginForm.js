import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginForm = ({ navigation }) => {
  // Provide default email and password values
  const [email, setEmail] = useState('default@example.com');
  const [password, setPassword] = useState('defaultPassword');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

   /* try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.post('YOUR_API_ENDPOINT/login', {
        email,
        password,
      });

      // Handle the API response as needed
      if (response.data.success) {
        // Successful login
        navigation.navigate('Home'); // Navigate to the next page
      } else {
        // Login failed, handle error
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Handle network errors or other issues
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }; */

//   try {
//     // Simulate a successful login
//     navigation.navigate('Home'); // Navigate to the next page
//   } catch (err) {
//     // Handle network errors or other issues
//     setError('An error occurred. Please try again later.');
//   } finally {
//     setLoading(false);
//   }
// };


try {
    // Simulate a successful login when email and password match the default values
    if (email === 'default@example.com' && password === 'defaultPassword') {
      // Successful login
      navigation.navigate('Dashboard02'); // Navigate to the 'Dashboard02' page
    } else {
      // Login failed, handle error
      setError('Login failed. Please check your credentials.');
    }
  } catch (err) {
    // Handle network errors or other issues
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
