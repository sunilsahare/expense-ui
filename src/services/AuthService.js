import axios from "axios";
import { ExpenseModel } from "./ExpenseModel.js";
import {useUserStore} from "../stores/userStore.js";

const API_BASE_URL = "http://localhost:9090/auth";

export const AuthService = {

  async login(username, password) {
    try {
      const response = await axios.post(API_BASE_URL+"/login",
          {
            username: username,
            password: password
          });
      console.log('Get Response - ',response);
      return response;
    } catch (error) {
      throw new Error("Failed to Login");
    }
  },

  async registerUser(user) {
    try {
      const response = await axios.post(API_BASE_URL+"/register", user);
      console.log('Register Response - ',response);
      return response;
    } catch (error) {
      throw new Error("Failed to add User");
    }
  }

}