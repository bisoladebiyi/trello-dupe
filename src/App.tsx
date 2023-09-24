import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Boards from "./pages/Boards";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { ROUTES } from "./utils/constants/routes";
import WorkspacesContext from "./context/WorkspacesContext";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(ROUTES.BOARDS);
      } else {
        if ([ROUTES.LOGIN, ROUTES.SIGNUP].includes(location.pathname)) return;
        navigate(ROUTES.LOGIN);
      }
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/") navigate(ROUTES.BOARDS);
  }, []);

  return (
    <WorkspacesContext>
      <div className="App h-full">
        <Routes>
          <Route path={ROUTES.SIGNUP} element={<Auth />} />
          <Route path={ROUTES.LOGIN} element={<Auth type={"login"} />} />
          <Route path={ROUTES.BOARDS} element={<Boards />} />
          <Route path={ROUTES.BOARD + "/:id"} element={<Board />} />
        </Routes>
      </div>
    </WorkspacesContext>
  );
};

export default App;
