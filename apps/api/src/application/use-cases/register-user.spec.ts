import {expect} from 'chai';
import { RegisterUser, type UserRepository, type PasswordHasher, 
    type UserRecord, EmailAlreadyInUseError} from './register-user';


class MockUserRepository implements UserRepository {
    private users: UserRecord[] = [];

    async findByEmail(email: string): Promise<UserRecord | null> {
        return this.users.find((user) => user.email === email) ?? null;
    }

    async create(user: { 
        username: string;
        email: string;
        passwordHash: string;
    }) : Promise<UserRecord> {
        const createdUser: UserRecord = {
            id: String(this.users.length + 1),
            username: user.username,
            email: user.email,
            passwordHash: user.passwordHash,
        };

        this.users.push(createdUser);
        return createdUser;
    }

    seed(user: UserRecord) {
        this.users.push(user);
    }

    allUsers() {
        return this.users;
    }
}

class MockPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        return `hashed-${password}`;
    }
}

describe('RegisterUser', () => {
    it('creates user successfully', async () => {
        const repo = new MockUserRepository();
        const hasher = new MockPasswordHasher();
        const useCase = new RegisterUser(repo, hasher);

        const result = await useCase.execute({
            username: 'jane',
            email: 'jane@example.com',
            password: 'password123',
        });

        expect(result).to.deep.equal({
            id: '1',
            username: 'jane',
            email: 'jane@example.com'
        });
    });

    it('rejects duplicate email', async () => {
        const repo = new MockUserRepository();
        const hasher = new MockPasswordHasher();
        const useCase = new RegisterUser(repo, hasher);

        repo.seed({
            id: '1',
            username: 'existing',
            email: 'jane@example.com',
            passwordHash: 'hashed-password123',
        });

        try{
            await useCase.execute({
                username: 'jane',
                email: 'jane@example.com',
                password: 'password123',
            });

            expect.fail('Expected EmailAlreadyInUseError to be thrown')
        } catch (err) {
            expect(err).to.be.instanceof(EmailAlreadyInUseError);
        }
    });

    it('hashes password before saving', async () => {
        const repo = new MockUserRepository();
        const hasher = new MockPasswordHasher();
        const useCase = new RegisterUser(repo, hasher);

        await useCase.execute({
            username: 'jane',
            email: 'jane@example.com',
            password: 'password123',
        });

        const savedUser = repo.allUsers()[0];

        expect(savedUser.passwordHash).to.equal('hashed-password123');
        expect(savedUser.passwordHash).to.not.equal('password123');
    
    });

});