import { IUser } from "./IUser";

export interface IUserState {
    isAuth: boolean,
    isLoading: boolean,
    validToken: boolean,
    currentUser: IUser | null; 
    users: IUser[];
}