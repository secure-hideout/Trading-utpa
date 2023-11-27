import React, { useContext, useState, useEffect } from 'react';
import AssetDataContext from '../screens/AssetDataContext';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';
import SuccessModal from './SuccessModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

import { useSelector, useDispatch } from 'react-redux';

import Toast from 'react-native-toast-message';



const SeeAllItems = ({ navigation }) => {
  const { assetData, watchlist, removeFromWatchlist, setWatchlist } = useContext(AssetDataContext);
  const { token } = useSelector(state => state.auth);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  // const [watchlist,setWatchlist] = useState([]);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // const [watchlistState, setWatchlistState] = useState([]);


  const filteredAssetData = assetData.filter(item =>
    watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)
  );

  const handleBack = () => {
    navigation.navigate('Portfolio');
  };

  const handleFilter = () => {
    // Handle filter functionality here
  };

  const handleSearchIconClick = () => {
    navigation.navigate('SearchBarList', { assetData: assetData });
  };

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      // position: 'bottom',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
        };

        const response = await fetch(
          'http://10.0.2.2:9000/api/user/watchlist',
          requestOptions
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (error) {

      }
    };
    fetchWatchlistData();
  }, [token, setWatchlist]); // Dependency array should include token


  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setDeleteConfirmationVisible(true);
  };



  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await removeFromWatchlist(itemToDelete); // Remove from local state and AsyncStorage

        // Call the API to remove from the server
        const response = await fetch('http://10.0.2.2:9000/api/user/removeFromWatchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            InstrumentId: itemToDelete.InstrumentId,
            InstrumentType: itemToDelete.InstrumentType,
            // ...other properties if needed
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to remove from watchlist: ${await response.text()}`);
        }

        //       showSuccessModal('Deleted Successfully');
        //     } catch (error) {
        //       console.error('Error during delete:', error);
        //     } finally {
        //       setDeleteConfirmationVisible(false);
        //     }
        //   }
        // };

        Toast.show({
          type: 'success', // Success toast
          text1: 'Success',
          text2: 'Added to watchlist successfully',
          visibilityTime: 3000,
        });
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

  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);

    setTimeout(() => {
      setSuccessModalVisible(false);
      setSuccessMessage('');
    }, 3000);
  };


  //LOCALDATABASE WF
  // import React, { useContext, useState, useEffect } from 'react';
  // import AssetDataContext from '../screens/AssetDataContext';
  // import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
  // import { Ionicons } from '@expo/vector-icons';
  // import AssetItem from './AssetItem';
  // import SuccessModal from './SuccessModal';
  // import DeleteConfirmationModal from './DeleteConfirmationModal';

  // import { useSelector, useDispatch } from 'react-redux';




  // const SeeAllItems = ({ navigation }) => {
  //   const { assetData, watchlist, removeFromWatchlist, setWatchlist } = useContext(AssetDataContext);
  //   const { token } = useSelector(state => state.auth);
  //   const [successMessage, setSuccessMessage] = useState('');
  //   const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  //   // const [watchlist,setWatchlist] = useState([]);
  //   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  //   const [itemToDelete, setItemToDelete] = useState(null);

  //   // const [watchlistState, setWatchlistState] = useState([]);


  //   const filteredAssetData = assetData.filter(item =>
  //     watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)
  //   );

  //   const handleBack = () => {
  //     navigation.navigate('Portfolio');
  //   };

  //   const handleFilter = () => {
  //     // Handle filter functionality here
  //   };

  //   const handleSearchIconClick = () => {
  //     navigation.navigate('SearchBarList', { assetData: assetData });
  //   };

  //   useEffect(() => {
  //     const fetchWatchlistData = async () => {
  //       try {
  //         const myHeaders = new Headers();
  //         myHeaders.append('Authorization', `Bearer ${token}`);

  //         const requestOptions = {
  //           method: 'POST',
  //           headers: myHeaders,
  //         };

  //         const response = await fetch(
  //           'http://10.0.2.2:9000/api/user/watchlist',
  //           requestOptions
  //         );

  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }

  //         const data = await response.json();
  //         setWatchlist(data);
  //       } catch (error) {

  //       }
  //     };
  //     fetchWatchlistData();
  //   }, [token, setWatchlist]); // Dependency array should include token


  //   const showDeleteConfirmation = (item) => {
  //     setItemToDelete(item);
  //     setDeleteConfirmationVisible(true);
  //   };



  //   const confirmDelete = async () => {
  //     if (itemToDelete) {
  //       try {
  //         await removeFromWatchlist(itemToDelete); // Remove from local state and AsyncStorage

  //         // Call the API to remove from the server
  //         const response = await fetch('http://10.0.2.2:9000/api/user/removeFromWatchlist', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({
  //             InstrumentId: itemToDelete.InstrumentId,
  //             InstrumentType: itemToDelete.InstrumentType,
  //             // ...other properties if needed
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error(`Failed to remove from watchlist: ${await response.text()}`);
  //         }

  //         showSuccessModal('Deleted Successfully');
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

  //   const showSuccessModal = (message) => {
  //     setSuccessMessage(message);
  //     setSuccessModalVisible(true);

  //     setTimeout(() => {
  //       setSuccessModalVisible(false);
  //       setSuccessMessage('');
  //     }, 3000);
  //   };
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
            console.log('Item:', item); // Log the item object
            return (
              <AssetItem
                key={index}
                name2={item.name2}
                name3={item.name3}
                symbol={item.symbol}
                value={item.value}
                onPress={() => {
                  console.log('Navigating to Allgraphs with symbol:', item.symbol);
                  navigation.navigate('Allgraphs', {
                    symbol: item.symbol,
                    Open: item.Open,
                    Name: item.Name,
                    openValue: item.openValue,
                    Close: item.Close,
                    closeValue: item.closeValue,
                    High: item.High,
                    Hvalue: item.Hvalue,
                    Low: item.Low,
                    Lvalue: item.Lvalue,
                    Dval: item.Dval,
                    Value: item.Value,
                    Market: item.Market,
                    value1: item.value1,
                    volBtc: item.volBtc,
                    value2: item.value2,
                    volUsdt: item.volUsdt,
                    value3: item.value3,
                    Price: item.Name,
                    priceVal: item.value,


                    sname: item.Name,
                    LastPrice: item.value,
                    instrumentType: item.name3,
                    instrumentId: item.InstrumentId,
                    quantity: item.quantity,
                    Quantities: item.Quantities,
                  });
                }}
                onRemove={() => {
                  console.log('Removing item:', item);
                  showDeleteConfirmation(item);
                }}
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

      <SuccessModal
        message={successMessage}
        visible={isSuccessModalVisible}
        onClose={() => setSuccessModalVisible(false)}
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






















// // //oldcode with outapi connection

// import React, { useContext, useState, useEffect } from 'react';
// import AssetDataContext from '../screens/AssetDataContext';
// import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import SuccessModal from './SuccessModal';
// import DeleteConfirmationModal from './DeleteConfirmationModal';

// import { useSelector, useDispatch } from 'react-redux';




// const SeeAllItems = ({ navigation }) => {
//   const { assetData, removeFromWatchlist, updateToken } = useContext(AssetDataContext);
//   const { token } = useSelector(state => state.auth);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
//   const [watchlist, setWatchlist] = useState([]);
//   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   // const [watchlistState, setWatchlistState] = useState([]);


//   const filteredAssetData = assetData.filter(item =>
//     watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)
//   );

//   const handleBack = () => {
//     navigation.navigate('Portfolio');
//   };

//   const handleFilter = () => {
//     // Handle filter functionality here
//   };

//   const handleSearchIconClick = () => {
//     navigation.navigate('SearchBarList', { assetData: assetData });
//   };

//   useEffect(() => {
//     const fetchWatchlistData = async () => {
//       try {
//         const myHeaders = new Headers();
//         myHeaders.append('Authorization', `Bearer ${token}`);

//         const requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//         };

//         const response = await fetch(
//           'http://10.0.2.2:9000/api/user/watchlist',
//           requestOptions
//         );

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setWatchlist(data);
//       } catch (error) {

//       }
//     };
//     fetchWatchlistData();
//   }, [updateToken]); // Dependency array should include token


//   const showDeleteConfirmation = (item) => {
//     setItemToDelete(item);
//     setDeleteConfirmationVisible(true);
//   };



//   const confirmDelete = async () => {
//     if (itemToDelete) {
//       try {
//         await removeFromWatchlist(itemToDelete); // Remove from local state and AsyncStorage

//         // Call the API to remove from the server
//         const response = await fetch('http://10.0.2.2:9000/api/user/removeFromWatchlist', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             InstrumentId: itemToDelete.Zid,
//             InstrumentType: itemToDelete.Segment,
//             // ...other properties if needed
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to remove from watchlist: ${await response.text()}`);
//         }

