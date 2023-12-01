import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
import { TextInput } from '@react-native-material/core';
import { Input } from 'react-native-elements';
import Modal from 'react-native-modal';


const sell = ({ route , navigation }) => {
  const { token } = useSelector((state) => state.auth);
  console.log('Buy', token);


  const { sname, LastPrice, instrumentId ,Quantities, instrumentType, quantity, Instrument,sellType, quantity1, goback, buttonColor} = route.params;
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [quantiti, setQuantity] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  //const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [sellTypes, setSellType] = useState(''); // Set your initial sellType
  //const [Quantities, setQuantities] = useState(/* Initial value */);
  //const [latestQuantities, setLatestQuantities] = useState(Quantities);
  const [latestQuantities, setLatestQuantities] = useState(Quantities);

  // const fetchData = async (url, options) => {
  //   const response = await fetch(url, options);
  //   const data = await response.json();
  //   return data;
  // };



  const performTransaction = (sellType) => {
    performTransactionAPI(sellType);
    // Your transaction logic goes here
    console.log('Transaction performed');
    hideConfirmation();
};


  const showConfirmation = () => {
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setConfirmationVisible(false);
  };


  const performTransactionAPI = async (transactionType) => {
    setLoading(true);
    setError('');

    const availableQuantity = Quantities;

    try {
      const data = {
        instrumentId: parseInt(instrumentId),
        instrumentType: instrumentType,
        quantity: parseInt(quantiti),
      };

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const raw = JSON.stringify(data);

      let requestOptions;

      if (transactionType === 'sell') {
        if (parseInt(quantiti) > availableQuantity) {
          setError(`Cannot sell more than available quantity (${availableQuantity}).`);

          
          setLoading(false);
          return;
        }


        requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        
        console.log("Response2:", performTransactionAPI);

        const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

        console.log(`${transactionType} API response:`, response.status, response.statusText);

        if (response.ok) {
          
          setIsRegistered(true);
          //const data = await response.json();
        //  return data.quantities;
          const data = await response.json();
          const updatedQuantities = data.quantities;
          setLatestQuantities(updatedQuantities);
          
          
        } else {
          console.error(`${transactionType} API error response:`, await response.text());
          setError(`Please enter Quantity`);
        }
      } else if (transactionType === 'buy') {
        requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);

        console.log(`${transactionType} API response:`, response.status, response.statusText);

        if (response.ok) {
          setIsRegistered(true);
          const updatedPortfolio = await portfolioResponse.json();
          navigation.navigate('ViewPortfolio', { portfolio: updatedPortfolio });
        
        } else {
          console.error(`${transactionType} API error response:`, await response.text());
          setError(`Please enter Quantity`);
        }
      }
    } catch (err) {
      console.error(`${transactionType} API error:`, err);
      setError('Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
   
  };


  useEffect(() => {
   // Call performTransactionAPI with the desired transactionType, e.g., 'sell' or 'buy'
    performTransactionAPI('sell'); // Assuming you want to trigger this on component mount

  }, [token, Quantities]); // Depende
  useEffect(() => {
    // Call performTransactionAPI with the desired transactionType, e.g., 'sell' or 'buy'
     performTransactionAPI('buy'); // Assuming you want to trigger this on component mount
 
     // If you want to trigger this useEffect based on some specific condition or dependency change,
     // you can include that dependency in the dependency array of useEffect.
     // For example: [token] if you want to execute it when the token changes.
 
   }, [token]); // Dependen


  const goBack = () => {
   
    navigation.goBack(); 
  }

 return (
  <View style={styles.container}>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{Instrument}</Text>
      </View>

     
      <Card style={styles.cardContainer}>
        <View style={styles.row}>
          <Text style={styles.info1}>{sname}</Text>
        </View>
      </Card>

      {/* Separate Card for each set of information */}
      <View style={styles.row1}>
      <Card style={styles.cardContainer1}>
        
          <Text style={styles.label}>LastPrice</Text>
          <Text style={styles.info}>{LastPrice}</Text>
         
      </Card>

      <Card style={styles.cardContainer1}>
       
          <Text style={styles.label}>Instrument Type</Text>
          <Text style={styles.info}>{instrumentType}</Text>
        
      </Card>
    
    </View>
    <View style={styles.row1}>
     
      <Card style={styles.cardContainer1}>
       
          <Text style={styles.label}>Quantity</Text>
          <Text style={styles.info}>{Quantities}</Text>
     
      </Card>

      <Card style={styles.cardContainer1}>
      
          <Text style={styles.label1}>Enter {quantity1} Quantity:</Text>
           <Input
           value={quantity}
           onChangeText={(text) => setQuantity(text)}
           keyboardType="numeric"
           containerStyle={{ width: 80, marginLeft:  29, marginHorizontal: 9 }}
           inputStyle={{ width: 100, textAlign: 'center'  }}
           inputContainerStyle={{
           borderBottomColor: isFocused ? 'blue' : 'green',
           borderBottomWidth: 2,
          }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
       
        
      </Card>
      
      </View>
      {isRegistered ? (
        <Text style={styles.successText}>{sname} {quantity1} SUCCESSFULL!</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
       <TouchableOpacity style={[styles.sellButton, { backgroundColor: buttonColor }]} onPress={showConfirmation} disabled={loading}>
          <Text style={styles.Sell}>{Instrument}</Text>
        </TouchableOpacity>
       
        {/* Confirmation Modal */}
        <Modal isVisible={isConfirmationVisible}>
        <Card style={styles.cardContainer4}>
            <Text style={styles.questio}>Do you want to perform a transaction for {Instrument}?</Text>
            <View style={styles.buttons}>

        <View style={styles.button1}>
          <Button onPress={() => performTransaction(sellType)} contentStyle={styles.buttonContent}
            labelStyle={styles.buttonText}>
               Yes
          </Button>
     </View>
     <View style={styles.button2}>
     <Button onPress={hideConfirmation} contentStyle={styles.buttonContent1}
           labelStyle={styles.buttonText1} >
            No
     </Button>
     </View>
  </View>
            
        
      
       
         
            </Card>
        </Modal>
        
     </View>
   
      

  );
};
const styles = {
  container: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    backgroundColor: 'white'
  },
  navBar: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer1:{
   //flex: 1,
    width : '49%',
    alignItems: 'center',
    
    textAlign: 'center',
    //flexDirection: 'row',
    height: 80,
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff', 
  },
  row1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row:{
    flexDirection: 'row',
  }, 
  info: {
    bottom: 5,
    textAlign: 'center',
   // alignItems: 'center',
  
  },
  label1: {
    flexDirection: 'row',
   // flex: 1,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  input: {
    top: 5,
    left: 8,
    flex: 1,
    flexDirection:'row',
    //height: 40, // Adjust this value to make it smaller
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  successText:{
    color: 'green'
  },

  cardContainer: {  
    borderTopLeftRadius: 0, // If you want to customize top-left radius
    borderTopRightRadius: 0, // If you want to customize top-right radius
    borderBottomLeftRadius: 140, // Customize bottom-left radius
    borderBottomRightRadius: 140, // Customize bottom-right radius
   // elevation: 3, // Adjust elevation as needed
    marginBottom: 10, // Add margin as needed
    marginVertical: 5,
    padding: 50,
    backgroundColor: '#fff',
  },
  
  label: {
    paddingVertical: 12,
    // flex: 1,
   // textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
   // top: 5
  },
  info1: {
    flex: 1,
    textAlign:'center',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
      sellButton: {
     // backgroundColor: '#5f4a78',
      alignItems: 'center',
      //marginTop: 80,
      padding: 10,
      borderRadius: 6,
      marginVertical: 150,
      marginHorizontal: 3
    },
    Sell: {
      color: 'white',
      fontSize: 20,
    },
    buttons: {
      paddingVertical: 15,
       justifyContent: 'center',
      // justifyContent: 'space-around',
      flexDirection: 'row',
     /// marginLeft: -11
    },
    button1:{
      paddingHorizontal: 3
    },
    cardContainer4:{
      //height: 60,
      width: '90%',
      marginHorizontal: 30
    },
    buttonContent: {
      paddingHorizontal: 10,
      backgroundColor: '#8f8bcc', // Customize the button background color
      paddingVertical: 4,
      paddingHorizontal: 50,
      paddingLeft: 26,
      //borderRadius: Border.br_81xl,
    },
    buttonContent1: {
      backgroundColor: '#7bb2b5', // Customize the button background color
      paddingVertical: 6,
      paddingHorizontal: 40,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      left: 8
    },
    buttonContent1: {
      backgroundColor: '#7bb2b5', // Customize the button background color
      paddingVertical: 4,
      paddingHorizontal: 40,
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
    questio:{
      paddingVertical: 6,
      marginHorizontal: 15
    },
    error: {
      color: 'red', // Default error color
    },
    sellError: {
      color: 'green', // Color for 'sell' transaction error
      // Add any additional styles for 'sell' transaction error
    },
};





export default sell;




// import React,  { useState , useEffect } from 'react';
// import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Ionicons } from '@expo/vector-icons';
// import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { Input } from 'react-native-elements';

// const sell = ({ route }) => {
//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);

//   const { sname, LastPrice, instrumentId ,Quantities, instrumentType, quantity, Instrument,sellType, quantity1} = route.params;
 
//   const [quantiti, setQuantity] = useState(0); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const [confirmationVisible, setConfirmationVisible] = useState(false);
//   const [sellTypes, setSellType] = useState(''); // Set your initial sellType
//   //const [Quantities, setQuantities] = useState(/* Initial value */);
  
//   const increaseQuantity = () => {
//     setQuantity(quantiti + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantiti > 0) {
//       setQuantity(quantiti - 1);
//     }
//   };

//   const performTransaction1 = (type) => {
//     setSellType(type);
//     setConfirmationVisible(true);
//   };

//   const handleBuy = () => {
//     // Logic to handle the buy action
//     console.log('Buy pressed');
//     setConfirmationVisible(true);
//   };

//   const handleCancel = () => {
//     // Logic to handle the cancel action
//     console.log('Cancel pressed');
//     setConfirmationVisible(false);
//   };




  


//   useEffect(() => {
//     performTransaction(sellType);
//   }, [isRegistered, sellType]); // Listen for changes in isRegistered

//   const performTransaction = async (transactionType) => {
//     setLoading(true);
//     setError('');

//     const availableQuantity = Quantities;

//     try {
//       const data = {
//         instrumentId: parseInt(instrumentId),
//         instrumentType: instrumentType,
//         quantity: parseInt(quantiti),
//       };

//       const myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       const raw = JSON.stringify(data);

//       let requestOptions;

//       if (transactionType === 'sell') {
//         if (parseInt(quantiti) > availableQuantity) {
//           setError(`Cannot sell more than available quantity (${availableQuantity}).`);
//           setLoading(false);
//           return;
//         }


//         requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow',
//         };

//         const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

//         console.log(`${transactionType} API response:`, response.status, response.statusText);

//         if (response.ok) {
//           setIsRegistered(true);
//           const responseData = await response.json();
//           const updatedQuantities = responseData.updatedQuantity;
//           setQuantity(updatedQuantities);
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`Please enter Quantity. Please try again.`);
//         }
//       } else if (transactionType === 'buy') {
//         requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow',
//         };

//         const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);

//         console.log(`${transactionType} API response:`, response.status, response.statusText);

//         if (response.ok) {
//           setIsRegistered(true);
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`Please enter Quantity. Please try again.`);
//         }
//       }
//     } catch (err) {
//       console.error(`${transactionType} API error:`, err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

   

//   return (
// <View style={styles.container}>
//       <View style={styles.navBar}>
//         <TouchableOpacity onPress={() => {}}>
//           <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
//         </TouchableOpacity>
//         <Text style={styles.navTitle}>{Instrument}</Text>
//       </View>

     
//       <Card style={styles.cardContainer}>
//         <View style={styles.row}>
//           <Text style={styles.info1}>{sname}</Text>
//         </View>
//       </Card>

//       {/* Separate Card for each set of information */}
//       <View style={styles.row1}>
//       <Card style={styles.cardContainer1}>
        
//           <Text style={styles.label}>LastPrice</Text>
//           <Text style={styles.info}>{LastPrice}</Text>
         
//       </Card>

//       <Card style={styles.cardContainer1}>
       
//           <Text style={styles.label}>Instrument Type</Text>
//           <Text style={styles.info}>{instrumentType}</Text>
        
//       </Card>
    
//     </View>
//     <View style={styles.row1}>
     
//       <Card style={styles.cardContainer1}>
       
//           <Text style={styles.label}>Quantity</Text>
//           <Text style={styles.info}>{Quantities}</Text>
     
//       </Card>

//       <Card style={styles.cardContainer1}>
//       <View style={styles.row1}>
//           <Text style={styles.label1}>Enter {quantity1} Quantity:</Text>
//            <Input
//            value={quantity}
//            onChangeText={(text) => setQuantity(text)}
//            keyboardType="numeric"
//            containerStyle={{ width: 70, left: -2 }}
//            inputStyle={{ width: 100, textAlign: 'center' }}
//            inputContainerStyle={{
//            borderBottomColor: isFocused ? 'blue' : 'green',
//            borderBottomWidth: 2,
//           }}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//       />

//         </View>
        
//       </Card>
//       </View>
//       {isRegistered ? (
//         <Text style={styles.successText}>{sname} transaction successful!</Text>
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : null}
//      <TouchableOpacity
//         style={styles.sellButton}
//         onPress={() => performTransaction(sellType)}
//         disabled={loading}
//       >
//         <Text style={styles.Sell}>{Instrument}</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };
// const styles = {
//   container: {
//     flex: 1,
//     top: 1,
//     padding: 5,
//     backgroundColor: 'white'
//   },
//   navBar: {
//     marginTop: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginBottom: 10,
//   },
//   backIcon: {
//     marginRight: 10,
//   },
//   navTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   cardContainer1:{
//    //flex: 1,
//     width : '49%',
//     alignItems: 'center',
    
//     textAlign: 'center',
//     //flexDirection: 'row',
//     height: 80,
//     marginVertical: 5,
//     padding: 17,
//     borderRadius: 10,
//     backgroundColor: '#fff', 
//   },
//   row1:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   row:{
//     flexDirection: 'row',
//   }, 
//   info: {
//     textAlign: 'center',
//    // alignItems: 'center',
  
//   },
//   label1: {
//     alignItems: 'center',
//     top: 14,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//   },
//   input: {
//     top: 5,
//     left: 8,
//     flex: 1,
//     flexDirection:'row',
//     //height: 40, // Adjust this value to make it smaller
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 20,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },

//   cardContainer: {  
//     borderTopLeftRadius: 0, // If you want to customize top-left radius
//     borderTopRightRadius: 0, // If you want to customize top-right radius
//     borderBottomLeftRadius: 140, // Customize bottom-left radius
//     borderBottomRightRadius: 140, // Customize bottom-right radius
//    // elevation: 3, // Adjust elevation as needed
//     marginBottom: 10, // Add margin as needed
//     marginVertical: 5,
//     padding: 50,
//     backgroundColor: '#fff',
//   },
  
//   label: {
//    flex: 1,
//    // textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//    // top: 5
//   },
//   info1: {
//     flex: 1,
//     textAlign:'center',
//     fontSize: 19,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//   },
//       sellButton: {
//       backgroundColor: '#A9A9A9',
//    //   justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 80,
//       padding: 10,
//       borderRadius: 6,
//       marginHorizontal: 3
//     },
//     Sell: {
//       color: 'white',
//       fontSize: 20,
//     },
// };





// export default sell;






















// // import React,  { useState , useEffect } from 'react';
// // import { View, Text, StyleSheet,  Button,TouchableOpacity, TextInput } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { useSelector } from 'react-redux';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import { Ionicons } from '@expo/vector-icons';

// // const Sell = ({ route }) => {
// //   const { token } = useSelector((state) => state.auth);
// //   console.log('Sell', token);

// //   const { sname, LastPrice, instrumentId ,Quantities, instrumentType, quantity, Instrument,sellType, Pay } = route.params;

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isRegistered, setIsRegistered] = useState(false);
// //   const [quantiti, setQuantity] = useState(0);

  
// //   const increaseQuantity = () => {
// //     setQuantity(quantiti + 1);
// //   };

// //   const decreaseQuantity = () => {
// //     if (quantiti > 0) {
// //       setQuantity(quantiti - 1);
// //     }
// //   };
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { Ionicons } from '@expo/vector-icons';

// const Sell = ({ route }) => {
//   const navigation = useNavigation(); // Access navigation prop
//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);

//   const { sname, LastPrice, instrumentId, Quantities, instrumentType, quantity, Instrument, sellType, Pay } = route.params;

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [quantiti, setQuantity] = useState(0);

//   const increaseQuantity = () => {
//     setQuantity(quantiti + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantiti > 0) {
//       setQuantity(quantiti - 1);
//     }
//   };
//   const navigateBack = () => {
//     navigation.goBack(); // Use navigation prop to go back
//   };
//   const performTransaction = async (transactionType) => {
//     setLoading(true);
//     setError('');

  

//     try {
//       const data = {
//         instrumentId: parseInt(instrumentId),
//         instrumentType: instrumentType,
//         quantity: parseInt(quantiti),
//       };

//       const myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       const raw = JSON.stringify(data);

//       let requestOptions;

//       if (transactionType === 'sell') {
//         requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow',
//         };

//         const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

//         console.log(`${transactionType} API response:`, response.status, response.statusText);

//         if (response.ok) {
//           setIsRegistered(true);
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`please enter Quantity .Please try again.`);
//         }
//       } else if (transactionType === 'buy') {
//         requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow',
//         };

