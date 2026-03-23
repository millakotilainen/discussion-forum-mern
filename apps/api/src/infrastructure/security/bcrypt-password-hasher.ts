import bcrypt from 'bcrypt';

export default {
    async hash(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
};