import React, { useContext } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Workspace from "../../components/Workspace";
import { WContext } from "../../context/WorkspacesContext";
import { IBoards } from "../../utils/interfaces/interfaces";

const Boards: React.FC<IBoards> = ({ toggleBoardModal, setWorkspaceID, toggleWorkspaceModal }) => {
  const workspaces = useContext(WContext);

  return (
    <DashboardLayout active="boards">
      <main className="w-full">
        <h2 className="text-dark uppercase font-bold mb-5">Your workspaces</h2>
        <div className="space-y-10">
          {workspaces[0] ? (
            workspaces.map((w) => (
              <Workspace
                key={w.id}
                workspace={w}
                toggleBoardModal={toggleBoardModal}
                setWorkspaceID={setWorkspaceID}
              />
            ))
          ) : (
            <div className="h-full flex justify-center items-center flex-col w-full pt-10">
              <figure>
                <img className="w-[300px]" src={require("../../assets/images/not_found.png")} alt="" />
              </figure>
              <p className="text-dark text-sm mt-4">You have no workspace yet! <span className="underline text-primary cursor-pointer" onClick={toggleWorkspaceModal}>Create one</span></p>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Boards;
