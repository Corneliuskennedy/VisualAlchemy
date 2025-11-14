/**
 * Enhanced ROI Calculator with Charts and Export
 * 
 * Features:
 * - Interactive charts (Recharts)
 * - Real-time calculations
 * - PDF/CSV export
 * - Monthly projections visualization
 * 
 * Technical Showcase:
 * - Data visualization
 * - Complex calculations
 * - Export functionality
 * - Responsive charts
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Download, FileText, BarChart3, Euro, Clock } from 'lucide-react';
import { ROIEngine, ROIInputs, ROICalculation } from '@/lib/calculations/ROIEngine';
import { DataExporter } from '@/lib/export/DataExporter';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import useLanguage from '@/contexts/LanguageContext';

export const EnhancedROICalculator: React.FC = () => {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const [inputs, setInputs] = useState<ROIInputs>({
    hoursPerWeek: 10,
    hourlyWage: 35,
    implementationCost: 5000,
    monthlyOperatingCost: 200,
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projections'>('overview');

  // Calculate on input change
  useEffect(() => {
    const result = ROIEngine.calculate(inputs);
    setCalculation(result);
  }, [inputs]);

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExportCSV = async () => {
    if (!calculation) return;
    await DataExporter.exportToCSV(calculation, inputs, { format: 'csv' });
  };

  const handleExportPDF = async () => {
    if (!calculation) return;
    await DataExporter.exportToPDF(calculation, inputs, { format: 'pdf' });
  };

  const chartConfig = {
    savings: {
      label: isNL ? 'Besparingen' : 'Savings',
      color: 'hsl(var(--chart-1))',
    },
    costs: {
      label: isNL ? 'Kosten' : 'Costs',
      color: 'hsl(var(--chart-2))',
    },
    net: {
      label: isNL ? 'Netto' : 'Net',
      color: 'hsl(var(--chart-3))',
    },
  };

  if (!calculation) {
    return <div>Loading...</div>;
  }

  // Prepare chart data
  const projectionData = calculation.monthlyProjections.slice(0, 12).map((proj) => ({
    month: `M${proj.month}`,
    savings: Math.round(proj.cumulativeSavings),
    costs: Math.round(proj.cumulativeCosts),
    net: Math.round(proj.netSavings),
    roi: Math.round(proj.roi),
  }));

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-button-primary" />
          {isNL ? 'ROI Calculator' : 'ROI Calculator'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hoursPerWeek">
              {isNL ? 'Uren per week' : 'Hours per week'}
            </Label>
            <Input
              id="hoursPerWeek"
              type="number"
              value={inputs.hoursPerWeek}
              onChange={(e) => handleInputChange('hoursPerWeek', parseFloat(e.target.value) || 0)}
              min="0.5"
              step="0.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyWage">
              {isNL ? 'Uurloon (€)' : 'Hourly wage (€)'}
            </Label>
            <Input
              id="hourlyWage"
              type="number"
              value={inputs.hourlyWage}
              onChange={(e) => handleInputChange('hourlyWage', parseFloat(e.target.value) || 0)}
              min="15"
              step="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="implementationCost">
              {isNL ? 'Implementatiekosten (€)' : 'Implementation cost (€)'}
            </Label>
            <Input
              id="implementationCost"
              type="number"
              value={inputs.implementationCost}
              onChange={(e) => handleInputChange('implementationCost', parseFloat(e.target.value) || 0)}
              min="1000"
              step="500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyOperatingCost">
              {isNL ? 'Maandelijkse kosten (€)' : 'Monthly operating cost (€)'}
            </Label>
            <Input
              id="monthlyOperatingCost"
              type="number"
              value={inputs.monthlyOperatingCost}
              onChange={(e) => handleInputChange('monthlyOperatingCost', parseFloat(e.target.value) || 0)}
              min="0"
              step="50"
            />
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm text-body">
              {isNL ? 'ROI Percentage' : 'ROI Percentage'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {ROIEngine.formatPercentage(calculation.roiPercentage)}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Euro className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-body">
              {isNL ? 'Jaarlijkse besparing' : 'Annual Savings'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {ROIEngine.formatCurrency(calculation.annualSavings)}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-body">
              {isNL ? 'Terugverdientijd' : 'Payback Period'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {calculation.paybackPeriod.toFixed(1)} {isNL ? 'maanden' : 'months'}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-body">
              {isNL ? 'Maandelijkse besparing' : 'Monthly Savings'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {ROIEngine.formatCurrency(calculation.monthlySavings)}
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-button-primary" />
            {isNL ? 'Projecties' : 'Projections'}
          </h3>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('overview')}
            >
              {isNL ? 'Overzicht' : 'Overview'}
            </Button>
            <Button
              variant={activeTab === 'projections' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('projections')}
            >
              {isNL ? 'Projecties' : 'Projections'}
            </Button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <ChartContainer config={chartConfig} className="h-[400px]">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="var(--color-savings)"
                strokeWidth={2}
                name={chartConfig.savings.label}
              />
              <Line
                type="monotone"
                dataKey="costs"
                stroke="var(--color-costs)"
                strokeWidth={2}
                name={chartConfig.costs.label}
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="var(--color-net)"
                strokeWidth={2}
                name={chartConfig.net.label}
              />
            </LineChart>
          </ChartContainer>
        )}

        {activeTab === 'projections' && (
          <ChartContainer config={chartConfig} className="h-[400px]">
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="savings" fill="var(--color-savings)" name={chartConfig.savings.label} />
              <Bar dataKey="costs" fill="var(--color-costs)" name={chartConfig.costs.label} />
            </BarChart>
          </ChartContainer>
        )}
      </Card>

      {/* Export Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">
              {isNL ? 'Exporteer Rapport' : 'Export Report'}
            </h3>
            <p className="text-sm text-body">
              {isNL 
                ? 'Download uw ROI berekening als PDF of CSV'
                : 'Download your ROI calculation as PDF or CSV'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              PDF
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              CSV
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedROICalculator;

