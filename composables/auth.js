const adminAccessTokenKey = "adminAccessToken";
const adminRefreshTokenKey = "adminRefreshToken";
const userAccessTokenKey = "userAccessToken";
const userRefreshTokenKey = "userRefreshToken";

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
