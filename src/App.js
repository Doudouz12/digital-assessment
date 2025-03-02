import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import CompanyProfile from "./pages/CompanyProfile";
import AssessmentPage from "./pages/AssessmentPage";
import ReportDashboard from "./pages/ReportDashboard";
import profileVideo from "./videos/profile.mp4";
import assessmentVideo from "./videos/assessment.mp4";
import reportVideo from "./videos/report.mp4";

function App() {
  return (
    <Router>
      <VideoBackground />
      <div className="content">
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/company-profile">Company Profile</Link> | 
          <Link to="/assessment">Assessment</Link> | 
          <Link to="/report">Report Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/report" element={<ReportDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function VideoBackground() {
  const location = useLocation();

  let videoSource;
  if (location.pathname === "/company-profile") videoSource = profileVideo;
  else if (location.pathname === "/assessment") videoSource = assessmentVideo;
  else if (location.pathname === "/report") videoSource = reportVideo;
  else videoSource = profileVideo;

  return (
    <video key={videoSource} autoPlay loop muted className="background-video">
      <source src={videoSource} type="video/mp4" />
    </video>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Digital Maturity Assessment</h1>
      <Link to="/company-profile"><button>Start Assessment</button></Link>
    </div>
  );
}

export default App;
