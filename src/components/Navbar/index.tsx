import React from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Avatar } from "@mui/material";

const navItems: string[] = ["Workspaces", "Recent", "Starred", "Templates"];

const Navbar = () => {
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
        <ul className="flex text-white items-center space-x-6 ml-6 text-sm font-normal">
          {navItems.map((item) => (
            <li key={item}>
              <button className="flex items-center space-x-1">
                {item}
                <ExpandMoreRoundedIcon />
              </button>
            </li>
          ))}
          <button className="capitalize text-white bg-black bg-opacity-30 px-3 py-2 text-sm rounded ml-5 hover:bg-white hover:bg-opacity-20 transition-colors">
            create
          </button>
        </ul>
      </div>
      <div className="flex items-center space-x-3">
        <input
          placeholder="Search boards"
          className="rounded-md border-0 outline-none bg-white bg-opacity-20 focus:bg-opacity-30 placeholder:text-white py-1 px-3 text-white text-sm"
        />
        <button className="overflow-hidden w-5 h-5 rounded-full border-2 flex border-white">
          <span className="w-1/2 h-5"></span>
          <span className="w-1/2 h-5 bg-white"></span>
        </button>
        <Avatar sx={{ width: 30, height: 30 }} />
      </div>
    </nav>
  );
};

export default Navbar;
