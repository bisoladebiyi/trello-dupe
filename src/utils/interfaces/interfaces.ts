import React from "react";

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

export interface IDashboardLayout {
    active: string,
    children: React.ReactNode
}

export interface INavbar {
    toggleWorkspaceModal: () => void
}

export interface INewWorkspaceModal extends INavbar {
    workspaceName: string;
    setWorkspaceName: React.Dispatch<React.SetStateAction<string>>
}