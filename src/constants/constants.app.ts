export const BREAKPOINTS = {
  xs: [0, 599],
  sm: [600, 899],
  md: [900, 1199],
  lg: [1200, 1535],
  xl: [1536],
};

export enum TYPOGRAPHY_SIZE {
  "extra-small" = 12,
  small = 14,
  medium = 16,
  large = 18,
  "extra-large" = 20,
}

export enum GLOBAL_MODAL_TYPE {
  BASE_MODAL = "BASE_MODAL",
  LOGIN_MODAL = "LOGIN_MODAL",
  REGISTER_MODAL = "REGISTER_MODAL",
  SIDEBAR_MODAL = "SIDEBAR_MODAL",
  JOIN_GROUP_MODAL = "JOIN_GROUP_MODAL",
  CHAT_MODAL = "CHAT_MODAL",
  NEW_GROUP_MODAL = "NEW_GROUP_MODAL",
  MANAGE_USERS_MODAL = "MANAGE_USERS_MODAL",
}

export enum GROUP_ROLE {
  PENDING = "PENDING",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
