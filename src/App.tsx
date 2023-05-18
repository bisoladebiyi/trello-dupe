import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Boards from "./pages/Boards";

import { ROUTES } from "./utils/constants/routes";

const App = () => {
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/') navigate(ROUTES.BOARDS)
  }, [location, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.SIGNUP} element={<Auth />} />
        <Route path={ROUTES.LOGIN} element={<Auth type={"login"} />} />
        <Route path={ROUTES.BOARDS} element={<Boards />} />
      </Routes>
    </div>
  );
};

export default App;
