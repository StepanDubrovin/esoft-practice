import { IUser } from "../IUser";

export interface AuthResponse {
    accessToken: string,
    validToken: boolean,
    user: IUser
}