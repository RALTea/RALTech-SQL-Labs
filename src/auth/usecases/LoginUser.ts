import { LoginDto } from "../dto/Login";
import { User } from '../entities/User';
import { UserNotFound } from '../errors/UserNotFound';
import { PasswordValidator } from '../interfaces/PasswordValidator';
import { GetUserByEmail, GetUserByUsername } from "../interfaces/UserRepository";

type Input = {
	data: LoginDto;
	dependencies: {
		userRepository: GetUserByEmail & GetUserByUsername;
		passwordValidator: PasswordValidator;
	};
};

export const LoginUser = ({ data, dependencies }: Input) => {
	const { userRepository, passwordValidator } = dependencies;
	return {
		execute: async () => {
			let userByEmail: User | null = null;
			let userByUsername: User | null = null;

			if ("email" in data) {
				userByEmail = await userRepository.getUserByEmail(data.email).catch(() => null);
			}
			if (!userByEmail && "username" in data) {
				userByUsername = await userRepository.getUserByUsername(data.username).catch(() => null);
			}

			if (!userByEmail && !userByUsername) {
				throw new UserNotFound();
			}

			if (userByEmail && passwordValidator.validatePassword(userByEmail.password, data.password)) {
				return userByEmail;
			}

			if (userByUsername && passwordValidator.validatePassword(userByUsername.password, data.password)) {
				return userByUsername;
			}

			return null
		},
	};
};
