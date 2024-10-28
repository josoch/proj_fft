'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { FinanceState, FinanceContextType, Transaction, Budget } from '@/lib/types'

const initialState: FinanceState = {
  balance: 12450.80,
  income: 4550.00,
  expenses: 2150.00,
  transactions: [
    {
      id: 1,
      type: 'expense',
      name: 'Grocery Shopping',
      amount: 120.50,
      category: 'Food',
      description: 'Weekly groceries',
      date: '2024-03-20'
    },
    {
      id: 2,
      type: 'expense',
      name: 'Rent Payment',
      amount: 1200.00,
      category: 'Housing',
      description: 'Monthly rent',
      date: '2024-03-19'
    },
    {
      id: 3,
      type: 'expense',
      name: 'Gas Station',
      amount: 45.00,
      category: 'Transportation',
      description: 'Fuel refill',
      date: '2024-03-18'
    },
    {
      id: 4,
      type: 'expense',
      name: 'Restaurant',
      amount: 65.80,
      category: 'Food',
      description: 'Dinner',
      date: '2024-03-17'
    }
  ],
  budgets: [
    { category: 'Housing', amount: 1500 },
    { category: 'Food', amount: 600 },
    { category: 'Transportation', amount: 400 },
    { category: 'Utilities', amount: 300 }
  ]
}

type FinanceAction = 
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'ADD_BUDGET'; payload: Budget }

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const newTransaction = action.payload
      const amount = newTransaction.amount

      if (newTransaction.type === 'expense') {
        return {
          ...state,
          balance: state.balance - amount,
          expenses: state.expenses + amount,
          transactions: [newTransaction, ...state.transactions]
        }
      } else {
        return {
          ...state,
          balance: state.balance + amount,
          income: state.income + amount,
          transactions: [newTransaction, ...state.transactions]
        }
      }
    }
    case 'ADD_BUDGET': {
      const existingBudgetIndex = state.budgets.findIndex(
        b => b.category === action.payload.category
      )

      const newBudgets = [...state.budgets]
      if (existingBudgetIndex >= 0) {
        newBudgets[existingBudgetIndex] = action.payload
      } else {
        newBudgets.push(action.payload)
      }

      return {
        ...state,
        budgets: newBudgets
      }
    }
    default:
      return state
  }
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState)

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: newTransaction
    })
  }

  const addBudget = (budget: Budget) => {
    dispatch({
      type: 'ADD_BUDGET',
      payload: budget
    })
  }

  return (
    <FinanceContext.Provider value={{ state, addTransaction, addBudget }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}