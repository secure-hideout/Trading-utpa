import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Style } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { FontAwesomeIcon } from 'react-native-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigation } from '@react-navigation/native';
//import { Clipboard } from '@react-native-clipboard/clipboard'; // Import Clipboard
//import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profileinfo = () => {
  const [apiData, setApiData] = useState({ ID: '', CreatedAt: '', UpdatedAt: '', Balance: '', LastLogin: '', PasswordUpdatedAt: '' })

  const [isHidden, setIsHidden] = useState(true); // Initialize the state as hidden

  const { token } = useSelector((state) => state.auth);
  console.log("Dashboard", token);

  const toggleVisibility = () => {
    setIsHidden(!isHidden); // Toggle the state when the eye icon is clicked
  };

  const navigation = useNavigation();
  const handleBackVerification = () => {
    navigation.navigate('watchlist');
  };

  const handleLogout = async () => {
    try {
      // Clear user data in AsyncStorage and navigate to the login page
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      // You can add a request body if needed, for example:
      // body: JSON.stringify({ key: 'value' }),
      redirect: 'follow',
    };

    fetch('http://35.154.235.224:9000/api/user/profile', requestOptions)
      .then((response) => response.json()) // Parse the response as JSON
      .then((result) => {
        setApiData({
          ids: result.UserID, // Assuming "name1" contains the ID
          CreatedAt: result.CreatedAt,
          UpdatedAt: result.UpdatedAt,
          Balance: result.Balance,
          LastLogin: result.LastLogin,
          PasswordUpdatedAt: result.PasswordUpdatedAt,
        });
      })
      .catch((error) => console.error('Error:', error));
  }, []);



  const buttonData = [
    {
      icon: "check-circle",
      text: "User Active",
      // onPress: handleBackVerification,
      icon2: "chevron-right",
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',
      },
    },
    {
      icon1: "diamond",
      text: "Regular",
      info: "Use BNB to get discount",
      icon2: "chevron-right",
      styles: {
        infoColor: 'green',
      },
    },
    {
      icon1: "user",
      text: "ID",
      info: apiData.ids,
      icon4: "content-copy",
      onPress: () => {
        // Add the logic for this button here
      },
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',
      },
    },
    {
      icon: "account-circle",
      text: "Registration Info",
      icon3: isHidden ? 'visibility-off' : 'remove-red-eye',
      info: isHidden ? apiData.Email : 'vamsi@gmail.com',
      onPress: toggleVisibility,
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',

      },

    },
    {
      icon1: "calendar",
      text: "CreatedAt",
      info: apiData.CreatedAt,
      icon4: "",
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',

      },

    },
    {
      icon: "update",
      text: "UpdatedAt",
      info: apiData.UpdatedAt,
      icon4: "",
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',

      },

    },
    {
      icon: "account-balance",
      text: "Balance",
      info: apiData.Balance,
      icon4: "",
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',

      },

    },
    {
      icon: "login",
      text: "LastLogin",
      info: apiData.LastLogin,
      icon4: "",
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',

      },

    },
    {
      icon: "edit",
      text: "PasswordUpdatedAt",
      info: apiData.PasswordUpdatedAt,
      icon4: "",
      styles: {
        // iconColor: 'blue',
        // textColor: 'green',
        infoColor: 'black',

      },

    },
  ];

  const mappedButtons = buttonData.map((button, index) => (
    <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          <MaterialIcons style={styles.icon} name={button.icon} size={30} />
          {/* {button.icon1 && ( */}
          <Icon style={styles.diamond} name={button.icon1} size={25} color="black" />
          {/* )} */}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { numberOfLines: 1 }]}>{button.text}</Text>
          {/* {button.info && <Text style={[styles.info, { color: button.styles.infoColor }]}>{button.info}</Text>} */}
          {button.info && (
            <Text
              style={[
                styles.info,
                { color: button.styles.infoColor || 'defaultInfoColor' }
              ]}
            >
              {button.info}
            </Text>
          )}
        </View>
        <View style={styles.chevronContainer}>
          {/* Right chevron (starting from the right) */}
          <Icon
            name={button.icon2}
            size={17}
            color="black"
            style={{ position: 'absolute', left: '300%', top: -7, transform: [{ rotate: '0deg' }] }}
          />
        </View>
        <View style={styles.copy}>
          <MaterialIcons
            name={button.icon4}
            size={20}
            style={{ position: 'absolute', left: '195%', top: -7, }} />
        </View>
        <View style={styles.regInfoContainer}>
          <TouchableOpacity style={styles.textButton}>
            <Text style={styles.regInfo}>
              {isHidden ? apiData.Email : ''}
            </Text>
          </TouchableOpacity>
        </View>
        {button.onPress && (
          <TouchableOpacity onPress={toggleVisibility} style={styles.eyeContainer}>
            {/* You can customize the style and appearance of the eye icon button */}
            <MaterialIcons
              style={styles.eyeIcon}
              name={button.icon3 ? button.icon3 : ''}
              size={20}
              color="black"
            />
          </TouchableOpacity>

        )}
      </View>
    </TouchableOpacity>
  ));

  return (

    <ScrollView style={styles.buttonList}>
      <View style={styles.Nav}></View>
      {mappedButtons}
      <TouchableOpacity style={styles.logButton} onPress={handleLogout}>
        <Text style={styles.logout}>LogOut</Text>
      </TouchableOpacity>
    </ScrollView>

  );

}


