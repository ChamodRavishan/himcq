import axios from 'axios';

const BASE_URL = 'https://your-backend-api.com/api'; // Replace with your actual backend URL

// Create an instance of axios with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all upcoming exams for a student
export const getExams = async (studentId) => {
  try {
    const response = await api.get(`/exams/upcoming/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exams:', error);
    throw error;
  }
};

// Function to get exam details
export const getExamDetails = async (examId) => {
  try {
    const response = await api.get(`/exams/details/${examId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam details:', error);
    throw error;
  }
};

// Function to submit exam answers
export const submitExamAnswers = async (examId, answers) => {
  try {
    const response = await api.post(`/exams/submit`, {
      examId,
      answers,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting exam answers:', error);
    throw error;
  }
};

// Function to fetch results
export const getExamResults = async (studentId) => {
  try {
    const response = await api.get(`/results/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam results:', error);
    throw error;
  }
};

// Function to fetch student performance analytics
export const getPerformanceAnalytics = async (studentId) => {
  try {
    const response = await api.get(`/analytics/performance/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching performance analytics:', error);
    throw error;
  }
};

// Function to get notifications related to exams
export const getNotifications = async (studentId) => {
  try {
    const response = await api.get(`/notifications/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};
