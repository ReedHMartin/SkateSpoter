// sets regex for email
export function emailAuth(email) {
  const regex = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
  return regex.test(email);
}
// sets regex for username
export function userAuth(username) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(username);
}
