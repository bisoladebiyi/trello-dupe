import React from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export interface IRoutes {
    SIGNUP: string,
    LOGIN: string;
    BOARDS: string;
    BOARD: string;
    HOME: string;
}

export interface IAuth {
    type?: 'signup' | 'login'
}

export interface IButton {
    text: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>, method?: string) => void;
    disabled?: boolean;
    type?: "primary" | "dark"
}

export interface IDashboardLayout {
    active: string,
    children: React.ReactNode
}

export interface ILayout { 
    children: React.ReactNode
}

export interface ISideBar {
    active: string;
}

export interface INavbar {
    toggleWorkspaceModal: () => void
    toggleBoardModal: () => void
}

export interface INewWorkspaceModal extends Omit<INavbar, "toggleBoardModal"> {
    workspaceName: string;
    setWorkspaceName: React.Dispatch<React.SetStateAction<string>>
}

export interface INewBoardModal extends Omit<INavbar, "toggleWorkspaceModal"> {
    boardName: string;
    workspaceID: string;
    setBoardName: React.Dispatch<React.SetStateAction<string>>
    setWorkspaceID: React.Dispatch<React.SetStateAction<string>>
}

export interface IWorkspace extends Omit<INavbar, "toggleWorkspaceModal"> {
    workspace: QueryDocumentSnapshot<DocumentData, DocumentData>;
    setWorkspaceID: React.Dispatch<React.SetStateAction<string>>;
    isWorkspacePage?: boolean
}

export interface IBoards extends Omit<INavbar, "toggleWorkspaceModal"> {
    setWorkspaceID: React.Dispatch<React.SetStateAction<string>>
    toggleWorkspaceModal?: () => void
}

export interface IBoardList {
    list: QueryDocumentSnapshot<DocumentData, DocumentData>
}

export interface ICard {
    card: QueryDocumentSnapshot<DocumentData, DocumentData>
    l_id: string
}