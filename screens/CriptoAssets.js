import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AssetItem from './AssetItem';
import { AntDesign } from '@expo/vector-icons'; 

// const CryptoAssets = ({ data }) => {


const CryptoAssets = ({ data, onScrollToBottom }) => {
const navigation = useNavigation();

const handleSeeAll = () => {
    navigation.navigate('SeeAllItems', { assetData: data });
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
        <Text style={styles.assetText}>My Watchlist</Text>
        <TouchableOpacity style={styles.button} onPress={handleSeeAll}>
          <Text style={styles.buttonText}>See All</Text>
        </TouchableOpacity>
      </View>

      {data.map((item, index) => (
        <AssetItem
          key={index}
          name2={item.name2}
          name3={item.name3}
          value={item.value}
          decimalValue={item.decimalValue}
          changePercentage={item.changePercentage}
          onPress={() => navigation.navigate('ListItemDeatails')}
        />
      ))}
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
    fontFamily: 'SFProDisplay',
    color: 'rgba(28, 30, 50, 1)',
  },
};

export default CryptoAssets;