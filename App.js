import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginForm from "./screens/LoginForm";
import Dashboard02 from "./screens/Dashboard02";
import List from "./screens/List";
import SeeAllItems from './screens/SeeAllItems';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen
          name="Dashboard02"
          component={Dashboard02}
          options={{ headerShown: false }} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="SeeAllItems" component={SeeAllItems} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// export default App;





















// const Stack = createNativeStackNavigator();
// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginForm from './LoginForm';

// import Dashboard02 from "./screens/Dashboard02";

// import List from './screens/List'; // Import the 'Next' screen

// const App = () => {
//   const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
//   const Stack = createStackNavigator();

//   return (
//     <>
//       <NavigationContainer>
//         {hideSplashScreen ? (
//           <Stack.Navigator screenOptions={{ headerShown: false }}>

//             <Stack.Screen name="Login" component={LoginForm} />
            
//             <Stack.Screen
//               name="Dashboard02"
//               component={Dashboard02}
//               options={{ headerShown: false }}  />
//               <Stack.Screen name="List" component={List} />
           
//           </Stack.Navigator>
//         ) : null}
//       </NavigationContainer>
//     </>
//   );
// };
// export default App;
