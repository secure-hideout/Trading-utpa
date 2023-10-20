import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';
import SuccessModal from './SuccessModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AssetDataContext from '../screens/AssetDataContext';
import { styles } from './SeeAllItems';

export const SeeAllItems = ({ navigation }) => {
    const { assetData, watchlist, removeFromWatchlist } = useContext(AssetDataContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [token, setToken] = useState('');

    const filteredAssetData = assetData.filter((item) => watchlist.some((watchlistItem) => watchlistItem.Tradingsymbol === item.Tradingsymbol)
    );


    const handleBack = () => {
        navigation.navigate('Portfolio');
    };

    const handleFilter = () => {
        // Handle filter functionality here
    };

    // const handleSearchIconClick = () => {
    //   navigation.navigate('SearchBarList', { assetData: assetData });
    // };
    const handleSearchIconClick = () => {
        navigation.navigate('SearchBarList', { userToken: token, assetData: assetData });
    };


    const showDeleteConfirmation = (item) => {
        setItemToDelete(item);
        setDeleteConfirmationVisible(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            removeFromWatchlist(itemToDelete);
            showSuccessModal('Deleted Successfully');
            setDeleteConfirmationVisible(false);
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
    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };
        getToken();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" marginLeft={-10} />
                    </TouchableOpacity>
                    <Text style={styles.title}>My Watch List</Text>
                    <View style={styles.searchFilterContainer}>
                        <TouchableOpacity onPress={handleSearchIconClick} style={styles.iconContainer}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/mask-group2.svg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFilter} style={styles.iconContainer}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/filter.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.containerItem}>
                    {filteredAssetData.map((item, index) => (
                        <AssetItem
                            key={index}
                            name2={item.Tradingsymbol}
                            name3={item.Name}
                            value={item.LastPrice.toString()}
                            decimalValue={0}
                            changePercentage={0}
                            onPress={() => navigation.navigate('ListItemDetails')}
                            onRemove={() => showDeleteConfirmation(item)}
                            showRemoveIcon={true}
                            showAddIcon={false} />
                    ))}
                </View>

                <DeleteConfirmationModal
                    visible={deleteConfirmationVisible}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete} />

                <SuccessModal
                    message={successMessage}
                    visible={isSuccessModalVisible}
                    onClose={() => setSuccessModalVisible(false)} />
            </View>
        </ScrollView>
    );
};
