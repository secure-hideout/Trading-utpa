
  import React,{Component} from 'react';
  import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView ,FlatList } from 'react-native';
  import { Border, Color, FontFamily, FontSize} from "../GlobalStyles";
  
  class Rectangleboxes2 extends Component{
      
    render() {
      const { 
        Dval  , value ,
       Market , value1 ,
       VolBTC , Value2 ,
       VolUSDT , value3 ,
      } = this.props;
   
  return (
      <View style={styles.info}>
        <View style={styles.forRow}>
          <View style={styles.rectanglebox1}>
            <View style={styles.daily1}>
              <Text style={styles.dailyval}>{Dval}</Text>
              <Text style={styles.dailyvalue}>{value}</Text>
            </View>
            <View style={styles.market1}>
              <Text style={styles.market}>{Market}</Text>
              <Text style={styles.marketvalue}>{value1}</Text>
            </View>
          </View>
        </View>
  
        {/* <View style={styles.forRow1}>
          <View style={styles.rectanglebox2}>
            <View style={styles.btc}>
              <Text style={styles.volbtc}>{VolBTC}</Text>
              <Text style={styles.btcvalue}>{Value2}</Text>
            </View>
            <View style={styles.usdt}>
              <Text style={styles.volusdt}>{VolUSDT}</Text>
              <Text style={styles.usdtvalue}>{value3}</Text>
            </View>
          </View>
        </View> */}
      </View>
    );
  };
}
  
  const styles = StyleSheet.create({
    info:{
    //  marginLeft: 25
    //  marginBottom: 2,
    },
    forRow: {
      flexDirection: 'row',
      width: '98%',
      marginRight: 1
    },
    forRow1: {
      marginTop: 2,
     // marginLeft: 2,
      flexDirection: 'row',
      width: '97.50%',
      marginLeft: 1
    },
    rectanglebox1: {
      paddingRight: 20,
      flexDirection: 'row',
      flex: 1,
      borderWidth: 1,
      borderColor: '#BEBEBE',
      borderRadius: Border.br_3xs,
      padding: 10,
      margin: 2,
    },
    rectanglebox2: {
     
      paddingRight: 20,
      borderWidth: 1,
      borderColor: '#BEBEBE',
      borderRadius: Border.br_3xs,
      flexDirection: 'row',
      flex: 1,
      padding: 10,
      margin: 1,
    },
    daily1: {
      paddingLeft: 8,
      flexDirection: 'row',
      flex: 1, // Take up the available space
      justifyContent: 'space-between', // Space between the child elements
      alignItems: 'center', // Center the
    },
    market1: {
      paddingLeft: 20,
      flexDirection: 'row',
      flex: 1, // Take up the available space
      justifyContent: 'space-between', // Space between the child elements
      alignItems: 'center', // Center the content vertically
    },
    usdt: {
      paddingLeft: 20,
      flexDirection: 'row',
      flex: 1, // Take up the available space
      justifyContent: 'space-between', // Space between the child elements
      alignItems: 'center', // Center the content vertically
    },
    btc: {
      paddingLeft: 9,
      flexDirection: 'row',
      flex: 1, // Take up the available space
      justifyContent: 'space-between', // Space between the child elements
      alignItems: 'center', // Center the content vertically
    },
    marketvalue:{
      fontWeight: 'bold',
    },
    dailyvalue:{
      fontWeight: 'bold',
    },
    btcvalue:{
      fontWeight: 'bold',
    },
    usdtvalue:{
      fontWeight: 'bold',
    }
  });

  export default Rectangleboxes2;



