import { z } from 'zod';

// Lesson Schema
export const LessonSchema = z.object({
  id: z.string().optional(),
  moduleId: z.string(),
  title: z.string().min(1, 'Lesson title is required').min(3, 'Title must be at least 3 characters'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  content: z.string().min(1, 'Content is required'),
  videoUrl: z.string().url('Must be a valid URL'),
  videoDuration: z.number().positive('Duration must be positive'),
  thumbnailUrl: z.string().optional(),
  subtitlesUrl: z.string().optional(),
  order: z.number().positive(),
});

export type Lesson = z.infer<typeof LessonSchema>;

// Module Schema
export const ModuleSchema = z.object({
  id: z.string().optional(),
  courseId: z.string().optional(),
  title: z.string().min(1, 'Module title is required').min(3, 'Title must be at least 3 characters'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  order: z.number().positive(),
  estimatedDuration: z.number().positive('Duration must be positive'),
  lessons: z.array(LessonSchema).min(1, 'Each module must have at least one lesson'),
});

export type Module = z.infer<typeof ModuleSchema>;

// Course Form Schema
export const CourseFormSchema = z.object({
  // Basic Info Tab
  title: z
    .string()
    .min(1, 'Course title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  thumbnail: z.string().url('Must be a valid image URL').optional(),
  price: z
    .number()
    .positive('Price must be greater than 0')
    .min(0.99, 'Price must be at least $0.99'),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
    errorMap: () => ({ message: 'Please select a valid level' }),
  }),
  
  // Content Tab
  modules: z
    .array(ModuleSchema)
    .min(1, 'Course must have at least one module'),
});

export type CourseFormData = z.infer<typeof CourseFormSchema>;

// Extended Course Type for submission
export interface CourseSubmission extends CourseFormData {
  id: string;
  instructor: any; // Will be set from current user
  rating: number;
  studentCount: number;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  isDraft: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  totalRevenue: number;
}
