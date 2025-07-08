import bcrypt from 'bcrypt';
import { v7 as uuidv7 }from 'uuid';
import UserModel from "../models/user.dal";
import TokenService from "./token.service";
import { INewUser } from '../interfaces/INewUser';
import { ApiError } from '../exceptions/api_errors';
import { ILoginData } from '../interfaces/ILoginData';
import { IUpdateUserData } from '../interfaces/IUpdateUserData';

class UserService {
    private userModel: UserModel;
    private tokenService: TokenService;
    
    constructor(userModel: UserModel, tokenService: TokenService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
    }

    async registration(userData: INewUser) {
        const existingUser = await this.userModel.getByEmail(userData.email);

        if(existingUser) {
            throw ApiError.BadRequest(`Пользователь с такой почтой - ${userData.email} уже существует`);
        }

        const hashedPassword = await bcrypt.hash(
            userData.password,
            parseInt(process.env.SALT_ROUNDS!)
        );

        const newUserData = {
            id: uuidv7(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: hashedPassword
        };

        await this.userModel.create(newUserData);

        const user = await this.userModel.getByEmail(userData.email);

        const accessToken = this.tokenService.generateToken({
            id: user.id,
            email: user.email
        })
        return{ 
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
         }
    }

    async login(userData: ILoginData) {
        const user = await this.userModel.getByEmail(userData.email);

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            const accessToken = this.tokenService.generateToken({
                id: user.id,
                email: user.email
            });
            return { 
                accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
             }
        } else {
            throw ApiError.BadRequest('Неверный пароль и email');
        }
    }

    async getAllUsers() {
        return await this.userModel.getAll();
    }

    async getUserById(id: string) {
        return await this.userModel.getById(id);
    }

    async updateUser (id: string, userData: IUpdateUserData) {
        const existingUser = await this.userModel.getById(id);

        if (!existingUser) {
            throw ApiError.BadRequest(`Пользователь с ID ${id} не найден`);
        }

        let hashedPassword = '';
        if(userData.password) {
            hashedPassword = await bcrypt.hash(
                userData.password,
                parseInt(process.env.SALT_ROUNDS!)
            );
        }

        const newUserData = Object.assign(
            {},
            userData.firstName && { firstName: userData.firstName},
            userData.lastName && { lastName: userData.lastName},
            userData.email && { email: userData.email},
            hashedPassword !== '' && { password: hashedPassword }
        )   

        return this.userModel.update(id, newUserData);
    }
}

export default UserService;