const tokenKey = "auth_token";

export const getToken = () => {
  const token = useCookie(tokenKey).value;
  return token;
};
