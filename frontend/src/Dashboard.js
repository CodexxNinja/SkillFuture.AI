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

const countUp = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;

const barGrow = keyframes`
  from { width: 0%; }
  to { width: var(--w); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

const DashGrid = styled.div`
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
  padding: ${props => props.compact ? '18px 22px' : '24px 28px'};
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const ThreeCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

// --- HEADER CARD ---
const HeaderCard = styled(Card)`
  background: #0a0a0d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 22px 28px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #047857);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(16,185,129,0.25);
`;

const HeaderInfo = styled.div``;

const DashTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.04em;
  margin-bottom: 3px;
`;

const DashSubtitle = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  color: #52525b;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '';
    width: 6px; height: 6px;
    background: currentColor;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const LogoutBtn = styled.button`
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
  &:hover { border-color: #ef4444; color: #fca5a5; }
`;

// --- STAT CARDS ---
const StatValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${props => props.color || '#fafafa'};
  animation: ${countUp} 0.6s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StatSub = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  color: #3f3f46;
  margin-top: 2px;
`;

// --- SECTION TITLE ---
const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #e4e4e7;
    letter-spacing: -0.02em;
    white-space: nowrap;
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

// --- SCORE RING ---
const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const RingWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
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
  .pct {
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fafafa;
    letter-spacing: -0.04em;
  }
  .lbl {
    font-size: 0.58rem;
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

// --- METER BARS ---
const MeterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MeterRow = styled.div``;

const MeterLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #a1a1aa;
  span { color: ${props => props.highlight || '#52525b'}; font-family: 'Fira Code'; font-size: 0.72rem; }
`;

const MeterTrack = styled.div`
  height: 5px;
  background: #1c1c1f;
  border-radius: 99px;
  overflow: hidden;
`;

const MeterFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: ${props =>
    props.value >= 70 ? 'linear-gradient(90deg,#10b981,#34d399)' :
    props.value >= 40 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' :
    'linear-gradient(90deg,#ef4444,#f87171)'
  };
  border-radius: 99px;
  transition: width 1s cubic-bezier(0.16,1,0.3,1);
`;

// --- AREAS ---
const AreaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const AreaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  background: ${props => props.strong ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)'};
  border: 1px solid ${props => props.strong ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};
  border-radius: 8px;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.05}s;
  opacity: 0;
`;

const AreaDot = styled.div`
  width: 6px; height: 6px;
  border-radius: 50%;
  margin-top: 5px;
  background: ${props => props.strong ? '#10b981' : '#ef4444'};
  flex-shrink: 0;
`;

const AreaText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #a1a1aa;
  line-height: 1.4;
`;

// --- SKILL TAGS ---
const SkillTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const SkillTag = styled.div`
  padding: 4px 10px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  color: #a1a1aa;
  transition: all 0.2s;
`;

// --- PROFILE INFO ---
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const InfoItem = styled.div`
  padding: 10px 14px;
  background: #111114;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
`;

const InfoLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  color: #3f3f46;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: #d4d4d8;
  font-weight: 500;
`;

// --- ROADMAP ---
const RoadmapList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const RoadmapItem = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 12px;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.07}s;
  opacity: 0;
`;

const RoadmapLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoadmapDot = styled.div`
  width: 28px; height: 28px;
  border-radius: 50%;
  background: ${props => props.active ? 'rgba(16,185,129,0.15)' : '#18181b'};
  border: 1.5px solid ${props => props.active ? '#10b981' : '#27272a'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fira Code', monospace;
  font-size: 0.6rem;
  color: ${props => props.active ? '#10b981' : '#3f3f46'};
  flex-shrink: 0;
`;

const RoadmapConnector = styled.div`
  width: 1px;
  flex: 1;
  background: #27272a;
  min-height: 16px;
`;

const RoadmapContent = styled.div`
  padding-bottom: 20px;
`;

const RoadmapTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${props => props.active ? '#fafafa' : '#52525b'};
  margin-bottom: 2px;
`;

const RoadmapSub = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #3f3f46;
`;

// --- JOB TYPES ---
const JobGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const JobCard = styled.div`
  padding: 12px 14px;
  background: #111114;
  border: 1px solid #1c1c1f;
  border-radius: 10px;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.07}s;
  opacity: 0;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(16,185,129,0.2); }
`;

const JobTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 4px;
`;

const JobMeta = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  color: #52525b;
`;

const JobReadiness = styled.div`
  margin-top: 6px;
  height: 2px;
  background: #1c1c1f;
  border-radius: 99px;
  overflow: hidden;
`;

const JobReadinessFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 99px;
  transition: width 1s ease;
`;

// --- ACTIONS ---
const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 14px;
  background: #111114;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  animation: ${fadeIn} 0.4s ease forwards;
  animation-delay: ${props => props.index * 0.07}s;
  opacity: 0;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(16,185,129,0.15); }
`;

const ActionIcon = styled.div`
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 1px;
`;

const ActionContent = styled.div``;

const ActionTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 2px;
`;

const ActionDesc = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #52525b;
`;

// --- AI ANALYSIS ---
const AICard = styled(Card)`
  border-color: rgba(16,185,129,0.12);
  background: rgba(9,9,11,0.95);
`;

const AIHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const AIBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.2);
  border-radius: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #10b981;
