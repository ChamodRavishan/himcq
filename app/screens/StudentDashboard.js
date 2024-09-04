import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Pressable,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Box from "../components/Box";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const boxWidth = (width - 48) / 2; // Adjusted for two boxes per row with padding

const boxes = [
  { title: "Enroll Exam", color: ["#b71c1c", "#ff8a80"] }, // Dark red to light pink
  { title: "Random Quiz", color: ["#4a148c", "#ab47bc"] }, // Dark purple to light purple
  { title: "Practice Exam", color: ["#004d40", "#80cbc4"] }, // Dark green to light green
  { title: "View Courses", color: ["#e64a19", "#ffab91"] }, // Dark orange to light orange
  { title: "Profile", color: ["#0d47a1", "#42a5f5"] }, // Dark blue to light blue
  { title: "Settings", color: ["#ff6f00", "#ffab40"] }, // Dark orange to light orange
];

const StudentDashboard = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [passcode, setPasscode] = useState("");

  const handlePress = (title) => {
    if (title === "Enroll Exam") {
      setModalVisible(true);
    }
    else if (title === "View Courses") {
      Alert.alert(
        "No Courses Subscribed",
        "You have not subscribed to any courses.",
        [{ text: "OK" }]
      );
    } else {
      console.log(`${title} pressed`);
    }
  };

  const handleStartExam = () => {
    setModalVisible(false);
    const now = new Date();
    const examStartDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
    const formattedStartTime = examStartDate.toISOString();

    navigation.navigate("BeforeExamScreen", {
      examName: "Math Final Exam grade 11 last semester exam tesihcd csjhjcbsc",
      examCode: "MATH101",
      duration: 60, // Exam duration in minutes
      questions: 50,
      startTime: formattedStartTime, // Updated start time
      date: examStartDate.toISOString().split("T")[0], // Exam date
      rules: [
        "No talking during the exam",
        "Do not leave the exam tab",
        "Use of calculators is not allowed",
        "The exam will automatically submit when time expires",
      ],
    });
  };

  const handleSubmit = () => {
    // Validate passcode here
    console.log("Passcode submitted:", passcode);
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.grid}>
        {boxes.map((box, index) => (
          <Box
            key={box.title}
            title={box.title}
            color={box.color}
            onPress={() => handlePress(box.title)}
          />
        ))}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Secure Exam Access</Text>
            <Text style={styles.modalSubtitle}>
              Please enter the passcode to begin the exam.
            </Text>
            <TextInput
              style={styles.passcodeInput}
              placeholder="Enter Passcode"
              value={passcode}
              onChangeText={setPasscode}
              keyboardType="default"
              placeholderTextColor="#aaa"
              //secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleStartExam}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "80%",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  passcodeInput: {
    width: "100%",
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    marginVertical: 8,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StudentDashboard;

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
