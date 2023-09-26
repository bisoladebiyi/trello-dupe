import React from "react";
import { IDashboardLayout } from "../../utils/interfaces/interfaces";
import SideBar from "../SideBar";

const DashboardLayout:React.FC<IDashboardLayout> = ({ children, active }) => {
  return (
    <div className="flex w-[90%] md:w-[80%] mx-auto md:space-x-10 pt-24">
      <SideBar active={active} />
      {children}
    </div>
  );
};

export default DashboardLayout;
