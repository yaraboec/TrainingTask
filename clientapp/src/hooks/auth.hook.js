import { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const [token, setToken] = useState('');
  const [isAlready, setIsAlready] = useState(false);
  const [idUser, setIdUser] = useState('');

  const login = useCallback((jwt) => {
    if (jwt.token) {
      setToken(jwt.token);
      localStorage.setItem('data', JSON.stringify({ token: jwt.token }));
      const decoded = jwtDecode(jwt.token);
      setIdUser(decoded.id);
    }
  }, []);

  const logout = () => {
    setToken('');
    localStorage.removeItem('data');
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));

    if (data) {
      login(data);
    }
    setIsAlready(true);
  }, [login]);

  return {
    login, logout, token, isAlready, idUser,
  };
};
export default useAuth;
