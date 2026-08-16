import { useEffect, useState } from "react";
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
  padding: 32px 20px 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 10;
`;

const HubGrid = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const Card = styled.div`
  background: rgba(9, 9, 11, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 24px 28px;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0;
`;

const HeaderCard = styled(Card)`
  background: #0a0a0d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 22px 28px;
`;

const HeaderLeft = styled.div``;

const HubTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.04em;
  margin-bottom: 3px;
`;

const HubSubtitle = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  color: #52525b;
`;

const BackBtn = styled.button`
  padding: 7px 16px;
  background: none;
  border: 1px solid #27272a;
  border-radius: 8px;
  color: #71717a;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { border-color: #10b981; color: #10b981; }
`;

const RefreshBtn = styled.button`
  padding: 9px 18px;
  background: #10b981;
  border: none;
  border-radius: 8px;
  color: #09090b;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { background: #34d399; transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

// --- PROGRESS SUMMARY ---
const ProgressBarOuter = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.06);
  border-radius: 6px;
  overflow: hidden;
  margin-top: 10px;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, #10b981, #34d399);
  width: ${props => props.pct || 0}%;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  color: #a1a1aa;
`;

// --- TASK GRID ---
const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const TaskCard = styled.div`
  background: rgba(9, 9, 11, 0.92);
  border: 1px solid ${props => props.status === 'completed' ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.06)'};
  border-radius: 14px;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0;
  transition: border-color 0.2s ease;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 160px;
  background: #000 url(${props => props.src}) center/cover no-repeat;
  position: relative;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%);
  }
`;

const PlayIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.2s ease;
  ${Thumbnail}:hover & { background: #10b981; }
`;

const TaskBody = styled.div`
  padding: 18px 20px 20px;
`;

const TopicRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 8px;
`;

const TopicTag = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #10b981;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.25);
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
`;

const StatusPill = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${props =>
    props.status === 'completed' ? 'rgba(16,185,129,0.12)' :
    props.status === 'in_progress' ? 'rgba(245,158,11,0.12)' :
    'rgba(113,113,122,0.12)'};
  color: ${props =>
    props.status === 'completed' ? '#10b981' :
    props.status === 'in_progress' ? '#f59e0b' :
    '#a1a1aa'};
  &::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: currentColor;
    animation: ${props => props.status === 'in_progress' ? pulse : 'none'} 2s infinite;
  }
`;

const VideoTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 4px;
  line-height: 1.35;
`;

const VideoChannel = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #52525b;
  margin-bottom: 14px;
`;

const ChallengeBox = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 16px;
`;

const ChallengeLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  color: #3f3f46;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
`;

const ChallengeText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: #a1a1aa;
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 9px 0;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.active ? 'transparent' : '#27272a'};
  background: ${props => props.active ? props.color || '#10b981' : 'none'};
  color: ${props => props.active ? '#09090b' : '#71717a'};
  &:hover { border-color: ${props => props.color || '#10b981'}; color: ${props => props.active ? '#09090b' : props.color || '#10b981'}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// --- EMPTY / LOADING STATES ---
const CenteredState = styled.div`
  min-height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
`;

const StateText = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #71717a;
  max-width: 380px;
  line-height: 1.6;
`;

const SpinnerDots = styled.div`
  display: flex;
  gap: 6px;
  span {
    width: 8px; height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: ${pulse} 1.2s infinite ease-in-out;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const GenerateBtn = styled(RefreshBtn)`
  padding: 11px 24px;
