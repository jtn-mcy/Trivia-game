export type Score = {
  id: string;
  userName: string;
  score: number;
  date: string;
};

export type Scores = Score[];

export enum QuestionType {
  single = "single",
  multiple = "multiple",
};

export enum QuestionCategory {
  math = "math",
  sports = "sports",
  science = "science",
  potpourri = "potpourri"
};

export type Question = {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  question: string;
  answers: string[];
  correct_answer: string | string[];
  value: number;
};