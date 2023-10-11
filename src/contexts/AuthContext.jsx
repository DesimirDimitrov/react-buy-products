import React, { useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = React.createContext();

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
