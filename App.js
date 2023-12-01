import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { AssetDataProvider } from './screens/AssetDataContext';
import BottomTabBar from './screens/BottomTabBar';
import LoginForm from './screens/LoginForm';
import SignupForm from './screens/SignupForm';
import ListItemDeatails from './screens/ListItemDeatails';
import NotificationPage from './screens/NotificationPage';
import UserDetails from './screens/UserDetails';
import ViewPortfolio from './screens/ViewPortfolio';
// import AssetListDetails from './screens/AssetListDetails';
import Allgraphs from "./screens/Allgraphs";

import MyWatchList from './screens/MyWatchList';
import CryptoAssets from './screens/CriptoAssets';
import SeeAllItems from './screens/SeeAllItems';
import SearchBarList from './screens/SearchBarList';
import store from './redux/store';
// import TradingCalendar from './screens/TradingCalender';

import Buy from "./screens/Buy";

// import Toast from 'react-native-toast-message'; // Import Toast Library
import Toast, { BaseToast } from 'react-native-toast-message'; // Updated import

const Stack = createNativeStackNavigator();

function MainStack({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'BottomTabs' : 'Login'} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Login'
        children={(props) => <LoginForm {...props} onSuccessfulLogin={() => setIsLoggedIn(true)} />}
      />
      <Stack.Screen name='Signup' component={SignupForm} />
      <Stack.Screen name='BottomTabs' children={(props) => <BottomTabBar {...props} isLoggedIn={isLoggedIn} />} />
      <Stack.Screen name='ListItemDeatails' component={ListItemDeatails} />
      <Stack.Screen name='UserDetails' component={UserDetails} />
      <Stack.Screen name='ViewPortfolio' component={ViewPortfolio} />
      {/* <Stack.Screen name='AssetListDetails' component={AssetListDetails} /> */}
      <Stack.Screen name='NotificationPage' component={NotificationPage} />
      <Stack.Screen name='MyWatchList' component={MyWatchList} />
      <Stack.Screen name='CryptoAssets' component={CryptoAssets} />
      <Stack.Screen name='SeeAllItems' component={SeeAllItems} />
      <Stack.Screen name='SearchBarList' component={SearchBarList} />

      <Stack.Screen name="Allgraphs" component={Allgraphs} />
      {/* <Stack.Screen name="TradingCalendar" component={TradingCalendar} /> */}
      <Stack.Screen name="Buy" component={Buy} />

    </Stack.Navigator>
  );
}
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', backgroundColor: '#B7DDD2' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red', backgroundColor: '#B7DDD2' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
      }}
    />
  ),
  // You can add other types if needed
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <AssetDataProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <MainStack isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaView>
      </AssetDataProvider>
      <Toast config={toastConfig} />
    </Provider>
  );
}

export default App;











// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider } from 'react-redux';

// import { AssetDataProvider } from './screens/AssetDataContext';
// import BottomTabBar from './screens/BottomTabBar';
// import LoginForm from './screens/LoginForm';
// import SignupForm from './screens/SignupForm';
// import ListItemDeatails from './screens/ListItemDeatails';
// import NotificationPage from './screens/NotificationPage';
// import UserDetails from './screens/UserDetails';
// import ViewPortfolio from './screens/ViewPortfolio';
// // import AssetListDetails from './screens/AssetListDetails';
// import Allgraphs from "./screens/Allgraphs";

// import MyWatchList from './screens/MyWatchList';
// import CryptoAssets from './screens/CriptoAssets';
// import SeeAllItems from './screens/SeeAllItems';
// import SearchBarList from './screens/SearchBarList';
// import store from './redux/store';

// import Buy from "./screens/Buy";

// const Stack = createNativeStackNavigator();

// function MainStack({ isLoggedIn, setIsLoggedIn }) {
//   return (
//     <Stack.Navigator initialRouteName={isLoggedIn ? 'BottomTabs' : 'Login'} screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name='Login'
//         children={(props) => <LoginForm {...props} onSuccessfulLogin={() => setIsLoggedIn(true)} />}
//       />
//       <Stack.Screen name='Signup' component={SignupForm} />
//       <Stack.Screen name='BottomTabs' children={(props) => <BottomTabBar {...props} isLoggedIn={isLoggedIn} />} />
//       <Stack.Screen name='ListItemDeatails' component={ListItemDeatails} />
//       <Stack.Screen name='UserDetails' component={UserDetails} />
//       <Stack.Screen name='ViewPortfolio' component={ViewPortfolio} />
//       {/* <Stack.Screen name='AssetListDetails' component={AssetListDetails} /> */}
//       <Stack.Screen name='NotificationPage' component={NotificationPage} />
//       <Stack.Screen name='MyWatchList' component={MyWatchList} />
//       <Stack.Screen name='CryptoAssets' component={CryptoAssets} />
//       <Stack.Screen name='SeeAllItems' component={SeeAllItems} />
//       <Stack.Screen name='SearchBarList' component={SearchBarList} />

//       <Stack.Screen name="Allgraphs" component={Allgraphs} />

//       <Stack.Screen name="Buy" component={Buy} />
      
//     </Stack.Navigator>
//   );
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Provider store={store}>
//       <AssetDataProvider>
//         <SafeAreaView style={{ flex: 1 }}>
//           <GestureHandlerRootView style={{ flex: 1 }}>
//             <NavigationContainer>
//               <MainStack isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//             </NavigationContainer>
            
//           </GestureHandlerRootView>
//         </SafeAreaView>
//       </AssetDataProvider>
//     </Provider>
//   );
// }

// export default App;


