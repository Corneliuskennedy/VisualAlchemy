/**
 * Behavior Tracker Component
 * 
 * Wrapper component that initializes behavior tracking
 * Should be placed high in the component tree
 */

'use client';

import { useEffect } from 'react';
import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';

export const BehaviorTracker: React.FC = () => {
  useBehaviorTracking();
  return null;
};

export default BehaviorTracker;


