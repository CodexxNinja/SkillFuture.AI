import { useState } from "react";
import styled, { keyframes } from "styled-components";

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

// --- LAYOUT ---
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 10;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 680px;
  background: rgba(9, 9, 11, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5);
`;

// --- HEADER ---
const FormHeader = styled.div`
  padding: 28px 32px 24px;
  background: #0a0a0d;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.03em;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  color: #52525b;
`;

const StepBadge = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

// --- PROGRESS ---
const ProgressBar = styled.div`
  height: 3px;
  background: #1c1c1f;
  border-radius: 99px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percent}%;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 99px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #3f3f46;
`;

// --- STEP TABS ---
const StepTabs = styled.div`
  display: flex;
  gap: 4px;
  padding: 16px 32px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  overflow-x: auto;
  &::-webkit-scrollbar { display: none; }
`;

const StepTab = styled.button`
  padding: 8px 14px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#10b981' : 'transparent'};
  color: ${props => props.active ? '#10b981' : props.done ? '#52525b' : '#3f3f46'};
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  margin-bottom: -1px;

  &:hover { color: ${props => props.active ? '#10b981' : '#a1a1aa'}; }
`;

// --- BODY ---
const FormBody = styled.div`
  padding: 28px 32px;
`;

const Section = styled.div`
  animation: ${fadeIn} 0.4s ease forwards;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;

  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #e4e4e7;
    letter-spacing: -0.01em;
  }

  .tag {
    font-family: 'Fira Code', monospace;
    font-size: 0.62rem;
    color: #3f3f46;
    background: #18181b;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

// --- GRID ---
const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols === 2 ? '1fr 1fr' : '1fr'};
  gap: 14px;
  margin-bottom: 14px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

// --- FIELD ---
const FieldWrapper = styled.div``;

const FieldLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #a1a1aa;
  margin-bottom: 6px;
`;

const baseInputStyle = `
  width: 100%;
  padding: 10px 14px;
  background: #111114;
  border: 1px solid #27272a;
  border-radius: 8px;
  color: #fafafa;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  outline: none;
  
  &::placeholder { color: #3f3f46; }
  
  &:focus {
    border-color: #10b981;
    background: #0d0d10;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const StyledInput = styled.input`${baseInputStyle}`;
const StyledSelect = styled.select`
  ${baseInputStyle}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2352525b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;

  option { background: #18181b; color: #fafafa; }
`;
const StyledTextarea = styled.textarea`
  ${baseInputStyle}
  height: 80px;
  resize: vertical;
  line-height: 1.5;
`;

// --- RATING SLIDER ---
const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 14px;
`;

const RatingRow = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr 24px;
  align-items: center;
  gap: 12px;
`;

const RatingLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #a1a1aa;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  background: linear-gradient(to right, #10b981 0%, #10b981 ${props => (props.value - 1) * 25}%, #27272a ${props => (props.value - 1) * 25}%, #27272a 100%);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #10b981;
    cursor: pointer;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.2);
    transition: box-shadow 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 5px rgba(16,185,129,0.25);
  }
`;

const RatingValue = styled.span`
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #10b981;
  text-align: right;
`;

// --- NAV ---
const FormFooter = styled.div`
  padding: 20px 32px 28px;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: none;
  border: 1px solid #27272a;
  border-radius: 8px;
  color: #71717a;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { border-color: #3f3f46; color: #a1a1aa; }
  &:disabled { opacity: 0; pointer-events: none; }
`;

const NextButton = styled.button`
  padding: 10px 24px;
  background: #fafafa;
  color: #09090b;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover { background: #e4e4e7; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

// --- STEPS CONFIG ---
const STEPS = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'skills', label: 'Skills' },
  { id: 'career', label: 'Career' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'behavior', label: 'Behavior' },
];

