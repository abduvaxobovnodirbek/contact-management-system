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
  darkMode: boolean;
  handleDarkMode: () => void;
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
