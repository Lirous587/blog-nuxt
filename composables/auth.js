const adminAccessTokenKey = "adminAccessToken";
const adminRefreshTokenKey = "adminRefreshToken";
const userAccessTokenKey = "userAccessToken";
const userRefreshTokenKey = "userRefreshToken";
const userInfoKey = "useInfo";

export const setAdminAccessToken = (token) => {
  useCookie(adminAccessTokenKey).value = token;
};

export const setAdminRefreshToken = (refreshToken) => {
  useCookie(adminRefreshTokenKey).value = refreshToken;
};

export const getAdminAccessToken = () => {
  const token = useCookie(adminAccessTokenKey).value;
  return token;
};

export const getAdminRefreshToken = () => {
  const refreshToken = useCookie(adminRefreshTokenKey).value;
  return refreshToken;
};

export const removeAdminAuth = () => {
  useCookie(adminRefreshTokenKey).value = null;
  useCookie(adminAccessTokenKey).value = null;
};

export const setUserAccessToken = (token) => {
  useCookie(userAccessTokenKey).value = token;
};

export const setUserRefreshToken = (refreshToken) => {
  useCookie(userRefreshTokenKey).value = refreshToken;
};

export const getUserAccessToken = () => {
  const token = useCookie(userAccessTokenKey).value;
  return token;
};

export const getUserRefreshToken = () => {
  const refreshToken = useCookie(userRefreshTokenKey).value;
  return refreshToken;
};

export const removeUserAuth = () => {
  useCookie(userRefreshTokenKey).value = null;
  useCookie(userAccessTokenKey).value = null;
  useCookie(userInfoKey).value = null;
};

export const setUserInfoCookie = (data) => {
  useCookie(userInfoKey).value = data;
};

export const getUserInfoFromCookie = () => {
  const useInfo = useCookie(userInfoKey).value;
  return useInfo;
};
