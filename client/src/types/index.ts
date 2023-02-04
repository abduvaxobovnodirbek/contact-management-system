import { ContactDetail, PostDetail, User } from "./api";

export type windowSizeObject = {
  width: number;
  height: number;
};

export type routesType = {
  path: string;
  element: () => JSX.Element;
  protected: boolean;
}[];

export type childrenProps = {
  children: JSX.Element;
};

export type ModalState = {
  showModal: boolean;
  showEmailLoginForm: boolean;
  showEmailRegisterForm: boolean;
  showProfileModal: boolean;
};

export type Steps = {
  stepFirst: boolean;
  stepSecond: boolean;
  stepThird: boolean;
};

export interface authButton {
  icon: string;
  text: string;
  handleFunc: (response: any) => void;
}

export type postEditorTypes = {
  displayMode: "EDIT" | "PREVIEW";
  formik?: any;
  createPost: boolean;
  post?: string;
};

export type headerMobileMenu = {
  mobileMoreAnchorEl: HTMLElement | null;
  isMobileMenuOpen: boolean;
  user: any;
  handleMobileMenuClose: any;
  handleProfileMenuOpen: any;
};

export type headerMenu = {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  user: any;
  handleLogout: () => void;
  handleMenuClose: (str: string) => void;
  location: any;
  t?: any;
};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type TabTypes = {
  tabOptions: { names: string[] };
};

export interface ColumnProps {
  handleDelete: (str: string) => void;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPost: React.Dispatch<React.SetStateAction<PostDetail | undefined>>;
  filterData: (data: PostDetail[]) => (formatter: any) =>
    | {
        text: any;
        value: any;
      }[]
    | undefined;
  posts: PostDetail[] | undefined;
}

export interface ColumnUserProps {
  handleDelete: (str: string) => void;
  handleStatus: (val: User) => void;
  handleShowProfile: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  filterData: (data: User[]) => (formatter: any) =>
    | {
        text: any;
        value: any;
      }[]
    | undefined;
  users: User[] | undefined;
}

export interface ColumnContactProps {
  handleDelete: (str: string) => void;
  filterData: (data: ContactDetail[]) => (formatter: any) =>
    | {
        text: any;
        value: any;
      }[]
    | undefined;
  users: ContactDetail[] | undefined;
}

export interface panelProps {
  users: User[] | undefined;
  isLoading: boolean;
  handleShowProfile: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export interface panelContactProps {
  users: ContactDetail[] | undefined;
  isLoading: boolean;
}
