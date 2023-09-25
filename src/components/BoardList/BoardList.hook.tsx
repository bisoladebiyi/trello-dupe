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
import { addCard } from "../../utils/requests/requests_firebase";

const useBoardList = (list:QueryDocumentSnapshot<DocumentData, DocumentData>) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>("");
  const [cards, setCards] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[] | []
  >([]);

  const params = useParams();

  useEffect(() => {
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

  const addNewCard = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toggleInput();

    let order = cards.length + 1;
    if (params.w_id && params.b_id) {
      await addCard(params.w_id, params.b_id, list.id, cardName, order);
    }
    setCardName("");
  };
  return { cards, cardName, showInput, setCardName, toggleInput, addNewCard };
};

export default useBoardList;