`;

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────
function LearningHub({ userEmail, onBack }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchTasks = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/get_tasks?email=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || []);
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg("Could not load tasks. Is the backend running?");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const handleGenerate = async () => {
    setGenerating(true);
    setErrorMsg("");
    try {
      const res = await fetch(`http://127.0.0.1:5000/generate_tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Could not generate tasks.");
      } else {
        setTasks(data.tasks || []);
      }
    } catch (e) {
      setErrorMsg("Connection refused. Is the Python backend active?");
    } finally {
      setGenerating(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingId(taskId);
    try {
      const res = await fetch(`http://127.0.0.1:5000/update_task_status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, task_id: taskId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data.tasks || []);
      }
    } catch (e) {
      setErrorMsg("Could not update task. Check your connection.");
    } finally {
      setUpdatingId(null);
    }
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <PageWrapper>
        <CenteredState>
          <SpinnerDots><span /><span /><span /></SpinnerDots>
          <StateText>Loading your learning tasks...</StateText>
        </CenteredState>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <HubGrid>
        <HeaderCard delay={0}>
          <HeaderLeft>
            <HubTitle>Learning Hub</HubTitle>
            <HubSubtitle>Targeted tasks generated from your assessment gaps</HubSubtitle>
          </HeaderLeft>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <RefreshBtn onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating..." : "Refresh Tasks"}
            </RefreshBtn>
            <BackBtn onClick={onBack}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Dashboard
            </BackBtn>
          </div>
        </HeaderCard>

        {errorMsg && (
          <Card delay={0.05} style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
            <StateText style={{ color: '#fca5a5', margin: 0 }}>{errorMsg}</StateText>
          </Card>
        )}

        {tasks.length > 0 && (
          <Card delay={0.08}>
            <ProgressLabel>
              <span>{completedCount} of {tasks.length} tasks completed</span>
              <span>{progressPct}%</span>
            </ProgressLabel>
            <ProgressBarOuter>
              <ProgressBarInner pct={progressPct} />
            </ProgressBarOuter>
          </Card>
        )}

        {tasks.length === 0 ? (
          <Card delay={0.1}>
            <CenteredState style={{ minHeight: '30vh' }}>
              <StateText>
                No tasks yet. Generate a personalized set of learning tasks based on the weak areas from your latest assessment.
              </StateText>
              <GenerateBtn onClick={handleGenerate} disabled={generating}>
                {generating ? "Generating..." : "Generate My Tasks"}
              </GenerateBtn>
            </CenteredState>
          </Card>
        ) : (
          <TaskGrid>
            {tasks.map((task, i) => (
              <TaskCard key={task.id} status={task.status} delay={0.12 + i * 0.05}>
                {task.video ? (
                  <Thumbnail
                    src={task.video.thumbnail}
                    clickable
                    onClick={() => window.open(task.video.url, "_blank", "noopener,noreferrer")}
                  >
                    <PlayIcon>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </PlayIcon>
                  </Thumbnail>
                ) : (
                  <Thumbnail src="" style={{ background: '#0f0f12' }} />
                )}
                <TaskBody>
                  <TopicRow>
                    <TopicTag>{task.topic}</TopicTag>
                    <StatusPill status={task.status}>
                      {task.status === 'completed' ? 'Completed' : task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </StatusPill>
                  </TopicRow>

                  {task.video ? (
                    <>
                      <VideoTitle>{task.video.title}</VideoTitle>
                      <VideoChannel>{task.video.channel}</VideoChannel>
                    </>
                  ) : (
                    <VideoTitle style={{ color: '#52525b', fontWeight: 400, fontStyle: 'italic' }}>
                      No video found for this topic
                    </VideoTitle>
                  )}

                  <ChallengeBox>
                    <ChallengeLabel>Hands-on Challenge</ChallengeLabel>
                    <ChallengeText>{task.challenge}</ChallengeText>
                  </ChallengeBox>

                  <ActionRow>
                    <ActionBtn
                      active={task.status === 'in_progress'}
                      color="#f59e0b"
                      disabled={updatingId === task.id}
                      onClick={() => handleStatusChange(task.id, task.status === 'in_progress' ? 'pending' : 'in_progress')}
                    >
                      {task.status === 'in_progress' ? 'Mark Pending' : 'Start'}
                    </ActionBtn>
                    <ActionBtn
                      active={task.status === 'completed'}
                      color="#10b981"
                      disabled={updatingId === task.id}
                      onClick={() => handleStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                    >
                      {task.status === 'completed' ? 'Completed ✓' : 'Mark Done'}
                    </ActionBtn>
                  </ActionRow>
                </TaskBody>
              </TaskCard>
            ))}
          </TaskGrid>
        )}
      </HubGrid>
    </PageWrapper>
  );
}

export default LearningHub;