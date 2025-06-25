import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { AxiosResponse } from "axios";
import { ISignUpData } from "../models/ISignUpData";
import { ISignInData } from "../models/ISignInData";
import { CheckAuthResponse } from "../models/response/CheckAuthResponse";

export default class AuthService {
    static async registration(signUpData: ISignUpData
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', signUpData);
    }

    static async login(signInData: ISignInData
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', signInData)
    }

    static async logout(): Promise<void> {
        return $api.post('logout');
    }

    static async checkAuth(): Promise<AxiosResponse<CheckAuthResponse>> {
        return $api.get<CheckAuthResponse>('/checkAuth');
    }
}