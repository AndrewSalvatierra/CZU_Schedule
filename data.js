// ---------------------------------------------------------------------------
// CZU PEF — WS 2026/2027  |  Study group: 1B-INFOAP2 / 1E-INFOAP2  (odd week)
// Source: official timetable (valid 28/09/2026 - 20/12/2026, last change
// 15/09/2026) + the five course syllabi.
//
// attendance:
//   "required"    - syllabus explicitly makes attendance compulsory / graded
//   "partial"     - a minimum % of attendance is required
//   "optional"    - syllabus states no attendance duty (not checked)
//   "elective"    - not part of the study plan at all (sport / free choice)
// ---------------------------------------------------------------------------

const SEMESTER = {
  start: "2026-09-28",   // Monday of week 1 (week 1 = ODD)
  end: "2026-12-20",
  campus: "Praha - Suchdol",
};

const DAYS_OFF = [
  { date: "2026-10-28", label: "Czech national holiday - no teaching" },
];

const COURSES = {
  EIE55E: {
    name: "Introduction to Principles of Computers",
    dept: "Department of Information Engineering (FEM)",
    guarantor: "doc. Ing. Vojtěch Merunka, Ph.D.",
    completion: "Exam — 5 credits",
    attendanceNote:
      "Syllabus sets no attendance duty. To sit the exam you must pass 3 Moodle multiple-choice tests (100% of points needed), then written + oral exam.",
  },
  EREP8E: {
    name: "Theory of Managing Organisational Systems",
    dept: "Department of Management and Marketing (FEM)",
    guarantor: "doc. Ing. Tomáš Macák, Ph.D.",
    completion: "Exam — 5 credits",
    attendanceNote:
      "Syllabus sets no attendance duty. Assessed by case studies / team work in seminars and the final exam.",
  },
  EJE37E: {
    name: "Fundamentals of Juridical Sciences",
    dept: "Department of Law (FEM)",
    guarantor: "JUDr. Ing. Eva Daniela Cvik, LL.M., Ph.D. et Ph.D.",
    completion: "Exam — 5 credits",
    attendanceNote:
      "“The attendance in seminars and lectures is compulsory.” Credit is a written closed-book test, open to students who attended all seminars.",
  },
  ELE33E_1: {
    name: "English for IT — 1st term",
    dept: "Department of Languages (FEM)",
    guarantor: "Brett Nolan Gallagher",
    completion: "Pass credit — 2 credits",
    attendanceNote:
      "75% attendance required, plus active participation, one presentation, one essay and a final credit test (65% to pass).",
  },
  EAE55E: {
    name: "Mathematical Logic and Graph Theory",
    dept: "Department of Systems Engineering (FEM)",
    guarantor: "Ing. Lucie Klaubenschalk Chytilová, Ph.D.",
    completion: "Exam — 5 credits",
    attendanceNote:
      "Syllabus sets no attendance duty for lectures. Seminars are where the exercises are worked through — skipping them is on you.",
  },
  SPORT: {
    name: "Core Training (Physical Education)",
    dept: "Department of Physical Education (KTV)",
    guarantor: "A. Fričová",
    completion: "Pass credit",
    attendanceNote:
      "Mandatory — attendance is taken in the enrolled sport group.",
  },
};

// day: 1 = Mon ... 5 = Fri
const CLASSES = [
  {
    day: 3, start: "14:00", end: "15:30",
    code: "EIE55E", type: "Lecture", room: "MIII",
    teacher: "J. Brožek",
    weeks: "every",
    attendance: "optional",
    note: "No class on 28/10/2026 (day off).",
  },
  {
    day: 3, start: "17:30", end: "19:00",
    code: "EAE55E", type: "Seminar", room: "PEF EV",
    teacher: "E. Radová Garajová",
    weeks: "every",
    attendance: "optional",
    note: "Group block for INFOAP1 + INFOAP2. No class on 28/10/2026.",
  },
  {
    day: 3, start: "19:15", end: "20:45",
    code: "EAE55E", type: "Lecture", room: "PEF EI",
    teacher: "E. Radová Garajová",
    weeks: "every",
    attendance: "optional",
    note: "Whole year. No class on 28/10/2026.",
  },
  {
    day: 4, start: "08:45", end: "10:15",
    code: "EJE37E", type: "Lecture", room: "MII",
    teacher: "L. Scheu",
    weeks: "every",
    attendance: "required",
    note: "Attendance compulsory per syllabus.",
  },
  {
    day: 4, start: "10:30", end: "12:00",
    code: "EREP8E", type: "Seminar", room: "PEF E323",
    teacher: "T. Macák",
    weeks: "odd",
    attendance: "optional",
    note: "ODD weeks only — your group.",
  },
  {
    day: 4, start: "12:15", end: "13:45",
    code: "EREP8E", type: "Lecture", room: "PEF EI",
    teacher: "T. Macák",
    weeks: "every",
    attendance: "optional",
    note: "Whole year.",
  },
  {
    day: 4, start: "15:45", end: "17:15",
    code: "EJE37E", type: "Seminar", room: "PEF D444",
    teacher: "E. D. Cvik",
    weeks: "odd",
    attendance: "required",
    note: "ODD weeks only. Attendance compulsory — all seminars needed for the credit test.",
  },
  {
    day: 4, start: "17:30", end: "19:00",
    code: "ELE33E_1", type: "Seminar", room: "PEF DI",
    teacher: "B. N. Gallagher",
    weeks: "every",
    attendance: "partial",
    note: "Your English group (INFOAP2). 75% attendance needed.",
  },
  {
    day: 5, start: "12:00", end: "13:00",
    code: "SPORT", type: "Core training", room: "KTV Fitness",
    teacher: "A. Fričová",
    weeks: "every",
    attendance: "required",
    note: "60 minutes. Mandatory — this is the sport course I enrolled in.",
  },
  {
    day: 5, start: "10:30", end: "12:00",
    code: "EIE55E", type: "Seminar", room: "PEF C27",
    teacher: "J. Ružejnikov",
    weeks: "odd",
    attendance: "optional",
    note: "ODD weeks only — your group.",
  },
];

// Room codes exactly as printed on the official timetable. All teaching is on
// the Praha-Suchdol campus unless the timetable says otherwise.
const ROOMS = {
  "MIII": "Lecture hall M III — large hall, Suchdol campus",
  "MII": "Lecture hall M II — large hall, Suchdol campus",
  "PEF EI": "PEF building, lecture hall E I",
  "PEF EV": "PEF building, lecture hall E V",
  "PEF E323": "PEF building, room E 323",
  "PEF D444": "PEF building, room D 444",
  "PEF DI": "PEF building, lecture hall D I",
  "PEF C27": "PEF building, room C 27",
  "KTV Fitness": "CZU fitness centre — Department of Physical Education",
};
