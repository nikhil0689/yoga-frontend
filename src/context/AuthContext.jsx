import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: null, sessionUser: null });

  const setAccessToken = (accessToken) => {
    setAuth((prev) => ({ ...prev, token: accessToken }));
  };

  const setSessionUser = (user) => {
    setAuth((prev) => ({ ...prev, sessionUser: user }));
  };

  const clearSessionData = () => {
    setAuth(() => ({ token: null, sessionUser: null }));
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAccessToken, clearSessionData, setSessionUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context was used outside of Auth context provider");
  }
  return context;
}

export { AuthProvider, useAuth };

export default AuthContext;
