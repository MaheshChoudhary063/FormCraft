import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import jwt from 'jsonwebtoken'

const API_URL = "https://formcraft-2.onrender.com/users/";

export default {
  isAuthenticated() {
    const token = localStorage.getItem("userTicket");
    if (token) {
      return true;
    } else {
      return false;
    }
  },

  getGuestUser() {
    return { name: "Guest 123", userId: "guest123", email: "coolboy69@gg.com" };
  },

  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },

  login(userData) {
    return axios.post(API_URL + "login", userData).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("userTicket", response.data.accessToken);
      }
      return response.data;
    });
  },
  // loginAsGuest() {
  //   var userData = {
  //     name: "Cool Guest",
  //     id: "y2jsdqakq9rqyvtd4gf6g",
  //     email: "coolboy69@gg.com",
  //   };

  //   const accessToken = jwt.sign(
  //     userData,
  //     "thisisaguesttokenwithsomeshittystring8",
  //     { expiresIn: "24h" }
  //   );
  //   localStorage.setItem("userTicket", JSON.stringify(accessToken));
  //   return accessToken;
  // },

  logout() {
    localStorage.removeItem("userTicket");
  },

  getCurrentUser() {
    return jwtDecode(localStorage.getItem("userTicket"));
  },
};