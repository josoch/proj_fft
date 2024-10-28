'use client'

import { TransactionDialog } from './TransactionDialog'
import { ExportDialog } from './ExportDialog'

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Family Finance Dashboard</h1>
        <p className="text-muted-foreground">Track and manage your family expenses</p>
      </div>
      <div className="flex gap-2">
        <ExportDialog />
        <TransactionDialog />
      </div>
    </div>
  )
}