//         const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);

//         console.log(`${transactionType} API response:`, response.status, response.statusText);

//         if (response.ok) {
//           setIsRegistered(true);
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`please enter Quantity . Please try again.`);
//         }
//       }
//     } catch (err) {
//       console.error(`${transactionType} API error:`, err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <View style={styles.container}>
//        <View style={styles.navBar}>
//          {/* <TouchableOpacity onPress={''} >
//           <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
//          </TouchableOpacity>  */}
      
//         <TouchableOpacity onPress={navigateBack}>
//           <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
//         </TouchableOpacity>
//          <Text style={styles.navTitle}>{Instrument}</Text>
//        </View>
//       {/* <View style={styles.container} /> */}
//       <View style={styles.container1}>
//         <View style={styles.row}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.info}>{sname}</Text>
//         </View>
        
//         <View style={styles.row}>
//           <Text style={styles.label}>LastPrice:</Text>
//           <Text style={styles.info}>{LastPrice}</Text>
//         </View>


//         <View style={styles.row}>
//           <Text style={styles.label}>Instrument Type:</Text>
//           <Text style={styles.info}>{instrumentType}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>instrumentId:</Text>
//           <Text style={styles.info}>{instrumentId}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Quantity:</Text>
//           <Text style={styles.info}>{Quantities}</Text>
//         </View>



