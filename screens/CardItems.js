import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CardItems = ({ name, value, changePercentage, color }) => {
  return (

    
    <View style={[styles.container5, { backgroundColor: color }]}>
    {/* // <View style={styles.container5}> */}
      <View style={styles.gridContainer}>
        {/* First Line */}
        <View style={styles.firstLine}>
          {/* <Image style={styles.logo2} source={require('../assets/ethereumsvgrepocom-1.svg')} /> */}
          <View style={styles.textContainer}>
            <Text style={styles.gridText}>{name}</Text>
            {/* <Text style={styles.gridSubText}>{symbl}</Text> */}
          </View>
        </View>
        {/* Second Line */}
        <View style={styles.secondLine}>
          <Text style={styles.value2}>{value}</Text>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonValue}>{changePercentage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container5: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginLeft:3,
    
    //padding: 0,
  },
  
  gridContainer: {

    alignItems: 'center',
    //margin: 5,
    //borderRadius: 10,
    ///backgroundColor: 'lightgray',
   
    flex:1,
   
    
  },
 
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondLine: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
  logo2: {
    width: 20,
    height: 20,
    marginBottom: 8,
  },
  // textContainer: {
  //   //marginLeft: 5,
  // },
  gridText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  gridSubText: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: 3,
  },
  value2: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button2: {
    backgroundColor: '#A9A9A9',
    borderRadius: 10,
    padding: 3,
    marginTop: 10,
    
  },
  buttonValue: {
    color: '#1C1E32',
    fontSize: 13,
    fontWeight: 'bold',
  },
};

export default CardItems;


















