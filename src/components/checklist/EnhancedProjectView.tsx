import React, { useState, useEffect } from 'react';
import { gdprSupabase as supabase } from '@/lib/supabaseClients';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  BookOpen,
  FileText,
  Download,
  Settings,
  Shield,
  Zap,
  Crown,
  Timer,
  Users,
  Calendar,
  Link as LinkIcon,
  Save,
  RefreshCw,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import RuleExplanation from './RuleExplanation';
import RuleMatchingSummary from './RuleMatchingSummary';

// Removed debug logging - use proper logger utility if needed

// Enhanced interfaces for V2 schema
interface ProjectV2 {
  id: string;
  title: string;
  description: string;
  config: any;
  use_case_category: string;
  data_types: string[];
  processing_activities: string[];
  third_party_integrations: string[];
  has_special_category_data: boolean;
  has_cross_border_transfers: boolean;
  target_audience: string;
  status: 'active' | 'completed' | 'archived';
  owner_id: string;
  organization_id?: string;
  created_at: string;
  updated_at: string;
  last_evaluated_at?: string;
}

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
  version: number;
  is_active: boolean;
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
  rule_version: number;
  matched_by_trigger_id?: string;
  evaluation_context: any;
  is_completed: boolean;
  completed_at?: string;
  completed_by?: string;
  user_notes?: string;
  evidence_urls: string[];
  compliance_status: 'pending' | 'in_progress' | 'completed' | 'not_applicable' | 'deferred';
  matched_at: string;
  updated_at: string;
  rules?: Rule;
  sources?: Source[];
}

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  company_size: string | null;
  organization_type: string | null;
}

interface EnhancedProjectViewProps {
  project: ProjectV2;
  userProfile: UserProfile | null;
  onBack: () => void;
  onProjectUpdate: () => void;
}

