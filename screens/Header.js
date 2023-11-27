import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ assetData }) => {
  const navigation = useNavigation();
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleNotifications = () => {
    navigation.navigate('NotificationPage');
  };

  const toggleUser = () => {
    navigation.navigate('UserDetails');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={toggleUser}>
            <View style={styles.leftContent}>
              <Image
                style={styles.logo}
                source={require("../assets/mask-group.png")}
              />
              <Text style={styles.welcomeText}>Welcome </Text>
              <Text style={styles.userName}>Satyam</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightImageContainer}>

            <TouchableOpacity onPress={toggleNotifications}>
              <Image
                style={styles.rightImage}
                source={require("../assets/mask-group1.svg")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: height * 0.04,
    // marginTop: height * 0.01,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.07,
    height: width * 0.07,
    marginRight: width * 0.02,
  },
  welcomeText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    lineHeight: width * 0.052,
    // fontFamily: 'SFProDisplay',
    color: '#1C1E32',
  },
  userName: {
    fontSize: width * 0.045,
    fontWeight: '600',
    lineHeight: width * 0.052,
    color: '#1C1E32',
    // fontFamily: 'SFProDisplay',
  },
  rightImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImage: {
    width: width * 0.07,
    height: width * 0.07,
    marginLeft: width * 0.02,
  },
  searchBox: {
    fontSize: width * 0.042,
    marginTop: height * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    height: height * 0.065,
    borderWidth: 1,
    borderColor: '#C1C2EB',
    borderRadius: width * 0.027,
    marginHorizontal: width * 0.04,
    backgroundColor: '#E3E9F0',
  },
});

export default Header;
