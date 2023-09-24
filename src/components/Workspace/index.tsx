import React, { useEffect, useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IWorkspace } from "../../utils/interfaces/interfaces";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";

const Workspace: React.FC<IWorkspace> = ({
  workspace,
  toggleBoardModal,
  setWorkspaceID,
}) => {
  const [boards, setBoards] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[] | []
  >([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "workspaces", workspace.id, "boards")),
      (snapshot) => {
        setBoards(snapshot.docs);
      }
    );
  }, []);

  const newBoard = () => {
    toggleBoardModal();
    setWorkspaceID(workspace.id);
  };

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
        {boards?.map((b) => (
          <Link to={ROUTES.BOARD + `/${workspace.id}/${b.id}`} key={b.id}>
            <button
              className="h-28 w-full text-white font-semibold text-left pl-3 pt-3 rounded text-base flex items-start capitalize"
              style={{
                background: `url(${b.data().bg}) 0% 0% / cover no-repeat`,
              }}
            >
              {b.data().name}
            </button>
          </Link>
        ))}
        <button className="h-28 text-sm bg-gray-100 rounded" onClick={newBoard}>
          Create new board
        </button>
      </div>
    </div>
  );
};

export default Workspace;
