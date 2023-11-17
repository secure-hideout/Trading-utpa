import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { useState } from 'react';
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';





const Graphnavbar = ({
  // Name = { Name },
  Name,
  Price,
  // priceVal = "30,00000",
  priceVal,
  pricePer = "-7.35",
  goBack,

}) => {

  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  //const [showSidebar, setShowSidebar] = useState(false);
  const navigation = useNavigation();

  // const handleBackPress = () => {
  //   navigation.navigate('SeeAllItems');
  // };

  const handleBackPress = () => {
    goBack(); // Call the provided goBack function
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box1]}>
        <TouchableOpacity style={styles.backbutton} onPress={handleBackPress}>
          <View style={styles.backicon}>
            <Ionicons name="arrow-back-outline" size={26} color="black " />
          </View>
        </TouchableOpacity>
        <View style={styles.text1}>
          <Text style={styles.bitcoin}>{Name}</Text>
        </View>
      </View>

      <View style={styles.forRow}>
        <TouchableOpacity style={styles.box0} onPress={() => {
          alert('processing..')
        }}>
          <Text style={styles.bitcoinprice}>{Price}</Text>
          <Text style={styles.bitcoinprice1}>{priceVal}</Text>
          <View style={styles.valuep}>
            <Text style={styles.value}>{pricePer}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    padding: 1,
    top: 45
  },
  box1: {
    top: -18,
    height: 60,
    paddingLeft: 2,
    width: '98%',
    //backgroundColor: "red",
    display: 'flex',
    flexDirection: 'row',
    zIndex: 2,

  },
  forRow0: {
    flexDirection: 'row',
  },

  rectanglebox1: {
    bottom: 505,
    height: 40,
    width: '98%',
    borderWidth: 1,
    left: 1,
    borderColor: '#BEBEBE',
    borderRadius: Border.br_3xs,
  },

  backbutton: {
    top: -35,
    zIndex: 1
  },
  sideBar1: {
    left: 117,
    top: -19,
  },
  backicon: {
    top: 49,
    left: -5,
    height: 30,
    width: 40,
  },
  bitcoinbox: {
    height: 37,
    width: 37,
    backgroundColor: Color.peachpuff,
    marginLeft: 21,
    marginTop: 12,
    borderRadius: 20,
    // marginTop:10,
  },
  forRow: {
    flexDirection: 'row'
  },
  bitcoinSvgrepoCom1Icon: {
    top: 5,
    left: 5,
    width: 25,
    height: 25,
  },
  text1: {
    top: 5,
    left: -70,


  },
  bitcoin: {
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 60,
    fontSize: 20,
  },
  bitcoin1: {
    color: "#747474",
    paddingTop: 1,
    left: 65,
  },
  bitcoinbox1: {

    borderRadius: 20,           //Border.br_3xs,
    marginTop: 1,
    left: 240,
    height: 35,
    width: 35,
    backgroundColor: Color.aliceblue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 1,
  },

  ///////////////////////
  box0: {
    top: -27,
    height: 76,

    width: '99%',
    left: 2,
    backgroundColor: Color.powderblue,
    borderRadius: Border.br_3xs,
  },
  bitcoinprice: {
    top: 11,
    left: 10,
  },
  bitcoinprice1: {
    top: 15,
    left: 9,
    fontSize: 23,
    fontWeight: 'bold',
  },
  valuep: {
    width: 55,
    height: 24,
    left: 135,
    top: -14,
    backgroundColor: 'white',
    borderRadius: Border.br_3xs,
  },
  value: {
    top: 5,
    left: 10,
    fontSize: 11,
    fontWeight: 'bold'
  },
})

export default Graphnavbar;


























