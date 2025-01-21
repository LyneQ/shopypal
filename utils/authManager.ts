import {compare, genSalt, hash} from 'bcrypt-ts';
import pool from '@/db/index';
import {generateCustomUuid} from "custom-uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";

import User from '@/types/user';

dotenv.config();

export default class AuthManager {

    static async login(email: string, password: string) {
        const [rows] = await pool.query('SELECT * FROM user_credentials WHERE email = ?', [email]) as any;
        const user = rows[0];
        if (!user) return {message: 'User not found', token: null, receivedBody: null};

        const validPassword = await compare(password, user.password);
        if (!validPassword) return {message: 'Invalid password', token: null, receivedBody: null};

        return {message: 'User connected', token: 'fake-jwt-token', receivedBody: user};
    }

    static async register(email: string, password: string, firstname: string, lastname: string) {
        const [rows] = await pool.query('SELECT * FROM user_credentials WHERE email = ?', [email]) as any;
        const user = rows[0];

        if (user) return {message: 'User already exists'};

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const userId = generateCustomUuid("123456789", 9);

        try {
            await pool.query('INSERT INTO user_profile (id, firstname, lastname, role_id) VALUES (?, ?, ?, ?)', [userId, firstname, lastname, 1]);
            await pool.query('INSERT INTO user_credentials (id, email, password) VALUES (?, ?, ?)', [userId, email, hashedPassword]);
        } catch (error) {
            console.error('Error inserting user data:', error);
            return {message: 'Error creating user'};
        }
        const userProfile = {id: userId, firstname, lastname, role_id: 1};
        return {
            message: 'User created', token: 'fake-jwt-token', receivedBody: userProfile
        }
    }

    static async generateJwtToken(email: string) {
        if (!process.env.JWT_SECRET) return {message: ' Server error - JWT_SECRET not defined', token: null};
        const user = await pool.query('SELECT id FROM user_credentials WHERE email = ?', [email]);
        if (!user) return {message: 'User not found', token: null};
        const userID: any = user[0];

        return jwt.sign({
            userID: userID[0].id,
            email: email,
        }, process.env.JWT_SECRET, {expiresIn: '5h'});
    }

    static async verifyJwtToken(token: any) {
        if (!process.env.JWT_SECRET) return {message: ' Server error - JWT_SECRET not defined', token: null};
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    static getUserIDFromToken(token: any) {
       if (!token.value) return {message: 'No token provided', token: null};
        const decodedJWT: any = jwtDecode(token.value);
        return decodedJWT.userID;
    }

    static async getUserProfile(userID: any): Promise<User> {
        const querry = `
            SELECT user_profile.*, user_credentials.email
            FROM user_profile
                     LEFT JOIN user_credentials
                        ON user_profile.id = user_credentials.id
            WHERE user_profile.id = ?`
const [rows] = await pool.query(querry, [userID]) as any;
        return {
           ...rows[0]
        };
    }
}