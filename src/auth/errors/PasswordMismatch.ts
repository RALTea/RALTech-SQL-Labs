export class PasswordMismatch extends Error {
	constructor() {
		super("Password mismatch");
	}
}