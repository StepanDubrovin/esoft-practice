import db from '../db';
import { ICreateUserData } from '../interfaces/ICreateUserData';
import { ApiError } from '../exceptions/api_errors';

class UserModel {
    async create(userData: ICreateUserData) {
        try {
            const query = db('users');
            await query.insert(userData) 
        } catch(err) {
            console.error('Error creating user', err);
            throw err;
        }
    }

    async getByEmail(email: string) {
        try {
            const query = db('users');
            return await query.where('email', email).first(); 
        } catch(err) {
            console.error('Error fetching user by email', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray)
        }
    }

    async getAll() {
        try {
            const query = db('users');
            return await query.select('*');
        } catch(err) {
            console.error('Error fetching all users', err)
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray)
        }
        
    }

    async getById(id: string) {
        try {
            const query = db('users');
            return await query.where('id', id).first();
        } catch(err) {
            console.error('Error fetching user by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray)
        }
    }
}

export default UserModel;