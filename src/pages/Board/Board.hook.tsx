import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import { addList } from "../../utils/requests/requests_firebase";

const useBoard = () => {
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

  useEffect(() => {
    console.log(params);
    if (params.w_id && params.b_id) {
      onSnapshot(
        query(collection(db, "workspaces", params.w_id, "boards")),
        (snapshot) => {
          setBoard(snapshot.docs.filter((s) => s.id === params.b_id)[0]);
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
    setListName,
    toggleInput,
    submit,
  };
};

export default useBoard;
