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

export interface TokenService {
   sign(payload: {userId: string; email: string}): Promise<string>;
}

export class LoginUser {
    constructor (
        private readonly userRepository: UserRepository,
        private readonly passwordVerifier: PasswordVerifier,
        private readonly tokenService: TokenService
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

        const token = await this.tokenService.sign({ userId: user.id, email: user.email });
       
        return{
            token: token,
            user: {
                id: user?.id,
                username: user?.username,
                email: user?.email,
            },
        }
    }
}