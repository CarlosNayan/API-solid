import fastify from "fastify";
import { appRoutes } from "./routes/userRoutes";

export const app = fastify();

app.register(appRoutes);
