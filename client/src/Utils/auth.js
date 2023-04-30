import decode from "jwt-decode";
// returns a decoded token
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }
  //  checks to see if token is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // checks to see if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  // gets token
  getToken() {
    return localStorage.getItem("id_token");
  }
  // if loggen in, sets token to home
  login(idToken) {
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }
  // logs out user
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
