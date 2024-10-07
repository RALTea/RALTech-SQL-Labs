import { PasswordValidator } from '../interfaces/PasswordValidator';

export const PlainTextValidator: PasswordValidator = {
	validatePassword: (actual: string, expected: string) => actual === expected
}