import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ZodFilter } from "./config/utils/zod-filter.catch";
import { env } from "./config/env";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.useGlobalFilters(new ZodFilter());

	await app.listen(env.PORT ?? 3000);

	console.log(`🚀 HTTP Server running in http://localhost:${env.PORT}`);
}
bootstrap();
