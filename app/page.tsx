import { DashboardHeader } from '@/components/DashboardHeader'
import { Overview } from '@/components/Overview'
import { RecentTransactions } from '@/components/RecentTransactions'
import { BudgetProgress } from '@/components/BudgetProgress'
import { ExpensePieChart } from '@/components/ExpensePieChart'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-8">
      <DashboardHeader />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <Overview />
        <BudgetProgress />
        <RecentTransactions />
        <ExpensePieChart />
      </div>
    </main>
  )
}