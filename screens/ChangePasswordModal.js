import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// Validation logic moved outside the component
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasNumber &&
        hasSymbol
    );
};

const ChangePasswordModal = ({ isVisible, onClose, onChangePassword, initialEmail }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState(initialEmail);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatchError, setPasswordsMatchError] = useState('');
    const [passwordsValid, setPasswordsValid] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [currentPasswordEntered, setCurrentPasswordEntered] = useState(false);

    useEffect(() => {
        setEmail(initialEmail);
    }, [initialEmail]);

    useEffect(() => {
        if (!isVisible) {
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPassword('');
            setShowCurrentPassword(false);
            setShowPassword(false);
            setShowConfirmPassword(false);
            setPasswordsMatchError('');
            setCurrentPasswordEntered(false);
        }
    }, [isVisible]);

    // Validate current password on change
    useEffect(() => {
        if (currentPassword) {
            validateCurrentPassword();
            setCurrentPasswordEntered(true);
        }
    }, [currentPassword]);

    // Validate new password on change
    useEffect(() => {
        setPasswordsValid(validatePassword(newPassword) && validatePassword(confirmPassword));
    }, [newPassword, confirmPassword]);



    const validateCurrentPassword = async () => {
        try {
            const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: initialEmail, password: currentPassword }),
            });

            if (response.ok) {
                // Password is correct
                console.log("True")
                setPasswordsMatchError(false);
            } else {
                // Password is incorrect
                const errorData = await response.json();
                if (errorData.status === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
                    setPasswordsMatchError(true);
                    console.log("False")

                } else {
                    setPasswordsMatchError(true);
                    console.log("False 1")
                }
            }
        } catch (error) {
            console.error('Error validating current password:', error);
            // Handle error (e.g., network issue)
            setPasswordsMatchError('Error validating current password. Please Check Your Connection.');
        }
    };

    const handleConfirm = () => {
        if (newPassword !== confirmPassword || passwordsMatchError) {
            setPasswordsMatchError('New password and confirm password do not match or do not meet the criteria.');
            return;
        }

        onChangePassword(newPassword, email);
        onClose();

        Toast.show({
            type: 'success',
            text1: 'Password Changed',
            text2: 'Password changed successfully!',
        });
    };
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <Ionicons name="ios-close" size={28} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.modalText}>Change Password</Text>
                    <TextInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        editable={false}
                        style={styles.input}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder=" Current Password"
                            value={currentPassword}
                            onChangeText={(text) => setCurrentPassword(text)}
                            onBlur={validateCurrentPassword} // Validate current password on blur
                            secureTextEntry={!showCurrentPassword}
                            style={styles.inputWithIcon}
                        />
                        <TouchableOpacity
                            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            style={styles.showPasswordIcon}
                        >
                            <Ionicons
                                name={showCurrentPassword ? 'ios-eye' : 'ios-eye-off'}
                                size={24}
                                color="#555"
                            />
                        </TouchableOpacity>
                    </View>
                    {!passwordsMatchError && currentPasswordEntered && (
                        <>
                            {/* Render new password field */}
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChangeText={(text) => setNewPassword(text)}
                                    secureTextEntry={!showPassword}
                                    style={styles.inputWithIcon}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.showPasswordIcon}
                                >
                                    <Ionicons
                                        name={showPassword ? 'ios-eye' : 'ios-eye-off'}
                                        size={24}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Render confirm password field */}
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    onBlur={validatePassword} // Validate confirm password on blur
                                    secureTextEntry={!showConfirmPassword}
                                    style={styles.inputWithIcon}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.showPasswordIcon}
                                >
                                    <Ionicons
                                        name={showConfirmPassword ? 'ios-eye' : 'ios-eye-off'}
                                        size={24}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    <View style={styles.errorContainer}>
                        {passwordsMatchError ? (
                            <Text style={styles.errorText}>Unable to Valideate Current Password, Please Check!</Text>
                        ) : null}
                    </View>

                    <View style={styles.buttonContainer}>
                        {passwordsValid ? (
                            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={[styles.confirmButton, styles.disabledButton]}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </View>
                        )}
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal >
    );
};




