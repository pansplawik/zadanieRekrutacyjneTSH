import React, { useState, createContext, useContext } from 'react';

// Definiujemy interfejs dla kontekstu
interface LoginContextProps {
  login: boolean;
  handleButtonClick: () => void;
}

// Tworzymy kontekst
const LoginContext = createContext<LoginContextProps | undefined>(undefined);

// Komponent dostarczający kontekst
const LoginProvider: React.FC = ({ children }) => {
  const [login, setLogin] = useState(false);

  const handleButtonClick = () => {
    setLogin(!login);
  };

  // Dostarczamy wartości kontekstu
  const contextValue: LoginContextProps = {
    login,
    handleButtonClick,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};

// Hook do korzystania z wartości kontekstu
const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useClickCount must be used within a ClickCountProvider');
  }
  return context;
};

export { LoginProvider, useLogin };
