import { AddRounded } from "@mui/icons-material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WContext } from "../../context/WorkspacesContext";
import { SideBarItems } from "../../utils/constants/constants";
import { ROUTES } from "../../utils/constants/routes";
import { ISideBar } from "../../utils/interfaces/interfaces";

const SideBar: React.FC<ISideBar> = ({ active }) => {
  const workspaces = useContext(WContext);
  return (
    <aside className="w-[350px] hidden md:block">
      <ul className="space-y-1 border-b border-gray-300 pb-2 text-sm">
        {SideBarItems.map((s) => (
          <Link to={s.route} key={s.name}>
            <li
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
              />
              <span>{s.name}</span>
            </li>
          </Link>
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
          {workspaces?.map((w) => (
            <Link to={ROUTES.BOARD + `/${w.id}`} key={w.id}>
              <li
                className={`capitalize rounded-md font-medium flex space-x-3 items-center p-2 cursor-pointer ${
                  active.toLowerCase() === w.data().name.toLowerCase()
                    ? "text-[#0D66E4] bg-[#E9F2FF]"
                    : "text-dark"
                }`}
              >
                {w.data().name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
