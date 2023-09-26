import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import DashboardLayout from "../../components/DashboardLayout";
import Workspace from "../../components/Workspace";
import { WContext } from "../../context/WorkspacesContext";
import { IBoards } from "../../utils/interfaces/interfaces";

const WorkspacePage: React.FC<IBoards> = ({
  toggleBoardModal,
  setWorkspaceID,
}) => {
  const [workspaceData, setWorkspaceData] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const workspaces = useContext(WContext);
  const { w_id } = useParams();

  useEffect(() => {
    if (w_id) {
      let wS = workspaces.filter((w) => w.id === w_id)[0];
      setWorkspaceData(wS);
    }
  }, [w_id, workspaces]);

  return workspaceData ? (
    <DashboardLayout active={workspaceData.data().name}>
      <main className="w-full">
        <div className="space-y-10">
          <Workspace
            key={workspaceData?.id}
            workspace={workspaceData}
            toggleBoardModal={toggleBoardModal}
            setWorkspaceID={setWorkspaceID}
            isWorkspacePage
          />
        </div>
      </main>
    </DashboardLayout>
  ) : (
    <div></div>
  );
};

export default WorkspacePage;
