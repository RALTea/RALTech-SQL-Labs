import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { userRepository } from "../..";
import { EmailAlreadyInUse } from "../errors/EmailAlreadyInUse";
import { UsernameAlreadyInUse } from "../errors/UsernameAlreadyInUse";
import { LoginUser } from "../usecases/LoginUser";
import { RegisterNewUser } from "../usecases/RegisterNewUser";
import { PlainTextValidator } from "../validators/PlainTextValidator";

const app = new Hono();

// Define Zod schemas for validation
const loginSchema = z
	.object({
		password: z.string(),
	})
	.and(z.union([z.object({ email: z.string().email() }), z.object({ username: z.string() })]));

const registerSchema = z.object({
	email: z.string().email(),
	username: z.string(),
	password: z.string(),
});

// Login route
app.post("/login", zValidator("json", loginSchema), async (c) => {
	const data = c.req.valid("json");
	console.log("Login attempt:", data);

	try {
		const loginUseCase = LoginUser({
			data,
			dependencies: {
				userRepository: userRepository,
				passwordValidator: PlainTextValidator,
			},
		});
		const user = await loginUseCase.execute();
		if (!user) return c.json({ message: "Login failed" }, 400);
		return c.json({ message: "Login successful", user }, 200);
	} catch (error) {
		throw error;
	}
});

// Register route
app.post("/register", zValidator("json", registerSchema), async (c) => {
	const data = c.req.valid("json");
	console.log("Registration attempt:", data);
	try {
		const registerUseCase = RegisterNewUser({
			data,
			dependencies: {
				userRepository: userRepository,
			},
		});
		await registerUseCase.execute();
		console.log("Registration successful");
		return c.json({ message: "Registration successful" }, 201);
	} catch (error) {
		if (error instanceof EmailAlreadyInUse) return c.json({ message: "Email already in use" }, 400);
		if (error instanceof UsernameAlreadyInUse) return c.json({ message: "Username already in use" }, 400);
		return c.json({ message: "Registration failed, try again later" }, 500);
	}
});

export default app;
