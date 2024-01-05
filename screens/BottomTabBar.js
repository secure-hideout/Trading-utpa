import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import Dashboard02 from "../screens/Dashboard02";
import UserDetails from "../screens/UserDetails";
import Settings from "../screens/Settings";
import SeeAllItems from '../screens/SeeAllItems';
import AssetDataContext from "../screens/AssetDataContext";
import { TAB_ICONS } from '../screens/TabIcons';

const Tab = createMaterialBottomTabNavigator();

const BottomTabBar = ({ isLoggedIn, onSuccessfulLogin }) => {
  const { assetData } = useContext(AssetDataContext);
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      // shifting={true}
      sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: colors.background }}
    >
      <Tab.Screen
        name="Portfolio"
        component={Dashboard02}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name={TAB_ICONS['Portfolio']} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={SeeAllItems}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name={TAB_ICONS['WatchList']} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserDetails}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name={TAB_ICONS['Profile']} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name={TAB_ICONS['Setting']} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;