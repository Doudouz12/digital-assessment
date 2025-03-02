import React from "react";
import { Link } from "react-router-dom";

function ReportDashboard() {
  return (
    <div>
      <h1>Report Dashboard</h1>
      <p>Your AI-powered assessment results will appear here.</p>

      <Link to="/assessment"><button>Back to Assessment</button></Link>
    </div>
  );
}

export default ReportDashboard;
