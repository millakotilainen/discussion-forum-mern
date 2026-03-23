import { connectToDatabase } from '../database/mongo-client';

const mongoUserRepository = {
  async findByEmail(email: string) {
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      return null;
    }
    
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash
    };
  },
  async create(user: { username: string; email: string; passwordHash: string }) {
    const db = await connectToDatabase();

    const result = await db.collection("users").insertOne({
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash
    });
    
    return {
        id: result.insertedId.toString(),
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash
    };
  },
};

export default mongoUserRepository;