//         showSuccessModal('Deleted Successfully');
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

//   const showSuccessModal = (message) => {
//     setSuccessMessage(message);
//     setSuccessModalVisible(true);

//     setTimeout(() => {
//       setSuccessModalVisible(false);
//       setSuccessMessage('');
//     }, 3000);
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
//           {watchlist.map((item, index) => {
//             console.log('Item:', item); // Log the item object
//             return (
//               <AssetItem
//                 key={index}
//                 name2={item.Name}
//                 name3={item.Segment}
//                 symbol={item.Tradingsymbol}
//                 value={item.LastPrice}
//                 onPress={() => {
//                   console.log('Navigating to Allgraphs with symbol:', item.symbol);
//                   navigation.navigate('Allgraphs', {
//                     symbol: item.Tradingsymbol,
//                     Open: item.Open,
//                     Name: item.Name,
//                     openValue: item.openValue,
//                     Close: item.Close,
//                     closeValue: item.closeValue,
//                     High: item.High,
//                     Hvalue: item.Hvalue,
//                     Low: item.Low,
//                     Lvalue: item.Lvalue,
//                     Dval: item.Dval,
//                     Value: item.Value,
//                     Market: item.Market,
//                     value1: item.value1,
//                     volBtc: item.volBtc,
//                     value2: item.value2,
//                     volUsdt: item.volUsdt,
//                     value3: item.value3,
//                     Price: item.Name,
//                     priceVal: item.LastPrice,


