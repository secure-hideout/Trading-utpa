

// ViewPortfolio.js
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,onPress } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AssetCard from './AssetCard'; 

const ViewPortfolio = ({ assetData, selectedCard }) => {
  const navigation = useNavigation();


  const cardData = {
    Crypto: [
      {
        name2: 'BNB',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ETC',
        name3: 'BTC',
        value: '$27,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ETH',
        name3: 'BTC',
        value: '$1,633',
        decimalValue: '.60',
        changePercentage: '+7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
  
      {
        name2: 'XRP',
        name3: 'BTC',
        value: '$0.522',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'SOL',
        name3: 'BTC',
        value: '$23.3',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'AVAX',
        name3: 'BTC',
        value: '$10.6',
        decimalValue: '.60',
        changePercentage: '+7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'JUV',
        name3: 'BTC',
        value: '$1.11',
        decimalValue: '.60',
        changePercentage: '+7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
     
    ],
    NSE: [
      {
        name2: 'FORCE',
        name3: 'BTC',
        value: '$30,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'HONDA',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'TATA',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'APPLE',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'TESLA',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'JIO',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      
    ],
    BSE: [
      {
        name2: 'ACC',
        name3: 'BTC',
        value: '$30,618',
        decimalValue: '.60',
        changePercentage: '-7.90%',
        logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ADANI',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ADITYA',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ALKEM',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ATUL',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'ASTRAL',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      // Add more data for BSE here
    ],
    Comodity: [
      // {
      //   name2: 'Commodity',
      //   name3: 'BTC',
      //   value: '$30,618',
      //   decimalValue: '.60',
      //   changePercentage: '-7.90%',
      //   logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      // },
      {
        name2: 'BNB',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'BNB',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'BNB',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      {
        name2: 'BNB',name3: 'BTC',value: '$212.4',decimalValue: '.60',changePercentage: '+7.90%',logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
      },
      
    ],
  };

  // Get the data for the selected card
  const selectedCardData = cardData[selectedCard];

  const handleItemPress = (item) => {
    // Handle the item press, for example, navigate to another screen
    console.log('Item Pressed:', item);
  };


  return (
    
    <View style={styles.container}>
      <View style={styles.portfolio}>
        <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text>
      </View>
      {selectedCardData ? (
        selectedCardData.map((data, index) => (
          <AssetCard data={data} key={index}  onPress={() => navigation.navigate('ListItemDeatails')} /> // Use the AssetCard component here
        ))
      ) : (
        // <Text style={styles.cardDataText}>No data available for {selectedCard}</Text>
         <Text style={styles.cardDataText}> {selectedCard}</Text>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#f5f5f5',
  },
  portfolio: {
    //marginBottom: 20,
  },
  portfolioText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDataText: {
    //fontSize: 16,
    //smarginVertical: 4,
  },
  // Add more styles as needed
});

export default ViewPortfolio;



























// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const ViewPortfolio = ({ assetData, selectedCard }) => {
//   const navigation = useNavigation();

//   // Create a mapping of card names to their respective hardcoded data
//   const cardData = {
//     Crypto: [
//       {
//         name2: 'Crypto 1',
//         name3: 'BTC 1',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'Crypto 2',
//         name3: 'BTC 2',
//         value: '$40,618',
//         decimalValue: '.70',
//         changePercentage: '-6.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'Crypto 2',
//         name3: 'BTC 2',
//         value: '$40,618',
//         decimalValue: '.70',
//         changePercentage: '-6.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       // Add more data for Crypto here
//     ],
//     NSE: [
//       {
//         name2: 'NSE 1',
//         name3: 'BTC 1',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'NSE 2',
//         name3: 'BTC 2',
//         value: '$40,618',
//         decimalValue: '.70',
//         changePercentage: '-6.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       // Add more data for NSE here
//     ],
//     BSE: [
//       {
//         name2: 'BSE 1',
//         name3: 'BTC 1',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'BSE 2',
//         name3: 'BTC 2',
//         value: '$40,618',
//         decimalValue: '.70',
//         changePercentage: '-6.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       // Add more data for BSE here
//     ],
//     Comodity: [
//       {
//         name2: 'Commodity 1',
//         name3: 'BTC 1',
//         value: '$30,618',
//         decimalValue: '.60',
//         changePercentage: '-7.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       {
//         name2: 'Comodity 2',
//         name3: 'BTC 2',
//         value: '$40,618',
//         decimalValue: '.70',
//         changePercentage: '-6.90%',
//         logo: 'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg',
//       },
//       // Add more data for Commodity here
//     ],
//   };

//   // Get the data for the selected card
//   const selectedCardData = cardData[selectedCard];

//   return (
//     <View style={styles.container}>
//       <View style={styles.portfolio}>
//         <Text style={styles.portfolioText}>{selectedCard} Portfolio</Text>
//       </View>
//       {selectedCardData ? (
//         selectedCardData.map((data, index) => (
//           <View style={styles.cardDataContainer} key={index}>
//             <View style={styles.leftContainer}>
//               <Text style={styles.cardDataText}>Name2: {data.name2}</Text>
//               <Text style={styles.cardDataText}>Name3: {data.name3}</Text>
//             </View>
//             <View style={styles.centerContainer}>
//               <Text style={styles.cardDataText}>Value: {data.value}</Text>
//             </View>
//             <View style={styles.rightContainer}>
//               <Text style={styles.cardDataText}>Decimal Value: {data.decimalValue}</Text>
//               <Text style={styles.cardDataText}>Change Percentage: {data.changePercentage}</Text>
//             </View>
//             {/* <Image source={{ uri: data.logo }} style={styles.cardDataImage} /> */}
//           </View>
//         ))
//       ) : (
//         <Text style={styles.cardDataText}>No data available for {selectedCard}</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:'red',
//   },
//   portfolio: {
//     marginBottom: 20,
//   },
//   portfolioText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   cardDataContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   leftContainer: {
//     flex: 1,
//     alignItems: 'flex-start',
//   },
//   centerContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   rightContainer: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   cardDataText: {
//     fontSize: 16,
//     marginVertical: 4,
//   },
//   // Add more styles as needed
// });

// export default ViewPortfolio;












// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const ViewPortfolio = ( { assetData } ) => {
//   const navigation = useNavigation();

//   const goBack = () => {
//     // navigation.goBack('Dashboard02');rewritten like below for navigate 
//     navigation.navigate('Home');
//   };

//   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity onPress={goBack} style={styles.backButton}>
// //         {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
// //         <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
// //       </TouchableOpacity>
// //       <Text style={styles.title}>Current Portfolio Value</Text>
// //     </View>
// //   );
// // };

// <View style={styles.container}>
// <TouchableOpacity onPress={goBack} style={styles.backButton}>
//   {/* <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} /> */}
// </TouchableOpacity>
// {/* <Text style={styles.title}>Current Portfolio Value</Text> */}

// {/* Display the selected card's portfolio information */}
// <Text style={styles.portfolioText}>{assetData.name} Portfolio</Text>
// {/* <Text style={styles.portfolioValue}>Portfolio Value: {assetData.value}</Text> */}
// {/* <Text style={styles.portfolioChange}>Change Percentage: {assetData.changePercentage}</Text> */}




//   </View>

// );
// };

// const styles = {
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     paddingVertical: 30,
//     // paddingHorizontal: 20,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   backIcon: {
//     width: 24,
//     height: 24,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// };

// export default ViewPortfolio;