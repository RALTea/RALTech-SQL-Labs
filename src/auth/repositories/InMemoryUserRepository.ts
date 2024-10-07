import { User } from "../entities/User";
import { CreateUser, GetUserByEmail, GetUserByUsername } from "../interfaces/UserRepository";

type UserRepository = CreateUser & GetUserByEmail & GetUserByUsername & { users: () => User[] };
export const InMemoryUserRepository = (initialUsers?: User[]): UserRepository => {
	const users: User[] = initialUsers ?? [];

	return {
		createUser: async function(user) {
			const newUser = { ...user, id: crypto.randomUUID() };
			users.push(newUser);
			return newUser;
		},
		getUserByEmail: async function(email) {
			return users.find((user) => user.email === email) ?? null;
		},
		getUserByUsername: async function(username) {
			return users.find((user) => user.username === username) ?? null;
		},
		users: () => {
			return users;
		}
	}
};
