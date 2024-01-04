import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Card, Button } from "react-native-paper";
import { TextInput } from '@react-native-material/core';
import Toast from "react-native-toast-message"
import { useSelector } from "react-redux";
import { styles } from './Styles';


const Deposit = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [deposite, setDeposite] = useState({userId:""});
  const [user, userId] = useState({ID: "",});
  const [error, setError] = useState('');

  const { token } = useSelector((state) => state.auth);


  const handleDepositClick = () => {

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setError('');
    setDeposite('');
    
  };

  const closeModal1 = () => {
    setModalVisible1(false);
    setError('');
    setDeposite('');
    
  };

  const hideupdatename = () => {
    closeModal()
    setModalVisible(false)
  }

  const handleWithdrawClick = () => {
    setModalVisible1(true);
  };


const performTransactionAPI = async (transactionType) => {
  const amount = parseFloat(deposite);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter an amount more than zero.');
      return;
    }


  try {
    const data1 = {
      user_id: user.ID,
      balance: -deposite,
      currency: "INR",
      oversee_id: user.ID,
    };
   const data = {
      user_id: user.ID,
      balance: deposite,
      currency: "INR",
      oversee_id: user.ID,
    };
    console.log("Response2:", user.ID,deposite);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify(data);
    const raw1 = JSON.stringify(data1);

    let requestOptions;

    if (transactionType === 'deposite') {
     
    


      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      console.log("Response2:", performTransactionAPI);

      const response = await fetch('http://192.168.0.73:8000/user/applyBalance', requestOptions);

      console.log(`${transactionType} API response:`, response.status, response.statusText);

      if (response.ok) {

        //const response:
        console.log("Response2:", user.ID,deposite);
        hideupdatename();
        setError('');
        setDeposite('');
        Toast.show({
          type: "success",
          text1: `Deposit And Request Sent Succesfull`,
        });
        
        const data = await response.json();

       

      } else {
        console.error(`${transactionType} API error response:`, await response.text());
       
        Toast.show({
          type: "error",
          text1: `Failed Depoist`,
        });
      //  hideConfirmation();
      }
    } else if (transactionType === 'withdraw') {
      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw1,
        redirect: 'follow',
      };

      const response = await fetch('http://192.168.0.73:8000/user/applyBalance', requestOptions);

      console.log(`${transactionType} API response:`, response.status, response.statusText);

      if (response.ok) {

        console.log("Response1:", user.ID,deposite);
        setError('');
        setDeposite('');
        closeModal1();
        Toast.show({
          type: "success",
          text1: `Withdraw And Request Sent Succesfull`,
        });

      } else {
        closeModal1();
        Toast.show({
          
          type: "error",
          text1: `Insufficient Funds!`,
        });
      }
    }
  } catch (err) {
    console.error(`${transactionType} API error:`, err);
    //setError('Network error. Please check your internet connection.');
  } 
};





 useEffect(() => {
    fetchData();
  }, [token]);

 


const fetchData = async () => {
    try {
      const response = await fetch('http://35.154.235.224:9000/api/user/profile', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const result = await response.json();
        userId({
          ID: result.UserID,
        })
        console.log("------------------>",user.ID)
      } else {
        console.error('Error fetching profile:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



   
 return (
    <View>
      <View style={styles.container3}>
        <TouchableOpacity onPress={handleDepositClick} style={styles.ellipse}>
          <View style={styles.circle}>
            <Ionicons name="arrow-down-outline" size={30} color="black" />
          </View>
          <Text style={[styles.text, styles.withdrawText2]}>Deposit</Text>
        </TouchableOpacity>

        
        <View style={styles.spacing} />
        
        <TouchableOpacity onPress={handleWithdrawClick} style={styles.ellipse}>

        <Text style={[styles.text, styles.withdrawText]}>Withdraw</Text>
        <View style={styles.circle}>
          <Ionicons name="arrow-up-outline" size={30} color="black" />
        </View>
      </TouchableOpacity>

      <Modal  transparent={true} isVisible={isModalVisible1}>
         <Card style={styles.cardContainer4}>
         <Text style={styles.conform}>
            Withdraw
        </Text>

         <TextInput
            variant="standard" 
            placeholder="Enter Amount"
            value={(deposite)}
              onChangeText={(text) => setDeposite(text)}
            style={{ top: 12, margin: 16, width: '87%', left: 1 }}
          />
          {error ? (
           <Text style={{ color: 'red', margin: 5, left:10 }}>{error}</Text>
         ) : null}
           <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                    onPress={() => performTransactionAPI('withdraw')}
                    labelStyle={styles.buttonText}
                  >
                    Withdraw
                  </Button>
              </View>
              <View style={styles.button2}>
                <Button
                    onPress={closeModal1}
                    labelStyle={styles.buttonText1}
                >
                    Cancel
                </Button>
              </View>
            </View>
          </Card>
        </Modal>
      </View>
      <Modal transparent={true} isVisible={isModalVisible} >
         <Card style={styles.cardContainer4}>
          <View style={styles.row}>
         <Text style={styles.conform}>
            Deposit
        </Text>
        </View>

         <TextInput
            variant="standard" 
            placeholder="Enter Amount"
            value={deposite}
             // onChangeText={(text) => setDeposite(text)}
             onChangeText={(text) => {
              setDeposite(text);
              if (text !== '') {
                setError(''); // Reset error when user starts typing
              }
            }}
            style={{ top: 12, margin: 10, width: '87%', left: 5 }}
          />

        {error ? (
           <Text style={{ color: 'red', margin: 5, left:10 }}>{error}</Text>
         ) : null}
            
             <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                     onPress={() => performTransactionAPI('deposite')} 
                    labelStyle={styles.buttonText}
                  >
                    Deposit
                  </Button>
              </View>
              <View style={styles.button2}>
                <Button
                    onPress={closeModal}
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


export default Deposit;


{/* <Withdraw  withdraw={presswithdraw} setWithdraw={deposite}/> */}

// const presswithdraw = () => {
//   performTransactionAPI('withdraw')
// }