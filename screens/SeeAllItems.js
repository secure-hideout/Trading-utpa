
import React, { useContext, useState, useEffect } from 'react';
import AssetDataContext from '../screens/AssetDataContext';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';
import SuccessModal from './SuccessModal'; // Import the SuccessModal component
// import SuccessMessage from './SuccessMessage';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const SeeAllItems = ({ navigation, props }) => {
  const { assetData, watchlist } = useContext(AssetDataContext);
  const { removeFromWatchlist } = useContext(AssetDataContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); // State to control the visibility of the success modal

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false); // State for showing delete confirmation modal
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredAssetData = assetData.filter((item) =>
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

  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromWatchlist(itemToDelete);
      showSuccessModal('Deleted Successfully');
      setDeleteConfirmationVisible(false); // Close the delete confirmation modal
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setDeleteConfirmationVisible(false);
  };

  // Function to display success messages as a modal
  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);

    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      setSuccessModalVisible(false);
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
            <Ionicons name="arrow-back-outline" size={24} color="black" marginLeft={-10} />
          </TouchableOpacity>
          <Text style={styles.title}>My Watch List</Text>
          <View style={styles.searchFilterContainer}>
            <TouchableOpacity onPress={handleSearchIconClick} style={styles.searchIcon}>
              <Image
                style={styles.rightImage}
                source={require("../assets/mask-group2.svg")} // Change to your search icon image source
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

        <View style={styles.containerItem}>
          {filteredAssetData.map((item, index) => (
            <AssetItem
              key={index}
              name2={item.name2}
              name3={item.name3}
              value={item.value}
              decimalValue={item.decimalValue}
              changePercentage={item.changePercentage}
              onPress={() => navigation.navigate('ListItemDeatails')}
              onRemove={() => showDeleteConfirmation(item)}
              showRemoveIcon={true}
              showAddIcon={false}
            />
          ))}
        </View>

        <DeleteConfirmationModal
          visible={deleteConfirmationVisible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />

        <SuccessModal // Add the SuccessModal component
          message={successMessage}
          visible={isSuccessModalVisible}
          onClose={() => setSuccessModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'row',
    marginTop: 10,
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
    //backgroundColor: 'rgba(227, 233, 240, 1)',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
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








//beforeapi

// import React, { useContext, useState, useEffect } from 'react';
// import AssetDataContext from '../screens/AssetDataContext';
// import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import AssetItem from './AssetItem';
// import SuccessModal from './SuccessModal'; // Import the SuccessModal component
// // import SuccessMessage from './SuccessMessage';
// import DeleteConfirmationModal from './DeleteConfirmationModal';

// const SeeAllItems = ({ navigation, props }) => {
//   const { assetData, watchlist } = useContext(AssetDataContext);
//   const { removeFromWatchlist } = useContext(AssetDataContext);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); // State to control the visibility of the success modal

//   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false); // State for showing delete confirmation modal
//   const [itemToDelete, setItemToDelete] = useState(null);

//   const filteredAssetData = assetData.filter((item) =>
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

//   const showDeleteConfirmation = (item) => {
//     setItemToDelete(item);
//     setDeleteConfirmationVisible(true);
//   };

//   const confirmDelete = () => {
//     if (itemToDelete) {
//       removeFromWatchlist(itemToDelete);
//       showSuccessModal('Deleted Successfully');
//       setDeleteConfirmationVisible(false); // Close the delete confirmation modal
//     }
//   };

//   const cancelDelete = () => {
//     setItemToDelete(null);
//     setDeleteConfirmationVisible(false);
//   };

//   // Function to display success messages as a modal
//   const showSuccessModal = (message) => {
//     setSuccessMessage(message);
//     setSuccessModalVisible(true);

//     // Automatically close the modal after 3 seconds
//     setTimeout(() => {
//       setSuccessModalVisible(false);
//       setSuccessMessage('');
//     }, 3000);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
//             <Ionicons name="arrow-back-outline" size={24} color="black" marginLeft={-10} />
//           </TouchableOpacity>
//           <Text style={styles.title}>My Watch List</Text>
//           <View style={styles.searchFilterContainer}>
//             <TouchableOpacity onPress={handleSearchIconClick} style={styles.searchIcon}>
//               <Image
//                 style={styles.rightImage}
//                 source={require("../assets/mask-group2.svg")} // Change to your search icon image source
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

//         <View style={styles.containerItem}>
//           {filteredAssetData.map((item, index) => (
//             <AssetItem
//               key={index}
//               name2={item.name2}
//               name3={item.name3}
//               value={item.value}
//               decimalValue={item.decimalValue}
//               changePercentage={item.changePercentage}
//               onPress={() => navigation.navigate('ListItemDeatails')}
//               onRemove={() => showDeleteConfirmation(item)}
//               showRemoveIcon={true}
//               showAddIcon={false}
//             />
//           ))}
//         </View>

//         <DeleteConfirmationModal
//           visible={deleteConfirmationVisible}
//           onConfirm={confirmDelete}
//           onCancel={cancelDelete}
//         />

//         <SuccessModal // Add the SuccessModal component
//           message={successMessage}
//           visible={isSuccessModalVisible}
//           onClose={() => setSuccessModalVisible(false)}
//         />
//       </View>
//     </ScrollView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'row',
//     marginTop: 10,
//     paddingVertical: 30,
//     backgroundColor: '#f5f5f5',
//     //backgroundColor: 'rgba(227, 233, 240, 1)',
//   },
//   searchFilterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 'auto',
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






