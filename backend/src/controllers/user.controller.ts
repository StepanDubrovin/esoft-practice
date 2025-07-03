import { Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api_errors";

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    registration = async(req: any, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errorMessages)
                )
            }

            const registrationResponse = await this.userService.registration(req.body);

            res.cookie('accessToken', registrationResponse.accessToken, {
                maxAge: 30 * 60 * 1000, 
                httpOnly: true,
            });

            res.status(200).json({
                accessToken: registrationResponse.accessToken,
                user: registrationResponse.user,
                validToken: true
            });

        } catch(e) {
            next(e);
        }
    }

    login = async(req: any, res: Response, next: NextFunction) => {
        try {
            const loginResponse = await this.userService.login(req.body)
            res.cookie('accessToken', loginResponse.accessToken, {
                maxAge: 30 * 60 * 1000, 
                httpOnly: true,
            });

            res.status(200).json({
                accessToken: loginResponse.accessToken,
                user: loginResponse.user,
                validToken: true
            });
        } catch (e) {
            next(e);
        }
    }

    logout = async(req: any, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('accessToken');
            res.status(200).json('Successfully logged out');
        } catch (e) {
            next(e);
        }
    }

    getAllUsers = async(req: any, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();

            if (users) {
                res.status(200).json(users)
            } else {
                return next(
                    ApiError.NotFound('Пользователи не найдены')
                )
            }
        } catch (e) {
            next(e)
        }
    }

    getUserById = async(req: any, res: Response, next: NextFunction) => {
        try {
            const user_id = req.params.id;
            const user = await this.userService.getUserById(user_id);

            if (user) {
                res.status(200).json(user);
            } else {
                return next (
                    ApiError.NotFound('Пользователь не найден')
                )
            }

        } catch (e) {
            next(e);
        }
    }

    checkAuth = async(req: any, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({validToken: true});
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;