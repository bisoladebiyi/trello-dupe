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
  editListName,
} from "../../utils/requests/requests_firebase";

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
          setCards(snapshot.docs);
        }
      );
    }
  }, [params, list]);

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

    let order = cards.length + 1;
    if (params.w_id && params.b_id) {
      await addCard(params.w_id, params.b_id, list.id, cardName, order);
    }
    setCardName("");
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
  };
};

export default useBoardList;
