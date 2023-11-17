// import React,  { useState , useEffect } from 'react';
// import { View, Text, StyleSheet,  Button,TouchableOpacity, TextInput } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Ionicons } from '@expo/vector-icons';

// const Sell = ({ route }) => {
//   const { token } = useSelector((state) => state.auth);
//   console.log('Sell', token);

//   const { sname, LastPrice, instrumentId ,Quantities, instrumentType, quantity, Instrument,sellType, Pay } = route.params;

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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Sell = ({ route }) => {
  const navigation = useNavigation(); // Access navigation prop
  const { token } = useSelector((state) => state.auth);
  console.log('Sell', token);

  const { sname, LastPrice, instrumentId, Quantities, instrumentType, quantity, Instrument, sellType, Pay } = route.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [quantiti, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantiti + 1);
  };

  const decreaseQuantity = () => {
    if (quantiti > 0) {
      setQuantity(quantiti - 1);
    }
  };
  const navigateBack = () => {
    navigation.goBack(); // Use navigation prop to go back
  };
  const performTransaction = async (transactionType) => {
    setLoading(true);
    setError('');

  

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
        requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        const response = await fetch('http://35.154.235.224:9000/api/user/sellSymbol', requestOptions);

        console.log(`${transactionType} API response:`, response.status, response.statusText);

        if (response.ok) {
          setIsRegistered(true);
        } else {
          console.error(`${transactionType} API error response:`, await response.text());
          setError(`please enter Quantity .Please try again.`);
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
        } else {
          console.error(`${transactionType} API error response:`, await response.text());
          setError(`please enter Quantity . Please try again.`);
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
    <View style={styles.container}>
       <View style={styles.navBar}>
         {/* <TouchableOpacity onPress={''} >
          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
         </TouchableOpacity>  */}
      
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.navTitle}>{Instrument}</Text>
       </View>
      {/* <View style={styles.container} /> */}
      <View style={styles.container1}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{sname}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>LastPrice:</Text>
          <Text style={styles.info}>{LastPrice}</Text>
        </View>


        <View style={styles.row}>
          <Text style={styles.label}>Instrument Type:</Text>
          <Text style={styles.info}>{instrumentType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>instrumentId:</Text>
          <Text style={styles.info}>{instrumentId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.info}>{Quantities}</Text>
        </View>



        <View style={styles.row}>
      <Text style={styles.label1}>SellQuantity:</Text>
      <TextInput
          style={[styles.input, quantity &&  styles.boldText]}
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="numeric"
          placeholder="Enter quantity"
          textAlign="right"
        />
      {/* <View style={styles.quantityContainer}>
        <TouchableOpacity  onPress={decreaseQuantity} style={styles.arrowdown}>
        <Icon
          name= "chevron-right"
          size={15}
          color="black"
          style={{ position: 'absolute',color: 'white', top: 1,left: 9, transform: [{ rotate: '-90deg' }] }}
        />
        </TouchableOpacity>
        <Text style={styles.info1}>{quantiti}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.arrowdown}>
        <Icon
          name= "chevron-right"
          size={15}
          color="black"
          style={{ position: 'absolute',color: 'white', top: 1,left: 9, transform: [{ rotate: '90deg' }] }}
        />
        </TouchableOpacity>
      </View> */}
    </View>
      </View>
      {isRegistered ? (
        <Text style={styles.successText}>{sname} transaction successful!</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      {/* <Button title="Sell Instrument" onPress={() => performTransaction({sell})} disabled={loading} 
     /> */}
    
     <TouchableOpacity style={styles.sellButton} onPress={() => performTransaction(sellType)} disabled={loading}> 
       <Text style={styles.Sell}>{Instrument}</Text>
     </TouchableOpacity>
      {/* <Button title="Buy Instrument" onPress={() => performTransaction('buy')} disabled={loading} 
       /> */}
      {/* </View> */}
    </View>
  );
};




const styles = StyleSheet.create({
    container: {
    
      flex:1,
      padding: 10,
    //top: 30,
      backgroundColor: 'white'
    },
    navBar: {
      marginTop: 17,
      flexDirection: 'row',
      //justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: '#3498db',
      padding: 15,
    },
    navTitle:{
      right: 15,
      // fontSize: 18,
      // fontWeight: 'bold'
      fontSize: 20,
      fontWeight: 'bold',
    },
    boldText:{
      fontWeight: 'bold'
    },
    backIcon:{
      right: 20
    },
    container1: {
     marginTop: 20,
     },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    info1:{
      left: 10,
      fontSize: 16,
    },
    // input:{
    //   fontWeight: 'bold',
    // },
    arrowdown:{
      width:30,
      height: 20,
      backgroundColor:'#A9A9A9',
      borderRadius: 5
    },
    arrow:{
      left: 10,
      top: -3,
      color: 'white'
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    label1:{
      top: 1,
      fontSize: 16,
      fontWeight: 'bold',
    },

    successText:{
      marginTop: 110,
      color: 'green'
    },
    info: {
      fontSize: 16,
    },
   
    sellButton: {
      backgroundColor: '#A9A9A9',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80,
      padding: 10,
      borderRadius: 6,
      marginHorizontal: 3
    },
    Sell: {
      color: 'white',
      fontSize: 20,
    },
  });
  
  export default Sell;


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
