import React, { useState, useEffect } from 'react';
import { gdprSupabase as supabase } from '@/lib/supabaseClients';
import { useAuth } from '../auth/AuthProvider';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileText,
  Download,
  Save,
  Info,
  Shield,
  ExternalLink,
  Filter,
  SortAsc
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  use_case_category: string;
  data_types: string[];
  processing_activities: string[];
  third_party_integrations: string[];
  has_special_category_data: boolean;
  has_cross_border_transfers: boolean;
  target_audience: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
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

interface ChecklistItem {
  id: string;
  phase_number: number;
  phase_title: string;
  phase_title_nl: string;
  checkpoint_number: number;
  checkpoint_title: string;
  checkpoint_title_nl: string;
  why_it_matters: string;
  why_it_matters_nl: string;
  quick_action: string;
  quick_action_nl: string;
  legal_reference: string;
  priority_level: 'low' | 'medium' | 'high' | 'critical';
  estimated_hours: number;
}

interface ProjectProgress {
  id: string;
  checklist_item_id: string;
  is_completed: boolean;
  completion_date: string | null;
  notes: string | null;
}

interface ProjectViewProps {
  project: Project;
  userProfile: UserProfile | null;
  onBack: () => void;
  onProjectUpdate: () => void;
}

const priorityColors = {
  critical: 'bg-red-900/20 text-red-400 border-red-500/30',
  high: 'bg-orange-900/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-900/20 text-green-400 border-green-500/30'
};

const priorityIcons = {
  critical: <AlertTriangle className="w-4 h-4" />,
  high: <Clock className="w-4 h-4" />,
  medium: <Info className="w-4 h-4" />,
  low: <CheckCircle2 className="w-4 h-4" />
};

const useCaseLabels: Record<string, { label: string; icon: string; color: string }> = {
  email_marketing: { label: 'Email Marketing', icon: '📧', color: 'bg-blue-100 text-blue-800' },
  analytics_tracking: { label: 'Analytics', icon: '📊', color: 'bg-green-100 text-green-800' },
  customer_data_platform: { label: 'Customer Data', icon: '👥', color: 'bg-purple-100 text-purple-800' },
  e_commerce_platform: { label: 'E-commerce', icon: '🛒', color: 'bg-orange-100 text-orange-800' },
  hr_system: { label: 'HR System', icon: '🏢', color: 'bg-gray-100 text-gray-800' },
  payment_processing: { label: 'Payments', icon: '💳', color: 'bg-yellow-100 text-yellow-800' },
  healthcare_system: { label: 'Healthcare', icon: '🏥', color: 'bg-red-100 text-red-800' },
  saas_platform: { label: 'SaaS Platform', icon: '☁️', color: 'bg-cyan-100 text-cyan-800' },
  mobile_app: { label: 'Mobile App', icon: '📱', color: 'bg-indigo-100 text-indigo-800' },
  website_tracking: { label: 'Website Tracking', icon: '🍪', color: 'bg-pink-100 text-pink-800' },
  crm_system: { label: 'CRM', icon: '📋', color: 'bg-teal-100 text-teal-800' },
  automation_workflow: { label: 'Automation', icon: '⚙️', color: 'bg-slate-100 text-slate-800' },
  ai_ml_system: { label: 'AI/ML', icon: '🤖', color: 'bg-violet-100 text-violet-800' },
  other: { label: 'Other', icon: '❓', color: 'bg-gray-100 text-gray-800' }
};

