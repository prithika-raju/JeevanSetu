"use client"
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentView, setCurrentView] = useState("loading");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (token && role && storedUser) {
      setUser({ ...JSON.parse(storedUser), role });
      setCurrentView("dashboard");
    } else {
      setCurrentView("login");
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser({ ...data.user, role: data.role });
    setCurrentView("dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCurrentView("login");
  };

  return (
    <AppContext.Provider value={{ currentView, user, login, logout, goToRegistration: () => setCurrentView("registration"), goToLogin: () => setCurrentView("login") }}>
      {currentView !== "loading" && children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
