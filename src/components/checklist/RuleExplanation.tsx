import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Lightbulb,
  Target,
  Scale,
  FileText,
  Users,
  Shield,
  Clock
} from 'lucide-react';

interface Rule {
  id: string;
  title_nl: string;
  title_en: string;
  description_nl?: string;
  description_en?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  phase: 'planning' | 'implementation' | 'operation' | 'maintenance';
  category: string;
  is_premium: boolean;
  implementation_guide_nl?: string;
  implementation_guide_en?: string;
  estimated_hours: number;
  complexity_score: number;
}

interface Source {
  id: string;
  rule_id: string;
  source_type: 'gdpr_article' | 'edpb_guideline' | 'dpa_ruling' | 'national_law' | 'case_law';
  url: string;
  citation: string;
  excerpt_nl?: string;
  excerpt_en?: string;
  language: string;
  published_at?: string;
  authority?: string;
  reliability_score: number;
}

interface ProjectRule {
  id: string;
  project_id: string;
  rule_id: string;
  evaluation_context: any;
  matched_by_trigger_id?: string;
  matched_at: string;
  rules?: Rule;
  sources?: Source[];
}

interface RuleExplanationProps {
  projectRule: ProjectRule;
  projectConfig: any;
  className?: string;
}

const RuleExplanation: React.FC<RuleExplanationProps> = ({
  projectRule,
  projectConfig,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImplementation, setShowImplementation] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const rule = projectRule.rules;
  if (!rule) return null;

  // Generate explanation based on evaluation context
  const generateMatchExplanation = () => {
    const context = projectRule.evaluation_context || {};
    const explanations: string[] = [];

    // Analyze why the rule matched based on project configuration
    if (projectConfig.use_case_category) {
      const useCaseMap: Record<string, string> = {
        'marketing_automation': 'marketing automation system',
        'customer_support': 'customer support platform',
        'ecommerce_platform': 'e-commerce platform',
        'hrms': 'HR management system',
        'analytics_tracking': 'analytics and tracking system',
        'content_management': 'content management system'
      };
      
      const useCaseLabel = useCaseMap[projectConfig.use_case_category] || projectConfig.use_case_category;
      explanations.push(`Your project is a ${useCaseLabel}`);
    }

    if (projectConfig.data_types && projectConfig.data_types.length > 0) {
      const dataTypeMap: Record<string, string> = {
        'personal_identifiers': 'personal identifiers (names, emails, IDs)',
        'contact_information': 'contact information',
        'financial_data': 'financial data',
        'health_data': 'health information',
        'biometric_data': 'biometric data',
        'location_data': 'location data',
        'behavioral_data': 'behavioral tracking data',
        'demographic_data': 'demographic information'
      };

      const dataTypes = projectConfig.data_types
        .map((type: string) => dataTypeMap[type] || type)
        .join(', ');
      explanations.push(`You process ${dataTypes}`);
    }

    if (projectConfig.processing_activities && projectConfig.processing_activities.length > 0) {
      const activityMap: Record<string, string> = {
        'collection': 'data collection',
        'storage': 'data storage',
        'analysis': 'data analysis',
        'sharing': 'data sharing',
        'marketing': 'marketing activities',
        'profiling': 'user profiling',
        'automated_decision_making': 'automated decision making',
        'third_party_sharing': 'third-party data sharing'
      };

      const activities = projectConfig.processing_activities
        .map((activity: string) => activityMap[activity] || activity)
        .join(', ');
      explanations.push(`Your activities include ${activities}`);
    }

    if (projectConfig.has_cross_border_transfers) {
      explanations.push('You transfer data across borders');
    }

    if (projectConfig.has_special_category_data) {
      explanations.push('You handle special category data');
    }

    if (projectConfig.target_audience) {
      const audienceMap: Record<string, string> = {
        'eu_residents': 'EU residents',
        'global_users': 'global users including EU residents',
        'children': 'children under 16',
        'employees': 'employees',
        'customers': 'customers'
      };
      
      const audience = audienceMap[projectConfig.target_audience] || projectConfig.target_audience;
      explanations.push(`Your target audience includes ${audience}`);
    }

    return explanations;
  };

  const getSeverityConfig = (severity: Rule['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          color: 'text-red-400',
          bgColor: 'bg-red-900/20',
          borderColor: 'border-red-500/50',
          label: 'Critical'
        };
      case 'high':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          color: 'text-orange-400',
          bgColor: 'bg-orange-900/20',
          borderColor: 'border-orange-500/50',
          label: 'High'
        };
      case 'medium':
        return {
          icon: <Info className="w-4 h-4" />,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-900/20',
          borderColor: 'border-yellow-500/50',
          label: 'Medium'
        };
      case 'low':
        return {
          icon: <Info className="w-4 h-4" />,
          color: 'text-blue-400',
          bgColor: 'bg-blue-900/20',
          borderColor: 'border-blue-500/50',
          label: 'Low'
        };
    }
  };

  const getPhaseConfig = (phase: Rule['phase']) => {
    switch (phase) {
      case 'planning':
        return { icon: <Target className="w-4 h-4" />, label: 'Planning Phase', color: 'text-blue-400' };
      case 'implementation':
        return { icon: <Users className="w-4 h-4" />, label: 'Implementation Phase', color: 'text-green-400' };
      case 'operation':
        return { icon: <Shield className="w-4 h-4" />, label: 'Operational Phase', color: 'text-purple-400' };
      case 'maintenance':
        return { icon: <Clock className="w-4 h-4" />, label: 'Maintenance Phase', color: 'text-gray-400' };
    }
  };

  const getSourceTypeConfig = (sourceType: Source['source_type']) => {
    switch (sourceType) {
      case 'gdpr_article':
        return { label: 'GDPR Article', color: 'bg-blue-600', icon: <Scale className="w-3 h-3" /> };
      case 'edpb_guideline':
        return { label: 'EDPB Guideline', color: 'bg-green-600', icon: <BookOpen className="w-3 h-3" /> };
      case 'dpa_ruling':
        return { label: 'DPA Ruling', color: 'bg-purple-600', icon: <FileText className="w-3 h-3" /> };
      case 'national_law':
        return { label: 'National Law', color: 'bg-orange-600', icon: <Scale className="w-3 h-3" /> };
      case 'case_law':
        return { label: 'Case Law', color: 'bg-red-600', icon: <FileText className="w-3 h-3" /> };
    }
  };

  const severityConfig = getSeverityConfig(rule.severity);
  const phaseConfig = getPhaseConfig(rule.phase);
  const explanations = generateMatchExplanation();

  return (
    <Card id={`rule-${rule.id}`} className={`bg-gray-900 border-gray-800 ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`${severityConfig.color}`}>
                {severityConfig.icon}
              </div>
              <CardTitle className="text-lg text-white">{rule.title_en}</CardTitle>
              {rule.is_premium && (
                <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                  Premium
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 mb-3">
              <Badge variant="outline" className={`${severityConfig.borderColor} ${severityConfig.color}`}>
                {severityConfig.label} Priority
              </Badge>
              <Badge variant="outline" className={`border-gray-600 ${phaseConfig.color}`}>
                <span className="mr-1">{phaseConfig.icon}</span>
                {phaseConfig.label}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                ~{rule.estimated_hours}h
              </Badge>
            </div>
            {rule.description_en && (
              <CardDescription className="text-gray-400">
                {rule.description_en}
              </CardDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {/* Why This Rule Applies */}
      <CardContent className="space-y-4">
        <Alert className={`${severityConfig.bgColor} ${severityConfig.borderColor}`}>
          <Lightbulb className={`h-4 w-4 ${severityConfig.color}`} />
          <AlertDescription className="text-gray-200">
            <strong className={severityConfig.color}>Why this rule applies:</strong>
            <ul className="mt-2 space-y-1">
              {explanations.map((explanation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${severityConfig.color} mt-1`}>•</span>
                  <span className="capitalize">{explanation}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-4">
            {/* Implementation Guide */}
            {rule.implementation_guide_en && (
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImplementation(!showImplementation)}
                  className="mb-3 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {showImplementation ? 'Hide' : 'Show'} Implementation Guide
                </Button>
                
                <Collapsible open={showImplementation} onOpenChange={setShowImplementation}>
                  <CollapsibleContent>
                    <Alert className="bg-green-900/20 border-green-500/50">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-gray-200">
                        <div className="prose prose-sm prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ 
                            __html: rule.implementation_guide_en.replace(/\n/g, '<br/>') 
                          }} />
                        </div>
                      </AlertDescription>
                    </Alert>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {/* Legal Sources */}
            {projectRule.sources && projectRule.sources.length > 0 && (
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSources(!showSources)}
                  className="mb-3 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {showSources ? 'Hide' : 'Show'} Legal Sources ({projectRule.sources.length})
                </Button>
                
                <Collapsible open={showSources} onOpenChange={setShowSources}>
                  <CollapsibleContent className="space-y-3">
                    {projectRule.sources.map((source) => {
                      const sourceConfig = getSourceTypeConfig(source.source_type);
                      return (
                        <Card key={source.id} className="bg-gray-800 border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge className={`${sourceConfig.color} text-white`}>
                                  {sourceConfig.icon}
                                  <span className="ml-1">{sourceConfig.label}</span>
                                </Badge>
                                <span className="text-sm font-medium text-white">{source.citation}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(source.url, '_blank')}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                            {source.excerpt_en && (
                              <p className="text-sm text-gray-400 italic">
                                "{source.excerpt_en}"
                              </p>
                            )}
                            {source.authority && (
                              <p className="text-xs text-gray-500 mt-2">
                                Authority: {source.authority}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {/* Rule Metadata */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-sm text-gray-400">Category</p>
                <p className="text-sm font-medium text-white capitalize">{rule.category.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Complexity Score</p>
                <p className="text-sm font-medium text-white">{rule.complexity_score}/10</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default RuleExplanation; 