//         <View style={styles.row}>
//       <Text style={styles.label1}>SellQuantity:</Text>
//       <TextInput
//           style={[styles.input, quantity &&  styles.boldText]}
//           value={quantity}
//           onChangeText={(text) => setQuantity(text)}
//           keyboardType="numeric"
//           placeholder="Enter quantity"
//           textAlign="right"
//         />
//       {/* <View style={styles.quantityContainer}>
//         <TouchableOpacity  onPress={decreaseQuantity} style={styles.arrowdown}>
//         <Icon
//           name= "chevron-right"
//           size={15}
//           color="black"
//           style={{ position: 'absolute',color: 'white', top: 1,left: 9, transform: [{ rotate: '-90deg' }] }}
//         />
//         </TouchableOpacity>
//         <Text style={styles.info1}>{quantiti}</Text>
//         <TouchableOpacity onPress={increaseQuantity} style={styles.arrowdown}>
//         <Icon
//           name= "chevron-right"
//           size={15}
//           color="black"
//           style={{ position: 'absolute',color: 'white', top: 1,left: 9, transform: [{ rotate: '90deg' }] }}
//         />
//         </TouchableOpacity>
//       </View> */}
//     </View>
//       </View>
//       {isRegistered ? (
//         <Text style={styles.successText}>{sname} transaction successful!</Text>
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : null}
//       {/* <Button title="Sell Instrument" onPress={() => performTransaction({sell})} disabled={loading} 
//      /> */}
    
