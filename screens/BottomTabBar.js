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
      shifting={true}
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













// import React, { useContext } from 'react';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { View, Text, TouchableOpacity } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import Dashboard02 from "../screens/Dashboard02";
// import { CardStyleInterpolators } from "@react-navigation/stack";
// import UserDetails from "../screens/UserDetails";
// import Settings from "../screens/Settings";
// import SeeAllItems from '../screens/SeeAllItems';
// import AssetDataContext from "../screens/AssetDataContext";
// import { TAB_ICONS } from '../screens/TabIcons';

// const Tab = createBottomTabNavigator();

// const CustomTabBarButton = ({ children, onPress, navigation, route }) => {
//   const isFocused = navigation.isFocused();

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         flex: 1,
//         backgroundColor: isFocused ? '#C1C2EB' : 'transparent',
//         borderRadius: 30,
//         margin: 5,
//       }}>
//       {children}
//     </TouchableOpacity>
//   );
// };

// const BottomTabBar = ({ isLoggedIn, onSuccessfulLogin }) => {
//   const { assetData } = useContext(AssetDataContext);

//   return (
//     <Tab.Navigator
//       screenOptions={({ route, navigation }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName = TAB_ICONS[route.name];
//           return (
//             <View style={{ alignItems: 'center' }}>
//               <FontAwesome name={iconName} size={20} color={color} />
//             </View>
//           );
//         },
//         tabBarLabel: ({ focused, color }) => (
//           <Text style={{ color, fontSize: 12, textAlign: 'center', marginBottom: 5 }}>
//             {route.name}
//           </Text>
//         ),
//         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         tabBarActiveTintColor: 'black',
//         tabBarInactiveTintColor: '#B0BEC5',
//         tabBarStyle: {
//           height: 60,
//           shadowOpacity: 0.15,
//           shadowRadius: 30,
//           shadowColor: '#000000',
//           elevation: 5,
//           backgroundColor: '#FFFFFF',
//         },
//         headerShown: false,
//         tabBarButton: (props) => (
//           <CustomTabBarButton {...props} navigation={navigation} route={route} />
//         ),
//       })}
//     >
//       <Tab.Screen name="Portfolio">
//         {(props) => {
//           if (isLoggedIn) {
//             return <Dashboard02 {...props} />;
//           } else {
//             return <Text>Please log in first!</Text>;
//           }
//         }}
//       </Tab.Screen>

//       <Tab.Screen name="WatchList" component={SeeAllItems} />
//       <Tab.Screen name="Profile" component={UserDetails} />
//       <Tab.Screen name="Setting" component={Settings} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabBar;

































// // BottomTabBar.js
// import React, { useContext } from 'react';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Dashboard02 from "../screens/Dashboard02";
// import { CardStyleInterpolators } from "@react-navigation/stack";
// import UserDetails from "../screens/UserDetails";
// import Settings from "../screens/Settings";
// import SeeAllItems from '../screens/SeeAllItems';
// import AssetDataContext from "../screens/AssetDataContext";
// import { TAB_ICONS } from '../screens/TabIcons'; // Import the tab icons
// const Tab = createBottomTabNavigator();

// const BottomTabBar = ({ isLoggedIn, onSuccessfulLogin }) => {
//   const { assetData } = useContext(AssetDataContext);
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName = TAB_ICONS[route.name];
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         tabBarActiveTintColor: '#A936F1',
//         tabBarInactiveTintColor: '#1C1E32',
//         tabBarStyle: {
//           backgroundColor: '#ECECEC',

//           marginBottom: 20,
//         },
//         headerShown: false,
//       })}
//     >

//       <Tab.Screen name="Portfolio">
//         {(props) => {
//           if (isLoggedIn) {
//             return <Dashboard02 {...props} />;
//           } else {
//             return <Text>Please log in first!</Text>;
//           }
//         }}
//       </Tab.Screen>

//       <Tab.Screen name="WatchList" component={SeeAllItems} />
//       <Tab.Screen name="Profile" component={UserDetails} />
//       {/* <Tab.Screen
//         name="Profile"
//         component={UserDetails}
//         listeners={({ navigation, route }) => ({
//           tabPress: e => {
//             // Prevent default action
//             e.preventDefault();

//             // Navigate with a parameter
//             navigation.navigate('UserDetails', { fromBottomTab: true });
//           },
//         })}
//       /> */}
//       <Tab.Screen name="Setting" component={Settings} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabBar;