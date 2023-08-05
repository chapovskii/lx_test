import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1 style={headingStyle}>My Beautiful App</h1>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
};

const headingStyle: React.CSSProperties = {
  margin: 0,
};

export default Header;
