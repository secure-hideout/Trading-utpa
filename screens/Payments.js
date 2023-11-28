import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { TextInput } from '@react-native-material/core';
import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import Toast from "react-native-toast-message"


const Payments = ({ Instrument = "Sell", sname, LastPrice, instrumentType, instrumentId, quantity, Quantities, quantity1 }) => {
  const navigation = useNavigation();
  const [isBuyConfirmationVisible, setIsBuyConfirmationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [quantiti, setQuantity] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [latestQuantities, setLatestQuantities] = useState(Quantities);
  const [sellType, setSellType] = useState('sell'); // Default to 'sell'
  const [isCardVisible, setIsCardVisible] = useState(true);


    const { token } = useSelector((state) => state.auth);
    console.log('Payments', token);

   
    // const performTransactionAPI = (type) => {
    //   // Your transaction logic here...
  
    //   // Close the confirmation modal after the transaction
    //   hideConfirmation();
    // };
  


    

  const performTransaction = (sellType) => {
    performTransactionAPI(sellType);
    // setIsCardVisible(false);
    // Your transaction logic goes here
    console.log('Transaction performed');
    hideConfirmation();
 };


  const showConfirmation = (type) => {
    setSellType(type);
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setConfirmationVisible(false);
  };

  const showBuyConfirmation = () => {
    setIsBuyConfirmationVisible(true);
  };

  const hideBuyConfirmation = () => {
    setIsBuyConfirmationVisible(false);
  };

  // const showConfirmation = (type) => {
  //   setSellType(type);
  //   setIsConfirmationVisible(true);
  // };




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
          //setError(`Cannot sell more than available quantity (${availableQuantity}).`);
           
           Toast.show({
           type: "error",
           text1: `Cannot sell more than available quantity ${availableQuantity}`,
          
        });
          hideConfirmation();
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
          
          //const response:

          hideConfirmation();
          setIsRegistered(true);
          Toast.show({
            type: "success",
            text1: `Sell Succesfull`,
         });
          //const data = await response.json();
        //  return data.quantities;
          const data = await response.json();

          const updatedQuantities = data.quantities;
          setLatestQuantities(updatedQuantities);
          console.log('latest value',data?.quantity);
          
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
          hideConfirmation();
          setIsRegistered(true);
          Toast.show({
            type: "success",
            text1: `Buy Succesfull`,
         });
        
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



  return (
    <View style={styles.sellandbuy}>

      <TouchableOpacity style={[styles.button]} onPress={() => showConfirmation('sell')}>
        <Text style={styles.sell}>Sell</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button3}
        onPress={() => showConfirmation('buy')}
      >
        <Text style={styles.buy}>Buy</Text>
      </TouchableOpacity>
       
        {/* Confirmation Modal */}
        <Modal isVisible={isConfirmationVisible}>

        
          <Card style={styles.cardContainer4}>
            <View style={styles.Price1}>
              <Text style={styles.Price}>Lastprice:</Text>
              <Text style={styles.Price2}>{LastPrice}</Text>
            </View>
            <View style={styles.Quantities}>
              <Text style={[styles.Price,styles.Quantities]}>Current Stocks:</Text>
              <Text style={[styles.Price2,styles.Quantities]}>{Quantities}</Text>
          </View>
    
         <View style={styles.Quantities}> 
           <Text style={styles.Price3}>Enter {sellType} Quantity:</Text>
           <TextInput
            variant="outlined"
            label="#No."
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            keyboardType="numeric"
            style={{
            width: 90,
            height: 50,
            marginLeft: 21,
            marginHorizontal: 9,
            borderBottomWidth: 2,
            textAlign: 'center',
           // inputStyle={{ width: 100, textAlign: 'center'  }}
        }}
      />
        </View>

       
        <View style={styles.buttons}>
        <View style={styles.button1}>
        <Button onPress={() => performTransactionAPI(sellType)} labelStyle={styles.buttonText} >
          {sellType === 'sell' ? 'Sell' : 'Buy'}
        </Button>
        </View>
      <View style={styles.button2}>
         <Button onPress={hideConfirmation}  labelStyle={styles.buttonText1} >
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
  sellandbuy: {
    
    flexDirection: 'row',
    padding: 10,
    //marginBottom: 10
   },
  button: {
    marginRight: 2,
    backgroundColor: '#EAC9B1',
    width: '46%',
    height: 47,
    borderRadius: 50,
  },
  button1: {
    paddingLeft: 5,
    width: '47%',
    height: 47,
    backgroundColor: '#EAC9B1',
    borderRadius: 50,
  },
  button2:{
    left: 10,
    width: '47%',
    height: 47,
    backgroundColor: '#b1a4ff',
    borderRadius: 50,
  },
  button3:{
    left: 3,
    width: '47%',
    height: 47,
    backgroundColor: '#b1a4ff',
    borderRadius: 50,
  },
  sell: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  buy: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 18,
  },
  cardContainer4:{
    backgroundColor: 'white',
    width: '90%',
    marginHorizontal: 20,
    paddingVertical: 9,
  },
  buttonContent1: {
    backgroundColor: '#7bb2b5',
  },
  buttonText: {
    paddingTop: 4,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    left: 8
  },
  Price3:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    paddingTop: 15,
    left: 8
  },
  buttonText1: {
    fontWeight: 'bold',
    paddingTop: 4,
    alignItems: 'center',
    color: 'white',
    fontSize: 16,
    Left: 15,
  },
  Price1:{
    //fontWeight: '700',
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Quantities:{
    fontWeight: 'bold',
    // fontWeight: 'bold',
     paddingBottom: 9,
  //  padding: 7,
     paddingRight: 8,
     paddingLeft: 8,
    //backgroundColor: 'red',
    paddingBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
   paddingTop: 17,
     flexDirection: 'row',
    marginLeft: 10
    //justifyContent: 'space-between'
  },
  cardContainer1:{
     marginLeft: 80,
     width : '49%',
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
     height: 80,
     marginVertical: 5,
     paddingVertical: 5,
     borderRadius: 10,
     backgroundColor: '#fff', 
   },
   input: {
    top: 5,
    left: 9,
    flex: 1,
    flexDirection:'row',
    //height: 40, // Adjust this value to make it smaller
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  Price:{
    
    fontSize: 16,
    fontWeight: '600',
    color: 'gray'
  },
  Price2: {
    fontWeight: '600',
    fontSize: 16,
  },
  label1:{
    fontWeight: 'bold',
    color: 'gray'
  }
})

