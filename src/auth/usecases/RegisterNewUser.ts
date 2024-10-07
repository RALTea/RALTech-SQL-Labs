import { RegisterDto } from "../dto/Register";
import { EmailAlreadyInUse } from "../errors/EmailAlreadyInUse";
import { UsernameAlreadyInUse } from "../errors/UsernameAlreadyInUse";
import { CreateUser, GetUserByEmail, GetUserByUsername } from "../interfaces/UserRepository";

type Input = {
	data: RegisterDto;
	dependencies: {
		userRepository: CreateUser & GetUserByEmail & GetUserByUsername;
	};
};

export const RegisterNewUser = ({ data, dependencies }: Input) => {
	const { userRepository } = dependencies;
	return {
		execute: async () => {
			// Checks
			const userByEmail = await userRepository.getUserByEmail(data.email).catch(() => null);
			if (userByEmail) {
				throw new EmailAlreadyInUse();
			}
			const userByUsername = await userRepository.getUserByUsername(data.username).catch(() => null);;
			if (userByUsername) {
				throw new UsernameAlreadyInUse();
			}

			// Create user
			const user = await userRepository.createUser({
				email: data.email,
				username: data.username,
				password: data.password,
			});

			return user;
		},
	};
};
