import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // Indica que este módulo é global
@Module({
	providers: [PrismaService],
	exports: [PrismaService], // Exporta o PrismaService para que outros módulos possam utilizá-lo
})
export class PrismaModule {}
