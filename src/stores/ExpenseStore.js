import { defineStore } from 'pinia';
import {ExpenseService} from "../services/ExpenseService.js";
import {ExpenseModel} from "../services/ExpenseModel.js";
export const useExpenseStore = defineStore('expenseStore', {
    state: () => ({
        expenses: [],
        reports: [],
        loading: false,
        error: null,
        success: null,
        validationErrors: {},
    }),
    getters: {
        hasError: (state) => state.error || Object.keys(state.validationErrors).length
    },
    actions: {
        async fetchExpenses(page = 0, filters = []) {
            this.loading = true;
            try {
                this.expenses = await ExpenseService.getExpenses(page, filters);
                console.log(this.expenses);
            } catch (err) {
                this.error = 'Failed to fetch Expenses';
            } finally {
                this.loading = false;
            }
        },
        async addExpense(newExpense) {
            const errors = ExpenseModel.validate(newExpense);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
                return;
            }

            this.loading = true;
            try {
                console.log("newExpense: ",newExpense)
                await ExpenseService.addExpense(newExpense);
                this.success = "Expense Successfully Saved";
                this.expenses = await ExpenseService.getExpenses()
            } catch (err) {
                this.error = 'Failed to Add Expense';
            } finally {
                this.loading = false;
            }


        },
        async updateExpense(updatedExpenses) {
            this.loading = true;
            try {
                updatedExpenses = await ExpenseService.updateExpense(updatedExpenses);
                this.success = "Expenses Successfully Updated";
                this.expenses = await ExpenseService.getExpenses()
            } catch (err) {
                this.error = err.message;
                this.success = null;
            } finally {
                this.loading = false;
            }


        },
        async deleteExpense(id) {

            this.loading = true;
            try {
                const response = await ExpenseService.deleteExpense(id);
                console.log(response.data.message);
                this.success = response.data.message;
                this.error = null;
                this.expenses = await ExpenseService.getExpenses()
            } catch (err) {
                console.log(err);
                this.error = err.data.message;
            } finally {
                this.loading = false;
            }

        },
        async clearErrors() {
            this.validationErrors = {}; // Clear errors
            this.error = null
        },
    },
});
