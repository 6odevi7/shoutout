import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const Alert = styled.div`
  background-color: #00ff00;
  color: #0f0f0f;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
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