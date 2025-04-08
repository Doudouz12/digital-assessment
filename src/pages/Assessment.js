import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyQuestions = [
  { id: 1, text: "Do you use any CRM system?" },
  { id: 2, text: "Is your customer service process documented?" },
  { id: 3, text: "Do you have automated reporting tools?" }
];

const Assessment = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("assessmentAnswers", JSON.stringify(answers));
    navigate("/results");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tech Readiness Assessment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {dummyQuestions.map((q) => (
          <div key={q.id}>
            <p className="mb-2">{q.text}</p>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value="yes"
                  onChange={() => handleChange(q.id, "yes")}
                  required
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value="no"
                  onChange={() => handleChange(q.id, "no")}
                />{" "}
                No
              </label>
            </div>
          </div>
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          View Results
        </button>
      </form>
    </div>
  );
};

export default Assessment;
