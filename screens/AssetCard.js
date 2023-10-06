// AssetCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons

const AssetCard = ({ data, onPress }) => {
  const getButtonColor = () => {
    if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
    if (data.changePercentage && data.changePercentage[0] === '-') return '#EAC9B1';
    return '#000000'; // Default color
  };

  const handlePress = () => {
    if (onPress) {
      onPress(data);
    }
  };

  const isPositiveChange = data.changePercentage && data.changePercentage[0] === '+';

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress(data)}>
      <View style={styles.leftContainer}>
        <Text style={styles.cardDataText}>{data.name2}</Text>
        
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.value}>{data.value}</Text>
        {/* <Text style={styles.decimal}>{data.decimalValue}</Text> */}
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: getButtonColor() }]}>
          <FontAwesome5
            name={isPositiveChange ? 'arrow-up' : 'arrow-down'}
            style={[styles.icon, isPositiveChange ? styles.upIcon : styles.downIcon]}
          />
          <Text style={styles.changePercentage}>{data.changePercentage}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomColor: '#E5E5E5',
    marginTop: 10,
    borderRadius: 10,
    height: 55,
  },
  //   decimal: {
  //   fontSize: 16,
  //   marginRight:3,
  //   color: '#A1A1A1',
  //   fontWeight: 'bold',
  //   lineHeight: 22, // Adjust the lineHeight to match value
  // },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    width: 100,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1E32',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    width: 48,
    height: 20.2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 10,
    marginRight: 2,
  },
  upIcon: {
    color: 'black', // Change the color for positive change
  },
  downIcon: {
    color: 'black', // Change the color for negative change
  },
  changePercentage: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 17.55,
  },
  cardDataText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
});

export default AssetCard;






// // AssetCard.js
// import React from 'react';
// import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

// const AssetCard = ({ data, onPress }) => {
//   const getButtonColor = () => {
//     if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
//     if (data.changePercentage && data.changePercentage[0] === '-') return '#FF5F5F';
//     return '#000000'; // Default color
//   };

//   const handlePress = () => {
//     if (onPress) {
//       onPress(data);
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.container} onPress={() => handlePress(data)}>
//       <View style={styles.leftContainer}>
//         <Text style={styles.cardDataText}>{data.name2}</Text>
//       </View>
//       <View style={styles.centerContainer}>
//         <Text style={styles.value}>{data.value}</Text>
//       </View>
//       <View style={styles.rightContainer}>
//         <TouchableOpacity style={[styles.button, { backgroundColor: getButtonColor() }]}>
//           <Text style={styles.changePercentage}>{data.changePercentage}</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderBottomWidth: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderBottomColor: '#E5E5E5',
//     marginTop: 10,
//     borderRadius: 10,
//     //height: 55,
//     minHeight: 55,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     //flex: 1,
//   },
//   centerContainer: {
//     flex: 1,
//     //alignItems: 'flex-start', 
//     //width: 100, 
//     alignItems: 'center', // Center the value text horizontally
    
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1C1E32',
//     lineHeight: 22,
//     //width: 80,
//     // flexGrow: 'left',
//     //alignItems: 'flex-start', 
    
    
//   },
//   button: {
//     width: 43,
//     height: 19.2,
//     borderRadius: 100,
//   },
//   changePercentage: {
//     fontWeight: '500',
//     fontSize: 10,
//     lineHeight: 17.55,
//     alignItems: 'center',
//     left: 4,
//   },
//   cardDataText: {
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//   },
// });

// export default AssetCard;





















































// // AssetCard.js
// import React from 'react';
// import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

// const AssetCard = ({ data, onPress }) => {
//   const getButtonColor = () => {
//     if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
//     if (data.changePercentage && data.changePercentage[0] === '-') return '#FF5F5F';
//     return '#000000'; // Default color
//   };

//   const handlePress = () => {
//     // Call the onPress callback provided by the parent component
//     if (onPress) {
//       onPress(data);
//     }
//   };
//   return (
    
//     // <View style={styles.container}>
//     // <TouchableOpacity style={styles.container} onPress={data}>
//     <TouchableOpacity style={styles.container} onPress = {handlePress} >
//       <View style={styles.leftContainer}>
//         <Text style={styles.cardDataText}> {data.name2}</Text>
//         {/* <Text style={styles.cardDataText}> {data.name3}</Text> */}
      

//       </View>
//       <View style={styles.rightContainer}>
//       <Text style={styles.value}> {data.value}</Text>
//         {/* <Text style={styles.decimal}> {data.decimalValue}</Text> */}
       
//         {/* <TouchableOpacity style={styles.button}> */}
//         <TouchableOpacity style={[styles.button, { backgroundColor: getButtonColor() }]}>
//         <Text style={styles.changePercentage}>
//           {data.changePercentage}</Text>
//         </TouchableOpacity>
//       </View>
//       {/* <Image source={{ uri: data.logo }} style={styles.cardDataImage} /> */}
      
//   </TouchableOpacity>
  
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flexDirection: 'row',
//     // justifyContent: 'space-between',
//     // borderWidth: 1,
//     // borderColor: 'gray',
//     // padding: 10,
//     // margin: 10,
//     // borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderBottomWidth: 1,
//     backgroundColor:"rgba(255, 255, 255, 0.8)",
//     //backgroundColor:'black',
//     borderBottomColor: '#E5E5E5',
//     marginTop:10,
//     borderRadius:10,
//     height:55,
//   },
//   leftContainer: {
//      //flex: 1,
//      //alignItems: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginRight:3,
//     color: '#1C1E32',
//     lineHeight: 22, // Adjust the lineHeight as needed
//   },
//   button: {
  
//     width:43,
//     height:19.2,
//     borderRadius:100,
//     //backgroundColor:'#EAC9B1',
//   },
//   changePercentage: {
//     // fontSize: 14,
//     // fontWeight: 'bold',
//     // color: 'black',

   
//     fontWeight: '500',
//     fontSize:10,
//     lineHeight:17.55,
//     alignItems:'center',
//     left:4,
    
//   },
//   decimal: {
//     fontSize: 16,
//     marginRight:3,
//     color: '#A1A1A1',
//     fontWeight: 'bold',
//     lineHeight: 22, // Adjust the lineHeight to match value
//   },
//   // logo: {
//   //   width: 25,
//   //   height: 25,
//   //   marginRight: 8,
//   //   backgroundColor:"rgba(227, 233, 240, 1)",
//   //   borderRadius:15,
//   // },
//   centerContainer: {
//     flexDirection: 'row',
//      //flex: 1,
//     // alignItems: 'center',
//     // fontSize: 16,
//     // fontWeight: 'bold',
//     // marginRight:3,
//     // color: '#1C1E32',
//     // lineHeight: 22, // Adjust the lineHeight as needed
//   },
//   rightContainer: {
//     // flex: 1,
//     // alignItems: 'flex-end',
//     flexDirection:'row',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end', // Align items to the right
//     flex: 1, // Allow right content to take up available space
//   },
//   cardDataText: {
//     // fontSize: 16,
//     // marginVertical: 4,
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color:'rgba(28, 30, 50, 1)',
//   },
//   cardDataImage: {
//     width: 50,
//     height: 50,
//   },
// });

// export default AssetCard;
