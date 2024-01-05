// import React, { useState, useEffect } from 'react';
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
// import Allgraphs from "./screens/Allgraphs";
// import MyWatchList from './screens/MyWatchList';
// import CryptoAssets from './screens/CriptoAssets';
// import SeeAllItems from './screens/SeeAllItems';
// import SearchBarList from './screens/SearchBarList';
// import store from './redux/store';
// import Toast, { BaseToast } from 'react-native-toast-message';
// // import { WebSocket } from 'react-native-websocket';


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
//       <Stack.Screen name='NotificationPage' component={NotificationPage} />
//       <Stack.Screen name='MyWatchList' component={MyWatchList} />
//       <Stack.Screen name='CryptoAssets' component={CryptoAssets} />
//       <Stack.Screen name='SeeAllItems' component={SeeAllItems} />
//       <Stack.Screen name='SearchBarList' component={SearchBarList} />
//       <Stack.Screen name="Allgraphs" component={Allgraphs} />
//     </Stack.Navigator>
//   );
// }

// const toastConfig = {
//   success: (props) => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: 'green', backgroundColor: '#FFFFF' }}
//       contentContainerStyle={{ paddingHorizontal: 15 }}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: 'green',
//       }}
//       text2Style={{
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: 'black',
//       }}
//     />
//   ),
  
//   error: (props) => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: 'red', backgroundColor: '#FFFFFF' }}
//       contentContainerStyle={{ paddingHorizontal: 15 }}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: 'red',
//       }}
//       text2Style={{
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: 'black',
//       }}
//     />
//   ),
//   // You can add other types if needed
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [lastMessage, setLastMessage] = useState(null);

//   useEffect(() => {
//     const newSocket = new WebSocket('ws://35.154.235.224:8767/realtime_data');

//     newSocket.onopen = () => {
//       console.log('WebSocket connection established.');
//       setSocket(newSocket); // Set the WebSocket instance to the socket state
//     };

//     newSocket.onmessage = (event) => {
//       console.log('Received message:', event.data);
//       setLastMessage(event.data);
//       Toast.show({
//         type: 'success',
//         text1: 'Message Received',
//         text2: event.data,
//       });
//     };

//     newSocket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     newSocket.onclose = (event) => {
//       console.log('WebSocket connection closed:', event.code, event.reason);
//       Toast.show({
//         type: 'error',
//         text1: 'WebSocket Disconnected',
//         text2: `Code: ${event.code}, Reason: ${event.reason}`,
//       });
//     };

//     return () => {
//       if (newSocket) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       console.log('Socket is now open, sending message.');
//       sendMessage(['INFY']);
//     }
//   }, [socket]); // This useEffect runs when the socket state changes

//   const sendMessage = (message) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       console.log(`Sending message: ${message}`);
//       socket.send(JSON.stringify(message));
//       Toast.show({
//         type: 'success',
//         text1: 'Message Sent',
//         text2: message,
//       });
//     } else {
//       console.log('WebSocket is not open.');
//     }
//   };

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
//       <Toast config={toastConfig} />
//     </Provider>
//   );
// }

// export default App;














//before websocket
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
import Calender  from './screens/Calender';
// import Buy from "./screens/Buy";

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
      <Stack.Screen name="Calender" component={Calender} />
      {/* <Stack.Screen name="TradingCalendar" component={TradingCalendar} /> */}
      {/* <Stack.Screen name="Buy" component={Buy} /> */}

   </Stack.Navigator>
  );
}


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', backgroundColor: '#FFFFF' }}
      contentContainerStyle={{ padding: 15 }}
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
      style={{ borderLeftColor: 'red', backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
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


