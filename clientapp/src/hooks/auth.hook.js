import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isAlready, setIsAlready] = useState(false);

  const login = useCallback((jwt) => {
    setToken(jwt);
    localStorage.setItem('token', JSON.stringify(jwt));
  }, []);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('token'));

    if (data) {
      login(data);
    }
    setIsAlready(true);
  }, [login]);

  return {
    login, logout, token, isAlready,
  };
};
export default useAuth;
