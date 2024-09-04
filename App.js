import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import ExamScreen from "./app/screens/ExamScreen";
import AdminDashboard from "./app/screens/AdminDashboard";
import StudentDashboard from "./app/screens/StudentDashboard";
import BeforeExamScreen from "./app/screens/BeforeExamScreen";
import SubmitScreen from "./app/screens/SubmitScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Exam" component={ExamScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} options={{
            headerShown: false,
            //gestureEnabled: false, 
          }}/>
        <Stack.Screen
          name="BeforeExamScreen"
          component={BeforeExamScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExamScreen"
          component={ExamScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, 
          }}
          
        />

        <Stack.Screen
          name="SubmitScreen"
          component={SubmitScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
