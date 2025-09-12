import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { gdprSupabase as supabase } from '@/lib/supabaseClients';
import { useToast } from '../ui/toast-notifications';
import { LoadingState, SkeletonCard, LoadingSpinner } from '../ui/loading-states';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Plus, 
  Settings, 
  BarChart3, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Folder,
  Users,
  Shield,
  FileText,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Zap,
  RefreshCw
} from 'lucide-react';
import EnhancedProjectWizard, { ProjectData } from './EnhancedProjectWizard';
import EnhancedProjectView from './EnhancedProjectView';
import AppHeader from './AppHeader';

// Enhanced logging function
const checklistLog = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`📋 [${timestamp}] EnhancedChecklistApp: ${message}`, data || '');
};

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
  rules?: Rule; // Joined rule data
}

interface ProjectProgress {
  project_id: string;
  total_items: number;
  completed_items: number;
  progress_percentage: number;
  critical_pending: number;
  high_pending: number;
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

const EnhancedChecklistApp: React.FC = () => {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const { success, error: showError, info, warning } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'wizard' | 'project'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<ProjectV2 | null>(null);
  const [projects, setProjects] = useState<ProjectV2[]>([]);
  const [projectProgress, setProjectProgress] = useState<Record<string, ProjectProgress>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [retryCount, setRetryCount] = useState(0);

  // Debug auth state
  useEffect(() => {
    checklistLog('Auth state changed:', {
      hasUser: !!user,
      userEmail: user?.email || 'no email',
      hasSession: !!session,
      authLoading,
      sessionAccessToken: session?.access_token ? 'present' : 'missing',
      sessionExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'no expiry'
    });
  }, [user, session, authLoading]);

  // Fetch user profile with enhanced error handling
  const fetchUserProfile = async () => {
    if (!user?.id) return;

    try {
      checklistLog('Fetching user profile for:', user.id);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          checklistLog('No profile found, creating default profile');
          info('Setting up your profile...', { duration: 3000 });
          
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert([{
              user_id: user.id,
              email: user.email || '',
              first_name: user.user_metadata?.first_name || null,
              last_name: user.user_metadata?.last_name || null,
              company_name: null,
              company_size: null,
              organization_type: null
            }])
            .select()
            .single();

          if (createError) {
            checklistLog('Error creating profile:', createError);
            showError('Failed to create user profile. Please try again.', {
              action: {
                label: 'Retry',
                onClick: () => fetchUserProfile()
              }
            });
            setError('Failed to create user profile');
          } else {
            setProfile(newProfile);
            success('Profile created successfully!');
            checklistLog('Profile created successfully:', newProfile);
          }
        } else {
          checklistLog('Error fetching profile:', error);
          showError('Failed to load user profile. Please check your connection.', {
            action: {
              label: 'Retry',
              onClick: () => fetchUserProfile()
            }
          });
          setError('Failed to load user profile');
        }
      } else {
        setProfile(data);
        checklistLog('Profile loaded successfully:', data);
      }
    } catch (err) {
      checklistLog('Exception in fetchUserProfile:', err);
      showError('An unexpected error occurred while loading your profile.', {
        action: {
          label: 'Retry',
          onClick: () => fetchUserProfile()
        }
      });
      setError('Failed to load profile');
    }
  };

  // Fetch projects using V2 schema
  const fetchProjects = async () => {
    if (!user?.id) return;

    try {
      checklistLog('Fetching projects for user:', user.id);
      
      const { data, error } = await supabase
        .from('projects_v2')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        checklistLog('Error fetching projects:', error);
        setError('Failed to load projects');
      } else {
        setProjects(data || []);
        checklistLog('Projects loaded:', data?.length || 0);
        
        // Fetch progress for each project
        if (data && data.length > 0) {
          await fetchProjectsProgress(data.map(p => p.id));
        }
      }
    } catch (err) {
      checklistLog('Exception in fetchProjects:', err);
      setError('Failed to load projects');
    }
  };

  // Fetch project progress using V2 schema
  const fetchProjectsProgress = async (projectIds: string[]) => {
    try {
      const progressPromises = projectIds.map(async (projectId) => {
        const { data, error } = await supabase
          .from('project_rules')
          .select(`
            *,
            rules (
              id,
              title_en,
              severity,
              estimated_hours
            )
          `)
          .eq('project_id', projectId);

        if (error) {
          checklistLog('Error fetching project rules:', error);
          return null;
        }

        const totalItems = data?.length || 0;
        const completedItems = data?.filter(pr => pr.is_completed).length || 0;
        const criticalPending = data?.filter(pr => 
          !pr.is_completed && pr.rules?.severity === 'critical'
        ).length || 0;
        const highPending = data?.filter(pr => 
          !pr.is_completed && pr.rules?.severity === 'high'
        ).length || 0;

        return {
          project_id: projectId,
          total_items: totalItems,
          completed_items: completedItems,
          progress_percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
          critical_pending: criticalPending,
          high_pending: highPending
        };
      });

      const progressResults = await Promise.all(progressPromises);
      const progressMap: Record<string, ProjectProgress> = {};
      
      progressResults.forEach(progress => {
        if (progress) {
          progressMap[progress.project_id] = progress;
        }
      });

      setProjectProgress(progressMap);
      checklistLog('Project progress loaded for projects:', Object.keys(progressMap));
    } catch (err) {
      checklistLog('Exception in fetchProjectsProgress:', err);
    }
  };

  // Create project using V2 schema and rule engine with enhanced feedback
  const handleCreateProject = async (projectData: ProjectData) => {
    try {
      checklistLog('Creating new project:', projectData);
      info('Creating your GDPR compliance project...', { duration: 0 });
      
      // Create project configuration for rule engine
      const projectConfig = {
        use_case_category: projectData.use_case_category,
        data_types: projectData.data_types,
        processing_activities: projectData.processing_activities,
        third_party_integrations: projectData.third_party_integrations,
        has_special_category_data: projectData.has_special_category_data,
        has_cross_border_transfers: projectData.has_cross_border_transfers,
        target_audience: projectData.target_audience
      };

      // Insert project into V2 table
      const { data: project, error: projectError } = await supabase
        .from('projects_v2')
        .insert([{
          title: projectData.title,
          description: projectData.description,
          config: projectConfig,
          use_case_category: projectData.use_case_category,
          data_types: projectData.data_types,
          processing_activities: projectData.processing_activities,
          third_party_integrations: projectData.third_party_integrations,
          has_special_category_data: projectData.has_special_category_data,
          has_cross_border_transfers: projectData.has_cross_border_transfers,
          target_audience: projectData.target_audience,
          owner_id: user!.id,
          status: 'active'
        }])
        .select()
        .single();

      if (projectError) {
        checklistLog('Error creating project:', projectError);
        showError('Failed to create project. Please try again.', {
          action: {
            label: 'Retry',
            onClick: () => handleCreateProject(projectData)
          }
        });
        throw new Error('Failed to create project');
      }

      checklistLog('Project created successfully:', project);
      success('Project created successfully!');

      // Show rule evaluation progress
      info('Evaluating GDPR rules for your project...', { duration: 0 });

      // Evaluate rules using the new rule engine
      const { error: evaluationError } = await supabase.rpc('evaluate_project_rules', {
        project_uuid: project.id
      });

      if (evaluationError) {
        checklistLog('Error evaluating project rules:', evaluationError);
        warning('Project created, but rule evaluation failed. You can retry from the project page.');
      } else {
        checklistLog('Project rules evaluated successfully');
        success('GDPR rules evaluated successfully!');
      }

      // Refresh projects list
      await fetchProjects();
      
      // Navigate to the new project
      setSelectedProject(project);
      setCurrentView('project');
      
    } catch (err) {
      checklistLog('Exception in handleCreateProject:', err);
      if (!(err as Error).message.includes('Failed to create project')) {
        showError('An unexpected error occurred while creating your project.', {
          action: {
            label: 'Try Again',
            onClick: () => handleCreateProject(projectData)
          }
        });
      }
      throw err;
    }
  };

  // Update project
  const handleProjectUpdate = async () => {
    await fetchProjects();
  };

  // Get use case info
  const getUseCaseInfo = (category: string) => {
    const useCaseMap: Record<string, { label: string; icon: string }> = {
      'marketing_automation': { label: 'Marketing Automation', icon: '📧' },
      'customer_support': { label: 'Customer Support', icon: '🎧' },
      'ecommerce_platform': { label: 'E-commerce Platform', icon: '🛒' },
      'hrms': { label: 'HR Management System', icon: '👥' },
      'analytics_tracking': { label: 'Analytics & Tracking', icon: '📊' },
      'content_management': { label: 'Content Management', icon: '📝' }
    };
    return useCaseMap[category] || { label: category, icon: '📋' };
  };

  // Get overall statistics
  const getOverallStats = () => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    
    const allProgress = Object.values(projectProgress);
    const totalItems = allProgress.reduce((sum, p) => sum + p.total_items, 0);
    const completedItems = allProgress.reduce((sum, p) => sum + p.completed_items, 0);
    const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    const criticalPending = allProgress.reduce((sum, p) => sum + p.critical_pending, 0);
    const highPending = allProgress.reduce((sum, p) => sum + p.high_pending, 0);

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalItems,
      completedItems,
      overallProgress,
      criticalPending,
      highPending
    };
  };

  // Load data on mount and auth changes
  useEffect(() => {
    if (user && !authLoading) {
      Promise.all([
        fetchUserProfile(),
        fetchProjects()
      ]).finally(() => {
        setLoading(false);
      });
    } else if (!user && !authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <LoadingState
          variant={authLoading ? 'auth' : 'data'}
          message={authLoading ? 'Authenticating...' : 'Loading GDPR Compass 2.0...'}
          submessage={authLoading ? 'Verifying your credentials' : 'Initializing enhanced compliance engine'}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-xl text-white">
              Something went wrong
            </CardTitle>
            <CardDescription className="text-gray-400">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setError(null);
                  setRetryCount(prev => prev + 1);
                  if (user && !authLoading) {
                    Promise.all([
                      fetchUserProfile(),
                      fetchProjects()
                    ]).finally(() => {
                      setLoading(false);
                    });
                  }
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again {retryCount > 0 && `(${retryCount})`}
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Project creation wizard view
  if (currentView === 'wizard') {
    return (
      <EnhancedProjectWizard
        onComplete={handleCreateProject}
        onCancel={() => setCurrentView('dashboard')}
      />
    );
  }

  // Individual project view
  if (currentView === 'project' && selectedProject) {
    return (
      <EnhancedProjectView
        project={selectedProject}
        userProfile={profile}
        onBack={() => {
          setCurrentView('dashboard');
          setSelectedProject(null);
        }}
        onProjectUpdate={handleProjectUpdate}
      />
    );
  }

  // Main dashboard view
  const stats = getOverallStats();

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <AppHeader
        onNewProject={() => setCurrentView('wizard')}
        onSignOut={signOut}
        userProfile={profile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 hidden md:flex">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">Projects</TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Projects</CardTitle>
                  <Folder className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
                  <p className="text-xs text-gray-400">
                    {stats.activeProjects} active, {stats.completedProjects} completed
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Overall Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.overallProgress}%</div>
                  <p className="text-xs text-gray-400">
                    {stats.completedItems} of {stats.totalItems} items
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Compliance Score</CardTitle>
                  <Shield className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">
                    {stats.overallProgress >= 80 ? 'High' : stats.overallProgress >= 60 ? 'Medium' : 'Low'}
                  </div>
                  <p className="text-xs text-gray-400">
                    Based on completion rate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Critical Items</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">{stats.criticalPending}</div>
                  <p className="text-xs text-gray-400">
                    {stats.highPending} high priority pending
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Message or Quick Actions */}
            {projects.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    Welcome to GDPR Compliance Compass 2.0
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Experience our enhanced compliance engine with 99.99% rule-matching accuracy, 
                    complete source transparency, and enterprise-ready audit trails.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Deterministic rule engine</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <BookOpen className="w-4 h-4" />
                      <span>Legal source citations</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Shield className="w-4 h-4" />
                      <span>Audit-ready compliance</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setCurrentView('wizard')}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
                  >
                    <Plus className="w-4 h-4" />
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{project.title}</p>
                            <p className="text-xs text-gray-400">
                              Updated {new Date(project.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                            {project.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => setCurrentView('wizard')}
                      className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Compliance Project
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export Compliance Report
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <Button 
                onClick={() => setCurrentView('wizard')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <SkeletonCard count={3} />
              ) : (
                projects.map((project) => {
                  const useCaseInfo = getUseCaseInfo(project.use_case_category);
                  const progress = projectProgress[project.id];
                
                return (
                  <Card key={project.id} className="bg-gray-900 border-gray-800 cursor-pointer hover:border-green-500/50 transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                            <span className="text-lg">{useCaseInfo.icon}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                            <Badge variant="secondary" className="mt-1 bg-gray-800 text-gray-300 border-gray-700">
                              {useCaseInfo.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge variant={project.status === 'active' ? 'default' : 'secondary'} 
                                 className={project.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}>
                            {project.status}
                          </Badge>
                          {progress && progress.critical_pending > 0 && (
                            <Badge variant="destructive" className="bg-red-600 text-white text-xs">
                              {progress.critical_pending} critical
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {progress && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-300">Progress</span>
                            <span className="text-sm text-gray-400">
                              {progress.completed_items}/{progress.total_items}
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress.progress_percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {progress.progress_percentage}% complete
                          </p>
                        </div>
                      )}
                      
                      <Button
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white border-none"
                        onClick={() => {
                          setSelectedProject(project);
                          setCurrentView('project');
                        }}
                      >
                        Open Project
                      </Button>
                    </CardContent>
                  </Card>
                );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Compliance Progress Overview
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Track your GDPR compliance progress across all projects with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{stats.overallProgress}%</div>
                    <p className="text-sm text-gray-400">Overall Completion</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{stats.totalItems}</div>
                    <p className="text-sm text-gray-400">Total Rules</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-400">{stats.criticalPending}</div>
                    <p className="text-sm text-gray-400">Critical Pending</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{stats.highPending}</div>
                    <p className="text-sm text-gray-400">High Priority</p>
                  </div>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No projects yet. Create your first project to see progress analytics.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => {
                      const progress = projectProgress[project.id];
                      if (!progress) return null;

                      return (
                        <div key={project.id} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{project.title}</h4>
                            <span className="text-sm text-gray-400">
                              {progress.completed_items}/{progress.total_items} completed
                            </span>
                          </div>
                          <Progress value={progress.progress_percentage} className="mb-2" />
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{progress.progress_percentage}% complete</span>
                            <div className="flex gap-4">
                              {progress.critical_pending > 0 && (
                                <span className="text-red-400">{progress.critical_pending} critical</span>
                              )}
                              {progress.high_pending > 0 && (
                                <span className="text-yellow-400">{progress.high_pending} high</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedChecklistApp; 