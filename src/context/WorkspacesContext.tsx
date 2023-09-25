import React, { createContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { ILayout } from "../utils/interfaces/interfaces";

export const WContext = createContext<QueryDocumentSnapshot<DocumentData, DocumentData>[] | []>([]);

const WorkspacesContext:React.FC<ILayout> = ({ children }) => {
  const [workspaces, setworkspaces] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[] | []>([]);

  useEffect(() => {
    onSnapshot(query(collection(db, "workspaces")), (snapshot) => {
      setworkspaces(
        snapshot.docs.filter((s) => s.data().user_id === auth.currentUser?.uid)
      );
    });
  }, []);
  return <WContext.Provider value={workspaces}>{children}</WContext.Provider>;
};

export default WorkspacesContext;

