import { UnauthorizedException } from "@nestjs/common";

export async function verifyUserRole(
	userRole: "PROFESSIONAL" | "RECEPCIONIST" | "CLIENT",
	roleToAccess: Array<"PROFESSIONAL" | "RECEPCIONIST" | "CLIENT">
) {
	if (!roleToAccess.includes(userRole)) {
		throw new UnauthorizedException();
	}
}
