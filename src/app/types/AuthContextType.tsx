export interface AuthContextType {
  isAuthenticated: boolean;
  isLogout: boolean;
  login: (token: string, rememberToken: string) => void;
  logout: () => void;
  loading: boolean;
  user: any;
  userRoles: any;
  hasHigherRole: boolean;
  hasNormalRole: boolean;
  setIsRefresh: any;
  isSetProfile: any;
}
