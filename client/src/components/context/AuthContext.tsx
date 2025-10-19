import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Interfaces remain the same - they are perfect
interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  username: string | null;
  student_id: number | null;
}

interface AuthContextProps extends AuthState {
  login: (username: string, role: string, student_id: number) => void;
  logout: () => void;
}

 const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 1. Create a function to compute the initial state
const getInitialAuthState = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      // No stored auth, return default state
      return {
        isAuthenticated: false,
        role: null,
        username: null,
        student_id: null,
      };
    }

    const parsedAuth = JSON.parse(storedAuth);
    // Return the parsed state
    return {
      isAuthenticated: parsedAuth?.isAuthenticated || false,
      role: parsedAuth?.role || null,
      username: parsedAuth?.username || null,
      student_id: parsedAuth?.student_id || null,
    };
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
    // If parsing fails, clear the invalid item and return default state
    localStorage.removeItem("auth");

    return {
      isAuthenticated: false,
      role: null,
      username: null,
      student_id: null,
    };
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 2. Pass the initializer function to useState.
  // This function will only run ONCE on the initial render.
  const [auth, setAuth] = useState<AuthState>(getInitialAuthState);
  
  // t is no 3. The useEffeclonger needed! We've removed it.

  const login = (username: string, role: string, student_id: number) => {
    const authData = {
      isAuthenticated: true,
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
      role: null,
      username: null,
      student_id: null,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
