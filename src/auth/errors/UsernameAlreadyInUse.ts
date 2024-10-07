export class UsernameAlreadyInUse extends Error {
	constructor() {
		super("Username already in use");
	}
}