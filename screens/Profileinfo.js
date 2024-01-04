import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import Modal from "react-native-modal";
import AssetDataContext from "./AssetDataContext";
import { Card, Button } from "react-native-paper";
import { deleteConform } from "../api/profileApi";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/authActions";
import Toast from "react-native-toast-message";
import Changepassword from "./Changepassword";
import Changename from "./Changename";

const ProfileInfo = () => {
  const { setFirstName } = useContext(AssetDataContext);
   
  const [apiData1, setApiData1] = useState({ 
    FirstName: "",
    LastName: "",
    FirstName1: "",
  });

  const [apiData, setApiData] = useState({
    ID: "",
    FirstName: "",
    LastName: "",
    CreatedAt: "",
    UpdatedAt: "",
    Balance: "",
    LastLogin: "",
    PasswordUpdatedAt: "",
    FirstName: "",
    LastName: "",
    DeletedAt: "",
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [touchedButtonIndex, setTouchedButtonIndex] = useState(null);
  const [isLogoutModalVisible, setLogoutModalVisibility] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateNameModal, setShowUpdateNameModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [firstname, setFirstname] = useState(apiData.FirstName);
  const [lastname, setLastname] = useState('');
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
 

  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    setLogoutModalVisibility(true);
  };

  const handleConfirmLogout = () => {
    console.log("Logging out...");
    setLogoutModalVisibility(false);
    navigation.navigate("Login");
  };

  const handleCancelLogout = () => {
    setLogoutModalVisibility(false);
  };

   useEffect(() => {
     fetchData();
   }, [token]);
 
  

   useEffect(() => {
     fetchData();
   }, [token, firstname, lastname]);

 
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://35.154.235.224:9000/api/user/profile",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            redirect: "follow",
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("result:", result);
          const createdAtDate = new Date(result.CreatedAt);
          const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;

          const updatedAtDate = new Date(result.UpdatedAt);
          const formattedUpdatedAt = `${updatedAtDate.getDate()}/${updatedAtDate.getMonth() + 1}/${updatedAtDate.getFullYear()}`;

          const lastLoginDate = new Date(result.LastLogin);
          const formattedLastLogin = `${lastLoginDate.getDate()}/${lastLoginDate.getMonth() + 1}/${lastLoginDate.getFullYear()}`;

          const passwordUpdatedAtDate = new Date(result.PasswordUpdatedAt);
          const formattedPasswordUpdatedAt = `${passwordUpdatedAtDate.getDate()}/${passwordUpdatedAtDate.getMonth() + 1}/${passwordUpdatedAtDate.getFullYear()}`;

          setApiData({
            ID: result.UserID,
            FirstName: result.FirstName,
            LastName: result.LastName,
            CreatedAt: formattedCreatedAt,
            UpdatedAt: formattedUpdatedAt,
            Balance: result.Balance,
            LastLogin: formattedLastLogin,
            PasswordUpdatedAt: formattedPasswordUpdatedAt,
            FirstName: result.FirstName,
            IsEnabled: result.IsEnabled,
            UserType: result.UserType,
          });
          setFirstName(result.FirstName);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };


  const deleteUser = () => {
    deleteConform(apiData.ID, token)
      .then((result) => {
        // Handle success
        console.log("Deleted:", result);
        dispatch(setToken("")); // Dispatch your success action
        navigation.navigate("Login");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };


const buttonData = [
  { id: 1, icon: "check-circle", text: "User Active", info: apiData.IsEnabled ? "Active" : "Inactive", },

  { id: 2, icon: "edit", text: "Update name", info: `${apiData1.FirstName} ${apiData1.LastName}`,},
  
  { id: 3, icon: "layers", set: { right: 6 }, text: "Regular",  info: "Use BNB to get discount",},

  { id: 4, icon: "person", text: "ID", info: apiData.ID,},

  { id: 5, icon: "account-circle", text: "Registration Info", info: apiData1.FirstName,},

  { id: 6, icon: "date-range", text: "CreatedAt", info: apiData.CreatedAt,},

  { id: 7, icon: "update", text: "UpdatedAt", info: apiData.UpdatedAt,  },

  { id: 8, icon: "account-balance", text: "Balance", info: (parseFloat(apiData.Balance) || 0).toFixed(2),},
    
  { id: 9, icon: "login", text: "LastLogin", info: apiData.LastLogin,},
    
  { id: 10, icon: "edit", text: "PasswordUpdatedAt", info: apiData.PasswordUpdatedAt,},
    
  { id: 11, icon: "vpn-key", text: "Updated Password",},

  { id: 12, icon: "delete", text: "Delete Account",},
];


  const mappedButtons = buttonData.map((button, index) => (
    <TouchableOpacity
    key={index}
    style={styles.button}
    onPress={() => {
      setSelectedItemId(button.id);
      if (button.id === 12) {
        setShowDeleteModal(true);
      } else if (button.id === 11) {
        setShowUpdatePasswordModal(true);
      } else if (button.id === 2) {
        setShowUpdateNameModal(true)
      }
    }}
  >
      <View style={styles.buttonContent}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons style={styles.icon} name={button.icon} size={30} />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.text,
              ]}
            >
              {button.text}
            </Text>
            {button.info && (
              <View>
                <Text
                  style={[
                    styles.info,
                    {
                      color:
                        button.styles?.infoColor || "rgba(28, 30, 50, 0.6)",
                    },
                  ]}
                >
                  {touchedButtonIndex === index ? <Text></Text> : button.info}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ));

  return (
    <ScrollView style={styles.scrollViewStyle}>
      {mappedButtons}
      <TouchableOpacity style={styles.logButton} onPress={handleLogout}>
        <Text style={styles.logout}>LogOut</Text>
      </TouchableOpacity>

      <LogoutConfirmationModal
        visible={isLogoutModalVisible}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <LogoutConfirmationModal
        visible={isLogoutModalVisible}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <Card style={styles.cardContainer4}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.conform1}>
                Are you sure you want to delete this Account?
              </Text>
              <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                    onPress={() => deleteUser()}
                    labelStyle={styles.buttonText}
                  >
                    Yes
                  </Button>
                </View>
                <View style={styles.button2}>
                  <Button
                    onPress={() => setShowDeleteModal(false)}
                    labelStyle={styles.buttonText1}
                  >
                    Cancel
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </Modal>
      <Changename isVisible={showUpdateNameModal} onClose={() => setShowUpdateNameModal(false)} setApiData1={setApiData1}/>
      <Changepassword isVisible={showUpdatePasswordModal} onClose={() => setShowUpdatePasswordModal(false)} ID={apiData.ID}/>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    width: "100%",
  },
  buttonList: {
    flex: 1,
    paddingTop: 10,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginBottom: 4,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  buttons: {
    paddingTop: 17,
    flexDirection: "row",
    marginLeft: 10,
  },
  buttonText: {
    paddingTop: 4,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    left: 8,
  },
  conform: {
    textAlign: "center",
    fontWeight: '900',
    fontSize: 18,
    top: 15,
  },
  conform1: {
    paddingBottom: 20,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 16,
    top: 15,
  },
  button1: {
    paddingLeft: 5,
    width: "47%",
    height: 47,
    backgroundColor: "#C1C2EB",
    borderRadius: 50,
  },
  button2: {
    left: 10,
    width: "47%",
    height: 47,
    backgroundColor: "#B7DDD2",
    borderRadius: 50,
  },
  buttonText1: {
    fontWeight: "bold",
    paddingTop: 4,
    alignItems: "center",
    color: "white",
    fontSize: 16,
    Left: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E3E9F0",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 12,
  },
  cardContainer4: {
    backgroundColor: "white",
    width: "95%",
    marginHorizontal: 10,
    paddingVertical: 9,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 4,
    color: "rgba(28, 30, 50, 0.6)",
  },
  icon1: {
    marginLeft: 5,
    color: "rgba(28, 30, 50, 0.6)",
  },
  textContainer: {
    marginLeft: 18,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 19.09,
    color: "rgba(28, 30, 50, 1)",
  },
  info: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "700",
  },

  logButton: {
    marginTop: 10,
    backgroundColor: "#C1C2EB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  logout: {
    color: "#1C1E32",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileInfo;


// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { TextInput } from '@react-native-material/core';
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import LogoutConfirmationModal from "./LogoutConfirmationModal";
// import Modal from "react-native-modal";
// import AssetDataContext from "./AssetDataContext";
// import { Card, Button } from "react-native-paper";
// import { deleteConform } from "../api/profileApi";
// import { useDispatch } from "react-redux";
// import { setToken } from "../redux/actions/authActions";
// import Toast from "react-native-toast-message";
// import Changepassword from "./Changepassword";
// import Changename from "./Changename";




// const ProfileInfo = ({firstName ,}) => {
//   const { setFirstName } = useContext(AssetDataContext);
   
//   const [apiData1, setApiData1] = useState({
//     FirstName: "",
//     LastName: "",
//   });

//   const [apiData, setApiData] = useState({
//     ID: "",
//     FirstName: "",
//     LastName: "",
//     CreatedAt: "",
//     UpdatedAt: "",
//     Balance: "",
//     LastLogin: "",
//     PasswordUpdatedAt: "",
//     FirstName: "",
//     LastName: "",
//     DeletedAt: "",
//   });
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [touchedButtonIndex, setTouchedButtonIndex] = useState(null);
//   const [isLogoutModalVisible, setLogoutModalVisibility] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showDeleteModal1, setShowDeleteModal1] = useState(false);
//   const [showUpdateNameModal, setShowUpdateNameModal] = useState(false);
  
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [selectedItemId1, setSelectedItemId1] = useState(null);
//   const [firstname, setFirstname] = useState(apiData.FirstName);
//   const [lastname, setLastname] = useState('');
//   const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
//   const [currentPassword, setcurrentPassword] = useState('');
//   const [newPassword, setnewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   const [error, setError] = useState("");
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [apidata, setApidata] = useState({
//   });

//   const { token } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     setLogoutModalVisibility(true);
//   };

//   const hideupdatename = () => {
//     setShowUpdateNameModal(false)
     
//   }

//   const hideupdatepassword = () => {
//     setShowUpdatePasswordModal(false)
//   }

//   const handleConfirmLogout = () => {
//     console.log("Logging out...");
//     setLogoutModalVisibility(false);
//     navigation.navigate("Login");
//   };

//   const handleCancelLogout = () => {
//     setLogoutModalVisibility(false);
//   };

//    useEffect(() => {
//      fetchData();
//    }, [token]);

// const updateName = async () => {

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         firstName: firstname, // Replace with the actual firstname
//         lastName: lastname, // Replace with the actual lastname
//         Currenc1y: 'INR', // Replace with the actual currency
//       }),
//     };

//     console.log("------------------>",firstname,lastname)
//     try {
//       const response = await fetch(
//         'http://35.154.235.224:9000/api/user/updateProfile', // Replace with your actual API endpoint
//         requestOptions
//       );

//       const result = await response.text();
//      // setUpdateResult(result);
//       hideupdatename();
//       fetchData();
//       setFirstname('');
//       setLastname('');
//       //setShowDeleteModal(false)
//     } catch (error) {
//       console.error('Error:', error);
//     }
//    };
 
  

//    useEffect(() => {
//      fetchData();
//    }, [token, firstname, lastname]);

//   // useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://35.154.235.224:9000/api/user/profile",
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             redirect: "follow",
//           }
//         );

//         if (response.ok) {
//           const result = await response.json();
//           console.log("result:", result);
//           const createdAtDate = new Date(result.CreatedAt);
//           const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;

//           const updatedAtDate = new Date(result.UpdatedAt);
//           const formattedUpdatedAt = `${updatedAtDate.getDate()}/${updatedAtDate.getMonth() + 1}/${updatedAtDate.getFullYear()}`;

//           // Parse and format the LastLogin date
//           const lastLoginDate = new Date(result.LastLogin);
//           const formattedLastLogin = `${lastLoginDate.getDate()}/${lastLoginDate.getMonth() + 1}/${lastLoginDate.getFullYear()}`;

//           // Parse and format the PasswordUpdatedAt date
//           const passwordUpdatedAtDate = new Date(result.PasswordUpdatedAt);
//           const formattedPasswordUpdatedAt = `${passwordUpdatedAtDate.getDate()}/${passwordUpdatedAtDate.getMonth() + 1}/${passwordUpdatedAtDate.getFullYear()}`;

//           setApiData({
//             ID: result.UserID,
//             FirstName: result.FirstName,
//             LastName: result.LastName,
//             CreatedAt: formattedCreatedAt,
//             UpdatedAt: formattedUpdatedAt,
//             Balance: result.Balance,
//             LastLogin: formattedLastLogin,
//             PasswordUpdatedAt: formattedPasswordUpdatedAt,
//             FirstName: result.FirstName,
//             IsEnabled: result.IsEnabled,
//             UserType: result.UserType,
//           });
//           setFirstName(result.FirstName);
//         } else {
//           console.error("Error fetching data:", response.status);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };


//   const deleteUser = () => {
//     deleteConform(apiData.ID, token)
//       .then((result) => {
//         // Handle success
//         console.log("Deleted:", result);
//         dispatch(setToken("")); // Dispatch your success action
//         navigation.navigate("Login");
//       })
//       .catch((error) => {
//         // Handle error
//         console.error("Error:", error);
//       });
//   };


// const buttonData = [
//   { id: 1, icon: "check-circle", text: "User Active", info: apiData.IsEnabled ? "Active" : "Inactive", },

//   { id: 2, icon: "edit", text: "Update name", info: `${apiData1.FirstName} ${apiData1.LastName}`,},
  
//   { id: 3, icon: "layers", set: { right: 6 }, text: "Regular",  info: "Use BNB to get discount",},

//   { id: 4, icon: "person", text: "ID", info: apiData.ID,},

//   { id: 5, icon: "account-circle", text: "Registration Info", info: apiData.FirstName,},

//   { id: 6, icon: "date-range", text: "CreatedAt", info: apiData.CreatedAt,},

//   { id: 7, icon: "update", text: "UpdatedAt", info: apiData.UpdatedAt,  },

//   { id: 8, icon: "account-balance", text: "Balance", info: (parseFloat(apiData.Balance) || 0).toFixed(2),},
    
//   { id: 9, icon: "login", text: "LastLogin", info: apiData.LastLogin,},
    
//   { id: 10, icon: "edit", text: "PasswordUpdatedAt", info: apiData.PasswordUpdatedAt,},
    
//   { id: 11, icon: "vpn-key", text: "Updated Password",},

//   { id: 12, icon: "delete", text: "Delete Account",},
// ];


//   const mappedButtons = buttonData.map((button, index) => (
//     <TouchableOpacity
//     key={index}
//     style={styles.button}
//     onPress={() => {
//       setSelectedItemId(button.id);
//       if (button.id === 12) {
//         setShowDeleteModal(true);
//       } else if (button.id === 11) {
//         setShowUpdatePasswordModal(true);
//       } else if (button.id === 2) {
//         setShowUpdateNameModal(true)
        
//       }
//     }}
//   >
//       <View style={styles.buttonContent}>
//         <View style={styles.rowContainer}>
//           <View style={styles.iconContainer}>
//             <MaterialIcons style={styles.icon} name={button.icon} size={30} />
//           </View>
//           <View style={styles.textContainer}>
//             <Text
//               style={[
//                 styles.text,
//               ]}
//             >
//               {button.text}
//             </Text>
//             {button.info && (
//               <View>
//                 <Text
//                   style={[
//                     styles.info,
//                     {
//                       color:
//                         button.styles?.infoColor || "rgba(28, 30, 50, 0.6)",
//                     },
//                   ]}
//                 >
//                   {touchedButtonIndex === index ? <Text></Text> : button.info}
//                 </Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   ));

//   return (
//     <ScrollView style={styles.scrollViewStyle}>
//       {mappedButtons}
//       <TouchableOpacity style={styles.logButton} onPress={handleLogout}>
//         <Text style={styles.logout}>LogOut</Text>
//       </TouchableOpacity>

//       <LogoutConfirmationModal
//         visible={isLogoutModalVisible}
//         onConfirm={handleConfirmLogout}
//         onCancel={handleCancelLogout}
//       />

//       <LogoutConfirmationModal
//         visible={isLogoutModalVisible}
//         onConfirm={handleConfirmLogout}
//         onCancel={handleCancelLogout}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         isVisible={showDeleteModal}
//         onRequestClose={() => setShowDeleteModal(false)}
//       >
//         <Card style={styles.cardContainer4}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.conform1}>
//                 Are you sure you want to delete this Account?
//               </Text>
//               <View style={styles.buttons}>
//                 <View style={styles.button1}>
//                   <Button
//                     onPress={() => deleteUser()}
//                     labelStyle={styles.buttonText}
//                   >
//                     Yes
//                   </Button>
//                 </View>
//                 <View style={styles.button2}>
//                   <Button
//                     onPress={() => setShowDeleteModal(false)}
//                     labelStyle={styles.buttonText1}
//                   >
//                     Cancel
//                   </Button>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Card>
//       </Modal>
//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         isVisible={showUpdateNameModal}
//         onRequestClose={() => setShowUpdateNameModal(false)}
//       >
//          <Card style={styles.cardContainer4}>
//          <Text style={styles.conform}>
//             Update Name
//         </Text>

//          <TextInput
//             variant="standard" 
//             placeholder="Firstname"
//            // label="Outlined"
//             value={firstname}
//             // onChangeText={(text) => {
//               onChangeText={(text) => setFirstname(text)}
//             style={{ top: 12, margin: 16, width: '87%', left: 5 }}
//           />

//           <TextInput
//             variant="standard" 
//             placeholder="Lastname"
//             value={lastname}
//             onChangeText={(text) => setLastname(text)}
//             style={{ top: 4, margin: 16, width: '87%', left: 5  }}
//           />
            
//              <View style={styles.buttons}>
//                 <View style={styles.button1}>
//                   <Button
//                     onPress={updateName}
//                     labelStyle={styles.buttonText}
//                   >
//                     Update
//                   </Button>
//               </View>
//               <View style={styles.button2}>
//                 <Button
//                     onPress={() => setShowUpdateNameModal(false)}
//                     labelStyle={styles.buttonText1}
//                 >
//                     Cancel
//                 </Button>
//               </View>
//             </View>
//           </Card>
//       </Modal> */}
//       <Changename isVisible={showUpdateNameModal} onClose={() => setShowUpdateNameModal(false)} setApiData1={setApiData1}/>
//       <Changepassword isVisible={showUpdatePasswordModal} onClose={() => setShowUpdatePasswordModal(false)} ID={apiData.ID}/>
//      </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     flex: 1,
//     width: "100%",
//   },
//   buttonList: {
//     flex: 1,
//     paddingTop: 10,
//     width: "100%",
//     backgroundColor: "#f5f5f5",
//   },
//   button: {
//     marginBottom: 4,
//     backgroundColor: "#f5f5f5",
//     width: "100%",
//   },
//   buttons: {
//     paddingTop: 17,
//     flexDirection: "row",
//     marginLeft: 10,
//     //justifyContent: 'space-between'
//   },
//   buttonText: {
//     paddingTop: 4,
//     paddingRight: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     left: 8,
//   },
//   conform: {
//     textAlign: "center",
//     fontWeight: '900',
//     fontSize: 18,
//     top: 15,
//     //paddingBottom: 10
//   },

//   conform1: {
//     paddingBottom: 20,
//     textAlign: "center",
//     fontWeight: '600',
//     fontSize: 16,
//     top: 15,
//     //paddingBottom: 10
//   },

//   button1: {
//     paddingLeft: 5,
//     width: "47%",
//     height: 47,
//     backgroundColor: "#C1C2EB",
//     borderRadius: 50,
//   },
//   button2: {
//     left: 10,
//     width: "47%",
//     height: 47,
//     backgroundColor: "#B7DDD2",
//     borderRadius: 50,
//   },
//   buttonText1: {
//     fontWeight: "bold",
//     paddingTop: 4,
//     alignItems: "center",
//     color: "white",
//     fontSize: 16,
//     Left: 15,
//   },
//   buttonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#E3E9F0",
//     borderRadius: 10,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     padding: 12,
//   },
//   cardContainer4: {
//     //flex: 1,
//     //marginRight: 10,
//     backgroundColor: "white",
//     width: "95%",
//     marginHorizontal: 10,
//     paddingVertical: 9,
//   },
//   rowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginLeft: 4,
//     color: "rgba(28, 30, 50, 0.6)",
//   },
//   icon1: {
//     marginLeft: 5,
//     color: "rgba(28, 30, 50, 0.6)",
//   },
//   textContainer: {
//     marginLeft: 18,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "700",
//     lineHeight: 19.09,
//     color: "rgba(28, 30, 50, 1)",
//   },
//   info: {
//     fontSize: 16,
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   logButton: {
//     marginTop: 10,
//     backgroundColor: "#C1C2EB",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   logout: {
//     color: "#1C1E32",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default ProfileInfo;











































// const updatepassword = async () => {
//   //const token = 'your_token_here'; // Replace with your actual token
//   if(newPassword === confirmPassword){
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         user_id: apiData.ID, // Replace with the actual firstname
//         current_password: currentPassword, // Replace with the actual lastname
//         new_password: newPassword, // Replace with the actual currency
//         //new_password: newPassword,
//       }),
//     };

//     console.log("------------------>",apiData.ID,currentPassword,newPassword)
//     try {
//       const response = await fetch(
//         'http://35.154.235.224:8000/update-password', // Replace with your actual API endpoint
//         requestOptions
//       );

//       const result = await response.text();
//      // setUpdateResult(result);
//       hideupdatepassword();
//       hideupdatename();
//       setPassword();
//       //fetchData();
//       Toast.show({
//         type: "success",
//         text1: `Password Changed Succesfull`,
//       });
//       setEmail('');
//       setcurrentPassword('');
//       setConfirmPassword('')
//       setnewPassword('')
//      // setnewPassword('');

//     } catch (error) {
//       console.error('Error:', error);
//       Toast.show({
//         type: "error",
//         text1: `Failed Updating Password`,
//       });
//       setcurrentPassword('');
//       setConfirmPassword('')
//       setnewPassword('')
//     }
//   }
//   else{
//     console.error("Password Not Match")
//     // Toast New password and confirm password should me same
//     Toast.show({
//       type: "error",
//       text1: `New password and confirm password should me same`,
//     });
//     setcurrentPassword('');
//     setConfirmPassword('')
//     setnewPassword('')
//   }
//  };







 {/* <Modal
        animationType="slide"
        transparent={true}
        isVisible={showUpdatePasswordModal}
        onRequestClose={() => setShowUpdateNameModal(false)}
      >
         <Card style={styles.cardContainer4}>
         <Text style={styles.conform}>
            Update Password
        </Text>

         <TextInput
         secureTextEntry={true}
            variant="standard" 
            placeholder="Current Passward"
           // label="Outlined"
            value={password}
            // onChangeText={(text) => {
              onChangeText={(text) => setPassword(text)}
            style={{ top: 12, margin: 16, width: '87%', left: 5 }}
          />

          <TextInput
          secureTextEntry={true}
            variant="standard" 
            placeholder="New Password"
            value={newPassword}
            onChangeText={(text) => setnewPassword(text)}
            style={{ top: 4, margin: 16, width: '87%', left: 5  }}
          />

          
         <TextInput
            secureTextEntry={true}
            variant="standard" 
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={{ top: 4, margin: 16, width: '87%', left: 5  }}
          />
            
             <View style={styles.buttons}>
                <View style={styles.button1}>
                  <Button
                    onPress={updatepassword}
                    labelStyle={styles.buttonText}
                  >
                    Update 
                  </Button>
              </View>
              <View style={styles.button2}>
                <Button
                    onPress={() => setShowUpdatePasswordModal(false)}
                    labelStyle={styles.buttonText1}
                >
                    Cancel
                </Button>
              </View>
            </View>
          </Card>
      </Modal> */}


// const buttonData = [
//   { id: 1, icon: "check-circle", text: "User Active", info: apiData.IsEnabled ? "Active" : "Inactive", styles: { paddingLeft: 2 },},

//   { id: 2, icon: "edit", text: "Update name", info: `${apiData.FirstName} ${apiData.LastName}`, styles: { paddingLeft: 2 }, },
  
//   { id: 3, icon1: "diamond", set: { right: 5 }, text: "Regular",  info: "Use BNB to get discount",},

//   { id: 4, icon1: "user", text: "ID", styles: { paddingLeft: 12 }, info: apiData.ID,},

//   { id: 5, icon: "account-circle", text: "Registration Info", info: apiData.FirstName, styles: { paddingLeft: 2 },},

//   { id: 6, icon1: "calendar", text: "CreatedAt", set: { right: 4 }, info: apiData.CreatedAt, styles: { paddingLeft: 4 },},

//   { id: 7, icon: "update", text: "UpdatedAt", info: apiData.UpdatedAt,  styles: { paddingLeft: 2 }, },

//   { id: 8, icon: "account-balance", text: "Balance", info: (parseFloat(apiData.Balance) || 0).toFixed(2), styles: { paddingLeft: 2 }, },
    
//   { id: 9, icon: "login", text: "LastLogin", info: apiData.LastLogin, styles: { paddingLeft: 1 }, },
    
//   { id: 10, icon: "edit", text: "PasswordUpdatedAt", info: apiData.PasswordUpdatedAt,  },
    
//   { id: 11, icon: "vpn-key", text: "Updated Password",},

//   { id: 12, icon: "delete", text: "Delete Account",},
// ];











// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import Icon from "react-native-vector-icons/FontAwesome";
// import LogoutConfirmationModal from "./LogoutConfirmationModal";
// import Modal from "react-native-modal";
// import AssetDataContext from "./AssetDataContext";
// //import { useNavigation } from '@react-navigation/native';
// import { Card, Title, Paragraph, Button, Provider } from "react-native-paper";
// import { deleteConform } from "../api/profileApi";
// import { useDispatch } from "react-redux";
// import { setToken } from "../redux/actions/authActions";
// const ProfileInfo = () => {
//   const { setFirstName } = useContext(AssetDataContext);
//   const [apiData, setApiData] = useState({
//     ID: "",
//     FirstName: "",
//     LastName: "",
//     CreatedAt: "",
//     UpdatedAt: "",
//     Balance: "",
//     LastLogin: "",
//     PasswordUpdatedAt: "",
//     FirstName: "",
//     LastName: "",
//     DeletedAt: "",
//   });
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [touchedButtonIndex, setTouchedButtonIndex] = useState(null);
//   const [isLogoutModalVisible, setLogoutModalVisibility] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [error, setError] = useState("");
//   const [apidata, setApidata] = useState({
//     // ... initialize your apiData structure
//   });

//   const { token } = useSelector((state) => state.auth);
//   //const navigation = useNavigation();

//   const handleLogout = () => {
//     setLogoutModalVisibility(true);
//   };

//   const handleConfirmLogout = () => {
//     console.log("Logging out...");
//     setLogoutModalVisibility(false);
//     navigation.navigate("Login");
//   };

//   const handleCancelLogout = () => {
//     setLogoutModalVisibility(false);
//   };

  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://35.154.235.224:9000/api/user/profile",
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             redirect: "follow",
//           }
//         );

//         if (response.ok) {
//           const result = await response.json();
//           setApiData({
//             ID: result.UserID,
//             FirstName: result.FirstName,
//             LastName: result.LastName,
//             CreatedAt: result.CreatedAt,
//             UpdatedAt: result.UpdatedAt,
//             Balance: result.Balance,
//             LastLogin: result.LastLogin,
//             PasswordUpdatedAt: result.PasswordUpdatedAt,
//             FirstName: result.FirstName,
//             IsEnabled: result.IsEnabled,
//             UserType: result.UserType,
//           });
//           setFirstName(result.FirstName);
//         } else {
//           console.error("Error fetching data:", response.status);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, [token, setFirstName]);

//   const deleteUser = () => {
//     deleteConform(apiData.ID, token)
//       .then((result) => {
//         // Handle success
//         console.log("Deleted:", result);
//         dispatch(setToken("")); // Dispatch your success action
//         navigation.navigate("Login");
//       })
//       .catch((error) => {
//         // Handle error
//         console.error("Error:", error);
//       });
//   };

//   const buttonData = [
//     {
//       id: 1,
//       icon: "check-circle",
//       text: "User Active",
//       info: apiData.IsEnabled ? "Active" : "Inactive",
//       styles: { paddingLeft: 2 },
//     },
//     //{id: 2, icon1: "user", text: "FirstName", info: apiData.FirstName , styles:{ paddingLeft: 12,}},
//     //{id: 3, icon1: "user", text: "LastName", info: apiData.LastName  , styles:{ paddingLeft: 14,}},
//     {
//       id: 2,
//       icon1: "diamond",
//       text: "Regular",
//       info: "Use BNB to get discount",
//       icon2: "chevron-right",
//       styles: { paddingLeft: 2 },
//     },
//     {
//       id: 3,
//       icon1: "user",
//       text: "ID",
//       info: apiData.ID,
//       styles: { paddingLeft: 13 },
//     },
//     {
//       id: 4,
//       icon: "account-circle",
//       text: "Registration Info",
//       info: apiData.FirstName,
//       styles: { paddingLeft: 0 },
//     },
//     {
//       id: 5,
//       icon1: "calendar",
//       text: "CreatedAt",
//       info: apiData.CreatedAt,
//       styles: { paddingLeft: 6 },
//     },
//     {
//       id: 6,
//       icon: "update",
//       text: "UpdatedAt",
//       info: apiData.UpdatedAt,
//       styles: { paddingLeft: 0 },
//     },
//     // { icon: "account-balance", text: "Balance", info: (apiData.Balance || 0).toString() },
//     {
//       id: 7,
//       icon: "account-balance",
//       text: "Balance",
//       info: (parseFloat(apiData.Balance) || 0).toFixed(2),
//       styles: { paddingLeft: 0 },
//     },
//     {
//       id: 8,
//       icon: "login",
//       text: "LastLogin",
//       info: apiData.LastLogin,
//       styles: { paddingLeft: 1 },
//     },
//     {
//       id: 9,
//       icon: "edit",
//       text: "PasswordUpdatedAt",
//       info: apiData.PasswordUpdatedAt,
//       styles: { paddingLeft: 0 },
//     },
//     { id: 10, icon: "delete", text: "Delete", styles: { paddingLeft: 0 } },
//   ];

//   const mappedButtons = buttonData.map((button, index) => (
//     <TouchableOpacity
//       key={index.id}
//       style={styles.button}
//       onPress={() => {
//         setSelectedItemId(button.id);
//         if (button.id === 10) {
//           setShowDeleteModal(true);
//         }
//       }}
//     >
//       <View style={styles.buttonContent}>
//         <View style={styles.rowContainer}>
//           <View style={styles.iconContainer}>
//             <MaterialIcons style={styles.icon} name={button.icon} size={30} />
//             <Icon style={styles.icon1} name={button.icon1} size={30} />
//           </View>
//           <View style={styles.textContainer}>
//             <Text
//               style={[
//                 styles.text,
//                 { paddingLeft: button.styles?.paddingLeft || 0 },
//               ]}
//             >
//               {button.text}
//             </Text>
//             {button.info && (
//               <View>
//                 <Text
//                   style={[
//                     styles.info,
//                     {
//                       color:
//                         button.styles?.infoColor || "rgba(28, 30, 50, 0.6)",
//                     },
//                     { paddingLeft: button.styles?.paddingLeft || 0 },
//                   ]}
//                 >
//                   {touchedButtonIndex === index ? <Text></Text> : button.info}
//                 </Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   ));

//   return (
//     <ScrollView style={styles.scrollViewStyle}>
//       {mappedButtons}
//       <TouchableOpacity style={styles.logButton} onPress={handleLogout}>
//         <Text style={styles.logout}>LogOut</Text>
//       </TouchableOpacity>

//       <LogoutConfirmationModal
//         visible={isLogoutModalVisible}
//         onConfirm={handleConfirmLogout}
//         onCancel={handleCancelLogout}
//       />
//       <LogoutConfirmationModal
//         visible={isLogoutModalVisible}
//         onConfirm={handleConfirmLogout}
//         onCancel={handleCancelLogout}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         isVisible={showDeleteModal}
//         onRequestClose={() => setShowDeleteModal(false)}
//       >
//         <Card style={styles.cardContainer4}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.conform}>
//                 Are you sure you want to delete this item?
//               </Text>
//               <View style={styles.buttons}>
//                 <View style={styles.button1}>
//                   <Button
//                     onPress={() => deleteUser()}
//                     labelStyle={styles.buttonText}
//                   >
//                     Yes
//                   </Button>
//                 </View>
//                 <View style={styles.button2}>
//                   <Button
//                     onPress={() => setShowDeleteModal(false)}
//                     labelStyle={styles.buttonText1}
//                   >
//                     Cancel
//                   </Button>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Card>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     flex: 1,
//     width: "100%",
//   },
//   buttonList: {
//     flex: 1,
//     paddingTop: 10,
//     width: "100%",
//     backgroundColor: "#f5f5f5",
//   },
//   button: {
//     marginBottom: 4,
//     backgroundColor: "#f5f5f5",
//     width: "100%",
//   },
//   buttons: {
//     paddingTop: 17,
//     flexDirection: "row",
//     marginLeft: 10,
//     //justifyContent: 'space-between'
//   },
//   buttonText: {
//     paddingTop: 4,
//     paddingRight: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     left: 8,
//   },
//   conform: {
//     textAlign: "center",
//   },

//   button1: {
//     paddingLeft: 5,
//     width: "47%",
//     height: 47,
//     backgroundColor: "#EAC9B1",
//     borderRadius: 50,
//   },
//   button2: {
//     left: 10,
//     width: "47%",
//     height: 47,
//     backgroundColor: "#b1a4ff",
//     borderRadius: 50,
//   },
//   buttonText1: {
//     fontWeight: "bold",
//     paddingTop: 4,
//     alignItems: "center",
//     color: "white",
//     fontSize: 16,
//     Left: 15,
//   },
//   buttonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#E3E9F0",
//     borderRadius: 10,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     padding: 12,
//   },
//   cardContainer4: {
//     //marginRight: 10,
//     backgroundColor: "white",
//     width: "90%",
//     marginHorizontal: 15,
//     paddingVertical: 9,
//   },
//   rowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginLeft: 4,
//     color: "rgba(28, 30, 50, 0.6)",
//   },
//   icon1: {
//     marginLeft: 5,
//     color: "rgba(28, 30, 50, 0.6)",
//   },
//   textContainer: {
//     marginLeft: 16,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "700",
//     lineHeight: 19.09,
//     color: "rgba(28, 30, 50, 1)",
//   },
//   info: {
//     fontSize: 16,
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   logButton: {
//     marginTop: 10,
//     backgroundColor: "#C1C2EB",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   logout: {
//     color: "#1C1E32",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default ProfileInfo;