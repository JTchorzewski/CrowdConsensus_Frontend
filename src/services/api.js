// src/services/api.js
import axios from "axios";

const API_URL = "https://localhost:7207/api"; // Or your http://localhost:8080/api
// const API_URL = "http://localhost:8080/api";

export const fetchCompanies = async ({
  page = 1,
  pageSize = 40,
  q = ""
}) => {
  try {
    const resp = await axios.get(`${API_URL}/companies`, {
      params: { page, pageSize, q }
    });
    return resp.data;
  } catch (error) {
    console.error("Błąd pobierania listy spółek:", error);
    return { totalCount: 0, items: [] };
  }
};

// 👇 ****** ADD THIS FUNCTION ****** 👇
export const fetchCompany = async (id) => {
  try {
    // Assuming your API endpoint for a single company is something like /api/companies/{id}
    const resp = await axios.get(`${API_URL}/companies/${id}`);
    // resp.data should be the company object
    return resp.data;
  } catch (error) {
    console.error(`Błąd pobierania danych spółki o ID ${id}:`, error);
    // You might want to return null or throw the error depending on how you handle it in the component
    // For OneCompanyPage.jsx, returning null or an empty object might be better to show a "not found" message
    if (error.response && error.response.status === 404) {
      console.warn(`Spółka o ID ${id} nie została znaleziona (404).`);
      return null; // Or handle as needed
    }
    // For other errors, re-throw or return a more generic error object
    // throw error; // Or return null to let the component handle it.
    return null; // Let's return null for simplicity here, the component checks for !company
  }
};
// 👆 ****** END OF ADDED FUNCTION ****** 👆

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
    throw error.response?.data || "Nieznany błąd podczas rejestracji";
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
      // Check if error.response.data is a string (like in some ASP.NET Core identity errors) or an object
      const errorMessage = typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data.message || "Błędne dane logowania.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Nie udało się połączyć z serwerem.");
    }
  }
};