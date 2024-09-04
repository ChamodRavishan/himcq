// screens/AdminDashboard.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ExamCreationForm from '../components/ExamCreationForm';
import UserManagement from '../components/UserManagement';

const AdminDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <ExamCreationForm />
      <UserManagement />
      <Button
        title="View Reports"
        onPress={() => navigation.navigate('ReportScreen')}
        color="#007bff"
      />
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

export default AdminDashboard;
