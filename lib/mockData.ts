import {
  User,
  Course,
  Enrollment, 
  Quiz,
  Question,
  MessageThread,
  Message,
  SubscriptionPlan,
  TeacherBalance,
  Withdrawal,
  CourseEarnings,
} from '@/types';

// Mock Users
export const mockTeachers: User[] = [
  {
    id: 'teacher-1',
    email: 'sarah.johnson@edulearn.com',
    name: 'Sarah Johnson',
    role: 'TEACHER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Expert in web development and React',
    joinedDate: new Date('2023-01-15'),
  },
  {
    id: 'teacher-2',
    email: 'michael.chen@edulearn.com',
    name: 'Michael Chen',
    role: 'TEACHER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    bio: 'Data Science and Machine Learning specialist',
    joinedDate: new Date('2023-02-20'),
  },
];

export const mockStudents: User[] = [
  {
    id: 'student-1',
    email: 'alex.rivera@gmail.com',
    name: 'Alex Rivera',
    role: 'STUDENT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Aspiring full-stack developer',
    joinedDate: new Date('2023-06-10'),
  },
  {
    id: 'student-2',
    email: 'emma.watson@gmail.com',
    name: 'Emma Watson',
    role: 'STUDENT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    bio: 'Learning web development',
    joinedDate: new Date('2023-07-05'),
  },
  {
    id: 'student-3',
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    role: 'STUDENT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Data science enthusiast',
    joinedDate: new Date('2023-08-12'),
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, hooks, and state management',
    instructor: mockTeachers[0],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    price: 49.99,
    category: 'Web Development',
    level: 'BEGINNER',
    rating: 4.8,
    studentCount: 245,
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-15'),
    isPublished: true,
    isDraft: false,
    status: 'PUBLISHED',
    totalRevenue: 12245.05,
    modules: [
      {
        id: 'module-1-1',
        courseId: 'course-1',
        title: 'Getting Started with React',
        description: 'Introduction to React and JSX',
        order: 1,
        estimatedDuration: 35,
        lessons: [
          {
            id: 'lesson-1-1-1',
            moduleId: 'module-1-1',
            title: 'What is React?',
            description: 'Understanding React basics',
            content: 'React is a JavaScript library for building user interfaces...',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
            videoDuration: 900, // 15 minutes in seconds
            order: 1,
          },
          {
            id: 'lesson-1-1-2',
            moduleId: 'module-1-1',
            title: 'JSX Syntax',
            description: 'Learn JSX fundamentals',
            content: 'JSX lets you write HTML-like code in JavaScript...',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4',
            videoDuration: 1200, // 20 minutes in seconds
            order: 2,
          },
        ],
      },
      {
        id: 'module-1-2',
        courseId: 'course-1',
        title: 'Components and Props',
        description: 'Building reusable React components',
        order: 2,
        estimatedDuration: 43,
        lessons: [
          {
            id: 'lesson-1-2-1',
            moduleId: 'module-1-2',
            title: 'Functional Components',
            description: 'Creating components with functions',
            content: 'Functional components are JavaScript functions...',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
            videoDuration: 1500, // 25 minutes in seconds
            order: 1,
          },
          {
            id: 'lesson-1-2-2',
            moduleId: 'module-1-2',
            title: 'Understanding Props',
            description: 'Passing data to components',
            content: 'Props allow you to pass data between components...',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerJlazes.mp4',
            videoDuration: 1080, // 18 minutes in seconds
            order: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis and visualization',
    instructor: mockTeachers[1],
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8290f?w=500&h=300&fit=crop',
    price: 59.99,
    category: 'Data Science',
    level: 'INTERMEDIATE',
    rating: 4.9,
    studentCount: 189,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-02-10'),
    isPublished: true,
    isDraft: false,
    status: 'PUBLISHED',
    totalRevenue: 8920.50,
    modules: [
      {
        id: 'module-2-1',
        courseId: 'course-2',
        title: 'Python Basics',
        description: 'Introduction to Python programming',
        order: 1,
        estimatedDuration: 22,
        lessons: [
          {
            id: 'lesson-2-1-1',
            moduleId: 'module-2-1',
            title: 'Variables and Data Types',
            description: 'Understanding Python data types',
            content: 'Python has several built-in data types...',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/Sintel.mp4',
            videoDuration: 1320, // 22 minutes in seconds
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript concepts and patterns',
    instructor: mockTeachers[0],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    price: 39.99,
    category: 'Web Development',
    level: 'ADVANCED',
    rating: 4.7,
    studentCount: 156,
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-01-20'),
    isPublished: true,
    isDraft: false,
    status: 'PUBLISHED',
    totalRevenue: 5680.00,
    modules: [],
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: 'enrollment-1',
    studentId: 'student-1',
    courseId: 'course-1',
    enrolledAt: new Date('2024-01-10'),
    courseProgress: 65,
    status: 'ACTIVE',
    isPaid: true,
    videoProgress: [
      {
        lessonId: 'lesson-1-1-1',
        enrollmentId: 'enrollment-1',
        watchedDuration: 720, // 12 minutes
        watchPercentage: 80,
        isCompleted: true,
        completedAt: new Date('2024-01-15'),
        lastWatchedAt: new Date('2024-01-15T10:30:00'),
      },
      {
        lessonId: 'lesson-1-1-2',
        enrollmentId: 'enrollment-1',
        watchedDuration: 400, // 6.6 minutes
        watchPercentage: 33,
        isCompleted: false,
        lastWatchedAt: new Date('2024-02-18T14:20:00'),
      },
    ],
    lessonProgress: [],
    moduleProgress: [],
    quizAttempts: [],
  },
  {
    id: 'enrollment-2',
    studentId: 'student-1',
    courseId: 'course-2',
    enrolledAt: new Date('2024-01-15'),
    courseProgress: 30,
    status: 'ACTIVE',
    isPaid: true,
    videoProgress: [
      {
        lessonId: 'lesson-2-1-1',
        enrollmentId: 'enrollment-2',
        watchedDuration: 396, // 6.6 minutes
        watchPercentage: 30,
        isCompleted: false,
        lastWatchedAt: new Date('2024-02-18T16:45:00'),
      },
    ],
    lessonProgress: [],
    moduleProgress: [],
    quizAttempts: [],
  },
  {
    id: 'enrollment-3',
    studentId: 'student-2',
    courseId: 'course-1',
    enrolledAt: new Date('2024-01-05'),
    courseProgress: 100,
    completedAt: new Date('2024-02-15'),
    status: 'COMPLETED',
    isPaid: true,
    videoProgress: [
      {
        lessonId: 'lesson-1-1-1',
        enrollmentId: 'enrollment-3',
        watchedDuration: 900,
        watchPercentage: 100,
        isCompleted: true,
        completedAt: new Date('2024-01-12'),
        lastWatchedAt: new Date('2024-01-12T09:15:00'),
      },
      {
        lessonId: 'lesson-1-1-2',
        enrollmentId: 'enrollment-3',
        watchedDuration: 1200,
        watchPercentage: 100,
        isCompleted: true,
        completedAt: new Date('2024-01-18'),
        lastWatchedAt: new Date('2024-01-18T11:20:00'),
      },
      {
        lessonId: 'lesson-1-2-1',
        enrollmentId: 'enrollment-3',
        watchedDuration: 1500,
        watchPercentage: 100,
        isCompleted: true,
        completedAt: new Date('2024-01-25'),
        lastWatchedAt: new Date('2024-01-25T13:45:00'),
      },
      {
        lessonId: 'lesson-1-2-2',
        enrollmentId: 'enrollment-3',
        watchedDuration: 1080,
        watchPercentage: 100,
        isCompleted: true,
        completedAt: new Date('2024-02-15'),
        lastWatchedAt: new Date('2024-02-15T10:30:00'),
      },
    ],
    lessonProgress: [],
    moduleProgress: [],
    quizAttempts: [],
  },
  {
    id: 'enrollment-4',
    studentId: 'student-3',
    courseId: 'course-2',
    enrolledAt: new Date('2024-01-20'),
    courseProgress: 45,
    status: 'ACTIVE',
    isPaid: true,
    videoProgress: [
      {
        lessonId: 'lesson-2-1-1',
        enrollmentId: 'enrollment-4',
        watchedDuration: 594, // 9.9 minutes
        watchPercentage: 45,
        isCompleted: false,
        lastWatchedAt: new Date('2024-02-17T15:30:00'),
      },
    ],
    lessonProgress: [],
    moduleProgress: [],
    quizAttempts: [],
  },
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    courseId: 'course-1',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React basics',
    passingScore: 70,
    timeLimit: 30,
    createdAt: new Date('2023-09-15'),
    questions: [
      {
        id: 'q-1',
        quizId: 'quiz-1',
        question: 'What is React?',
        options: [
          'A CSS framework',
          'A JavaScript library for building UIs',
          'A backend framework',
          'A database',
        ],
        correctAnswer: 1,
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces.',
      },
      {
        id: 'q-2',
        quizId: 'quiz-1',
        question: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'JSON Extended',
          'JavaScript Extra',
          'Java Syntax Extension',
        ],
        correctAnswer: 0,
        explanation: 'JSX stands for JavaScript XML, allowing you to write HTML-like code in JavaScript.',
      },
    ],
  },
];

// Mock Message Threads
export const mockMessageThreads: MessageThread[] = [
  {
    id: 'thread-1',
    courseId: 'course-1',
    title: 'React Hooks Questions',
    description: 'Discuss React Hooks and best practices',
    createdBy: 'teacher-1',
    createdAt: new Date('2024-01-20'),
    lastMessageAt: new Date('2024-02-18'),
    participants: ['teacher-1', 'student-1', 'student-2'],
    messages: [
      {
        id: 'msg-1',
        threadId: 'thread-1',
        senderId: 'student-1',
        content: 'Can someone explain the useEffect hook?',
        createdAt: new Date('2024-01-20T10:30:00'),
        isEdited: false,
      },
      {
        id: 'msg-2',
        threadId: 'thread-1',
        senderId: 'teacher-1',
        content: 'useEffect is used to perform side effects in functional components. You can think of it as a combination of componentDidMount, componentDidUpdate, and componentWillUnmount.',
        createdAt: new Date('2024-01-20T11:15:00'),
        isEdited: false,
      },
      {
        id: 'msg-3',
        threadId: 'thread-1',
        senderId: 'student-2',
        content: 'What about the dependency array?',
        createdAt: new Date('2024-02-18T14:45:00'),
        isEdited: false,
      },
    ],
  },
];

// Mock Subscription Plans
export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-1',
    name: 'Basic',
    price: 9.99,
    features: ['Access to 5 courses', 'Basic support', 'Student community'],
    courseLimit: 5,
  },
  {
    id: 'plan-2',
    name: 'Professional',
    price: 24.99,
    features: ['Access to 50 courses', 'Priority support', 'Certificate of completion', 'Community access'],
    courseLimit: 50,
  },
  {
    id: 'plan-3',
    name: 'Enterprise',
    price: 99.99,
    features: ['Unlimited courses', '24/7 support', 'Custom paths', 'Advanced analytics', 'Team management'],
    courseLimit: -1, // -1 means unlimited
  },
];

// Mock Teacher Balances
export const mockTeacherBalances: TeacherBalance[] = [
  {
    teacherId: 'teacher-1',
    totalEarnings: 12450.75,
    availableBalance: 8250.75,
    pendingBalance: 4200.00,
    withdrawnAmount: 5000.00,
    lastUpdated: new Date('2024-02-18'),
  },
  {
    teacherId: 'teacher-2',
    totalEarnings: 8920.50,
    availableBalance: 6420.50,
    pendingBalance: 2500.00,
    withdrawnAmount: 3000.00,
    lastUpdated: new Date('2024-02-18'),
  },
];

// Mock Withdrawals
export const mockWithdrawals: Withdrawal[] = [
  {
    id: 'withdrawal-1',
    teacherId: 'teacher-1',
    amount: 5000.00,
    status: 'COMPLETED',
    paymentMethod: 'BANK_TRANSFER',
    fee: 150.00,
    netAmount: 4850.00,
    transactionId: 'TXN-20240115-001',
    requestedAt: new Date('2024-01-15'),
    processedAt: new Date('2024-01-18'),
    bankAccount: {
      accountName: 'Sarah Johnson',
      accountNumber: '****2847',
      routingNumber: '****0123',
    },
  },
  {
    id: 'withdrawal-2',
    teacherId: 'teacher-1',
    amount: 2000.00,
    status: 'PROCESSING',
    paymentMethod: 'PAYPAL',
    fee: 60.00,
    netAmount: 1940.00,
    requestedAt: new Date('2024-02-10'),
    paypalEmail: 'sarah.johnson@***',
  },
  {
    id: 'withdrawal-3',
    teacherId: 'teacher-2',
    amount: 3000.00,
    status: 'COMPLETED',
    paymentMethod: 'BANK_TRANSFER',
    fee: 90.00,
    netAmount: 2910.00,
    transactionId: 'TXN-20240105-002',
    requestedAt: new Date('2024-01-05'),
    processedAt: new Date('2024-01-08'),
    bankAccount: {
      accountName: 'Michael Chen',
      accountNumber: '****5932',
      routingNumber: '****0456',
    },
  },
];

// Mock Course Earnings
export const mockCourseEarnings: CourseEarnings[] = [
  {
    courseId: 'course-1',
    courseName: 'React Fundamentals',
    totalRevenue: 12245.05,
    enrollmentCount: 245,
    averagePrice: 49.99,
    lastMonthRevenue: 2450.50,
  },
  {
    courseId: 'course-2',
    courseName: 'Python Basics',
    totalRevenue: 8920.50,
    enrollmentCount: 178,
    averagePrice: 49.99,
    lastMonthRevenue: 1850.25,
  },
  {
    courseId: 'course-3',
    courseName: 'Advanced React Patterns',
    totalRevenue: 5680.00,
    enrollmentCount: 85,
    averagePrice: 66.75,
    lastMonthRevenue: 1200.00,
  },
];

// Helper functions for mock data
export function getCurrentUser(userId: string): User | undefined {
  return [...mockTeachers, ...mockStudents].find((user) => user.id === userId);
}

export function getCourseById(courseId: string): Course | undefined {
  return mockCourses.find((course) => course.id === courseId);
}

export function getEnrollmentsByStudent(studentId: string): Enrollment[] {
  return mockEnrollments.filter((enrollment) => enrollment.studentId === studentId);
}

export function getEnrollmentsByCourse(courseId: string): Enrollment[] {
  return mockEnrollments.filter((enrollment) => enrollment.courseId === courseId);
}

export function getThreadsByCourse(courseId: string): MessageThread[] {
  return mockMessageThreads.filter((thread) => thread.courseId === courseId);
}

export function getQuizzesByCourse(courseId: string): Quiz[] {
  return mockQuizzes.filter((quiz) => quiz.courseId === courseId);
}
