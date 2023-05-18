import React from "react";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const navItems: string[] = ["Workspaces", "Recent", "Starred", "Templates"];

const Navbar = () => {
  return (
    <nav className="bg-[#026AA7] py-1.5 px-6 flex items-center">
      <div>
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
      </ul>
      <button className="capitalize text-white bg-black bg-opacity-30 px-3 py-2 text-sm rounded ml-5 hover:bg-white hover:bg-opacity-20 transition-colors">create</button>
    </nav>
  );
};

export default Navbar;
