export const ExpenseModel = {
    validate(expense) {
      const errors = {};

      if (!expense.title || expense.title.length < 2 || expense.title.length > 20) {
        errors.title = "Title must be between 3 and 20 characters";
      }

      if (!expense.amount || expense.amount < 0 ) {
        errors.amount = "Amount must be valid number.";
      }

      if (!expense.category || expense.category.length < 4 || expense.category.length > 20) {
        errors.category = "Category must be between 4 and 20 characters";
      }

      console.log("validation errors:", errors);

      return errors;
    },
  };
  