const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 350,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 10,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(28, 30, 50, 1)',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#C1C2EB',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: '500',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    confirmButton: {
        backgroundColor: '#C1C2EB',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    cancelButton: {
        backgroundColor: '#B7DDD2',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(28, 30, 50, 1)',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    inputWithIcon: {
        width: '100%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#C1C2EB',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: '500',

    },
    showPasswordIcon: {
        position: 'absolute',
        top: '50%',
        right: 10,
        transform: [{ translateY: -12 }],
    },
    errorContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
    },
    passwordRequirements: {
        color: '#555',
    },
    disabledButton: {
        backgroundColor: '#A9A9A9',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        opacity: 0.7,
    },

});

export default ChangePasswordModal;












// //with pass current
// import React, { useState, useEffect } from 'react';
// import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
// import Toast from 'react-native-toast-message';

// const ChangePasswordModal = ({ isVisible, onClose, onChangePassword, initialEmail }) => {
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [email, setEmail] = useState(initialEmail);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [passwordsMatchError, setPasswordsMatchError] = useState('');
//     const [passwordsValid, setPasswordsValid] = useState(false);

//     const [currentPassword, setCurrentPassword] = useState('');
//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);

//     useEffect(() => {
//         setEmail(initialEmail);
//     }, [initialEmail]);

//     useEffect(() => {
//         if (!isVisible) {
//             setNewPassword('');
//             setConfirmPassword('');
//             setCurrentPassword('');
//             setShowCurrentPassword(false);
//             setShowPassword(false);
//             setShowConfirmPassword(false);
//             setPasswordsMatchError('');
//         }
//     }, [isVisible]);



//     const validatePassword = (password) => {
//         const minLength = 8;
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumber = /\d/.test(password);
//         const hasSymbol = /[!@#$%^&*]/.test(password);

//         let error = '';

//         if (password.length < minLength) {
//             error = 'Password should have at least 8 characters.';
//         } else if (!hasUpperCase) {
//             error = 'Include at least one uppercase letter.';
//         } else if (!hasNumber) {
//             error = 'Include at least one number.';
//         } else if (!hasSymbol) {
//             error = 'Include at least one special symbol.';
//         }

//         setPasswordsMatchError(error);
//         setPasswordsValid(!error);
//     };

//     const validateCurrentPassword = async () => {
//         try {
//             const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: initialEmail, password: currentPassword }),
//             });

//             if (response.ok) {
//                 // Password is correct
//                 console.log("True")
//                 setPasswordsMatchError(false);
//             } else {
//                 // Password is incorrect
//                 const errorData = await response.json();
//                 if (errorData.status === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
//                     setPasswordsMatchError(true);
//                     console.log("False")

//                 } else {
//                     setPasswordsMatchError(true);
//                     console.log("False 1")
//                 }
//             }
//         } catch (error) {
//             console.error('Error validating current password:', error);
//             // Handle error (e.g., network issue)
//             setPasswordsMatchError('Error validating current password. Please Check Your Connection.');
//         }
//     };

//     const handleConfirm = () => {
//         if (newPassword !== confirmPassword || passwordsMatchError) {
//             setPasswordsMatchError('New password and confirm password do not match or do not meet the criteria.');
//             return;
//         }

//         onChangePassword(newPassword, email);
//         onClose();

//         Toast.show({
//             type: 'success',
//             text1: 'Password Changed',
//             text2: 'Password changed successfully!',
//         });
//     };
//     return (
//         <Modal
//             transparent={true}
//             animationType="slide"
//             visible={isVisible}
//             onRequestClose={onClose}
//         >
//             <View style={styles.modalBackground}>
//                 <View style={styles.modalContainer}>
//                     <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
//                         <Ionicons name="ios-close" size={28} color="black" />
//                     </TouchableOpacity>

