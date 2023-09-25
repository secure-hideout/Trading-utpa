








import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardItems = ({ name, value, changePercentage, color }) => {
  const navigation = useNavigation();

  const toggleCryptoAssetDetail = () => {
    navigation.navigate('AssetListDetails');

    //notification content  
  };

  return (
    <TouchableOpacity style={styles.container5} onPress={toggleCryptoAssetDetail}>
      <View style={[styles.container5, { backgroundColor: color }]}>
        <View style={styles.gridContainer}>
          <View style={styles.firstLine}>
            <View style={styles.textContainer}>
              <Text style={styles.gridText}>{name}</Text>
            </View>
          </View>
          <View style={styles.secondLine}>
            <Text style={styles.value2}>{value}</Text>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonValue}>{changePercentage}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {


  container5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginLeft: 1,
    backgroundColor: '#FFFFFF',
    marginRight:2,
    height:80,
  },
  gridContainer: {
    alignItems: 'center',
    marginTop: 4,
    flex: 1,
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 6,
    marginTop: 4,
  },
  secondLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 10,
    marginTop: 4,
  },
  gridText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 17.71,
  },
  value2: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  button2: {
    backgroundColor: 'rgba(28, 30, 50, 0.2)',
    borderRadius: 10,
    padding: 4,
    marginTop: 4,
  },
  buttonValue: {
    fontFamily: 'SFProDisplay',
    fontWeight: 800,
    fontSize: 10,
    lineHeight: 13.55,
    color: 'rgba(28, 30, 50, 1)',
  },
};





export default CardItems;



//gird height without reduce 
// container5: {
//   flex: 1,
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   borderRadius: 10,
//   marginLeft: 2,
//   backgroundColor: '#FFFFFF',
// },
// gridContainer: {
//   alignItems: 'center',
//   marginTop: 8,
//   flex: 1,
// },
// firstLine: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 10,
// },
// secondLine: {
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: 10,
// },
// gridText: {
//   fontSize: 16,
//   fontWeight: '600',
//   lineHeight: 17.71,
// },
// value2: {
//   fontSize: 12,
//   fontWeight: '700',
//   lineHeight: 19.09,
//   color: 'rgba(28, 30, 50, 1)',
// },
// button2: {
//   backgroundColor: 'rgba(28, 30, 50, 0.2)',
//   borderRadius: 10,
//   padding: 3,
//   marginTop: 10,
// },
// buttonValue: {
//   fontFamily: 'SFProDisplay',
//   fontWeight: 800,
//   fontSize: 12,
//   lineHeight: 13.55,
//   color: 'rgba(28, 30, 50, 1)',
// },





















