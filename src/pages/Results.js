import React, { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
  const [profile, setProfile] = useState({});
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const endpoint = process.env.REACT_APP_AI_ENDPOINT;
  const apiKey = process.env.REACT_APP_AI_KEY;

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const storedAnswers = JSON.parse(localStorage.getItem("assessmentAnswers"));
    const sessionId = localStorage.getItem("sessionId");

    setProfile(storedProfile || {});

    // ✅ DEBUG LOGS HERE
    console.log("Endpoint:", endpoint);
    console.log("API Key loaded:", !!apiKey); 
    
    if (!endpoint || !apiKey) {
      setError("AI agent configuration missing. Check your environment settings.");
      return;
    }

    const runAgent = async () => {
  try {
    const payload = {
      input_data: {
        profile: storedProfile,
        answers: storedAnswers
      }
    };

    const response = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });

    console.log("Raw AI Response:", response.data);

    // Adjust this part based on how your agent responds
    // For now, assuming it returns a full report directly
    setReport(response.data);
  } catch (err) {
    console.error("AI agent call failed:", err.response?.data || err.message);
    setError("Oops! Something went wrong talking to the AI agent.");
  }
};


    runAgent();
  }, [apiKey, endpoint]);

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!report) return <p className="p-6">Talking to your AI agent...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Tech Readiness Report</h2>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Company:</strong> {profile.company}</p>
        <p><strong>Size:</strong> {profile.size}</p>
        <p><strong>Industry:</strong> {profile.industry}</p>
        <p><strong>Budget:</strong> {profile.budget || "Not provided"}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Assessment Summary</h3>
        <p><strong>Score:</strong> {report.score}</p>
        <p><strong>Readiness Level:</strong> {report.level}</p>
        <p><strong>Projected ROI:</strong> {report.roi}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc pl-5">
          {report.recommendations?.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
