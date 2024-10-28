'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle } from 'lucide-react'
import { useFinance } from '@/context/FinanceContext'
import { useToast } from '@/components/ui/use-toast'

const EXPENSE_CATEGORIES = [
  'Housing',
  'Food',
  'Transportation',
  'Utilities',
  'Shopping'
]

export function BudgetDialog() {
  const { addBudget } = useFinance()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || !category) return

    addBudget({
      category,
      amount: parseFloat(amount)
    })

    toast({
      title: 'Budget Updated',
      description: `Budget for ${category} has been set to ₦${parseFloat(amount).toFixed(2)}`
    })

    setAmount('')
    setCategory('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Set Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Category Budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">Set Budget</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}