import { User } from "../entities/User";

export type CreateUser = {
	createUser: (user: Omit<User, "id">) => Promise<User>;
};

export type GetUserByEmail = {
	getUserByEmail: (email: string) => Promise<User | null>;
};

export type GetUserByUsername = {
	getUserByUsername: (username: string) => Promise<User | null>;
};
