import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function List({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      {/* <Button
        title="Go to Other Screen"
        onPress={() => navigation.navigate('OtherScreen')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color for the entire screen
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default List;
