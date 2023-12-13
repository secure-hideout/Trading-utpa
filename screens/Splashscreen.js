import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { Image } from "expo-image";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ animationSource, loop = true, autoPlay = true}) => {
  return (
    <View style={styles.container}>
      {/* Add your splash screen image or logo */}
      {/* <Image
        style={[styles.chartbarIcon]}
        source={require("../assets/Bar.svg")}
        /> */}
     {/* <MaterialIcons  style={[styles.chartbarIcon]} name="show-chart" size={100} color="black" /> */}

     <LottieView
        style={{ width: 200, height: 200 }}
        source={require('../Animation - 1702457284029.json')}
        autoPlay={autoPlay}
        loop={loop}
      />



      <View style={styles.trading}>
         <Text style={styles.trading1}>Best Trading App</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Customize the background color
  },
  logo: {
    width: 200, // Customize the width of your logo
    height: 200, // Customize the height of your logo
  },
  chartbarIcon: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 3,
    width: 100,
    height: 100,
    color: 'red'
  },
  trading:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  trading1:{
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default SplashScreen;