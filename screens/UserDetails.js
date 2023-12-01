import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Profileinfo from "../screens/Profileinfo";
import { Ionicons } from '@expo/vector-icons';



const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // const goBack = () => {
  //   navigation.navigate('WatchList');
  // };

  // const goBack = () => {
  //   if (route.params?.fromBottomTab) {
  //     navigation.navigate('WatchList'); // If navigated from bottom tab
  //   } else {
  //     navigation.goBack(); // Otherwise, go back to the previous screen
  //   }
  // };

  const goBack = () => {
    if (route.params?.fromBottomTab) {
      // If navigated from the bottom tab, go back to the previous screen in the tab navigator
      navigation.goBack();
    } else {
      // If navigated from the header, go back to the WatchList screen
      navigation.navigate('WatchList');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.backButton1}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>

          <Ionicons name="arrow-back-outline" size={25} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.userInfo}>User Details</Text>
      </View>
      < Profileinfo navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 1,
    // backgroundColor: 'white',
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



//mine
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