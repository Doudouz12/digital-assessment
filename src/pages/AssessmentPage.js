import React, { useState } from "react";
import { Link } from "react-router-dom";

function AssessmentPage() {
  const [answers, setAnswers] = useState({});

  return (
    <div>
      <h1>Digital Maturity Assessment</h1>

      <label>Does your company have a digital transformation strategy?</label>
      <select onChange={(e) => setAnswers({ ...answers, strategy: e.target.value })}>
        <option>No</option>
        <option>Some initiatives, no roadmap</option>
        <option>Clear strategy with milestones</option>
        <option>Fully embedded across all departments</option>
      </select>

      <br /><br />
      <Link to="/company-profile"><button>Back</button></Link>
      <Link to="/report"><button>Next: See Report</button></Link>
    </div>
  );
}

export default AssessmentPage;
