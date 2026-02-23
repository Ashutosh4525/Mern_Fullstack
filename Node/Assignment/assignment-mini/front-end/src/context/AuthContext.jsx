import { createContext, useContext, useState, useEffect } from "react";

const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [user, setUser]=useState(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading]=useState(false);

    // useEffect(()=>{
    //     const savedUser=localStorage.getItem("user");
    //     if (savedUser) {
    //         try {
    //     const parsed = JSON.parse(savedUser);
    //     setUser(parsed);
    //   } catch (error) {
    //     console.error("Failed to parse user from localStorage", error);
    //     localStorage.removeItem("user"); // Clean up the "bad" data
    //   }
    // }
    // setLoading(false);
    // },[]);

    const login=(userData)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);