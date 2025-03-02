import React from "react";
import { Link } from "react-router-dom";

function CompanyProfile() {
  return (
    <div>
      <h1>Company Profile</h1>
      <p>Fill in your company details below:</p>

      <label>Company Size:</label>
      <select>
        <option>Small (1-50 employees)</option>
        <option>Medium (51-500 employees)</option>
        <option>Large (500+ employees)</option>
      </select>

      <br /><br />
      <Link to="/assessment"><button>Next: Start Assessment</button></Link>
    </div>
  );
}

export default CompanyProfile;
