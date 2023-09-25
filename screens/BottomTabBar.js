import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import { AntDesign } from '@expo/vector-icons'; 


import LoginForm from "../screens/LoginForm";
import Dashboard02 from "../screens/Dashboard02";
//import List from "../screens/List";
//import SeeAllItems from '../screens/SeeAllItems';
//import ListItemDeatails from "./screens/ListItemDeatails";
import SearchBarList from "../screens/SearchBarList";
import { CardStyleInterpolators } from "@react-navigation/stack";
import ViewPortfolio from "./ViewPortfolio";
import UserDetails from "../screens/UserDetails";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const iconMap = {
  // Login: 'ios-log-in',
  WatchList: 'ios-list',
  Home: 'ios-home',
  Profile:'ios-person',
  Portfolio:'ios-briefcase',
  Setting: 'ios-settings',
   //SeeAllItems: 'ios-list',
  //SearchBarList: 'ios-search',
 

  
};

const BottomTabBar = ({ isLoggedIn, onSuccessfulLogin }) => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = iconMap[route.name];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // This provides the animation
        tabBarActiveTintColor: '#A936F1',
        tabBarInactiveTintColor: '#1C1E32',
        tabBarStyle: {
          backgroundColor: '#ECECEC', // Your preferred background color
        },
        headerShown: false,
      })}
    >
      {/* <Tab.Screen name="Login">
        {(props) => <LoginForm {...props} onSuccessfulLogin={onSuccessfulLogin} />}
      </Tab.Screen> */}

      <Tab.Screen name="Home">
        {(props) => {
          if (isLoggedIn) {
            return <Dashboard02 {...props} />;
          } else {
            return <Text>Please log in first!</Text>;
          }
        }}
      </Tab.Screen>

      <Tab.Screen name="WatchList" component={SearchBarList} />
     
      <Tab.Screen name="Portfolio" component={ViewPortfolio} />
      <Tab.Screen name="Profile" component={UserDetails} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;

























