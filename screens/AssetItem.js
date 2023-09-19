import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AssetItem = ({ 
    name2, 
    name3, 
    value, 
    decimalValue, 
    changePercentage, 
    onPress
    
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerAssetItem}>
      
        <View style={styles.leftContent}>
          {/* If SVGs are used, the import and component might need changes */}
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
    </TouchableOpacity>
  );
};








const styles = {
  containerAssetItem: {
 

    flexDirection: 'row',
   
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor:"rgba(255, 255, 255, 0.8)",
    // backgroundColor:'black',
    borderBottomColor: '#E5E5E5',
    marginTop:10,
    borderRadius:10,
    height:55,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 8,
    backgroundColor:"rgba(227, 233, 240, 1)",
    borderRadius:15,
   
  },
  Text: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color:'rgba(28, 30, 50, 1)',
  },
  span: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color:'rgba(28, 30, 50, 0.6)',
    left:2,
  },
  rightContent: {
    //alignItems: 'flex-end',
    flexDirection:'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', // Align items to the right
    flex: 1, // Allow right content to take up available space
  },


  value: {
    fontSize: 16,
    fontWeight: 'bold',
   // marginBottom: 4,
   marginRight:3,
    color: '#1C1E32',
    lineHeight: 22, // Adjust the lineHeight as needed
  },
  decimal: {
    fontSize: 16,
    marginRight:3,
    color: '#A1A1A1',
    fontWeight: 'bold',
    lineHeight: 22, // Adjust the lineHeight to match value
  },

  
  button: {
  
    width:43,
    height:19.2,
    borderRadius:100,
    backgroundColor:'#EAC9B1',
  },
  changePercentage: {
    // fontSize: 14,
    // fontWeight: 'bold',
    // color: 'black',

   
    fontWeight:500,
    fontSize:10,
    lineHeight:17.55,
    alignItems:'center',
    left:4,
    
  },
};

export default AssetItem;