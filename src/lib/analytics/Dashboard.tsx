/**
 * Advanced Analytics Dashboard
 * 
 * Real-time analytics visualization
 * Conversion tracking and funnel analysis
 * 
 * Technical Showcase:
 * - Data visualization
 * - Real-time analytics
 * - Custom dashboard implementation
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, MousePointerClick, Calendar, DollarSign, Download } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import useLanguage from '@/contexts/LanguageContext';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  ctaClicks: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ path: string; views: number }>;
  conversionFunnel: Array<{ stage: string; count: number; dropoff: number }>;
  dailyStats: Array<{ date: string; views: number; conversions: number }>;
}

export const AnalyticsDashboard: React.FC<{ show?: boolean }> = ({ 
  show = process.env.NODE_ENV === 'development' 
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    if (!show) return;

    // Simulate analytics data (in production, fetch from API)
    const simulateData = (): AnalyticsData => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const dailyStats = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          views: Math.floor(Math.random() * 500) + 200,
          conversions: Math.floor(Math.random() * 20) + 5,
        };
      });

      return {
        pageViews: dailyStats.reduce((sum, d) => sum + d.views, 0),
        uniqueVisitors: Math.floor(dailyStats.reduce((sum, d) => sum + d.views, 0) * 0.7),
        conversions: dailyStats.reduce((sum, d) => sum + d.conversions, 0),
        conversionRate: 3.2 + Math.random() * 2,
        ctaClicks: Math.floor(Math.random() * 500) + 200,
        avgSessionDuration: Math.floor(Math.random() * 120) + 60,
        bounceRate: 35 + Math.random() * 10,
        topPages: [
          { path: '/', views: 1200 },
          { path: '/contact', views: 450 },
          { path: '/about', views: 320 },
          { path: '/services', views: 280 },
        ],
        conversionFunnel: [
          { stage: isNL ? 'Bezoekers' : 'Visitors', count: 1000, dropoff: 0 },
          { stage: isNL ? 'Interesse' : 'Interest', count: 650, dropoff: 35 },
          { stage: isNL ? 'CTA Klik' : 'CTA Click', count: 320, dropoff: 51 },
          { stage: isNL ? 'Formulier Start' : 'Form Start', count: 180, dropoff: 44 },
          { stage: isNL ? 'Conversie' : 'Conversion', count: 45, dropoff: 75 },
        ],
        dailyStats,
      };
    };

    setData(simulateData());
  }, [show, timeRange, isNL]);

  if (!show || !data) return null;

  const chartConfig = {
    views: {
      label: isNL ? 'Weergaven' : 'Views',
      color: 'hsl(var(--chart-1))',
    },
    conversions: {
      label: isNL ? 'Conversies' : 'Conversions',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-button-primary" />
          <h2 className="text-2xl font-bold text-heading">
            {isNL ? 'Analytics Dashboard' : 'Analytics Dashboard'}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7d
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30d
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90d
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-body">
              {isNL ? 'Unieke Bezoekers' : 'Unique Visitors'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {data.uniqueVisitors.toLocaleString()}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm text-body">
              {isNL ? 'Conversiepercentage' : 'Conversion Rate'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {data.conversionRate.toFixed(1)}%
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <MousePointerClick className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-body">
              {isNL ? 'CTA Klikken' : 'CTA Clicks'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {data.ctaClicks.toLocaleString()}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-body">
              {isNL ? 'Gemiddelde Sessie' : 'Avg Session'}
            </span>
          </div>
          <div className="text-3xl font-bold text-heading">
            {Math.floor(data.avgSessionDuration / 60)}m {data.avgSessionDuration % 60}s
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">
            {isNL ? 'Dagelijkse Statistieken' : 'Daily Statistics'}
          </h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={data.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="var(--color-views)"
                strokeWidth={2}
                name={chartConfig.views.label}
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="var(--color-conversions)"
                strokeWidth={2}
                name={chartConfig.conversions.label}
              />
            </LineChart>
          </ChartContainer>
        </Card>

        {/* Conversion Funnel */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">
            {isNL ? 'Conversie Funnel' : 'Conversion Funnel'}
          </h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={data.conversionFunnel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-views)" name={isNL ? 'Aantal' : 'Count'} />
            </BarChart>
          </ChartContainer>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">
          {isNL ? 'Populairste Pagina\'s' : 'Top Pages'}
        </h3>
        <div className="space-y-2">
          {data.topPages.map((page, index) => (
            <div key={page.path} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-body">#{index + 1}</span>
                <span className="text-heading">{page.path}</span>
              </div>
              <span className="text-sm font-semibold text-heading">
                {page.views.toLocaleString()} {isNL ? 'weergaven' : 'views'}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;

