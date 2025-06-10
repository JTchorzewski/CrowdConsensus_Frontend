// src/services/api.js

import axios from "axios";

//const API_URL = "https://localhost:7207/api";
const API_URL = "http://localhost:8080/api";

// A helper function to get auth headers. This avoids repeating code.
const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  if (userInfo && userInfo.token) {
    return { 'Authorization': `Bearer ${userInfo.token}` };
  }
  return {};
};

export const fetchCompanies = async ({
  page = 1,
  pageSize = 10,
  q = ""
}) => {
  try {
    const resp = await axios.get(`${API_URL}/companies/companylist`, {
      params: { page, pageSize, q }
    });
    return resp.data;
  } catch (error) {
    console.error("Błąd pobierania listy spółek:", error);
    return { totalCount: 0, items: [] };
  }
};


export const fetchCompany = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/companies/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Błąd pobierania danych spółki o ID ${id}:`, error);
    if (error.response && error.response.status === 404) {
      console.warn(`Spółka o ID ${id} nie została znaleziona (404).`);
      return null; // Or handle as needed
    }
 
 
    return null; 
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email: username,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas rejestracji:", error.response?.data || error.message);
    throw error.response?.data || new Error("Nieznany błąd podczas rejestracji");
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas logowania:", error.response?.data || error.message);
    if (error.response && error.response.data) {
      const errorMessage = typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data.message || "Błędne dane logowania.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Nie udało się połączyć z serwerem.");
    }
  }
};


// --- NEW FUNCTION TO ADD A PREDICTION ---
/**
 * Submits a new prediction for a company. Requires user to be logged in.
 * @param {object} predictionData - The data for the prediction.
 * @param {number} predictionData.companyId - The ID of the company.
 * @param {number} predictionData.estimate - The user's prediction value.
 */
export const addPrediction = async (predictionData) => {
  const headers = getAuthHeaders();
  if (!headers.Authorization) {
    throw new Error("Musisz być zalogowany, aby dodać predykcję.");
  }

  try {
    // Per your friend's description, endpoint is /api/estimate/pp
    const response = await axios.post(`${API_URL}/estimate/pp`, predictionData, { headers });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas dodawania predykcji:", error.response?.data || error.message);
    throw error.response?.data || new Error("Wystąpił błąd podczas dodawania predykcji.");
  }
};

// --- NEW FUNCTION TO FETCH USER'S PREDICTIONS ---
/**
 * Fetches all predictions made by the currently logged-in user.
 * This will be used on your /predykcje page.
 */
export const fetchMyPredictions = async () => {
  const headers = getAuthHeaders();
  if (!headers.Authorization) {
     throw new Error("Musisz być zalogowany, aby zobaczyć swoje predykcje.");
  }

  try {
    // Per your friend's description, endpoint is /api/estimate/show
    const response = await axios.get(`${API_URL}/estimate/show`, { headers });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania predykcji:", error.response?.data || error.message);
    throw error.response?.data || new Error("Nie udało się pobrać Twoich predykcji.");
  }
};