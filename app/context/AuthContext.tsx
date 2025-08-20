"use client"; 
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, User } from "@/types/types";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      const fullUser = users.find((u) => u.email === parsedUser.email);
      if (fullUser) {
        setUser(fullUser);
      }
    }
  }, []);
  useEffect(() => {
    const handleUserUpdate = (e: CustomEvent<User>) => {
      const updatedUser = e.detail;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update this user in users list
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      const updatedUsers = users.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    window.addEventListener("userUpdate", handleUserUpdate as EventListener);
    return () =>
      window.removeEventListener("userUpdate", handleUserUpdate as EventListener);
  }, []);

  // ✅ Login
  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  // ✅ Register

  const register = (newUser: Omit<User, "likedRecipes" | "customRecipes">) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
   
    const alreadyExists = users.some((u) => u.email === newUser.email);
    if (alreadyExists) {
      alert("User with this email already exists");
      return;
    }

    const userWithDefaults: User = {
      ...newUser,
      likedRecipes: [],
      customRecipes: [],
    };
    const updatedUsers = [...users, userWithDefaults];
  

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(userWithDefaults);
    localStorage.setItem("user", JSON.stringify(userWithDefaults));
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
