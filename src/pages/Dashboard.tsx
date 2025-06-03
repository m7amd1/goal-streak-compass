
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GoalCard } from '@/components/GoalCard';
import { GoalForm } from '@/components/GoalForm';
import { useGoals } from '@/hooks/useGoals';
import { Plus } from 'lucide-react';
import { Goal } from '@/types/database';

const Dashboard = () => {
  const { goals, loading, deleteGoal } = useGoals();
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleDeleteGoal = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Goals</h2>
            <p className="text-muted-foreground">Track your progress and stay motivated</p>
          </div>
          <GoalForm />
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No goals yet</h3>
            <p className="text-muted-foreground mb-4">Start your journey by creating your first goal</p>
            <GoalForm 
              trigger={
                <Button size="lg">Create Your First Goal</Button>
              }
            />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={setEditingGoal}
                onDelete={handleDeleteGoal}
                progressPercentage={Math.floor(Math.random() * 100)} // TODO: Calculate actual progress
              />
            ))}
          </div>
        )}

        {/* Stats Overview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-primary">{goals.filter(g => g.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground">Active Goals</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{goals.filter(g => g.status === 'completed').length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">{goals.length}</div>
            <div className="text-sm text-muted-foreground">Total Goals</div>
          </div>
          <div className="bg-card rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
