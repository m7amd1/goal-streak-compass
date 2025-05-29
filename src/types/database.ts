
export type GoalStatus = 'active' | 'completed' | 'missed';
export type CheckinMood = 'happy' | 'meh' | 'sad';

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category?: string;
  deadline?: string;
  status: GoalStatus;
  created_at: string;
  updated_at: string;
}

export interface Checkin {
  id: string;
  goal_id: string;
  user_id: string;
  check_date: string;
  made_progress: boolean;
  mood: CheckinMood;
  note?: string;
  created_at: string;
}
