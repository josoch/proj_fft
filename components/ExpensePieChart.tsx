'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFinance } from '@/context/FinanceContext'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const EXPENSE_CATEGORIES = {
  Housing: { color: 'hsl(var(--chart-1))' },
  Food: { color: 'hsl(var(--chart-2))' },
  Transportation: { color: 'hsl(var(--chart-3))' },
  Utilities: { color: 'hsl(var(--chart-4))' },
  Shopping: { color: 'hsl(var(--chart-5))' }
}

export function ExpensePieChart() {
  const { state } = useFinance()

  // Initialize all categories with 0
  const expensesByCategory = Object.keys(EXPENSE_CATEGORIES).reduce((acc, category) => {
    acc[category] = 0
    return acc
  }, {} as Record<string, number>)

  // Sum up expenses for each category
  state.transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      if (transaction.category in expensesByCategory) {
        expensesByCategory[transaction.category] += transaction.amount
      }
    })

  const data = Object.entries(expensesByCategory)
    .filter(([_, value]) => value > 0) // Only show categories with expenses
    .map(([name, value]) => ({
      name,
      value,
      color: EXPENSE_CATEGORIES[name as keyof typeof EXPENSE_CATEGORIES].color
    }))

  const formatValue = (value: number) => `₦${value.toFixed(2)}`

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Expense Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={formatValue}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}