const styles = StyleSheet.create({
  buttonList: {
    flex: 1,
    width: '100%'
  },

  button: {
    top: 1,
    //backgroundColor: 'lightblue', // Background color of the button
    margin: 5,
    // padding: 10,
    // borderRadius: 10, // Border radius for rounded corners
    // borderWidth: 1, // Border width
    // borderColor: 'white', // Border color
    width: '155%',
    marginLeft: 16,

  },
  Nav: {
    width: '98%',
    height: '16',
    backgroundColor: 'green'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    left: -7
  },
  iconContainer: {
    marginRight: 10,
  },
  diamond: {
    top: -20,
  },
  icon: {
    textAlign: 'center',
    top: 18,

  },
  copy: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    //flexDirection: 'row'
    zIndex: 1,
    position: 'absolute',
    left: 37

  },
  text: {
    // zIndex: 1,
    flexDirection: 'row',
    // fontSize: 18,
    // fontWeight: 'bold'
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
    // color:'red',


  },
  info: {
    flexDirection: 'row',
    fontWeight: '500'
  },
  chevronContainer: {
    flex: 1,

  },
  chevron: {
    //left: 100,

    //Chevron icon styles
  },
  regInfoContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  regInfo: {
    // Registration Info text styles
  },
  eyeContainer: {
    //marginLeft: 10,
  },
  eyeIcon: {
    left: 13,
    // Eye icon styles
  },
  // buttonList: {
  //   flex: 1, // Use flex to take up all available space
  //   justifyContent: 'center', // Center the content vertically
  //   alignItems: 'center', // Center the content horizontally
  //  // padding: 10
  // },
  logButton: {
    //  height: 'vh', // Set the height to 10% of the viewport height
    backgroundColor: '#8f8bcc',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 5,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 3
  },
  logout: {
    color: 'rgba(28, 30, 50, 1)',
    fontSize: 20,
  },

});

export default Profileinfo;








// import React, { useState, useEffect } from 'react';
// import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Style } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// //import { FontAwesomeIcon } from 'react-native-fontawesome';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useNavigation } from '@react-navigation/native';
// //import { Clipboard } from '@react-native-clipboard/clipboard'; // Import Clipboard
// //import Toast from 'react-native-toast-message';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';



// const Profileinfo = () => {
//   const [apiData, setApiData] = useState({ ID: '', CreatedAt: '', UpdatedAt: '', Balance: '', LastLogin: '', PasswordUpdatedAt: '' })

