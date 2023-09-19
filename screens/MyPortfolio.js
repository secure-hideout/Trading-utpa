//current Portfolio value 



import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPortfolio = () => {
  //newly added
  const navigation = useNavigation();

  const CurrentPortfolio = () => {
    navigation.navigate('ViewPortfolio');
  }
//end



  return (
    <TouchableOpacity onPress={CurrentPortfolio}>  
    <View style={styles.container2}>
      <View style={styles.portfolioContainer}>
        <Text style={styles.valueText}>Current Portfolio Value</Text>
        <View style={styles.valueAmount}>
          <Text style={styles.amountText}>$23,500</Text>
          <Text style={styles.decimalText}>.49</Text>
          <View style={styles.greenBox}>
            <Text style={styles.percentText}>+5.9%</Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = {
  container2: {
   // position: 'absolute',
  //  top: 100,
    //left: '50%',
    padding:10,
    //marginLeft: -191.5,
    alignItems: 'start',
    backgroundColor: '#FFFFFF',
  },
  valueText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19.09,
    color: '#A1A1A1',
    fontFamily: 'SFProDisplay',
  },
  portfolioContainer: {
    flexDirection: 'column',
  },
  valueAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 38.19,
    color: '#1C1E32',
    fontFamily: 'SFProDisplay',
  },
  decimalText: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 38.19,
    color: '#A1A1A1',
    fontFamily: 'SFProDisplay',
  },
  greenBox: {
    marginLeft: 10,
    backgroundColor: '#EAC9B1',
    width: 60,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 11.93,
    color: '#1C1E32',
    fontFamily: 'SFProDisplay',
  
  },
};

export default MyPortfolio;