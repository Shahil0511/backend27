export interface RegisterDto {
	email: string;
	password: string;
}

export interface LoginDto {
	email: string;
	password: string;
}

export interface TokenPayload {
	id: string;
	email?: string;
	iat?: number;
	exp?: number;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export type DeleteUserDto = { email: string };