//      <TouchableOpacity style={styles.sellButton} onPress={() => performTransaction(sellType)} disabled={loading}> 
//        <Text style={styles.Sell}>{Instrument}</Text>
//      </TouchableOpacity>
//       {/* <Button title="Buy Instrument" onPress={() => performTransaction('buy')} disabled={loading} 
//        /> */}
//       {/* </View> */}
//     </View>
//   );
// };




// const styles = StyleSheet.create({
//     container: {
    
//       flex:1,
//       padding: 10,
//     //top: 30,
//       backgroundColor: 'white'
//     },
//     navBar: {
//       marginTop: 17,
//       flexDirection: 'row',
//       //justifyContent: 'space-between',
//       alignItems: 'center',
//       // backgroundColor: '#3498db',
//       padding: 15,
//     },
//     navTitle:{
//       right: 15,
//       // fontSize: 18,
//       // fontWeight: 'bold'
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     boldText:{
//       fontWeight: 'bold'
//     },
//     backIcon:{
//       right: 20
//     },
//     container1: {
//      marginTop: 20,
//      },
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 10,
//     },
//     info1:{
//       left: 10,
//       fontSize: 16,
//     },
//     // input:{
//     //   fontWeight: 'bold',
//     // },
//     arrowdown:{
//       width:30,
//       height: 20,
//       backgroundColor:'#A9A9A9',
//       borderRadius: 5
//     },
//     arrow:{
//       left: 10,
//       top: -3,
//       color: 'white'
//     },
//     label: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     label1:{
//       top: 1,
//       fontSize: 16,
//       fontWeight: 'bold',
//     },

//     successText:{
//       marginTop: 110,
//       color: 'green'
//     },
//     info: {
//       fontSize: 16,
//     },
   
//     sellButton: {
//       backgroundColor: '#A9A9A9',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 80,
//       padding: 10,
//       borderRadius: 6,
//       marginHorizontal: 3
//     },
//     Sell: {
//       color: 'white',
//       fontSize: 20,
//     },
//   });
  
//   export default Sell;


// import React,  { useState , useEffect } from 'react';
// import { View, Text, StyleSheet,  Button, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { Ionicons } from '@expo/vector-icons';


// const Sell = ({ route }) => { 

//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);


//   const { sname,LastPrice, instrumentId , instrumentType , quantity, Instrument } = route.params;
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);

