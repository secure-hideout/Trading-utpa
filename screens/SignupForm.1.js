import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, isPressed } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from "@react-native-material/core";
import Toast from "react-native-toast-message";
import OtpModal from './OtpModal';
import { styles } from './SignupForm';

export const SignupForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isOtpModalVisible, setOtpModalVisible] = useState(false);
    const [userOtp, setUserOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    const handleSignupp = async () => {
        setLoading(true);
        setError('');
        clearFieldErrors();

        if (!firstname || !lastname || !email || !password) {
            setFieldErrors();
            setLoading(false);
            return;
        }

        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        setOtpModalVisible(true);
        setLoading(false);
    };
    const setFieldErrors = () => {
        if (!firstname) setFirstnameError('Please fill in your firstname.');
        if (!lastname) setLastnameError('Please fill in your lastname.');
        if (!email) setEmailError('Please fill in your email.');
        if (!password) setPasswordError('Please fill in your password.');
    };
    const handleOtpSubmit = async () => {
        if (userOtp === '0000') {
            await registerUser();
            setIsRegistered(true);
            setOtpModalVisible(false);
        } else {
            setOtpError('Incorrect OTP');
        }
    };

    const registerUser = async () => {
        try {
            const response = await fetch('http://10.0.2.2:9000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, email, password }),
            });

            if (response.ok) {
                Toast.show({
                    type: "success",
                    text1: `Register Successful`,
                });
                setIsRegistered(true);
                clearFields();
            } else {
                setError('This Email address already exists');
            }
        } catch (err) {
            setError('Check your internet connection');
        } finally {
            setLoading(false);
        }
    };

    const clearFields = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    };

    const clearFieldErrors = () => {
        setFirstnameError('');
        setLastnameError('');
        setEmailError('');
        setPasswordError('');
        setOtpError('');
    };

    const setFieldErrors = () => {
        if (!firstname) setFirstnameError('Please fill in your firstname.');
        if (!lastname) setLastnameError('Please fill in your lastname.');
        if (!email) setEmailError('Please fill in your email.');
        if (!password) setPasswordError('Please fill in your password.');
    };

    const handleOtpCancel = () => {
        setOtpModalVisible(false);
        setUserOtp('');
        setOtpError('');
    };

    const handleLoginPress = () => {
        // Assuming this navigates to the Login screen
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container1}>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.head1}>
                        <TouchableWithoutFeedback onPress={handleLoginPress}>
                            <Text style={[styles.buttonText2, isPressed && styles.hoveredText]}>Login</Text>
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={[styles.head1, styles.blueText]}>Register</Text>
                        </View>
                    </View>
                    {isRegistered && (
                        <Text style={{ color: '#d68760', textAlign: 'center' }}>
                            Registered successfully!
                        </Text>
                    )}
                    <TextInput
                        label="Firstname"
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        style={styles.input} />
                    {firstnameError && <Text style={styles.error}>{firstnameError}</Text>}
                    {/* Repeat the pattern for other inputs and errors */}
                </View>
                <View style={styles.buttons}>
                    <View style={styles.buttonContainer}>
                        <Button
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
                            onPress={clearFields}
                            disabled={loading}
                            contentStyle={styles.buttonContent1}
                            labelStyle={styles.buttonText1}
                        >
                            Reset
                        </Button>
                    </View>
                </View>
                <OtpModal
                    isVisible={isOtpModalVisible}
                    onConfirm={handleOtpSubmit}
                    onCancel={handleOtpCancel}
                    onOtpChange={setUserOtp}
                    otpError={otpError} />
            </View>
        </ScrollView>
    );
};
