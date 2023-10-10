import React, { useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const AuthContext = React.createContext();

console.log(import.meta.env.VITE_SUPABASE_URL);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
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

    return data.user;
  };

  const value = { currentUser, signup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
