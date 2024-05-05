interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  email_verified_at: Date;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
  deleted_by: string;
}

export default User;
