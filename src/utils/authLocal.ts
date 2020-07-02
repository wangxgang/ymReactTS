/**
 * 登录
 * @param {*} user
 */

export function setToken(token: string): void {
  localStorage.setItem("token", JSON.stringify(token));
}

export function setUserID(uid: number): void {
  localStorage.setItem("userId", JSON.stringify(uid));
}

// export function login2(user) {
//   localStorage.setItem("token", JSON.stringify(user));
// }

/**
 * 是否登录
 */
export const isLogined = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

/**
 * 退出登录
 */
export const logOut = () => localStorage.removeItem("token");
