
import { Goal } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Edit, Trash2, Calendar } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  progressPercentage?: number;
}

export function GoalCard({ goal, onEdit, onDelete, progressPercentage = 0 }: GoalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'missed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
          {goal.description && (
            <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {goal.category && (
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {goal.category}
              </span>
            )}
            {goal.deadline && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(goal.deadline)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
            {goal.status}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(goal)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(goal.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
}