//   const [isHidden, setIsHidden] = useState(true); // Initialize the state as hidden

//   const { token } = useSelector((state) => state.auth);
//   console.log("Dashboard", token);

//   const toggleVisibility = () => {
//     setIsHidden(!isHidden); // Toggle the state when the eye icon is clicked
//   };

//   const navigation = useNavigation();
//   const handleBackVerification = () => {
//     navigation.navigate('watchlist');
//   };

//   const handleLogout = async () => {
//     try {
//       // Clear user data in AsyncStorage and navigate to the login page
//       await AsyncStorage.removeItem('userData');
//       navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   useEffect(() => {

//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${token}`);

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       // You can add a request body if needed, for example:
//       // body: JSON.stringify({ key: 'value' }),
//       redirect: 'follow',
//     };

//     fetch('http://35.154.235.224:9000/api/user/profile', requestOptions)
//       .then((response) => response.json()) // Parse the response as JSON
//       .then((result) => {
//         setApiData({
//           ids: result.UserID, // Assuming "name1" contains the ID
//           CreatedAt: result.CreatedAt,
//           UpdatedAt: result.UpdatedAt,
//           Balance: result.Balance,
//           LastLogin: result.LastLogin,
//           PasswordUpdatedAt: result.PasswordUpdatedAt,
//         });
//       })
//       .catch((error) => console.error('Error:', error));
//   }, []);



//   const buttonData = [
//     {
//       icon: "check-circle",
//       text: "User Active",
//       // onPress: handleBackVerification,
//       icon2: "chevron-right",
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',
//       },
//     },
//     {
//       icon1: "diamond",
//       text: "Regular",
//       info: "Use BNB to get discount",
//       icon2: "chevron-right",
//       styles: {
//         infoColor: 'green',
//       },
//     },
//     {
//       icon1: "user",
//       text: "ID",
//       info: apiData.ids,
//       icon4: "content-copy",
//       onPress: () => {
//         // Add the logic for this button here
//       },
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',
//       },
//     },
//     {
//       icon: "account-circle",
//       text: "Registration Info",
//       icon3: isHidden ? 'visibility-off' : 'remove-red-eye',
//       info: isHidden ? apiData.Email : 'FirstName',
//       onPress: toggleVisibility,
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',

//       },

//     },
//     {
//       icon1: "calendar",
//       text: "CreatedAt",
//       info: apiData.CreatedAt,
//       icon4: "",
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',

//       },

//     },
//     {
//       icon: "update",
//       text: "UpdatedAt",
//       info: apiData.UpdatedAt,
//       icon4: "",
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',

//       },

//     },
//     {
//       icon: "account-balance",
//       text: "Balance",
//       info: apiData.Balance,
//       icon4: "",
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',

//       },

//     },
//     {
//       icon: "login",
//       text: "LastLogin",
//       info: apiData.LastLogin,
//       icon4: "",
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',

//       },

//     },
//     {
//       icon: "edit",
//       text: "PasswordUpdatedAt",
//       info: apiData.PasswordUpdatedAt,
//       icon4: "",
//       styles: {
//         // iconColor: 'blue',
//         // textColor: 'green',
//         infoColor: 'black',

//       },

//     },
//   ];

