export type CourseCategory = "YouTube" | "Bande Dessinée" | "WordPress" | "Animation" | "E-Commerce" | "Design" | "Marketing";

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  price: number;
  currency: "EUR" | "XAF" | "USD";
  thumbnailUrl: string;
  durationSeconds: number;
  lessonsCount: number;
  published: boolean;
  instructorName: string;
  isFree?: boolean;
};

export type Lesson = {
  id: string;
  slug: string;
  courseId: string;
  moduleId: string;
  title: string;
  durationSeconds: number;
  isFree: boolean;
  videoUrl?: string;
  order: number;
  completed?: boolean;
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

export type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  progressPercentage: number;
  currentLessonId?: string;
  completedAt?: string;
  createdAt: string;
};
