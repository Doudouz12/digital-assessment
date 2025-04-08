import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endpoint = process.env.REACT_APP_AI_ENDPOINT;
  const apiKey = process.env.REACT_APP_AI_KEY;

  const handleAskAgent = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);
    setAiResponse("");

    
    try {
      const response = await axios.post(
        endpoint,
        { input: userInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const result = response.data.message || JSON.stringify(response.data);
      setAiResponse(result);
    } catch (err) {
      console.error("AI Agent Error:", err);
      setError("Oops! Something went wrong talking to the AI agent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Digital Assessment AI Agent</h1>

      <input
        type="text"
        placeholder="Ask the AI something..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleAskAgent} disabled={loading}>
        {loading ? "Asking..." : "Ask Agent"}
      </button>

      {error && <p className="error">{error}</p>}

      {aiResponse && (
        <div className="response">
          <h2>AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
