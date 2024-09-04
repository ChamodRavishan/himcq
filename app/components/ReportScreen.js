// components/ReportScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Screen</Text>
      {/* Add code to display reports */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ReportScreen;