export default Payments;




// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Modal from 'react-native-modal';
// import { TextInput } from '@react-native-material/core';
// import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
// import { Input } from 'react-native-elements';
// import { useSelector } from 'react-redux';
// import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
// import Toast from "react-native-toast-message"


// const Payments = ({ Instrument = "Sell", sname, LastPrice, instrumentType, instrumentId, quantity, Quantities, quantity1 }) => {
//   const navigation = useNavigation();
//   const [isBuyConfirmationVisible, setIsBuyConfirmationVisible] = useState(false);
//   const [isConfirmationVisible, setConfirmationVisible] = useState(false);
//   const [quantiti, setQuantity] = useState(0); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [latestQuantities, setLatestQuantities] = useState(Quantities);
//   const [sellType, setSellType] = useState('sell'); // Default to 'sell'
//   const [isCardVisible, setIsCardVisible] = useState(true);


//     const { token } = useSelector((state) => state.auth);
//     console.log('Payments', token);

   
//     // const performTransactionAPI = (type) => {
//     //   // Your transaction logic here...
  
//     //   // Close the confirmation modal after the transaction
//     //   hideConfirmation();
//     // };
  


    

//   const performTransaction = (sellType) => {
//     performTransactionAPI(sellType);
//     // setIsCardVisible(false);
//     // Your transaction logic goes here
//     console.log('Transaction performed');
//     hideConfirmation();
//  };


//   const showConfirmation = (type) => {
//     setSellType(type);
//     setConfirmationVisible(true);
//   };

//   const hideConfirmation = () => {
//     setConfirmationVisible(false);
//   };

//   const showBuyConfirmation = () => {
//     setIsBuyConfirmationVisible(true);
//   };

//   const hideBuyConfirmation = () => {
//     setIsBuyConfirmationVisible(false);
//   };

//   // const showConfirmation = (type) => {
//   //   setSellType(type);
//   //   setIsConfirmationVisible(true);
//   // };




//   const performTransactionAPI = async (transactionType) => {
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
//           //setError(`Cannot sell more than available quantity (${availableQuantity}).`);
           
