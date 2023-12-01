import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
            style={[styles.input, quantity && styles.boldText]}
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

    flex: 1,
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
  navTitle: {
    right: 15,
    // fontSize: 18,
    // fontWeight: 'bold'
    fontSize: 20,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold'
  },
  backIcon: {
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
  info1: {
    left: 10,
    fontSize: 16,
  },
  // input:{
  //   fontWeight: 'bold',
  // },
  arrowdown: {
    width: 30,
    height: 20,
    backgroundColor: '#A9A9A9',
    borderRadius: 5
  },
  arrow: {
    left: 10,
    top: -3,
    color: 'white'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label1: {
    top: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },

  successText: {
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