//                     <Text style={styles.modalText}>Change Password</Text>
//                     <TextInput
//                         placeholder="Enter your email"
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                         editable={false}
//                         style={styles.input}
//                     />
//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder=" Current Password"
//                             value={currentPassword}
//                             onChangeText={(text) => setCurrentPassword(text)}
//                             onBlur={validateCurrentPassword} // Validate current password on blur
//                             secureTextEntry={!showCurrentPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowCurrentPassword(!showCurrentPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showCurrentPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     {!passwordsMatchError ? <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder="New Password"
//                             value={newPassword}
//                             onChangeText={(text) => {
//                                 setNewPassword(text);
//                                 validatePassword(text);
//                             }}
//                             secureTextEntry={!showPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowPassword(!showPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View> : null}
//                     {!passwordsMatchError ? <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChangeText={(text) => {
//                                 setConfirmPassword(text);
//                                 validatePassword(text);
//                             }}
//                             onBlur={validatePassword} // Validate confirm password on blur
//                             secureTextEntry={!showConfirmPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showConfirmPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View> : null}

//                     <View style={styles.errorContainer}>
//                         {passwordsMatchError ? (
//                             <Text style={styles.errorText}>Unable to Valideate Current Password, Please Check!</Text>
//                         ) : null}
//                     </View>

//                     <View style={styles.buttonContainer}>
//                         {passwordsValid ? (
//                             <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
//                                 <Text style={styles.buttonText}>Confirm</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <View style={[styles.confirmButton, styles.disabledButton]}>
//                                 <Text style={styles.buttonText}>Confirm</Text>
//                             </View>
//                         )}
//                         <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
//                             <Text style={styles.buttonText}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             </View>
//         </Modal >
//     );
// };




// const styles = StyleSheet.create({
//     modalBackground: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContainer: {
//         width: 350,
//         backgroundColor: '#FFFFFF',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     closeIcon: {
//         position: 'absolute',
//         top: 20,
//         right: 10,
//     },
//     modalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'rgba(28, 30, 50, 1)',
//         marginBottom: 20,
//     },
//     input: {
//         width: '100%',
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C2EB',
//         borderRadius: 5,
//         fontSize: 16,
//         fontWeight: '500',

//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 20,
//     },
//     confirmButton: {
//         backgroundColor: '#C1C2EB',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//     },
//     cancelButton: {
//         backgroundColor: '#B7DDD2',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: 'rgba(28, 30, 50, 1)',
//     },
//     passwordContainer: {
//         position: 'relative',
//         width: '100%',
//     },
//     inputWithIcon: {
//         width: '100%',
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C2EB',
//         borderRadius: 5,
//         fontSize: 16,
//         fontWeight: '500',

//     },
//     showPasswordIcon: {
//         position: 'absolute',
//         top: '50%',
//         right: 10,
//         transform: [{ translateY: -12 }],
//     },
//     errorContainer: {
//         marginVertical: 10,
//         alignItems: 'center',
//     },
//     errorText: {
//         color: 'red',
//         fontWeight: 'bold',
//     },
//     passwordRequirements: {
//         color: '#555',
//     },
//     disabledButton: {
//         backgroundColor: '#A9A9A9',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//         opacity: 0.7,
//     },

// });

// export default ChangePasswordModal;





















// import React, { useState, useEffect } from 'react';
// import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Toast from 'react-native-toast-message';

// const ChangePasswordModal = ({ isVisible, onClose, onChangePassword, initialEmail }) => {
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [email, setEmail] = useState(initialEmail);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//     const [passwordsMatchError, setPasswordsMatchError] = useState('');
//     const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] = useState(false);
//     const [passwordsValid, setPasswordsValid] = useState(false);

