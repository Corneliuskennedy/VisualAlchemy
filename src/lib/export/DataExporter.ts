/**
 * Data Exporter
 * 
 * Export functionality for ROI calculations
 * Supports PDF and CSV export
 * 
 * Technical Showcase:
 * - PDF generation
 * - CSV export
 * - Data formatting
 * - File download handling
 */

import { ROICalculation } from '../calculations/ROIEngine';
import * as csvWriter from 'csv-writer';

export interface ExportOptions {
  format: 'pdf' | 'csv';
  filename?: string;
  includeCharts?: boolean;
}

export class DataExporter {
  /**
   * Export ROI calculation to CSV
   */
  static async exportToCSV(
    calculation: ROICalculation,
    inputs: Record<string, any>,
    options: ExportOptions = { format: 'csv' }
  ): Promise<void> {
    const filename = options.filename || `roi-calculation-${Date.now()}.csv`;

    // Prepare CSV data
    const csvData = [
      ['ROI Calculation Report', ''],
      ['Generated', new Date().toLocaleString()],
      [''],
      ['Inputs', ''],
      ...Object.entries(inputs).map(([key, value]) => [key, String(value)]),
      [''],
      ['Results', ''],
      ['Monthly Savings', this.formatCurrency(calculation.monthlySavings)],
      ['Annual Savings', this.formatCurrency(calculation.annualSavings)],
      ['Payback Period', `${calculation.paybackPeriod.toFixed(1)} months`],
      ['ROI Percentage', `${calculation.roiPercentage.toFixed(1)}%`],
      ['Hours Saved Annually', calculation.hoursSavedAnnually.toString()],
      ['Total First Year Cost', this.formatCurrency(calculation.totalFirstYearCost)],
      ['Net First Year Savings', this.formatCurrency(calculation.netFirstYearSavings)],
      ['3-Year ROI', `${calculation.threeYearROI.toFixed(1)}%`],
      ['5-Year ROI', `${calculation.fiveYearROI.toFixed(1)}%`],
      [''],
      ['Monthly Projections', ''],
      ['Month', 'Cumulative Savings', 'Cumulative Costs', 'Net Savings', 'ROI %'],
      ...calculation.monthlyProjections.slice(0, 12).map((proj) => [
        proj.month.toString(),
        this.formatCurrency(proj.cumulativeSavings),
        this.formatCurrency(proj.cumulativeCosts),
        this.formatCurrency(proj.netSavings),
        `${proj.roi.toFixed(1)}%`,
      ]),
    ];

    // Convert to CSV string
    const csvString = csvData.map((row) => 
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // Create blob and download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  /**
   * Export ROI calculation to PDF (simplified - uses browser print)
   * For full PDF generation, consider using libraries like jsPDF or pdfkit
   */
  static async exportToPDF(
    calculation: ROICalculation,
    inputs: Record<string, any>,
    options: ExportOptions = { format: 'pdf' }
  ): Promise<void> {
    // Create a printable HTML document
    const htmlContent = this.generatePDFHTML(calculation, inputs);
    
    // Open in new window and print
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window. Please allow popups.');
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }

  /**
   * Generate HTML content for PDF export
   */
  private static generatePDFHTML(
    calculation: ROICalculation,
    inputs: Record<string, any>
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ROI Calculation Report</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 40px;
              color: #333;
            }
            h1 {
              color: #4585f4;
              border-bottom: 2px solid #4585f4;
              padding-bottom: 10px;
            }
            h2 {
              color: #666;
              margin-top: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f5f5f5;
              font-weight: 600;
            }
            .metric {
              display: inline-block;
              margin: 10px 20px 10px 0;
              padding: 15px;
              background: #f9f9f9;
              border-left: 4px solid #4585f4;
              min-width: 200px;
            }
            .metric-label {
              font-size: 12px;
              color: #666;
              text-transform: uppercase;
            }
            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #4585f4;
              margin-top: 5px;
            }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>ROI Calculation Report</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
          
          <h2>Input Parameters</h2>
          <table>
            ${Object.entries(inputs).map(([key, value]) => `
              <tr>
                <th>${this.formatKey(key)}</th>
                <td>${typeof value === 'number' ? this.formatCurrency(value) : value}</td>
              </tr>
            `).join('')}
          </table>

          <h2>Key Metrics</h2>
          <div class="metric">
            <div class="metric-label">Monthly Savings</div>
            <div class="metric-value">${this.formatCurrency(calculation.monthlySavings)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">Annual Savings</div>
            <div class="metric-value">${this.formatCurrency(calculation.annualSavings)}</div>
          </div>
          <div class="metric">
            <div class="metric-label">ROI</div>
            <div class="metric-value">${calculation.roiPercentage.toFixed(1)}%</div>
          </div>
          <div class="metric">
            <div class="metric-label">Payback Period</div>
            <div class="metric-value">${calculation.paybackPeriod.toFixed(1)} months</div>
          </div>

          <h2>Projections (First Year)</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Cumulative Savings</th>
                <th>Cumulative Costs</th>
                <th>Net Savings</th>
                <th>ROI %</th>
              </tr>
            </thead>
            <tbody>
              ${calculation.monthlyProjections.slice(0, 12).map((proj) => `
                <tr>
                  <td>${proj.month}</td>
                  <td>${this.formatCurrency(proj.cumulativeSavings)}</td>
                  <td>${this.formatCurrency(proj.cumulativeCosts)}</td>
                  <td>${this.formatCurrency(proj.netSavings)}</td>
                  <td>${proj.roi.toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <p class="no-print" style="margin-top: 40px; color: #666; font-size: 12px;">
            Use your browser's print dialog to save as PDF
          </p>
        </body>
      </html>
    `;
  }

  /**
   * Format currency
   */
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Format key for display
   */
  private static formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }
}

export default DataExporter;

