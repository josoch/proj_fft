export type Transaction = {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  icon?: any;
  name?: string;
}

export type Budget = {
  category: string;
  amount: number;
}

export type FinanceState = {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
  budgets: Budget[];
}

export type FinanceContextType = {
  state: FinanceState;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  addBudget: (budget: Budget) => void;
}