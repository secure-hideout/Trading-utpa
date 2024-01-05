import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AssetDataContext from '../screens/AssetDataContext';
import Toast from 'react-native-toast-message';
import { fetchWatchlistData, removeFromWatchlistApi } from '../api';
import { useSelector } from 'react-redux';

const SeeAllItems = ({ navigation }) => {
  const { assetData, watchlist, removeFromWatchlist, setWatchlist } = useContext(AssetDataContext);
  const { token } = useSelector(state => state.auth);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [assetValues, setAssetValues] = useState({}); // State to store WebSocket updates
  const [filteredAssetData, setFilteredAssetData] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const updatedFilteredData = assetData.filter(item =>
      watchlist.some(watchlistItem => watchlistItem.Name === item.Name)
    );
    setFilteredAssetData(updatedFilteredData);
  }, [watchlist, assetData]);
  console.log("re-rendered")
  
  const webSocketRef = useRef(null);

  // Establishing and cleaning up the WebSocket connection
  useEffect(() => {
    webSocketRef.current = new WebSocket('ws://35.154.235.224:8767/realtime_data');

    webSocketRef.current.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(webSocketRef.current);
    };

    return () => {
      // if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
        webSocketRef.current.close();
        console.log('WebSocket connection closed.');
      // }
    };
  }, []);

  // Handling WebSocket messages
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.onmessage = (event) => {
        console.log('Received message watchlist:', event.data);
        try {
          const receivedData = JSON.parse(event.data);
          setAssetValues((prevValues) => ({
            ...prevValues,
            ...receivedData,
          }));
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
  }, [socket]);

  // Sending data through WebSocket
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN && filteredAssetData.length > 0) {
      const tradingSymbols = filteredAssetData.map(item => item.Tradingsymbol);
      console.log("Sending data:", JSON.stringify(tradingSymbols));
      socket.send(JSON.stringify(tradingSymbols));
    }
  }, [filteredAssetData, socket]);

  const handleBack = () => {
    navigation.navigate('Portfolio');
    // if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
    //   webSocketRef.current.close();
    //   console.log('WebSocket connection closed.');
    //   setSocket(null);
    // }
  };

  const handleFilter = () => {
    // Handle filter functionality here
  };

  const handleSearchIconClick = () => {
    navigation.navigate('SearchBarList', { assetData: assetData });
    // if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
    //   webSocketRef.current.close();
    //   console.log('WebSocket connection closed.');
    //   setSocket(null);
    // }
  };

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const fetchData = async () => {
    try {
      if (token) {
        const data = await fetchWatchlistData(token);
        setWatchlist(data);
      }
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await removeFromWatchlistApi(itemToDelete, token);
        fetchData();
        showToast('Removed from watchlist successfully');
      } catch (error) {
        console.error('Error during delete:', error);
      } finally {
        setDeleteConfirmationVisible(false);
      }
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setDeleteConfirmationVisible(false);
  };

  return (
    <>
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
            <Ionicons name="arrow-back-outline" size={24} color="black" style={{ marginLeft: -10 }} />
          </TouchableOpacity>
          <Text style={styles.title}>My Watch List</Text>
          <View style={styles.searchFilterContainer}>
            <TouchableOpacity onPress={handleSearchIconClick} style={styles.searchIcon}>
              <Image
                style={styles.rightImage}
                source={require("../assets/mask-group2.svg")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFilter} style={styles.filterIcon}>
              <Image
                source={require('../assets/filter.png')}
                style={styles.filterImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerItem}>
          {filteredAssetData.map((item, index) => {
            const symbol = item.Tradingsymbol;
            const assetValue = assetValues[symbol]?.lastPrice || item.value;

            return (
              <AssetItem
                key={index}
                name2={item.name2}
                name3={item.name3}
                symbol={item.Tradingsymbol}
                value={assetValue}
                onPress={() => {
                  navigation.navigate('Allgraphs', {
                    instrumentId: item?.instrumentId,
                    instrumentType: item?.instrumentType,
                  });
                }}
                onRemove={() => showDeleteConfirmation(item)}
                showRemoveIcon={true}
                showAddIcon={false}
              />
            );
          })}
        </View>
      </ScrollView>



      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'row',
  //   marginTop: 10,
  //   paddingVertical: 30,
  //   backgroundColor: '#f5f5f5',
  //   //backgroundColor: 'rgba(227, 233, 240, 1)',
  // },
  fixedHeader: {
    backgroundColor: '#f5f5f5',
    paddingTop: 30, // adjust this value if necessary
    marginTop: 10,
  },


  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  containerItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, // Add padding to the top so the content starts below the header
    paddingHorizontal: 10, // Maintain the horizontal padding from the original style
  },

  filterImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },


  rightImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  leftContainer: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  rightContainer: {
    marginLeft: 'auto',
  },
  containerSearchBar: {
    padding: 10,
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40, // Adjust the height as needed
  },

  containerItem: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'rgba(227, 233, 240, 1)',
  },

});

export default SeeAllItems;










//before web socket 
// import React, { useContext, useState, useEffect } from 'react';
// import AssetDataContext from '../screens/AssetDataContext';
// import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import DeleteConfirmationModal from './DeleteConfirmationModal';

// import { useSelector, useDispatch } from 'react-redux';

// import Toast from 'react-native-toast-message';


// import { fetchWatchlistData, removeFromWatchlistApi } from '../api';

