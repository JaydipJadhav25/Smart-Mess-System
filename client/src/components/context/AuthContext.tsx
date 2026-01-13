import { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isFormSubmitted: boolean;
  role: string | null;
  username: string | null;
  student_id: number | null;
}

interface AuthContextProps extends AuthState {
  login: (username: string, role: string, student_id: number) => void;
  logout: () => void;
  applicationSubmit: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const getInitialAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      isFormSubmitted: false,
      role: null,
      username: null,
      student_id: null,
    };
  }

  try {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      return {
        isAuthenticated: false,
        isFormSubmitted: false,
        role: null,
        username: null,
        student_id: null,
      };
    }

    const parsedAuth = JSON.parse(storedAuth);
    return {
      isAuthenticated: parsedAuth?.isAuthenticated || false,
      isFormSubmitted: parsedAuth?.isFormSubmitted || false,
      role: parsedAuth?.role || null,
      username: parsedAuth?.username || null,
      student_id: parsedAuth?.student_id || null,
    };
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
    localStorage.removeItem("auth");
    return {
      isAuthenticated: false,
      isFormSubmitted: false,
      role: null,
      username: null,
      student_id: null,
    };
  }
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(getInitialAuthState);

  const login = (username: string, role: string, student_id: number) => {
    const authData = {
      isAuthenticated: true,
      isFormSubmitted: false,
      username,
      role,
      student_id,
    };
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      isFormSubmitted: false,
      role: null,
      username: null,
      student_id: null,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  const applicationSubmit = () => {
    setAuth(prev => {
      const updated = { ...prev, isFormSubmitted: true };
      localStorage.setItem("auth", JSON.stringify(updated));
      return updated;
    });
  };

  const value = useMemo(
    () => ({ ...auth, login, logout, applicationSubmit }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
