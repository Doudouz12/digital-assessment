import React, { useEffect, useState } from "react";

const Results = () => {
  const [profile, setProfile] = useState({});
  const [answers, setAnswers] = useState({});
  const [report, setReport] = useState(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const storedAnswers = JSON.parse(localStorage.getItem("assessmentAnswers"));
    const sessionId = localStorage.getItem("sessionId");
  
    setProfile(storedProfile || {});
  
    if (!endpoint || !apiKey) {
      setError("AI agent configuration missing. Check your environment settings.");
      return;
    }
  
    const runAgent = async () => {
      try {
        const payload = {
          sessionId,
          profile: storedProfile,
          answers: storedAnswers
        };
  
        const response = await axios.post(endpoint, payload, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          }
        });
  
        const result = response.data;
        setReport(result);
      } catch (err) {
        console.error("AI agent call failed:", err);
        setError("Oops! Something went wrong talking to the AI agent.");
      }
    };
  
    runAgent();
  }, [apiKey, endpoint]);
  

  const generateRecommendations = (answers) => {
    const recs = [];
    if (answers[1] === "no") recs.push("Consider implementing a CRM system.");
    if (answers[2] === "no") recs.push("Document your customer service process.");
    if (answers[3] === "no") recs.push("Adopt automated reporting tools.");
    return recs.length ? recs : ["Great job! Keep optimizing your tech stack."];
  };

  if (!report) return <p className="p-6">Generating your results...</p>;

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
        <p><strong>Score:</strong> {report.score} / 30</p>
        <p><strong>Readiness Level:</strong> {report.level}</p>
        <p><strong>Projected ROI:</strong> {report.roiProjection}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc pl-5">
          {report.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
