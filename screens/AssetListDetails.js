//wograph
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AssetListDetails = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack('Dashboard02');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
        <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Crypto Asset List Details</Text>
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
    marginTop: 10,
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

export default AssetListDetails;