//   const mappedButtons = buttonData.map((button, index) => (
//     <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
//       <View style={styles.buttonContent}>
//         <View style={styles.iconContainer}>
//           <MaterialIcons style={styles.icon} name={button.icon} size={30} />
//           {/* {button.icon1 && ( */}
//           <Icon style={styles.diamond} name={button.icon1} size={25} color="black" />
//           {/* )} */}
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={[styles.text, { numberOfLines: 1 }]}>{button.text}</Text>
//           {/* {button.info && <Text style={[styles.info, { color: button.styles.infoColor }]}>{button.info}</Text>} */}
//           {button.info && (
//             <Text
//               style={[
//                 styles.info,
//                 { color: button.styles.infoColor || 'defaultInfoColor' }
//               ]}
//             >
//               {button.info}
//             </Text>
//           )}
//         </View>
//         <View style={styles.chevronContainer}>
//           {/* Right chevron (starting from the right) */}
//           <Icon
//             name={button.icon2}
//             size={17}
//             color="black"
//             style={{ position: 'absolute', left: '300%', top: -7, transform: [{ rotate: '0deg' }] }}
//           />
//         </View>
//         <View style={styles.copy}>
//           <MaterialIcons
//             name={button.icon4}
//             size={20}
//             style={{ position: 'absolute', left: '195%', top: -7, }} />
//         </View>
//         <View style={styles.regInfoContainer}>
//           <TouchableOpacity style={styles.textButton}>
//             <Text style={styles.regInfo}>
//               {isHidden ? apiData.Email : ''}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {button.onPress && (
//           <TouchableOpacity onPress={toggleVisibility} style={styles.eyeContainer}>
//             {/* You can customize the style and appearance of the eye icon button */}
//             <MaterialIcons
//               style={styles.eyeIcon}
//               name={button.icon3 ? button.icon3 : ''}
//               size={20}
//               color="black"
//             />
//           </TouchableOpacity>

//         )}
//       </View>
//     </TouchableOpacity>
//   ));

//   return (

//     <ScrollView style={styles.buttonList}>
//       <View style={styles.Nav}></View>
//       {mappedButtons}
//       <TouchableOpacity style={styles.logButton} onPress={handleLogout}>
//         <Text style={styles.logout}>LogOut</Text>
//       </TouchableOpacity>
//     </ScrollView>

//   );

// }


// const styles = StyleSheet.create({
//   buttonList: {
//     flex: 1,
//     width: '100%'
//   },

//   button: {
//     top: 1,
//     //backgroundColor: 'lightblue', // Background color of the button
//     margin: 5,
//     padding: 10,
//     borderRadius: 10, // Border radius for rounded corners
//     borderWidth: 1, // Border width
//     borderColor: 'white', // Border color
//     width: '155%',
//     marginLeft: 4,

//   },
//   Nav: {
//     width: '98%',
//     height: '16',
//     backgroundColor: 'green'
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '60%',
//     left: -7
//   },
//   iconContainer: {
//     marginRight: 10,
//   },
//   diamond: {
//     top: -20,
//   },
//   icon: {
//     textAlign: 'center',
//     top: 18,

//   },
//   copy: {
//     flex: 1
//   },
//   textContainer: {
//     flex: 1,
//     //flexDirection: 'row'
//     zIndex: 1,
//     position: 'absolute',
//     left: 37
//   },
//   text: {
//     zIndex: 1,
//     flexDirection: 'row',
//     fontSize: 18,
//     fontWeight: 'bold'


//   },
//   info: {
//     flexDirection: 'row',
//     fontWeight: '500'
//   },
//   chevronContainer: {
//     flex: 1,

//   },
//   chevron: {
//     //left: 100,

//     //Chevron icon styles
//   },
//   regInfoContainer: {
//     flex: 1,
//     flexDirection: 'row'
//   },
//   regInfo: {
//     // Registration Info text styles
//   },
//   eyeContainer: {
//     //marginLeft: 10,
//   },
//   eyeIcon: {
//     left: 19
//     // Eye icon styles
//   },
//   // buttonList: {
//   //   flex: 1, // Use flex to take up all available space
//   //   justifyContent: 'center', // Center the content vertically
//   //   alignItems: 'center', // Center the content horizontally
//   //  // padding: 10
//   // },
//   logButton: {
//     //  height: 'vh', // Set the height to 10% of the viewport height
//     backgroundColor: '#A9A9A9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 100,
//     padding: 10,
//     borderRadius: 6,
//     marginHorizontal: 3
//   },
//   logout: {
//     color: 'white',
//     fontSize: 20,
//   },

// });

// export default Profileinfo;

