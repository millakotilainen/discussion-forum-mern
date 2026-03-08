const tempRepository = {
    async findByEmail(email: string) {
        return{
            id: "1",
            username: "testuser",
            email,
            passwordHash: "hashed-password",
        };
    },

    async create(user: any) {
        return {
            id: "1",
            username: user.username,
            email: user.email,
            passwordHash: user.passwordHash,
        };
    },
};

export default tempRepository;