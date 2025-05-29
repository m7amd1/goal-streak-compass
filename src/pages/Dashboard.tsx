
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GoalCard } from '@/components/GoalCard';
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Goals</h2>
          <p className="text-gray-600">Track your progress and stay motivated</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-4">Start your journey by creating your first goal</p>
          <Button>Create Your First Goal</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-2xl font-bold text-blue-600">{goals.filter(g => g.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Active Goals</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-2xl font-bold text-green-600">{goals.filter(g => g.status === 'completed').length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-2xl font-bold text-orange-600">{goals.length}</div>
          <div className="text-sm text-gray-600">Total Goals</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-2xl font-bold text-purple-600">0</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
