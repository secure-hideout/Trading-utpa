import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AssetItem = ({ name2, name3, value, decimalValue, changePercentage }) => {
  return (
    



    <View style={styles.containerAssetItem}>
      <View style={styles.leftContent}>
        <Image style={styles.logo} source={require('../assets/bitcoinsvgrepocom-1.svg')} />
        <Text style={styles.Text}>{name2}</Text>
        <Text style={styles.span}>{name3}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.decimal}>{decimalValue}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.changePercentage}>{changePercentage}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};









const styles = {
  containerAssetItem: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // padding: 12,
    // borderBottomWidth: 1,
    // backgroundColor:"#E3E9F0",
    // borderBottomColor: '#E5E5E5',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor:"#E3E9F0",
    borderBottomColor: '#E5E5E5',
    marginTop:10,
    borderRadius:10,
    height:50,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 2,
  },
  span: {
    fontSize: 18,
    color: '#888888',
    fontWeight: 'bold',
  },
  rightContent: {
    //alignItems: 'flex-end',
    flexDirection:'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', // Align items to the right
    flex: 1, // Allow right content to take up available space
  },


  value: {
    fontSize: 18,
    fontWeight: 'bold',
   // marginBottom: 4,
   marginRight:3,
    color: '#1C1E32',
    lineHeight: 22, // Adjust the lineHeight as needed
  },
  decimal: {
    fontSize: 18,
    marginRight:3,
    color: '#A1A1A1',
    fontWeight: 'bold',
    lineHeight: 22, // Adjust the lineHeight to match value
  },

  
  button: {
    // backgroundColor: '#EAC9B1',
    // paddingVertical: 4,
    // paddingHorizontal: 3,
    // borderRadius: 8,
    // marginTop: 8,
    width:50,
    height:20,
    borderRadius:100,
    backgroundColor:'#EAC9B1',
  },
  changePercentage: {
    // fontSize: 14,
    // fontWeight: 'bold',
    // color: 'black',

   
    fontWeight:500,
    fontSize:14,
    lineHeight:18.55,
    
  },
};

export default AssetItem;