//   const sellInstrument = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const data = {
//         instrumentId: parseInt(instrumentId),
//         instrumentType: instrumentType,
//         quantity: parseInt(quantity),
//       };

//       var myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       var raw = JSON.stringify(data);

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };

//       const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

//       console.log('Sell API response:', response.status, response.statusText);

//       if (response.ok) {
//         setIsRegistered(true);
//       } else {
//         console.error('Sell API error response:', await response.text());
//         setError('Failed to sell instrument. Please try again.');
//       }
//     } catch (err) {
//       console.error('Sell API error:', err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };


  


//   return (
//     <View style={styles.container}>
//       <View style={styles.navBar}>
//         <TouchableOpacity onPress={''} >
//           <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
//         </TouchableOpacity> 
//         <Text style={styles.navTitle}>{Instrument}</Text>
//       </View>
//         <View style={styles.container1}>
//       <View style={styles.row}>
//         <Text style={styles.label}>Name:</Text>
//         <Text style={styles.info}>{sname}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>LastPrice:</Text>
//         <Text style={styles.info}>{LastPrice}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Instrument Type:</Text>
//         <Text style={styles.info}>{instrumentType}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>instrumentId:</Text>
//         <Text style={styles.info}>{instrumentId}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Quantity:</Text>
//         <Text style={styles.info}>{quantity}</Text>
//       </View>
//     </View>
//     {isRegistered ? (
//         <Text style={styles.successText}>{sname} sold successfully!</Text>
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : null}
      
// {/*       
//       <TouchableOpacity style={styles.sellButton} onPress={sellInstrument} disabled={loading}> 
//       <Text style={styles.Sell}>Sell</Text>
//       </TouchableOpacity> */}
//       <Button
//         title="Sell Instrument"
//         onPress={sellInstrument}
//         disabled={loading}
//       />
     
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
    
//     flex:1,
//     padding: 10,
//   //top: 30,
//     backgroundColor: 'white'
//   },
//   navBar: {
//     marginTop: 17,
//     flexDirection: 'row',
//     //justifyContent: 'space-between',
//     alignItems: 'center',
//    // backgroundColor: '#3498db',
//     padding: 15,
//   },
//   backIcon:{
//      right: 20
//   },
//   successText:{
//     marginTop: 60,
//     color: 'green'
//   },
//   container1: {
//    marginTop: 60,
//    },
//    navTitle:{
//       right: 15,
//       fontSize: 18,
//       fontWeight: 'bold'
//    },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   info: {
//     fontSize: 16,
//   },
//   Button:{
//     marginTop: 40,
//   },
//   sellButton: {
//     //  height: 'vh', // Set the height to 10% of the viewport height
//       backgroundColor: '#A9A9A9',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 100,
//       padding: 10,
//       borderRadius: 6,
//       marginHorizontal: 3
//     },
//     Sell: {
//       color: 'white',
//       fontSize: 20,
//     },
// });

// export default Sell;











// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Buy = ({ route }) => { 

//   const { sname, instrumentId, instrumentType, quantity } = route.params;
//   // const navigation = useNavigation();

//   // useEffect(() => {
//   //   // Use the navigation object to navigate to 'PortfolioPage' and pass data as parameters
//   //   navigation.navigate('PortfolioPage', {
//   //     sname,
//   //     instrumentType,
//   //     instrumentId,
//   //     quantity,
//   //   });
//   // }, []); // The empty dependency array ensures this effect runs only once when the component is mounted

//   const navigation = useNavigation();

