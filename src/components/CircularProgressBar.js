import React from 'react';
import PropTypes from 'prop-types';

const CircularProgressBar = ({ wordCount, size, wordCountLimit }) => {
  const percentage = (wordCount / (wordCountLimit || 1)) * 100;
  const radius = size;
  const strokeWidth = radius / 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  let backgroundStroke;
  let progressStroke;

  if (wordCount < Math.ceil(wordCountLimit * 0.66)) {
    backgroundStroke = 'var(--ash)';
    progressStroke = 'var(--blue)';
  } else if (wordCount < wordCountLimit) {
    backgroundStroke = 'var(--ash)';
    progressStroke = 'var(--tangerine)';
  } else if (wordCount < Math.ceil(wordCountLimit * 1.33)) {
    backgroundStroke = 'var(--peach)';
    progressStroke = 'var(--peach)';
  } else {
    backgroundStroke = 'transparent';
    progressStroke = 'transparent';
  }

  const backgroundStyle = {
    strokeDashoffset,
    stroke: backgroundStroke,
  };

  const progressStyle = {
    strokeDashoffset,
    stroke: progressStroke,
  };

  const textStyle = {
    fill:
      wordCount < wordCountLimit || wordCountLimit === 0
        ? 'var(--ash)'
        : 'var(--peach)',
  };

  return (
    <div id="circular-progress-bar">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          className="circle-background"
          strokeWidth={strokeWidth + 1}
          style={backgroundStyle}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="circle-progress"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={progressStyle}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3rem"
          textAnchor="middle"
          style={textStyle}
        >
          {wordCountLimit < 1 ? wordCount : wordCountLimit - wordCount}
        </text>
      </svg>
    </div>
  );
};

CircularProgressBar.propTypes = {
  wordCount: PropTypes.number,
  size: PropTypes.number,
  wordCountLimit: PropTypes.number,
};

export default CircularProgressBar;
