import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { TextInput } from '@react-native-material/core';
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Card, Button } from "react-native-paper";
import { setEmail, setToken } from "../redux/actions/authActions";
import Toast from "react-native-toast-message"
import { useSelector } from "react-redux";






const Changepassword = ({ isVisible, onClose, ID }) => {
const navigation = useNavigation();

//const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
const [currentPassword, setcurrentPassword] = useState('');
const [newPassword, setnewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [password, setPassword] = useState('');

const { token } = useSelector((state) => state.auth);

  const hideupdatepassword = () => {
    setShowUpdatePasswordModal(false)
}


const handleButtonPress = () => {
  setcurrentPassword('');
  setConfirmPassword('')
  setnewPassword('')
    // Implement the behavior when a button is pressed inside AnotherModal
    // For example, you can close the modal
    onClose();
  };

  const hideupdatename = () => {
    
    // setEmail('');
    // setcurrentPassword('');
    // setConfirmPassword('')
    // setnewPassword('')
   handleButtonPress()
  }


const updatepassword = async () => {
    //const token = 'your_token_here'; // Replace with your actual token
    console.log("------------------>",ID,currentPassword,newPassword)
    if(newPassword === confirmPassword){
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          //email: email,
          user_id: ID, // Replace with the actual firstname
          current_password: currentPassword, // Replace with the actual lastname
          new_password: newPassword, // Replace with the actual currency
          //new_password: newPassword,
        }),
      };
  
      console.log("------------------>",ID,currentPassword,newPassword)
      try {
        const response = await fetch(
          'http://35.154.235.224:8000/update-password-userid', // Replace with your actual API endpoint
          requestOptions
        );
  
        const result = await response.text();
       // setUpdateResult(result);
        hideupdatepassword();
        hideupdatename();
        setPassword();
        //fetchData();
        Toast.show({
          type: "success",
          text1: `Password Changed Succesfull`,
        });
        setEmail('');
        setcurrentPassword('');
        setConfirmPassword('')
        setnewPassword('')
       // setnewPassword('');

      } catch (error) {
        console.error('Error:', error);
        Toast.show({
          type: "error",
          text1: `Failed Updating Password`,
        });
        setcurrentPassword('');
        setConfirmPassword('')
        setnewPassword('')
      }
    }
    else{
        console.log("------------------>",ID,currentPassword,newPassword)
      console.error("Password Not Match")
      // Toast New password and confirm password should me same
      Toast.show({
        type: "error",
        text1: `New password and confirm password should me same`,
      });
      setcurrentPassword('');
      setConfirmPassword('')
      setnewPassword('')
    }
   };
 


  return (
    <View>
      <Modal animationType="slide" isVisible={isVisible} onRequestClose={onClose}>
         <Card style={styles.cardContainer4}>
         <Text style={styles.conform}>
            Update Password
        </Text>

         <TextInput
         secureTextEntry={true}
            variant="standard" 
            placeholder="Current Passward"
            value={password}
              onChangeText={(text) => setPassword(text)}
              style={{ top: 12, margin: 16, width: '87%', left: 5 }}
          />

          <TextInput
          secureTextEntry={true}
            variant="standard" 
            placeholder="New Password"
            value={newPassword}
            onChangeText={(text) => setnewPassword(text)}
            style={{ top: 4, margin: 16, width: '87%', left: 5  }}
          />

          {/* Input field 2 */}
          <TextInput
            secureTextEntry={true}
            variant="standard" 
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={{ top: 4, margin: 16, width: '87%', left: 5  }}
          />
            
             <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                    onPress={updatepassword}
                    labelStyle={styles.buttonText}
                  >
                    Update 
                  </Button>
              </View>
              <View style={styles.button2}>
                <Button
                    onPress={handleButtonPress}
                    labelStyle={styles.buttonText1}
                >
                    Cancel
                </Button>
              </View>
            </View>
          </Card>
      </Modal>
      </View>
  );
};


const styles = StyleSheet.create({
    
    buttonList: {
      flex: 1,
      paddingTop: 10,
      width: "100%",
      backgroundColor: "#f5f5f5",
    },
    button: {
      marginBottom: 4,
      backgroundColor: "#f5f5f5",
      width: "100%",
    },
    buttons: {
      justifyContent: 'center',
      paddingTop: 17,
      flexDirection: "row",
     // marginLeft: 10,
    },
    buttonText: {
      paddingTop: 4,
      paddingRight: 15,
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      fontSize: 16,
      fontWeight: "500",
      left: 8,
    },
    conform: {
      textAlign: "center",
      // fontWeight: '900',
      // fontSize: 18,
      top: 15,
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 19.09,
      color: "rgba(28, 30, 50, 1)",
    },
  
    conform1: {
      paddingBottom: 20,
      textAlign: "center",
      fontWeight: '600',
      fontSize: 16,
      top: 15,
    },
  
    button1: {
      //paddingLeft: 5,
    //  width: "47%",
      height: 47,
      backgroundColor: "#8c94de",
      borderRadius: 5,
    },
    button2: {
      left: 10,
     // width: "47%",
      height: 47,
      backgroundColor: "#B7DDD2",
      borderRadius: 5,
    },
    buttonText1: {
      fontWeight: "500",
      paddingTop: 4,
      alignItems: "center",
      color: "black",
      fontSize: 16,
      Left: 15,
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#E3E9F0",
      borderRadius: 10,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: 12,
    },
    cardContainer4: {
      backgroundColor: "white",
      width: "95%",
      marginHorizontal: 10,
      paddingVertical: 9,
    },

  });
  
  export default Changepassword;
