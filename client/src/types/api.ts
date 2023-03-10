export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  status: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  password?: string;
  userInfo?: string;
  phoneNumber?: number;
}

export interface Category {
  _id: string;
  name: string;
  __v?: number;
}

export interface Auth {
  success: boolean;
  error?: string;
  accessToken?: string;
}

export interface PostDetail {
  _id: string;
  post_name: string;
  description: string;
  user: User;
  tags: string[];
  imageList: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  key?: number;
}

export interface ContactDetail {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  user: User;
  category: Category;
  image: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  key?: number;
}

export type FormValues = {
  post_name: string;
  tags: any[];
  description: string;
  imageList: any[] | undefined;
  post_id?: string;
  userId?: string;
};

export type ContactFormValues = {
  name: string;
  email: any[];
  phoneNumber: string;
  image?: any[] | undefined;
};
