import { CreateUser, GetUserByEmail, GetUserByUsername } from '../interfaces/UserRepository';

type _PrismaUserRepository = CreateUser & GetUserByEmail & GetUserByUsername;
export const PrismaUserRepository = (): _PrismaUserRepository => {
	return {
		createUser: async function(user) {
			throw new Error("Not implemented");
		},
		getUserByEmail: async function(email) {
			throw new Error("Not implemented");
		},
		getUserByUsername: async function(username) {
			throw new Error("Not implemented");
		},
	};
};