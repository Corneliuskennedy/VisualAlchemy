import React from 'react';
import EnhancedChecklistApp from './EnhancedChecklistApp';

/**
 * ChecklistApp - Legacy wrapper component
 * 
 * This component now serves as a simple wrapper around the enhanced V2 version
 * of the GDPR Compliance Compass. This maintains backward compatibility while
 * providing access to all the new features including:
 * 
 * - Enhanced rule engine with JsonLogic conditions
 * - Legal source citations and references
 * - Improved user interface and accessibility
 * - Better progress tracking and analytics
 * - Premium feature support
 * - Audit trail and compliance reporting
 */
const ChecklistApp: React.FC = () => {
  return <EnhancedChecklistApp />;
};

export default ChecklistApp; 