import axios from "axios";

const API_URL = "https://localhost:7207/api";

export const fetchCompanies = async ({
  page = 1,
  pageSize = 40,
  q = ""
}) => {
  try {
    const resp = await axios.get(`${API_URL}/FinancialData`, {
      // on your real API you’ll expect:
      // GET /FinancialData?page=1&pageSize=40&q=ABC
      params: { page, pageSize, q }
    });
    // resp.data must be shaped:
    // { totalCount: number, items: FinancialData[] }
    return resp.data;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    // return empty page
    return { totalCount: 0, items: [] };
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw "Nieznany błąd podczas rejestracji";
    }
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
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Błędne dane logowania."
      );
    } else {
      throw new Error("Nie udało się połączyć z serwerem.");
    }
  }
};
