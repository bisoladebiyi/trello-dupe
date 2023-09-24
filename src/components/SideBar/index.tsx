import { AddRounded } from "@mui/icons-material";
import React from "react";
import { SideBarItems } from "../../utils/constants/constants";

interface IProps {
  active: string;
}

const SideBar: React.FC<IProps> = ({ active }) => {
  return (
    <aside className="w-[350px]">
      <ul className="space-y-1 border-b border-gray-300 pb-2 text-sm">
        {SideBarItems.map((s) => (
          <li
            key={s.name}
            className={`capitalize font-medium flex space-x-3 items-center p-2 rounded-md ${
              active.toLowerCase() === s.name.toLowerCase()
                ? "text-[#0D66E4] bg-[#E9F2FF]"
                : "text-dark"
            }`}
          >
            <s.icon
              fontSize="small"
              className={`${
                active.toLowerCase() === s.name.toLowerCase()
                  ? "text-[#0D66E4]"
                  : "text-gray-500"
              }`}
            />{" "}
            <span>{s.name}</span>
          </li>
        ))}
      </ul>
      <div>
        <div className="flex items-center justify-between p-2">
          <p className="text-xs text-dark font-medium">Workspaces</p>
          <button>
            <AddRounded fontSize="small" className="text-gray-500" />
          </button>
        </div>
        <ul className="space-y-1 text-sm">
          <li className="capitalize text-dark font-medium flex space-x-3 items-center p-2">
            My Workspace
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