export default function ProjectView({ project, userProfile, onBack, onProjectUpdate }: ProjectViewProps) {
  const { user } = useAuth();
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('checklist');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'phase' | 'priority'>('phase');
  const [updatingProgress, setUpdatingProgress] = useState<string | null>(null);

  useEffect(() => {
    loadProjectData();
  }, [project.id]);

  const loadProjectData = async () => {
    try {
      setLoading(true);

      // Load relevant checklist items for this project
      const { data: relevantItems, error: itemsError } = await supabase
        .rpc('get_relevant_checklist_items', {
          project_use_case: project.use_case_category,
          project_data_types: project.data_types,
          project_activities: project.processing_activities,
          has_special_data: project.has_special_category_data,
          has_cross_border: project.has_cross_border_transfers,
          company_size: userProfile?.company_size || 'startup'
        });

      if (itemsError) throw itemsError;

      setChecklistItems(relevantItems || []);

      // Load project progress
      const { data: progressData, error: progressError } = await supabase
        .from('project_progress')
        .select('*')
        .eq('project_id', project.id)
        .eq('user_id', user?.id);

      if (progressError) throw progressError;

      setProjectProgress(progressData || []);

    } catch (err: any) {
      console.error('Error loading project data:', err);
      setError(err.message || 'Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  const toggleItemCompletion = async (itemId: string, isCompleted: boolean, notes?: string) => {
    if (!user) return;

    try {
      setUpdatingProgress(itemId);

      const existingProgress = projectProgress.find(p => p.checklist_item_id === itemId);

      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('project_progress')
          .update({
            is_completed: isCompleted,
            completion_date: isCompleted ? new Date().toISOString() : null,
            notes: notes || existingProgress.notes,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from('project_progress')
          .insert([{
            user_id: user.id,
            project_id: project.id,
            checklist_item_id: itemId,
            is_completed: isCompleted,
            completion_date: isCompleted ? new Date().toISOString() : null,
            notes: notes || null
          }]);

        if (error) throw error;
      }

      // Reload progress
      await loadProjectData();
      onProjectUpdate();

    } catch (err: any) {
      console.error('Error updating progress:', err);
      setError(err.message || 'Failed to update progress');
    } finally {
      setUpdatingProgress(null);
    }
  };

  const updateNotes = async (itemId: string, notes: string) => {
    if (!user) return;

    try {
      const existingProgress = projectProgress.find(p => p.checklist_item_id === itemId);

      if (existingProgress) {
        const { error } = await supabase
          .from('project_progress')
          .update({
            notes,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('project_progress')
          .insert([{
            user_id: user.id,
            project_id: project.id,
            checklist_item_id: itemId,
            is_completed: false,
            notes
          }]);

        if (error) throw error;
      }

      await loadProjectData();
    } catch (err: any) {
      console.error('Error updating notes:', err);
    }
  };

  const getFilteredAndSortedItems = () => {
    let filtered = checklistItems;

    // Filter by priority
    if (filterPriority !== 'all') {
      filtered = filtered.filter(item => item.priority_level === filterPriority);
    }

    // Sort items
    if (sortBy === 'phase') {
      filtered.sort((a, b) => {
        if (a.phase_number !== b.phase_number) {
          return a.phase_number - b.phase_number;
        }
        return a.checkpoint_number - b.checkpoint_number;
      });
    } else if (sortBy === 'priority') {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      filtered.sort((a, b) => priorityOrder[a.priority_level] - priorityOrder[b.priority_level]);
    }

    return filtered;
  };

  const getProgressStats = () => {
    const totalItems = checklistItems.length;
    const completedItems = projectProgress.filter(p => p.is_completed).length;
    const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    const estimatedHours = checklistItems.reduce((sum, item) => sum + item.estimated_hours, 0);
    const criticalPending = checklistItems.filter(item => 
      item.priority_level === 'critical' && 
      !projectProgress.find(p => p.checklist_item_id === item.id && p.is_completed)
    ).length;

    return {
      totalItems,
      completedItems,
      completionPercentage,
      estimatedHours,
      criticalPending
    };
  };

  const useCaseInfo = useCaseLabels[project.use_case_category];
  const stats = getProgressStats();
  const filteredItems = getFilteredAndSortedItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300 mb-2">Loading your GDPR compliance checklist...</p>
          <p className="text-gray-500 text-sm">Analyzing your project requirements</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                  <span className="text-lg">{useCaseInfo?.icon || '📋'}</span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">{project.title}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {useCaseInfo?.label}
                    </Badge>
                    <span className="text-sm text-gray-400">
                      {stats.completedItems}/{stats.totalItems} items completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6 border-red-500/20 bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-800">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              <Info className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              <CheckCircle2 className="w-4 h-4" />
              Checklist ({stats.completedItems}/{stats.totalItems})
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
              <Download className="w-4 h-4" />
              Export
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Items</p>
                      <p className="text-2xl font-bold text-white">{stats.totalItems}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-white">{stats.completedItems}</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Critical Pending</p>
                      <p className="text-2xl font-bold text-white">{stats.criticalPending}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Est. Hours</p>
                      <p className="text-2xl font-bold text-white">{stats.estimatedHours}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Project Progress</CardTitle>
                <CardDescription className="text-gray-400">Overall completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="font-medium text-white">{stats.completionPercentage}%</span>
                  </div>
                  <Progress value={stats.completionPercentage} className="h-3" />
                  
                  {stats.criticalPending > 0 && (
                    <Alert className="border-red-500/20 bg-red-900/20">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">
                        You have {stats.criticalPending} critical items that require immediate attention.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-white">Description</h4>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Data Types</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.data_types.map(type => (
                          <Badge key={type} variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-300">
                            {type.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-white">Activities</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.processing_activities.map(activity => (
                          <Badge key={activity} variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-300">
                            {activity.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {project.third_party_integrations.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-white">Third-party Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.third_party_integrations.map(integration => (
                          <Badge key={integration} variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-300">
                            {integration.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        Special Category Data: {project.has_special_category_data ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        Cross-border Transfers: {project.has_cross_border_transfers ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-sm capitalize">
                        Target: {project.target_audience.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="space-y-6">
            {/* Filters and Sort */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="text-sm border bg-gray-800 border-gray-700 text-white rounded px-2 py-1"
                      >
                        <option value="all">All Priorities</option>
                        <option value="critical">Critical Only</option>
                        <option value="high">High Only</option>
                        <option value="medium">Medium Only</option>
                        <option value="low">Low Only</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4 text-gray-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'phase' | 'priority')}
                        className="text-sm border bg-gray-800 border-gray-700 text-white rounded px-2 py-1"
                      >
                        <option value="phase">Sort by Phase</option>
                        <option value="priority">Sort by Priority</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    Showing {filteredItems.length} of {checklistItems.length} items
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checklist Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const progress = projectProgress.find(p => p.checklist_item_id === item.id);
                const isCompleted = progress?.is_completed || false;
                const isUpdating = updatingProgress === item.id;

                return (
                  <Card key={item.id} className={`transition-all bg-gray-900 border-gray-800 ${isCompleted ? 'bg-green-900/20 border-green-500/30' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={isCompleted}
                          disabled={isUpdating}
                          onCheckedChange={(checked) => 
                            toggleItemCompletion(item.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
                                  {item.phase_number}.{item.checkpoint_number} {item.checkpoint_title}
                                </h3>
                                <Badge variant="outline" className={`${priorityColors[item.priority_level]} border`}>
                                  {priorityIcons[item.priority_level]}
                                  <span className="ml-1 capitalize">{item.priority_level}</span>
                                </Badge>
                              </div>
                              
                              <p className={`text-sm mb-3 ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
                                {item.why_it_matters}
                              </p>
                              
                              <div className={`bg-gray-800 p-3 rounded-lg mb-3 ${isCompleted ? 'opacity-60' : ''}`}>
                                <h4 className="font-medium text-sm text-white mb-1">Quick Action:</h4>
                                <p className="text-sm text-gray-300">{item.quick_action}</p>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Phase: {item.phase_title}</span>
                                <span>Est. Time: {item.estimated_hours}h</span>
                                {item.legal_reference && (
                                  <span>Legal Ref: {item.legal_reference}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                              Notes & Evidence:
                            </label>
                            <Textarea
                              value={progress?.notes || ''}
                              onChange={(e) => updateNotes(item.id, e.target.value)}
                              placeholder="Add notes about implementation, evidence of compliance, or next steps..."
                              className="text-sm bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {filteredItems.length === 0 && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-12 text-center">
                  <Filter className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Items Match Filter</h3>
                  <p className="text-gray-400">Try adjusting your filter settings to see more items.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Export Project Data</CardTitle>
                <CardDescription className="text-gray-400">Download your compliance progress and evidence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Download className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Export functionality coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 