import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AssetListDetails = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack('Dashboard02');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        {/* <Image source={require("../assets/back-icon.png")} style={styles.backIcon} /> */}
        <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Crypto Asset List Details</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 30,
    // paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default AssetListDetails;







// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { LineChart, Grid } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';

// const AssetListDetails = () => {
//     const navigation = useNavigation();

//     const goBack = () => {
//         navigation.goBack('Dashboard02');
//     };

//     const data = [50, 10, 40, 85, 90, 65, 95, 40, 55];  // sample data

//     return (
//         <View style={styles.container}>
//             <LineChart
//                 style={{ flex: 0, width: '50%', height: '50%', backgroundColor: 'lightgray' }}
//                 data={data}
//                 svg={{ stroke: 'rgb(134, 65, 244)' }}
//                 contentInset={{ top: 20, bottom: 20 }}
//                 curve={shape.curveNatural}
//             >
//                 <Grid />
//             </LineChart>
//             <TouchableOpacity onPress={goBack} style={styles.backButton}>
//                 <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} />
//             </TouchableOpacity>
//             <Text style={styles.title}>Crypto Asset List Details</Text>
//         </View>
//     );
// };

// const styles = {
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 10,
//     },
//     title: {
//         fontSize: 20,
//         marginBottom: 20,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 50,
//         left: 10,
//     },
//     backIcon: {
//         marginLeft: 10,
//     },
// };

// export default AssetListDetails;





