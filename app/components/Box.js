// Box.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const boxWidth = (width - 48) / 2;

const Box = ({ index, title, color, onPress }) => {
    //console.log( index, title, color)
  const [firstWord, secondWord] = title.split(" ");
  const showSubtitle = !!secondWord;

  return (
    <TouchableOpacity key={index} style={styles.box} onPress={onPress}>
      <LinearGradient colors={color} style={styles.gradient}>
        <Text style={styles.title}>{firstWord}</Text>
        {showSubtitle && <Text style={styles.subtitle}>{secondWord}</Text>}
        <View style={styles.iconWrapper}>
          <MaterialIcons name="arrow-forward" size={24} color="#000" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: boxWidth,
    height: 120, // Reduced height
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start", // Align content to the top
    padding: 12,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  iconWrapper: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
});

export default Box;

//  {renderBox("Enroll Exam", "EnrollExamScreen", ["#ff7e5f", "#feb47b"])}
//  {renderBox("Random Quiz", "RandomQuizScreen", ["#6a11cb", "#2575fc"])}
//  {renderBox("Practice", "PracticeScreen", ["#ff0099", "#493240"])}
//  {renderBox("View Courses", "CoursesScreen", ["#00c6ff", "#0072ff"])}
// { title: "Enroll Exam", color: ["#ff9a9e", "#fad0c4"] },
// { title: "Random Quiz", color: ["#a18cd1", "#fbc2eb"] },
// { title: "Practice", color: ["#84fab0", "#8fd3f4"] },
// { title: "View Courses", color: ["#fbc2eb", "#f6c9c6"] },
// { title: "Profile", color: ["#c1c2f5", "#f1f2b3"] },
// { title: "Settings", color: ["#ffecd2", "#fcb69f"] },
// { title: "Enroll Exam", color: [ "#d64d4d","#ff9a9e"] }, // Rich red gradient
// { title: "Random Quiz", color: ["#6a1b9a", "#ab47bc"] }, // Deep purple gradient
// { title: "Practice", color: ["#004d40", "#00796b"] }, // Deep green gradient
// { title: "View Courses", color: ["#ff8a65", "#d84315"] }, // Vivid orange gradient
// { title: "Profile", color: ["#1e88e5", "#1976d2"] }, // Strong blue gradient
// { title: "Settings", color: ["#43a047", "#388e3c"] }, // Dark green gradient
// { title: "Enroll Exam", color: ["#d64d4d", "#ff6f61"] }, // Dark to light red
// { title: "Random Quiz", color: ["#6a1b9a", "#ab47bc"] }, // Dark to light purple
// { title: "Practice", color: ["#004d40", "#00796b"] }, // Dark to light green
// { title: "View Courses", color: ["#d84315", "#ff8a65"] }, // Dark to light orange
// { title: "Profile", color: ["#1976d2", "#1e88e5"] }, // Dark to light blue
// { title: "Settings", color: ["#388e3c", "#43a047"] }, // Dark to light green
