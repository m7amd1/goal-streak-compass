
import { Goal } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Edit, Trash2, Calendar, CheckCircle, Target } from 'lucide-react';
import { useCheckins } from '@/hooks/useCheckins';
import { CheckinDialog } from '@/components/CheckinDialog';
import { useState } from 'react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const { getGoalProgress } = useCheckins();
  const [showCheckin, setShowCheckin] = useState(false);
  const progressPercentage = getGoalProgress(goal.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400';
      case 'missed':
        return 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400';
      default:
        return 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400';
    }
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    
    const colors = {
      health: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      career: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      education: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      personal: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      finance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      relationships: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      hobbies: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    };
    
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = goal.deadline && new Date(goal.deadline) < new Date() && goal.status === 'active';

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {goal.title}
              </h3>
              {goal.description && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {goal.description}
                </p>
              )}
              
              <div className="flex items-center flex-wrap gap-2">
                {goal.category && (
                  <Badge variant="secondary" className={`text-xs px-2 py-1 ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </Badge>
                )}
                <Badge variant="outline" className={`text-xs px-2 py-1 ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </Badge>
                {goal.deadline && (
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    isOverdue 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(goal.deadline)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(goal)}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(goal.id)}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Target className="h-4 w-4" />
                Progress
              </span>
              <span className="text-sm font-medium text-foreground">{progressPercentage}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-muted" 
            />
          </div>
        </CardContent>

        <CardFooter className="pt-3">
          <Button
            onClick={() => setShowCheckin(true)}
            variant="outline"
            size="sm"
            className="w-full bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30"
            disabled={goal.status === 'completed'}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Check In
          </Button>
        </CardFooter>
      </Card>

      <CheckinDialog
        open={showCheckin}
        onOpenChange={setShowCheckin}
        goalId={goal.id}
        goalTitle={goal.title}
      />
    </>
  );
}
