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

const Changename = ({ isVisible, onClose, ID , apiData, setApiData1 }) => {
const navigation = useNavigation();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);


const { token } = useSelector((state) => state.auth);



const handleButtonPress = () => {
    onClose();
    setFirstname('');
    setLastname('');
  };

  const hideupdatename = () => {
    handleButtonPress()
     
  }

  useEffect(() => {
    fetchData();
  }, [token]);


  const updateName = async () => {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstname, // Replace with the actual firstname
        lastName: lastname, // Replace with the actual lastname
        Currenc1y: 'INR', // Replace with the actual currency
      }),
    };

    console.log("------------------>",firstname,lastname)
    try {
      const response = await fetch(
        'http://35.154.235.224:9000/api/user/updateProfile', // Replace with your actual API endpoint
        requestOptions
      );

      const result = await response.text();
     // setUpdateResult(result);
      hideupdatename();
      Toast.show({
        type: "success",
        text1: `Name Changed Succesfull`,
      });
      fetchData();
      setFirstname('');
      setLastname('');
      //setShowDeleteModal(false)
    } catch (error) {
      console.error('Error:', error);
    }
   };
 
  

   useEffect(() => {
      fetchData();
   }, [token, firstname, lastname]);


   const fetchData = async () => {
    try {
      const response = await fetch(
        "http://35.154.235.224:9000/api/user/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setApiData1({
          FirstName: result.FirstName,
          LastName: result.LastName,
          //LastName: result.LastName,
          //console.log("---->",FirstName)
        })
        
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <View>
      <Modal animationType="slide" transparent={true} isVisible={isVisible} onRequestClose={onClose}>
         <Card style={styles.cardContainer4}>
         <Text style={styles.conform}>
            Update Name
        </Text>

         <TextInput
            variant="standard" 
            placeholder="Firstname"
           // label="Outlined"
            value={firstname}
            // onChangeText={(text) => {
              onChangeText={(text) => setFirstname(text)}
            style={{ top: 12, margin: 16, width: '87%', left: 5 }}
          />

          <TextInput
            variant="standard" 
            placeholder="Lastname"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            style={{ top: 4, margin: 16, width: '87%', left: 5  }}
          />
            
             <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                    onPress={updateName}
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
      marginLeft: 10,
    },
    buttonText: {
      paddingTop: 4,
      paddingRight: 15,
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      fontSize: 16,
      left: 6,
      fontWeight: '500',
    },
    conform: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 19.09,
      color: "rgba(28, 30, 50, 1)",
      top: 15,
    },
  
    conform1: {
      paddingBottom: 20,
      textAlign: "center",
      fontWeight: '600',
      fontSize: 16,
      top: 15,
    },
  
    button1: {
      paddingLeft: 5,
      //width: "47%",
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
  
  export default Changename;