// const SeeAllItems = ({ navigation }) => {
//   const { assetData, watchlist, removeFromWatchlist, setWatchlist } = useContext(AssetDataContext);
//   const { token } = useSelector(state => state.auth);
//   // const [watchlist,setWatchlist] = useState([]);
//   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   // const [watchlistState, setWatchlistState] = useState([]);
//   const [filteredAssetData, setFilteredAssetData] = useState([]);


//   useEffect(() => {
//     const updatedFilteredData = assetData.filter(item =>
//       watchlist.some(watchlistItem => watchlistItem.Name === item.Name)
//     );
//     setFilteredAssetData(updatedFilteredData);
//   }, [watchlist, assetData]); // Depend on watchlist and assetData


//   // console.log('Filtered Asset Data:', filteredAssetData); // Log filtered data

//   // console.log('Asset Data:', assetData);

//   const handleBack = () => {
//     navigation.navigate('Portfolio');
//   };

//   const handleFilter = () => {
//     // Handle filter functionality here
//   };

//   const handleSearchIconClick = () => {
//     navigation.navigate('SearchBarList', { assetData: assetData });
//   };


//   const showToast = (message) => {
//     Toast.show({
//       type: 'success',
//       // position: 'bottom',
//       text1: message,
//       visibilityTime: 3000,
//       autoHide: true,
//     });
//   };

//   const fetchData = async () => {
//     try {
//       if (token) {
//         const data = await fetchWatchlistData(token);
//         setWatchlist(data);
//       }
//     } catch (error) {
//       console.error('Error fetching watchlist data:', error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     // console.log('Watchlist in SeeAllItems:', watchlist); // Log watchlist in SeeAllItems
//   }, [watchlist]);

//   useEffect(() => {
//     const updatedFilteredData = assetData.filter(item =>
//       watchlist.some(watchlistItem => watchlistItem.Name === item.Name)
//     );
//     setFilteredAssetData(updatedFilteredData);
//   }, [watchlist, assetData]); // Depend on watchlist


//   const showDeleteConfirmation = (item) => {
//     setItemToDelete(item);
//     setDeleteConfirmationVisible(true);
//   };

//   const confirmDelete = async () => {
//     if (itemToDelete) {
//       try {
//         // await removeFromWatchlistApi(itemToDelete, token);
//         await removeFromWatchlist(itemToDelete, token);
//         fetchData();
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Removed from watchlist successfully',
//           visibilityTime: 3000,
//         });

//       } catch (error) {
//         console.error('Error during delete:', error);
//       } finally {
//         setDeleteConfirmationVisible(false);
//       }
//     }
//   };




//   const cancelDelete = () => {
//     setItemToDelete(null);
//     setDeleteConfirmationVisible(false);
//   };



//   return (
//     <>
//       <View style={styles.fixedHeader}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
//             <Ionicons name="arrow-back-outline" size={24} color="black" style={{ marginLeft: -10 }} />
//           </TouchableOpacity>

//           <Text style={styles.title}>My Watch List</Text>
//           <View style={styles.searchFilterContainer}>
//             <TouchableOpacity onPress={handleSearchIconClick} style={styles.searchIcon}>
//               <Image
//                 style={styles.rightImage}
//                 source={require("../assets/mask-group2.svg")}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleFilter} style={styles.filterIcon}>
//               <Image
//                 source={require('../assets/filter.png')}
//                 style={styles.filterImage}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.containerItem}>
//           {filteredAssetData.map((item, index) => {
//             // console.log('Item:', item); // Log the item object
//             return (
//               <AssetItem
//                 key={index}
//                 name2={item.name2}
//                 name3={item.name3}
//                 symbol={item.symbol}
//                 value={item.value}
//                 onPress={() => {
//                   // console.log('Navigating to Allgraphs with symbol:',);
//                   navigation.navigate('Allgraphs', {
//                     instrumentId: item?.instrumentId,
//                     instrumentType: item?.instrumentType,
//                   });
//                 }}
//                 onRemove={() => {
//                   console.log('Removing item:', item);
//                   showDeleteConfirmation(item);
//                 }}
//                 showRemoveIcon={true}
//                 showAddIcon={false}
//               />
//             );
//           })}
//         </View>
//       </ScrollView>



//       <DeleteConfirmationModal
//         visible={deleteConfirmationVisible}
//         onConfirm={confirmDelete}
//         onCancel={cancelDelete}
//       />
//     </>
//   );
// };


// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   alignItems: 'row',
//   //   marginTop: 10,
//   //   paddingVertical: 30,
//   //   backgroundColor: '#f5f5f5',
//   //   //backgroundColor: 'rgba(227, 233, 240, 1)',
//   // },
//   fixedHeader: {
//     backgroundColor: '#f5f5f5',
//     paddingTop: 30, // adjust this value if necessary
//     marginTop: 10,
//   },


//   searchFilterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 'auto',
//   },
//   containerItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 20, // Add padding to the top so the content starts below the header
//     paddingHorizontal: 10, // Maintain the horizontal padding from the original style
//   },

//   filterImage: {
//     width: 30,
//     height: 30,
//     marginLeft: 10,
//   },


//   rightImage: {
//     width: 30,
//     height: 30,
//     marginLeft: 10,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     width: '100%',
//   },
//   leftContainer: {
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',

//   },
//   rightContainer: {
//     marginLeft: 'auto',
//   },
//   containerSearchBar: {
//     padding: 10,
//     width: '100%',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     width: '100%',
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     height: 40, // Adjust the height as needed
//   },

//   containerItem: {
//     flex: 1,
//     width: '100%',
//     // backgroundColor: 'rgba(227, 233, 240, 1)',
//   },

// });

// export default SeeAllItems;

