const EnhancedProjectView: React.FC<EnhancedProjectViewProps> = ({
  project,
  userProfile,
  onBack,
  onProjectUpdate
}) => {
  const [projectRules, setProjectRules] = useState<ProjectRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRule, setSelectedRule] = useState<ProjectRule | null>(null);
  const [activeTab, setActiveTab] = useState('checklist');
  const [updatingRule, setUpdatingRule] = useState<string | null>(null);

  // Fetch project rules with enhanced data
  const fetchProjectRules = async () => {
    try {
      const { data: rulesData, error: rulesError } = await supabase
        .from('project_rules')
        .select(`
          *,
          rules (
            id,
            title_nl,
            title_en,
            description_nl,
            description_en,
            severity,
            phase,
            category,
            is_premium,
            implementation_guide_nl,
            implementation_guide_en,
            estimated_hours,
            complexity_score,
            version,
            is_active
          )
        `)
        .eq('project_id', project.id)
        .order('matched_at', { ascending: false });

      if (rulesError) {
        setError('Failed to load project rules');
        return;
      }

      // Fetch sources for each rule
      const rulesWithSources = await Promise.all(
        (rulesData || []).map(async (projectRule) => {
          if (!projectRule.rules) return projectRule;

          const { data: sourcesData, error: sourcesError } = await supabase
            .from('sources')
            .select('*')
            .eq('rule_id', projectRule.rules.id)
            .order('reliability_score', { ascending: false });

          if (sourcesError) {
            // Silently handle source fetch errors
          }

          return {
            ...projectRule,
            sources: sourcesData || []
          };
        })
      );

      setProjectRules(rulesWithSources);
      
    } catch (err) {
      setError('Failed to load project rules');
    } finally {
      setLoading(false);
    }
  };

  // Update project rule status
  const updateProjectRule = async (
    projectRuleId: string, 
    updates: Partial<ProjectRule>
  ) => {
    try {
      setUpdatingRule(projectRuleId);

      const { error } = await supabase
        .from('project_rules')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectRuleId);

      if (error) {
        throw new Error('Failed to update rule');
      }

      // Update local state
      setProjectRules(prev => prev.map(rule => 
        rule.id === projectRuleId 
          ? { ...rule, ...updates }
          : rule
      ));

      onProjectUpdate();
      
    } catch (err) {
      throw err;
    } finally {
      setUpdatingRule(null);
    }
  };

  // Toggle rule completion
  const toggleRuleCompletion = async (projectRule: ProjectRule) => {
    const isCompleting = !projectRule.is_completed;
    
    await updateProjectRule(projectRule.id, {
      is_completed: isCompleting,
      completed_at: isCompleting ? new Date().toISOString() : undefined,
      completed_by: isCompleting ? userProfile?.user_id || undefined : undefined,
      compliance_status: isCompleting ? 'completed' : 'pending'
    });
  };

  // Update rule notes
  const updateRuleNotes = async (projectRule: ProjectRule, notes: string) => {
    await updateProjectRule(projectRule.id, {
      user_notes: notes
    });
  };

  // Update compliance status
  const updateComplianceStatus = async (
    projectRule: ProjectRule, 
    status: ProjectRule['compliance_status']
  ) => {
    await updateProjectRule(projectRule.id, {
      compliance_status: status,
      is_completed: status === 'completed',
      completed_at: status === 'completed' ? new Date().toISOString() : undefined,
      completed_by: status === 'completed' ? userProfile?.user_id || undefined : undefined
    });
  };

  // Get severity color and icon
  const getSeverityInfo = (severity: Rule['severity']) => {
    const severityMap = {
      low: { color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-500/50', icon: '🔵' },
      medium: { color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-500/50', icon: '🟡' },
      high: { color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-500/50', icon: '🟠' },
      critical: { color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/50', icon: '🔴' }
    };
    return severityMap[severity];
  };

  // Get phase info
  const getPhaseInfo = (phase: Rule['phase']) => {
    const phaseMap = {
      planning: { label: 'Planning', color: 'text-purple-400', icon: '📋' },
      implementation: { label: 'Implementation', color: 'text-blue-400', icon: '⚙️' },
      operation: { label: 'Operation', color: 'text-green-400', icon: '🚀' },
      maintenance: { label: 'Maintenance', color: 'text-yellow-400', icon: '🔧' }
    };
    return phaseMap[phase];
  };

  // Get source type info
  const getSourceTypeInfo = (sourceType: Source['source_type']) => {
    const sourceTypeMap = {
      gdpr_article: { label: 'GDPR Article', color: 'text-blue-400', icon: '📜' },
      edpb_guideline: { label: 'EDPB Guideline', color: 'text-green-400', icon: '📋' },
      dpa_ruling: { label: 'DPA Ruling', color: 'text-orange-400', icon: '⚖️' },
      national_law: { label: 'National Law', color: 'text-purple-400', icon: '🏛️' },
      case_law: { label: 'Case Law', color: 'text-red-400', icon: '⚡' }
    };
    return sourceTypeMap[sourceType];
  };

  // Calculate progress
  const getProgress = () => {
    const totalRules = projectRules.length;
    const completedRules = projectRules.filter(pr => pr.is_completed).length;
    const criticalPending = projectRules.filter(pr => 
      !pr.is_completed && pr.rules?.severity === 'critical'
    ).length;
    const highPending = projectRules.filter(pr => 
      !pr.is_completed && pr.rules?.severity === 'high'
    ).length;
    
    return {
      total: totalRules,
      completed: completedRules,
      percentage: totalRules > 0 ? Math.round((completedRules / totalRules) * 100) : 0,
      criticalPending,
      highPending
    };
  };

  // Load data on mount
  useEffect(() => {
    fetchProjectRules();
  }, [project.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300 mb-2">Loading project rules...</p>
          <p className="text-gray-500 text-sm">Evaluating compliance requirements</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Alert className="max-w-md bg-red-900/20 border-red-500/50">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const progress = getProgress();

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{project.title}</h1>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{progress.percentage}%</div>
                <p className="text-sm text-gray-400">{progress.completed}/{progress.total} completed</p>
              </div>
              <Button variant="outline" className="bg-gray-800 border-gray-600 text-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Overall Progress</span>
              <div className="flex gap-4 text-sm">
                {progress.criticalPending > 0 && (
                  <span className="text-red-400">{progress.criticalPending} critical pending</span>
                )}
                {progress.highPending > 0 && (
                  <span className="text-orange-400">{progress.highPending} high priority pending</span>
                )}
              </div>
            </div>
            <Progress value={progress.percentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="checklist" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              Compliance Checklist
            </TabsTrigger>
            <TabsTrigger value="explanations" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              <Lightbulb className="w-4 h-4 mr-1" />
              Rule Explanations
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              <BarChart3 className="w-4 h-4 mr-1" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              Project Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-6">
            {projectRules.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="py-8 text-center">
                  <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Rules Applied</h3>
                  <p className="text-gray-400 mb-4">
                    The rule engine hasn't identified any compliance requirements for this project configuration.
                  </p>
                  <Button 
                    onClick={fetchProjectRules}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Re-evaluate Rules
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {projectRules.map((projectRule) => {
                  if (!projectRule.rules) return null;
                  
                  const rule = projectRule.rules;
                  const severityInfo = getSeverityInfo(rule.severity);
                  const phaseInfo = getPhaseInfo(rule.phase);
                  const isUpdating = updatingRule === projectRule.id;
                  
                  return (
                    <Card key={projectRule.id} className={`bg-gray-900 border-gray-800 ${projectRule.is_completed ? 'opacity-75' : ''}`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={projectRule.is_completed}
                              onCheckedChange={() => toggleRuleCompletion(projectRule)}
                              disabled={isUpdating}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-lg text-white">
                                  {rule.title_en}
                                </CardTitle>
                                {rule.is_premium && (
                                  <Crown className="w-4 h-4 text-yellow-400" />
                                )}
                              </div>
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={`${severityInfo.bg} ${severityInfo.color} border-none`}>
                                  {severityInfo.icon} {rule.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className={`${phaseInfo.color} border-gray-600`}>
                                  {phaseInfo.icon} {phaseInfo.label}
                                </Badge>
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {rule.category.replace('_', ' ')}
                                </Badge>
                              </div>
                              {rule.description_en && (
                                <p className="text-gray-400 text-sm mb-3">
                                  {rule.description_en}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {rule.estimated_hours > 0 && (
                              <div className="flex items-center gap-1 text-sm text-gray-400">
                                <Timer className="w-4 h-4" />
                                {rule.estimated_hours}h
                              </div>
                            )}
                            <Badge variant={
                              projectRule.compliance_status === 'completed' ? 'default' :
                              projectRule.compliance_status === 'in_progress' ? 'secondary' :
                              projectRule.compliance_status === 'not_applicable' ? 'outline' :
                              'destructive'
                            }>
                              {projectRule.compliance_status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Legal Sources */}
                        {projectRule.sources && projectRule.sources.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Legal Sources
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {projectRule.sources.map((source) => {
                                const sourceTypeInfo = getSourceTypeInfo(source.source_type);
                                return (
                                  <div key={source.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                      <Badge variant="outline" className={`${sourceTypeInfo.color} border-gray-600 text-xs`}>
                                        {sourceTypeInfo.icon} {sourceTypeInfo.label}
                                      </Badge>
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                    <p className="text-sm font-medium text-white mb-1">
                                      {source.citation}
                                    </p>
                                    {source.excerpt_en && (
                                      <p className="text-xs text-gray-400 line-clamp-2">
                                        {source.excerpt_en}
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Implementation Guide (Premium) */}
                        {rule.is_premium && rule.implementation_guide_en && (
                          <div className="p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
                            <h4 className="text-sm font-medium text-yellow-400 flex items-center gap-2 mb-2">
                              <Crown className="w-4 h-4" />
                              Implementation Guide (Pro Feature)
                            </h4>
                            <p className="text-sm text-gray-300">
                              {rule.implementation_guide_en}
                            </p>
                          </div>
                        )}

                        {/* Compliance Status Selector */}
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-300">Status:</label>
                          <select
                            value={projectRule.compliance_status}
                            onChange={(e) => updateComplianceStatus(
                              projectRule, 
                              e.target.value as ProjectRule['compliance_status']
                            )}
                            disabled={isUpdating}
                            className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="not_applicable">Not Applicable</option>
                            <option value="deferred">Deferred</option>
                          </select>
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Notes:</label>
                          <Textarea
                            value={projectRule.user_notes || ''}
                            onChange={(e) => updateRuleNotes(projectRule, e.target.value)}
                            placeholder="Add implementation notes, evidence, or comments..."
                            className="bg-gray-800 border-gray-600 text-gray-300 min-h-[80px]"
                            disabled={isUpdating}
                          />
                        </div>

                        {/* Evidence URLs */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Evidence URLs:</label>
                          <Input
                            placeholder="Add links to documentation, screenshots, or other evidence"
                            className="bg-gray-800 border-gray-600 text-gray-300"
                            disabled={isUpdating}
                          />
                        </div>

                        {projectRule.completed_at && (
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            Completed on {new Date(projectRule.completed_at).toLocaleDateString()}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="explanations" className="space-y-6">
            {projectRules.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="py-8 text-center">
                  <Lightbulb className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Rules to Explain</h3>
                  <p className="text-gray-400">
                    Once rules are matched to your project, detailed explanations will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {projectRules.map((projectRule) => (
                  <RuleExplanation
                    key={projectRule.id}
                    projectRule={projectRule}
                    projectConfig={project}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <RuleMatchingSummary
              projectRules={projectRules}
              projectConfig={project}
              onRuleSelect={(ruleId) => {
                setActiveTab('explanations');
                // Scroll to the specific rule explanation
                setTimeout(() => {
                  const element = document.getElementById(`rule-${ruleId}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
            />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Project Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Use Case Category</h4>
                    <Badge variant="outline" className="text-gray-400 border-gray-600">
                      {project.use_case_category.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Data Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.data_types.map((type) => (
                        <Badge key={type} variant="outline" className="text-gray-400 border-gray-600">
                          {type.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Processing Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.processing_activities.map((activity) => (
                        <Badge key={activity} variant="outline" className="text-gray-400 border-gray-600">
                          {activity.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Special Category Data</h4>
                      <Badge variant={project.has_special_category_data ? 'destructive' : 'default'}>
                        {project.has_special_category_data ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Cross-Border Transfers</h4>
                      <Badge variant={project.has_cross_border_transfers ? 'destructive' : 'default'}>
                        {project.has_cross_border_transfers ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Project Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Created</h4>
                    <p className="text-gray-400">{new Date(project.created_at).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Last Updated</h4>
                    <p className="text-gray-400">{new Date(project.updated_at).toLocaleDateString()}</p>
                  </div>

                  {project.last_evaluated_at && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Last Rule Evaluation</h4>
                      <p className="text-gray-400">{new Date(project.last_evaluated_at).toLocaleDateString()}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Status</h4>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Rules</CardTitle>
                  <FileText className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{progress.total}</div>
                  <p className="text-xs text-gray-400">Compliance requirements</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{progress.completed}</div>
                  <p className="text-xs text-gray-400">{progress.percentage}% of total</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Critical Pending</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">{progress.criticalPending}</div>
                  <p className="text-xs text-gray-400">Requires immediate attention</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">High Priority</CardTitle>
                  <Clock className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">{progress.highPending}</div>
                  <p className="text-xs text-gray-400">Important tasks pending</p>
                </CardContent>
              </Card>
            </div>

            {/* Rules by Phase */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Rules by Implementation Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['planning', 'implementation', 'operation', 'maintenance'].map((phase) => {
                    const phaseRules = projectRules.filter(pr => pr.rules?.phase === phase);
                    const completedPhaseRules = phaseRules.filter(pr => pr.is_completed);
                    const phaseInfo = getPhaseInfo(phase as Rule['phase']);
                    
                    return (
                      <div key={phase} className="text-center p-4 bg-gray-800 rounded-lg">
                        <div className="text-lg mb-1">{phaseInfo.icon}</div>
                        <div className="text-lg font-bold text-white">{phaseRules.length}</div>
                        <p className="text-sm text-gray-400 mb-2">{phaseInfo.label}</p>
                        <div className="text-xs text-gray-500">
                          {completedPhaseRules.length} completed
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedProjectView; 