export const coursesData = [
    // Computer Science Courses
    {
        id: 1,
        catalogId: 1,
        department: "Computer Science",
        code: "CS101",
        title: "Introduction to Programming",
        description: "Learn fundamental programming concepts using Python",
        credits: 3,
        type: "core",
        instructor: "Dr. Smith",
        email: "smith@university.edu",
        enrolled: 25,
        capacity: 30,
        prerequisites: [],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday"],
            time: "10:00 AM - 11:30 AM",
            room: "Building A - Room 205"
        },
        lmsLink: "https://lms.university.edu/courses/cs101"
    },
    {
        id: 2,
        catalogId: 1,
        department: "Computer Science",
        code: "CS200",
        title: "Data Structures",
        description: "Study of fundamental data structures and algorithms",
        credits: 4,
        type: "core",
        instructor: "Dr. Brown",
        email: "brown@university.edu",
        enrolled: 22,
        capacity: 30,
        prerequisites: ["CS101"],
        semester: "Fall 2024",
        schedule: {
            days: ["Tuesday", "Thursday"],
            time: "10:00 AM - 11:30 AM",
            room: "Building A - Room 210"
        },
        lmsLink: "https://lms.university.edu/courses/cs200"
    },
    {
        id: 3,
        catalogId: 1,
        department: "Computer Science",
        code: "CS301",
        title: "Web Development",
        description: "Modern web development with HTML, CSS, JavaScript, and React",
        credits: 3,
        type: "elective",
        instructor: "Prof. Anderson",
        email: "anderson@university.edu",
        enrolled: 28,
        capacity: 30,
        prerequisites: ["CS101"],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday"],
            time: "2:00 PM - 3:30 PM",
            room: "Computer Lab - Room 405"
        },
        lmsLink: "https://lms.university.edu/courses/cs301"
    },
    
    // Mathematics Courses
    {
        id: 4,
        catalogId: 2,
        department: "Mathematics",
        code: "MATH101",
        title: "Calculus I",
        description: "Introduction to differential calculus and applications",
        credits: 4,
        type: "core",
        instructor: "Dr. Martinez",
        email: "martinez@university.edu",
        enrolled: 35,
        capacity: 40,
        prerequisites: [],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            time: "9:00 AM - 10:00 AM",
            room: "Building B - Room 201"
        },
        lmsLink: "https://lms.university.edu/courses/math101"
    },
    {
        id: 5,
        catalogId: 2,
        department: "Mathematics",
        code: "MATH201",
        title: "Calculus II",
        description: "Advanced calculus including integration techniques and series",
        credits: 4,
        type: "core",
        instructor: "Prof. Johnson",
        email: "johnson@university.edu",
        enrolled: 30,
        capacity: 30,
        prerequisites: ["MATH101"],
        semester: "Fall 2024",
        schedule: {
            days: ["Tuesday", "Thursday"],
            time: "2:00 PM - 3:30 PM",
            room: "Building B - Room 101"
        },
        lmsLink: "https://lms.university.edu/courses/math201"
    },
    {
        id: 6,
        catalogId: 2,
        department: "Mathematics",
        code: "MATH205",
        title: "Linear Algebra",
        description: "Matrices, vector spaces, and linear transformations",
        credits: 3,
        type: "elective",
        instructor: "Dr. Lee",
        email: "lee@university.edu",
        enrolled: 20,
        capacity: 25,
        prerequisites: ["MATH101"],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday"],
            time: "11:00 AM - 12:30 PM",
            room: "Building B - Room 105"
        },
        lmsLink: "https://lms.university.edu/courses/math205"
    },

    // Arts & Design Courses
    {
        id: 7,
        catalogId: 4,
        department: "Arts & Design",
        code: "ART105",
        title: "Digital Design",
        description: "Introduction to graphic design and digital media creation",
        credits: 3,
        type: "elective",
        instructor: "Ms. Williams",
        email: "williams@university.edu",
        enrolled: 18,
        capacity: 25,
        prerequisites: [],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            time: "1:00 PM - 2:00 PM",
            room: "Art Studio - Room 301"
        },
        lmsLink: "https://lms.university.edu/courses/art105"
    },
    {
        id: 8,
        catalogId: 4,
        department: "Arts & Design",
        code: "ART210",
        title: "Photography Fundamentals",
        description: "Basic photography techniques and digital image editing",
        credits: 3,
        type: "elective",
        instructor: "Prof. Chen",
        email: "chen@university.edu",
        enrolled: 15,
        capacity: 20,
        prerequisites: [],
        semester: "Fall 2024",
        schedule: {
            days: ["Tuesday", "Thursday"],
            time: "3:00 PM - 4:30 PM",
            room: "Photo Lab - Room 215"
        },
        lmsLink: "https://lms.university.edu/courses/art210"
    },

    // Business Courses
    {
        id: 9,
        catalogId: 5,
        department: "Business",
        code: "BUS101",
        title: "Business Management",
        description: "Introduction to business principles and management",
        credits: 3,
        type: "core",
        instructor: "Prof. Davis",
        email: "davis@university.edu",
        enrolled: 20,
        capacity: 30,
        prerequisites: [],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday"],
            time: "3:00 PM - 4:30 PM",
            room: "Business Building - Room 150"
        },
        lmsLink: "https://lms.university.edu/courses/bus101"
    },
    {
        id: 10,
        catalogId: 5,
        department: "Business",
        code: "BUS250",
        title: "Marketing Principles",
        description: "Fundamentals of marketing strategy and consumer behavior",
        credits: 3,
        type: "elective",
        instructor: "Ms. Taylor",
        email: "taylor@university.edu",
        enrolled: 25,
        capacity: 30,
        prerequisites: ["BUS101"],
        semester: "Fall 2024",
        schedule: {
            days: ["Tuesday", "Thursday"],
            time: "1:00 PM - 2:30 PM",
            room: "Business Building - Room 160"
        },
        lmsLink: "https://lms.university.edu/courses/bus250"
    },

    // Natural Sciences Courses
    {
        id: 11,
        catalogId: 6,
        department: "Natural Sciences",
        code: "PHYS101",
        title: "Physics I",
        description: "Introduction to classical mechanics and thermodynamics",
        credits: 4,
        type: "core",
        instructor: "Dr. Wilson",
        email: "wilson@university.edu",
        enrolled: 28,
        capacity: 35,
        prerequisites: ["MATH101"],
        semester: "Fall 2024",
        schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            time: "10:00 AM - 11:00 AM",
            room: "Science Building - Room 150"
        },
        lmsLink: "https://lms.university.edu/courses/phys101"
    },
    {
        id: 12,
        catalogId: 6,
        department: "Natural Sciences",
        code: "CHEM101",
        title: "General Chemistry",
        description: "Introduction to chemical principles and laboratory techniques",
        credits: 4,
        type: "core",
        instructor: "Prof. Robinson",
        email: "robinson@university.edu",
        enrolled: 30,
        capacity: 32,
        prerequisites: [],
        semester: "Fall 2024",
        schedule: {
            days: ["Tuesday", "Thursday"],
            time: "9:00 AM - 10:30 AM",
            room: "Chemistry Lab - Room 220"
        },
        lmsLink: "https://lms.university.edu/courses/chem101"
    }
        ,
        // Engineering Courses
        {
            id: 13,
            catalogId: 3,
            department: "Engineering",
            code: "ENGR101",
            title: "Introduction to Engineering",
            description: "Overview of engineering disciplines and career paths",
            credits: 3,
            type: "core",
            instructor: "Dr. Patel",
            email: "patel@university.edu",
            enrolled: 20,
            capacity: 40,
            prerequisites: [],
            semester: "Fall 2024",
            schedule: {
                days: ["Tuesday", "Thursday"],
                time: "9:00 AM - 10:30 AM",
                room: "Engineering Building - Room 110"
            },
            lmsLink: "https://lms.university.edu/courses/engr101"
        },
        {
            id: 14,
            catalogId: 3,
            department: "Engineering",
            code: "ENGR201",
            title: "Statics",
            description: "Study of forces in static equilibrium for engineering systems",
            credits: 4,
            type: "core",
            instructor: "Prof. Gomez",
            email: "gomez@university.edu",
            enrolled: 18,
            capacity: 35,
            prerequisites: [],
            semester: "Fall 2024",
            schedule: {
                days: ["Monday", "Wednesday"],
                time: "11:00 AM - 12:30 PM",
                room: "Engineering Building - Room 210"
            },
            lmsLink: "https://lms.university.edu/courses/engr201"
        },
        {
            id: 15,
            catalogId: 3,
            department: "Engineering",
            code: "ENGR305",
            title: "Thermodynamics",
            description: "Principles of thermodynamics and applications in engineering",
            credits: 4,
            type: "core",
            instructor: "Dr. Ahmed",
            email: "ahmed@university.edu",
            enrolled: 22,
            capacity: 40,
            prerequisites: ["PHYS101"],
            semester: "Fall 2024",
            schedule: {
                days: ["Tuesday", "Thursday"],
                time: "2:00 PM - 3:30 PM",
                room: "Engineering Building - Room 305"
            },
            lmsLink: "https://lms.university.edu/courses/engr305"
        }
    ];