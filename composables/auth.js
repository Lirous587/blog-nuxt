const adminAccessTokenKey = "adminAccessToken";
const adminRefreshTokenKey = "adminRefreshToken";
const userAccessTokenKey = "userAccessToken";
const userRefreshTokenKey = "userRefreshToken";

const userInfoKey = "useInfo";

export const setAdminRefreshToken = (refreshToken) => {
  useCookie(adminRefreshTokenKey).value = refreshToken;
};

export const setAdminAccessToken = (token) => {
  useCookie(adminAccessTokenKey).value = token;
};

export const getAdminRefreshToken = () => {
  const refreshToken = useCookie(adminRefreshTokenKey).value;
  return refreshToken;
};

export const getAdminAccessToken = () => {
  const token = useCookie(adminAccessTokenKey).value;
  return token;
};

export const removeAdminRefreshToken = () => {
  useCookie(adminRefreshTokenKey).value = null;
};

export const removeAdminAccessToken = () => {
  useCookie(adminAccessTokenKey).value = null;
};

export const setUserRefreshToken = (refreshToken) => {
  useCookie(userRefreshTokenKey).value = refreshToken;
};

export const setUserAccessToken = (token) => {
  useCookie(userAccessTokenKey).value = token;
};

export const getUserRefreshToken = () => {
  const refreshToken = useCookie(userRefreshTokenKey).value;
  return refreshToken;
};

export const getUserAccessToken = () => {
  const token = useCookie(userAccessTokenKey).value;
  return token;
};

export const removeUserRefreshToken = () => {
  useCookie(userRefreshTokenKey).value = null;
};

export const removeUserAccessToken = () => {
  useCookie(userAccessTokenKey).value = null;
};

export const setUserInfo = (info) => {
  useCookie(userInfoKey).value = info;
};

export const getUserInfo = (info) => {
  return useCookie(userInfoKey).value;
};

export const removeUserInfo = (info) => {
  useCookie(userInfoKey).value = null;
};
