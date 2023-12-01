import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPortfolio = ({ totalValue, changePercentage }) => {
  const navigation = useNavigation();

  const CurrentPortfolio = () => {
    // navigation.navigate('UserDetails');
  };

  // Convert totalValue to a fixed decimal string
  const totalValueString = totalValue.toFixed(2);


  // Split the string into main part and decimal part
  const [mainValue, decimalValue] = totalValueString.split('.');
  const percentageTextColor = changePercentage && changePercentage.charAt(0) === '+' ? 'green' : 'red';

  return (
    <TouchableOpacity onPress={CurrentPortfolio}>
      <View style={styles.container}>
        <View style={styles.portfolioContainer}>
          <Text style={styles.valueText}>Current Portfolio Value</Text>
          <View style={styles.valueAmount}>
            {/* <Text style={styles.amountText}>$23,500</Text> */}
            <Text style={styles.amountText}>${mainValue}</Text>
            <Text style={styles.decimalText}>.{decimalValue}</Text>
            <View style={styles.greenBox}>
              {/* <Text style={styles.percentText}>+5.9%</Text> */}

              {/* <Text style={styles.percentText}>{changePercentage}</Text> */}
              <Text style={[styles.percentText, { color: percentageTextColor }]}>{changePercentage}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: width * 0.03,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  valueText: {
    fontWeight: '500',
    fontSize: width * 0.04,
    lineHeight: width * 0.047,
    color: '#A1A1A1',
    // fontFamily: 'SFProDisplay',
  },
  portfolioContainer: {
    flexDirection: 'column',
  },
  valueAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontWeight: '700',
    fontSize: width * 0.1,
    lineHeight: width * 0.12,
    color: '#1C1E32',
    // fontFamily: 'SFProDisplay',
  },
  decimalText: {
    fontWeight: '700',
    fontSize: width * 0.1,
    lineHeight: width * 0.12,
    color: '#A1A1A1',
    // fontFamily: 'SFProDisplay',
  },
  greenBox: {
    marginLeft: width * 0.02,
    backgroundColor: 'rgba(28, 30, 50, 0.2)',
    width: width * 0.15,
    height: width * 0.075,
    borderRadius: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontWeight: '900',
    fontSize: width * 0.025,
    lineHeight: width * 0.03,
    // color: '#FFFFFF',
    // fontFamily: 'SFProDisplay',
  },
});

export default MyPortfolio;
