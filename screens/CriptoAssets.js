//My Watchlist 
import React from 'react';
import { useContext, useState } from "react";
import { View, Text, TouchableOpacity,TextInput } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import ViewPortfolio from './ViewPortfolio';


const CryptoAssets = ({ data, onScrollToBottom, selectedAsset, selectedCard, children }) => {
  const [setSelectedAsset] = useState({ name: 'Crypto' })
  const [searchTerm, setSearchTerm] = useState('');
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

      {/* <TextInput
        placeholder="Search..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={styles.searchBar}
      /> */}
      
      {selectedAsset && (
        <ViewPortfolio 
        assetData={selectedAsset}
        searchTerm={searchTerm} />
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
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
};

export default CryptoAssets;









//before the seach insert 
// //My Watchlist 
// import React from 'react';
// import { useContext, useState } from "react";
// import { View, Text, TouchableOpacity } from 'react-native';

// import { AntDesign } from '@expo/vector-icons';

// import ViewPortfolio from './ViewPortfolio';


// const CryptoAssets = ({ data, onScrollToBottom, selectedAsset, selectedCard, children }) => {
//   const [setSelectedAsset] = useState({ name: 'Crypto' })
//   const handleCardItemClick = (asset) => {
//     setSelectedAsset(asset);
//   };

//   return (
//     <View style={styles.containerAssets}>
//       <View style={styles.imageContainer}>
//         <View style={styles.logo}>
//           <AntDesign style={styles.minusIcon} name="minus"
//             size={50}
//             color="black"
//             onPress={onScrollToBottom}
//           />
//         </View>
//       </View>
//       <View style={styles.headerContainer}>
//         {/* <Text style={styles.assetText}>My Portfolio</Text> */}
//         <Text style={styles.assetText}>{selectedCard} Portfolio</Text>
//       </View>
//       {selectedAsset && (
//         <ViewPortfolio assetData={selectedAsset} />
//       )}


//       {data.map((item, index) => {
//         return (
//           <TouchableOpacity
//             key={index}
//             style={styles.cardItem}
//             onPress={() => handleCardItemClick(item)}
//           >
//             <View style={styles.cardContent}>
//               <Text>{item.name}</Text>
//               <Text>{item.value}</Text>
//               <Text>{item.changePercentage}</Text>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//       {children}

//     </View>
//   );
// };

// const styles = {
//   containerAssets: {
//     marginTop: 15,
//     padding: 7,
//     flexDirection: 'column',
//     backgroundColor: 'rgba(227, 233, 240, 1)',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     //marginBottom: 10,
//     padding: 7,
//   },
//   imageContainer: {
//     alignItems: 'center',
//   },
//   logo: {
//     marginTop: -7,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     height: 20,
//     width: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,

//   },
//   minusIcon: {
//     marginTop: -15,
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
//     // fontFamily: 'SFProDisplay',
//     color: 'rgba(28, 30, 50, 1)',
//   },
// };

// export default CryptoAssets;





