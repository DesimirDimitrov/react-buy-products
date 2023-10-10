import { useContext } from "react";
import { TopNavigation } from "./TopNavigation";
import { AuthContext } from "../contexts/AuthContext";

export const Home = () => {
  const context = useContext(AuthContext);
  const user = context.currentUser?.user;

  console.log(user);

  return (
    <div>
      <TopNavigation />
      {user && <div>Logged in: {user.email}</div>}
    </div>
  );
};
