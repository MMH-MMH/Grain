import http from "./http";

export async function register(user) {
  const registerUrl = "/user/register";
  return await http.post(registerUrl, user);
}

export async function login(user) {
  const loginUrl = "/user/login";
  return await http.post(loginUrl, user);
}
