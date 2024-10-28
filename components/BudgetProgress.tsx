'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useFinance } from '@/context/FinanceContext'
import { BudgetDialog } from './BudgetDialog'

export function BudgetProgress() {
  const { state } = useFinance()

  // Calculate spent amount for each category
  const categorySpending = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    }, {} as Record<string, number>)

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Budget Overview</CardTitle>
        <BudgetDialog />
      </CardHeader>
      <CardContent className="space-y-4">
        {state.budgets.map((budget) => {
          const spent = categorySpending[budget.category] || 0
          const progress = Math.min((spent / budget.amount) * 100, 100)
          
          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{budget.category}</span>
                <span className="text-muted-foreground">
                  ₦{spent.toFixed(2)} / ₦{budget.amount.toFixed(2)}
                </span>
              </div>
              <Progress 
                value={progress} 
                className={`h-2 ${progress >= 100 ? 'bg-destructive' : ''}`}
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}