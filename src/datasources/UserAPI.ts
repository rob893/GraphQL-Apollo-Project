import { DataSource } from "apollo-datasource";
import { Connection, Repository } from "typeorm";
import { Request } from "apollo-server";
import { User } from "../entity/User";

export class UserAPI extends DataSource {

    private readonly repo: Repository<User>;


    public constructor(dbConnection: Connection) {
        super();
        this.repo = dbConnection.getRepository(User);
    }


    public async getAllUsers(): Promise<User[]> {
        const users = await this.repo.find();

        return users;
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await this.repo.findOne(id);

        if (!user) {
            return null;
        }

        return user;
    }

    public async createUser(userToCreate: User | { firstName: string, lastName: string, age: number }): Promise<User> {
        const user = new User();
        user.firstName = userToCreate.firstName;
        user.lastName = userToCreate.lastName;
        user.age = userToCreate.age;

        const createdUser = await this.repo.save(user);

        return createdUser;
    }
}