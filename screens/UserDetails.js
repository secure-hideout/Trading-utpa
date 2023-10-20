import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
//import Dashboard02 from './Dashboard02';

const UserDetails = () => {
  const navigation = useNavigation();

  const goBack = () => {
    // navigation.goBack('Dashboard02'); rewritten like below for navigate 
    // navigation.navigate('Home'); without home
    navigation.navigate('WatchList');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
        <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>User Details</Text>
    </View>
  );
};


// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { connect } from 'react-redux'; // Import connect from react-redux

// const UserDetails = (props) => {
//   const navigation = useNavigation();

//   const goBack = () => {
//     navigation.navigate('WatchList');
//   };

//   // Log Redux state
//   console.log('Redux State - User:', props.user);
//   // You can add more console.log statements for other Redux state properties if needed

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={goBack} style={styles.backButton}>
//         <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
//       </TouchableOpacity>
//       <Text style={styles.title}>User Details</Text>
//     </View>
//   );
// };

// const mapStateToProps = (state) => ({
//   user: state.user, // Map the 'user' state property to props.user
// });





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

export default UserDetails;
// export default connect(mapStateToProps)(UserDetails);