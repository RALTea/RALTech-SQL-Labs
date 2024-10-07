export type LoginDto = {
	email: string;
	password: string;
} | {
	username: string;
	password: string;
}