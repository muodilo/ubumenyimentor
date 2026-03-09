import { RoleEnum } from "./user-slice";

export interface ProtectedRoute {
  title: string;
  url: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon?: any;
  role: RoleEnum[];
}
export interface LoginResponse {
  status: boolean;
  message: string;
  errors: { message: string }[] | null;
  data: {
    user: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      role: RoleEnum;
    };
  };
}
