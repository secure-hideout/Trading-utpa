import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';
import AssetDataContext from './AssetDataContext';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/authActions';
import Toast from 'react-native-toast-message';

const SearchBarList = ({ route }) => {
  const [socket, setSocket] = useState(null);
  const { assetData = [] } = route?.params || {};
  const navigation = useNavigation();
  const { addToWatchlist, watchlist } = useContext(AssetDataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssetData, setFilteredAssetData] = useState(assetData);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [lastReceivedData, setLastReceivedData] = useState({});
  const [assetValues, setAssetValues] = useState({});


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFilteredAssetData(assetData);
    });

    return unsubscribe;
  }, [navigation, assetData]);

  useEffect(() => {
    filterAssets();
  }, [searchQuery]);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token, dispatch]);
  useEffect(() => {
    // console.log("---------------------------------->", watchlist)
  })


  const handleBack = () => {
    navigation.goBack();
  };

  const handleFilter = () => {
    // Handle filter functionality here
  };

  const handleSearchBarClick = () => {
    // Open keyboard or perform additional actions
  };

  const filterAssets = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const filteredAssets = assetData.filter((item) =>
      item.name2.toLowerCase().includes(trimmedQuery)
    );
    setFilteredAssetData(filteredAssets);
  };


  const handleAddIconClick = async (item) => {
    console.log('Add icon clicked', item);

    if (!item.InstrumentId) {
      console.error('InstrumentId is missing');

      return;
    }


    const { InstrumentId, InstrumentType } = item;
    console.log('InstrumentId:', InstrumentId);
    console.log('InstrumentType:', InstrumentType);


    // Step 1: Check if the necessary details are present
    if (!InstrumentId || !InstrumentType) {
      console.error('InstrumentId and InstrumentType are required.');
      setSuccessMessage('Failed to add to watchlist');
      return;
    }

    // Step 2: Ensure token is available
    if (!token) {
      console.error('Authentication token is missing');
      setSuccessMessage('Authentication failed');
      return;
    }
    if (watchlist.some((watchlistItem) => watchlistItem.Zid === InstrumentId)) {
      // console.log('It`s Already in Your Watchlist');
      Toast.show({
        type: 'error', // Error toast
        text1: 'Error',
        text2: 'It`s Already in Your Watchlist',
        visibilityTime: 3000,
      });
    } else {

      try {
        await addToWatchlist(item, token);
        Toast.show({
          type: 'success', // Success toast
          text1: 'Success',
          text2: 'Added Watchlist Successfully',
          visibilityTime: 3000,
        });
      } catch (error) {
        console.error('Failed to add to watchlist:', error);
        // setSuccessMessage('Failed to add to watchlist');
        Toast.show({
          type: 'error', // Error toast
          text1: 'Error',
          text2: 'It`s Already in Your Watchlist',
          visibilityTime: 3000,
        });
      }
    }
  };


  useEffect(() => {
    const newSocket = new WebSocket('ws://35.154.235.224:8767/realtime_data');

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      console.log('Received message:', event.data);
      try {
        const receivedData = JSON.parse(event.data);

        // Store the last received data
        setLastReceivedData(receivedData);
        // setAssetValues(receivedData);
        setAssetValues((prevValues) => ({
          ...prevValues,
          ...receivedData,
        }));

        // ... (rest of the code remains the same)
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // ... (rest of the code remains the same)
  }, [searchQuery, assetData]);

  useEffect(() => {
    // If you want to send messages based on the data in the component,
    // you can do it here, for example, when assetData changes.
    if (socket && socket.readyState === WebSocket.OPEN) {
      const tradingSymbols = assetData.map(item => item.Tradingsymbol);
      console.log(tradingSymbols)
      socket.send(JSON.stringify(tradingSymbols));
    }
  }, [assetData, socket]);
  // ... rest of the component code


  return (
    <>
      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
            <Ionicons name="arrow-back-outline" size={24} color="black" style={{ marginLeft: -10 }} />
          </TouchableOpacity>
          <Text style={styles.backText}>Asset List</Text>
          <TouchableOpacity onPress={handleFilter} style={styles.rightContainer}>
            <Image source={require('../assets/filter.png')} style={styles.filterImage} />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.containerSearchBar}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="gray"
            selectionColor="black"
            autoFocus={true}
            onFocus={handleSearchBarClick}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* <ScrollView style={styles.scrollContainer}>
        <View style={styles.containerItem}>
          {searchQuery === '' ? (
            // Render nothing when searchQuery is empty
            null
          ) : filteredAssetData.length === 0 ? (
            <Text style={styles.noDataMessage}>Data not found</Text>
          ) : (
            filteredAssetData.map((item) => (
              
              <AssetItem
                key={item.InstrumentId}
                name2={item.name2}
                name3={item.name3}
                // value={item.value}
                value={assetValues[item.symbol]?.lastPrice || item.value}
                decimalValue={item.decimalValue}
                changePercentage={item.changePercentage}
                // onPress={() => navigation.navigate('AssetListDetails')}
                onPress={() => navigation.navigate(item.press, {
                  instrumentId: item.instrumentId,
                  instrumentType: item.instrumentType,
                })}
                onAdd={() => handleAddIconClick(item)}
                showRemoveIcon={false}
                showAddIcon={true}
              />
            ))
          )}
        </View>

      </ScrollView> */}

