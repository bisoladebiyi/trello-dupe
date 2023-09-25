import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  addList,
  deleteBoard,
  editBoardName,
} from "../../utils/requests/requests_firebase";
import { ROUTES } from "../../utils/constants/routes";

const useBoard = () => {
  const [showBoardNameInput, setShowBoardNameInput] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [board, setBoard] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const [lists, setLists] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[] | []
  >([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.w_id && params.b_id) {
      onSnapshot(
        query(collection(db, "workspaces", params.w_id, "boards")),
        (snapshot) => {
          setBoard(snapshot.docs.filter((s) => s.id === params.b_id)[0]);
          setBoardName(
            snapshot.docs.filter((s) => s.id === params.b_id)[0]?.data().name
          );
        }
      );

      onSnapshot(
        query(
          collection(
            db,
            "workspaces",
            params.w_id,
            "boards",
            params.b_id,
            "lists"
          )
        ),
        (snapshot) => {
          setLists(snapshot.docs);
        }
      );
    }
  }, [params]);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const toggleBoardNameInput = () => {
    setShowBoardNameInput(!showBoardNameInput);
  };

  const handleBoardName = (e: React.FormEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value);
  };

  const handleEditBoardName = async () => {
    toggleBoardNameInput();

    if (boardName.trim() === "") {
      setBoardName(board?.data().name);
      return;
    }

    if (params.w_id && params.b_id) {
      await editBoardName(params.w_id, params.b_id, boardName);
    }
  };

  const handleDeleteBoard = async () => {
    if (params.w_id && params.b_id) {
      await deleteBoard(params.w_id, params.b_id);
    }
    navigate(ROUTES.BOARDS);
    alert("Board deleted!");
  };

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let order = lists.length + 1;

    toggleInput();

    if (params.w_id && params.b_id) {
      await addList(params.w_id, params.b_id, listName, order);
    }
  };

  return {
    showInput,
    listName,
    board,
    lists,
    showBoardNameInput,
    boardName,
    toggleBoardNameInput,
    handleBoardName,
    handleEditBoardName,
    setListName,
    toggleInput,
    submit,
    handleDeleteBoard,
  };
};

export default useBoard;
