import { Link } from "react-router-dom";
import { useState } from "react";

export const TopNavigation = () => {
  const user = localStorage.getItem("user");
  const [currentUser] = useState(user ? JSON.parse(user) : null);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Начало</Link>
        </li>
        {!currentUser && (
          <li>
            <Link to="signup">Регистрация</Link>
          </li>
        )}
        {!currentUser && (
          <li>
            <Link to="signin">Вход</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <button onClick={handleLogOut}>Изход</button>
          </li>
        )}
      </ul>
    </div>
  );
};
