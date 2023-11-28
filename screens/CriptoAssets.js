//My Watchlist 
import React from 'react';
import { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import ViewPortfolio from './ViewPortfolio';


const CryptoAssets = ({ data, onScrollToBottom ,selectedAsset,selectedCard, children}) => {
const [ setSelectedAsset] = useState({name:'Crypto'})
    const handleCardItemClick = (asset) => {
    setSelectedAsset(asset);
  };

  return (
    <View style={styles.containerAssets}>
      <View style={styles.imageContainer}>
        <View style={styles.logo}>
          <AntDesign style={styles.minusIcon} name="minus" 
          size={50} 
          color="black"
          onPress={onScrollToBottom}  
            />
        </View>
      </View>
      <View style={styles.headerContainer}>
        {/* <Text style={styles.assetText}>My Portfolio</Text> */}
        <Text style={styles.assetText}>{selectedCard} Portfolio</Text>
      </View>
{selectedAsset && (
        <ViewPortfolio assetData={selectedAsset} />
      )}

     
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.cardItem}
            onPress={() => handleCardItemClick(item)}
          >
            <View style={styles.cardContent}>
              <Text>{item.name}</Text>
              <Text>{item.value}</Text>
              <Text>{item.changePercentage}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
       {children}
 
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
    // fontFamily: 'SFProDisplay',
    color: 'rgba(28, 30, 50, 1)',
  },
};

export default CryptoAssets;






//wednessday



// import React from 'react';
// import { useContext, useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AssetItem from './AssetItem';
// import { AntDesign } from '@expo/vector-icons';
// import AssetDataContext from './AssetDataContext'; 


// // const CryptoAssets = ({ data }) => {


// const CryptoAssets = ({ data, onScrollToBottom }) => {
// const navigation = useNavigation();
//  const { setAssetData,watchlist } = useContext(AssetDataContext);
//  const [successMessage, setSuccessMessage] = useState('');
// const { assetData, removeFromWatchlist } = useContext(AssetDataContext);



// useEffect(() => {
//   if (successMessage) {
//     const timer = setTimeout(() => {
//       setSuccessMessage(''); // Clear the success message after a specified time (e.g., 3 seconds)
//     }, 2000); // Adjust the duration (in milliseconds) as needed

//     return () => clearTimeout(timer); // Clear the timer if the component unmounts
//   }
// }, [successMessage]);

// // const handleSeeAll = () => {
// //     navigation.navigate('SeeAllItems', { assetData: data });
    
   
// //   };


//   const filterAssetDataByWatchlist = (assetData, watchlist) => {
//     return assetData.filter((item) =>
//       watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)
//     );
//   };


//   const handleSeeAll = () => {
//     const watchlistData = filterAssetDataByWatchlist(assetData, watchlist);
//     navigation.navigate('SeeAllItems', { watchlistData });
//   };
  
//   // const handleRemove = (name2ToRemove) => {
//   //   const newAssetData = assetData.filter(item => item.name2 !== name2ToRemove);
//   //   setAssetData(newAssetData);
//   // }; 
//   const handleRemove = (name2ToRemove) => {
//     const newAssetData = assetData.filter(item => item.name2 !== name2ToRemove);
//     setAssetData(newAssetData);
//     setSuccessMessage('Item removed from watchlist successfully'); // Update the success message
//   };

//   return (
//     <View style={styles.containerAssets}>
//       <View style={styles.imageContainer}>
//         <View style={styles.logo}>
//           <AntDesign style={styles.minusIcon} name="minus" 
//           size={50} 
//           color="black"
//           onPress={onScrollToBottom}  
//             />
//         </View>
//       </View>
//       <View style={styles.headerContainer}>
//         <Text style={styles.assetText}>My Watchlist</Text>
//         <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
//           <Text style={styles.buttonText}>See All</Text>
//         </TouchableOpacity>
//       </View>

//       {watchlist.map((item, index) => (
//         <AssetItem
//           key={index}
//           name2={item.name2}
//           name3={item.name3}
//           value={item.value}
//           decimalValue={item.decimalValue}
//           changePercentage={item.changePercentage}
//           onPress={() => navigation.navigate('ListItemDeatails')}
         
//           onRemove={() => {
//             removeFromWatchlist(item);
//             setSuccessMessage('Item removed from watchlist successfully');
//           }}
//         />
//       ))}
//        {successMessage && (
//         <Text style={styles.successMessage}>{successMessage}</Text>
//       )}
 
//     </View>
//   );
// };