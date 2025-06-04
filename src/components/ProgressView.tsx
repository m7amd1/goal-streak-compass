
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGoals } from '@/hooks/useGoals';
import { useCheckins } from '@/hooks/useCheckins';
import { Target, Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface ProgressViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgressView({ open, onOpenChange }: ProgressViewProps) {
  const { goals } = useGoals();
  const { checkins, getGoalProgress } = useCheckins();

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  
  const totalCheckins = checkins.length;
  const thisWeekCheckins = checkins.filter(c => {
    const checkDate = new Date(c.check_date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return checkDate >= weekAgo;
  }).length;

  const progressCheckins = checkins.filter(c => c.made_progress).length;
  const overallProgress = totalCheckins > 0 ? Math.round((progressCheckins / totalCheckins) * 100) : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Overview
          </SheetTitle>
          <SheetDescription>
            Track your journey and celebrate your achievements
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{overallProgress}%</div>
                <Progress value={overallProgress} className="mt-2 h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{thisWeekCheckins}</div>
                <p className="text-xs text-muted-foreground">Check-ins</p>
              </CardContent>
            </Card>
          </div>

          {/* Goal Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Goals by Status</h3>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Active Goals</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                  {activeGoals.length}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-900 dark:text-green-100">Completed</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                  {completedGoals.length}
                </Badge>
              </div>
            </div>
          </div>

          {/* Individual Goal Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Individual Progress</h3>
            
            <div className="space-y-3">
              {activeGoals.map((goal) => {
                const progress = getGoalProgress(goal.id);
                const daysLeft = goal.deadline ? differenceInDays(new Date(goal.deadline), new Date()) : null;
                
                return (
                  <Card key={goal.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{goal.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {goal.category && (
                              <Badge variant="outline" className="text-xs">
                                {goal.category}
                              </Badge>
                            )}
                            {daysLeft !== null && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {daysLeft > 0 ? `${daysLeft} days left` : 
                                   daysLeft === 0 ? 'Due today' : 
                                   `${Math.abs(daysLeft)} days overdue`}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-foreground">{progress}%</div>
                      </div>
                      
                      <Progress value={progress} className="h-2" />
                      
                      {goal.deadline && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {format(new Date(goal.deadline), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
              
              {activeGoals.length === 0 && (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No active goals to track</p>
                  <p className="text-sm text-muted-foreground">Create a goal to start tracking your progress</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
