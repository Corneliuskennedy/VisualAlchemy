/**
 * GDPR Compliance Compass 2.0 - TypeScript API Service
 * 
 * This service provides a comprehensive interface to the enhanced V2 database schema
 * with rule engine, legal source citations, and audit trail functionality.
 */

import { gdprSupabase as supabase } from './supabaseClients';

// ====================================================================
// Enhanced Type Definitions for V2 Schema
// ====================================================================

export interface Rule {
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
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface Source {
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
  created_at: string;
  updated_at: string;
}

export interface Trigger {
  id: string;
  rule_id: string;
  condition: Record<string, any>; // JsonLogic condition
  description?: string;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectV2 {
  id: string;
  title: string;
  description: string;
  config: Record<string, any>;
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

export interface ProjectRule {
  id: string;
  project_id: string;
  rule_id: string;
  rule_version: number;
  matched_by_trigger_id?: string;
  evaluation_context: Record<string, any>;
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

export interface RuleVersion {
  id: string;
  rule_id: string;
  version_number: number;
  changes: Record<string, any>;
  source_hash?: string;
  change_reason: string;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  release_date?: string;
  created_at: string;
  created_by: string;
}

export interface ProjectProgress {
  project_id: string;
  total_items: number;
  completed_items: number;
  progress_percentage: number;
  critical_pending: number;
  high_pending: number;
  medium_pending: number;
  low_pending: number;
  estimated_hours_total: number;
  estimated_hours_completed: number;
}

export interface ComplianceMetrics {
  overall_progress: number;
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  critical_issues: number;
  high_priority_issues: number;
  compliance_score: 'low' | 'medium' | 'high';
  last_updated: string;
}

// ====================================================================
// Enhanced Logging Utility
// ====================================================================

const compassLog = (level: 'info' | 'warn' | 'error', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `🧭 [${timestamp}] GDPR-Compass-V2:`;
  
  switch (level) {
    case 'info':
      console.log(`${prefix} ${message}`, data || '');
      break;
    case 'warn':
      console.warn(`${prefix} ⚠️ ${message}`, data || '');
      break;
    case 'error':
      console.error(`${prefix} ❌ ${message}`, data || '');
      break;
  }
};

// ====================================================================
// Core GDPR Compass V2 Service Class
// ====================================================================

export class GDPRCompassV2 {
  
  // ================================================================
  // Rule Management
  // ================================================================
  
  /**
   * Fetch all active rules with optional filtering
   */
  static async getRules(filters?: {
    severity?: Rule['severity'][];
    phase?: Rule['phase'][];
    category?: string[];
    is_premium?: boolean;
    search?: string;
  }): Promise<Rule[]> {
    try {
      compassLog('info', 'Fetching rules with filters:', filters);
      
      let query = supabase
        .from('rules')
        .select('*')
        .eq('is_active', true)
        .order('severity', { ascending: false })
        .order('title_en', { ascending: true });

      // Apply filters
      if (filters?.severity?.length) {
        query = query.in('severity', filters.severity);
      }
      
      if (filters?.phase?.length) {
        query = query.in('phase', filters.phase);
      }
      
      if (filters?.category?.length) {
        query = query.in('category', filters.category);
      }
      
      if (filters?.is_premium !== undefined) {
        query = query.eq('is_premium', filters.is_premium);
      }
      
      if (filters?.search) {
        query = query.or(`title_en.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        compassLog('error', 'Error fetching rules:', error);
        throw new Error(`Failed to fetch rules: ${error.message}`);
      }

      compassLog('info', `Fetched ${data?.length || 0} rules`);
      return data || [];
      
    } catch (err) {
      compassLog('error', 'Exception in getRules:', err);
      throw err;
    }
  }

  /**
   * Get rule with sources and triggers
   */
  static async getRuleWithDetails(ruleId: string): Promise<Rule & { sources: Source[], triggers: Trigger[] }> {
    try {
      compassLog('info', 'Fetching rule details for:', ruleId);
      
      const [ruleResult, sourcesResult, triggersResult] = await Promise.all([
        supabase.from('rules').select('*').eq('id', ruleId).single(),
        supabase.from('sources').select('*').eq('rule_id', ruleId).order('reliability_score', { ascending: false }),
        supabase.from('triggers').select('*').eq('rule_id', ruleId).order('priority', { ascending: false })
      ]);

      if (ruleResult.error) {
        throw new Error(`Failed to fetch rule: ${ruleResult.error.message}`);
      }

      if (sourcesResult.error) {
        compassLog('warn', 'Error fetching sources:', sourcesResult.error);
      }

      if (triggersResult.error) {
        compassLog('warn', 'Error fetching triggers:', triggersResult.error);
      }

      return {
        ...ruleResult.data,
        sources: sourcesResult.data || [],
        triggers: triggersResult.data || []
      };
      
    } catch (err) {
      compassLog('error', 'Exception in getRuleWithDetails:', err);
      throw err;
    }
  }

  // ================================================================
  // Project Management
  // ================================================================

  /**
   * Create a new project and evaluate rules
   */
  static async createProject(projectData: Omit<ProjectV2, 'id' | 'created_at' | 'updated_at' | 'last_evaluated_at'>): Promise<ProjectV2> {
    try {
      compassLog('info', 'Creating new project:', projectData.title);
      
      // Insert project
      const { data: project, error: projectError } = await supabase
        .from('projects_v2')
        .insert([projectData])
        .select()
        .single();

      if (projectError) {
        compassLog('error', 'Error creating project:', projectError);
        throw new Error(`Failed to create project: ${projectError.message}`);
      }

      compassLog('info', 'Project created successfully:', project.id);

      // Evaluate rules for the new project
      await this.evaluateProjectRules(project.id);

      return project;
      
    } catch (err) {
      compassLog('error', 'Exception in createProject:', err);
      throw err;
    }
  }

  /**
   * Get user's projects with progress information
   */
  static async getUserProjects(userId: string): Promise<(ProjectV2 & { progress?: ProjectProgress })[]> {
    try {
      compassLog('info', 'Fetching projects for user:', userId);
      
      const { data: projects, error } = await supabase
        .from('projects_v2')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        compassLog('error', 'Error fetching projects:', error);
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }

      // Fetch progress for each project
      const projectsWithProgress = await Promise.all(
        (projects || []).map(async (project) => {
          const progress = await this.getProjectProgress(project.id);
          return { ...project, progress };
        })
      );

      compassLog('info', `Fetched ${projectsWithProgress.length} projects with progress`);
      return projectsWithProgress;
      
    } catch (err) {
      compassLog('error', 'Exception in getUserProjects:', err);
      throw err;
    }
  }

  /**
   * Evaluate rules for a project using the rule engine
   */
  static async evaluateProjectRules(projectId: string): Promise<void> {
    try {
      compassLog('info', 'Evaluating rules for project:', projectId);
      
      const { error } = await supabase.rpc('evaluate_project_rules', {
        project_uuid: projectId
      });

      if (error) {
        compassLog('error', 'Error evaluating project rules:', error);
        throw new Error(`Failed to evaluate project rules: ${error.message}`);
      }

      compassLog('info', 'Project rules evaluated successfully');
      
    } catch (err) {
      compassLog('error', 'Exception in evaluateProjectRules:', err);
      throw err;
    }
  }

  /**
   * Get project rules with detailed information
   */
  static async getProjectRules(projectId: string): Promise<ProjectRule[]> {
    try {
      compassLog('info', 'Fetching project rules for:', projectId);
      
      const { data, error } = await supabase
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
        .eq('project_id', projectId)
        .order('matched_at', { ascending: false });

      if (error) {
        compassLog('error', 'Error fetching project rules:', error);
        throw new Error(`Failed to fetch project rules: ${error.message}`);
      }

      // Fetch sources for each rule
      const rulesWithSources = await Promise.all(
        (data || []).map(async (projectRule) => {
          if (!projectRule.rules) return projectRule;

          const { data: sources, error: sourcesError } = await supabase
            .from('sources')
            .select('*')
            .eq('rule_id', projectRule.rules.id)
            .order('reliability_score', { ascending: false });

          if (sourcesError) {
            compassLog('warn', 'Error fetching sources for rule:', projectRule.rules.id);
          }

          return {
            ...projectRule,
            sources: sources || []
          };
        })
      );

      compassLog('info', `Fetched ${rulesWithSources.length} project rules with sources`);
      return rulesWithSources;
      
    } catch (err) {
      compassLog('error', 'Exception in getProjectRules:', err);
      throw err;
    }
  }

  /**
   * Update project rule status
   */
  static async updateProjectRule(
    projectRuleId: string, 
    updates: Partial<Pick<ProjectRule, 'is_completed' | 'compliance_status' | 'user_notes' | 'evidence_urls' | 'completed_at' | 'completed_by'>>
  ): Promise<ProjectRule> {
    try {
      compassLog('info', 'Updating project rule:', projectRuleId);
      
      const { data, error } = await supabase
        .from('project_rules')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectRuleId)
        .select()
        .single();

      if (error) {
        compassLog('error', 'Error updating project rule:', error);
        throw new Error(`Failed to update project rule: ${error.message}`);
      }

      compassLog('info', 'Project rule updated successfully');
      return data;
      
    } catch (err) {
      compassLog('error', 'Exception in updateProjectRule:', err);
      throw err;
    }
  }

  // ================================================================
  // Analytics and Progress Tracking
  // ================================================================

  /**
   * Calculate project progress metrics
   */
  static async getProjectProgress(projectId: string): Promise<ProjectProgress> {
    try {
      const { data: projectRules, error } = await supabase
        .from('project_rules')
        .select(`
          *,
          rules (
            severity,
            estimated_hours
          )
        `)
        .eq('project_id', projectId);

      if (error) {
        compassLog('error', 'Error fetching project progress:', error);
        throw new Error(`Failed to fetch project progress: ${error.message}`);
      }

      const rules = projectRules || [];
      const totalItems = rules.length;
      const completedItems = rules.filter(pr => pr.is_completed).length;
      const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

      // Count by severity
      const criticalPending = rules.filter(pr => !pr.is_completed && pr.rules?.severity === 'critical').length;
      const highPending = rules.filter(pr => !pr.is_completed && pr.rules?.severity === 'high').length;
      const mediumPending = rules.filter(pr => !pr.is_completed && pr.rules?.severity === 'medium').length;
      const lowPending = rules.filter(pr => !pr.is_completed && pr.rules?.severity === 'low').length;

      // Calculate estimated hours
      const estimatedHoursTotal = rules.reduce((sum, pr) => sum + (pr.rules?.estimated_hours || 0), 0);
      const estimatedHoursCompleted = rules
        .filter(pr => pr.is_completed)
        .reduce((sum, pr) => sum + (pr.rules?.estimated_hours || 0), 0);

      return {
        project_id: projectId,
        total_items: totalItems,
        completed_items: completedItems,
        progress_percentage: progressPercentage,
        critical_pending: criticalPending,
        high_pending: highPending,
        medium_pending: mediumPending,
        low_pending: lowPending,
        estimated_hours_total: estimatedHoursTotal,
        estimated_hours_completed: estimatedHoursCompleted
      };
      
    } catch (err) {
      compassLog('error', 'Exception in getProjectProgress:', err);
      throw err;
    }
  }

  /**
   * Get overall compliance metrics for a user
   */
  static async getComplianceMetrics(userId: string): Promise<ComplianceMetrics> {
    try {
      compassLog('info', 'Calculating compliance metrics for user:', userId);
      
      const projects = await this.getUserProjects(userId);
      
      const totalProjects = projects.length;
      const activeProjects = projects.filter(p => p.status === 'active').length;
      const completedProjects = projects.filter(p => p.status === 'completed').length;
      
      const allProgress = projects.map(p => p.progress).filter(Boolean) as ProjectProgress[];
      const totalItems = allProgress.reduce((sum, p) => sum + p.total_items, 0);
      const completedItems = allProgress.reduce((sum, p) => sum + p.completed_items, 0);
      const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
      
      const criticalIssues = allProgress.reduce((sum, p) => sum + p.critical_pending, 0);
      const highPriorityIssues = allProgress.reduce((sum, p) => sum + p.high_pending, 0);
      
      // Calculate compliance score
      let complianceScore: 'low' | 'medium' | 'high';
      if (overallProgress >= 80 && criticalIssues === 0) {
        complianceScore = 'high';
      } else if (overallProgress >= 60 && criticalIssues <= 2) {
        complianceScore = 'medium';
      } else {
        complianceScore = 'low';
      }

      return {
        overall_progress: overallProgress,
        total_projects: totalProjects,
        active_projects: activeProjects,
        completed_projects: completedProjects,
        critical_issues: criticalIssues,
        high_priority_issues: highPriorityIssues,
        compliance_score: complianceScore,
        last_updated: new Date().toISOString()
      };
      
    } catch (err) {
      compassLog('error', 'Exception in getComplianceMetrics:', err);
      throw err;
    }
  }

  // ================================================================
  // Rule Engine and JsonLogic Utilities
  // ================================================================

  /**
   * Test JsonLogic condition against project configuration
   */
  static async testRuleCondition(condition: Record<string, any>, projectConfig: Record<string, any>): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('evaluate_jsonlogic', {
        data: projectConfig,
        logic: condition
      });

      if (error) {
        compassLog('error', 'Error testing rule condition:', error);
        throw new Error(`Failed to test rule condition: ${error.message}`);
      }

      return data || false;
      
    } catch (err) {
      compassLog('error', 'Exception in testRuleCondition:', err);
      throw err;
    }
  }

  // ================================================================
  // Search and Discovery
  // ================================================================

  /**
   * Search rules by text query
   */
  static async searchRules(query: string, language: 'en' | 'nl' = 'en'): Promise<Rule[]> {
    try {
      compassLog('info', 'Searching rules with query:', query);
      
      const searchColumn = language === 'nl' ? 'search_vector' : 'search_vector';
      
      const { data, error } = await supabase
        .from('rules')
        .select('*')
        .eq('is_active', true)
        .textSearch(searchColumn, query, {
          type: 'websearch',
          config: language === 'nl' ? 'dutch' : 'english'
        })
        .order('severity', { ascending: false })
        .limit(20);

      if (error) {
        compassLog('error', 'Error searching rules:', error);
        throw new Error(`Failed to search rules: ${error.message}`);
      }

      compassLog('info', `Found ${data?.length || 0} matching rules`);
      return data || [];
      
    } catch (err) {
      compassLog('error', 'Exception in searchRules:', err);
      throw err;
    }
  }

  /**
   * Get rule statistics and categories
   */
  static async getRuleStatistics(): Promise<{
    total_rules: number;
    rules_by_severity: Record<string, number>;
    rules_by_phase: Record<string, number>;
    rules_by_category: Record<string, number>;
    premium_rules: number;
  }> {
    try {
      const { data: rules, error } = await supabase
        .from('rules')
        .select('severity, phase, category, is_premium')
        .eq('is_active', true);

      if (error) {
        compassLog('error', 'Error fetching rule statistics:', error);
        throw new Error(`Failed to fetch rule statistics: ${error.message}`);
      }

      const totalRules = rules?.length || 0;
      const premiumRules = rules?.filter(r => r.is_premium).length || 0;

      const rulesBySeverity: Record<string, number> = {};
      const rulesByPhase: Record<string, number> = {};
      const rulesByCategory: Record<string, number> = {};

      rules?.forEach(rule => {
        rulesBySeverity[rule.severity] = (rulesBySeverity[rule.severity] || 0) + 1;
        rulesByPhase[rule.phase] = (rulesByPhase[rule.phase] || 0) + 1;
        rulesByCategory[rule.category] = (rulesByCategory[rule.category] || 0) + 1;
      });

      return {
        total_rules: totalRules,
        rules_by_severity: rulesBySeverity,
        rules_by_phase: rulesByPhase,
        rules_by_category: rulesByCategory,
        premium_rules: premiumRules
      };
      
    } catch (err) {
      compassLog('error', 'Exception in getRuleStatistics:', err);
      throw err;
    }
  }
}

// ====================================================================
// Export Default Instance
// ====================================================================

export default GDPRCompassV2; 