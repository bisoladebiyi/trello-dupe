import React from "react";
import Button from "../Elements/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { INewWorkspaceModal } from "../../utils/interfaces/interfaces";
import { createWorkspace } from "../../utils/requests/requests_firebase";

const NewWorkspaceModal: React.FC<INewWorkspaceModal> = ({
  toggleWorkspaceModal,
  workspaceName,
  setWorkspaceName,
}) => {
  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await createWorkspace(workspaceName);
    setWorkspaceName("");
    toggleWorkspaceModal();
  };
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 modal-container w-10/12 rounded-md bg-white flex justify-between">
      <button className="absolute right-5 top-5" onClick={toggleWorkspaceModal}>
        <CloseRoundedIcon />
      </button>
      <div className="px-10 sm:px-16 md:px-28 py-14 sm:py-20 lg:w-1/2">
        <h2 className="text-xl sm:text-2xl font-bold text-dark mb-3">
          Let's build a Workspace
        </h2>
        <p className="text-sm sm:text-lg text-gray-600 mb-4 leading-tight">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
        <form action="">
          <label
            htmlFor=""
            className="block text-xs text-dark font-semibold mb-1"
          >
            Workspace name
          </label>
          <input
            type="text"
            placeholder="Taco's Co."
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="p-2 rounded border-[1.5px] border-[#DFE1E6] text-sm focus:border-[#4C9AFF] transition-colors outline-none block w-full"
          />
          <Button
            text="Continue"
            className="w-full text-sm mt-5 py-3"
            disabled={!workspaceName}
            onClick={submit}
          />
        </form>
      </div>

      <div className="modal-art w-1/2 hidden lg:flex items-center justify-center">
        <img src="https://trello.com/assets/d1f066971350650d3346.svg" alt="" />
      </div>
    </div>
  );
};

export default NewWorkspaceModal;
