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

});


