import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const AssetItem = ({
  name2,
  name3,
  value,
  decimalValue,
  changePercentage,
  onPress,
  onRemove,
  onAdd,
  showRemoveIcon,
  showAddIcon,
}) => {
  const swipeRowRef = useRef(null);

  const swipeAnim = useRef(new Animated.Value(0)).current;

  const leftIconOpacity = swipeAnim.interpolate({
    inputRange: [0, 75],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const rightIconOpacity = swipeAnim.interpolate({
    inputRange: [-75, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const getButtonColor = () => {
    if (changePercentage && changePercentage[0] === '+') return '#B7DDD2';
    if (changePercentage && changePercentage[0] === '-') return '#EAC9B1';
    // return '#000000'; // Default color
  };

  const handleRemove = () => {
    if (swipeRowRef.current) {
      swipeRowRef.current.closeRow(); // Close the swipe action
      setTimeout(() => {
        onRemove(); // Perform the remove action after a delay
      }, 300); // Adjust the delay as needed
    }
  };

  const handleAdd = () => {
    if (swipeRowRef.current) {
      swipeRowRef.current.closeRow(); // Close the swipe action
      setTimeout(() => {
        onAdd(); // Perform the add action after a delay
      }, 300); // Adjust the delay as needed
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // When the screen is focused (navigated to), close the swipe view if it's open
      if (swipeRowRef.current) {
        swipeRowRef.current.closeRow();
      }
      // Return a cleanup function to close the swipe view when the screen is blurred (navigated away from)
      return () => {
        if (swipeRowRef.current) {
          swipeRowRef.current.closeRow();
        }
      };
    }, [])
  );


  return (
    <SwipeRow
      leftOpenValue={75}
      rightOpenValue={-75}
      onSwipeValueChange={({ value }) => swipeAnim.setValue(value)}
      ref={swipeRowRef}
    >
      <View style={styles.rowBack}>
        {showRemoveIcon && (
          <Animated.View
            style={{
              ...styles.leftButton,
              opacity: leftIconOpacity,
            }}
          >
            <Icon name="trash-outline" size={24} color="red" onPress={handleRemove} />
          </Animated.View>
        )}
        {showRemoveIcon && (
          <Animated.View
            style={{
              ...styles.rightButton,
              opacity: rightIconOpacity,
            }}
          >
            <Icon name="trash-outline" size={24} color="red" onPress={handleRemove} />
          </Animated.View>
        )}
        {showAddIcon && (
          <Animated.View
            style={{
              ...styles.leftButton,
              opacity: leftIconOpacity,
            }}
          >
            <Icon name="add-circle-outline" size={24} color="green" onPress={handleAdd} />
          </Animated.View>
        )}
        {showAddIcon && (
          <Animated.View
            style={{
              ...styles.rightButton,
              opacity: rightIconOpacity,
            }}
          >
            <Icon name="add-circle-outline" size={24} color="green" onPress={handleAdd} />
          </Animated.View>
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerAssetItem}>
          <View style={styles.leftContent}>
            <Text style={styles.Text}>{name2}</Text>
            <Text style={styles.Text1}>{name3}</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.decimal}>{decimalValue}</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getButtonColor() }]}
            >
              <Text style={styles.changePercentage}>{changePercentage}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeRow>
  );
};


const styles = {
  containerAssetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",

    // backgroundColor: 'rgba(227, 233, 240, 1)',

    borderBottomColor: '#E5E5E5',
    marginTop: 10,
    borderRadius: 10,
    height: 55,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // logo: {
  //   width: 25,
  //   height: 25,
  //   marginRight: 8,
  //   backgroundColor: "rgba(227, 233, 240, 1)",
  //   borderRadius: 15,
  // },
  Text: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  // span: {
  //   fontSize: 16,
  //   fontWeight: '700',
  //   lineHeight: 19.09,
  //   color: 'rgba(28, 30, 50, 0.6)',
  //   left: 2,
  // },


  rightContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', // Align items to the right
    flex: 1, // Allow right content to take up available space
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 3,
    color: '#1C1E32',
    lineHeight: 22, // Adjust the lineHeight as needed
  },


  // decimal: {
  //   fontSize: 16,
  //   marginRight: 3,
  //   color: '#A1A1A1',
  //   fontWeight: 'bold',
  //   lineHeight: 22, // Adjust the lineHeight to match value
  // },


  // button: {
  //   width: 43,
  //   height: 19.2,
  //   borderRadius: 100,
  //   //backgroundColor:'#EAC9B1',
  // },


  // changePercentage: {
  //   // fontSize: 14,
  //   // fontWeight: 'bold',
  //   // color: 'black',

  //using
  //   fontWeight: 500,
  //   fontSize: 10,
  //   lineHeight: 17.55,
  //   alignItems: 'center',
  //   left: 4,

  // },


  rowBack: {
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 10,
  },
  leftButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    //backgroundColor: 'blue',
    left: 0,
  },
  rightButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    //backgroundColor: 'red',
    right: 0,
  },
  Text1: {
    // color: 'green',
    color: 'rgba(28, 30, 50, 0.6)',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.09,
    marginLeft: 10,


  }


};

export default AssetItem;