`;

const AIGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const AISection = styled.div`
  padding: 14px;
  background: #111114;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
`;

const AISectionLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
`;

const AISectionContent = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #a1a1aa;
  line-height: 1.6;
`;

const AIItem = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  &:last-child { margin-bottom: 0; }
`;

const AIItemDot = styled.div`
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #10b981;
  flex-shrink: 0;
  margin-top: 6px;
`;

const AIReadinessSection = styled.div`
  padding: 14px;
  background: #111114;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const AIReadinessValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #10b981;
  letter-spacing: -0.05em;
  flex-shrink: 0;
`;

const AIReadinessLabel = styled.div``;

// --- PATH CARD ---
const PathCard = styled(Card)`
  background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(9,9,11,0.95) 100%);
  border-color: rgba(16,185,129,0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PathLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
`;

const PathTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
`;

const PathDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #71717a;
  line-height: 1.6;
`;

// --- LOADING ---
const LoadingSpinner = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  position: relative;
`;

const SpinnerDots = styled.div`
  display: flex;
  gap: 6px;
  span {
    width: 8px; height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: ${pulse} 1.2s infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const SpinnerText = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #52525b;
`;

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function ScoreRing({ percentage }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const filled = (Math.min(100, percentage) / 100) * circumference;
  const color = percentage >= 70 ? '#10b981' : percentage >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <RingWrapper>
      <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1c1c1f" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <RingText>
        <span className="pct">{Math.round(percentage)}%</span>
        <span className="lbl">quiz</span>
      </RingText>
    </RingWrapper>
  );
}

function getRoadmap(level, domain) {
  const roadmaps = {
    "Frontend Development": {
      Beginner: [
        { label: '01', title: 'HTML & CSS Mastery', sub: 'Layouts, Flexbox, Grid, Responsive Design', active: true },
        { label: '02', title: 'JavaScript Fundamentals', sub: 'ES6+, DOM, async/await', active: false },
        { label: '03', title: 'React Basics', sub: 'Components, hooks, state management', active: false },
        { label: '04', title: 'Build Portfolio Projects', sub: 'Showcase 3+ apps on GitHub', active: false },
      ],
      Intermediate: [
        { label: '01', title: 'Advanced React Patterns', sub: 'Context, custom hooks, performance', active: true },
        { label: '02', title: 'API Integration', sub: 'REST, Fetch, Axios, error handling', active: false },
        { label: '03', title: 'Testing & Tooling', sub: 'Jest, Vite, ESLint, CI/CD', active: false },
        { label: '04', title: 'Deploy & Ship', sub: 'Vercel / Netlify + custom domain', active: false },
      ],
      Advanced: [
        { label: '01', title: 'Frontend Architecture', sub: 'Micro-frontends, monorepos', active: true },
        { label: '02', title: 'Performance Optimization', sub: 'Core Web Vitals, lazy loading', active: false },
        { label: '03', title: 'TypeScript Deep Dive', sub: 'Advanced types, generics', active: false },
        { label: '04', title: 'Open Source & Leadership', sub: 'Contribute to React ecosystem', active: false },
      ],
    },
    "Backend Development": {
      Beginner: [
        { label: '01', title: 'Python Fundamentals', sub: 'Variables, OOP, file I/O', active: true },
        { label: '02', title: 'Flask REST APIs', sub: 'Routes, methods, JSON responses', active: false },
        { label: '03', title: 'Database Basics', sub: 'SQL + MongoDB CRUD operations', active: false },
        { label: '04', title: 'Mini Backend Project', sub: 'Auth + CRUD + deployment', active: false },
      ],
      Intermediate: [
        { label: '01', title: 'REST API Design', sub: 'CRUD, auth, error handling', active: true },
        { label: '02', title: 'MongoDB & SQL Integration', sub: 'Schemas, queries, optimization', active: false },
        { label: '03', title: 'JWT Authentication', sub: 'Tokens, hashing, middleware', active: false },
        { label: '04', title: 'Deploy to Cloud', sub: 'Railway / Render / Docker', active: false },
      ],
      Advanced: [
        { label: '01', title: 'System Design', sub: 'Scalability, load balancing, caching', active: true },
        { label: '02', title: 'Microservices', sub: 'Service mesh, event-driven arch', active: false },
        { label: '03', title: 'CI/CD Pipelines', sub: 'GitHub Actions, automated testing', active: false },
        { label: '04', title: 'Open Source Contribution', sub: 'Real-world codebases at scale', active: false },
      ],
    },
    "AIML": {
      Beginner: [
        { label: '01', title: 'Python + NumPy/Pandas', sub: 'Data manipulation basics', active: true },
        { label: '02', title: 'ML Algorithms', sub: 'Linear regression, classification', active: false },
        { label: '03', title: 'Scikit-learn Projects', sub: 'End-to-end ML pipelines', active: false },
        { label: '04', title: 'Kaggle Competitions', sub: 'Build profile + get ranked', active: false },
      ],
      Intermediate: [
        { label: '01', title: 'Deep Learning Basics', sub: 'Neural networks, CNNs, RNNs', active: true },
        { label: '02', title: 'TensorFlow / PyTorch', sub: 'Model training & evaluation', active: false },
        { label: '03', title: 'NLP Fundamentals', sub: 'Transformers, embeddings', active: false },
        { label: '04', title: 'Deploy ML Models', sub: 'Flask API + cloud hosting', active: false },
      ],
      Advanced: [
        { label: '01', title: 'Large Language Models', sub: 'Fine-tuning, RAG, prompt eng', active: true },
        { label: '02', title: 'MLOps Pipeline', sub: 'Experiment tracking, CI/ML', active: false },
        { label: '03', title: 'Research Papers', sub: 'Implement + reproduce SOTA', active: false },
        { label: '04', title: 'Production AI Systems', sub: 'Scale to millions of requests', active: false },
      ],
    },
  };
  const domainMap = roadmaps[domain] || roadmaps["Backend Development"];
  return domainMap[level] || domainMap["Beginner"];
}

function getJobTypes(domain, level) {
  const jobs = {
    "Frontend Development": [
      { title: "Junior Frontend Developer", meta: "React · CSS · JavaScript", readiness: 0 },
      { title: "React Developer", meta: "React · TypeScript · APIs", readiness: 0 },
      { title: "UI Developer", meta: "HTML · CSS · Figma", readiness: 0 },
      { title: "Full Stack Developer", meta: "React + Node.js", readiness: 0 },
    ],
    "Backend Development": [
      { title: "Junior Backend Developer", meta: "Python · REST APIs", readiness: 0 },
      { title: "API Engineer", meta: "Flask · MongoDB · Auth", readiness: 0 },
      { title: "Full Stack Developer", meta: "Python + React", readiness: 0 },
      { title: "Database Administrator", meta: "SQL · MongoDB · Optimization", readiness: 0 },
    ],
    "AIML": [
      { title: "ML Engineer", meta: "Scikit-learn · TensorFlow", readiness: 0 },
      { title: "Data Scientist", meta: "Python · Statistics · Analysis", readiness: 0 },
      { title: "AI Research Intern", meta: "Deep Learning · NLP", readiness: 0 },
      { title: "Data Analyst", meta: "Pandas · SQL · Visualization", readiness: 0 },
    ],
  };
  const readinessMap = { Beginner: [45, 30, 25, 35], Intermediate: [70, 60, 55, 65], Advanced: [90, 85, 80, 88] };
  const readinessVals = readinessMap[level] || readinessMap["Beginner"];
  const list = jobs[domain] || jobs["Backend Development"];
  return list.map((j, i) => ({ ...j, readiness: readinessVals[i] }));
}

function getNextActions(level, domain) {
  const map = {
    "Frontend Development": {
      Beginner: [
        { icon: '📚', title: 'Complete a CSS Grid + Flexbox course', desc: 'Foundation of every modern UI layout' },
        { icon: '⚡', title: 'Build your first React app', desc: 'Todo list or weather app — deploy to Vercel' },
        { icon: '🔗', title: 'Set up your GitHub profile README', desc: 'Showcase your projects with live demos' },
      ],
      Intermediate: [
        { icon: '⚡', title: 'Build a full React project with API', desc: 'CRUD app + user auth + deployed' },
        { icon: '🎯', title: 'Solve 20 LeetCode Easy problems', desc: 'Prepare for technical screening rounds' },
        { icon: '🚀', title: 'Apply to frontend internships', desc: 'Start with startups — faster interviews' },
      ],
      Advanced: [
        { icon: '🧩', title: 'Build a component library', desc: 'Publish to npm · show architectural skill' },
        { icon: '🔬', title: 'Contribute to an open-source project', desc: 'React, Next.js or Tailwind ecosystem' },
        { icon: '🎯', title: 'Target mid-level roles actively', desc: '3+ YOE equivalent — showcase impact metrics' },
      ],
    },
    "Backend Development": {
      Beginner: [
        { icon: '📚', title: 'Start Python Fundamentals Module', desc: 'Variables, OOP, functions — 2 weeks solid' },
        { icon: '🛠', title: 'Build a CLI task manager', desc: 'Apply Python basics in a real project' },
        { icon: '🔗', title: 'Update GitHub with a pinned project', desc: 'README + demo link = credibility' },
      ],
      Intermediate: [
        { icon: '⚡', title: 'Build a REST API with Flask', desc: 'CRUD endpoints + MongoDB + JWT auth' },
        { icon: '🗄', title: 'Connect and optimize your database', desc: 'Indexing, schema design, aggregations' },
        { icon: '🚀', title: 'Deploy to Railway or Render', desc: 'Free tier · live API URL for your resume' },
      ],
      Advanced: [
        { icon: '🧩', title: 'Design a distributed system', desc: 'Cache layer + queue + 3 microservices' },
        { icon: '🔬', title: 'Contribute to open source', desc: 'Flask, FastAPI, or Django ecosystem' },
        { icon: '🎯', title: 'Mock system design interviews', desc: 'Target FAANG-adjacent companies' },
      ],
    },
    "AIML": {
      Beginner: [
        { icon: '📚', title: 'Complete Andrew Ng ML course', desc: 'The gold standard for ML foundations' },
        { icon: '🛠', title: 'Build a classification project', desc: 'Iris / Titanic dataset on Kaggle' },
        { icon: '🔗', title: 'Create a Kaggle profile', desc: 'Participate in competitions for visibility' },
      ],
      Intermediate: [
        { icon: '⚡', title: 'Train a deep learning model end-to-end', desc: 'Data → preprocess → train → evaluate' },
        { icon: '🗄', title: 'Deploy a model as an API', desc: 'Flask + TensorFlow → Heroku / HuggingFace' },
        { icon: '🚀', title: 'Apply to data intern roles', desc: 'Show 2 Kaggle notebooks on your resume' },
      ],
      Advanced: [
        { icon: '🧩', title: 'Fine-tune a transformer model', desc: 'HuggingFace + custom dataset' },
        { icon: '🔬', title: 'Reproduce a recent ML paper', desc: 'Shows research-level capability to employers' },
        { icon: '🎯', title: 'Target ML engineer roles', desc: 'MNCs + AI startups — strong portfolio wins' },
      ],
    },
  };
  return (map[domain] || map["Backend Development"])[level] || map["Backend Development"]["Beginner"];
}

function parseAIAnalysis(text) {
  if (!text) return null;
  const extract = (key) => {
    const match = text.match(new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z_]+:|$)`, 's'));
    return match ? match[1].trim() : null;
  };
  return {
    summary: extract('PROFILE_SUMMARY'),
    strengths: [extract('STRENGTH_1'), extract('STRENGTH_2')].filter(Boolean),
    gaps: [extract('GAP_1'), extract('GAP_2')].filter(Boolean),
    actions: [extract('ACTION_1'), extract('ACTION_2')].filter(Boolean),
    readiness: parseInt(extract('JOB_READINESS') || '0', 10) || null,
  };
}

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────
function Dashboard({ userEmail, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_dashboard?email=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => { setUserData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userEmail]);

  if (loading) {
    return (
      <LoadingSpinner>
        <SpinnerDots><span /><span /><span /></SpinnerDots>
        <SpinnerText>Loading your dashboard...</SpinnerText>
      </LoadingSpinner>
    );
  }

  if (!userData || !userData.latest_assessment) {
    return (
      <LoadingSpinner>
        <SpinnerText>No dashboard data found.</SpinnerText>
      </LoadingSpinner>
    );
  }

  const profile = userData;
  const assessment = userData.latest_assessment;
  const domain = profile.domain_interest || assessment.domain || "Backend Development";
  const level = assessment.level || "Beginner";
  const percentage = assessment.percentage || 0;
  const overallScore = assessment.overall_score || Math.round(percentage * 0.8);
  const githubData = profile.github_data || {};
  const selfRating = profile.self_rating || {};
  const skills = profile.skills || [];
  const roadmap = getRoadmap(level, domain);
  const jobTypes = getJobTypes(domain, level);
  const actions = getNextActions(level, domain);
  const aiText = assessment.ai_analysis;
  const aiAnalysis = parseAIAnalysis(aiText);

  const readinessMetrics = [
    { label: 'Technical Knowledge', value: Math.round(percentage * 0.9) },
    { label: 'Problem Solving', value: Math.min(100, Math.round(percentage * 1.05)) },
    { label: 'Portfolio Strength', value: Math.min(100, githubData.repo_count ? Math.min(100, githubData.github_score * 3) : Math.round(percentage * 0.4)) },
    { label: 'Industry Readiness', value: Math.round(overallScore * 0.85) },
    { label: 'Code Quality (Self)', value: Math.round(((selfRating.coding || 1) / 5) * 100) },
  ];

  const initials = (profile.name || userEmail).substring(0, 2).toUpperCase();

  return (
    <PageWrapper>
      <DashGrid>

        {/* ── HEADER ── */}
        <HeaderCard delay={0}>
          <HeaderLeft>
            <AvatarCircle>{initials}</AvatarCircle>
            <HeaderInfo>
              <DashTitle>{profile.name || userEmail}</DashTitle>
              <DashSubtitle>
                {profile.college && `${profile.college} · `}
                {profile.degree && `${profile.degree} · `}
                {profile.year || ''}
              </DashSubtitle>
            </HeaderInfo>
          </HeaderLeft>
          <HeaderRight>
            <LevelBadge level={level}>{level}</LevelBadge>
            <LogoutBtn onClick={onLogout}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </LogoutBtn>
          </HeaderRight>
        </HeaderCard>

        {/* ── STATS ── */}
        <ThreeCol>
          <Card delay={0.08} compact>
            <StatValue color={percentage >= 70 ? '#10b981' : percentage >= 40 ? '#f59e0b' : '#ef4444'} delay={0.25}>
              {Math.round(percentage)}%
            </StatValue>
            <StatLabel>Quiz Score</StatLabel>
            <StatSub>{assessment.score}/{assessment.total} correct · {domain.replace(' Development','').replace('AIML','AI/ML')}</StatSub>
          </Card>
          <Card delay={0.12} compact>
            <StatValue color="#60a5fa" delay={0.3}>{overallScore}</StatValue>
            <StatLabel>Overall Score</StatLabel>
            <StatSub>quiz + portfolio + self-rating</StatSub>
          </Card>
          <Card delay={0.16} compact>
            <StatValue color="#a78bfa" delay={0.35}>
              {githubData.repo_count || 0}
            </StatValue>
            <StatLabel>GitHub Repos</StatLabel>
            <StatSub>
              {githubData.username ? `@${githubData.username}` : 'not linked'}
              {profile.linkedin ? ' · LinkedIn ✓' : ''}
            </StatSub>
          </Card>
        </ThreeCol>

        {/* ── PROFILE INFO ── */}
        <Card delay={0.2}>
          <SectionTitle>
            <h2>Profile Summary</h2>
            <Divider />
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Domain Interest</InfoLabel>
              <InfoValue>{domain}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Experience Level</InfoLabel>
              <InfoValue>{profile.experience_level || level}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Goal</InfoLabel>
              <InfoValue>{profile.goal || '—'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Learning Style</InfoLabel>
              <InfoValue>{profile.learning_style || '—'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Daily Study Time</InfoLabel>
              <InfoValue>{profile.daily_hours || '—'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Profile Completed</InfoLabel>
              <InfoValue>{profile.profile_completed_at ? profile.profile_completed_at.split(' ')[0] : '—'}</InfoValue>
            </InfoItem>
          </InfoGrid>
          {skills.length > 0 && (
            <>
              <SectionTitle style={{ marginTop: '18px' }}>
                <h2>Skills</h2>
                <span>·</span>
                <span>{skills.length} technologies</span>
                <Divider />
              </SectionTitle>
              <SkillTagList>
                {skills.map(s => <SkillTag key={s}>{s}</SkillTag>)}
              </SkillTagList>
            </>
          )}
        </Card>

        {/* ── PERFORMANCE + RECOMMENDED PATH ── */}
        <TwoCol>
          <Card delay={0.26}>
            <SectionTitle>
              <h2>Performance Overview</h2>
              <Divider />
            </SectionTitle>
            <ScoreSection>
              <ScoreRing percentage={percentage} />
              <ScoreMeta>
                <ScoreTitle>You scored {Math.round(percentage)}%</ScoreTitle>
                <ScoreDesc>
                  {percentage >= 70
                    ? "Excellent — you demonstrate strong command of your domain and are ready for advanced challenges."
                    : percentage >= 40
                    ? "Good foundation. A few targeted areas need reinforcement before you're fully industry-ready."
                    : "You're building your fundamentals. Consistent practice will get you there quickly."}
                </ScoreDesc>
              </ScoreMeta>
            </ScoreSection>
          </Card>

          <PathCard delay={0.3}>
            <PathLabel>Recommended Path</PathLabel>
            <PathTitle>{assessment.recommended_domain}</PathTitle>
            <PathDesc>
              Based on your assessment results and domain choice, this learning track is optimized for your current skill level
              and will maximize your job readiness in the shortest timeframe.
            </PathDesc>
          </PathCard>
        </TwoCol>

        {/* ── STRONG + WEAK AREAS ── */}
        <TwoCol>
          <Card delay={0.34}>
            <SectionTitle>
              <h2>Strong Areas</h2>
              <span>·</span>
              <span>{assessment.strong_areas?.length || 0} topics</span>
              <Divider />
            </SectionTitle>
            <AreaList>
              {assessment.strong_areas?.length > 0
                ? assessment.strong_areas.map((item, i) => (
                  <AreaItem key={i} strong index={i}>
                    <AreaDot strong />
                    <AreaText>{item}</AreaText>
                  </AreaItem>
                ))
                : <AreaText style={{ color: '#3f3f46', fontFamily: 'Fira Code', fontSize: '0.75rem' }}>No strong areas recorded.</AreaText>
              }
            </AreaList>
          </Card>

          <Card delay={0.38}>
            <SectionTitle>
              <h2>Weak Areas</h2>
              <span>·</span>
              <span>{assessment.weak_areas?.length || 0} topics</span>
              <Divider />
            </SectionTitle>
            <AreaList>
              {assessment.weak_areas?.length > 0
                ? assessment.weak_areas.map((item, i) => (
                  <AreaItem key={i} index={i}>
                    <AreaDot />
                    <AreaText>{item}</AreaText>
                  </AreaItem>
                ))
                : <AreaText style={{ color: '#3f3f46', fontFamily: 'Fira Code', fontSize: '0.75rem' }}>No weak areas — perfect score!</AreaText>
              }
            </AreaList>
          </Card>
        </TwoCol>

        {/* ── SELF RATINGS ── */}
        {(selfRating.coding || selfRating.debugging || selfRating.problem_solving) && (
          <TwoCol>
            <Card delay={0.42}>
              <SectionTitle>
                <h2>Self-Assessment Ratings</h2>
                <Divider />
              </SectionTitle>
              <MeterList>
                {[
                  { label: 'Coding', value: Math.round((selfRating.coding || 1) / 5 * 100) },
                  { label: 'Debugging', value: Math.round((selfRating.debugging || 1) / 5 * 100) },
                  { label: 'Problem Solving', value: Math.round((selfRating.problem_solving || 1) / 5 * 100) },
                ].map((m, i) => (
                  <MeterRow key={i}>
                    <MeterLabelRow>
                      {m.label}
                      <span>{m.value}%</span>
                    </MeterLabelRow>
                    <MeterTrack>
                      <MeterFill value={m.value} />
                    </MeterTrack>
                  </MeterRow>
                ))}
              </MeterList>
            </Card>

            <Card delay={0.46}>
              <SectionTitle>
                <h2>Job Readiness Score</h2>
                <Divider />
              </SectionTitle>
              <MeterList>
                {readinessMetrics.map((m, i) => (
                  <MeterRow key={i}>
                    <MeterLabelRow>
                      {m.label}
                      <span>{m.value}%</span>
                    </MeterLabelRow>
                    <MeterTrack>
                      <MeterFill value={m.value} />
                    </MeterTrack>
                  </MeterRow>
                ))}
              </MeterList>
            </Card>
          </TwoCol>
        )}

        {/* ── ROADMAP + JOBS ── */}
        <TwoCol>
          <Card delay={0.5}>
            <SectionTitle>
              <h2>Learning Roadmap</h2>
              <span>·</span>
              <span>{domain}</span>
              <Divider />
            </SectionTitle>
            <RoadmapList>
              {roadmap.map((step, i) => (
                <RoadmapItem key={i} index={i}>
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

          <Card delay={0.54}>
            <SectionTitle>
              <h2>Jobs Available for You</h2>
              <Divider />
            </SectionTitle>
            <JobGrid>
              {jobTypes.map((job, i) => (
                <JobCard key={i} index={i}>
                  <JobTitle>{job.title}</JobTitle>
                  <JobMeta>{job.meta}</JobMeta>
                  <JobReadiness>
                    <JobReadinessFill value={job.readiness} />
                  </JobReadiness>
                  <div style={{ fontFamily: 'Fira Code', fontSize: '0.6rem', color: '#3f3f46', marginTop: '4px' }}>
                    readiness: {job.readiness}%
                  </div>
                </JobCard>
              ))}
            </JobGrid>
          </Card>
        </TwoCol>

        {/* ── NEXT ACTIONS ── */}
        <Card delay={0.58}>
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

        {/* ── AI ANALYSIS (Gemini) ── */}
        {aiAnalysis && (
          <AICard delay={0.62}>
            <AIHeader>
              <SectionTitle style={{ marginBottom: 0 }}>
                <h2>AI-Powered Analysis</h2>
              </SectionTitle>
              <AIBadge>
                <span style={{ animation: `${pulse} 2s infinite`, display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                Gemini 1.5 Flash
              </AIBadge>
            </AIHeader>

            <AIGrid>
              {aiAnalysis.summary && (
                <AISection style={{ gridColumn: '1 / -1' }}>
                  <AISectionLabel>Profile Summary</AISectionLabel>
                  <AISectionContent>{aiAnalysis.summary}</AISectionContent>
                </AISection>
              )}

              {aiAnalysis.strengths?.length > 0 && (
                <AISection>
                  <AISectionLabel>Key Strengths</AISectionLabel>
                  {aiAnalysis.strengths.map((s, i) => (
                    <AIItem key={i}>
                      <AIItemDot />
                      <AISectionContent>{s}</AISectionContent>
                    </AIItem>
                  ))}
                </AISection>
              )}

              {aiAnalysis.gaps?.length > 0 && (
                <AISection>
                  <AISectionLabel>Skill Gaps to Address</AISectionLabel>
                  {aiAnalysis.gaps.map((g, i) => (
                    <AIItem key={i}>
                      <AIItemDot style={{ background: '#f59e0b' }} />
                      <AISectionContent>{g}</AISectionContent>
                    </AIItem>
                  ))}
                </AISection>
              )}

              {aiAnalysis.actions?.length > 0 && (
                <AISection>
                  <AISectionLabel>Top Actions to Get Hired Faster</AISectionLabel>
                  {aiAnalysis.actions.map((a, i) => (
                    <AIItem key={i}>
                      <AIItemDot style={{ background: '#60a5fa' }} />
                      <AISectionContent>{a}</AISectionContent>
                    </AIItem>
                  ))}
                </AISection>
              )}

              {aiAnalysis.readiness && (
                <AIReadinessSection>
                  <AIReadinessValue>{aiAnalysis.readiness}%</AIReadinessValue>
                  <AIReadinessLabel>
                    <AISectionLabel style={{ marginBottom: '6px' }}>AI Job Readiness Score</AISectionLabel>
                    <AISectionContent>
                      Calculated by Gemini based on your full profile, skills, and assessment performance.
                    </AISectionContent>
                  </AIReadinessLabel>
                </AIReadinessSection>
              )}
            </AIGrid>
          </AICard>
        )}

      </DashGrid>
    </PageWrapper>
  );
}

export default Dashboard;