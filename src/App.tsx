import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Boards from "./pages/Boards";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { ROUTES } from "./utils/constants/routes";
import WorkspacesContext from "./context/WorkspacesContext";
import Navbar from "./components/Navbar";
import NewWorkspaceModal from "./components/NewWorkspaceModal";
import NewBoardModal from "./components/NewBoardModal";

const App = () => {
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] =
    useState<boolean>(false);
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [showNewBoardModal, setShowNewBoardModal] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>("");
  const [workspaceID, setWorkspaceID] = useState<string>("");

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

  const toggleBoardModal = () => {
    setShowNewBoardModal(!showNewBoardModal);
  };

  const toggleWorkspaceModal = () => {
    setShowNewWorkspaceModal(!showNewWorkspaceModal);
  };

  return (
    <WorkspacesContext>
      <div className="App h-full">
        <Navbar toggleWorkspaceModal={toggleWorkspaceModal} toggleBoardModal={toggleBoardModal} />
        <Routes>
          <Route path={ROUTES.SIGNUP} element={<Auth />} />
          <Route path={ROUTES.LOGIN} element={<Auth type={"login"} />} />
          <Route path={ROUTES.BOARDS} element={<Boards toggleBoardModal={toggleBoardModal} setWorkspaceID={setWorkspaceID} />} />
          <Route path={ROUTES.BOARD + "/:id"} element={<Board />} />
        </Routes>
        {showNewWorkspaceModal && (
          <NewWorkspaceModal
            toggleWorkspaceModal={toggleWorkspaceModal}
            workspaceName={workspaceName}
            setWorkspaceName={setWorkspaceName}
          />
        )}
        {showNewBoardModal && <NewBoardModal boardName={boardName} workspaceID={workspaceID} setBoardName={setBoardName} setWorkspaceID={setWorkspaceID} toggleBoardModal={toggleBoardModal} />}
      </div>
    </WorkspacesContext>
  );
};

export default App;
