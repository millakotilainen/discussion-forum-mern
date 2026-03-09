const mockPasswordHasher = {
    async hash(password: string) {
        return `hashed-${password}`;
    },
};

export default mockPasswordHasher;