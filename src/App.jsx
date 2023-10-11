import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import GlobalStore from "./contexts/GlobalStore";

function App() {
  return (
    <div className="app">
      <GlobalStore>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </GlobalStore>
    </div>
  );
}

export default App;
