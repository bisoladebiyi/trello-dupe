import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

interface IWorkspace {
  workspace: QueryDocumentSnapshot<DocumentData, DocumentData>;
}

const Workspace: React.FC<IWorkspace> = ({ workspace }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <p className="w-8 h-7 rounded flex justify-center text-white font-bold text-lg bg-red-500 uppercase">
            {workspace?.data().name[0]}
          </p>
          <span className="text-black font-medium">
            {workspace?.data().name}
          </span>
        </div>
        {/* delete  */}
        <button className="text-dark hover:bg-gray-200 bg-gray-100 rounded p-2 text-sm flex space-x-1 items-center">
          <DeleteRoundedIcon className="text-dark" fontSize="small" />{" "}
          <span>Delete</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-5">
        <button className="h-28 text-sm bg-gray-100 rounded">
          Create new board
        </button>
      </div>
    </div>
  );
};

export default Workspace;
