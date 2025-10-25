import React from 'react';
import { questions } from '../data/questions';
import RadarChart from './RadarChart';
import './ResultsReport.css';

const ResultsReport = ({ userData, answers }) => {
  // Calculate scores
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = questions.length * 6;
  const percentageScore = ((totalScore / maxScore) * 100).toFixed(0);

  // Get grade and band
  const getGradeInfo = (total) => {
    if (total >= 44) return { grade: 'A+', band: '44-48', status: 'World-Class Performance', description: 'Exceptional execution across all areas', color: '#10b981', bgColor: '#d1fae5' };
    if (total >= 36) return { grade: 'A', band: '36-43', status: 'Strong & Scaling', description: 'High performance with room to optimize', color: '#3b82f6', bgColor: '#dbeafe' };
    if (total >= 26) return { grade: 'B', band: '26-35', status: 'Stable but Stalled', description: 'Solid foundation but inconsistent progress', color: '#f97316', bgColor: '#fed7aa' };
    if (total >= 16) return { grade: 'C', band: '16-25', status: 'Under Pressure', description: 'Struggling with key business fundamentals', color: '#ef4444', bgColor: '#fecaca' };
    return { grade: 'D', band: '0-15', status: 'Critical Gaps', description: 'Immediate attention required across multiple areas', color: '#dc2626', bgColor: '#fee2e2' };
  };

  const gradeInfo = getGradeInfo(totalScore);

  // Get category scores for radar chart and cards
  const categoryScores = questions.map(q => ({
    category: q.category,
    question: q.question,
    score: answers[q.id] || 0,
  }));

  // Get status for individual pillar
  const getPillarStatus = (score) => {
    if (score >= 5) return 'Strong';
    if (score >= 4) return 'Stable';
    if (score >= 3) return 'Fair';
    if (score >= 2) return 'Weak';
    return 'Critical';
  };

  const getPillarGrade = (score) => {
    if (score >= 5) return 'A';
    if (score >= 4) return 'B';
    if (score >= 3) return 'C';
    if (score >= 2) return 'D';
    return 'F';
  };

  return (
    <div className="results-overlay">
      <div className="results-modal">
        <div className="logo">
          <span className="logo-text">Business Health Matters</span>
        </div>

        <h1 className="results-title">Business Success Report</h1>
        
        {userData && (
          <div className="user-info">
            <p><strong>{userData.fullName}</strong> • {userData.companyName}</p>
          </div>
        )}

        {/* Overall Business Score Section */}
        <div className="overall-section">
          <div className="overall-left">
            <h2 className="section-title">Overall Business Score</h2>
            
            <div className="grade-badge-large" style={{ 
              backgroundColor: gradeInfo.bgColor,
              borderColor: gradeInfo.color 
            }}>
              <span className="grade-letter" style={{ color: gradeInfo.color }}>
                {gradeInfo.grade}
              </span>
            </div>

            <h3 className="status-heading" style={{ color: gradeInfo.color }}>
              {gradeInfo.status}
            </h3>
            <p className="status-description">{gradeInfo.description}</p>

            <div className="progress-section">
              <div className="progress-bar-outer">
                <div 
                  className="progress-bar-inner" 
                  style={{ 
                    width: `${(totalScore / maxScore) * 100}%`,
                    backgroundColor: gradeInfo.color 
                  }}
                ></div>
              </div>
              <div className="progress-labels">
                <span className="progress-score">{totalScore}/{maxScore} points</span>
                <span className="progress-band">Band: {gradeInfo.band}</span>
              </div>
            </div>
          </div>

          <div className="overall-right">
            <RadarChart scores={categoryScores} color={gradeInfo.color} />
          </div>
        </div>

        {/* Scores by Pillar Section */}
        <div className="pillars-section">
          <h2 className="section-title">Scores by Pillar</h2>
          
          <div className="pillar-grid">
            {categoryScores.map((item, index) => {
              const pillarGrade = getPillarGrade(item.score);
              const pillarStatus = getPillarStatus(item.score);
              const percentage = (item.score / 6) * 100;
              
              return (
                <div key={index} className="pillar-card">
                  <div className="pillar-score-badge">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle
                        cx="30"
                        cy="30"
                        r="26"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="26"
                        fill="none"
                        stroke={gradeInfo.color}
                        strokeWidth="4"
                        strokeDasharray={`${percentage * 1.63} 163`}
                        strokeLinecap="round"
                        transform="rotate(-90 30 30)"
                      />
                    </svg>
                    <span className="pillar-grade">{pillarGrade}</span>
                  </div>
                  
                  <div className="pillar-info">
                    <h4 className="pillar-name">{item.category}</h4>
                    <p className="pillar-score-text">
                      {item.score}/6 • <span className="pillar-status">{pillarStatus}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h3>Ready to improve your business health?</h3>
          <p>Get personalized recommendations and a detailed action plan.</p>
          <button className="cta-button">Schedule Your Strategy Session</button>
        </div>

        <button className="restart-button" onClick={() => window.location.reload()}>
          Retake Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultsReport;
