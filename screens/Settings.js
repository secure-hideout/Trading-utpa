import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Tools from './Tools'


const Settings = () => {
  const navigation = useNavigation();

  const goBack = () => {
    // navigation.goBack('Dashboard02'); rewritten like below for navigate 
    // navigation.navigate('Home'); withouthome
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton1}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.userInfo}>Tools</Text>
      </View>
      < Tools />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  top: 1,
 // backgroundColor: 'white',
  // justifyContent: 'center',
 // alignItems: 'center',
 backgroundColor: "#f5f5f5",
},
backIcon: {
  top: 12,
},
backButton: {
  marginRight: -40,

  },
  backButton1: {
    marginTop: 30,
    width: '98%',
    height: 50,
    //backgroundColor:'red',
    flexDirection: 'row'

  },
  userInfo: {
    top: 13,
    left: 50,
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default Settings;