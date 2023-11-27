// BottomTabBar.js
import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dashboard02 from "../screens/Dashboard02";
import { CardStyleInterpolators } from "@react-navigation/stack";
import UserDetails from "../screens/UserDetails";
import Settings from "../screens/Settings";
import SeeAllItems from '../screens/SeeAllItems';
import AssetDataContext from "../screens/AssetDataContext";
import { TAB_ICONS } from '../screens/TabIcons'; // Import the tab icons
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const BottomTabBar = ({ isLoggedIn, onSuccessfulLogin }) => {
  const { assetData } = useContext(AssetDataContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = TAB_ICONS[route.name];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        tabBarActiveTintColor: '#A936F1',
        tabBarInactiveTintColor: '#1C1E32',
        tabBarStyle: {
          backgroundColor: '#ECECEC',

          marginBottom: 20,
        },
        headerShown: false,
      })}
    >

      <Tab.Screen name="Portfolio">
        {(props) => {
          if (isLoggedIn) {
            return <Dashboard02 {...props} />;
          } else {
            return <Text>Please log in first!</Text>;
          }
        }}
      </Tab.Screen>

      <Tab.Screen name="WatchList" component={SeeAllItems} />
      {/* <Tab.Screen name="Profile" component={UserDetails} /> */}
      <Tab.Screen
        name="Profile"
        component={UserDetails}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Navigate with a parameter
            navigation.navigate('UserDetails', { fromBottomTab: true });
          },
        })}
      />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;