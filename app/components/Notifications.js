// components/Notifications.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationsComponent = () => {
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Exam Reminder",
        body: "You have an exam coming up soon!",
      },
      trigger: { seconds: 10 }, // Adjust the trigger time as needed
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Send Test Notification"
        onPress={sendNotification}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default NotificationsComponent;