//            Toast.show({
//            type: "error",
//            text1: `Cannot sell more than available quantity ${availableQuantity}`,
          
//         });
//           hideConfirmation();
//           setLoading(false);
//           return;
//         }


//         requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow',
//         };
        
//         console.log("Response2:", performTransactionAPI);

//         const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

//         console.log(`${transactionType} API response:`, response.status, response.statusText);

//         if (response.ok) {
//           hideConfirmation();
//           setIsRegistered(true);
//           Toast.show({
//             type: "success",
//             text1: `Sell Succesfull`,
//          });
//           //const data = await response.json();
//         //  return data.quantities;
//           const data = await response.json();
//           const updatedQuantities = data.quantities;
//           setLatestQuantities(updatedQuantities);
          
          
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`Please enter Quantity`);
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
//           hideConfirmation();
//           setIsRegistered(true);
//           Toast.show({
//             type: "success",
//             text1: `Buy Succesfull`,
//          });
        
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`Please enter Quantity`);
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
//     <View style={styles.sellandbuy}>

//       <TouchableOpacity style={[styles.button]} onPress={() => showConfirmation('sell')}>
//         <Text style={styles.sell}>Sell</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button3}
//         onPress={() => showConfirmation('buy')}
//       >
//         <Text style={styles.buy}>Buy</Text>
//       </TouchableOpacity>
       
//         {/* Confirmation Modal */}
//         <Modal isVisible={isConfirmationVisible}>

        
//           <Card style={styles.cardContainer4}>
//             <View style={styles.Price1}>
//               <Text style={styles.Price}>Lastprice:</Text>
//               <Text style={styles.Price2}>{LastPrice}</Text>
//             </View>
//             <View style={styles.Quantities}>
//               <Text style={[styles.Price,styles.Quantities]}>Current Stocks:</Text>
//               <Text style={[styles.Price2,styles.Quantities]}>{Quantities}</Text>
//           </View>
    
//         <Card style={styles.cardContainer1}>
//            <Text style={styles.label1}>Enter {sellType} Quantity:</Text>
//              <Input
//              value={quantity}
//              onChangeText={(text) => setQuantity(text)}
//              keyboardType="numeric"
//              containerStyle={{ width: 80, marginLeft:  21, marginHorizontal: 9 }}
//              inputStyle={{ width: 100, textAlign: 'center'  }}
//              inputContainerStyle={{
//             // borderBottomColor: isFocused ? 'blue' : 'green',
//              borderBottomWidth: 2,
//             }}
//         />
//         </Card>

       
//         <View style={styles.buttons}>
//         <View style={styles.button1}>
//         <Button onPress={() => performTransactionAPI(sellType)} labelStyle={styles.buttonText} >
//           {sellType === 'sell' ? 'Sell' : 'Buy'}
//         </Button>
//         </View>
//       <View style={styles.button2}>
//          <Button onPress={hideConfirmation}  labelStyle={styles.buttonText1} >
//          Cancel
//       </Button>
//      </View>
//     </View>
//   </Card>
       
// </Modal>
// </View>
// );
// };


// const styles = StyleSheet.create({
//   sellandbuy: {
    
