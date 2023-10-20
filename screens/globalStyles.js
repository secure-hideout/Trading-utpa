
// import { Dimensions, StyleSheet } from 'react-native';

// const { width, height } = Dimensions.get('window');

// export const globalStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         paddingTop: height * 0.04,
//         marginTop: height * 0.01,
//     },
//     // Other common styles...
// });

// export const headerStyles = StyleSheet.create({
//     nav: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//         paddingVertical: height * 0.01,
//         paddingHorizontal: width * 0.04,
//     },
//     // Other header-specific styles...
// });

import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

// Define the width and height variables here

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: height * 0.04,
        marginTop: height * 0.01,
    },
    // Other common styles...
});


