import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Dashboard from "./Dashboard";

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const progressFill = keyframes`
  from { width: 0%; }
  to { width: var(--target-width); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// --- LAYOUT ---
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  z-index: 10;
  position: relative;
`;

const AssessmentCard = styled.div`
  width: 100%;
  max-width: 720px;
  background: rgba(9, 9, 11, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5);
`;

// --- HEADER ---
const Header = styled.div`
  padding: 28px 32px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #0a0a0d;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TitleGroup = styled.div``;

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
  font-size: 0.75rem;
  color: #52525b;
`;

const Badge = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #10b981;
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;

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
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 99px;
  width: ${props => props.percent}%;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
  color: #52525b;
`;

// --- BODY ---
const Body = styled.div`
  padding: 28px 32px;
`;

// --- QUESTION ---
const QuestionBlock = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: ${props => props.answered ? 'rgba(16,185,129,0.03)' : '#111114'};
  border: 1px solid ${props => props.answered ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)'};
  border-radius: 12px;
  transition: border-color 0.25s ease, background 0.25s ease;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.05}s;
  opacity: 0;
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const QuestionNumber = styled.span`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
`;

const QuestionText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #e4e4e7;
  font-weight: 500;
  line-height: 1.5;
`;

// --- OPTIONS ---
const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 14px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: ${props =>
    props.correct ? 'rgba(16, 185, 129, 0.1)' :
    props.wrong ? 'rgba(239, 68, 68, 0.08)' :
    props.selected ? 'rgba(255,255,255,0.06)' :
    '#18181b'
  };
  border: 1px solid ${props =>
    props.correct ? 'rgba(16, 185, 129, 0.4)' :
    props.wrong ? 'rgba(239, 68, 68, 0.3)' :
    props.selected ? 'rgba(255,255,255,0.12)' :
    'rgba(255,255,255,0.05)'
  };
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.05);
  }

  input[type="radio"] {
    appearance: none;
    width: 14px;
    height: 14px;
    border: 1.5px solid #3f3f46;
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.2s ease;
    position: relative;

    &:checked {
      border-color: #10b981;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16,185,129,0.2);
    }
  }
`;

const OptionText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: ${props => props.correct ? '#34d399' : props.wrong ? '#fca5a5' : '#d4d4d8'};
  font-weight: ${props => (props.correct || props.wrong) ? '500' : '400'};
`;

// --- FEEDBACK ---
const FeedbackBox = styled.div`
  margin-top: 14px;
  padding: 12px 14px;
  background: ${props => props.correct ? 'rgba(16, 185, 129, 0.06)' : 'rgba(239, 68, 68, 0.06)'};
  border: 1px solid ${props => props.correct ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const FeedbackIcon = styled.span`
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-top: 1px;
`;

const FeedbackText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: ${props => props.correct ? '#6ee7b7' : '#fca5a5'};
  line-height: 1.5;
`;

// --- FOOTER ---
const Footer = styled.div`
  padding: 20px 32px 28px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const AnsweredCount = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #52525b;
  span { color: #10b981; }
`;

const SubmitButton = styled.button`
  padding: 12px 28px;
  background: ${props => props.disabled ? '#18181b' : '#fafafa'};
  color: ${props => props.disabled ? '#52525b' : '#09090b'};
  border: 1px solid ${props => props.disabled ? '#27272a' : 'transparent'};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #e4e4e7;
    transform: translateY(-1px);
  }
`;

// --- LOADING ---
const LoadingState = styled.div`
  padding: 60px 32px;
  text-align: center;
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;

  span {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: ${pulse} 1.2s infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const LoadingText = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #52525b;
`;

// --- COMPONENT ---
function Assessment({ userEmail }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_questions")
      .then(res => res.json())
      .then(data => { setQuestions(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, answers }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Error submitting assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) return <Dashboard data={result} />;

  const answeredCount = Object.keys(answers).length;
  const percent = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;

  return (
    <PageWrapper>
      <AssessmentCard>
        <Header>
          <HeaderTop>
            <TitleGroup>
              <Title>Skill Assessment</Title>
              <Subtitle>user: {userEmail}</Subtitle>
            </TitleGroup>
            <Badge>LIVE</Badge>
          </HeaderTop>
          <ProgressBar>
            <ProgressFill percent={percent} />
          </ProgressBar>
          <ProgressMeta>
            <span>{answeredCount}/{questions.length} answered</span>
            <span>{percent}% complete</span>
          </ProgressMeta>
        </Header>

        <Body>
          {loading ? (
            <LoadingState>
              <LoadingDots>
                <span /><span /><span />
              </LoadingDots>
              <LoadingText>Fetching assessment matrix...</LoadingText>
            </LoadingState>
          ) : (
            questions.map((q, index) => {
              const isAnswered = !!answers[q.id];
              const isCorrect = answers[q.id] === q.answer;

              return (
                <QuestionBlock key={q.id} answered={isAnswered} index={index}>
                  <QuestionMeta>
                    <QuestionNumber>Q{q.id}</QuestionNumber>
                  </QuestionMeta>
                  <QuestionText>{q.question}</QuestionText>

                  {q.type === "mcq" ? (
                    <>
                      <OptionsGrid>
                        {q.options.map((opt) => {
                          const isSelected = answers[q.id] === opt;
                          const showCorrect = isAnswered && opt === q.answer;
                          const showWrong = isAnswered && isSelected && !isCorrect;
                          return (
                            <OptionLabel
                              key={opt}
                              correct={showCorrect}
                              wrong={showWrong}
                              selected={isSelected}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                value={opt}
                                checked={isSelected}
                                onChange={() => handleChange(q.id, opt)}
                              />
                              <OptionText correct={showCorrect} wrong={showWrong}>
                                {opt}
                              </OptionText>
                            </OptionLabel>
                          );
                        })}
                      </OptionsGrid>

                      {isAnswered && (
                        <FeedbackBox correct={isCorrect}>
                          <FeedbackIcon>{isCorrect ? "✓" : "✗"}</FeedbackIcon>
                          <FeedbackText correct={isCorrect}>
                            <strong>{isCorrect ? "Correct." : "Incorrect."}</strong> {q.explanation}
                          </FeedbackText>
                        </FeedbackBox>
                      )}
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      style={{
                        marginTop: '12px',
                        width: '100%',
                        padding: '10px 14px',
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '8px',
                        color: '#fafafa',
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}
                </QuestionBlock>
              );
            })
          )}
        </Body>

        <Footer>
          <AnsweredCount>
            <span>{answeredCount}</span> of {questions.length} questions answered
          </AnsweredCount>
          <SubmitButton
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
          >
            {submitting ? "Analyzing..." : "Submit Assessment"}
            {!submitting && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </SubmitButton>
        </Footer>
      </AssessmentCard>
    </PageWrapper>
  );
}

export default Assessment;