import bcrypt, { compare } from 'bcrypt';

export default {
    async compare(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    },
};