//     useEffect(() => {
//         setEmail(initialEmail);
//     }, [initialEmail]);

//     useEffect(() => {
//         if (!isVisible) {
//             setNewPassword('');
//             setConfirmPassword('');
//             setCurrentPassword('');
//             setShowCurrentPassword(false);
//             setShowPassword(false);
//             setShowConfirmPassword(false);
//             setPasswordsMatchError('');
//         }
//     }, [isVisible]);

//     const debounce = (func, delay) => {
//         let inDebounce;
//         return function () {
//             const context = this;
//             const args = arguments;
//             clearTimeout(inDebounce);
//             inDebounce = setTimeout(() => func.apply(context, args), delay);
//         }
//     };

//     const validatePassword = (password) => {
//         const minLength = 8;
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumber = /\d/.test(password);
//         const hasSymbol = /[!@#$%^&*]/.test(password);

//         let error = '';

//         if (password.length < minLength) {
//             error = 'Password should have at least 8 characters.';
//         } else if (!hasUpperCase) {
//             error = 'Include at least one uppercase letter.';
//         } else if (!hasNumber) {
//             error = 'Include at least one number.';
//         } else if (!hasSymbol) {
//             error = 'Include at least one special symbol.';
//         }
//         const isValid = !passwordsMatchError && newPassword === confirmPassword && newPassword.length > 0;
//         setPasswordsValid(isValid);
//         setPasswordsMatchError(error);
//         setPasswordsValid(!error);
//     };

//     const validateCurrentPassword = async () => {
//         try {
//             const response = await fetch("http://35.154.235.224:9000/api/auth/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: initialEmail, password: currentPassword }),
//             });

//             if (response.ok) {
//                 // Password is correct
//                 setPasswordsMatchError('');
//                 setIsCurrentPasswordCorrect(true);
//             } else {
//                 // Password is incorrect
//                 const errorData = await response.json();
//                 if (errorData.status === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
//                     setPasswordsMatchError('Incorrect current password. Please try again.');
//                 } else {
//                     setIsCurrentPasswordCorrect(false);
//                     setPasswordsMatchError('Error validating current password. Please Check Your Credentials');
//                 }
//             }
//         } catch (error) {
//             console.error('Error validating current password:', error);
//             // Handle error (e.g., network issue)
//             setPasswordsMatchError('Error validating current password. Please Check Your Connection.');
//             setIsCurrentPasswordCorrect(false);
//         }
//     };

//     const handleConfirm = () => {
//         if (newPassword !== confirmPassword || passwordsMatchError) {
//             setPasswordsMatchError('New password and confirm password do not match or do not meet the criteria.');
//             return;
//         }

//         onChangePassword(newPassword, email);
//         onClose();

//         Toast.show({
//             type: 'success',
//             text1: 'Password Changed',
//             text2: 'Password changed successfully!',
//         });
//     };

//     const debouncedValidateCurrentPassword = debounce(validateCurrentPassword, 800);

//     return (
//         <Modal
//             transparent={true}
//             animationType="slide"
//             visible={isVisible}
//             onRequestClose={onClose}
//         >
//             <View style={styles.modalBackground}>
//                 <View style={styles.modalContainer}>
//                     <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
//                         <Ionicons name="ios-close" size={28} color="black" />
//                     </TouchableOpacity>

//                     <Text style={styles.modalText}>Change Password</Text>
//                     <TextInput
//                         placeholder="Enter your email"
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                         editable={false}
//                         style={styles.input}
//                     />
//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder=" Current Password"
//                             value={currentPassword}
//                             onChangeText={(text) => {
//                                 setCurrentPassword(text);
//                                 debouncedValidateCurrentPassword();

//                             }}
//                             // onBlur={validateCurrentPassword} // Validate current password on blur
//                             secureTextEntry={!showCurrentPassword}

