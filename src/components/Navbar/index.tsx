import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Avatar } from "@mui/material";
import { logOut } from "../../utils/requests/requests_firebase";
import { INavbar } from "../../utils/interfaces/interfaces";

const navItems: string[] = ["Workspaces", "Recent", "Starred", "Templates"];

const Navbar: React.FC<INavbar> = ({ toggleWorkspaceModal }) => {
  const [showLogoutBtn, setShowLogoutBtn] = useState<boolean>(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState<boolean>(false);

  const newWorkspace = () => {
    setShowCreateDropdown(false);
    toggleWorkspaceModal();
  };

  return (
    <nav className="bg-[#026AA7] py-1.5 px-6 flex items-center justify-between fixed w-full">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <figure>
            <img
              className="w-4"
              src="https://www.pngkey.com/png/full/213-2134177_import-boards-from-trello-trello-logo-white.png"
              alt=""
            />
          </figure>
          <p className="font-bold text-xl text-white">Trello</p>
        </div>
        <ul className="flex text-white items-center space-x-6 ml-6 text-sm font-normal relative">
          {navItems.map((item) => (
            <li key={item}>
              <button className="flex items-center space-x-1">
                {item}
                <ExpandMoreRoundedIcon />
              </button>
            </li>
          ))}
          <button
            className="capitalize text-white bg-black bg-opacity-30 px-3 py-2 text-sm rounded ml-5 hover:bg-white hover:bg-opacity-20 transition-colors"
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
          >
            create
          </button>
          {showCreateDropdown && (
            <div className="bg-white flex flex-col py-3 rounded-sm text-center text-sm text-dark right-0 top-full absolute shadow w-[250px]">
              <button className="hover:bg-black hover:bg-opacity-10 px-5 py-2 text-left text-sm">
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
        <input
          placeholder="Search boards"
          className="rounded-md border-0 outline-none bg-white bg-opacity-20 focus:bg-opacity-30 placeholder:text-white py-1 px-3 text-white text-sm"
        />
        <button className="overflow-hidden w-5 h-5 rounded-full border-2 flex border-white">
          <span className="w-1/2 h-5"></span>
          <span className="w-1/2 h-5 bg-white"></span>
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
