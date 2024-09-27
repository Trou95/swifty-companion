import { IUser } from "@/types/IUser";
import { createContext } from "react";

interface IAuthContext {
    accessToken: string;
    setAccessToken: (token: string) => void;
    refreshToken: string;
    setRefreshToken: (token: string) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
  }
  
  const AuthContext = createContext<IAuthContext>({
    accessToken: '',
    setAccessToken: () => {},
    refreshToken: '',
    setRefreshToken: () => {},
    user: null,
    setUser: () => {}
  });

  export default AuthContext;
  