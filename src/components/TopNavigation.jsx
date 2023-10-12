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

  const handleRefreshData = () => {
    window.location.reload();
  };

  return (
    <div>
      <ul className="topNavigation">
        {!currentUser && (
          <li>
            <Link style={{ textDecoration: "none" }} to="signin">
              <button style={{ padding: "1rem" }}>Вход</button>
            </Link>
          </li>
        )}
        {!currentUser && (
          <li>
            <Link to="signup">Регистрация</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <span>{currentUser.email} &nbsp;</span>
            <button onClick={handleLogOut}>Изход</button>
            <button onClick={handleRefreshData} style={{ float: "right" }}>
              Обнови
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