function Onboarding({ userEmail, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: userEmail,
    name: "", college: "", year: "", degree: "",
    skills: "", experience_level: "", projects: "",
    domain: "", goal: "",
    github: "", linkedin: "",
    coding: 1, debugging: 1, problem_solving: 1,
    learning_style: "", daily_hours: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        onComplete();
      } else {
        alert("Failed to save profile: " + data.message);
      }
    } catch {
      alert("Error connecting to server");
    }
  };

  const isLast = currentStep === STEPS.length - 1;
  const progressPercent = Math.round(((currentStep + 1) / STEPS.length) * 100);

  const renderStep = () => {
    switch (currentStep) {
      case 0: return (
        <Section>
          <SectionTitle>
            <h3>Basic Information</h3>
            <span className="tag">step 1/5</span>
          </SectionTitle>
          <FieldGrid cols={2}>
            <FieldWrapper>
              <FieldLabel>Full Name</FieldLabel>
              <StyledInput name="name" placeholder="e.g. Riya Sharma" value={formData.name} onChange={handleChange} />
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>College / University</FieldLabel>
              <StyledInput name="college" placeholder="e.g. VIT Pune" value={formData.college} onChange={handleChange} />
            </FieldWrapper>
          </FieldGrid>
          <FieldGrid cols={2}>
            <FieldWrapper>
              <FieldLabel>Degree</FieldLabel>
              <StyledInput name="degree" placeholder="BTech, MCA, BCA..." value={formData.degree} onChange={handleChange} />
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Year</FieldLabel>
              <StyledSelect name="year" value={formData.year} onChange={handleChange}>
                <option value="">Select Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Passout</option>
              </StyledSelect>
            </FieldWrapper>
          </FieldGrid>
        </Section>
      );

      case 1: return (
        <Section>
          <SectionTitle>
            <h3>Skills & Experience</h3>
            <span className="tag">step 2/5</span>
          </SectionTitle>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Technical Skills</FieldLabel>
              <StyledInput name="skills" placeholder="Python, JavaScript, React, SQL..." value={formData.skills} onChange={handleChange} />
            </FieldWrapper>
          </FieldGrid>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Experience Level</FieldLabel>
              <StyledSelect name="experience_level" value={formData.experience_level} onChange={handleChange}>
                <option value="">Select Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </StyledSelect>
            </FieldWrapper>
          </FieldGrid>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Project Experience</FieldLabel>
              <StyledTextarea name="projects" placeholder="Describe your projects — tech stack, what you built, impact..." value={formData.projects} onChange={handleChange} />
            </FieldWrapper>
          </FieldGrid>

          <SectionTitle style={{ marginTop: '8px' }}>
            <h3>Self Rating</h3>
            <span className="tag">1–5 scale</span>
          </SectionTitle>
          <RatingWrapper>
            {[
              { name: 'coding', label: 'Coding' },
              { name: 'debugging', label: 'Debugging' },
              { name: 'problem_solving', label: 'Problem Solving' },
            ].map(({ name, label }) => (
              <RatingRow key={name}>
                <RatingLabel>{label}</RatingLabel>
                <Slider
                  type="range" min="1" max="5"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
                <RatingValue>{formData[name]}</RatingValue>
              </RatingRow>
            ))}
          </RatingWrapper>
        </Section>
      );

      case 2: return (
        <Section>
          <SectionTitle>
            <h3>Career Goals</h3>
            <span className="tag">step 3/5</span>
          </SectionTitle>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Domain Interest</FieldLabel>
              <StyledSelect name="domain" value={formData.domain} onChange={handleChange}>
                <option value="">Select Domain</option>
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>Full Stack</option>
                <option>AI / ML</option>
                <option>DevOps / Cloud</option>
                <option>Data Engineering</option>
              </StyledSelect>
            </FieldWrapper>
          </FieldGrid>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Goal</FieldLabel>
              <StyledInput name="goal" placeholder="Job, Internship, Freelance, Upskilling..." value={formData.goal} onChange={handleChange} />
            </FieldWrapper>
          </FieldGrid>
        </Section>
      );

      case 3: return (
        <Section>
          <SectionTitle>
            <h3>Online Profiles</h3>
            <span className="tag">step 4/5</span>
          </SectionTitle>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>GitHub URL</FieldLabel>
              <StyledInput name="github" placeholder="https://github.com/username" value={formData.github} onChange={handleChange} />
            </FieldWrapper>
          </FieldGrid>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>LinkedIn URL</FieldLabel>
              <StyledInput name="linkedin" placeholder="https://linkedin.com/in/username" value={formData.linkedin} onChange={handleChange} />
            </FieldWrapper>
          </FieldGrid>
        </Section>
      );

      case 4: return (
        <Section>
          <SectionTitle>
            <h3>Learning Behavior</h3>
            <span className="tag">step 5/5</span>
          </SectionTitle>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Preferred Learning Style</FieldLabel>
              <StyledSelect name="learning_style" value={formData.learning_style} onChange={handleChange}>
                <option value="">Select Style</option>
                <option>Video Tutorials</option>
                <option>Hands-on Practice</option>
                <option>Reading Docs</option>
                <option>Mixed</option>
              </StyledSelect>
            </FieldWrapper>
          </FieldGrid>
          <FieldGrid>
            <FieldWrapper>
              <FieldLabel>Daily Study Time</FieldLabel>
              <StyledSelect name="daily_hours" value={formData.daily_hours} onChange={handleChange}>
                <option value="">Select Duration</option>
                <option>1–2 hours</option>
                <option>3–5 hours</option>
                <option>5+ hours</option>
              </StyledSelect>
            </FieldWrapper>
          </FieldGrid>
        </Section>
      );

      default: return null;
    }
  };

  return (
    <PageWrapper>
      <FormCard>
        <FormHeader>
          <HeaderRow>
            <div>
              <Title>Profile Setup</Title>
              <Subtitle>user: {userEmail}</Subtitle>
            </div>
            <StepBadge>Onboarding</StepBadge>
          </HeaderRow>
          <ProgressBar>
            <ProgressFill percent={progressPercent} />
          </ProgressBar>
          <ProgressMeta>
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{progressPercent}%</span>
          </ProgressMeta>
        </FormHeader>

        <StepTabs>
          {STEPS.map((s, i) => (
            <StepTab
              key={s.id}
              active={i === currentStep}
              done={i < currentStep}
              onClick={() => i <= currentStep && setCurrentStep(i)}
            >
              {i < currentStep ? '✓ ' : ''}{s.label}
            </StepTab>
          ))}
        </StepTabs>

        <FormBody>
          {renderStep()}
        </FormBody>

        <FormFooter>
          <BackButton disabled={currentStep === 0} onClick={() => setCurrentStep(p => p - 1)}>
            ← Back
          </BackButton>
          {isLast ? (
            <NextButton onClick={handleSubmit}>
              Submit Profile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </NextButton>
          ) : (
            <NextButton onClick={() => setCurrentStep(p => p + 1)}>
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </NextButton>
          )}
        </FormFooter>
      </FormCard>
    </PageWrapper>
  );
}

export default Onboarding;