export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  title:string;
}


export interface AuthResponse {
  acces_token: string; // Doit correspondre exactement au log
  user: User;
}