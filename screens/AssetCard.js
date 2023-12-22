import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AssetCard = ({ data, onPress }) => {


  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(data)}>
      <View style={styles.nameContainer}>
        <View style={styles.name2Wrapper}>
          <Text style={styles.cardDataText}>{data.name2}</Text>
        </View>
        <View style={styles.name3Wrapper}>
          <Text style={styles.cardDataText1}>{data.name3}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        {/* <Text style={styles.quantityLabel}>QUANTITY:</Text> */}
        <Text style={styles.decimal}>{data.decimalValue}</Text>
      </View>
      <View style={styles.valueContainer}>
        {/* <Text style={styles.value}>{data.value}</Text> */}
        <Text style={styles.value}>{formatValue(data.value)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomColor: '#E5E5E5',
    marginTop: 10,
    borderRadius: 10,
    // height: 55,
  },
  nameContainer: {
    flexDirection: 'row',
    flex:2,
    alignItems: 'center',
  },
  name2Wrapper: {
    flexShrink: 1,
    marginRight: 30,
  },
  name3Wrapper: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{ translateY: -10 }],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(28, 30, 50, 0.6)',
    // marginRight: 4,
  },
  decimal: {
    fontSize: 16,
    fontWeight: '700',
    color: 'green',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1E32',
  },
  cardDataText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(28, 30, 50, 1)',

  },
  cardDataText1: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(28, 30, 50, 0.6)',
  },
});

export default AssetCard;
