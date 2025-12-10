import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. On importe le hook
import '../styles/Button.css';

const Button = ({
  onClick,
  text,
  bgColor,
  textColor,
  to,
  fullWidth = false,
  icon,
}) => {
  const navigate = useNavigate();

  const handleAction = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (to) {
      navigate(to);
    }
  };

  const dynamicStyles = {
    '--dynamic-bg': bgColor,
    '--dynamic-text': textColor,
    '--dynamic-width': fullWidth ? '100%' : 'auto',
  };

  return (
    <button onClick={handleAction} className='btn' style={dynamicStyles}>
      <span>{text}</span>
      {icon && <span className='btn-icon'>{icon}</span>}
    </button>
  );
};

export default Button;
