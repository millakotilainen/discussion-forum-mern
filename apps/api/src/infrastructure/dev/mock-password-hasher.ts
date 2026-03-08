const tempHasher = {
    async hash(password: string) {
        return "hashed-" + password;
    },
};

export default tempHasher;