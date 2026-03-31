import React, { useEffect, useState } from "react";

function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/assessment")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value
    });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/submit-assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answers)
    });

    const data = await res.json();
    alert(`Level: ${data.level}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skill Assessment 🧠</h1>

      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <p><b>{q.question}</b></p>

          {q.type === "mcq" && q.options.map(opt => (
            <div key={opt}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={(e) => handleChange(q.id, e.target.value)}
              /> {opt}
            </div>
          ))}

          {q.type !== "mcq" && (
            <input
              type="text"
              placeholder="Your Answer"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
}

export default Assessment;