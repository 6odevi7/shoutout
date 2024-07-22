import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const Alert = styled.div`
  background-color: #0f0f0f;
  border: 2px solid #00ff00;
  color: #00ff00;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
  box-shadow: 0 0 10px #00ff00;
  animation: blink 1s infinite;

  @keyframes blink {
    50% {
      border-color: #0f0f0f;
      box-shadow: none;
    }
  }
`;

const AlertSystem = ({ alerts }) => {
  return (
    <AlertContainer>
      {alerts.map((alert, index) => (
        <Alert key={index}>{alert}</Alert>
      ))}
    </AlertContainer>
  );
};

export default AlertSystem;