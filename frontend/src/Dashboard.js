import React from "react";

function Dashboard({ data }) {
  if (!data) return <h2>No Data Available</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎯 Your Dashboard</h1>

      <h2>Level: {data.level}</h2>
      <h3>Score: {data.score}</h3>
      <h3>Percentage: {data.percentage}%</h3>

      <h2>🚀 Recommended Path</h2>
      <p>{data.recommended_domain}</p>

      <h2>💪 Strong Areas</h2>
      <ul>
        {data.strong_areas.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>⚠️ Weak Areas</h2>
      <ul>
        {data.weak_areas.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

    </div>
  );
}

export default Dashboard;