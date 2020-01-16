import { IResolvers } from "apollo-server";
import { UserAPI } from "./datasources/UserAPI";

export const resolvers: IResolvers = {
    Query: {
        test: () => 'Hello world!',
        users: async (root, args, { dataSources }) => {
            const userAPI: UserAPI = dataSources.userAPI;

            const allUsers = await userAPI.getAllUsers();

            return allUsers;
        },
        user: async (root, id, { dataSources }) => {
            const userAPI: UserAPI = dataSources.userAPI;

            const user = await userAPI.getUserById(id);

            return user;
        }
    },
    Mutation: {
        registerUser: async (root, userToRegister: { user: {firstName: string, lastName: string, age: number}}, { dataSources }) => {
            const userAPI: UserAPI = dataSources.userAPI;

            const createdUser = await userAPI.createUser(userToRegister.user);

            return createdUser;
        }
    }
}