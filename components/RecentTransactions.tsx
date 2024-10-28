'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Home, Car, Utensils } from 'lucide-react'
import { useFinance } from '@/context/FinanceContext'

const icons = {
  Food: Utensils,
  Housing: Home,
  Transportation: Car,
  Shopping: ShoppingBag,
}

export function RecentTransactions() {
  const { state } = useFinance()

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {state.transactions.slice(0, 4).map((transaction) => {
            const Icon = icons[transaction.category as keyof typeof icons] || ShoppingBag
            return (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-secondary p-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.name || transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.type === 'expense' ? '-' : '+'}₦{transaction.amount.toFixed(2)}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}