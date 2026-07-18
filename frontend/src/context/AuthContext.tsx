import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  login as loginAPI,
  getCurrentUser,
  UserProfile,
} from "../api/auth";

type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        localStorage.removeItem("access_token");
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    const response = await loginAPI({
      email,
      password,
    });

    localStorage.setItem(
      "access_token",
      response.access_token
    );

    const currentUser = await getCurrentUser();

    setUser(currentUser);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}