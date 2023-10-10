import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const TopNavigation = () => {
  const context = useContext(AuthContext);
  const user = context.currentUser?.user;

  console.log(context.currentUser);

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Начало</Link>
        </li>
        {!user && (
          <li>
            <Link to="signup">Регистрация</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="signin">Вход</Link>
          </li>
        )}
        <li>
          <Link to="signout">Изход</Link>
        </li>
      </ul>
    </div>
  );
};
