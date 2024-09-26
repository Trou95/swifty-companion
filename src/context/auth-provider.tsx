import { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthContext {
  accessToken: string;
  setAccessToken: (token: string) => void;
  refreshToken: string;
  setRefreshToken: (token: string) => void;
}

const AuthContext = createContext<IAuthContext>({
  accessToken: '',
  setAccessToken: () => {},
  refreshToken: '',
  setRefreshToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
