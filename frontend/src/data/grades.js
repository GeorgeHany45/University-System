export const gradesData = {
  studentName: null,
  terms: [
    {
      termId: "spring-2025",
      termName: "Spring 2025",
      season: "spring",
      year: 2025,
      courses: [
        { code: "CS201", title: "Data Structures", instructor: "Dr. Jane Smith", credits: 3, grade: "A-" },
        { code: "CS210", title: "Database Systems", instructor: "Dr. Ahmed Nasser", credits: 3, grade: "B+" },
        { code: "CS220", title: "Operating Systems", instructor: "Dr. Mike Johnson", credits: 4, grade: "B" },
        { code: "MATH250", title: "Discrete Mathematics", instructor: "Dr. Sara Ali", credits: 3, grade: "A" }
      ]
    },
    {
      termId: "summer-2025",
      termName: "Summer 2025",
      season: "summer",
      year: 2025,
      courses: [
        { code: "CS305", title: "Web Development", instructor: "Prof. John Doe", credits: 3, grade: "A" },
        { code: "CS315", title: "API Engineering", instructor: "Prof. Laila Hassan", credits: 3, grade: "A-" },
        { code: "CS325", title: "Cybersecurity Basics", instructor: "Prof. Omar Youssef", credits: 2, grade: "B+" }
      ]
    }
  ]
};

export const gradePoints = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "D": 1.0,
  "F": 0.0
};
