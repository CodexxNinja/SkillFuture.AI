import { useState } from "react";
import styled, { keyframes } from "styled-components";
import "./App.css";
import Assessment from "./Assessment";
import Onboarding from "./Onboarding";

// --- ULTRA PREMIUM ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.1); }
  50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.2); }
  100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.1); }
`;

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

// --- LEFT PANEL (AUTH) ---
const AuthSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 10;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 360px;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10B981 0%, #047857 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    background: #09090b;
    border-radius: 2px;
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: #fff;
`;

const FormHeader = styled.h2`
  font-size: 1.85rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin-bottom: 8px;
  color: #fafafa;
`;

const FormSubtext = styled.p`
  color: #a1a1aa;
  font-size: 0.95rem;
  margin-bottom: 32px;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 500;
  color: #d4d4d8;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 8px;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &::placeholder { color: #52525b; }

  &:focus {
    outline: none;
    border-color: #10B981;
    background: #09090b;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: #fafafa;
  color: #09090b;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover { background: #e4e4e7; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

const ErrorBanner = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  display: ${props => (props.show ? "block" : "none")};
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const ToggleText = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 0.9rem;
  color: #a1a1aa;

  span {
    color: #10B981;
    font-weight: 500;
    cursor: pointer;
    margin-left: 6px;
    transition: color 0.2s;
    &:hover { color: #34d399; }
  }
`;

// --- RIGHT PANEL (TERMINAL / BRAND) ---
const BrandSection = styled.div`
  flex: 1.4;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (min-width: 900px) {
    display: flex;
  }
`;

const TerminalWindow = styled.div`
  width: 85%;
  max-width: 600px;
  background: #000000;
  border: 1px solid #27272a;
  border-radius: 12px;
  overflow: hidden;
  animation: ${glowPulse} 4s infinite;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const TerminalHeader = styled.div`
  background: #18181b;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #27272a;
  gap: 8px;

  .dot {
    width: 12px; height: 12px; border-radius: 50%;
  }
  .red { background: #ef4444; }
  .yellow { background: #f59e0b; }
  .green { background: #10b981; }
  
  .title {
    margin-left: auto;
    margin-right: auto;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: #a1a1aa;
    font-weight: 500;
  }
`;

const TerminalBody = styled.div`
  padding: 24px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #a1a1aa;
  min-height: 250px;
`;

const LogLine = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  margin-bottom: 8px;

  .highlight { color: #10B981; }
  .string { color: #60a5fa; }
  .warn { color: #f59e0b; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  background: #10B981;
  vertical-align: middle;
  margin-left: 4px;
  animation: ${blink} 1s step-end infinite;
`;

// --- MAIN APP COMPONENT ---

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Authentication credentials required.");
      return;
    }

    const endpoint = isLogin ? "/login" : "/signup";
    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStep(2); 
      } else {
        setErrorMsg(data.message || "Authentication failed.");
      }
    } catch (error) {
      setErrorMsg("Connection refused. Is the Python backend active?");
    }
  };

  if (step === 1) {
    return (
      <>
        <div className="cyber-grid"></div>
        <PageWrapper>
          <AuthSection>
            <AuthContainer>
              <LogoContainer>
                <LogoIcon />
                <LogoText>SkillFuture.AI</LogoText>
              </LogoContainer>
              
              <FormHeader>{isLogin ? "System Login" : "Initialize Account"}</FormHeader>
              <FormSubtext>
                {isLogin 
                  ? "Authenticate to resume your enterprise training modules." 
                  : "Bridge the gap between theory and industry reality."}
              </FormSubtext>

              <ErrorBanner show={!!errorMsg}>{errorMsg}</ErrorBanner>

              <FormGroup>
                <Label>Email <span style={{color: '#52525b'}}>*</span></Label>
                <Input 
                  type="email" 
                  placeholder="developer@college.edu" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Password 
                  {isLogin && <span style={{color: '#10B981', cursor: 'pointer', fontSize: '0.75rem'}}>Reset</span>}
                </Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </FormGroup>

              <PrimaryButton onClick={handleSubmit}>
                {isLogin ? "Authenticate" : "Deploy Environment"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </PrimaryButton>

              <ToggleText>
                {isLogin ? "Unregistered?" : "System active?"}
                <span onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}>
                  {isLogin ? "Create account" : "Log in"}
                </span>
              </ToggleText>
            </AuthContainer>
          </AuthSection>

          <BrandSection>
            <TerminalWindow>
              <TerminalHeader>
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <div className="title">skillfuture-ai-engine ~ root</div>
              </TerminalHeader>
              <TerminalBody>
                <LogLine delay={0.5}>[SYSTEM] Analyzing candidate profile matrix...</LogLine>
                <LogLine delay={1.5}>[AUTH] GitHub connected. <span className="highlight">Status: Valid</span></LogLine>
                <LogLine delay={2.5}>[AI_ENGINE] Evaluating backend proficiency...</LogLine>
                <LogLine delay={4.0}>[ASSIGNMENT] Formulating real-world application.</LogLine>
                <LogLine delay={5.0} style={{marginTop: '16px'}}>
                  <span className="warn">► TARGET DOMAIN:</span> Industrial Safety & Compliance
                </LogLine>
                <LogLine delay={6.0}>
                  <span className="warn">► SCENARIO:</span> Build a <span className="string">"Smart Visitor Pre-Authorization System"</span>.
                </LogLine>
                <LogLine delay={7.5}>
                  <span className="warn">► REQUIREMENT:</span> Develop robust API endpoints to manage security protocols and compliance checks for industrial premises.
                </LogLine>
                <LogLine delay={9.0} style={{marginTop: '16px', color: '#10B981'}}>
                  Ready to deploy sandbox environment.<Cursor />
                </LogLine>
              </TerminalBody>
            </TerminalWindow>
          </BrandSection>
        </PageWrapper>
      </>
    );
  }

  // Fallbacks for step 2 & 3 to keep the background active
  if (step === 2) {
    return (
      <>
        <div className="cyber-grid"></div>
        <PageWrapper style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <Onboarding userEmail={email} onComplete={() => setStep(3)} />
        </PageWrapper>
      </>
    );
  }

  if (step === 3) {
    return (
      <>
        <div className="cyber-grid"></div>
        <PageWrapper style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <Assessment userEmail={email} />
        </PageWrapper>
      </>
    );
  }
}

export default App;
