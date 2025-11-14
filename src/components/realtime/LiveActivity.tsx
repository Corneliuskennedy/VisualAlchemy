/**
 * Live Activity Component
 * 
 * Shows real-time activity indicators
 * Privacy-compliant (no PII, aggregated data)
 * 
 * Technical Showcase:
 * - WebSocket-based real-time updates
 * - Efficient state management
 * - Graceful degradation
 * - Privacy-compliant tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';
import useLanguage from '@/contexts/LanguageContext';

/**
 * LiveActivity Component Props
 * 
 * @interface LiveActivityProps
 * @property {string} [page='homepage'] - Page identifier for activity tracking
 * @property {boolean} [showViewers=true] - Display viewer count
 * @property {boolean} [showRecentActivity=true] - Display recent activity indicators
 */
interface LiveActivityProps {
  page?: string;
  showViewers?: boolean;
  showRecentActivity?: boolean;
}

interface ActivityData {
  viewers: number;
  recentBookings: number;
  lastUpdated: number;
}

export const LiveActivity: React.FC<LiveActivityProps> = ({
  page = 'homepage',
  showViewers = true,
  showRecentActivity = true,
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [activity, setActivity] = useState<ActivityData>({
    viewers: 0,
    recentBookings: 0,
    lastUpdated: Date.now(),
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // TODO: Connect to real analytics API (Google Analytics Real-Time API or custom WebSocket)
    // For now, hide component if no real data source available
    // This prevents showing fake numbers
    
    // Option 1: Hide component entirely until real data source is connected
    // Option 2: Connect to Google Analytics Real-Time API
    // Option 3: Use server-side analytics endpoint
    
    // TEMPORARY: Hide until real data source is implemented
    // Remove this when real analytics are connected
    setIsConnected(false);
    return;
    
    // Future implementation:
    // const connectToAnalytics = async () => {
    //   try {
    //     // Connect to Google Analytics Real-Time API
    //     // or custom WebSocket server
    //     const realTimeData = await fetchRealTimeAnalytics(page);
    //     setActivity({
    //       viewers: realTimeData.activeUsers,
    //       recentBookings: realTimeData.recentConversions,
    //       lastUpdated: Date.now(),
    //     });
    //     setIsConnected(true);
    //   } catch (error) {
    //     console.error('Failed to fetch real-time analytics:', error);
    //     setIsConnected(false);
    //   }
    // };
    // 
    // connectToAnalytics();
    // const interval = setInterval(connectToAnalytics, 10000); // Update every 10s
    // return () => clearInterval(interval);
  }, [page]);

  // Hide component if no real data source is connected
  // This prevents showing fake numbers
  if (!isConnected || (!showViewers && !showRecentActivity)) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 
                   px-6 py-3 
                   bg-gradient-to-r from-[#4585f4]/10 via-[#4585f4]/5 to-[#6B8AE6]/10
                   dark:from-[#4585f4]/15 dark:via-[#4585f4]/10 dark:to-[#6B8AE6]/15
                   backdrop-blur-sm
                   border border-[#4585f4]/20 dark:border-[#4585f4]/30
                   rounded-xl
                   shadow-lg shadow-[#4585f4]/5">
      {showViewers && (
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Eye className="h-5 w-5 
                          text-[#4585f4] dark:text-[#6B8AE6]
                          transition-colors duration-300" />
            <span className="absolute -top-0.5 -right-0.5 
                          w-2.5 h-2.5 
                          bg-green-500 rounded-full 
                          animate-pulse
                          ring-2 ring-white dark:ring-gray-900" />
          </div>
          <span className="text-sm md:text-base font-medium
                         text-[#1E293B] dark:text-gray-200
                         whitespace-nowrap">
            <span className="font-bold text-[#4585f4] dark:text-[#6B8AE6]">
              {activity.viewers}
            </span>{' '}
            {isNL ? 'mensen bekijken deze pagina' : 'people viewing this page'}
          </span>
        </div>
      )}

      {showRecentActivity && activity.recentBookings > 0 && (
        <div className="flex items-center gap-2.5">
          <Users className="h-5 w-5 
                          text-[#4585f4] dark:text-[#6B8AE6]
                          transition-colors duration-300" />
          <span className="text-sm md:text-base font-medium
                         text-[#1E293B] dark:text-gray-200
                         whitespace-nowrap">
            <span className="font-bold text-[#4585f4] dark:text-[#6B8AE6]">
              {activity.recentBookings}
            </span>{' '}
            {isNL 
              ? 'bedrijven boekten vandaag' 
              : 'companies booked today'}
          </span>
        </div>
      )}

      {/* Connection indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-500'}`} />
      )}
    </div>
  );
};

export default LiveActivity;

