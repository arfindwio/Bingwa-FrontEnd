import Cookies from "universal-cookie";

const cookies = new Cookies();

export const CookiesKeys = {
  AuthToken: "authToken",
  RegisterToken: "registerToken",
  EmailRegister: "emailRegister",
  CategoryFilter: "categoryFilter",
  SearchFilter: "searchFilter",
};

const CookieOptions = {
  path: "/",
  secure: true,
};

export const CookieStorage = {
  set: (key, data, options) => {
    return cookies.set(key, data, { ...CookieOptions, ...options });
  },
  get: (key, options) => {
    return cookies.get(key, { ...CookieOptions, ...options });
  },
  remove: (key, options) => {
    return cookies.remove(key, { ...CookieOptions, ...options });
  },
};
