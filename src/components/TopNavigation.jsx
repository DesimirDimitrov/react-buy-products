import { Link } from "react-router-dom";

export const TopNavigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Начало</Link>
        </li>
        <li>
          <Link to="signup">Регистрация</Link>
        </li>
        <li>
          <Link to="signin">Вход</Link>
        </li>
      </ul>
    </div>
  );
};