//   // useEffect(() => {
//   //   // Use the navigation object to navigate to 'PortfolioPage' and pass data as parameters
//   //   navigation.navigate('PortfolioPage', {
//   //     sname,
//   //     instrumentType,
//   //     instrumentId,
//   //     quantity,
//   //   });
//   // }, []); // The empty dependency array ensures this effect runs only once when the component is mounted


//   return (
//     <View style={styles.container}>
//         <View style={styles.container1}>
//       <View style={styles.row}>
//         <Text style={styles.label}>Name:</Text>
//         <Text style={styles.info}>{sname}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Instrument Type:</Text>
//         <Text style={styles.info}>{instrumentType}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Instrument ID:</Text>
//         <Text style={styles.info}>{instrumentId}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Quantity:</Text>
//         <Text style={styles.info}>{quantity}</Text>
//       </View>
//     </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//    // marginTop: 20,
//     flex:1,
//     padding: 10,
//   //top: 30,
//     backgroundColor: 'white'
//   },
//   container1: {
//     // marginTop: 20,
//      //flex:1,
     
//    marginTop: 60,
//    //  backgroundColor: 'white'
//    },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   info: {
//     fontSize: 16,
//   },
// });

// export default Buy;






// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';

// const Selll = () => {
//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);

//   const navigation = useNavigation();

//   const [instrumentId, setInstrumentId] = useState(''); // Initialize with empty strings
//   const [instrumentType, setInstrumentType] = useState(''); // Initialize with empty strings
//   const [quantity, setQuantity] = useState(''); // Initialize with empty strings
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);

//   const Sell = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       // Ensure that the data types are correct
//       const data = {
//         instrumentId: parseInt(instrumentId), // Convert to a number
//         instrumentType: instrumentType, // Assuming it's a string
//         quantity: parseInt(quantity), // Convert to a number
//       };

//       var myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       var raw = JSON.stringify(data);

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };

//       const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);

//       console.log('Sell API response:', response.status, response.statusText);

//       if (response.ok) {
//         setIsRegistered(true);
//         setInstrumentId('');
//         setInstrumentType('');
//         setQuantity('');
//       } else {
//         console.error('Sell API error response:', await response.text());
//         setError('Failed to sell instrument. Please try again.');
//       }
//     } catch (err) {
//       console.error('Sell API error:', err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {isRegistered && (
//           <Text style={{ color: '#d68760', textAlign: 'center' }}>
//             Registered successfully!
//           </Text>
//         )}
//         {error && <Text style={styles.error}>{error}</Text>}
//         <TextInput
//           label="Instrument ID"
//           value={instrumentId}
//           onChangeText={setInstrumentId}
//           style={{ margin: 16, width: 310 }}
//         />
//         <TextInput
//           label="Instrument Type"
//           value={instrumentType}
//           onChangeText={setInstrumentType}
//           style={{ margin: 16, width: 310 }}
//         />
//         <TextInput
//           label="Quantity"
//           value={quantity}
//           onChangeText={setQuantity}
//           style={{ margin: 16, width: 310 }}
//         />
//         <View style={styles.buttons}>
//           <View style={styles.button1}>
//             <Button
//               onPress={Sell}
//               disabled={loading}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonText}
//             >
//               Buy
//             </Button>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 80,
//     paddingLeft: 9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     color: '#d68760',
//     marginBottom: 10,
//   },
//   buttons: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     left: -3,
//   },
//   buttonContent: {
//     backgroundColor: '#8f8bcc',
//     paddingVertical: 4,
//     paddingHorizontal: 35,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   button1: {
//     left: -30,
//   },
// });

// export default Selll;











// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
// import { TextInput } from '@react-native-material/core';
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';

// const Selll = () => {
//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);

//   const navigation = useNavigation();

//   const [instrumentId, setInstrumentId] = useState(''); // Initialize with empty strings
//   const [instrumentType, setInstrumentType] = useState(''); // Initialize with empty strings
//   const [quantity, setQuantity] = useState(''); // Initialize with empty strings
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);

//   const Sell = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       // Ensure that the data types are correct
//       const data = {
//         instrumentId: parseInt(instrumentId), // Convert to a number
//         instrumentType: instrumentType, // Assuming it's a string
//         quantity: parseInt(quantity), // Convert to a number
//       };

//       var myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       var raw = JSON.stringify(data);

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };

//       const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);

//       console.log('Sell API response:', response.status, response.statusText);

//       if (response.ok) {
//         setIsRegistered(true);
//         setInstrumentId('');
//         setInstrumentType('');
//         setQuantity('');
//       } else {
//         console.error('Sell API error response:', await response.text());
//         setError('Failed to sell instrument. Please try again.');
//       }
//     } catch (err) {
//       console.error('Sell API error:', err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {isRegistered && (
//           <Text style={{ color: '#d68760', textAlign: 'center' }}>
//             Registered successfully!
//           </Text>
//         )}
//         {error && <Text style={styles.error}>{error}</Text>}
//         <TextInput
//           label="Instrument ID"
//           value={instrumentId}
//           onChangeText={setInstrumentId}
//           style={{ margin: 16, width: 310 }}
//         />
//         <TextInput
//           label="Instrument Type"
//           value={instrumentType}
//           onChangeText={setInstrumentType}
//           style={{ margin: 16, width: 310 }}
//         />
//         <TextInput
//           label="Quantity"
//           value={quantity}
//           onChangeText={setQuantity}
//           style={{ margin: 16, width: 310 }}
//         />
//         <View style={styles.buttons}>
//           <View style={styles.button1}>
//             <Button
//               onPress={Sell}
//               disabled={loading}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonText}
//             >
//               Buy
//             </Button>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 80,
//     paddingLeft: 9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     color: '#d68760',
//     marginBottom: 10,
//   },
//   buttons: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     left: -3,
//   },
//   buttonContent: {
//     backgroundColor: '#8f8bcc',
//     paddingVertical: 4,
//     paddingHorizontal: 35,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   button1: {
//     left: -30,
//   },
// });

