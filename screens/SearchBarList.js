import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';
import AssetDataContext from './AssetDataContext';
import Modal from 'react-native-modal';

const SearchBarList = ({ route }) => {
  const { assetData = [] } = route?.params || {};
  const navigation = useNavigation();
  const { addToWatchlist } = useContext(AssetDataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssetData, setFilteredAssetData] = useState(assetData);

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
    const trimmedQuery = searchQuery.replace(/\s+/g, '').toLowerCase();
    const filteredAssets = assetData.filter((item) =>
      item.name2.replace(/\s+/g, '').toLowerCase().includes(trimmedQuery)
    );
    setFilteredAssetData(filteredAssets);
  };

  const handleAddIconClick = (item) => {
    addToWatchlist(item);
    setSuccessMessage('Added to watchlist successfully');

    // Open the modal
    setModalVisible(true);

    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      setModalVisible(false);
      setSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    filterAssets();
  }, [searchQuery]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
            <Ionicons name="arrow-back-outline" size={24} color="black" marginLeft={-10} />
          </TouchableOpacity>
          {/* <Text style={styles.backText}>Crypto Asset List</Text> */}
          <Text style={styles.backText}>Asset List</Text>
          <TouchableOpacity onPress={handleFilter} style={styles.rightContainer}>
            <Image source={require('../assets/filter.png')} style={styles.filterImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerSearchBar}>
          <TouchableOpacity onPress={handleSearchBarClick} style={styles.searchBar}>
            <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search..."
              placeholderTextColor="gray"
              selectionColor="black"
              autoFocus={true}
              onTouchStart={handleSearchBarClick}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItem}>
          {filteredAssetData.length === 0 && searchQuery !== '' ? (
            <Text style={styles.noDataMessage}>Data not found</Text>
          ) : (
            filteredAssetData.map((item, index) => {
              return (
                <AssetItem
                  key={index}
                  name2={item.name2}
                  name3={item.name3}
                  value={item.value}
                  decimalValue={item.decimalValue}
                  changePercentage={item.changePercentage}
                  onPress={() => navigation.navigate('AssetListDetails')}
                  onAdd={() => handleAddIconClick(item)}
                  showRemoveIcon={false}
                  showAddIcon={true}
                />
              );
            })
          )}
        </View>
      </View>

      {/* Success Message Modal */}
      <Modal isVisible={modalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.successMessage}>{successMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

//without any modification

// import React, { useContext, useState, useEffect } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import AssetDataContext from './AssetDataContext';
// import Modal from 'react-native-modal';
// import SeeAllItems from './SeeAllItems';

// const SearchBarList = () => {
//   const navigation = useNavigation();
//   const { addToWatchlist } = useContext(AssetDataContext);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [watchlist, setWatchlist] = useState([]); // Store watchlist data
//   const [filteredWatchlist, setFilteredWatchlist] = useState([]); // Filtered watchlist data

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleFilter = () => {
//     // Handle filter functionality here
//   };

//   const handleSearchBarClick = () => {
//     // Open keyboard or perform additional actions
//   };

//   const filterWatchlist = () => {
//     const trimmedQuery = searchQuery.replace(/\s+/g, '').toLowerCase();
//     const filteredAssets = watchlist.filter((item) =>
//       item.name2.replace(/\s+/g, '').toLowerCase().includes(trimmedQuery)
//     );
//     setFilteredWatchlist(filteredAssets);
//   };

//   const handleAddIconClick = (item) => {
//     addToWatchlist(item);
//     setSuccessMessage('Added to watchlist successfully');

//     // Open the modal
//     setModalVisible(true);

//     // Automatically close the modal after 3 seconds
//     setTimeout(() => {
//       setModalVisible(false);
//       setSuccessMessage('');
//     }, 3000);
//   };

//   // useEffect(() => {
//   //   // Fetch watchlist data from your API here
//   //   // Replace the URL with your actual API endpoint
//   //   fetch("YOUR_API_ENDPOINT_HERE")
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       console.log('Fetched Watchlist Data:', data);
//   //       setWatchlist(data); // Set the fetched watchlist data
//   //       filterWatchlist(); // Apply initial filtering
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching watchlist data:', error);
//   //     });
//   // }, []);

//   // useEffect(() => {
//   //   filterWatchlist();
//   // }, [searchQuery]);


//   useEffect(() => {
//     const requestOptions = {
//       method: 'POST', // Adjust the method as needed (e.g., 'POST', 'PUT', etc.)
//       headers: {
//         // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJJVS1CUVRZNSIsImV4cCI6MTY5OTI3NTQxNCwiaXNzIjoiVGVzdE5hbWUifQ.nxgIOKnasa6THpg1Lj4EZGPxDEmvRALiQIEUxjB1ELk',
//         'Content-Type': 'application/json', // Include other headers if required
//       },
//     };

//     // Fetch the watchlist data using the requestOptions
//     fetch("http://192.168.0.102:9000/api/user/watchlist", requestOptions)
//       // fetch("http://localhost:9000/api/user/getZtokens", requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Fetched Watchlist Data:', data);
//         setWatchlist(data); // Set the fetched watchlist data
//         filterWatchlist(); // Apply initial filtering
//       })
//       .catch((error) => {
//         console.error('Error fetching watchlist data:', error);
//       });
//   }, []);

//   return (
//     <ScrollView>
//       <Text>{watchlist.ID}</Text>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
//             <Ionicons name="arrow-back-outline" size={24} color="black" marginLeft={-10} />
//           </TouchableOpacity>
//           <Text style={styles.backText}>Crypto Asset List</Text>
//           <TouchableOpacity onPress={handleFilter} style={styles.rightContainer}>
//             <Image source={require('../assets/filter.png')} style={styles.filterImage} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.containerSearchBar}>
//           <TouchableOpacity onPress={handleSearchBarClick} style={styles.searchBar}>
//             <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Search..."
//               placeholderTextColor="gray"
//               selectionColor="black"
//               autoFocus={true}
//               onTouchStart={handleSearchBarClick}
//               onChangeText={(text) => setSearchQuery(text)}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.containerItem}>
//           {filteredWatchlist.length === 0 && searchQuery !== '' ? (
//             <Text style={styles.noDataMessage}>Data not found</Text>
//           ) : (
//             filteredWatchlist.map((item, index) => {
//               return (
//                 // <AssetItem
//                 //   key={index}
//                 //   name2={item.InstrumentType}
//                 //   name3={item.name3}
//                 //   value={item.value}
//                 //   decimalValue={item.decimalValue}
//                 //   changePercentage={item.changePercentage}
//                 //   onPress={() => navigation.navigate('AssetListDetails')}
//                 //   onAdd={() => handleAddIconClick(item)}
//                 //   showRemoveIcon={false}
//                 //   showAddIcon={true}
//                 // />
//                 <AssetItem
//                   key={index}
//                   name2={item.InstrumentType}
//                   name3={item.UserID}
//                   onAdd={() => handleAddIconClick(item)}
//                   showRemoveIcon={false}
//                   showAddIcon={true}
//                 />
//               );
//             })
//           )}
//         </View>
//       </View>

//       {/* Success Message Modal */}
//       <Modal isVisible={modalVisible}>
//         <View style={styles.modalContent}>
//           <Text style={styles.successMessage}>{successMessage}</Text>
//           <TouchableOpacity onPress={() => setModalVisible(false)}>
//             <Text style={styles.closeButton}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
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