//     flexDirection: 'row',
//     padding: 10,
//     //marginBottom: 10
//    },
//   button: {
//     marginRight: 2,
//     backgroundColor: '#EAC9B1',
//     width: '46%',
//     height: 47,
//     borderRadius: 50,
//   },
//   button1: {
//     paddingLeft: 5,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#EAC9B1',
//     borderRadius: 50,
//   },
//   button2:{
//     left: 10,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#b1a4ff',
//     borderRadius: 50,
//   },
//   button3:{
//     left: 3,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#b1a4ff',
//     borderRadius: 50,
//   },
//   sell: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 10,
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   buy: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginTop: 10,
//     fontSize: 18,
//   },
//   cardContainer4:{
//     backgroundColor: 'white',
//     width: '90%',
//     marginHorizontal: 20,
//     paddingVertical: 9,
//   },
//   buttonContent1: {
//     backgroundColor: '#7bb2b5',
//   },
//   buttonText: {
//     paddingTop: 4,
//     paddingRight: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     left: 8
//   },
//   buttonText1: {
//     fontWeight: 'bold',
//     paddingTop: 4,
//     alignItems: 'center',
//     color: 'white',
//     fontSize: 16,
//     Left: 15,
//   },
//   Price1:{
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   Quantities:{
//     fontWeight: 'bold',
//     // fontWeight: 'bold',
//      paddingBottom: 9,
//   //  padding: 7,
//      paddingRight: 8,
//      paddingLeft: 8,
//     //backgroundColor: 'red',
//     paddingBottom: 9,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   buttons: {
//    paddingTop: 10,
//      flexDirection: 'row',
//     marginLeft: 10
//     //justifyContent: 'space-between'
//   },
//   cardContainer1:{
//      marginLeft: 80,
//      width : '49%',
//      alignItems: 'center',
//      justifyContent: 'center',
//      textAlign: 'center',
//      height: 80,
//      marginVertical: 5,
//      paddingVertical: 5,
//      borderRadius: 10,
//      backgroundColor: '#fff', 
//    },
//    input: {
//     top: 5,
//     left: 9,
//     flex: 1,
//     flexDirection:'row',
//     //height: 40, // Adjust this value to make it smaller
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 20,
//   },
//   Price:{
    
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'gray'
//   },
//   Price2: {
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   label1:{
//     fontWeight: 'bold',
//     color: 'gray'
//   }
// })

// export default Payments;



















// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Modal from 'react-native-modal';
// import { TextInput } from '@react-native-material/core';
// import {  Card, Title, Paragraph, Button, Provider  } from 'react-native-paper';
// import { Input } from 'react-native-elements';
// import { useSelector } from 'react-redux';
// import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";



// const Payments = ({ Instrument = "Sell", sname, LastPrice, instrumentType, instrumentId, quantity, sellType, Quantities, quantity1 }) => {
//   const navigation = useNavigation();
//   const [isBuyConfirmationVisible, setIsBuyConfirmationVisible] = useState(false);
//   const [isConfirmationVisible, setConfirmationVisible] = useState(false);
//   const [quantiti, setQuantity] = useState(0); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [latestQuantities, setLatestQuantities] = useState(Quantities);


//     const { token } = useSelector((state) => state.auth);
//     console.log('Payments', token);


//   const sellPress = () => {
//     navigation.navigate('Buy', {
//       quantity1:'SELL',
//       sname,
//       sellType: 'sell',
//       Pay: 'Sell',
//       LastPrice,
//       instrumentType,
//       instrumentId,
//       quantity,
//       Instrument,
//       Quantities,
//       buttonColor: '#8f8bcc',

//     });
//   };
//   const navigateBack = () => {
//     navigation.goBack(); // Use navigation prop to go back
//   };

//   const buyPress = () => {
//     navigation.navigate('Buy', {
//       sname,
//       quantity1:'BUY',
//       sellType: 'buy',
//       Pay: 'Buy',
//       Instrument: 'Buy',
//       LastPrice,
//       instrumentType,
//       instrumentId,
//       quantity,
//       Quantities,
//       buttonColor: '#a66f84',
//     });
//   };

//   const performTransaction = (sellType) => {
//     performTransactionAPI(sellType);
//     // Your transaction logic goes here
//     console.log('Transaction performed');
//     hideConfirmation();
// };


//   const showConfirmation = () => {
//     setConfirmationVisible(true);
//   };

//   const hideConfirmation = () => {
//     setConfirmationVisible(false);
//   };

//   const showBuyConfirmation = () => {
//     setIsBuyConfirmationVisible(true);
//   };

//   const hideBuyConfirmation = () => {
//     setIsBuyConfirmationVisible(false);
//   };



//   const performTransactionAPI = async (transactionType) => {
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
        
//         console.log("Response2:", performTransactionAPI);

//         const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

//         console.log(`${transactionType} API response:`, response.status, response.statusText);

//         if (response.ok) {
          
//           setIsRegistered(true);
//           //const data = await response.json();
//         //  return data.quantities;
//           const data = await response.json();
//           const updatedQuantities = data.quantities;
//           setLatestQuantities(updatedQuantities);
          
          
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`Please enter Quantity`);
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
//           const updatedPortfolio = await portfolioResponse.json();
//           navigation.navigate('ViewPortfolio', { portfolio: updatedPortfolio });
        
//         } else {
//           console.error(`${transactionType} API error response:`, await response.text());
//           setError(`Please enter Quantity`);
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
//     <View style={styles.sellandbuy}>

//       <TouchableOpacity style={[styles.button]} onPress={showConfirmation}>
//           <Text style={styles.sell}>sell</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//          style={styles.button3}
//          onPress={showConfirmation}
//         >
//         <Text style={styles.buy}>Buy</Text>
//       </TouchableOpacity>
       
//         {/* Confirmation Modal */}
//         <Modal isVisible={isConfirmationVisible}>
//           <Card style={styles.cardContainer4}>
//             <View style={styles.Price1}>
//               <Text style={styles.Price}>Lastprice:</Text>
//               <Text style={styles.Price2}>{LastPrice}</Text>
//             </View>
//             <View style={styles.Quantities}>
//               <Text style={[styles.Price,styles.Quantities]}>Current Stocks:</Text>
//               <Text style={[styles.Price2,styles.Quantities]}>{Quantities}</Text>
//           </View>
       
//         <Card style={styles.cardContainer1}>
//            <Text style={styles.label1}>Enter Sell Quantity:</Text>
//              <Input
//              value={quantity}
//              onChangeText={(text) => setQuantity(text)}
//              keyboardType="numeric"
//              containerStyle={{ width: 80, marginLeft:  21, marginHorizontal: 9 }}
//              inputStyle={{ width: 100, textAlign: 'center'  }}
//              inputContainerStyle={{
//             // borderBottomColor: isFocused ? 'blue' : 'green',
//              borderBottomWidth: 2,
//             }}
//         />
//         </Card>
//         <View style={styles.buttons}>
//         <View style={styles.button1}>
//           <Button onPress={() => performTransactionAPI(sellType)}  labelStyle={styles.buttonText}>
//           Sell
//           </Button>
//         </View>
//       <View style={styles.button2}>
//          <Button onPress={hideConfirmation}  labelStyle={styles.buttonText1} >
//          Cancel
//       </Button>
//      </View>
//     </View>
//   </Card>
// </Modal>


 
//   </View>
// );
// };


// const styles = StyleSheet.create({
//   sellandbuy: {
    
//     flexDirection: 'row',
//     marginBottom: 10
//    },
//   button: {
//     marginRight: 2,
//     backgroundColor: '#EAC9B1',
//     width: '46%',
//     height: 47,
//     borderRadius: 50,
//   },
//   button1: {
//     paddingLeft: 5,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#EAC9B1',
//     borderRadius: 50,
//   },
//   button2:{
//     left: 10,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#b1a4ff',
//     borderRadius: 50,
//   },
//   button3:{
//     left: 3,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#b1a4ff',
//     borderRadius: 50,
//   },
//   sell: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 10,
//     fontSize: 18,
//   },
//   buy: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 10,
//     fontSize: 18,
//   },
//   cardContainer4:{
//     backgroundColor: 'white',
//     width: '90%',
//     marginHorizontal: 20,
//     paddingVertical: 9,
//   },
//   buttonContent1: {
//     backgroundColor: '#7bb2b5',
//   },
//   buttonText: {
//     paddingTop: 4,
//     paddingRight: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: 16,
//     left: 8
//   },
//   buttonText1: {
//     paddingTop: 4,
//     alignItems: 'center',
//     color: 'white',
//     fontSize: 16,
//     Left: 15,
//   },
//   Price1:{
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   Quantities:{
//      paddingBottom: 9,
//   //  padding: 7,
//      paddingRight: 8,
//      paddingLeft: 8,
//     //backgroundColor: 'red',
//     paddingBottom: 9,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   buttons: {
//    paddingTop: 10,
//      flexDirection: 'row',
//     marginLeft: 10
//     //justifyContent: 'space-between'
//   },
//   cardContainer1:{
//      marginLeft: 80,
//      width : '49%',
//      alignItems: 'center',
//      justifyContent: 'center',
//      textAlign: 'center',
//      height: 80,
//      marginVertical: 5,
//      paddingVertical: 5,
//      borderRadius: 10,
//      backgroundColor: '#fff', 
//    },
//    input: {
//     top: 5,
//     left: 9,
//     flex: 1,
//     flexDirection:'row',
//     //height: 40, // Adjust this value to make it smaller
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 20,
//   },
//   Price:{
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'gray'
//   },
//   Price2: {
//     fontWeight: '600',
//     fontSize: 16,
    
//   }
// })

// export default Payments;





















// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';


// const Payments = ({ Instrument = "Sell", sname, LastPrice, instrumentType, instrumentId, quantity, sellType, Quantities, quantity1 }) => {
//   const navigation = useNavigation();

//   const sellPress = () => {
//     navigation.navigate('Buy', {
//       quantity1:'SELL',
//       sname,
//       sellType: 'sell',
//       Pay: 'Sell',
//       LastPrice,
//       instrumentType,
//       instrumentId,
//       quantity,
//       Instrument,
//       Quantities,
//       buttonColor: '#8f8bcc',

//     });
//   };
//   const navigateBack = () => {
//     navigation.goBack(); // Use navigation prop to go back
//   };

//   const buyPress = () => {
//     navigation.navigate('Buy', {
//       sname,
//       quantity1:'BUY',
//       sellType: 'buy',
//       Pay: 'Buy',
//       Instrument: 'Buy',
//       LastPrice,
//       instrumentType,
//       instrumentId,
//       quantity,
//       Quantities,
//       buttonColor: '#a66f84',
//     });
//   };


//   return (
//     <View style={styles.sellandbuy}>
//     {Quantities > 0 ? (
//       <TouchableOpacity
//         style={styles.button}
//         onPress={sellPress}
//       >
//         <Text style={styles.sell}>Sell</Text>
//       </TouchableOpacity>
//     ) : (
//       <View style={[styles.button, { backgroundColor: '#A9A9A9' }]}>
//         <Text style={[styles.sell, { color: 'white' }]}>Sell</Text>
//       </View>
//     )}

//     <TouchableOpacity
//       style={styles.button1}
//       onPress={buyPress}
//     >
//       <Text style={styles.buy}>Buy</Text>
//     </TouchableOpacity>
//   </View>
// );
// };


// const styles = StyleSheet.create({
//   sellandbuy: {
    
//     flexDirection: 'row',
//     marginBottom: 10
//    },
//   button: {
//     marginRight: 2,
//     justifyContent: 'space-between',
//     width: '46%',
//     height: 47,
//     backgroundColor: '#8f8bcc',
//     borderRadius: 50,
//   },
//   button1: {
//     paddingLeft: 5,
//     width: '47%',
//     height: 47,
//     backgroundColor: '#a66f84',
//     borderRadius: 50,
//   },
//   sell: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 10,
//     fontSize: 18,
//   },
//   buy: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 10,
//     fontSize: 18,
//   },
// })

// export default Payments;





















{/* <TouchableOpacity
        style={styles.button}
        onPress={sellPress}
        disabled={Quantities <= 0} // Disable if quantity is less than or equal to 0
        
      >
        <Text style={styles.sell}>Sell</Text>
      </TouchableOpacity>

 */}





// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';


// const Payments = () => {
//   const navigation = useNavigation();

//   const sellPress = () => {

//     navigation.navigate('SEll');
//   };

//   const buyPress = () => {

//     navigation.navigate('Buy');
//   };

//   return (
//     <View style={styles.sellandbuy}>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={sellPress}
//       >
//         <Text style={styles.sell}>Sell</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button1}
//         onPress={buyPress}
//       >
//         <Text style={styles.buy}>Buy</Text>
//       </TouchableOpacity>

//     </View>

//   );
// };


// const styles = StyleSheet.create({
//   sellandbuy: {
//     flexDirection: 'row',
//     top: 275,
//     //top: 5
//     left: 10
//   },
//   button: {
//     bottom: 235,
//     left: -2,
//     width: '47%',
//     height: 47,
//     backgroundColor: 'lightgray',
//     borderRadius: 50,
//   },
//   button1: {
//     bottom: 235,
//     left: 5,
//     width: '47%',
//     height: 47,
//     backgroundColor: 'black',
//     borderRadius: 50,
//   },
//   sell: {
//     color: 'white',
//     textAlign: 'center',
//     top: 10,
//     fontSize: 18,
//   },
//   buy: {
//     color: 'white',
//     textAlign: 'center',
//     top: 10,
//     fontSize: 18,
//   },
// })

// export default Payments;