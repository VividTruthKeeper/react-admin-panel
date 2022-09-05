export interface userType {
  username: string;
  accessLevel: string;
}

export interface userContextType {
  user: userType;
  setUser: React.Dispatch<userType>;
}
