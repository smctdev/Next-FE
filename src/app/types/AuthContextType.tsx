export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, rememberToken: string) => void;
  logout: () => void;
  loading: boolean;
  user: any;
}
