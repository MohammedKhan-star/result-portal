import { useState } from "react";
import axios from "axios";
import "./Result.css";

export default function Result() {
  const [hallticket, setHallticket] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
  const getResult = async () => {
    try {
      setError("");
      const res = await axios.get(
        `${API_URL}/result/${hallticket}`
      );
      setData(res.data);
    } catch {
      setError("Result not found. Please check Hall Ticket.");
      setData(null);
    }
  };

  return (
    <div className="container">=
     <div className="header">
        <h1>TS BOARD OF SECONDARY EDUCATION</h1>
        <h2>SSC PREFINAL EXAMINATION RESULT 2026</h2>
      </div>

      <div className="searchBox">
        <input  
          placeholder="Enter Hall Ticket Number"
          value={hallticket}
          onChange={(e) => setHallticket(e.target.value)}
        />
        <button onClick={getResult}>Get Result</button>
      </div>

      {error && <h3 className="error">{error}</h3>}

      {data && (
        <div id="memo" className="memo">

          <h2 className="memoTitle">SSC PREFINAL EXAMINATION MARKS MEMO</h2>
          <div className="studentInfo0"> 
          <p><b className="hallTicket">Hall Ticket:</b> {data.hallticket}<b className="name">  Name:</b> {data.name}</p>
          
          </div>
          <div className="studentInfo2">
          <p><b>School Name:</b> Madarsa Madinatul Uloom High School</p>
        </div>
          <table>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.hindi && (
                <tr><td>1</td><td>First Language</td><td>{data.hindi}</td><td><p2 className={
                                                                data.hindi >= "28" ? "pass" : "fail"
                                                              }
                                                            >
                                                            {data.hindi >= "28" ? "PASS" : "FAIL"}
                                                            </p2></td></tr>
              )}
              {data.telugu && <tr><td>2</td><td>Second Language</td><td>{data.telugu}</td><td><p2 className={
                                                                data.telugu >= "20" ? "pass" : "fail"
                                                              }
                                                            >
                                                            {data.telugu >= "20" ? "PASS" : "FAIL"}
                                                            </p2></td></tr>}

              <tr><td>3</td><td>English</td><td>{data.english}</td><td><p2 className={
                                                                data.english >= "28" ? "pass" : "fail"
                                                              }
                                                            >
                                                            {data.english >= "28" ? "PASS" : "FAIL"}
                                                            </p2></td></tr>
              <tr><td>4</td><td>Mathematics</td><td>{data.maths}</td><td><p2 className={
                                                                data.maths >= "28" ? "pass" : "fail"
                                                              }
                                                            >
                                                            {data.maths >= "28" ? "PASS" : "FAIL"}
                                                            </p2></td></tr>
              <tr><td>5</td><td>Science</td><td>{data.science}</td><td><p2 className={
                                                                data.science >= "28" ? "pass" : "fail"
                                                              }
                                                            >
                                                            {data.science >= "28" ? "PASS" : "FAIL" }
                                                            </p2></td></tr>
              <tr><td>6</td><td>Social Study</td><td>{data.social}</td><td><p2 className={
                                                                data.social >= "28" ? "pass" : "fail"
                                                              }
                                                            >
                                                            {data.social >= "28" ? "PASS" : "FAIL"}
                                                            </p2></td></tr>
            </tbody>
          </table>

          <h3>Total: {data.total}</h3>
        

          <h2
            className={
              data.result === "PASS" ? "pass" : "fail"
            }
          >
            Result: {data.result}
          </h2>

          <button onClick={() => window.print()}>
            🖨 Download / Print Memo
          </button>

        </div>
            )}
            <div className="footer">
        © 2026 Board of Secondary Education, Telangana  
        <br />
        Developed by <a href="https://your-portfolio-link.com" target="_blank">
          ProjectWorksStudio-Founder & Software Engineer - Mohammed Khan
        </a>
        <br />
        For more projects visit portfolio at <a href="https://mohammedkhan.dev" target="_blank">
          https://mohammedkhan.dev
        </a>
      </div>
    </div>
     

  
  );
}