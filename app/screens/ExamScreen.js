import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
  Modal,
  Pressable,
  AppState,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6 } from "@expo/vector-icons/";
import { BlurView } from "expo-blur";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import QuestionComponent from "../components/QuestionComponent"; // Import the new QuestionComponent
import { Picker } from "@react-native-picker/picker";
import { questionsData } from "../../data"; // Adjust path as needed

//const { width } = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH;

const ExamScreen = ({ route }) => {
  const navigation = useNavigation();
  const { examName, duration, startTime, date, examCode } = route.params;
  //const { questions } = route.params; // Assuming questions are passed as a parameter
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [showPicker, setShowPicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const pickerRef = useRef();
  const flatListRef = useRef(null); // Define the flatListRef using useRef

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log(AppState);
      //console.log(nextAppState)
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        Alert.alert("Warning", "Please stay on the exam screen.");
      }
      setAppState(nextAppState);
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    const examEndTime = new Date().getTime() + duration * 60 * 1000; // Duration in seconds
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeRemaining = Math.max(
        0,
        Math.floor((examEndTime - currentTime) / 1000)
      );
      setTimeLeft(timeRemaining);
      if (timeRemaining === 0) {
        clearInterval(interval);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Start a timer when the component is mounted (navigated to ExamScreen)
    const timer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);  // Timer increments every 1 second

    return () => clearInterval(timer);  // Clear the timer when the component unmounts
  }, []);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (Number(currentQuestionIndex) < questionsData.length - 1) {
      const nextIndex = Number(currentQuestionIndex) + 1;
      setCurrentQuestionIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const remainingTime = `${Math.floor(timeLeft / 60)}:${String(
      timeLeft % 60
    ).padStart(2, "0")}`;

    const answeredQuestionsCount = Object.keys(answers).length;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      if (answeredQuestionsCount < questionsData.length) {
        Alert.alert(
          "Incomplete Questions",
          `You have completed ${answeredQuestionsCount} out of ${questionsData.length} questions. You have ${remainingTime} remaining. Do you want to proceed?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Proceed",
              style: "default",
              onPress: () => {
                setLoading(true); // Show spinner during navigation
                navigation.navigate("SubmitScreen", {
                  totalQuestions: questionsData.length,
                  answeredQuestions: answeredQuestionsCount,
                  answers: answers,
                  timeTaken: remainingTime,
                });
                setLoading(false); // Hide spinner after navigation (optional)
              },
            },
          ]
        );
      } else {
        setLoading(true);
        navigation.navigate("SubmitScreen", {
          totalQuestions: questionsData.length,
          answeredQuestions: answeredQuestionsCount,
          answers: answers,
          timeTaken: remainingTime,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const previousIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousIndex);
      flatListRef.current.scrollToIndex({
        index: previousIndex,
        animated: true,
      });
    }
  };

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0].index;
      if (firstVisibleItem !== undefined) {
        setCurrentQuestionIndex(firstVisibleItem);
      }
    }
  };

  const handleQNumChange = (itemValue, itemIndex) => {
    setCurrentQuestionIndex(itemValue);
    setShowPicker(false);
    flatListRef.current.scrollToIndex({ index: itemValue, animated: true });
  };

  const getTimerColor = () => {
    if (timeLeft <= 300) return "#ff0000";
    if (timeLeft <= 600) return "#ffa500";
    return "#15d62e";
  };

  const toggleModal = () => {
    setIsModalVisible(true);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    flatListRef.current.scrollToIndex({ index, animated: true });
    setIsModalVisible(false);
  };

  const hideMenu = () => setVisibleMenu(false);
  const showMenu = () => setVisibleMenu(true);

  const handleCancel = () => {
    hideMenu();
    const answeredQuestionsCount = Object.keys(answers).length;
    // Check if time is less than or equal to 10 seconds and answeredQuestionsCount is 0
    if (answeredQuestionsCount === 0 && timeElapsed <= 10) {
      navigation.goBack();  // Navigate to the previous screen
    } else {
      //console.log('You cannot cancel after 10 seconds or if you have answered questions.');
      Alert.alert(
        "Action Not Allowed",
        "You cannot cancel after 10 seconds or if you have answered questions.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }}></SafeAreaView>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        {/* Menu Bar */}

        <View style={styles.menuBar}>
          <Menu
            visible={visibleMenu}
            anchor={
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  showMenu();
                }}
              >
                <FontAwesome6 name="bars" size={24} color="black" />
              </TouchableOpacity>
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu();
                handleSubmit();
              }}
            >
              Submit Exam
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={hideMenu}>Some other action</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => handleCancel()}>Cancel</MenuItem>
          </Menu>

          <TouchableOpacity
            style={styles.showQuestionsButton}
            onPress={toggleModal}
          >
            <Text style={styles.showQuestionsText}>Show Questions</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/UserProfile.png")} // Replace with actual user image URL
            style={styles.userImage}
          />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>{examName}</Text>
        </View>
        <View style={styles.timerContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.timerLabel}>Remaining Time:</Text>
            <Text style={[styles.timerValue, { color: getTimerColor() }]}>
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </Text>
          </View>

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.qNumSelector}
              onPress={() => setShowPicker(!showPicker)}
            >
              <Text style={styles.qNumSelectorText}>
                {Number(currentQuestionIndex) + 1}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <Picker
                ref={pickerRef}
                mode="dropdown"
                selectedValue={currentQuestionIndex}
                onValueChange={handleQNumChange}
                style={styles.qNumPicker}
                itemStyle={{ fontSize: 16 }}
              >
                {questionsData.map((_, index) => (
                  <Picker.Item
                    key={index}
                    label={`${index + 1}`}
                    value={index}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>

        <FlatList
          horizontal
          data={questionsData}
          renderItem={({ item, index }) => (
            <QuestionComponent
              question={item}
              selectedAnswer={answers[index] || null}
              onAnswerSelect={handleAnswerSelect}
              currentQuestionIndex={index}
              totalQuestions={questionsData.length}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled={true}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          initialScrollIndex={currentQuestionIndex}
          ref={flatListRef}
          onScrollToIndexFailed={(info) => {
            flatListRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true,
            });
          }}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              currentQuestionIndex === 0 && styles.disabledButton,
            ]}
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.buttonText}>Previous Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.buttonText}>
              {currentQuestionIndex < questionsData.length - 1
                ? "Next Question"
                : "Submit Exam"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal for showing all questions */}
        <Modal
          visible={isModalVisible}
          style={styles.modal}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>All Questions</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <FontAwesome6 name="xmark" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={questionsData}
                renderItem={({ item, index }) => (
                  //console.log(""),
                  <Pressable
                    style={[
                      styles.questionItem,
                      answers.hasOwnProperty(index)
                        ? styles.answered
                        : styles.unanswered,
                    ]}
                    onPress={() => handleQuestionSelect(index)}
                  >
                    <View style={styles.questionContent}>
                      <Text style={styles.questionText}>
                        Question {index + 1}
                      </Text>
                    </View>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </Modal>

        {loading && (
          <Modal
            transparent={true}
            visible={loading}
            animationType="fade"
            style={styles.modal}
          >
            <BlurView style={styles.blurContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </BlurView>
          </Modal>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
  },
  menuBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
    // paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  menuButton: {
    padding: 10,
  },

  showQuestionsButton: {
    flex: 1,
    alignItems: "center",
  },

  showQuestionsText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    zIndex: 2,
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  timerLabel: {
    fontSize: 16,
    color: "#333",
  },
  timerValue: {
    fontSize: 20,
    fontWeight: "600",
    //color: "#15d62e",
  },
  pickerContainer: {
    flexDirection: "1",
    justifyContent: "flex-end",
    paddingLeft: 70,
  },
  qNumSelector: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  qNumSelectorText: {
    fontSize: 16,
    color: "#000",
  },
  qNumPicker: {
    position: "absolute",
    borderRadius: 10,
    borderWidth: 0.2,
    top: 0,
    left: "70%",
    right: 0,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  navigationButton: {
    flex: 1,
    backgroundColor: "#1ea3ff",
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "70%",
  },
  modalHeader: {
    // fontSize: 18,
    // fontWeight: "bold",
    // marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
  },

  questionItem: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 3, // Adds shadow on Android
    backgroundColor: "#fff",
    shadowColor: "#000", // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  answered: {
    backgroundColor: "#d4edda", // Light green for answered questions
    borderColor: "#c3e6cb",
  },
  unanswered: {
    backgroundColor: "#f8d7da", // Light red for unanswered questions
    borderColor: "#f5c6cb",
  },
  questionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ExamScreen;
