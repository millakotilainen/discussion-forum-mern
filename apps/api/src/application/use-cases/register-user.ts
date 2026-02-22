import {type RegisterRequest, type RegisterResponse} from "@forum/shared";

export interface UserRepository {
    findByEmail(email: string): Promise<UserRecord | null>;
    create(user: CreateUserRecord): Promise<UserRecord>;
}

export type UserRecord = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
};

export type CreateUserRecord = {
    username: string;
    email: string;
    passwordHash: string;
}

export interface PasswordHasher {
    hash(password: string): Promise<string>;
}

export class RegisterUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ) {}

    async execute(data: RegisterRequest): Promise<RegisterResponse> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        const passwordHash = await this.passwordHasher.hash(data.password);
    
        const newUser = await this.userRepository.create({
            username: data.username,
            email: data.email,
            passwordHash,
        });

        return{
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };

    }
}