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

  { id: 6, icon: "date-range", text: "Created At", info: apiData.CreatedAt,},

  { id: 7, icon: "update", text: "Updated At", info: apiData.UpdatedAt,  },

  { id: 8, icon: "account-balance", text: "Balance", info: (parseFloat(apiData.Balance) || 0).toFixed(2),},
    
  { id: 9, icon: "login", text: "Last Login", info: apiData.LastLogin,},
    
  { id: 10, icon: "edit", text: "Password Updated At", info: apiData.PasswordUpdatedAt,},
    
  { id: 11, icon: "vpn-key", text: "Update Password",},

  { id: 12, icon: "delete", text: "Delete Account",},

  { id: 13, icon: "", text: "Support",},
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
    justifyContent: 'center',
    paddingTop: 17,
    flexDirection: "row",
    //marginLeft: 10,
  },
  buttonText: {
    paddingTop: 4,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    left: 5,
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
    //width: "47%",
    height: 47,
    backgroundColor: "#C1C2EB",
    borderRadius: 5,
  },
  button2: {
    left: 10,
   // width: "47%",
    height: 47,
    backgroundColor: "#B7DDD2",
    borderRadius: 5,
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
    color: "#9093e8",
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