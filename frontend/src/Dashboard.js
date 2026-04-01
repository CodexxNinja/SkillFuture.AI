import styled, { keyframes } from "styled-components";

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
  from { width: 0%; }
  to { width: var(--w); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const countUp = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
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

const DashGrid = styled.div`
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  animation: ${fadeIn} 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

// --- BASE CARD ---
const Card = styled.div`
  background: rgba(9, 9, 11, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: ${props => props.compact ? '20px 24px' : '24px 28px'};
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0;
`;

// --- HEADER CARD ---
const HeaderCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  background: #0a0a0d;
  padding: 24px 28px;
`;

const HeaderLeft = styled.div``;

const DashTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.04em;
  margin-bottom: 4px;
`;

const DashSubtitle = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  color: #52525b;
`;

const LevelBadge = styled.div`
  background: ${props =>
    props.level === 'Advanced' ? 'rgba(16,185,129,0.12)' :
    props.level === 'Intermediate' ? 'rgba(245,158,11,0.12)' :
    'rgba(96,165,250,0.12)'
  };
  border: 1px solid ${props =>
    props.level === 'Advanced' ? 'rgba(16,185,129,0.3)' :
    props.level === 'Intermediate' ? 'rgba(245,158,11,0.3)' :
    'rgba(96,165,250,0.3)'
  };
  color: ${props =>
    props.level === 'Advanced' ? '#10b981' :
    props.level === 'Intermediate' ? '#f59e0b' :
    '#60a5fa'
  };
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: currentColor;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

// --- STATS ROW ---
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 20px;
`;

const StatValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${props => props.color || '#fafafa'};
  animation: ${countUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0;
`;

const StatLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #52525b;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

// --- SCORE RING (SVG based) ---
const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const RingWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  flex-shrink: 0;

  svg { transform: rotate(-90deg); }
`;

const RingText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;

  .pct {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fafafa;
    letter-spacing: -0.04em;
  }
  .lbl {
    font-size: 0.6rem;
    color: #52525b;
    font-family: 'Fira Code', monospace;
  }
`;

const ScoreMeta = styled.div`
  flex: 1;
`;

const ScoreTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fafafa;
  margin-bottom: 8px;
`;

const ScoreDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: #71717a;
  line-height: 1.6;
`;

// --- SECTION TITLE ---
const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e4e4e7;
    letter-spacing: -0.02em;
  }

  span {
    font-family: 'Fira Code', monospace;
    font-size: 0.65rem;
    color: #3f3f46;
  }
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.05);
`;

// --- AREA ITEMS ---
const AreaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AreaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: ${props => props.strong ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)'};
  border: 1px solid ${props => props.strong ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};
  border-radius: 8px;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.06}s;
  opacity: 0;
`;

const AreaDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.strong ? '#10b981' : '#ef4444'};
  flex-shrink: 0;
`;

const AreaText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #a1a1aa;
  line-height: 1.4;
`;

// --- TWO COLUMN ---
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

// --- RECOMMENDED PATH CARD ---
const PathCard = styled(Card)`
  background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(4,120,87,0.04) 100%);
  border-color: rgba(16,185,129,0.15);
`;

const PathLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
`;

const PathTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
`;

const PathDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: #71717a;
  line-height: 1.6;
`;

// --- ROADMAP STEPS ---
const RoadmapList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const RoadmapItem = styled.div`
  display: flex;
  gap: 14px;
  position: relative;
`;

const RoadmapLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const RoadmapDot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props => props.active ? 'rgba(16,185,129,0.15)' : '#18181b'};
  border: 1.5px solid ${props => props.active ? '#10b981' : '#27272a'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.6rem;
  color: ${props => props.active ? '#10b981' : '#3f3f46'};
`;

const RoadmapConnector = styled.div`
  width: 1px;
  flex: 1;
  min-height: 16px;
  background: #1f1f23;
  margin: 2px 0;
`;

const RoadmapContent = styled.div`
  padding: 2px 0 18px;
`;

const RoadmapTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.active ? '#e4e4e7' : '#52525b'};
  margin-bottom: 2px;
`;

const RoadmapSub = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #3f3f46;
`;

// --- JOB READINESS ---
const ReadinessMeter = styled.div`
  margin-top: 12px;
`;

const MeterRow = styled.div`
  margin-bottom: 12px;
`;

const MeterLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #a1a1aa;

  span { color: #52525b; font-family: 'Fira Code', monospace; font-size: 0.7rem; }
`;

const MeterTrack = styled.div`
  height: 4px;
  background: #1c1c1f;
  border-radius: 99px;
  overflow: hidden;
`;

const MeterFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: ${props =>
    props.value >= 70 ? 'linear-gradient(90deg, #10b981, #34d399)' :
    props.value >= 40 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
    'linear-gradient(90deg, #ef4444, #f87171)'
  };
  border-radius: 99px;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
`;

// --- NEXT ACTIONS ---
const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: #111114;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.08}s;
  opacity: 0;
`;

const ActionIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #d4d4d8;
  margin-bottom: 2px;
`;

const ActionDesc = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.73rem;
  color: #52525b;
  line-height: 1.4;
`;

// --- COMPONENT ---
function ScoreRing({ percentage }) {
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const filled = (percentage / 100) * circumference;
  const color = percentage >= 70 ? '#10b981' : percentage >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <RingWrapper>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#1c1c1f" strokeWidth="8" />
        <circle
          cx="55" cy="55" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <RingText>
        <span className="pct">{Math.round(percentage)}%</span>
        <span className="lbl">score</span>
      </RingText>
    </RingWrapper>
  );
}

