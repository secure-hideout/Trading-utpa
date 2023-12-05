import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { useState } from 'react';
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Graphnavbar = ({
  Name,
  Price,
  Quantities,
  priceVal,
  pricePer = "-7.35",
  goBack,

}) => {

 
  const handleBackPress = () => {
    goBack(); // Call the provided goBack function
  };

  return (
    <View style={styles.container}>
      {/* <View style={[styles.box1]}>
        <TouchableOpacity style={styles.backbutton} onPress={handleBackPress}>
          <View style={styles.backicon1}>
            <Ionicons name="arrow-back-outline" size={25} color="black " />
          </View>
        </TouchableOpacity>
        <View style={styles.text1}>
          <Text style={styles.bitcoin}>{Name}</Text>
        </View>
      </View> */}

      <View style={styles.forRow}>
        <View style={styles.box0} >
          <View>
          <Text style={styles.bitcoinprice}> PRICE</Text>
           <View style={styles.bitcoinprice2}>
            <Text style={styles.bitcoinprice1}>{priceVal}</Text>
              <View style={styles.valuep}>
               <Text style={styles.value}>{pricePer}</Text>
               </View>
             </View>
             </View>
             <View style={styles.Quantity}>
             <Text style={styles.Quantity1}>Quantity</Text>
             <Text style={styles.Quantity2}>12</Text>
             </View>
            
            </View>
           
          </View>
       </View>

  );
};
const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  box1: {
    paddingTop: 20,
    marginTop: 20,
    backgroundColor: 'white',
    display: 'flex',
    right: 3,
    flexDirection: 'row',
   },
  backicon1: {
    paddingRight: 10,
  },
  bitcoinbox: {
    height: 37,
    width: 37,
    backgroundColor: Color.peachpuff,
    marginLeft: 21,
    marginTop: 12,
    borderRadius: 20,
  },
  forRow: {
    flexDirection: 'row',
  },
  bitcoin: {
   
    display: 'flex',
    paddingTop: 3,
    fontWeight: '700',
    fontSize: 18,
  },
  box0: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
    height: 76,
    width: '98.71%',
    left: 2,
    backgroundColor: Color.powderblue,
    borderRadius: Border.br_3xs,
  },
  bitcoinprice: {
    fontWeight:'500',
    fontSize: 17,
    paddingLeft: 5,
    paddingTop: 10,
    alignItems: 'center'
  },
  bitcoinprice1: {
    paddingLeft: 8,
    paddingTop: 5,
    fontSize: 23,
    fontWeight: 'bold',
  },
  valuep: {
    width: 55,
    height: 24,
    marginLeft: 3,
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
    //justifyContent: 'flex-end',
  },
  value: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold'
  },
  bitcoinprice2:{
    flexDirection: 'row'
  },
  Quantity:{
    //flex: 1,
    //justifyContent: 'spce-between',
    width: 110,
    height: 57,
    marginTop: 10,
    right: 10,
    paddingRight: 10,
   // marginLeft: 10,
   // marginTop: 8,
    backgroundColor: 'white',
    borderRadius: Border.br_3xs,
    //justifyContent: 'center',
  },
  Quantity1:{
   // flex: 1,
   fontWeight: '700',
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 4,
    textAlign: 'center'
   // justifyContent: 'space-between'
  },
  Quantity2:{
    color: 'green',
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 2,
    fontSize: 15,

  }
})

export default Graphnavbar;


























