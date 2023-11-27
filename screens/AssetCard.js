import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AssetCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(data)}>
      <View style={styles.nameContainer}>
        <View style={styles.name2Wrapper}>
          <Text style={styles.cardDataText}>{data.name2}</Text>
        </View>
        <View style={styles.name3Wrapper}>
          <Text style={styles.cardDataText1}>{data.name3}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>QUANTITY:</Text>
        <Text style={styles.decimal}>{data.decimalValue}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{data.value}</Text>
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
    // height: 55,
  },
  nameContainer: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
  },
  name2Wrapper: {
    flexShrink: 1,
    marginRight: 30,
  },
  name3Wrapper: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{ translateY: -10 }],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2.5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(28, 30, 50, 0.6)',
    marginRight: 4,
  },
  decimal: {
    fontSize: 16,
    fontWeight: '700',
    color: 'green',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1E32',
  },
  cardDataText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(28, 30, 50, 1)',

  },
  cardDataText1: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(28, 30, 50, 0.6)',
  },
});

export default AssetCard;








//woadjust the name2
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// // const AssetCard = ({ data, onPress }) => {
// //   const navigation = useNavigation(); // Initialize navigation

// //   const getButtonColor = () => {
// //     if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
// //     if (data.changePercentage && data.changePercentage[0] === '-') return '#EAC9B1';
// //     return '#FFFFFF'; // Default color
// //   };

// //   const handlePress = () => {
// //     if (onPress) {
// //       onPress(data);
// //     } else {
// //       // Navigate to a specific screen (replace 'TargetScreen' with the name of the screen you want to navigate to)
// //       navigation.navigate('ListItemDeatails', { data });
// //     }
// //   };

// //   const isPositiveChange = data.changePercentage && data.changePercentage[0] === '+';
// const AssetCard = ({ data, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.container} onPress={() => onPress(data)}>
//       <View style={styles.nameContainer}>
//         <Text style={styles.cardDataText}>{data.name2}</Text>
//         <Text style={styles.cardDataText1}>{data.name3}</Text>
//       </View>
//       <View style={styles.quantityContainer}>
//         <Text style={styles.quantityLabel}>QUANTITY:</Text>
//         <Text style={styles.decimal}>{data.decimalValue}</Text>
//       </View>
//       <View style={styles.valueContainer}>
//         <Text style={styles.value}>{data.value}</Text>
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
//     height: 55,
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flex: 2,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1.5, // Adjust this flex value to control the width of the quantity container
//   },
//   valueContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     flex: 1,
//   },
//   quantityLabel: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'rgba(28, 30, 50, 0.6)',
//     marginRight: 4,
//   },
//   decimal: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'green',
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1C1E32',
//   },
//   cardDataText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'rgba(28, 30, 50, 1)',
//     marginRight: 4,
//   },
//   cardDataText1: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'rgba(28, 30, 50, 0.6)',
//     marginRight: 4,
//   },
// });

// export default AssetCard;





// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// const AssetCard = ({ data, onPress }) => {
//   const navigation = useNavigation(); // Initialize navigation

//   const getButtonColor = () => {
//     if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
//     if (data.changePercentage && data.changePercentage[0] === '-') return '#EAC9B1';
//     return '#FFFFFF'; // Default color
//   };

//   const handlePress = () => {
//     if (onPress) {
//       onPress(data);
//     } else {
//       // Navigate to a specific screen (replace 'TargetScreen' with the name of the screen you want to navigate to)
//       navigation.navigate('ListItemDeatails', { data });
//     }
//   };

//   const isPositiveChange = data.changePercentage && data.changePercentage[0] === '+';

//   return (
//     <TouchableOpacity style={styles.container} onPress={handlePress}>
//       <View style={styles.leftContainer}>
//         <Text style={styles.cardDataText}>{data.name2}</Text>
//         <Text style={styles.cardDataText1}>{data.name3}</Text>
//         <Text style={styles.quantityLabel}>Q</Text>
//         <Text style={styles.decimal}>{data.decimalValue}</Text>
//       </View>
//       {/* <View style={styles.centerContainer}>
//         <Text style={styles.value}>{data.value}</Text>
//       </View> */}
//       <View style={styles.rightContainer}>
//         <Text style={styles.value}>{data.value}</Text>
//         {/* <TouchableOpacity style={[styles.button, { backgroundColor: getButtonColor() }]}>
//           <FontAwesome5
//             name={isPositiveChange ? 'arrow-up' : 'arrow-down'}
//             style={[styles.icon, isPositiveChange ? styles.upIcon : styles.downIcon]}
//           />
//           <Text style={styles.changePercentage}>{data.changePercentage}</Text>
//         </TouchableOpacity> */}

