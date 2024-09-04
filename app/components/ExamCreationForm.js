// components/ExamCreationForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { globalStyles } from '../../styles';
import { createExam } from '../../api/api';

const ExamCreationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = async () => {
    try {
      const examData = { title, description, duration, difficulty };
      await createExam(examData);
      alert('Exam created successfully!');
    } catch (error) {
      alert('Failed to create exam');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Create Exam</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Exam Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={difficulty}
        style={globalStyles.picker}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      <Button
        title="Create Exam"
        onPress={handleSubmit}
        color="#007bff"
      />
    </View>
  );
};

export default ExamCreationForm;
