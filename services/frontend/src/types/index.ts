export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher";
}

export interface ModuleProgress {
  module: number;
  name: string;
  mastery: number;
  exercisesCompleted: number;
  quizScore: number;
  codeQuality: number;
  streak: number;
}

export type MasteryLevel = "beginner" | "learning" | "proficient" | "mastered";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  agent?: string;
  timestamp?: string;
}

export interface CodeSubmission {
  code: string;
  output?: string;
  isCorrect: boolean;
}

export interface StruggleAlert {
  studentId: string;
  studentName: string;
  trigger: string;
  topic: string;
  timestamp: string;
  resolved: boolean;
}

export interface Exercise {
  id: string;
  module: number;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  solution?: string;
}
