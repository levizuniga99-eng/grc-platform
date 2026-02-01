export type UserRole = "client" | "auditor";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
