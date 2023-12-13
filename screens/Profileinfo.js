import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoutConfirmationModal from './LogoutConfirmationModal';

import AssetDataContext from './AssetDataContext';

const ProfileInfo = () => {
  const { setFirstName } = useContext(AssetDataContext);
  const [apiData, setApiData] = useState({
    ID: '',
    FirstName: '',
    LastName: '',
    CreatedAt: '',
    UpdatedAt: '',
    Balance: '',
    LastLogin: '',
    PasswordUpdatedAt: '',
    FirstName: '',
    LastName: '',
    DeletedAt: '',
  });
  const [touchedButtonIndex, setTouchedButtonIndex] = useState(null);
  const [isLogoutModalVisible, setLogoutModalVisibility] = useState(false);


  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleLogout = () => {
    setLogoutModalVisibility(true);
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    setLogoutModalVisibility(false);
    navigation.navigate('Login');
  };

  const handleCancelLogout = () => {
    setLogoutModalVisibility(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://35.154.235.224:9000/api/user/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: 'follow',
        });

        if (response.ok) {
          const result = await response.json();
          setApiData({
            ID: result.UserID,
            FirstName: result.FirstName,
            LastName: result.LastName,
            CreatedAt: result.CreatedAt,
            UpdatedAt: result.UpdatedAt,
            Balance: result.Balance,
            LastLogin: result.LastLogin,
            PasswordUpdatedAt: result.PasswordUpdatedAt,
            FirstName: result.FirstName,
            IsEnabled: result.IsEnabled,
            UserType: result.UserType,

          });
          setFirstName(result.FirstName);

        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [token, setFirstName]);

  const buttonData = [
    { icon: "check-circle", text: "User Active", info: apiData.IsEnabled ? "Active" : "Inactive" , styles:{ paddingLeft: 2,}},
    { icon1: "user", text: "FirstName", info: apiData.FirstName , styles:{ paddingLeft: 12,}},
    { icon1: "user", text: "LastName", info: apiData.LastName  , styles:{ paddingLeft: 14,}},
    { icon1: "diamond", text: "Regular", info: "Use BNB to get discount", icon2: "chevron-right" , styles:{ paddingLeft: 2,}},
    { icon1: "user", text: "ID", info: apiData.ID , styles:{ paddingLeft: 13,}},
    { icon: "account-circle", text: "Registration Info", info: apiData.FirstName, styles:{ paddingLeft: 0,} },
    { icon1: "calendar", text: "CreatedAt", info: apiData.CreatedAt, styles:{ paddingLeft: 6,} },
    { icon: "update", text: "UpdatedAt", info: apiData.UpdatedAt , styles:{ paddingLeft: 0,} },
    // { icon: "account-balance", text: "Balance", info: (apiData.Balance || 0).toString() },
    { icon: "account-balance", text: "Balance", info: (parseFloat(apiData.Balance) || 0).toFixed(2), styles:{ paddingLeft: 0,} },
    { icon: "login", text: "LastLogin", info: apiData.LastLogin , styles:{ paddingLeft: 1,} },
    { icon: "edit", text: "PasswordUpdatedAt", info: apiData.PasswordUpdatedAt , styles:{ paddingLeft: 0,}},
  ];

  const mappedButtons = buttonData.map((button, index) => (
    <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
      <View style={styles.buttonContent}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons style={styles.icon} name={button.icon} size={30} />
            <Icon style={styles.icon1} name={button.icon1} size={30}  />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { paddingLeft: button.styles?.paddingLeft || 0 }]}>{button.text}</Text>
            {button.info && (
              <View>
                <Text style={[styles.info, { color: button.styles?.infoColor || 'rgba(28, 30, 50, 0.6)' } , { paddingLeft: button.styles?.paddingLeft || 0 }]}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    width: '100%',
  },
  buttonList: {
    flex: 1,
    paddingTop: 10,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginBottom: 4,
    backgroundColor: '#f5f5f5',
    width: '100%',

  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E9F0',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 12,
  },
  rowContainer: {
     flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 4,
    color: 'rgba(28, 30, 50, 0.6)',

  },
  icon1: {
    marginLeft: 5,
    color: 'rgba(28, 30, 50, 0.6)',

  },
  textContainer: {
    marginLeft: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 19.09,
    color: 'rgba(28, 30, 50, 1)',
  },
  info: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '700',
  },

  logButton: {
    marginTop: 10,
    backgroundColor: '#C1C2EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logout: {

    color: '#1C1E32',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileInfo;






