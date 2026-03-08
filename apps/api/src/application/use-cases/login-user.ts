import {type LoginRequest,  type LoginResponse} from "@forum/shared";

export interface UserRepository {
    findByEmail(email: string): Promise<UserRecord | null>;
}

export type UserRecord = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
};

export interface PasswordVerifier {
    compare(password: string, passwordHash: string): Promise<boolean>;
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super("Invalid email or password.");
        this.name = "InvalidCredentialsError";
    }
}

export class LoginUser {
    constructor (
        private readonly userRepository: UserRepository,
        private readonly passwordVerifier: PasswordVerifier
    ) {}


    async execute (data: LoginRequest): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const passwordValid = await this.passwordVerifier.compare(
            data.password,
            user.passwordHash
        );

        if (!passwordValid) {
            throw new InvalidCredentialsError();
        }
       
        return{
            token: "TODO_GENERATE_TOKEN",
            user: {
                id: user?.id,
                username: user?.username,
                email: user?.email,
            },
        }
    }
}