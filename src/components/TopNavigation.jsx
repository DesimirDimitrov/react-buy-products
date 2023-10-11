import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const TopNavigation = () => {
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [user]);

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
