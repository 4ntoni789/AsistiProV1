import React, { useState } from 'react';
import './ToggleDarkMode.scss'; // Asegúrate de tener este SCSS

const BtnDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
   
  };

  return (
    <div
      className={`toggle-container ${darkMode ? 'dark' : ''}`}
      onClick={toggleMode}
    >
      <div className="toggle-button">
        <div className="icon">
          {darkMode ? '🌙' : '☀️'}
        </div>
      </div>
    </div>
  );
};

export default BtnDarkMode;
