import { userAuth } from "~/api/user";

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

export const removeUserInfoCookie = () => {
  useCookie(userInfoKey).value = null;
};

export const getUserInfoFromCookie = () => {
  const useInfo = useCookie(userInfoKey).value;
  return useInfo;
};

export const userIfLogin = () => {
  let info = getUserInfoFromCookie();
  if (info && Object.keys(info).length > 0) return true;
  return false;
};

export const userStatusAuth = async () => {
  let info = getUserInfoFromCookie();
  if (info && Object.keys(info).length > 0) {
    await userAuth()
      .then((res) => {
        return true;
      })
      .catch((err) => {
        removeUserAuth();
        removeUserInfoCookie();
        return false;
      });
  }
};

export const gotoLogin = (preUrl) => {
  const router = useRouter();
  router.push(`/user/auth?from=${preUrl}`);
};

export const gotoLoginPreUrl = () => {
  const router = useRouter();
  const route = useRoute();
  const preUrl = route.query.from;
  console.log(route.query);
  router.push(preUrl ? preUrl : "/");
};
