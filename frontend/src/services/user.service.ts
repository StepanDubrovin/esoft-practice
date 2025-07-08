import $api from "../http";
import { AxiosResponse } from 'axios';
import { IUser } from "../models/IUser";
import { TFormUser } from "../models/TFormUser";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static async fetchUserById(id: string) : Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/user/${id}`);
    }

    static async updateUser(userData: TFormUser): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>(`/user/${userData.id}`, userData);
    }

}
