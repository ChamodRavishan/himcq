import React from "react";
import { View, Text, StyleSheet, TouchableOpacity ,Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const QuestionComponent = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionNumberRow}>
        <Text style={styles.questionNumberText}>
          Question {Number(currentQuestionIndex) + 1} of {totalQuestions}
        </Text>
      </View>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.bottomBar}></View>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedAnswer === option && styles.selectedOption,
          ]}
          onPress={() => onAnswerSelect(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedAnswer === option && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: SCREEN_WIDTH - 30, // Adjust width for screen size minus margin
  },
  questionNumberRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  questionNumberText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666",
  },
  bottomBar: {
    height: 1,
    backgroundColor: "#C0C0C0",
    width: "100%",
    marginVertical: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    //alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "#1ea3ff",
  },
  selectedOptionText:{
    color: "#fff",
  },
  
});

export default QuestionComponent;
