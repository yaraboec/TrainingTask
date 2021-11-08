import React from 'react';

const Header = () => {
  const name = 'Войти';
  return (
    <div>
      <nav>
        <div style={{ backgroundColor: '#ccc', height: '40px', textAlign: 'end' }}>
          <a style={{ marginRight: '20px', fontSize: '1.3rem' }} href="/">{name}</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
