export interface IRoutes {
    SIGNUP: string,
    LOGIN: string;
    BOARDS: string;
    BOARD: string;
}

export interface IAuth {
    type?: 'signup' | 'login'
}