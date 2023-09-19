
//when Search icon click this page appears
import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from './AssetItem';

const SearchBarList = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Dashboard02');
  };

  const handleFilter = () => {
    // Handle filter functionality here
  };
  
  const handleSearchBarClick = () => {
    // Open keyboard or perform additional actions
  };

  const assetData = [
    {name2:'Crpto', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'nse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'bse', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'comodity', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'tata', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'apple', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'tesla', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'twitter', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'facebook', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},
    {name2:'google', name3:"BTC", value:"$30,618", decimalValue:".60", changePercentage:"+7.90%",logo:'https://assets.coingecko.com/coins/images/10365/large/assets/bitcoinsvgrepocom-1.svg'},

  ];

  return (
    <ScrollView >
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.leftContainer}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.backText}>Cripto Asset List</Text>
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
            autoFocus={false}
            onTouchStart={handleSearchBarClick}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.containerItem}> */}
      <View style={styles.containerItem}>
      {assetData.map((item, index) => {
        return <AssetItem name2={item.name2} 
        name3={item.name3}
        value={item.value}
        decimalValue={item.decimalValue}
        changePercentage={item.changePercentage} 
        onPress={() => navigation.navigate('AssetListDetails')} />;
      })}
      </View>
    </View>

    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 30,
   //backgroundColor:'black',
   backgroundColor: '#f5f5f5',
  },

  filterImage:{
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
    height: 40, // Adjust the height as needed
  },

  containerItem: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'black',
    
  },


  
 
});

export default SearchBarList ;



































