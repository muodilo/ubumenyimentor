// User Types
export type UserRole = 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  joinedDate: Date;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: User;
  thumbnail?: string;
  price: number;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  rating: number;
  studentCount: number;
  createdAt: Date;
  updatedAt: Date;
  modules: Module[];
  isPublished: boolean;
  isDraft: boolean;
  totalRevenue?: number;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  moduleQuiz?: ModuleQuiz;
  estimatedDuration: number; // in minutes
}

export interface ModuleQuiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number; // 0-100 percentage
  maxAttempts: number;
  isRequired: boolean;
  timeLimit?: number; // in minutes
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  order: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  videoDuration: number; // in seconds
  thumbnailUrl?: string;
  subtitlesUrl?: string;
  order: number;
}

// Video Progress Types
export interface VideoProgress {
  lessonId: string;
  enrollmentId: string;
  watchedDuration: number; // in seconds
  watchPercentage: number; // 0-100
  isCompleted: boolean;
  completedAt?: Date;
  lastWatchedAt: Date;
}

// Lesson Progress Types
export interface LessonProgress {
  lessonId: string;
  enrollmentId: string;
  status: 'LOCKED' | 'IN_PROGRESS' | 'COMPLETED';
  watchedDuration: number; // in seconds
  watchPercentage: number; // 0-100
  isCompleted: boolean;
  completedAt?: Date;
  lastWatchedAt: Date;
}

// Module Progress Types
export interface ModuleProgress {
  moduleId: string;
  enrollmentId: string;
  status: 'LOCKED' | 'IN_PROGRESS' | 'COMPLETED';
  lessonCompletionPercentage: number; // 0-100
  quizAttempted: boolean;
  quizPassed?: boolean;
  quizScore?: number;
  completedAt?: Date;
}

// Quiz Attempt Types
export interface QuizAttempt {
  id: string;
  quizId: string;
  enrollmentId: string;
  answers: Map<string, string>; // questionId -> selectedOptionId
  score: number; // 0-100
  passed: boolean;
  attemptNumber: number;
  timeTaken: number; // in seconds
  startedAt: Date;
  completedAt: Date;
}

// Enrollment Types
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date;
  courseProgress: number; // 0-100, based on lessons watched
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  isPaid: boolean;
  videoProgress: VideoProgress[];
  lessonProgress: LessonProgress[];
  moduleProgress: ModuleProgress[];
  quizAttempts: QuizAttempt[];
}

// Payment Types
export interface Payment {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  transactionId: string;
  createdAt: Date;
  completedAt?: Date;
}

// Teacher Subscription Types
export interface TeacherSubscription {
  id: string;
  teacherId: string;
  planType: 'FREE' | 'BASIC' | 'PREMIUM';
  monthlyFee: number; // Calculated based on courses and enrollments
  coursesCount: number;
  totalEnrollments: number;
  isActive: boolean;
  startDate: Date;
  renewalDate: Date;
  calculatedAt: Date;
}

// Quiz Types
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // in minutes
  createdAt: Date;
}

export interface Question {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  studentId: string;
  answers: number[]; // indices of selected answers
  score: number;
  passed: boolean;
  submittedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  isEdited: boolean;
}

export interface MessageThread {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  messages: Message[];
  participants: string[];
  lastMessageAt: Date;
}

// Analytics Types
export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  completedEnrollments: number;
  averageRating: number;
  revenue: number;
  enrollmentTrend: EnrollmentData[];
  topPerformers: StudentPerformance[];
}

export interface EnrollmentData {
  date: string;
  enrollments: number;
}

export interface StudentPerformance {
  studentId: string;
  studentName: string;
  completionRate: number;
  averageQuizScore: number;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  courseLimit: number;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate?: Date;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

// Teacher Balance & Earnings Types
export interface TeacherBalance {
  teacherId: string;
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  withdrawnAmount: number;
  lastUpdated: Date;
}

export interface Withdrawal {
  id: string;
  teacherId: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  paymentMethod: 'BANK_TRANSFER' | 'PAYPAL';
  fee: number;
  netAmount: number;
  transactionId?: string;
  requestedAt: Date;
  processedAt?: Date;
  failureReason?: string;
  bankAccount?: {
    accountName: string;
    accountNumber: string;
    routingNumber: string;
  };
  paypalEmail?: string;
}

export interface CourseEarnings {
  courseId: string;
  courseName: string;
  totalRevenue: number;
  enrollmentCount: number;
  averagePrice: number;
  lastMonthRevenue: number;
}
