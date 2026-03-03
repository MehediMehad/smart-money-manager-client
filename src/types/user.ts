export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}


export type TGetMyInfo = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  role: 'ADMIN' | 'ORGANIZER' | 'USER'; 
  status: 'ACTIVE' | 'BLOCKED'; 
  createdAt: string; 
  updatedAt: string; 
};