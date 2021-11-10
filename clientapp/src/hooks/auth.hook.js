import { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const [token, setToken] = useState('');
  const [isAlready, setIsAlready] = useState(false);

  const login = useCallback((jwt) => {
    setToken(jwt);
    localStorage.setItem('token', JSON.stringify(jwt));
    console.log(jwt);
    const decoded = jwtDecode(jwt);
    console.log(decoded.id);
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
