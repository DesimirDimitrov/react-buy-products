import { TopNavigation } from "./TopNavigation";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
export const Home = () => {
  const [currentUser, setCurrentUser] = useState();
  const context = useContext(AuthContext);
  let user = context.currentUser?.user;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [user]);

  return (
    <div>
      <TopNavigation />
      {currentUser && <div>Logged in: {currentUser.email}</div>}
    </div>
  );
};
