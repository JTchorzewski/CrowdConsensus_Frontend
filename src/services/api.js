// src/services/api.js
import axios from "axios";

//const API_URL = "https://localhost:7207/api";
const API_URL = "http://localhost:8080/api";

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