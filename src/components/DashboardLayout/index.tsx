import React from "react";
import { IDashboardLayout } from "../../utils/interfaces/interfaces";
import SideBar from "../SideBar";

const DashboardLayout:React.FC<IDashboardLayout> = ({ children, active }) => {
  return (
    <div className="flex w-[80%] mx-auto pt-14 space-x-10">
      <SideBar active={active} />
      {children}
    </div>
  );
};

export default DashboardLayout;