//         {/* <Text style={styles.decimal}>{data.decimalValue}</Text> */}
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
//     height: 55,
//   },
//   quantityLabel: {
//     color: '#1C1E32',
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     marginRight: 4, // Add some space between the label and the value
//   },
//   decimal: {
//     color: 'green',
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     // marginLeft: 10,
//     // textAlign: 'center',
//     flex: 1,
//   },
//   leftContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItms: 'center',
//   },
//   centerContainer: {
//     width: 100,
//     alignItems: 'center',
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1C1E32',
//     lineHeight: 22,
//   },
//   button: {
//     flexDirection: 'row',
//     width: 48,
//     height: 20.2,
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     fontSize: 10,
//     marginRight: 2,
//   },
//   upIcon: {
//     color: 'black',
//   },
//   downIcon: {
//     color: 'black',
//   },
//   changePercentage: {
//     fontWeight: '500',
//     fontSize: 10,
//     lineHeight: 17.55,
//   },
//   cardDataText: {
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//   },
//   cardDataText1: {
//     // color: 'green',
//     color: 'rgba(28, 30, 50, 0.6)',
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     marginLeft: 10,
//   },

//   rightContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end', // Align items to the right
//     flex: 1, // Allow right content to take up available space
//   },
// });

// export default AssetCard;















//wo segment
// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// const AssetCard = ({ data, onPress }) => {
//   const navigation = useNavigation(); // Initialize navigation

//   const getButtonColor = () => {
//     if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
//     if (data.changePercentage && data.changePercentage[0] === '-') return '#EAC9B1';
//     return '#FFFFFF'; // Default color
//   };

//   const handlePress = () => {
//     if (onPress) {
//       onPress(data);
//     } else {
//       // Navigate to a specific screen (replace 'TargetScreen' with the name of the screen you want to navigate to)
//       navigation.navigate('ListItemDeatails', { data });
//     }
//   };

//   const isPositiveChange = data.changePercentage && data.changePercentage[0] === '+';

//   return (
//     <TouchableOpacity style={styles.container} onPress={handlePress}>
//       <View style={styles.leftContainer}>
//         <Text style={styles.cardDataText}>{data.name2}</Text>
//       </View>
//       <View style={styles.centerContainer}>
//         <Text style={styles.value}>{data.value}</Text>
//       </View>
//       <View style={styles.rightContainer}>
//         <TouchableOpacity style={[styles.button, { backgroundColor: getButtonColor() }]}>
//           <FontAwesome5
//             name={isPositiveChange ? 'arrow-up' : 'arrow-down'}
//             style={[styles.icon, isPositiveChange ? styles.upIcon : styles.downIcon]}
//           />
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
//     height: 55,
//   },
//   //   decimal: {
//   //   fontSize: 16,
//   //   marginRight:3,
//   //   color: '#A1A1A1',
//   //   fontWeight: 'bold',
//   //   lineHeight: 22, // Adjust the lineHeight to match value
//   // },
//   leftContainer: {
//     flex: 1,
//   },
//   centerContainer: {
//     width: 100,
//     alignItems: 'center',
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1C1E32',
//     lineHeight: 22,
//   },
//   button: {
//     flexDirection: 'row',
//     width: 48,
//     height: 20.2,
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     fontSize: 10,
//     marginRight: 2,
//   },
//   upIcon: {
//     color: 'black', // Change the color for positive change
//   },
//   downIcon: {
//     color: 'black', // Change the color for negative change
//   },
//   changePercentage: {
//     fontWeight: '500',
//     fontSize: 10,
//     lineHeight: 17.55,
//   },
//   cardDataText: {
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 19.09,
//     color: 'rgba(28, 30, 50, 1)',
//   },
// });

// export default AssetCard;
