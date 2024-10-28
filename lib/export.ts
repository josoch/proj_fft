import Papa from 'papaparse'
import { Transaction } from './types'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function generateExportData(
  transactions: Transaction[],
  balance: number,
  income: number,
  expenses: number
) {
  const summary = [
    ['Family Finance Report'],
    ['Generated on', new Date().toLocaleDateString('en-NG')],
    [''],
    ['Summary'],
    ['Total Balance', formatCurrency(balance)],
    ['Total Income', formatCurrency(income)],
    ['Total Expenses', formatCurrency(expenses)],
    [''],
    ['Transaction History'],
    ['Date', 'Type', 'Category', 'Description', 'Amount'],
  ]

  const transactionRows = transactions.map((t) => [
    new Date(t.date).toLocaleDateString('en-NG'),
    t.type.charAt(0).toUpperCase() + t.type.slice(1),
    t.category,
    t.description,
    `${t.type === 'expense' ? '-' : '+'}${formatCurrency(t.amount)}`,
  ])

  return [...summary, ...transactionRows]
}

export function generateCSV(data: string[][]): string {
  return Papa.unparse(data, {
    quotes: true,
    delimiter: ',',
  })
}

export function generateTextReport(data: string[][]): string {
  const report = data.map(row => {
    if (row.length === 1) return `\n${row[0]}\n${'-'.repeat(row[0].length)}`
    if (row.length === 0) return ''
    return row.join('\t')
  }).join('\n')

  return report
}

export function downloadFile(content: string, fileName: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}