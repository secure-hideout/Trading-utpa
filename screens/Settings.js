import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const Settings = () => {
  const navigation = useNavigation();

  const goBack = () => {
    // navigation.goBack('Dashboard02'); rewritten like below for navigate 
    // navigation.navigate('Home'); withouthome
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
        <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Tools</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 30,
    // paddingHorizontal: 20,
    marginTop:10,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default Settings;