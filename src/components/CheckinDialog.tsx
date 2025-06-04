
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useCheckins } from '@/hooks/useCheckins';
import { useToast } from '@/hooks/use-toast';
import { CheckinMood } from '@/types/database';
import { Smile, Meh, Frown } from 'lucide-react';

interface CheckinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalId: string;
  goalTitle: string;
}

export function CheckinDialog({ open, onOpenChange, goalId, goalTitle }: CheckinDialogProps) {
  const [madeProgress, setMadeProgress] = useState(false);
  const [mood, setMood] = useState<CheckinMood>('meh');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createCheckin } = useCheckins();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const result = await createCheckin({
        goal_id: goalId,
        check_date: new Date().toISOString().split('T')[0],
        made_progress: madeProgress,
        mood,
        note: note.trim() || undefined,
      });
      
      if (result) {
        toast({
          title: "Check-in saved!",
          description: "Your progress has been recorded.",
        });
        
        // Reset form
        setMadeProgress(false);
        setMood('meh');
        setNote('');
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to save check-in. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating checkin:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const moodOptions = [
    { value: 'happy' as CheckinMood, icon: Smile, label: 'Happy', color: 'text-green-500' },
    { value: 'meh' as CheckinMood, icon: Meh, label: 'Okay', color: 'text-yellow-500' },
    { value: 'sad' as CheckinMood, icon: Frown, label: 'Struggling', color: 'text-red-500' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Check-in for "{goalTitle}"</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Did you make progress today?</Label>
            <div className="flex items-center space-x-3">
              <Switch
                id="progress"
                checked={madeProgress}
                onCheckedChange={setMadeProgress}
              />
              <Label htmlFor="progress" className="text-sm">
                {madeProgress ? 'Yes, I made progress!' : 'No progress today'}
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">How are you feeling?</Label>
            <div className="grid grid-cols-3 gap-2">
              {moodOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.value}
                    type="button"
                    variant={mood === option.value ? "default" : "outline"}
                    className="flex flex-col items-center gap-2 h-16"
                    onClick={() => setMood(option.value)}
                  >
                    <Icon className={`h-5 w-5 ${mood === option.value ? 'text-primary-foreground' : option.color}`} />
                    <span className="text-xs">{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Notes (optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How did it go? Any challenges or wins?"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Check-in'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
