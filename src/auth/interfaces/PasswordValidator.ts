export type PasswordValidator = {
	validatePassword: (actual: string, expected: string) => boolean;
}