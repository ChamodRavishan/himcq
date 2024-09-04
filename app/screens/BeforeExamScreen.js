import React,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

const BeforeExamScreen = ({ route }) => {
  const navigation = useNavigation();
  const { examName, examCode, duration, questions, startTime, date, rules } =
    route.params;
  const [timerId, setTimerId] = useState(null); // To store the timeout ID
  const [isExamStarted, setIsExamStarted] = useState(false);
  // Calculate exam timing
  const examStartDate = new Date(startTime);
  const examEndDate = new Date(examStartDate.getTime() + duration * 60000);
  const currentDate = new Date();
  const timeLeft = new Date(examStartDate - currentDate);
  const formattedTimeLeft = `${String(timeLeft.getUTCHours()).padStart(
    2,
    "0"
  )}:${String(timeLeft.getUTCMinutes()).padStart(2, "0")}:${String(
    timeLeft.getUTCSeconds()
  ).padStart(2, "0")}`;

  useEffect(() => {
    // Set a timeout to auto-start the exam in 5 minutes
    const timeoutId = setTimeout(() => {
      if (!isExamStarted) {
        handleStartExam(); // Auto navigate if not manually started
      }
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    setTimerId(timeoutId); // Store the timeout ID

    return () => clearTimeout(timeoutId); // Cleanup on component unmount
  }, []);

  const handleStartExam = () => {

    setIsExamStarted(true);
    clearTimeout(timerId);

    const currentTime = new Date();
    const examStartTime = new Date(currentTime.getTime() + 5 * 60 * 1000);
    const formattedStartTime = examStartTime.toISOString();

   navigation.navigate("ExamScreen", {
      examName,
      examCode,
      duration,
      startTime: formattedStartTime,
      date,
      rules,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
        {/* <Text style={styles.title}>About Us</Text> */}
      </View>
      <View style={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <Text style={styles.examTitle}>{examName}</Text>
            <View style={styles.bottomBar}></View>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Exam Start In:</Text>
            <Text style={styles.detailValue}>{formattedTimeLeft}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date of Exam:</Text>
            <Text style={styles.detailValue}>{date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Exam Questions:</Text>
            <Text style={styles.detailValue}>{questions}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Exam Duration:</Text>
            <Text style={styles.detailValue}>{duration} minutes</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Exam Timing:</Text>
            <Text style={styles.detailValue}>
              {/* {examStartDate.toLocaleDateString()}{" "} */}
              {examStartDate.toLocaleTimeString()} -{" "}
              {examEndDate.toLocaleTimeString()}
            </Text>
          </View>
        </View>

        <View style={styles.rulesContainer}>
          {rules.map((rule, index) => (
            <Text key={index} style={styles.ruleText}>
              {index + 1}. {rule}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartExam}>
        <Text style={styles.startButtonText}>Start Your Test</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    //justifyContent: 'center',
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  examTitle: {
    fontSize: 22,
    fontWeight: "bold",
    //color: '#1ea3ff',
  },
  bottomBar: {
    height: 1,
    backgroundColor: "#C0C0C0",
    width: "100%",
    marginVertical: 10,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  detailItem: {
    marginBottom: 25,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    //color: "#333",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "600",
    //color: "#555",
  },
  rulesContainer: {
    marginTop: 20,
  },
  ruleText: {
    fontSize: 14,
    lineHeight: 24,
    color: "#555",
    marginBottom: 5,
  },
  startButton: {
    backgroundColor: "#1ea3ff",
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BeforeExamScreen;