//                     sname: item.Name,
//                     LastPrice: item.LastPrice,
//                     instrumentType: item.Segment,
//                     instrumentId: item.Zid,
//                     quantity: item.quantity,
//                     Quantities: item.Quantities,
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

//       <SuccessModal
//         message={successMessage}
//         visible={isSuccessModalVisible}
//         onClose={() => setSuccessModalVisible(false)}
//       />
//     </>
//   );
// };










// //oldcode wo data while reloading


// import React, { useContext, useState, useEffect } from 'react';
// import AssetDataContext from '../screens/AssetDataContext';
// import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import SuccessModal from './SuccessModal';
// import DeleteConfirmationModal from './DeleteConfirmationModal';

// import { useSelector, useDispatch } from 'react-redux';




// const SeeAllItems = ({ navigation }) => {
//   const { assetData, removeFromWatchlist, updateToken,watchlist,setWatchlist } = useContext(AssetDataContext);
//   const { token } = useSelector(state => state.auth);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
// const [watchlist, setWatchlist] = useState([]);
//   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   // const [watchlistState, setWatchlistState] = useState([]);


//   const filteredAssetData = assetData.filter(item =>
//     watchlist.some((watchlistItem) => watchlistItem.name2 === item.name2)
//   );

//   const handleBack = () => {
//     navigation.navigate('Portfolio');
//   };

//   const handleFilter = () => {
//     // Handle filter functionality here
//   };

//   const handleSearchIconClick = () => {
//     navigation.navigate('SearchBarList', { assetData: assetData });
//   };

//   useEffect(() => {
//     const fetchWatchlistData = async () => {
//       try {
//         const myHeaders = new Headers();
//         myHeaders.append('Authorization', `Bearer ${token}`);

//         const requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//         };

//         const response = await fetch(
//           'http://10.0.2.2:9000/api/user/watchlist',
//           requestOptions
//         );

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setWatchlist(data);
//       } catch (error) {

//       }
//     };
//     fetchWatchlistData();
//   }, [token, updateToken]); // Dependency array should include token


//   const showDeleteConfirmation = (item) => {
//     setItemToDelete(item);
//     setDeleteConfirmationVisible(true);
//   };



//   const confirmDelete = async () => {
//     if (itemToDelete) {
//       try {
//         await removeFromWatchlist(itemToDelete); // Remove from local state and AsyncStorage

//         // Call the API to remove from the server
//         const response = await fetch('http://10.0.2.2:9000/api/user/removeFromWatchlist', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             InstrumentId: itemToDelete.InstrumentId,
//             InstrumentType: itemToDelete.InstrumentType,
//             // ...other properties if needed
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to remove from watchlist: ${await response.text()}`);
//         }

//         showSuccessModal('Deleted Successfully');
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

//   const showSuccessModal = (message) => {
//     setSuccessMessage(message);
//     setSuccessModalVisible(true);

//     setTimeout(() => {
//       setSuccessModalVisible(false);
//       setSuccessMessage('');
//     }, 3000);
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
//             console.log('Item:', item); // Log the item object
//             return (
//               <AssetItem
//                 key={index}
//                 name2={item.name2}
//                 name3={item.name3}
//                 symbol={item.symbol}
//                 value={item.value}
//                 onPress={() => {
//                   console.log('Navigating to Allgraphs with symbol:', item.symbol);
//                   navigation.navigate('Allgraphs', {
//                     symbol: item.symbol,
//                     Open: item.Open,
//                     Name: item.Name,
//                     openValue: item.openValue,
//                     Close: item.Close,
//                     closeValue: item.closeValue,
//                     High: item.High,
//                     Hvalue: item.Hvalue,
//                     Low: item.Low,
//                     Lvalue: item.Lvalue,
//                     Dval: item.Dval,
//                     Value: item.Value,
//                     Market: item.Market,
//                     value1: item.value1,
//                     volBtc: item.volBtc,
//                     value2: item.value2,
//                     volUsdt: item.volUsdt,
//                     value3: item.value3,
//                     Price: item.Name,
//                     priceVal: item.value,


//                     sname: item.Name,
//                     LastPrice: item.value,
//                     instrumentType: item.name3,
//                     instrumentId: item.InstrumentId,
//                     quantity: item.quantity,
//                     Quantities: item.Quantities,
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

//       <SuccessModal
//         message={successMessage}
//         visible={isSuccessModalVisible}
//         onClose={() => setSuccessModalVisible(false)}
//       />
//     </>
//   );
// };




//oldcode
