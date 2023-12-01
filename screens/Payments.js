import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Payments = ({ Instrument = "Sell Instrument", sname, LastPrice, instrumentType, instrumentId, quantity, sellType, Quantities }) => {
  const navigation = useNavigation();

  const sellPress = () => {
    navigation.navigate('Buy', {
      sname,
      sellType: 'sell',
      Pay: 'Sell',
      LastPrice,
      instrumentType,
      instrumentId,
      quantity,
      Instrument,
      Quantities

    });
  };
  const navigateBack = () => {
    navigation.goBack(); // Use navigation prop to go back
  };

  const buyPress = () => {
    navigation.navigate('Buy', {
      sname,
      sellType: 'buy',
      Pay: 'Buy',
      Instrument: 'Buy Instrument',
      LastPrice,
      instrumentType,
      instrumentId,
      quantity,
      Quantities
    });
  };

  // const sellPress = () => {

  //     navigation.navigate('Buy'); 
  //   };

  //   const buyPress = () => {

  //     navigation.navigate('Buy'); 
  //   };

  return (
    <View style={styles.sellandbuy}>

      <TouchableOpacity
        style={styles.button}
        onPress={sellPress}
      >
        <Text style={styles.sell}>Sell</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button1}
        onPress={buyPress}

      >
        <Text style={styles.buy}>Buy</Text>
      </TouchableOpacity>

    </View>

  );
};


const styles = StyleSheet.create({
  sellandbuy: {
    flexDirection: 'row',
    top: 275,
    //top: 5
    left: 10
  },
  button: {
    bottom: 235,
    left: -2,
    width: '47%',
    height: 47,
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
  button1: {
    bottom: 235,
    left: 5,
    width: '47%',
    height: 47,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  sell: {
    color: 'white',
    textAlign: 'center',
    top: 10,
    fontSize: 18,
  },
  buy: {
    color: 'white',
    textAlign: 'center',
    top: 10,
    fontSize: 18,
  },
})

export default Payments;

