import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading.jsx";

// Context API позволяет хранить информацию пользователя в одном месте и передавать их без необходимости прокидывать пропсы на каждом уровне
const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  // Состояние данных пользователя (по умолчанию - пусто)
  const [user, setUser] = useState(null);
  // Состояние аутентификации пользователя (по умолчанию - не аутентифицирован)
  const [isAuth, setIsAuth] = useState(false);
  // Состояние загрузки/выполнения запроса
  const [isLoading, setIsLoading] = useState(false);
  // Состояние обновления данных, при которых повторяется запрос на получение актуальной записи о пользователе
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  // Вспомогательные функции управления состояниями
  const login = (userData) => {
    setUser(userData);
    setIsAuth(true);
    setIsLoading(false);
  };
  const logout = () => {
    setUser(null);
    setIsAuth(false);
    window.localStorage.removeItem("Authorization");
  };

  // Запрос на аутентификацию пользователя по JWT при загрузке страницы
  useEffect(() => {
    if (user == null) {
      try {
        const localStorageJWT = window.localStorage.getItem("Authorization");
        if (localStorageJWT) {
          setIsLoading(true);
          // Запрос на аутентификацию пользователя по ключу
          axios
            .get(`${API_URL}/profile`, {
              headers: { Authorization: localStorageJWT },
            })
            .then((res) => {
              const userData = res.data.user;
              login(userData);
            })
            .catch((err) => {
              console.log(err);
              logout();
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      } catch (err) {
        console.log("Ошибка во время получения JWT");
        setIsLoading(false);
      }
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isAuth,
          isLoading,
          setIsLoading,
          isDataUpdated,
          setIsDataUpdated,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};