function getRoadmap(level) {
  if (level === 'Beginner') return [
    { label: '01', title: 'Python Fundamentals', sub: 'Variables, loops, functions', active: true },
    { label: '02', title: 'OOP Concepts', sub: 'Classes, inheritance, encapsulation', active: false },
    { label: '03', title: 'Data Structures', sub: 'Lists, dicts, sets, queues', active: false },
    { label: '04', title: 'Mini Projects', sub: 'Build 2-3 practical apps', active: false },
  ];
  if (level === 'Intermediate') return [
    { label: '01', title: 'REST API Design', sub: 'Flask / FastAPI endpoints', active: true },
    { label: '02', title: 'Database Integration', sub: 'MongoDB, SQL basics', active: false },
    { label: '03', title: 'Auth & Security', sub: 'JWT, hashing, middleware', active: false },
    { label: '04', title: 'Deployment', sub: 'Docker, cloud basics', active: false },
  ];
  return [
    { label: '01', title: 'System Design', sub: 'Scalability, load balancing', active: true },
    { label: '02', title: 'Microservices', sub: 'Service mesh, event driven', active: false },
    { label: '03', title: 'CI/CD Pipelines', sub: 'GitHub Actions, Jenkins', active: false },
    { label: '04', title: 'Open Source', sub: 'Contribute to real projects', active: false },
  ];
}

function getReadinessMetrics(percentage) {
  return [
    { label: 'Technical Knowledge', value: Math.min(100, Math.round(percentage * 0.9)) },
    { label: 'Problem Solving', value: Math.min(100, Math.round(percentage * 1.05)) },
    { label: 'Code Quality', value: Math.min(100, Math.round(percentage * 0.85)) },
    { label: 'Industry Readiness', value: Math.min(100, Math.round(percentage * 0.75)) },
  ];
}

function getNextActions(level) {
  if (level === 'Beginner') return [
    { icon: '📚', title: 'Start Python Fundamentals Module', desc: 'Estimated 2 weeks · 10 hands-on exercises' },
    { icon: '🛠', title: 'Complete your first CLI project', desc: 'Build a task manager using Python basics' },
    { icon: '🔗', title: 'Update your GitHub profile', desc: 'Add a README and pin your best repositories' },
  ];
  if (level === 'Intermediate') return [
    { icon: '⚡', title: 'Build a REST API with Flask', desc: 'Industry-level task · CRUD + auth endpoints' },
    { icon: '🗄', title: 'Connect MongoDB to your project', desc: 'Schema design and query optimization' },
    { icon: '🚀', title: 'Deploy to a cloud provider', desc: 'Railway / Render · Free tier available' },
  ];
  return [
    { icon: '🧩', title: 'Architect a distributed system', desc: 'Design for 1M req/day · include caching layer' },
    { icon: '🔬', title: 'Contribute to open source', desc: 'Find a project matching your stack on GitHub' },
    { icon: '🎯', title: 'Mock interview preparation', desc: 'System design + DSA — aim for FAANG-level' },
  ];
}

