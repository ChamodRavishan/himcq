// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to HiMCQ</Text>
      <Button title="Admin Dashboard" onPress={() => navigation.navigate('AdminDashboard')} color="#007bff" />
      <Button title="Student Dashboard" onPress={() => navigation.navigate('StudentDashboard')} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});

export default HomeScreen;
