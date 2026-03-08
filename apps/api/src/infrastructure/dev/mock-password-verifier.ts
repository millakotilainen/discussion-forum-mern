const tempVerifier = {
    async compare(password: string, hash: string) {
        return hash === "hashed-" + password;
    },
};

export default tempVerifier;