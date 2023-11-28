
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
  
        <View style={styles.forRow1}>
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
        </View>
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
    },
    forRow1: {
      marginTop: 2,
     // marginLeft: 2,
      flexDirection: 'row',
      width: '97.5%',
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
  

  
//     <View style={styles.info}>
//     <View style={styles.forRow}>
//       <View style={styles.rectanglebox1}>
//         <View style={styles.daily1}>
//           <Text style={styles.dailyval}>{Dval}</Text>
//           <Text style={styles.dailyvalue}>{value}</Text>
//         </View>
//         <View style={styles.market1}>
//           <Text style={styles.market}>{Market}</Text>
//           <Text style={styles.marketvalue}>{value1}</Text>
//         </View>
//       </View>
//     </View>

//     <View style={styles.forRow1}>
//       <View style={styles.rectanglebox2}>
//         <View style={styles.btc}>
//           <Text style={styles.volbtc}>{VolBTC}</Text>
//           <Text style={styles.btcvalue}>{Value2}</Text>
//         </View>
//         <View style={styles.usdt}>
//           <Text style={styles.volusdt}>{VolUSDT}</Text>
//           <Text style={styles.usdtvalue}>{value3}</Text>
//         </View>
//       </View>
//     </View>
//   </View>
// );
// };
// }

// const styles = StyleSheet.create({

//   info: {
//     marginTop: 10, // Add some top margin for spacing
//   },
//   forRow: {
//     flexDirection: 'row',
//     width: '98%', // Ensure the width of the row is 100%
//     marginBottom: 10, // Add some bottom margin for spacing
//   },
//   forRow1: {
//     flexDirection: 'row', 
//     width: '98%', 
//   },
//   rectanglebox1: {
//     flexDirection: 'row', 
//     flex: 1,
//     backgroundColor: 'lightblue',
//     padding: 10,
//     margin: 5,
    
//   },
//   rectanglebox2: {
//     flexDirection: 'row', 
//     flex: 1,
//     backgroundColor: 'lightcoral',
//     padding: 10,
//     margin: 5,
//    alignItems: 'center', // Center content horizontally
//   },
//   daily1: {
//     flexDirection: 'row',
//     // justifyContent: 'flex-end',
//   },
//   market1: {
//     flexDirection: 'row',
//   },
//   btc: {
//     flexDirection: 'row',
//   },
//   usdt: {
//     flexDirection: 'row',
//     //justifyContent: 'flex-end',
//   },
//   // Add styles for other components as needed
// });



// info: {
//   flexDirection: 'column', // Main axis is vertical
//   justifyContent: 'space-around',
//   flexDirection: 'column', // Main axis is vertical
//  // margin: 10,
//  justifyContent: 'space-around',
// },
// forRow: {
//  // display: 'flex',
//   flexDirection: 'row', // Sub-containers are arranged in a row
//  // justifyContent: 'space-around',
// },
// forRow1: {
//   flexDirection: 'row', // Sub-containers are arranged in a row
//   justifyContent: 'space-around',
// },
// rectanglebox1: {
//   flexDirection: 'row',
//   width: '97%', // Set width to 98%
//   backgroundColor: 'lightblue',
//   padding: 10,
//   margin: 5,
// },
// rectanglebox2: {
//   flexDirection: 'row',
//   width: '97%', // Set width to 98%
//   backgroundColor: 'lightcoral',
//   padding: 10,
//   margin: 5,
// },
// daily1: {
//   justifyContent: 'flex-end',
//   flexDirection: 'row',
//   //justifyContent: 'space-around'
//   // Your styles for daily1
// },
// market1: {
//   flexDirection: 'row',
//   // Your styles for market1
// },
// btc: {
//   flexDirection: 'row',
//   // Your styles for btc
// },
// usdt: {
//   flexDirection: 'row',
//   // Your styles for usdt
// },
// // Add styles for other components as needed
// });

  export default Rectangleboxes2;





// import React,{Component} from 'react';
// import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView ,FlatList } from 'react-native';
// import { Border, Color, FontFamily, FontSize} from "../GlobalStyles";

// // const Rectangleboxes1 = ({
// class Rectangleboxes2 extends Component{
    
//   render() {
//     const { 
//       Dval  , value ,
//      Market , value1 ,
//      VolBTC , Value2 ,
//      VolUSDT , value3 ,
//     } = this.props;
// // }) => {
 
// return (
//     <View style={styles.info}>
//     <View style={styles.forRow}>
//     <View style={styles.rectanglebox1}>
//       <View style={styles.daily1}>
//           <Text style={styles.dailyval}>{Dval}</Text>
//           <Text style={styles.dailyvalue}>{value}</Text>
//           </View>
//       <View style={styles.market1}>
//           <Text style={styles.market}>{Market}</Text>
//           <Text style={styles.marketvalue}>{value1}</Text>
//       </View>
      
//    </View>
//    </View>
//    <View style={styles.forRow1}>
//    <View style={styles.rectanglebox2}>
//        <View style={styles.btc}>
//           <Text style={styles.volbtc}>{VolBTC}</Text>
//           <Text style={styles.btcvalue}>{Value2}</Text>
//         </View>
//       <View style={styles.usdt}>
//           <Text style={styles.volusdt}>{VolUSDT}</Text>
//           <Text style={styles.usdtvalue}>{value3}</Text>
//       </View> 
//    </View>  
//    </View> 
//    </View>

//   );
// };
// }

// const styles=StyleSheet.create({
//     info:{
        
//       },
//     rectanglebox1:{
//         height: 40,
//         width: '99%',
//         borderWidth: 1,
//         left: 2,
//         borderColor: '#BEBEBE',
//         borderRadius: Border.br_3xs,
//       },
//       daily1:{
//         flexDirection: 'row',
//         top: 10,
        
    
//       },
//       forRow:{
//         flexDirection:'row',
//       },
//       forRow1:{
//         paddingVertical: 5,
//         flexDirection:'row',
//       },
//       dailyval:{
//         flex: 1,
//         color: '#1C1E32',
//       },
//       dailyvalue:{
//         marginRight: 210,
//         fontWeight: 'bold',
//       },
//       market1:{
//         flexDirection: 'row',
//       },
//       market:{
//         flex: 1,


//       },
//       marketvalue:{
//        // left: -23,
//         fontWeight: 'bold',
//       },
//       rectanglebox2:{
       
//         height: 40,
//         width: '99%',
//         borderWidth: 1,
//         left: 2,
//         borderColor: '#BEBEBE',
//         borderRadius: Border.br_3xs,
//       },
//       btc:{
//         flexDirection: 'row',
//         top: 10,
//         flex: 1,
//       },
//       usdt:{
//         flexDirection: 'row',
//         top: -8,
//        // left: 100
//       },
//       volbtc:{
//         flex: 1,
//        // left: 22,
//         color: '#1C1E32',
//       },
//       btcvalue:{
//         right: 210,
//         fontWeight: 'bold',
//       },
//       volusdt:{
//         flex: 1,
//         paddingLeft: '30%',
//         color: '#1C1E32',
//       },
//       usdtvalue:{
//        // left: -124,
//         fontWeight: 'bold',
//       },

// })

// export default Rectangleboxes2;