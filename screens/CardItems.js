import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardItems = ({ name, value, changePercentage, color, onClick, selectedCard }) => {
  const isActive = name === selectedCard;
  const navigation = useNavigation();

  const positiveChangeStyles = {
    color: 'green',
  };

  const negativeChangeStyles = {
    color: 'red',
  };

  const getChangePercentageStyles = () => {
    if (changePercentage.includes('+')) {
      return positiveChangeStyles;
    } else if (changePercentage.includes('-')) {
      return negativeChangeStyles;
    }
    return {};
  };

  const activeCardStyles = {
    transform: [{ scale: 1.05 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  };

  const blurOverlay = !isActive ? { opacity: 0.4 } : {};

  return (
    <TouchableOpacity style={styles.container5} onPress={() => onClick(name)}>
      <View style={[styles.container5, { backgroundColor: color }, isActive ? activeCardStyles : null]}>
        <View style={styles.gridContainer}>
          <View style={[styles.firstLine, blurOverlay]}>
            <View style={styles.textContainer}>
              <Text style={styles.gridText}>{name}</Text>
            </View>
          </View>
          <View style={[styles.secondLine, blurOverlay]}>
            <Text style={styles.value2}>{value}</Text>
            <TouchableOpacity style={styles.button2}>
              <Text style={[styles.buttonValue, getChangePercentageStyles()]}>{changePercentage}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginLeft: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 2,
    height: 80,
  },
  gridContainer: {
    alignItems: 'center',
    marginTop: 4,
    flex: 1,
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  secondLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '800',
    fontSize: 10,
    lineHeight: 13.55,
    color: 'rgba(28, 30, 50, 1)',
  },
});

export default CardItems;