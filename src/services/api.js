import axios from "axios";

const API_URL = "https://localhost:7207/Companies";

export const fetchCompanies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        return [];
    }
};