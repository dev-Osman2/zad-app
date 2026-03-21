export interface Section {
  id: string;
  title: string;
  type?: string;
  content?: string;
  matn?: string;
  fawaid?: string[];
  sharh?: string;
  desc?: string;
  bookLink?: string;
  videoLink?: string;
}

export interface CourseInfo {
  title: string;
  desc: string;
  bookLink?: string;
  videoLink?: string;
}

export interface CourseData {
  info: CourseInfo;
  content: Section[];
}

export interface ExamQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamData {
  title: string;
  desc?: string;
  duration?: number;
  questions: ExamQuestion[];
}