// export default Selll;














// import React, { useState } from 'react';
// import { View, Text, StyleSheet, label } from 'react-native';
// import { Button } from 'react-native-paper';
// import axios from 'axios';
// import { TextInput } from "@react-native-material/core";
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';

// const Selll = ({ }) => {
  
//   const { token } = useSelector((state) => state.auth);
//   console.log("Sell", token);

//   const navigation = useNavigation();

//   const [instrumentId, setInstrumentId] = useState('');
//   const [instrumentType, setInstrumentType] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isSell, setIsSell] = useState(false);

//   const Sell = async () => {
//     setLoading(true);
//     setError('');
  
//     try {
//       const data = {
//         instrumentId: instrumentId,
//         instrumentType: instrumentType,
//         quantity: quantity,
//       };
  
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Authorization", `Bearer ${token}`);
  
//       var raw = JSON.stringify(data);
  
//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };
  
//       const response = await fetch('http://35.154.235.224:9000/api/user/purshaseSymbol', requestOptions);
  
//       console.log('Sell API response:', response.status, response.statusText);
  
//       if (response.ok) {
//         setInstrumentId('');
//         setInstrumentType('');
//         setQuantity('');
//         setIsSell(true);
        
//       } else {
//         console.error('Sell API error response:', await response.text());
//         setError('Failed to sell instrument. Please try again.');
//       }
//     } catch (err) {
//       console.error('Sell API error:', err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginFormin = () => {
//     navigation.navigate('Login');
//   };


//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {isSell && (
//           <Text style={{ color: '#d68760', textAlign: 'center' }}>
//             Registered successfully!
//           </Text>
//         )}
//         {error && <Text style={styles.error}>{error}</Text>}
//         <TextInput
//           // mode="outlined" // Set the mode to "outlined" for standard text input
//           label="instrumentId"
//           value={instrumentId}
//           onChangeText={setInstrumentId}
//           style={{ margin: 16, width: 310 }}
//         />
//         <TextInput
//           // mode="outlined" // Set the mode to "outlined" for standard text input
//           label="instrumentType"
//           value={instrumentType}
//           onChangeText={setInstrumentType}
//           //secureTextEntry
//           style={{ margin: 16, width: 310 }}
//         />
//         <TextInput
//           //mode="outlined" // Set the mode to "outlined" for standard text input
//           label="quantity"
//           value={quantity}
//           onChangeText={setQuantity}
//           style={{ margin: 16, width: 310 }}
//         /> 
//         <View style={styles.buttons}>
//           <View style={styles.button1}>
//             <Button
//               //mode="contained"
//               onPress={Sell}
//               disabled={loading}
//               contentStyle={styles.buttonContent}
//               labelStyle={styles.buttonText}
//             >
//               Sell
//             </Button>
//           </View>
         
//         </View>
       
//       </View>
//     </ScrollView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 80,
//     paddingLeft: 9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginText: {
//     fontWeight: 'bold',
//     paddingTop: 15,
//     color: 'green',
//   },
//   error: {
//     color: '#d68760',
//     marginBottom: 10,
//   },
//   buttons: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     left: -3,
//   },
//   buttonContent: {
//     backgroundColor: '#8f8bcc', // Customize the button background color
//     paddingVertical: 4,
//     paddingHorizontal: 35,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,

//   },
//   buttonContent1: {
//     backgroundColor: '#7bb2b5',
//     paddingVertical: 4,
//     paddingHorizontal: 35,

//   },
//   buttonText1: {
//     color: 'white',
//     fontSize: 16,

//   },
//   button1: {
//     Left: -30,
//   },
//   button2:
//   {
//     left: 10,
//   },
// });

// export default Selll;



// const Sell = async () => {

//   setLoading(true);
//   setError('');

//   try {
    
    

//     const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({  instrumentId, instrumentType, quantity  }),
//     });
    
//     //firstname, lastname,

//     if (response.ok) {
//       // Signup successful, you can navigate to another screen or show a success message
//       setIsRegistered(true);
//       //setfirstname('');
//       setInstrumentId('');
//       setInstrumentType('');
//       setQuantity('');
//     } else {
//       setError('not sell');
//     }
//   } catch (err) {
//     // Handle network errors or other issues
//     setError('not working ');
//   } finally {
//     setLoading(false);
//   }
// };















// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';

// const Sell = () => {
//   const [apiData, setApiData] = useState({
//     instrumentId: '',
//     instrumentType: 'NSE',
//     quantity: '',
//   });

//   const { token } = useSelector((state) => state.auth); // Assuming Redux is set up correctly

