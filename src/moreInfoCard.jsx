import React from 'react';
import plantData from './json/plants.json'
import { useState, useEffect } from 'react';

function moreInfoCard(  ) {

const infoCardStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff',
      maxWidth: '500px',
      zIndex: 1000,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    };
  

    const closeButtonStyle = {
      alignSelf: 'flex-end',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '0'
    };

    
  return (
    <div style={infoCardStyle}>
      <button onClick={onClose} style={closeButtonStyle}>&times;</button>
      <p>{info}</p>
    </div>
  )
}

export default moreInfoCard;
