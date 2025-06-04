
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GoalCard } from '@/components/GoalCard';
import { GoalForm } from '@/components/GoalForm';
import { EditGoalDialog } from '@/components/EditGoalDialog';
import { DeleteGoalDialog } from '@/components/DeleteGoalDialog';
import { ProgressView } from '@/components/ProgressView';
import { useGoals } from '@/hooks/useGoals';
import { useCheckins } from '@/hooks/useCheckins';
import { Plus, Target, TrendingUp, Calendar, Zap } from 'lucide-react';
import { Goal } from '@/types/database';

const Dashboard = () => {
  const { goals, loading, deleteGoal } = useGoals();
  const { checkins } = useCheckins();
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);
  const [showProgressView, setShowProgressView] = useState(false);

  const handleDeleteGoal = async (id: string) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      setDeletingGoal(goal);
    }
  };

  const confirmDeleteGoal = async () => {
    if (deletingGoal) {
      await deleteGoal(deletingGoal.id);
      setDeletingGoal(null);
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
  };

  // Calculate stats
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const totalCheckins = checkins.length;
  const recentCheckins = checkins.filter(c => {
    const checkDate = new Date(c.check_date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return checkDate >= weekAgo;
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Your Goals
            </h1>
            <p className="text-muted-foreground text-lg">Track your progress and stay motivated on your journey</p>
          </div>
          <GoalForm />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-card/60 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{activeGoals}</div>
                <div className="text-sm text-muted-foreground">Active Goals</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{completedGoals}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{totalCheckins}</div>
                <div className="text-sm text-muted-foreground">Total Check-ins</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{recentCheckins}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        {goals.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-6">
              <Plus className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Ready to Achieve Your Goals?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your journey by creating your first goal. Set clear objectives, track your progress, and celebrate your wins.
            </p>
            <GoalForm 
              trigger={
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Goal
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Your Goals</h2>
              <p className="text-sm text-muted-foreground">
                {goals.length} goal{goals.length !== 1 ? 's' : ''} total
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEditGoal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          </>
        )}

        {/* Ready to Achieve Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-2xl p-8 sm:p-12 border border-primary/20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Ready to Achieve Your Goals?
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Set clear objectives, track your daily progress, and turn your dreams into achievements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GoalForm 
                  trigger={
                    <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Goal
                    </Button>
                  }
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/20 hover:bg-primary/5"
                  onClick={() => setShowProgressView(true)}
                >
                  <Target className="h-5 w-5 mr-2" />
                  View Progress
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditGoalDialog
        open={!!editingGoal}
        onOpenChange={(open) => !open && setEditingGoal(null)}
        goal={editingGoal}
      />

      <DeleteGoalDialog
        open={!!deletingGoal}
        onOpenChange={(open) => !open && setDeletingGoal(null)}
        goal={deletingGoal}
        onConfirm={confirmDeleteGoal}
      />

      <ProgressView
        open={showProgressView}
        onOpenChange={setShowProgressView}
      />
    </div>
  );
};

export default Dashboard;
