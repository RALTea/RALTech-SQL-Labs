import { serve } from "@hono/node-server";
import { Hono } from "hono";
import AuthRouter from "./auth/adapters/HonoRouter";
import { InMemoryUserRepository } from './auth/repositories/InMemoryUserRepository';

const app = new Hono();
export const userRepository = InMemoryUserRepository()

app.route("/auth", AuthRouter);

app.get("/", (c) => {
	return c.text("Hello from Hono!");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
