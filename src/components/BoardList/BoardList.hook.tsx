/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import {
  addCard,
  deleteList,
  editCardOrder,
  editListName,
} from "../../utils/requests/requests_firebase";
import { randomNumberFromInterval } from "../../utils/helpers/helpers";

const useBoardList = (
  list: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  const [showListNameInput, setShowListNameInput] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>("");
  const [cards, setCards] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[] | []
  >([]);
  const [dragItemIndex, setDragItemIndex] = useState<any>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<any>();

  const params = useParams();

  useEffect(() => {
    setListName(list.data().name);

    if (params.w_id && params.b_id) {
      onSnapshot(
        query(
          collection(
            db,
            "workspaces",
            params.w_id,
            "boards",
            params.b_id,
            "lists",
            list.id,
            "cards"
          )
        ),
        (snapshot) => {
          setCards(
            snapshot.docs.sort((a, b) => a.data().order - b.data().order)
          );
        }
      );
    }
  }, [params]);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const toggleListNameInput = () => {
    setShowListNameInput(!showListNameInput);
  };

  const handleListName = (e: React.FormEvent<HTMLInputElement>) => {
    setListName(e.currentTarget.value);
  };

  const handleEditListName = async () => {
    toggleListNameInput();

    if (listName.trim() === "") {
      setListName(list.data().name);
      return;
    }

    if (params.w_id && params.b_id) {
      await editListName(params.w_id, params.b_id, list.id, listName);
    }
  };

  const handleDeleteList = async () => {
    if (params.w_id && params.b_id) {
      await deleteList(params.w_id, params.b_id, list.id);
    }
    alert("List deleted!");
  };

  const addNewCard = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toggleInput();

    let order = cards.length + 5;
    if (params.w_id && params.b_id) {
      await addCard(params.w_id, params.b_id, list.id, cardName, order);
    }
    setCardName("");
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

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, c_id: string) => {
    const _cards = [...cards];
    const dragItem = _cards.splice(dragItemIndex, 1)[0];
    _cards.splice(dragOverItemIndex, 0, dragItem);
    console.log(_cards);
    setCards(_cards);
    setDragItemIndex(null);
    setDragOverItemIndex(null);
    console.log(dragOverItemIndex, dragItem);

    let order;
    if (dragOverItemIndex === 0) {
      order = randomNumberFromInterval(
        0,
        cards[dragOverItemIndex].data().order
      );
    } else if (dragOverItemIndex === cards.length - 1) {
      order = randomNumberFromInterval(
        cards[dragOverItemIndex].data().order,
        cards[dragOverItemIndex].data().order + 5
      );
    } else {
      order = randomNumberFromInterval(
        cards[dragOverItemIndex - 1]?.data().order,
        cards[dragOverItemIndex].data().order
      );
    }

    if (params.w_id && params.b_id) {
      editCardOrder(params.w_id, params.b_id, list.id, c_id, order);
    }
  };

  return {
    cards,
    cardName,
    showInput,
    listName,
    showListNameInput,
    toggleListNameInput,
    handleEditListName,
    handleListName,
    setCardName,
    toggleInput,
    addNewCard,
    handleDeleteList,
    handleDragEnd,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
  };
};

export default useBoardList;
