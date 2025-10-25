import React from 'react';
import './RadarChart.css';

const RadarChart = ({ scores, color = '#f97316' }) => {
  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 6; // 1-6 scale
  
  // Calculate points for polygon
  const getPoint = (score, index, radius) => {
    const angle = (Math.PI * 2 * index) / scores.length - Math.PI / 2;
    const distance = (score / levels) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  // Generate polygon path
  const generatePath = () => {
    return scores.map((item, index) => {
      const point = getPoint(item.score, index, maxRadius);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';
  };

  // Generate axis lines
  const axisLines = scores.map((item, index) => {
    const point = getPoint(levels, index, maxRadius);
    return (
      <line
        key={`axis-${index}`}
        x1={center}
        y1={center}
        x2={point.x}
        y2={point.y}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  // Generate level circles
  const levelCircles = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius;
    return (
      <circle
        key={`level-${i}`}
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  // Generate labels
  const labels = scores.map((item, index) => {
    const point = getPoint(levels + 0.8, index, maxRadius);
    const shortLabel = item.category.split(' ').slice(0, 2).join(' ');
    
    return (
      <text
        key={`label-${index}`}
        x={point.x}
        y={point.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="radar-label"
        fontSize="11"
        fill="#1e293b"
        fontWeight="600"
      >
        {shortLabel}
      </text>
    );
  });

  return (
    <div className="radar-chart-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background levels */}
        {levelCircles}
        
        {/* Axis lines */}
        {axisLines}
        
        {/* Score polygon */}
        <path
          d={generatePath()}
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Score points */}
        {scores.map((item, index) => {
          const point = getPoint(item.score, index, maxRadius);
          return (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Labels */}
        {labels}
      </svg>
    </div>
  );
};

export default RadarChart;
