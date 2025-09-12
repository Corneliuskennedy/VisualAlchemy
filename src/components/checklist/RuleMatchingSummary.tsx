import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Target,
  Users,
  Shield,
  Zap,
  BookOpen,
  BarChart3
} from 'lucide-react';

interface Rule {
  id: string;
  title_en: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  phase: 'planning' | 'implementation' | 'operation' | 'maintenance';
  category: string;
  estimated_hours: number;
  complexity_score: number;
}

interface ProjectRule {
  id: string;
  rule_id: string;
  compliance_status: 'pending' | 'in_progress' | 'completed' | 'not_applicable' | 'deferred';
  matched_at: string;
  rules?: Rule;
}

interface RuleMatchingSummaryProps {
  projectRules: ProjectRule[];
  projectConfig: any;
  onRuleSelect?: (ruleId: string) => void;
  className?: string;
}

type SortOption = 'severity' | 'phase' | 'hours' | 'complexity' | 'matched_date';
type FilterOption = 'all' | 'critical' | 'high' | 'medium' | 'low' | 'planning' | 'implementation' | 'operation' | 'maintenance';

const RuleMatchingSummary: React.FC<RuleMatchingSummaryProps> = ({
  projectRules,
  projectConfig,
  onRuleSelect,
  className = ''
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('severity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Calculate statistics
  const stats = useMemo(() => {
    const total = projectRules.length;
    const bySeverity = {
      critical: projectRules.filter(pr => pr.rules?.severity === 'critical').length,
      high: projectRules.filter(pr => pr.rules?.severity === 'high').length,
      medium: projectRules.filter(pr => pr.rules?.severity === 'medium').length,
      low: projectRules.filter(pr => pr.rules?.severity === 'low').length
    };
    
    const byPhase = {
      planning: projectRules.filter(pr => pr.rules?.phase === 'planning').length,
      implementation: projectRules.filter(pr => pr.rules?.phase === 'implementation').length,
      operation: projectRules.filter(pr => pr.rules?.phase === 'operation').length,
      maintenance: projectRules.filter(pr => pr.rules?.phase === 'maintenance').length
    };

    const byStatus = {
      pending: projectRules.filter(pr => pr.compliance_status === 'pending').length,
      in_progress: projectRules.filter(pr => pr.compliance_status === 'in_progress').length,
      completed: projectRules.filter(pr => pr.compliance_status === 'completed').length,
      not_applicable: projectRules.filter(pr => pr.compliance_status === 'not_applicable').length,
      deferred: projectRules.filter(pr => pr.compliance_status === 'deferred').length
    };

    const totalHours = projectRules.reduce((sum, pr) => sum + (pr.rules?.estimated_hours || 0), 0);
    const avgComplexity = projectRules.length > 0 
      ? projectRules.reduce((sum, pr) => sum + (pr.rules?.complexity_score || 0), 0) / projectRules.length
      : 0;

    const completionRate = total > 0 ? (byStatus.completed / total) * 100 : 0;

    return {
      total,
      bySeverity,
      byPhase,
      byStatus,
      totalHours,
      avgComplexity: Math.round(avgComplexity * 10) / 10,
      completionRate: Math.round(completionRate)
    };
  }, [projectRules]);

  // Filter and sort rules
  const filteredAndSortedRules = useMemo(() => {
    const filtered = projectRules.filter(pr => {
      if (!pr.rules) return false;
      
      if (filterBy === 'all') return true;
      if (['critical', 'high', 'medium', 'low'].includes(filterBy)) {
        return pr.rules.severity === filterBy;
      }
      if (['planning', 'implementation', 'operation', 'maintenance'].includes(filterBy)) {
        return pr.rules.phase === filterBy;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (!a.rules || !b.rules) return 0;

      let comparison = 0;
      switch (sortBy) {
        case 'severity':
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          comparison = severityOrder[a.rules.severity] - severityOrder[b.rules.severity];
          break;
        case 'phase':
          const phaseOrder = { planning: 1, implementation: 2, operation: 3, maintenance: 4 };
          comparison = phaseOrder[a.rules.phase] - phaseOrder[b.rules.phase];
          break;
        case 'hours':
          comparison = a.rules.estimated_hours - b.rules.estimated_hours;
          break;
        case 'complexity':
          comparison = a.rules.complexity_score - b.rules.complexity_score;
          break;
        case 'matched_date':
          comparison = new Date(a.matched_at).getTime() - new Date(b.matched_at).getTime();
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [projectRules, sortBy, sortOrder, filterBy]);

  const getSeverityConfig = (severity: Rule['severity']) => {
    switch (severity) {
      case 'critical':
        return { color: 'text-red-400', bgColor: 'bg-red-900/20', label: 'Critical' };
      case 'high':
        return { color: 'text-orange-400', bgColor: 'bg-orange-900/20', label: 'High' };
      case 'medium':
        return { color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', label: 'Medium' };
      case 'low':
        return { color: 'text-blue-400', bgColor: 'bg-blue-900/20', label: 'Low' };
    }
  };

  const getPhaseConfig = (phase: Rule['phase']) => {
    switch (phase) {
      case 'planning':
        return { icon: <Target className="w-4 h-4" />, label: 'Planning', color: 'text-blue-400' };
      case 'implementation':
        return { icon: <Users className="w-4 h-4" />, label: 'Implementation', color: 'text-green-400' };
      case 'operation':
        return { icon: <Shield className="w-4 h-4" />, label: 'Operation', color: 'text-purple-400' };
      case 'maintenance':
        return { icon: <Clock className="w-4 h-4" />, label: 'Maintenance', color: 'text-gray-400' };
    }
  };

  const getStatusConfig = (status: ProjectRule['compliance_status']) => {
    switch (status) {
      case 'completed':
        return { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Completed', color: 'text-green-400' };
      case 'in_progress':
        return { icon: <Clock className="w-4 h-4" />, label: 'In Progress', color: 'text-blue-400' };
      case 'pending':
        return { icon: <AlertTriangle className="w-4 h-4" />, label: 'Pending', color: 'text-yellow-400' };
      case 'deferred':
        return { icon: <Clock className="w-4 h-4" />, label: 'Deferred', color: 'text-gray-400' };
      case 'not_applicable':
        return { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Not Applicable', color: 'text-gray-400' };
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistics Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Rule Matching Summary
          </CardTitle>
          <CardDescription className="text-gray-400">
            {stats.total} GDPR rules matched your project configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{stats.total}</div>
              <p className="text-sm text-gray-400">Total Rules</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{stats.bySeverity.critical}</div>
              <p className="text-sm text-gray-400">Critical</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{stats.totalHours}h</div>
              <p className="text-sm text-gray-400">Est. Hours</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{stats.completionRate}%</div>
              <p className="text-sm text-gray-400">Complete</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Compliance Progress</span>
              <span className="text-sm text-gray-400">
                {stats.byStatus.completed}/{stats.total} completed
              </span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
          </div>

          {/* Severity Distribution */}
          <div className="grid grid-cols-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-400">{stats.bySeverity.critical} Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-400">{stats.bySeverity.high} High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-400">{stats.bySeverity.medium} Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-400">{stats.bySeverity.low} Low</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sorting */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Rules</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="planning">Planning Phase</SelectItem>
                  <SelectItem value="implementation">Implementation</SelectItem>
                  <SelectItem value="operation">Operation</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="severity">Severity</SelectItem>
                  <SelectItem value="phase">Phase</SelectItem>
                  <SelectItem value="hours">Est. Hours</SelectItem>
                  <SelectItem value="complexity">Complexity</SelectItem>
                  <SelectItem value="matched_date">Match Date</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-gray-800 border-gray-600 text-gray-300"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>

            <div className="text-sm text-gray-400 flex items-center">
              Showing {filteredAndSortedRules.length} of {stats.total} rules
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules List */}
      <div className="space-y-3">
        {filteredAndSortedRules.map((projectRule) => {
          const rule = projectRule.rules!;
          const severityConfig = getSeverityConfig(rule.severity);
          const phaseConfig = getPhaseConfig(rule.phase);
          const statusConfig = getStatusConfig(projectRule.compliance_status);

          return (
            <Card 
              key={projectRule.id} 
              className="bg-gray-900 border-gray-800 cursor-pointer hover:border-green-500/50 transition-all duration-200"
              onClick={() => onRuleSelect?.(rule.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-white">{rule.title_en}</h3>
                      <Badge variant="outline" className={`${severityConfig.color} border-current`}>
                        {severityConfig.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className={phaseConfig.color}>{phaseConfig.icon}</span>
                        <span>{phaseConfig.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>~{rule.estimated_hours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Complexity: {rule.complexity_score}/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${statusConfig.color} border-current`}>
                      {statusConfig.icon}
                      <span className="ml-1">{statusConfig.label}</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAndSortedRules.length === 0 && (
        <Alert className="bg-gray-800 border-gray-700">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-gray-300">
            No rules match the current filter criteria. Try adjusting your filters.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RuleMatchingSummary; 