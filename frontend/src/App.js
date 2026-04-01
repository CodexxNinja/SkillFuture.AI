import React, { useState } from "react";
import styled from "styled-components";
import Onboarding from "./Onboarding";
import Assessment from "./Assessment";

const Container = styled.div`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 100vh; background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Segoe UI', sans-serif;
`;

const Card = styled.div`
  background: white; padding: 40px; border-radius: 12px;
  box-shadow: 0px 15px 25px rgba(0,0,0,0.2); width: 350px; text-align: center;
`;

const Input = styled.input`
  width: 100%; padding: 12px; margin: 12px 0; border-radius: 8px; border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%; padding: 12px; background: #667eea; color: white;
  border: none; border-radius: 8px; cursor: pointer; font-size: 16px; margin-top: 10px;
  &:hover { background: #5563c1; }
`;

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  
  // STEP LOGIC: 1 = Auth, 2 = Onboarding, 3 = Assessment
  const [step, setStep] = useState(1);

  const handleSubmit = async () => {
    const endpoint = isLogin ? "/login" : "/signup";
    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStep(2); // MOVE TO ONBOARDING AFTER LOGIN
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  // --- Step 1: Login / Signup ---
  if (step === 1) {
    return (
      <Container>
        <Card>
          <h2>{isLogin ? "Login" : "Signup"}</h2>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleSubmit}>{isLogin ? "Login" : "Signup"}</Button>
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <span style={{ color: "#667eea", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </Card>
      </Container>
    );
  }

  // --- Step 2: Onboarding ---
 if (step === 2) {
  return (
    <Onboarding 
      userEmail={email} 
      onComplete={() => setStep(3)} // This is the trigger!
    />
  );
}

  // --- Step 3: Assessment ---
  if (step === 3) {
    return <Assessment userEmail={email} />;
  }
}

export default App;