'use client';

import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Tabs from '@radix-ui/react-tabs';
import { CourseFormSchema, CourseFormData, CourseSubmission } from '@/lib/course-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { nanoid } from 'nanoid';

const COURSE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Business',
  'Marketing',
  'Photography',
  'Music',
  'Other',
];

const COURSE_LEVELS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ label, required, error, children }: FormFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-muted-foreground mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = React.forwardRef<
  HTMLSelectElement,
  {
    options: Array<{ value: string; label: string }>;
  } & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ options, ...props }, ref) => (
  <select
    ref={ref}
    className="w-full  border border-gray-700 rounded px-3 py-2  focus:outline-none focus:border-[#ff7500]"
    {...props}
  >
    <option value="">Select an option</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
));
SelectField.displayName = 'SelectField';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full  border border-gray-700 rounded px-3 py-2  focus:outline-none focus:border-[#ff7500] resize-none ${className}`}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export function AddCourseForm({
  onSubmit,
}: {
  onSubmit: (data: CourseSubmission) => Promise<void>;
}) {
  const [activeStep, setActiveStep] = useState<'basic' | 'content' | 'settings'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    control,
    setValue,
    getValues,
  } = useForm<CourseFormData>({
    resolver: zodResolver(CourseFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      price: 49.99,
      category: '',
      level: 'BEGINNER',
      modules: [],
    },
  });

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control,
    name: 'modules',
  });

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setThumbnailPreview(dataUrl);
        setValue('thumbnail', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddModule = () => {
    const newModule = {
      id: nanoid(),
      title: '',
      description: '',
      order: moduleFields.length + 1,
      estimatedDuration: 0,
      lessons: [
        {
          id: nanoid(),
          moduleId: '',
          title: '',
          description: '',
          content: '',
          videoUrl: '',
          videoDuration: 0,
          order: 1,
        },
      ],
    };
    appendModule(newModule as any);
  };

  const handleAddLesson = (moduleIndex: number) => {
    const currentModules = getValues('modules');
    const lessons = currentModules[moduleIndex]?.lessons || [];

    const updatedModules = [...currentModules];
    updatedModules[moduleIndex].lessons.push({
      id: nanoid(),
      moduleId: currentModules[moduleIndex].id || '',
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      videoDuration: 0,
      order: lessons.length + 1,
    } as any);
    setValue('modules', updatedModules);
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    const currentModules = getValues('modules');
    const updatedModules = [...currentModules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setValue('modules', updatedModules);
  };

  const validateCurrentStep = async () => {
    if (activeStep === 'basic') {
      return await trigger(['title', 'description', 'thumbnail', 'price', 'category', 'level']);
    }

    if (activeStep === 'content') {
      return await trigger(['modules']);
    }

    return true;
  };

  const handleFormSubmit = async (data: CourseFormData) => {
    try {
      setIsSubmitting(true);

      const submission: CourseSubmission = {
        ...data,
        id: nanoid(),
        instructor: {
          id: '1',
          name: 'Current User',
          email: 'user@example.com',
          role: 'TEACHER',
          joinedDate: new Date(),
        },
        rating: 0,
        studentCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: false,
        isDraft: true,
        status: 'DRAFT',
        totalRevenue: 0,
      };

      await onSubmit(submission);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto  rounded-lg  p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-muted-foreground">Set up a new course with basic information, pricing, and content</p>
      </div>

      <div className="flex gap-3 mb-6">
        {['basic', 'content', 'settings'].map((step) => {
          const s = step as 'basic' | 'content' | 'settings';
          return (
            <button
              key={s}
              type="button"
              onClick={() => setActiveStep(s)}
              className={`px-4 py-2 rounded-md border ${
                activeStep === s
                  ? 'bg-[#ff7500] text-white border-[#ff7500]'
                  : 'bg-[#1f1f2e] text-white border-gray-700'
              }`}
            >
              {s === 'basic' ? 'Basic Info' : s === 'content' ? 'Content' : 'Settings'}
            </button>
          )
        })}
      </div>

        {activeStep === 'basic' && (
          <div className="space-y-6">
            {/* Course Title */}
          <FormField
            label="Course Title"
            required
            error={errors.title?.message}
          >
            <Input
              {...register('title')}
              placeholder="E.g., Forex trading"
              maxLength={100}
              className=" border-gray-700  placeholder-gray-500 focus:outline-none focus:border-[#ff7500]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {watch('title')?.length || 0}/100 characters
            </p>
          </FormField>

          {/* Description */}
          <FormField
            label="Description"
            required
            error={errors.description?.message}
          >
            <Textarea
              {...register('description')}
              placeholder="Describe what students will learn in this course..."
              maxLength={1000}
              rows={5}
              className=" border-gray-700  placeholder-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {watch('description')?.length || 0}/1000 characters
            </p>
          </FormField>

          {/* Course Thumbnail */}
          <FormField label="Course Thumbnail" error={errors.thumbnail?.message}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-[#ff7500] transition-colors"
            >
              {thumbnailPreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="max-w-xs max-h-48 mb-4 rounded"
                  />
                  <p className="text-sm text-gray-400">Click to change</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-500 mb-3" />
                  <p className="text-white font-medium">Click to upload thumbnail</p>
                  <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </FormField>

          {/* Price, Category, Level */}
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Price" required error={errors.price?.message}>
              <div className="flex items-center">
                <span className="text-white mr-2">$</span>
                <Input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0.99"
                  className=" border-gray-700  flex-1"
                />
              </div>
            </FormField>

            <FormField label="Category" required error={errors.category?.message}>
              <SelectField
                {...register('category')}
                options={COURSE_CATEGORIES.map((cat) => ({
                  value: cat,
                  label: cat,
                }))}
              />
            </FormField>

            <FormField label="Level" required error={errors.level?.message}>
              <SelectField {...register('level')} options={COURSE_LEVELS} />
            </FormField>
          </div>
          </div>
        )}

        {activeStep === 'content' && (
          <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Structure</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Organize your course into modules, lessons, and quizzes. Students must complete lessons sequentially.
            </p>

            {moduleFields.length === 0 ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
                <div className="text-muted-foreground mb-4">
                  <p className="text-lg font-medium mb-2">No modules yet</p>
                  <p className="text-sm">Create your first module to get started</p>
                </div>
                <Button
                  type="button"
                  onClick={handleAddModule}
                  className="bg-[#ff7500] hover:bg-[#ff7500]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Module
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {moduleFields.map((module, moduleIndex) => (
                  <div
                    key={module.id}
                    className="border border-gray-700 rounded-lg p-6 "
                  >
                    <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                        <label className="block text-muted-foreground text-sm font-medium  mb-2">
                          Module {moduleIndex + 1} Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                          {...register(`modules.${moduleIndex}.title` as const)}
                          placeholder="E.g., Getting Charts"
                          className=" border-gray-700 "
                        />
                        {errors.modules?.[moduleIndex]?.title && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.modules[moduleIndex]?.title?.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeModule(moduleIndex)}
                        className="ml-4 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-muted-foreground text-sm font-medium  mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          {...register(`modules.${moduleIndex}.description` as const)}
                          placeholder="Describe this module"
                          rows={3}
                          className=" border-gray-700 "
                        />
                      </div>
                      <div>
                        <label className="block text-muted-foreground text-sm font-medium  mb-2">
                          Estimated Duration (minutes) <span className="text-red-500">*</span>
                        </label>
                        <Input
                          {...register(`modules.${moduleIndex}.estimatedDuration` as const, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          placeholder="0"
                          min="0"
                          className=" border-gray-700 "
                        />
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium  mb-3">Lessons</h4>
                      <div className="space-y-3">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className=" p-3 rounded border border-gray-700"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <Input
                                    {...register(
                                      `modules.${moduleIndex}.lessons.${lessonIndex}.title` as const
                                    )}
                                    placeholder="Lesson title"
                                    className=" border-gray-700  text-xs"
                                  />
                                  <Input
                                    {...register(
                                      `modules.${moduleIndex}.lessons.${lessonIndex}.videoDuration` as const,
                                      { valueAsNumber: true }
                                    )}
                                    type="number"
                                    placeholder="Duration (sec)"
                                    className=" border-gray-700  text-xs"
                                  />
                                </div>
                                <Input
                                  {...register(
                                    `modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl` as const
                                  )}
                                  placeholder="Video URL"
                                  className=" border-gray-700  text-xs mt-2"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveLesson(moduleIndex, lessonIndex)
                                }
                                className="ml-2 text-red-500 hover:text-red-400"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleAddLesson(moduleIndex)}
                        className=" hover:bg-[#ff7500] bg-[#ff7500]  mt-3 w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lesson
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddModule}
                  className="bg-[#ff7500] hover:bg-[#ff7500] w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>
            )}
            {errors.modules?.message && (
              <p className="text-red-500 text-sm mt-4">{errors.modules.message}</p>
            )}
          </div>
          </div>
        )}

        {activeStep === 'settings' && (
          <div className="space-y-6">
          <div className="bg-slate-50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start">
              <div className="shrink-0 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-400 font-bold">ℹ️</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Module Quizzes</h3>
                <p className="text-gray-400 text-sm">
                  Module quizzes are optional. You can add a quiz at the end of each module to test
                  student knowledge. Create modules and lessons first in the Content tab to add
                  quizzes.
                </p>
              </div>
            </div>
          </div>

          <div className=" border border-dashed bg-slate-50 border-gray-600 rounded-lg p-12 text-center">
            <div className="text-muted-foreground ">
              <p className="text-lg font-medium mb-2">❓</p>
              <p className="text-sm">Create modules and lessons first in the Content tab to add quizzes.</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
        <div className="space-x-2">
          {activeStep !== 'basic' && (
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setActiveStep(activeStep === 'content' ? 'basic' : 'content')
              }
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              Back
            </Button>
          )}
          {activeStep !== 'settings' && (
            <Button
              type="button"
              onClick={async () => {
                const valid = await validateCurrentStep();
                if (!valid) return;

                setActiveStep(
                  activeStep === 'basic' ? 'content' : 'settings'
                );
              }}
              className="bg-[#ff7500] hover:bg-[#ff7500] text-white"
            >
              Continue
            </Button>
          )}
        </div>

        {activeStep === 'settings' ? (
          <Button
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting}
            className="bg-[#ff7500] hover:bg-[#ff7500] text-white"
          >
            {isSubmitting ? 'Creating Course...' : 'Create Course'}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
