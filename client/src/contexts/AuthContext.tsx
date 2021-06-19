import React, { createContext, useContext, useState } from "react";

interface ContextStruct {}

const AuthContext = createContext<ContextStruct>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: JSX.Element;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const value = {};

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