function Dashboard({ data }) {
  if (!data) return (
    <PageWrapper>
      <div style={{ color: '#52525b', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>
        No data available.
      </div>
    </PageWrapper>
  );

  const roadmap = getRoadmap(data.level);
  const metrics = getReadinessMetrics(data.percentage);
  const actions = getNextActions(data.level);

  return (
    <PageWrapper>
      <DashGrid>

        {/* HEADER */}
        <HeaderCard delay={0}>
          <HeaderLeft>
            <DashTitle>Assessment Complete</DashTitle>
            <DashSubtitle>result compiled · {data.timestamp || new Date().toLocaleDateString()}</DashSubtitle>
          </HeaderLeft>
          <LevelBadge level={data.level}>{data.level}</LevelBadge>
        </HeaderCard>

        {/* STATS */}
        <StatsRow>
          <StatCard delay={0.1} compact>
            <StatValue color="#fafafa" delay={0.3}>{data.score}</StatValue>
            <StatLabel>Correct Answers</StatLabel>
          </StatCard>
          <StatCard delay={0.15} compact>
            <StatValue color={data.percentage >= 70 ? '#10b981' : data.percentage >= 40 ? '#f59e0b' : '#ef4444'} delay={0.35}>
              {Math.round(data.percentage)}%
            </StatValue>
            <StatLabel>Score</StatLabel>
          </StatCard>
          <StatCard delay={0.2} compact>
            <StatValue color="#60a5fa" delay={0.4}>{data.total}</StatValue>
            <StatLabel>Total Questions</StatLabel>
          </StatCard>
        </StatsRow>

        {/* SCORE + PATH */}
        <TwoCol>
          <Card delay={0.25}>
            <SectionTitle>
              <h2>Performance Overview</h2>
              <Divider />
            </SectionTitle>
            <ScoreSection>
              <ScoreRing percentage={data.percentage} />
              <ScoreMeta>
                <ScoreTitle>You scored {Math.round(data.percentage)}%</ScoreTitle>
                <ScoreDesc>
                  {data.percentage >= 70
                    ? "Excellent work. You demonstrate strong command of Python fundamentals and are ready for advanced challenges."
                    : data.percentage >= 40
                    ? "Good foundation. A few targeted areas need reinforcement before you're industry-ready."
                    : "You're at the start of your journey. Focus on the fundamentals — consistent practice will get you there."
                  }
                </ScoreDesc>
              </ScoreMeta>
            </ScoreSection>
          </Card>

          <PathCard delay={0.3}>
            <PathLabel>Recommended Path</PathLabel>
            <PathTitle>{data.recommended_domain}</PathTitle>
            <PathDesc>
              Based on your assessment results, this learning track is optimized for your current skill level and will maximize your job readiness in the shortest time.
            </PathDesc>
          </PathCard>
        </TwoCol>

        {/* STRONG + WEAK */}
        <TwoCol>
          <Card delay={0.35}>
            <SectionTitle>
              <h2>Strong Areas</h2>
              <span>·</span>
              <span>{data.strong_areas.length} topics</span>
              <Divider />
            </SectionTitle>
            <AreaList>
              {data.strong_areas.length > 0 ? data.strong_areas.map((item, i) => (
                <AreaItem key={i} strong index={i}>
                  <AreaDot strong />
                  <AreaText>{item}</AreaText>
                </AreaItem>
              )) : (
                <AreaText style={{ color: '#3f3f46', fontFamily: 'Fira Code, monospace', fontSize: '0.75rem' }}>
                  No strong areas recorded.
                </AreaText>
              )}
            </AreaList>
          </Card>

          <Card delay={0.4}>
            <SectionTitle>
              <h2>Weak Areas</h2>
              <span>·</span>
              <span>{data.weak_areas.length} topics</span>
              <Divider />
            </SectionTitle>
            <AreaList>
              {data.weak_areas.length > 0 ? data.weak_areas.map((item, i) => (
                <AreaItem key={i} index={i}>
                  <AreaDot />
                  <AreaText>{item}</AreaText>
                </AreaItem>
              )) : (
                <AreaText style={{ color: '#3f3f46', fontFamily: 'Fira Code, monospace', fontSize: '0.75rem' }}>
                  No weak areas — perfect score!
                </AreaText>
              )}
            </AreaList>
          </Card>
        </TwoCol>

        {/* ROADMAP + JOB READINESS */}
        <TwoCol>
          <Card delay={0.45}>
            <SectionTitle>
              <h2>Learning Roadmap</h2>
              <Divider />
            </SectionTitle>
            <RoadmapList>
              {roadmap.map((step, i) => (
                <RoadmapItem key={i}>
                  <RoadmapLine>
                    <RoadmapDot active={step.active}>{step.label}</RoadmapDot>
                    {i < roadmap.length - 1 && <RoadmapConnector />}
                  </RoadmapLine>
                  <RoadmapContent>
                    <RoadmapTitle active={step.active}>{step.title}</RoadmapTitle>
                    <RoadmapSub>{step.sub}</RoadmapSub>
                  </RoadmapContent>
                </RoadmapItem>
              ))}
            </RoadmapList>
          </Card>

          <Card delay={0.5}>
            <SectionTitle>
              <h2>Job Readiness Score</h2>
              <Divider />
            </SectionTitle>
            <ReadinessMeter>
              {metrics.map((m, i) => (
                <MeterRow key={i}>
                  <MeterLabel>
                    {m.label}
                    <span>{m.value}%</span>
                  </MeterLabel>
                  <MeterTrack>
                    <MeterFill value={m.value} />
                  </MeterTrack>
                </MeterRow>
              ))}
            </ReadinessMeter>
          </Card>
        </TwoCol>

        {/* NEXT ACTIONS */}
        <Card delay={0.55}>
          <SectionTitle>
            <h2>Recommended Next Actions</h2>
            <Divider />
          </SectionTitle>
          <ActionList>
            {actions.map((a, i) => (
              <ActionItem key={i} index={i}>
                <ActionIcon>{a.icon}</ActionIcon>
                <ActionContent>
                  <ActionTitle>{a.title}</ActionTitle>
                  <ActionDesc>{a.desc}</ActionDesc>
                </ActionContent>
              </ActionItem>
            ))}
          </ActionList>
        </Card>

      </DashGrid>
    </PageWrapper>
  );
}

export default Dashboard;