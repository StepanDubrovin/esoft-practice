import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import { ISignInData } from "../models/ISignInData";
import { ISignUpData } from "../models/ISignUpData";
import { IUserState } from "../models/IUserState";

const initialState: IUserState = {
    isAuth: false,
    isLoading: false,
    validToken: false,
};

export const registration = createAsyncThunk(
    'user/registration',
    async (payload: ISignUpData, { rejectWithValue }) => {
        try {
            const response = await AuthService.registration(payload);
            return { isAuth: true, validToken: response.data.validToken};
        } catch (error: unknown) {
            console.error('Ошибка при регистрации', error);
            return rejectWithValue(error.message);
        }
    },
);

export const login = createAsyncThunk(
    'user/login',
    async (payload: ISignInData, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(payload);
            return { isAuth: true, validToken: response.data.validToken };
        } catch (error) {
            console.error('Ошибка при входе', error);
            return rejectWithValue(error.message);
        }
    },
);

export const logout = createAsyncThunk(
    'user/logout',
    async(_, { rejectWithValue }) => {
        try {
            await AuthService.logout();
            return { isAuth: false, validToken: false };
        } catch (error) {
            console.error('Ошибка при выходе', error);
            return rejectWithValue(error.message);
        }
    },
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.checkAuth();
            if (!response.data.validToken) {
                return rejectWithValue('Токен отсутствует');
            }
            return { isAuth: true, validToken: response.data.validToken};
        } catch (error) {
            console.error('Ошибка проверки авторизации', error);
            return rejectWithValue(error.message);
        }
    },
);

const userReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case registration.pending.type:
        case login.pending.type: 
        case logout.pending.type:
        case checkAuth.pending.type: 
            return {
                ...state,
                isLoading: true
            };
        case registration.fulfilled.type:
        case login.fulfilled.type:
        case logout.fulfilled.type:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                isLoading: false,
                validToken: action.payload.validToken,
            };
        case checkAuth.fulfilled.type:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                isLoading: false,
                validToken: action.payload.validToken
            };
        case login.rejected.type:
        case registration.rejected.type:
        case logout.rejected.type:
            return {
                ...state,
                isLoading: false,
            };
        case checkAuth.rejected.type:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                validToken: false,
            };
        default: 
            return state;
    }
};

export default userReducer;