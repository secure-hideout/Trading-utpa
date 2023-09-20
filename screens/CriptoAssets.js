import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AssetItem from './AssetItem';
import { AntDesign } from '@expo/vector-icons'; 

const CryptoAssets = ({ data }) => {
const navigation = useNavigation();

  // const handleSeeAll = () => {
  //   navigation.navigate('SeeAllItems');
  // };




  const handleSeeAll = () => {
    navigation.navigate('SeeAllItems', { assetData: data });
  };
  




  return (
    <View style={styles.containerAssets}>
      <View style={styles.imageContainer}>
        <View style={styles.logo}>
          <AntDesign style={styles.minusIcon} name="minus" size={50} color="black" />
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.assetText}>My Watchlist</Text>
        <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
          <Text style={styles.buttonText}>See All</Text>
        </TouchableOpacity>
      </View>

      {data.map((item, index) => (
        <AssetItem
          key={index}
          name2={item.name2}
          name3={item.name3}
          value={item.value}
          decimalValue={item.decimalValue}
          changePercentage={item.changePercentage}
          onPress={() => navigation.navigate('ListItemDeatails')}
        />
      ))}
    </View>
  );
};

const styles = {
  containerAssets: {
    marginTop: 15,
    padding: 7,
    flexDirection: 'column',
    backgroundColor: 'rgba(227, 233, 240, 1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginBottom: 10,
    padding: 7,
  },
  imageContainer: {
    alignItems: 'center',
  },
  logo: {
    marginTop: -7,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 20,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
   
  },
  minusIcon: {
    marginTop: -15,
  },
  button: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#1C1E32',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 600,
    lineHeight: 11.93,
    textAlign: 'center',
  },
  assetText: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 19.93,
    fontFamily: 'SFProDisplay',
    color: 'rgba(28, 30, 50, 1)',
  },
};

export default CryptoAssets;










// //images 
// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AssetItem from './AssetItem';
// import { AntDesign } from '@expo/vector-icons'; 

// const CryptoAssets = ({ data }) => {
//   const navigation = useNavigation();

//   const handleSeeAll = () => {
//     navigation.navigate('SeeAllItems');
//   };

//   return (
//     <View style={styles.containerAssets}>
//       <View style={styles.imageContainer}>
//           {/* <AntDesign style={styles.logo} name="minus" size={54} color="red" /> */}
//           <AntDesign style={styles.logo} name="minus" size={50} color="red" />
//         </View>
//       <View style={styles.headerContainer}>
        
//         <Text style={styles.assetText}>My Watchlist</Text>
//         <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
//           <Text style={styles.buttonText}>See All</Text>
//         </TouchableOpacity>
//       </View>

//       {data.map((item, index) => (
//         <AssetItem
//           key={index}
//           name2={item.name2}
//           name3={item.name3}
//           value={item.value}
//           decimalValue={item.decimalValue}
//           changePercentage={item.changePercentage}
//           onPress={() => navigation.navigate('ListItemDeatails')}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = {
//   containerAssets: {
//     marginTop: 20,
//     padding: 7,
//     flexDirection: 'column',
//     backgroundColor: 'rgba(227, 233, 240, 1)',
//     //backgroundColor: 'black',
//     borderTopLeftRadius: 30, // Add this to set border radius for top left corner
//     borderTopRightRadius: 30, // Add this to set border radius for top right corner
//     //overflow: 'hidden', // Add this to hide any overflow content

//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     //justifyContent: 'center',
//   },
//   // logo: {
//   //   backgroundColor: '#FFFFFF',
//   // },
//   logo: {
//     marginTop:-7,
//     backgroundColor: '#FFFFFF',
//     //zIndex: 1, // Add this to set the z-index to 1
//     //borderRadius:10,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     height: 30,
//     width:70,
//     //alignItems: 'center',
//   },
//   button: {
//     marginLeft: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     backgroundColor: '#1C1E32',
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     fontWeight: 600,
//     lineHeight: 11.93,
//     textAlign: 'center',
//   },
//   assetText: {
//     fontSize: 18,
//     fontWeight: 700,
//     lineHeight: 19.93,
//     fontFamily: 'SFProDisplay',
//     color: 'rgba(28, 30, 50, 1)',
//   },
// };

// export default CryptoAssets;


























// //Mywatchlist components



// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AssetItem from './AssetItem'; 

// const CryptoAssets = ({ data }) => {
//   const navigation = useNavigation();

//   const handleSeeAll = () => {
//     navigation.navigate('SeeAllItems');
//   };



//   return (
//     <View style={styles.containerAssets}>
//         <View style={styles.headerContainer}>
//             <Text style={styles.assetText}>My Watchlist</Text>
//             <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
//                 <Text style={styles.buttonText}>See All</Text>
//             </TouchableOpacity>
//         </View>
      
//         {data.map((item, index) => (
//             <AssetItem 
//                 key={index} 
//                 name2={item.name2} 
//                 name3={item.name3}
//                 value={item.value}
//                 decimalValue={item.decimalValue}
//                 changePercentage={item.changePercentage}
//                 onPress={() => navigation.navigate('ListItemDeatails')} />
//         ))}
//     </View>
// );

// };






// const styles = {
//   containerAssets: {
//     marginTop:20,
//     padding: 7,
//     flexDirection: 'column',  // Keep it 'column' since you want items to stack vertically
//     //backgroundColor: '#FFFFFF',
//     backgroundColor:'rgba(227, 233, 240, 1)',
    
//   },
//   headerContainer: {
//     flexDirection: 'row', // This will make children align horizontally
//     alignItems: 'center',  // Vertically align items in the middle
//     justifyContent: 'space-between',  // This will space out the text and button
//     marginBottom: 10, // Add some space between the header and the assets list
//   },
//   button: {
//     marginLeft: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     backgroundColor: '#1C1E32',
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     fontWeight: 600,
//     lineHeight: 11.93,
//     textAlign: 'center',
//   },
//   assetText: {
//     fontSize: 18,
//     fontWeight: 700,
//     lineHeight: 19.93,
//     fontFamily: 'SFProDisplay',
//     color: 'rgba(28, 30, 50, 1)',
//   },
// };

// export default CryptoAssets;






