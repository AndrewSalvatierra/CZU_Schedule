# My Class Schedule — CZU PEF, WS 2026/2027

A small static site showing my weekly timetable, with the room for every class and
a clear marker for which classes actually take attendance.

**Study group:** 1B-INFOAP2 / 1E-INFOAP2 — **odd-week** seminar rotation.
**Valid:** 28/09/2026 – 20/12/2026. Campus: Praha – Suchdol.

## What it does

- Toggle between **odd** and **even** week (odd-week seminars disappear on even weeks)
- Auto-detects the current teaching week and highlights today
- Room code + description for every class
- Attendance marker per class:
  - 🔴 **Attendance required** — compulsory per syllabus
  - 🟠 **75% attendance** — minimum attendance rule
  - 🟢 **Optional** — the syllabus imposes no attendance duty
  - 🟣 **Elective sport** — KTV, only if enrolled
- Full course list with the exact assessment/attendance wording from each syllabus

## My week (odd)

| Day | Time | Course | Type | Room | Attendance |
|---|---|---|---|---|---|
| Wed | 14:00–15:30 | Introduction to Principles of Computers | Lecture | MIII | Optional |
| Wed | 17:30–19:00 | Mathematical Logic and Graph Theory | Seminar | PEF EV | Optional |
| Wed | 19:15–20:45 | Mathematical Logic and Graph Theory | Lecture | PEF EI | Optional |
| Thu | 08:45–10:15 | Fundamentals of Juridical Sciences | Lecture | MII | **Required** |
| Thu | 10:30–12:00 | Theory of Managing Organisational Systems | Seminar | PEF E323 | Optional |
| Thu | 12:15–13:45 | Theory of Managing Organisational Systems | Lecture | PEF EI | Optional |
| Thu | 15:45–17:15 | Fundamentals of Juridical Sciences | Seminar | PEF D444 | **Required** |
| Thu | 17:30–19:00 | English for IT – 1st term | Seminar | PEF DI | **75%** |
| Fri | 10:30–12:00 | Introduction to Principles of Computers | Seminar | PEF C27 | Optional |

On **even** weeks the three odd-week seminars are dropped, so Friday is free.

## Run locally

No build step. Open `index.html`, or:

```bash
npx serve .
```

## Deploy to Vercel

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).
Framework preset: **Other**, no build command, output directory: `.`

## Editing

All schedule data lives in [`data.js`](data.js) — courses, classes, rooms, sport slots.
Nothing else needs touching to change a time, room or attendance rule.
