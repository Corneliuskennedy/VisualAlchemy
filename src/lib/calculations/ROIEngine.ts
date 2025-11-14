/**
 * ROI Calculation Engine
 * 
 * Advanced calculation engine for ROI calculations
 * Handles complex business logic and projections
 * 
 * Technical Showcase:
 * - Complex calculations
 * - Financial modeling
 * - Data projections
 */

export interface ROIInputs {
  hoursPerWeek: number;
  hourlyWage: number;
  implementationCost: number;
  monthlyOperatingCost: number;
  employees?: number;
  monthlyRevenue?: number;
}

export interface ROICalculation {
  monthlySavings: number;
  annualSavings: number;
  paybackPeriod: number; // in months
  roiPercentage: number;
  hoursSavedAnnually: number;
  costPerHour: number;
  implementationCost: number;
  monthlyOperatingCost: number;
  totalFirstYearCost: number;
  netFirstYearSavings: number;
  threeYearROI: number;
  fiveYearROI: number;
  monthlyProjections: MonthlyProjection[];
}

export interface MonthlyProjection {
  month: number;
  cumulativeSavings: number;
  cumulativeCosts: number;
  netSavings: number;
  roi: number;
}

export class ROIEngine {
  /**
   * Calculate comprehensive ROI
   */
  static calculate(inputs: ROIInputs): ROICalculation {
    const hoursSavedAnnually = inputs.hoursPerWeek * 52;
    const costPerHour = inputs.hourlyWage * 1.3; // Including benefits/overhead (30%)
    const annualSavings = hoursSavedAnnually * costPerHour;
    const monthlySavings = annualSavings / 12;
    const totalFirstYearCost = inputs.implementationCost + (inputs.monthlyOperatingCost * 12);
    const paybackPeriod = totalFirstYearCost / monthlySavings; // in months
    const netFirstYearSavings = annualSavings - (inputs.monthlyOperatingCost * 12);
    const roiPercentage = (netFirstYearSavings / inputs.implementationCost) * 100;

    // Calculate multi-year projections
    const threeYearROI = this.calculateMultiYearROI(inputs, 3);
    const fiveYearROI = this.calculateMultiYearROI(inputs, 5);

    // Generate monthly projections
    const monthlyProjections = this.generateMonthlyProjections(
      inputs,
      monthlySavings,
      totalFirstYearCost
    );

    return {
      monthlySavings,
      annualSavings,
      paybackPeriod,
      roiPercentage,
      hoursSavedAnnually,
      costPerHour,
      implementationCost: inputs.implementationCost,
      monthlyOperatingCost: inputs.monthlyOperatingCost,
      totalFirstYearCost,
      netFirstYearSavings,
      threeYearROI,
      fiveYearROI,
      monthlyProjections,
    };
  }

  /**
   * Calculate multi-year ROI
   */
  private static calculateMultiYearROI(
    inputs: ROIInputs,
    years: number
  ): number {
    const annualSavings = inputs.hoursPerWeek * 52 * inputs.hourlyWage * 1.3;
    const totalSavings = annualSavings * years;
    const totalCosts = inputs.implementationCost + (inputs.monthlyOperatingCost * 12 * years);
    const netSavings = totalSavings - totalCosts;
    return (netSavings / inputs.implementationCost) * 100;
  }

  /**
   * Generate monthly projections for charts
   */
  private static generateMonthlyProjections(
    inputs: ROIInputs,
    monthlySavings: number,
    totalFirstYearCost: number
  ): MonthlyProjection[] {
    const projections: MonthlyProjection[] = [];
    let cumulativeSavings = 0;
    let cumulativeCosts = inputs.implementationCost;

    for (let month = 1; month <= 36; month++) {
      cumulativeSavings += monthlySavings;
      cumulativeCosts += inputs.monthlyOperatingCost;
      const netSavings = cumulativeSavings - cumulativeCosts;
      const roi = inputs.implementationCost > 0 
        ? ((netSavings / inputs.implementationCost) * 100)
        : 0;

      projections.push({
        month,
        cumulativeSavings,
        cumulativeCosts,
        netSavings,
        roi,
      });
    }

    return projections;
  }

  /**
   * Calculate break-even point
   */
  static calculateBreakEven(inputs: ROIInputs): number {
    const monthlySavings = (inputs.hoursPerWeek * 52 * inputs.hourlyWage * 1.3) / 12;
    const totalFirstYearCost = inputs.implementationCost + (inputs.monthlyOperatingCost * 12);
    return totalFirstYearCost / monthlySavings;
  }

  /**
   * Calculate time to positive ROI
   */
  static calculateTimeToPositiveROI(inputs: ROIInputs): number {
    const monthlySavings = (inputs.hoursPerWeek * 52 * inputs.hourlyWage * 1.3) / 12;
    const monthlyNetSavings = monthlySavings - inputs.monthlyOperatingCost;
    
    if (monthlyNetSavings <= 0) {
      return Infinity; // Never reaches positive ROI
    }

    return inputs.implementationCost / monthlyNetSavings;
  }

  /**
   * Format currency
   */
  static formatCurrency(amount: number, locale: string = 'nl-NL'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Format percentage
   */
  static formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
  }

  /**
   * Format number
   */
  static formatNumber(value: number, decimals: number = 0): string {
    return new Intl.NumberFormat('nl-NL', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
}

export default ROIEngine;

