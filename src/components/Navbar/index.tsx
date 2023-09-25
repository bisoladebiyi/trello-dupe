import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Avatar } from "@mui/material";
import { logOut } from "../../utils/requests/requests_firebase";
import { INavbar } from "../../utils/interfaces/interfaces";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";
import Button from "../Elements/Button";

const navItems: string[] = ["Workspaces", "Recent", "Starred", "Templates"];

const Navbar: React.FC<INavbar> = ({
  toggleWorkspaceModal,
  toggleBoardModal,
}) => {
  const [showLogoutBtn, setShowLogoutBtn] = useState<boolean>(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState<boolean>(false);

  const newWorkspace = () => {
    setShowCreateDropdown(false);
    toggleWorkspaceModal();
  };

  const newBoard = () => {
    setShowCreateDropdown(false);
    toggleBoardModal();
  };

  return (
    <nav className="bg-white bg-opacity-70 shadow py-1.5 px-6 flex items-center justify-between fixed w-full">
      <div className="flex items-center">
        <Link to={ROUTES.BOARDS}>
          <div className="flex items-center space-x-2">
            <figure>
              <img
                className="w-4 h-4"
                src="https://cdn.icon-icons.com/icons2/2622/PNG/512/brand_trello_icon_158659.png"
                alt="logo"
              />
            </figure>
            <p className="font-bold text-xl text-dark">Trello</p>
          </div>
        </Link>

        <ul className="flex text-dark items-center space-x-6 ml-6 text-sm font-normal relative">
          {navItems.map((item) => (
            <li key={item}>
              <button className="flex items-center space-x-1">
                {item}
                <ExpandMoreRoundedIcon />
              </button>
            </li>
          ))}
          <Button
            text="Create"
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            className={"hover:bg-opacity-95"}
          />
          {showCreateDropdown && (
            <div className="bg-white flex flex-col py-3 rounded-sm text-center text-sm text-dark right-0 top-full absolute shadow w-[250px]">
              <button
                onClick={newBoard}
                className="hover:bg-black hover:bg-opacity-10 px-5 py-2 text-left text-sm"
              >
                <p>Board</p>{" "}
                <p className="text-[11px] text-gray-500 leading-normal">
                  A board is made up of cards ordered on lists. Use it to manage
                  projects, track information, or organize anything.
                </p>
              </button>
              <button
                onClick={newWorkspace}
                className="hover:bg-black hover:bg-opacity-10 px-5 py-2 text-left text-sm"
              >
                <p>Workspace</p>{" "}
                <p className="text-[11px] text-gray-500 leading-normal">
                  A Workspace is a group of boards and people. Use it to
                  organize your company, side hustle, family, or friends.
                </p>
              </button>
            </div>
          )}
        </ul>
      </div>
      <div className="flex items-center space-x-3 relative">
        <button className="overflow-hidden w-5 h-5 rounded-full border-2 flex border-dark">
          <span className="w-1/2 h-5"></span>
          <span className="w-1/2 h-5 bg-dark"></span>
        </button>
        <button onClick={() => setShowLogoutBtn(!showLogoutBtn)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={localStorage.getItem("avatar") || ""}
          />
        </button>
        {showLogoutBtn && (
          <button
            className="bg-white p-3 rounded-sm text-center text-sm text-dark right-0 top-full absolute shadow"
            onClick={logOut}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
