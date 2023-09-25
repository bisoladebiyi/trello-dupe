import React, { useState } from "react";
import { ILayout } from "../../utils/interfaces/interfaces";
import NewWorkspaceModal from "../NewWorkspaceModal";

const Layout: React.FC<ILayout> = ({ children }) => {
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] =
    useState<boolean>(false);
  const [workspaceName, setWorkspaceName] = useState<string>("");

  const toggleWorkspaceModal = () => {
    setShowNewWorkspaceModal(!showNewWorkspaceModal);
  };
  
  return (
    <div className="h-full">
      {children}
      {showNewWorkspaceModal && (
        <NewWorkspaceModal
          toggleWorkspaceModal={toggleWorkspaceModal}
          workspaceName={workspaceName}
          setWorkspaceName={setWorkspaceName}
        />
      )}
    </div>
  );
};

export default Layout;
