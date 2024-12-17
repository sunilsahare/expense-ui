import { ExpenseModel } from "./ExpenseModel.js";
import {useUserStore} from "../stores/userStore.js";
import router from "../router.js";
import axios from "axios";
import {useExpenseStore} from "../stores/ExpenseStore.js";

const API_BASE_URL = "http://localhost:9090/api/expenses";

export const ExpenseService = {

  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    sortBy: "expenseId",
    sortDirection: "asc",
  },

  async getExpenses(page = 0, filters = []) {
    try {
      this.pagination.page = page
      const pageNumber = this.pagination.page;
      const userStore = useUserStore();

      const token = userStore.authToken;

      if (!token) {
        await router.replace({path: "/login"});
        console.log("No token found, please login.");
      }

      // const requestBody = [{ fieldName: 'category', value: 'Travel' , operation: "LIKE"}];
      const requestBody = filters;
      const url = `${API_BASE_URL}/filter?page=${pageNumber}&size=${this.pagination.size}&sortBy=${this.pagination.sortBy}&sortDirection=${this.pagination.sortDirection}`;

      const response = await axios.post(url, requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      this.pagination.totalPages = response.data.totalPages;
      console.log('Get Response - ',response.data.content);
      return response.data.content;
      // return response.data;
    } catch (error) {
      throw new Error("Failed to fetch expenses");
    }
  },

  async addExpense(expense) {
    const validationErrors = ExpenseModel.validate(expense);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }

    const userStore = useUserStore();
    const token = userStore.authToken;

    if (!token) {
      await router.replace({path: "/login"});
      console.log("No token found, please login.");
    }

    try {
      const response = await axios.post(API_BASE_URL, expense,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to add expense");
    }
  },

  async updateExpense(expense) {
    const validationErrors = ExpenseModel.validate(expense);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/${expense.expenseId}`, expense);
      return response.data;
    } catch (error) {
      console.log('ERROR while update expense -> ',error.response.data.message)
      throw new Error(error.response.data.message);
    }
  },

  async deleteExpense(id) {
    try {
      return await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.log('ERROR Sunil -> ',error.response.data.message)
      return error;
    }
  },
}