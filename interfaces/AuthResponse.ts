export interface AuthLoginResponse {
  userId: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}

export interface AuthRegisterResponse {
  userId: string;
  accessToken: string;
}
