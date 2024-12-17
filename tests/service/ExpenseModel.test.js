import { describe, it, expect } from 'vitest';
import {ExpenseModel} from "../../src/services/ExpenseModel.js";

describe('ExpenseModel Validation', () => {

    it('should not return any errors for valid expenses data', () => {
        const validExpense = {
            title: 'Valid Expense',
            amount: 100,
            category: 'Food',
        };

        const errors = ExpenseModel.validate(validExpense);
        expect(errors).toEqual({});
    });

    it('should return error if the title is long', () => {
        const invalidExpense = {
            title: 'Traveling to goa from Pune by Bus',
            amount: 100,
            category: 'Travvel',
        };

        const errors = ExpenseModel.validate(invalidExpense);
        expect(errors.title).toBe('Title must be between 3 and 20 characters');
    });

    it('should return error if the amount is invalid negative', () => {
        const invalidExpense = {
            title: 'Movie',
            amount: -100,
            category: 'Entertainment',
        };

        const errors = ExpenseModel.validate(invalidExpense);

        expect(errors.amount).toBe('Amount must be valid number.');
    });

    it('should return an error if the amount is missing', () => {
        const invalidExpense = {
            title: 'Travel',
            amount: undefined,
            category: 'Travel',
        };

        const errors = ExpenseModel.validate(invalidExpense);

        expect(errors.amount).toBe('Amount must be valid number.');
    });

    it('should return error if the category is short', () => {
        const invalidExpense = {
            title: 'Travel',
            amount: 100,
            category: 'Tra',
        };

        const errors = ExpenseModel.validate(invalidExpense);
        expect(errors.category).toBe('Category must be between 4 and 20 characters');
    });

    it('should return error if the category is long', () => {
        const invalidExpense = {
            title: 'Watch Movies',
            amount: 100,
            category: 'long categorylong categorylong categorylong categorylong category',  // Too long
        };

        const errors = ExpenseModel.validate(invalidExpense);
        expect(errors.category).toBe('Category must be between 4 and 20 characters');
    });

    it('should return multiple errors for invalid fields', () => {
        const invalidExpense = {
            title: 'A',
            amount: -100,
            category: 'Fo',
        };

        const errors = ExpenseModel.validate(invalidExpense);

        expect(errors.title).toBe('Title must be between 3 and 20 characters');
        expect(errors.amount).toBe('Amount must be valid number.');
        expect(errors.category).toBe('Category must be between 4 and 20 characters');
    });

});