//   const handleSell = () => {
//     const payload = {
//       instrumentId: apiData.instrumentId,
//       instrumentType: apiData.instrumentType,
//       quantity: apiData.quantity,
//     };
  
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${token}`);
//     myHeaders.append("Content-Type", "application/json");
  
//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: JSON.stringify(payload),
//       redirect: 'follow',
//     };
  
//     fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP status ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         console.log('Sell response:', result);
//         // Handle the API response here
//       })
//       .catch((error) => {
//         console.error('Error selling instrument:', error);
//         Alert.alert('Error', 'Failed to sell instrument. Please try again.');
//       });
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Instrument ID:</Text>
//       <TextInput
//         style={styles.input}
//         value={apiData.instrumentId}
//         onChangeText={(text) => setApiData({ ...apiData, instrumentId: text })}
//       />

//       <Text style={styles.label}>Instrument Type:</Text>
//       <TextInput
//         style={styles.input}
//         value={apiData.instrumentType}
//         onChangeText={(text) => setApiData({ ...apiData, instrumentType: text })}
//       />

//       <Text style={styles.label}>Quantity:</Text>
//       <TextInput
//         style={styles.input}
//         value={apiData.quantity}
//         onChangeText={(text) => setApiData({ ...apiData, quantity: text })}
//       />

//       <View style={styles.buttonContainer}>
//         <Button
//           title="Sell"
//           onPress={handleSell}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     margin: 40,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   },
//   Sell: {
//     padding: 30,
//   },
//   Update: {
//     marginTop: 10, // Add spacing to separate the buttons
//   },
// });

// export default Sell;














//   import React,  { useState , useEffect } from 'react';
// import { View, Text, StyleSheet,  Button,TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { Ionicons } from '@expo/vector-icons';

// const Sell = ({ route }) => {
//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);

//   const { sname, LastPrice, instrumentId, instrumentType, quantity, Instrument,sell, Pay } = route.params;

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);

//   const performTransaction = async (transactionType) => {
//     setLoading(true);
//     setError('');

//     try {
//       const data = {
//         instrumentId: parseInt(instrumentId),
//         instrumentType: instrumentType,
//         quantity: parseInt(quantity),
//       };

//       var myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       var raw = JSON.stringify(data);

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };

//       const response = await fetch(
//         transactionType === 'sell'
//           ? 'http://35.154.235.224:9000/api/user/sellSymbol'
//           : 'http://35.154.235.224:9000/api/user/purshaseSymbol',
//         requestOptions
//       );

//       console.log(`${transactionType} API response:`, response.status, response.statusText);

//       if (response.ok) {
//         setIsRegistered(true);
//       } else {
//         console.error(`${transactionType} API error response:`, await response.text());
//         setError(`Failed to ${transactionType} instrument. Please try again.`);
//       }
//     } catch (err) {
//       console.error(`${transactionType} API error:`, err);
//       setError('Network error. Please check your internet connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//        <View style={styles.navBar}>
//          <TouchableOpacity onPress={''} >
//           <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
//          </TouchableOpacity> 
//          <Text style={styles.navTitle}>{Instrument}</Text>
//        </View>
//       {/* <View style={styles.container} /> */}
//       <View style={styles.container1}>
//         <View style={styles.row}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.info}>{sname}</Text>
//         </View>
        
//         <View style={styles.row}>
//           <Text style={styles.label}>LastPrice:</Text>
//           <Text style={styles.info}>{LastPrice}</Text>
//         </View>


//         <View style={styles.row}>
//           <Text style={styles.label}>Instrument Type:</Text>
//           <Text style={styles.info}>{instrumentType}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>instrumentId:</Text>
//           <Text style={styles.info}>{instrumentId}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Quantity:</Text>
//           <Text style={styles.info}>{quantity}</Text>
//         </View>
//       </View>
//       {isRegistered ? (
//         <Text style={styles.successText}>{sname} transaction successful!</Text>
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : null}
//       <Button title="Sell Instrument" onPress={() => performTransaction('sell')} disabled={loading} 
//      />
//      {/* <TouchableOpacity style={styles.sellButton} onPress={() => performTransaction(sell)} disabled={loading}> 
//        <Text style={styles.Sell}>Pay</Text>
//      </TouchableOpacity> */}
//       <Button title="Buy Instrument" onPress={() => performTransaction('buy')} disabled={loading} 
//        />
//       {/* </View> */}
//     </View>
//   );
// };




// const styles = StyleSheet.create({
//     container: {
    
//       flex:1,
//       padding: 10,
//     //top: 30,
//       backgroundColor: 'white'
//     },
//     navBar: {
//       marginTop: 17,
//       flexDirection: 'row',
//       //justifyContent: 'space-between',
//       alignItems: 'center',
//       // backgroundColor: '#3498db',
//       padding: 15,
//     },
//     navTitle:{
//       right: 15,
//       fontSize: 18,
//       fontWeight: 'bold'
//     },
//     backIcon:{
//       right: 20
//     },
//     container1: {
//      marginTop: 60,
//      },
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 10,
//     },
//     label: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     successText:{
//       marginTop: 110,
//       color: 'green'
//     },
//     info: {
//       fontSize: 16,
//     },
//     Button:{
//       marginTop: 40,
//     },
//     Button:{
//       marginTop: 60,
//     },
//     sellButton: {
//       //  height: 'vh', // Set the height to 10% of the viewport height
//       backgroundColor: '#A9A9A9',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 80,
//       padding: 10,
//       borderRadius: 6,
//       marginHorizontal: 3
//     },
//     Sell: {
//       color: 'white',
//       fontSize: 20,
//     },
//   });
  
//   export default Sell;
