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
  editListOrder,
} from "../../utils/requests/requests_firebase";
import { ROUTES } from "../../utils/constants/routes";
import { randomNumberFromInterval } from "../../utils/helpers/helpers";

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
  const [dragItemIndex, setDragItemIndex] = useState<any>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<any>();

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
          setLists(
            snapshot.docs.sort((a, b) => a.data().order - b.data().order)
          );
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
    let order = lists[lists.length - 1]?.data().order + 5;

    toggleInput();

    if (params.w_id && params.b_id) {
      await addList(params.w_id, params.b_id, listName, order);
    }
  };

  // drag and drop logic
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDragItemIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDragOverItemIndex(index);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, l_id: string) => {
    const _lists = [...lists];
    const dragItem = _lists.splice(dragItemIndex, 1)[0];
    _lists.splice(dragOverItemIndex, 0, dragItem);
    setLists(_lists);
    setDragItemIndex(null);
    setDragOverItemIndex(null);

    let order;
    if (dragOverItemIndex === 0) {
      order = randomNumberFromInterval(0, lists[dragOverItemIndex].data().order);
    } else if (dragOverItemIndex === lists.length - 1) {
      order = randomNumberFromInterval(
        lists[dragOverItemIndex].data().order,
        lists[dragOverItemIndex].data().order + 5
      );
    } else {
      order = randomNumberFromInterval(
        lists[dragOverItemIndex - 1]?.data().order,
        lists[dragOverItemIndex].data().order
      );
    }

    if (params.w_id && params.b_id) {
      editListOrder(params.w_id, params.b_id, l_id, order);
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
    setLists,
    handleDragEnd,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
  };
};

export default useBoard;
