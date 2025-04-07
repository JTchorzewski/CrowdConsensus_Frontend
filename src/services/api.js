import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCompanies = async () => {
    try {
        const response = await axios.get(`${API_URL}/Companies`);
        return response.data;
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        return [];
    }
};
