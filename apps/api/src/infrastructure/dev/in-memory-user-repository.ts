const users: Array <{
    id: string;
    username: string;
    email: string;
    passwordHash: string;
}> = [];


const inMemoryUserRepository = {
    async findByEmail(email: string) {
        return users.find((user) => user.email === email) ?? null;
    },

    async create(user: {
        username: string;
        email: string;
        passwordHash: string;
    }) {
        const createdUser = {
            id: String(users.length + 1),
            username: user.username,
            email: user.email,
            passwordHash: user.passwordHash,
        };
        
        users.push(createdUser);
        return createdUser;
    },
};

export default inMemoryUserRepository;