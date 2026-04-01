import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dashboard from "./Dashboard";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const QuestionBox = styled.div`
  margin-bottom: 25px;
  padding: 15px;
  border-bottom: 1px solid #eee;
  border: 1px solid #ccc; /* From Code 2 */
  border-radius: 10px;    /* From Code 2 */
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #764ba2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  
  &:hover {
    background: #667eea;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

function Assessment({ userEmail }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error("Error fetching questions:", err));
  }, []);

  const handleChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/submit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userEmail,
          answers: answers
        })
      });

      const data = await res.json();
      setResult(data);
      setSubmitted(true);
    } catch (error) {
      alert("Error submitting assessment.");
    }
  };

  // If result exists, show the Dashboard instead of the assessment or thank you message
  if (result) {
    return <Dashboard data={result} />;
  }

  if (submitted) {
    return (
      <Container>
        <h2>Thank you, {userEmail}!</h2>
        <p>Your assessment has been submitted. Our team will review your skills.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Skill Assessment 🧠</h1>
      <p style={{ textAlign: "center", color: "#666" }}>User: {userEmail}</p>

      {questions.map((q) => (
        <QuestionBox key={q.id}>
          <p><b>{q.id}. {q.question}</b></p>

          {q.type === "mcq" ? (
            q.options.map((opt) => (
              <div key={opt} style={{ margin: "8px 0" }}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
                <label style={{ marginLeft: "8px" }}>{opt}</label>
              </div>
            ))
          ) : (
            <TextInput
              type="text"
              placeholder="Type your answer here..."
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {/* Logic from Code 2: Show explanation after selecting answer */}
          {answers[q.id] && q.type === "mcq" && (
            <div style={{
              marginTop: "10px",
              padding: "10px",
              background: answers[q.id] === q.answer ? "#d4edda" : "#f8d7da",
              borderRadius: "8px"
            }}>
              <b>{answers[q.id] === q.answer ? "Correct ✅" : "Wrong ❌"}</b>
              <p>{q.explanation}</p>
            </div>
          )}
        </QuestionBox>
      ))}

      <StyledButton onClick={handleSubmit}>Submit Test</StyledButton>
    </Container>
  );
}

export default Assessment;