//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowCurrentPassword(!showCurrentPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showCurrentPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder="New Password"
//                             value={newPassword}
//                             onChangeText={(text) => {
//                                 setNewPassword(text);
//                                 validatePassword(text);
//                             }}
//                             secureTextEntry={!showPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowPassword(!showPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChangeText={(text) => {
//                                 setConfirmPassword(text);
//                                 validatePassword(text);
//                             }}
//                             onBlur={validatePassword}
//                             secureTextEntry={!showConfirmPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showConfirmPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.errorContainer}>
//                         {passwordsMatchError ? (
//                             <Text style={styles.errorText}>{passwordsMatchError}</Text>
//                         ) : null}
//                     </View>

//                     <View style={styles.buttonContainer}>
//                         {passwordsValid ? (
//                             <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
//                                 <Text style={styles.buttonText}>Confirm</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
//                                 <Text style={styles.buttonText}>Cancel</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                 </View>
//             </View>
//         </Modal >
//     );
// };




// const styles = StyleSheet.create({
//     modalBackground: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContainer: {
//         width: 350,
//         backgroundColor: '#FFFFFF',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     closeIcon: {
//         position: 'absolute',
//         top: 20,
//         right: 10,
//     },
//     modalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'rgba(28, 30, 50, 1)',
//         marginBottom: 20,
//     },
//     input: {
//         width: '100%',
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C2EB',
//         borderRadius: 5,
//         fontSize: 16,
//         fontWeight: '500',

//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 20,
//     },
//     confirmButton: {
//         backgroundColor: '#C1C2EB',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//     },
//     cancelButton: {
//         backgroundColor: '#B7DDD2',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: 'rgba(28, 30, 50, 1)',
//     },
//     passwordContainer: {
//         position: 'relative',
//         width: '100%',
//     },
//     inputWithIcon: {
//         width: '100%',
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C2EB',
//         borderRadius: 5,
//         fontSize: 16,
//         fontWeight: '500',

//     },
//     showPasswordIcon: {
//         position: 'absolute',
//         top: '50%',
//         right: 10,
//         transform: [{ translateY: -12 }],
//     },
//     errorContainer: {
//         marginVertical: 10,
//         alignItems: 'center',
//     },
//     errorText: {
//         color: 'red',
//         fontWeight: 'bold',
//     },
//     passwordRequirements: {
//         color: '#555',
//     },
//     disabledButton: {
//         backgroundColor: '#A9A9A9',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//         opacity: 0.7,
//     },

// });

// export default ChangePasswordModal;











//old wo current pass
// import React, { useState, useEffect } from 'react';
// import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
// import Toast from 'react-native-toast-message';

// const ChangePasswordModal = ({ isVisible, onClose, onChangePassword, initialEmail }) => {
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [email, setEmail] = useState(initialEmail);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [passwordsMatchError, setPasswordsMatchError] = useState('');
//     const [passwordsValid, setPasswordsValid] = useState(false);




//     useEffect(() => {
//         setEmail(initialEmail);
//     }, [initialEmail]);

//     useEffect(() => {
//         if (!isVisible) {
//             setNewPassword('');
//             setConfirmPassword('');
//             setShowPassword(false);
//             setShowConfirmPassword(false);
//             setPasswordsMatchError('');
//         }
//     }, [isVisible]);



//     const validatePassword = (password) => {
//         const minLength = 8;
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumber = /\d/.test(password);
//         const hasSymbol = /[!@#$%^&*]/.test(password);

//         let error = '';

//         if (password.length < minLength) {
//             error = 'Password should have at least 8 characters.';
//         } else if (!hasUpperCase) {
//             error = 'Include at least one uppercase letter.';
//         } else if (!hasNumber) {
//             error = 'Include at least one number.';
//         } else if (!hasSymbol) {
//             error = 'Include at least one special symbol.';
//         }

//         setPasswordsMatchError(error);
//         setPasswordsValid(!error);
//     };

