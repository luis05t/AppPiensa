export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
