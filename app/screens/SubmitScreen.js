import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const SubmitScreen = ({ route, navigation }) => {
  const { totalQuestions, answeredQuestions, timeTaken, score } = route.params;
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  //console.log(route.params);
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim1, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim1, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim2, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim2, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim1, scaleAnim2]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.outerCircleContainer}>
            <Animated.View
              style={[
                styles.animatedCircle,
                styles.firstCircle,
                { transform: [{ scale: scaleAnim1 }] },
              ]}
            />
            <View style={styles.middleCircleContainer}>
              <Animated.View
                style={[
                  styles.animatedCircle,
                  styles.secondCircle,
                  { transform: [{ scale: scaleAnim2 }] },
                ]}
              />
              <View style={styles.circleContainer}>
                <Text style={styles.circleText}>Total Score</Text>
                <Text style={styles.markText}>{answeredQuestions}</Text>
                <Text style={styles.circleText}>out of {totalQuestions}</Text>
              </View>
            </View>
          </View>

          <View style={styles.animationContainer}>
            <LottieView
              source={require("../../assets/lottie/congrats1.json")}
              autoPlay
              loop={true}
              style={styles.animation}
            />
          </View>
        </View>

        <View style={styles.examContainer}>
          <View style={styles.row}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Questions</Text>
              <Text style={[styles.detailValue, styles.blueText]}>
                {totalQuestions}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Answered Questions</Text>
              <Text style={[styles.detailValue, styles.blueText]}>
                {answeredQuestions}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Correct Answers</Text>
              <Text style={[styles.detailValue, styles.greenText]}>
                {answeredQuestions}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wrong Answers</Text>
              <Text style={[styles.detailValue, styles.redText]}>
                {answeredQuestions}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Time Taken:</Text>
              <Text style={styles.detailValue}>{timeTaken}</Text>
            </View>
          </View>
        </View>

        {/* 3 Circle Buttons */}
        <View style={styles.buttonContainer}>
          {/* Review Answers Button */}
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => {
                /* Add functionality here */
              }}
            >
              <Icon name="visibility" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.buttonTextBottom}>Review Answers</Text>
          </View>

          {/* Generate PDF Button */}
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => {
                /* Add functionality here */
              }}
            >
              <Icon name="picture-as-pdf" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.buttonTextBottom}>Generate PDF</Text>
          </View>

          {/* Share Score Button */}
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => {
                /* Add functionality here */
              }}
            >
              <Icon name="share" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.buttonTextBottom}>Share Score</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.finalButton}
        onPress={() => navigation.navigate("StudentDashboard")}
      >
        <Text style={styles.finalButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
  },
  detailsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
    //backgroundColor: "#1ea3ff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 50,
  },
  outerCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  middleCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  animatedCircle: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  firstCircle: {
    width: 175,
    height: 175,
    zIndex: 0,
  },
  secondCircle: {
    width: 150,
    height: 150,
    zIndex: 1,
  },
  circleContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  circleText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#1ea3ff",
  },
  markText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1ea3ff",
  },
  animationContainer: {
    position: "absolute",
    //  top: 0,
    //  left: 0,
    //  right: 0,
    //  bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  animation: {
    width: 400,
    height: 300,
  },
  examContainer: {
    //position:"relative",
    //top:180,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 15,
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  detailLabel: {
    fontSize: 14,
    textAlign: "center",
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  blueText: {
    color: "#1e90ff",
  },
  greenText: {
    color: "#32cd32",
  },
  redText: {
    color: "#ff4500",
  },
  buttonContainer: {
    flexDirection: "row",
    //justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1ea3ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonTextBottom: {
    color: "#1ea3ff",
    fontSize: 12,
  },
  finalButton: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#1ea3ff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 40,
  },
  finalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SubmitScreen;
