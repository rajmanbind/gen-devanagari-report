import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [report, setReport] = useState([{ title: "", content: "" }]);

  useEffect(() => {
    // Fetch the report data from the backend
    axios
      .get("http://localhost:4000/api/reports")
      .then((response) => {
        setReport(response.data.filter((d) => d.title));
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      });
  }, []);

  // Print the report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="App">
      <div className="report-content">
      <h1>Devnagari Report</h1>
        {report &&
          report.map((d, index) => {
            return (
              <div key={index}>
                <h2>{d.title}</h2>
                <p>{d.content}</p>
              </div>
            );
          })}
        <button onClick={handlePrint}>Print Report</button>
      </div>
    </div>
  );
}

export default App;
