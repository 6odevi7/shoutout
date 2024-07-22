import React from 'react';

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