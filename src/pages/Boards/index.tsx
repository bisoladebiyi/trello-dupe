import React, { useContext } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Layout from "../../components/Layout";
import Workspace from "../../components/Workspace";
import { WContext } from "../../context/WorkspacesContext";

const Boards: React.FC = () => {
  const workspaces = useContext(WContext);

  return (
    <Layout>
      <DashboardLayout active="boards">
        <main className="w-full">
          <h2 className="text-dark uppercase font-bold mb-5">
            Your workspaces
          </h2>
          <div className="space-y-10">
            {workspaces[0] &&
              workspaces.map((w) => <Workspace key={w.id} workspace={w} />)}
          </div>
        </main>
      </DashboardLayout>
    </Layout>
  );
};

export default Boards;
