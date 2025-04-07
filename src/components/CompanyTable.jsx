import { useEffect, useState } from "react";
import { fetchCompanies } from "../services/api";
import './CompanyTable.css';


function CompanyTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCompanies().then((fetchedData) => {
            console.log("Dane z API:", fetchedData);
            
            setData(fetchedData.companyList || []); 
        });
    }, []);

    console.log("Aktualne dane w stanie:", data);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nazwa Spółki</th>
                    <th>Data Raportu</th>
                    <th>Lista Spółek</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.companyName}</td>
                        <td>{item.nextRaportDate}</td>
                        <td>{item.groups}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CompanyTable;