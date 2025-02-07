export interface JWTUserPayload {
	sub: string;
	role: "ADMIN" | "MEMBER";
}
