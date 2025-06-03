
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGoals } from '@/hooks/useGoals';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface GoalFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function GoalForm({ trigger, onSuccess }: GoalFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createGoal } = useGoals();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a goal title.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const goalData = {
        title: title.trim(),
        description: description.trim() || undefined,
        category: category || undefined,
        deadline: deadline || undefined,
        status: 'active' as const,
      };

      const result = await createGoal(goalData);
      
      if (result) {
        toast({
          title: "Success",
          description: "Goal created successfully!",
        });
        
        // Reset form
        setTitle('');
        setDescription('');
        setCategory('');
        setDeadline('');
        setOpen(false);
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to create goal. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="flex items-center space-x-2">
      <Plus className="h-4 w-4" />
      <span>Add Goal</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your goal title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your goal (optional)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health & Fitness</SelectItem>
                <SelectItem value="career">Career</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="personal">Personal Development</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="relationships">Relationships</SelectItem>
                <SelectItem value="hobbies">Hobbies</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
