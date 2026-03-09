import {expect} from 'chai';
import {LoginUser, type UserRepository, type UserRecord,
    type PasswordVerifier, InvalidCredentialsError,
} from './login-user'; 

class MockUserRepository implements UserRepository {
    private users: UserRecord[] = [];

    async findByEmail(email: string): Promise<UserRecord | null> {
        return this.users.find((user) => user.email === email) ?? null;
    }

    seed(user: UserRecord) {
        this.users.push(user);
    }
}

class MockPasswordVerifier implements PasswordVerifier {
    async compare(password: string, passwordHash: string): Promise<boolean> {
        return passwordHash === `hashed-${password}`;
    }
}

describe('LoginUser', () => {
    it('succeeds with correct password', async () => {
        const repo = new MockUserRepository();
        const verifier = new MockPasswordVerifier();
        const useCase = new LoginUser(repo, verifier);

        repo.seed({
            id: '1',
            username: 'jane',
            email: 'jane@example.com',
            passwordHash: 'hashed-password123',
        });

        const result = await useCase.execute({
            email: 'jane@example.com',
            password: 'password123',
        });

        expect(result).to.deep.equal({
            token: 'TODO_GENERATE_TOKEN',
            user: {
                id: '1',
                username: 'jane',
                email: 'jane@example.com',
            },
        });
    });

    it('rejects unknown email', async () => {
        const repo = new MockUserRepository();
        const verifier = new MockPasswordVerifier();
        const useCase = new LoginUser(repo, verifier);

        try {
            await useCase.execute({
                email: 'unknown@example.com',
                password: 'password123',
            });

            expect.fail('Expected InvalidCredentialsError to be thrown');
        } catch (err) {
            expect(err).to.be.instanceOf(InvalidCredentialsError);
        }
    });

    it('rejects incorrect password', async () => {
        const repo = new MockUserRepository();
        const verifier = new MockPasswordVerifier();
        const useCase = new LoginUser(repo, verifier);

        repo.seed({
            id: '1',
            username: 'jane',
            email: 'jane@example.com',
            passwordHash: 'hashed-password123'
        });

        try{
            await useCase.execute({
                email: 'jane@example.com',
                password: 'wrongpassword',
            });

            expect.fail('Expected InvalidCredentialsError to be thrown')
        } catch (err) {
            expect(err).to.be.instanceOf(InvalidCredentialsError);
        }
    });

});

