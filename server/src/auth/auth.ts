import jwt from 'jsonwebtoken';
import global from '../config/global-config';

export interface TokenData {
    id: number;
    email: string;
}

export const generateToken = async (data: TokenData) => {
    return jwt.sign(data, global.AUTH_KEY, { expiresIn: '2d' });
};

export const decodeToken = async (token: string) => {
    var data = jwt.verify(token, global.AUTH_KEY);
    return data;
};