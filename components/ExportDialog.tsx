'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { useFinance } from '@/context/FinanceContext'
import { generateExportData, generateCSV, generateTextReport, downloadFile } from '@/lib/export'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function ExportDialog() {
  const { state } = useFinance()
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (type: 'xlsx' | 'pdf') => {
    try {
      setIsExporting(true)
      const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
      const fileName = `finance_report_${currentMonth.toLowerCase().replace(' ', '_')}.${type}`
      
      const exportData = generateExportData(
        state.transactions,
        state.balance,
        state.income,
        state.expenses
      )

      if (type === 'xlsx') {
        const csvContent = generateCSV(exportData)
        downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;')
      } else {
        const textContent = generateTextReport(exportData)
        downloadFile(textContent, fileName, 'text/plain;charset=utf-8;')
      }

      toast({
        title: 'Export Successful',
        description: `Your financial report has been exported as ${fileName}`,
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting your financial report.',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Financial Report</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-2 p-6"
            onClick={() => handleExport('xlsx')}
            disabled={isExporting}
          >
            <FileSpreadsheet className="h-8 w-8" />
            <span>Excel (.xlsx)</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-2 p-6"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
          >
            <FileText className="h-8 w-8" />
            <span>PDF (.pdf)</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}