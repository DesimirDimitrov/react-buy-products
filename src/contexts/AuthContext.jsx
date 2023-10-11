import React, { useContext, useState } from "react";
import { supabase } from "./../config/supabaseClient";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const { setItem } = useLocalStorage("user");

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return error;
    }

    setCurrentUser(data.user);
    setItem(data.user);

    return data.user;
  };

  const signin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return error;
    }

    setCurrentUser(data);
    setItem(data.user);

    return data;
  };

  const value = { currentUser, signup, signin };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
