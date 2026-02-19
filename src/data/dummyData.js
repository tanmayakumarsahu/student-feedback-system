// Dummy data for feedback system
export const dummyFeedbackForms = [
  {
    id: 1,
    courseName: 'Advanced React Development',
    instructorName: 'Dr. Sarah Johnson',
    semester: 'Spring 2026',
  },
  {
    id: 2,
    courseName: 'Database Design & SQL',
    instructorName: 'Prof. Michael Chen',
    semester: 'Spring 2026',
  },
  {
    id: 3,
    courseName: 'Web Development Fundamentals',
    instructorName: 'Ms. Emily Roberts',
    semester: 'Spring 2026',
  },
  {
    id: 4,
    courseName: 'Cloud Computing & AWS',
    instructorName: 'Dr. James Wilson',
    semester: 'Spring 2026',
  },
];

export const dummyFeedback = [
  {
    id: 1,
    courseName: 'Advanced React Development',
    instructorName: 'Dr. Sarah Johnson',
    rating: 5,
    comments: 'Excellent teaching methodology and very helpful instructor. Highly recommended!',
    timestamp: '2026-02-10',
    studentId: 'STU001',
  },
  {
    id: 2,
    courseName: 'Advanced React Development',
    instructorName: 'Dr. Sarah Johnson',
    rating: 4,
    comments: 'Great course content but could use more real-world projects.',
    timestamp: '2026-02-11',
    studentId: 'STU002',
  },
  {
    id: 3,
    courseName: 'Database Design & SQL',
    instructorName: 'Prof. Michael Chen',
    rating: 4,
    comments: 'Very informative and well-structured course.',
    timestamp: '2026-02-09',
    studentId: 'STU003',
  },
  {
    id: 4,
    courseName: 'Database Design & SQL',
    instructorName: 'Prof. Michael Chen',
    rating: 5,
    comments: 'Outstanding expertise and patience in explaining complex concepts.',
    timestamp: '2026-02-12',
    studentId: 'STU004',
  },
  {
    id: 5,
    courseName: 'Web Development Fundamentals',
    instructorName: 'Ms. Emily Roberts',
    rating: 3,
    comments: 'Good basics but pacing was too fast for some topics.',
    timestamp: '2026-02-08',
    studentId: 'STU005',
  },
  {
    id: 6,
    courseName: 'Cloud Computing & AWS',
    instructorName: 'Dr. James Wilson',
    rating: 5,
    comments: 'Fantastic hands-on approach with practical AWS implementations.',
    timestamp: '2026-02-13',
    studentId: 'STU006',
  },
];

// Utility function to get feedback statistics
export const getFeedbackStats = (feedbacks) => {
  if (feedbacks.length === 0) {
    return {
      totalFeedback: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      byInstructor: {},
      byCourse: {},
    };
  }

  const totalFeedback = feedbacks.length;
  const averageRating = (
    feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
  ).toFixed(2);

  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  feedbacks.forEach((f) => {
    ratingDistribution[f.rating]++;
  });

  const byInstructor = {};
  feedbacks.forEach((f) => {
    if (!byInstructor[f.instructorName]) {
      byInstructor[f.instructorName] = { ratings: [], avg: 0, count: 0 };
    }
    byInstructor[f.instructorName].ratings.push(f.rating);
    byInstructor[f.instructorName].count++;
  });

  // Calculate averages for instructors
  Object.keys(byInstructor).forEach((instructor) => {
    const ratings = byInstructor[instructor].ratings;
    byInstructor[instructor].avg = (
      ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    ).toFixed(2);
  });

  const byCourse = {};
  feedbacks.forEach((f) => {
    if (!byCourse[f.courseName]) {
      byCourse[f.courseName] = { ratings: [], avg: 0, count: 0 };
    }
    byCourse[f.courseName].ratings.push(f.rating);
    byCourse[f.courseName].count++;
  });

  // Calculate averages for courses
  Object.keys(byCourse).forEach((course) => {
    const ratings = byCourse[course].ratings;
    byCourse[course].avg = (
      ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    ).toFixed(2);
  });

  return {
    totalFeedback,
    averageRating,
    ratingDistribution,
    byInstructor,
    byCourse,
  };
};
