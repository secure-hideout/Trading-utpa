

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AssetCard = ({ data, onPress }) => {
  const navigation = useNavigation(); // Initialize navigation

  const getButtonColor = () => {
    if (data.changePercentage && data.changePercentage[0] === '+') return '#B7DDD2';
    if (data.changePercentage && data.changePercentage[0] === '-') return '#EAC9B1';
    return '#FFFFFF'; // Default color
  };

  const handlePress = () => {
    if (onPress) {
      onPress(data);
    } else {
      // Navigate to a specific screen (replace 'TargetScreen' with the name of the screen you want to navigate to)
      navigation.navigate('ListItemDeatails', { data });
    }
  };

  const isPositiveChange = data.changePercentage && data.changePercentage[0] === '+';

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.leftContainer}>
        <Text style={styles.cardDataText}>{data.name2}</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.value}>{data.value}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: getButtonColor() }]}>
          <FontAwesome5
            name={isPositiveChange ? 'arrow-up' : 'arrow-down'}
            style={[styles.icon, isPositiveChange ? styles.upIcon : styles.downIcon]}
          />
          <Text style={styles.changePercentage}>{data.changePercentage}</Text>
        </TouchableOpacity>
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
    height: 55,
  },
  //   decimal: {
  //   fontSize: 16,
  //   marginRight:3,
  //   color: '#A1A1A1',
  //   fontWeight: 'bold',
  //   lineHeight: 22, // Adjust the lineHeight to match value
  // },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    width: 100,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1E32',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    width: 48,
    height: 20.2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 10,
    marginRight: 2,
  },
  upIcon: {
    color: 'black', // Change the color for positive change
  },
  downIcon: {
    color: 'black', // Change the color for negative change
  },
  changePercentage: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 17.55,
  },
  cardDataText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
});

export default AssetCard;
