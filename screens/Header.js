import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    //console.log(isSearchVisible);
    setSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      navigation.navigate('SearchBarList');
    }

    
  };
  const toggleNotifications = () => {
    navigation.navigate('NotificationPage');

    //notification content  
  };
  const toggleUser = () => {
    navigation.navigate('UserDetails');

    //notification content  
  };

  return (
    <>
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
            <TouchableOpacity onPress={toggleSearch}>
              <Image
                style={styles.rightImage}
                source={require("../assets/mask-group2.svg")} // Change to your search icon image source
              />
     
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleNotifications}>

            <Image
              style={styles.rightImage}
              source={require("../assets/mask-group1.svg")}
            />
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    </>
  );
};



















//opening searchbar code 
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

// const Header = () => {
//   const [isSearchVisible, setSearchVisible] = useState(false);

//   const toggleSearch = () => {
//     console.log(isSearchVisible);
//     setSearchVisible(!isSearchVisible);
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.nav}>
//           <View style={styles.leftContent}>
//             <Image
//               style={styles.logo}
//               source={require("../assets/mask-group.png")}
//             />
//             <Text style={styles.welcomeText}>Welcome </Text>
//             <Text style={styles.userName}>Satyam</Text>
//           </View>
//           <View style={styles.rightImageContainer}>
//             <TouchableOpacity onPress={toggleSearch}>
//               <Image
//                 style={styles.rightImage}
//                 source={require("../assets/mask-group2.svg")} // Change to your search icon image source
//               />
//             </TouchableOpacity>
//             <Image
//               style={styles.rightImage}
//               source={require("../assets/mask-group1.svg")}
//             />
//           </View>
//         </View>
//       </View>
//       {isSearchVisible ? (
//         <TextInput
//           style={styles.searchBox}
//           placeholder="Search"
//           onChangeText={(text) => {
//             console.log(text);
//           }}
//         />
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    //height:900,
    marginTop:10,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  welcomeText: {
    // fontSize: 14,figma font size its look small 
    fontSize: 18,
    fontWeight:700,
    lineHeight:21,
    fontFamily:'SFProDisplay',
    color:'#1C1E32',
  },
  userName: {
    fontSize: 18,
    
    fontWeight:600,
    lineHeight:21,
    
    color:'#1C1E32',
    fontFamily: 'SFProDisplay',
  
  },
  rightImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  searchBox: {
    fontSize:16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#C1C2EB',
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: '#E3E9F0',
  },
};

export default Header;


















// // Header.js
// import React,{useState} from 'react';
// import { View, Text, Image, TouchableOpacity,TextInput } from 'react-native';

// const Header = () => {
//     const [isSearchVisible, setSearchVisible] = useState(false);


//     const toggleSearch = () => {
//         console.log(isSearchVisible);
//       setSearchVisible(!isSearchVisible);
//     };
//   return (
//     <>
//     <View style={styles.container}>
//     <View style={styles.nav}>
//       <View style={styles.leftContent}>
//         <Image
//           style={styles.logo}
//           source={require("../assets/mask-group.png")}
//         />
//         <Text style={styles.welcomeText}>Welcome </Text>
//         <Text style={styles.userName}>Satyam</Text>
//       </View>
//       <TouchableOpacity onPress={toggleSearch}>
//         <Image
//           style={styles.rightImage1}
//           source={require("../assets/mask-group2.svg")} // Change to your search icon image source
//         />
//       </TouchableOpacity>
//       <Image
//         style={styles.rightImage}
//         source={require("../assets/mask-group1.svg")}
//       />
      
      
//     </View>
//     </View>
//      {isSearchVisible ? (
//         <TextInput
//         style={styles.searchBox}
//         placeholder="Search"
//         onChangeText={(text) => {
//           console.log(text);
//         }}
//       />
//        ) : (<></>
 
//        )}
//        </>
//   );
// };



// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//      padding: 20,
//   },
  
//   nav: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 10,
//   },
//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     marginRight: 10,
//   },
//   welcomeText: {
//     fontSize: 18,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   rightImage: {
//     width: 40,
//     height: 40,
//     marginLeft: 10,
//   },
//   rightImage1: {
//     width: 40,
//     height: 40,
//     marginLeft: 90,
//   },
//   searchBox: {
//     marginTop: 16,
//     paddingHorizontal: 16,
//     paddingVertical:10,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'lightgray',
//     borderRadius: 8,
//     marginHorizontal: 16,
//     backgroundColor:'red',
//   },
// };

// export default Header;




























