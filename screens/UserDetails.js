// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// //import Dashboard02 from './Dashboard02';

// const UserDetails = () => {
//   const navigation = useNavigation();

//   const goBack = () => {
//     // navigation.goBack('Dashboard02'); rewritten like below for navigate 
//     // navigation.navigate('Home'); without home
//     navigation.navigate('WatchList');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={goBack} style={styles.backButton}>
//         {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
//         <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
//       </TouchableOpacity>
//       <Text style={styles.title}>User Details</Text>
//     </View>
//   );
// };


// // import React from 'react';
// // import { View, Text, TouchableOpacity, Image } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { connect } from 'react-redux'; // Import connect from react-redux

// // const UserDetails = (props) => {
// //   const navigation = useNavigation();

// //   const goBack = () => {
// //     navigation.navigate('WatchList');
// //   };

// //   // Log Redux state
// //   console.log('Redux State - User:', props.user);
// //   // You can add more console.log statements for other Redux state properties if needed

// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity onPress={goBack} style={styles.backButton}>
// //         <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
// //       </TouchableOpacity>
// //       <Text style={styles.title}>User Details</Text>
// //     </View>
// //   );
// // };

// // const mapStateToProps = (state) => ({
// //   user: state.user, // Map the 'user' state property to props.user
// // });


import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Image as expoImage } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { FontAwesomeIcon } from 'react-native-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profileinfo from "../screens/Profileinfo";
import { Ionicons } from '@expo/vector-icons';
//import ImagePicker from 'react-native-image-picker';


const Profile = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('WatchList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton1}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.userInfo}>User Details</Text>
      </View>
      < Profileinfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center',
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

export default Profile;






// const styles = {
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     paddingVertical: 30,
//     // paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   backIcon: {
//     width: 24,
//     height: 24,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// };

// export default UserDetails;
// // export default connect(mapStateToProps)(UserDetails);