<ScrollView style={styles.scrollContainer}>
  <View style={styles.containerItem}>
    {searchQuery === '' ? (
      // Render nothing when searchQuery is empty
      null
    ) : filteredAssetData.length === 0 ? (
      <Text style={styles.noDataMessage}>Data not found</Text>
    ) : (
      filteredAssetData.map((item) => {
        const itemSymbol = item.Tradingsymbol;
        const assetValue = assetValues[itemSymbol]?.lastPrice || item.value;

        console.log('Item Symbol:', itemSymbol);
        console.log('Asset Value:', assetValue);

        return (
          <AssetItem
            key={item.InstrumentId}
            name2={item.name2}
            name3={item.name3}
            value={assetValue}
            decimalValue={item.decimalValue}
            changePercentage={item.changePercentage}
            onPress={() => navigation.navigate(item.press, {
              instrumentId: item.instrumentId,
              instrumentType: item.instrumentType,
            })}
            onAdd={() => handleAddIconClick(item)}
            showRemoveIcon={false}
            showAddIcon={true}
          />
        );
      })
    )}
  </View>
</ScrollView>


      {/* Success Message Modal */}
      <Modal isVisible={modalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.successMessage}>{successMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>

  );
};



const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'flex-start',
  //   paddingVertical: 30,
  //   backgroundColor: '#f5f5f5',
  //   marginTop: 10,
  // },
  fixedHeader: {
    backgroundColor: '#f5f5f5',
    paddingTop: 30, // adjust this value if necessary
    marginTop: 10,
  },
  scrollContainer: {
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },

  modalContent: {
    backgroundColor: 'rgba(227, 233, 240, 1)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    backgroundColor: '#B7DDD2',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  filterImage: {
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
  backText: {
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
    height: 40,
    fontWeight: '500',
    // borderColor: 'gray',   
    // borderWidth: 1,          
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: 'black',

  },
  containerItem: {
    flex: 1,
    width: '100%',

  },
  noDataMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default SearchBarList;
























//bfr ws

// import React, { useContext, useState, useEffect } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import AssetDataContext from './AssetDataContext';
// import Modal from 'react-native-modal';
// import { useSelector, useDispatch } from 'react-redux';
// import { setToken } from '../redux/actions/authActions';
// import Toast from 'react-native-toast-message';

// const SearchBarList = ({ route }) => {
//   const { assetData = [] } = route?.params || {};
//   const navigation = useNavigation();
//   const { addToWatchlist, watchlist } = useContext(AssetDataContext);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredAssetData, setFilteredAssetData] = useState(assetData);
//   const { token } = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       setFilteredAssetData(assetData);
//     });

//     return unsubscribe;
//   }, [navigation, assetData]);

//   useEffect(() => {
//     filterAssets();
//   }, [searchQuery]);

//   useEffect(() => {
//     if (token) {
//       dispatch(setToken(token));
//     }
//   }, [token, dispatch]);
//   useEffect(() => {
//     // console.log("---------------------------------->", watchlist)
//   })
//   // useEffect(() => {
//   //   if (token) {
//   //     dispatch(setToken(token));
//   //   }
//   // }, [token, dispatch]);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleFilter = () => {
//     // Handle filter functionality here
//   };

//   const handleSearchBarClick = () => {
//     // Open keyboard or perform additional actions
//   };

//   const filterAssets = () => {
//     const trimmedQuery = searchQuery.trim().toLowerCase();
//     const filteredAssets = assetData.filter((item) =>
//       item.name2.toLowerCase().includes(trimmedQuery)
//     );
//     setFilteredAssetData(filteredAssets);
//   };


//   const handleAddIconClick = async (item) => {
//     console.log('Add icon clicked', item);

//     if (!item.InstrumentId) {
//       console.error('InstrumentId is missing');

//       return;
//     }


//     const { InstrumentId, InstrumentType } = item;
//     console.log('InstrumentId:', InstrumentId);
//     console.log('InstrumentType:', InstrumentType);


//     // Step 1: Check if the necessary details are present
//     if (!InstrumentId || !InstrumentType) {
//       console.error('InstrumentId and InstrumentType are required.');
//       setSuccessMessage('Failed to add to watchlist');
//       return;
//     }

//     // Step 2: Ensure token is available
//     if (!token) {
//       console.error('Authentication token is missing');
//       setSuccessMessage('Authentication failed');
//       return;
//     }
//     if (watchlist.some((watchlistItem) => watchlistItem.Zid === InstrumentId)) {
//       // console.log('It`s Already in Your Watchlist');
//       Toast.show({
//         type: 'error', // Error toast
//         text1: 'Error',
//         text2: 'It`s Already in Your Watchlist',
//         visibilityTime: 3000,
//       });
//     } else {

//       try {
//         await addToWatchlist(item, token);
//         Toast.show({
//           type: 'success', // Success toast
//           text1: 'Success',
//           text2: 'Added Watchlist Successfully',
//           visibilityTime: 3000,
//         });
//       } catch (error) {
//         console.error('Failed to add to watchlist:', error);
//         // setSuccessMessage('Failed to add to watchlist');
//         Toast.show({
//           type: 'error', // Error toast
//           text1: 'Error',
//           text2: 'It`s Already in Your Watchlist',
//           visibilityTime: 3000,
//         });
//       }
//     }
//   };


//   return (
//     <>
//       <View style={styles.fixedHeader}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
//             <Ionicons name="arrow-back-outline" size={24} color="black" style={{ marginLeft: -10 }} />
//           </TouchableOpacity>
//           <Text style={styles.backText}>Asset List</Text>
//           <TouchableOpacity onPress={handleFilter} style={styles.rightContainer}>
//             <Image source={require('../assets/filter.png')} style={styles.filterImage} />
//           </TouchableOpacity>
//         </View>
//       </View>


//       <View style={styles.containerSearchBar}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Search..."
//             placeholderTextColor="gray"
//             selectionColor="black"
//             autoFocus={true}
//             onFocus={handleSearchBarClick}
//             onChangeText={setSearchQuery}
//           />
//         </View>
//       </View>

//       <ScrollView style={styles.scrollContainer}>
//         <View style={styles.containerItem}>
//           {searchQuery === '' ? (
//             // Render nothing when searchQuery is empty
//             null
//           ) : filteredAssetData.length === 0 ? (
//             <Text style={styles.noDataMessage}>Data not found</Text>
//           ) : (
//             filteredAssetData.map((item) => (
//               <AssetItem
//                 key={item.InstrumentId}
//                 name2={item.name2}
//                 name3={item.name3}
//                 value={item.value}
//                 decimalValue={item.decimalValue}
//                 changePercentage={item.changePercentage}
//                 // onPress={() => navigation.navigate('AssetListDetails')}
//                 onPress={() => navigation.navigate(item.press, {
//                   instrumentId: item.instrumentId,
//                   instrumentType: item.instrumentType,
//                 })}
//                 onAdd={() => handleAddIconClick(item)}
//                 showRemoveIcon={false}
//                 showAddIcon={true}
//               />
//             ))
//           )}
//         </View>

//       </ScrollView>

//       {/* Success Message Modal */}
//       <Modal isVisible={modalVisible}>
//         <View style={styles.modalContent}>
//           <Text style={styles.successMessage}>{successMessage}</Text>
//           <TouchableOpacity onPress={() => setModalVisible(false)}>
//             <Text style={styles.closeButton}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>

//   );
// };



// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   alignItems: 'flex-start',
//   //   paddingVertical: 30,
//   //   backgroundColor: '#f5f5f5',
//   //   marginTop: 10,
//   // },
//   fixedHeader: {
//     backgroundColor: '#f5f5f5',
//     paddingTop: 30, // adjust this value if necessary
//     marginTop: 10,
//   },
//   scrollContainer: {
//     backgroundColor: '#f5f5f5',
//     marginTop: 10,
//   },
//   errorMessage: {
//     color: 'red',
//     textAlign: 'center',
//     marginVertical: 10,
//   },

//   modalContent: {
//     backgroundColor: 'rgba(227, 233, 240, 1)',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   successMessage: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   closeButton: {
//     fontSize: 16,
//     backgroundColor: '#B7DDD2',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//   },
//   filterImage: {
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
//   backText: {
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
//     height: 40,
//     fontWeight: '500',
//     // borderColor: 'gray',   
//     // borderWidth: 1,          
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     color: 'black',

//   },
//   containerItem: {
//     flex: 1,
//     width: '100%',

//   },
//   noDataMessage: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginTop: 20,
//     color: 'red',
//   },
// });

// export default SearchBarList;


////before ws
// import React, { useContext, useState, useEffect } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import AssetDataContext from './AssetDataContext';
// import Modal from 'react-native-modal';
// import { useSelector, useDispatch } from 'react-redux';
// import { setToken } from '../redux/actions/authActions';
// import Toast from 'react-native-toast-message';

// const SearchBarList = ({ route }) => {
//   const { assetData = [] } = route?.params || {};
//   const navigation = useNavigation();
//   const { addToWatchlist, watchlist } = useContext(AssetDataContext);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredAssetData, setFilteredAssetData] = useState(assetData);
//   const { token } = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       setFilteredAssetData(assetData);
//     });

//     return unsubscribe;
//   }, [navigation, assetData]);

//   useEffect(() => {
//     filterAssets();
//   }, [searchQuery]);

//   useEffect(() => {
//     if (token) {
//       dispatch(setToken(token));
//     }
//   }, [token, dispatch]);
//   useEffect(() => {
//     console.log("---------------------------------->", watchlist)
//   })
//   // useEffect(() => {
//   //   if (token) {
//   //     dispatch(setToken(token));
//   //   }
//   // }, [token, dispatch]);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleFilter = () => {
//     // Handle filter functionality here
//   };

//   const handleSearchBarClick = () => {
//     // Open keyboard or perform additional actions
//   };

//   const filterAssets = () => {
//     const trimmedQuery = searchQuery.trim().toLowerCase();
//     const filteredAssets = assetData.filter((item) =>
//       item.name2.toLowerCase().includes(trimmedQuery)
//     );
//     setFilteredAssetData(filteredAssets);
//   };


//   const handleAddIconClick = async (item) => {
//     console.log('Add icon clicked', item);

//     if (!item.InstrumentId) {
//       console.error('InstrumentId is missing');

//       return;
//     }


//     const { InstrumentId, InstrumentType } = item;
//     console.log('InstrumentId:', InstrumentId);
//     console.log('InstrumentType:', InstrumentType);


//     // Step 1: Check if the necessary details are present
//     if (!InstrumentId || !InstrumentType) {
//       console.error('InstrumentId and InstrumentType are required.');
//       setSuccessMessage('Failed to add to watchlist');
//       return;
//     }

//     // Step 2: Ensure token is available
//     if (!token) {
//       console.error('Authentication token is missing');
//       setSuccessMessage('Authentication failed');
//       return;
//     }
//     if (watchlist.some((watchlistItem) => watchlistItem.Zid === InstrumentId)) {
//       // console.log('It`s Already in Your Watchlist');
//       Toast.show({
//         type: 'error', // Error toast
//         text1: 'Error',
//         text2: 'It`s Already in Your Watchlist',
//         visibilityTime: 3000,
//       });
//     } else {

//       try {
//         await addToWatchlist(item, token);
//         Toast.show({
//           type: 'success', // Success toast
//           text1: 'Success',
//           text2: 'Added Watchlist Successfully',
//           visibilityTime: 3000,
//         });
//       } catch (error) {
//         console.error('Failed to add to watchlist:', error);
//         // setSuccessMessage('Failed to add to watchlist');
//         Toast.show({
//           type: 'error', // Error toast
//           text1: 'Error',
//           text2: 'It`s Already in Your Watchlist',
//           visibilityTime: 3000,
//         });
//       }
//     }
//   };


//   return (
//     <>
//       <View style={styles.fixedHeader}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
//             <Ionicons name="arrow-back-outline" size={24} color="black" style={{ marginLeft: -10 }} />
//           </TouchableOpacity>
//           <Text style={styles.backText}>Asset List</Text>
//           <TouchableOpacity onPress={handleFilter} style={styles.rightContainer}>
//             <Image source={require('../assets/filter.png')} style={styles.filterImage} />
//           </TouchableOpacity>
//         </View>
//       </View>


//       <View style={styles.containerSearchBar}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Search..."
//             placeholderTextColor="gray"
//             selectionColor="black"
//             autoFocus={true}
//             onFocus={handleSearchBarClick}
//             onChangeText={setSearchQuery}
//           />
//         </View>
//       </View>

//       <ScrollView style={styles.scrollContainer}>
//         <View style={styles.containerItem}>
//           {searchQuery === '' ? (
//             // Render nothing when searchQuery is empty
//             null
//           ) : filteredAssetData.length === 0 ? (
//             <Text style={styles.noDataMessage}>Data not found</Text>
//           ) : (
//             filteredAssetData.map((item) => (
//               <AssetItem
//                 key={item.InstrumentId}
//                 name2={item.name2}
//                 name3={item.name3}
//                 value={item.value}
//                 decimalValue={item.decimalValue}
//                 changePercentage={item.changePercentage}
//                 // onPress={() => navigation.navigate('AssetListDetails')}
//                 onPress={() => navigation.navigate(item.press, {
//                   instrumentId: item.instrumentId,
//                   instrumentType: item.instrumentType,
//                 })}
//                 onAdd={() => handleAddIconClick(item)}
//                 showRemoveIcon={false}
//                 showAddIcon={true}
//               />
//             ))
//           )}
//         </View>

//       </ScrollView>

//       {/* Success Message Modal */}
//       <Modal isVisible={modalVisible}>
//         <View style={styles.modalContent}>
//           <Text style={styles.successMessage}>{successMessage}</Text>
//           <TouchableOpacity onPress={() => setModalVisible(false)}>
//             <Text style={styles.closeButton}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>

//   );
// };



// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   alignItems: 'flex-start',
//   //   paddingVertical: 30,
//   //   backgroundColor: '#f5f5f5',
//   //   marginTop: 10,
//   // },
//   fixedHeader: {
//     backgroundColor: '#f5f5f5',
//     paddingTop: 30, // adjust this value if necessary
//     marginTop: 10,
//   },
//   scrollContainer: {
//     backgroundColor: '#f5f5f5',
//     marginTop: 10,
//   },
//   errorMessage: {
//     color: 'red',
//     textAlign: 'center',
//     marginVertical: 10,
//   },

//   modalContent: {
//     backgroundColor: 'rgba(227, 233, 240, 1)',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   successMessage: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   closeButton: {
//     fontSize: 16,
//     backgroundColor: '#B7DDD2',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//   },
//   filterImage: {
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
//   backText: {
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
//     height: 40,
//     fontWeight: '500',
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     color: 'black',

//   },
//   containerItem: {
//     flex: 1,
//     width: '100%',

//   },
//   noDataMessage: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginTop: 20,
//     color: 'red',
//   },
// });

// export default SearchBarList;






