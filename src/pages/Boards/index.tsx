import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Navbar from "../../components/Navbar";
import Workspace from "../../components/Workspace";

const Boards: React.FC = () => {
  return (
    <div>
      <Navbar />
      <DashboardLayout active="boards">
        <main className="w-full">
          <h2 className="text-dark uppercase font-bold mb-5">
            Your workspaces
          </h2>
          <div>
            <Workspace />
          </div>
        </main>
      </DashboardLayout>
    </div>
  );
};

export default Boards;