//     const handleConfirm = () => {
//         if (newPassword !== confirmPassword || passwordsMatchError) {
//             setPasswordsMatchError('New password and confirm password do not match or do not meet the criteria.');
//             return;
//         }

//         onChangePassword(newPassword, email);
//         onClose();

//         Toast.show({
//             type: 'success',
//             text1: 'Password Changed',
//             text2: 'Password changed successfully!',
//         });
//     };

//     return (
//         <Modal
//             transparent={true}
//             animationType="slide"
//             visible={isVisible}
//             onRequestClose={onClose}
//         >
//             <View style={styles.modalBackground}>
//                 <View style={styles.modalContainer}>
//                     <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
//                         <Ionicons name="ios-close" size={28} color="black" />
//                     </TouchableOpacity>

//                     <Text style={styles.modalText}>Change Password</Text>
//                     <TextInput
//                         placeholder="Enter your email"
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                         editable={false}
//                         style={styles.input}
//                     />
//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder="New Password"
//                             value={newPassword}
//                             onChangeText={(text) => {
//                                 setNewPassword(text);
//                                 validatePassword(text);
//                             }}
//                             secureTextEntry={!showPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowPassword(!showPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChangeText={(text) => {
//                                 setConfirmPassword(text);
//                                 validatePassword(text);
//                             }}
//                             secureTextEntry={!showConfirmPassword}
//                             style={styles.inputWithIcon}
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                             style={styles.showPasswordIcon}
//                         >
//                             <Ionicons
//                                 name={showConfirmPassword ? 'ios-eye' : 'ios-eye-off'}
//                                 size={24}
//                                 color="#555"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.errorContainer}>
//                         {passwordsMatchError ? (
//                             <Text style={styles.errorText}>{passwordsMatchError}</Text>
//                         ) : null}
//                     </View>

//                     <View style={styles.buttonContainer}>
//                         {passwordsValid ? (
//                             <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
//                                 <Text style={styles.buttonText}>Confirm</Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <View style={[styles.confirmButton, styles.disabledButton]}>
//                                 <Text style={styles.buttonText}>Confirm</Text>
//                             </View>
//                         )}
//                         <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
//                             <Text style={styles.buttonText}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             </View>
//         </Modal >
//     );
// };
// const styles = StyleSheet.create({
//     modalBackground: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContainer: {
//         width: 350,
//         backgroundColor: '#FFFFFF',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     closeIcon: {
//         position: 'absolute',
//         top: 20,
//         right: 10,
//     },
//     modalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'rgba(28, 30, 50, 1)',
//         marginBottom: 20,
//     },
//     input: {
//         width: '100%',
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C2EB',
//         borderRadius: 5,
//         fontSize: 16,
//         fontWeight: '500',

//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 20,
//     },
//     confirmButton: {
//         backgroundColor: '#C1C2EB',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//     },
//     cancelButton: {
//         backgroundColor: '#B7DDD2',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: 'rgba(28, 30, 50, 1)',
//     },
//     passwordContainer: {
//         position: 'relative',
//         width: '100%',
//     },
//     inputWithIcon: {
//         width: '100%',
//         marginVertical: 10,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C2EB',
//         borderRadius: 5,
//         fontSize: 16,
//         fontWeight: '500',

//     },
//     showPasswordIcon: {
//         position: 'absolute',
//         top: '50%',
//         right: 10,
//         transform: [{ translateY: -12 }],
//     },
//     errorContainer: {
//         marginVertical: 10,
//         alignItems: 'center',
//     },
//     errorText: {
//         color: 'red',
//     },
//     passwordRequirements: {
//         color: '#555',
//     },
//     disabledButton: {
//         backgroundColor: '#A9A9A9',
//         padding: 10,
//         borderRadius: 5,
//         margin: 10,
//         opacity: 0.7,
//     },

// });

// export default ChangePasswordModal;



