import React, { useContext, useEffect, useState } from "react";
import Button from "../Elements/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { INewBoardModal } from "../../utils/interfaces/interfaces";
import { WContext } from "../../context/WorkspacesContext";
import { boardBgs } from "../../utils/constants/constants";
import { addBoard } from "../../utils/requests/requests_firebase";

const NewBoardModal: React.FC<INewBoardModal> = ({
  boardName,
  workspaceID,
  setBoardName,
  setWorkspaceID,
  toggleBoardModal,
}) => {
  const [selectedBg, setSelectedBg] = useState<string>("");
  const workspaces = useContext(WContext);

  useEffect(() => {
    setSelectedBg(boardBgs[0]);
  }, []);

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await addBoard(workspaceID, boardName, selectedBg);
    toggleBoardModal();
    alert("Board created");
  };

  return (
    <div className="bg-white shadow-md rounded-md p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]">
      <button className="absolute right-5 top-5" onClick={toggleBoardModal}>
        <CloseRoundedIcon fontSize="small" className="text-gray-500" />
      </button>
      <h3 className="text-center text-dark text-sm font-semibold mb-5">
        Create new board
      </h3>
      <div className="mb-4">
        <p className="block text-xs text-dark font-semibold mb-1">Background</p>
        <div className="grid grid-cols-4 gap-2">
          {boardBgs.map((b, i) => (
            <button
              onClick={() => setSelectedBg(b)}
              key={i}
              className={`h-10 rounded ${selectedBg === b ? "selectedBg" : ""}`}
              style={{ background: `url(${b}) 0% 0% / cover no-repeat` }}
            ></button>
          ))}
        </div>
      </div>
      <form action="" className="space-y-4">
        <div>
          <label
            htmlFor=""
            className="block text-xs text-dark font-semibold mb-1"
          >
            Board title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={boardName}
            className="p-2 rounded border-[1.5px] border-[#DFE1E6] text-sm focus:border-[#4C9AFF] transition-colors outline-none block w-full"
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="block text-xs text-dark font-semibold mb-1"
          >
            Workspace <span className="text-red-500">*</span>
          </label>
          <select
            value={workspaceID}
            onChange={(e) => setWorkspaceID(e.target.value)}
            placeholder="Select workspace"
            className="p-2 rounded border-[1.5px] border-[#DFE1E6] text-sm focus:border-[#4C9AFF] transition-colors outline-none block w-full"
          >
            {workspaces.map((w) => (
              <option key={w.id} value={w.id}>
                {w.data().name}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={submit}
          text="Create"
          className="w-full text-sm py-2"
          disabled={!boardName && !workspaceID}
        />
      </form>
    </div>
  );
};

export default NewBoardModal;
