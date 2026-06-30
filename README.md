#  my-courses: Modern LMS Platform

A premium, modern Learning Management System (LMS) dashboard inspired by Coursera and Udemy. Features include a clean card-based catalog, dynamic course completion tracking, course search, a favorites system, an upcoming live session display, and full dark mode support.

Developed using **React**, **Vite**, **Tailwind CSS (v4)**, and **React Query**, with data stored in a lightweight mock **JSON Server** backend.

---

## Features

- ** Modern Dashboard Layout**: Responsive sidebar navigation menu, clean content cards, slide-up entry animations, and a polished header.
- ** Real-Time Search**: Filter courses dynamically by title from the main search bar in the catalog view.
- ** Course Favorites**: Star/unstar courses to build your personal shortlist. Favorited states are saved to `localStorage` and filterable with a dedicated "Favorites" tab.
- ** Optional Dark Mode Toggle**: Easily toggle between light and dark themes using the header control (persisted in `localStorage`).
- **Dynamic Dashboard Stats**: Live calculation of overall learning stats:
  - Total Courses
  - Completed Materials (updates instantly as checklist items are checked)
  - Pending Assignments
  - Upcoming Live Sessions
- ** Next Live Class Card**: Displays info for the closest upcoming live session at the top of the dashboard, complete with direct "Join Class" buttons.
- ** Dynamic Progress Tracking**: Marking checklist items (Videos, PDFs, Labs, Articles) in the Study Materials section instantly updates the progress bar and dynamically updates the course's completion state (completed courses shift to the "Completed" tab automatically).
- ** Instructor Profiles & Contact**: Clean instructor cards with dynamic ratings and clickable email contact prompts.

---

##  Technology Stack

- **Frontend Core**: React, React Router DOM (v7)
- **Styling**: Tailwind CSS (v4 - CSS-first configuration)
- **Data Management**: React Query (TanStack Query v5) for data fetching and automatic cache invalidation, Axios
- **Iconography**: Lucide React
- **Build Tool**: Vite
- **Database Backend**: JSON Server (running on port `3001` local port)

---

##  Project Directory Structure

```text
my-courses/
├── server/
│   └── db.json               # Local database (Students, Courses, Materials, Assignments, Live Classes)
├── src/
│   ├── assets/               # Image assets and static resources
│   ├── components/
│   │   ├── course/
│   │   │   ├── common/
│   │   │   │   └── ErrorMessage.jsx  # Redesigned state warning page
│   │   │   └── CourseCard.jsx       # Card listing course progress, instructors, ratings
│   │   └── layout/
│   │       └── DashboardLayout.jsx  # Sidebar structure & Dark mode toggles
│   ├── hooks/                # React Query hooks wrapper for backend synchronization
│   ├── pages/
│   │   ├── CourseDetails.jsx # Detailed Study Materials, Assignments, Live sessions list
│   │   └── MyCourses.jsx     # Dashboard catalog, banner, stats, and next live class view
│   ├── routes/               # Routing wrapper configuration
│   ├── services/             # Axios API calls declaration
│   ├── index.css             # Main stylesheet configuring Plus Jakarta Sans font & variables
│   ├── main.jsx              # Application entry point
│   └── App.jsx
├── vite.config.js
└── package.json
```

---

## Getting Started

###  Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your local machine.

###  Installation

1. Navigate to the project directory:
   ```bash
   cd my-courses
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

###  Running the Application

To run the application, you need to start **both** the backend database server and the Vite development server.

1. **Start the Mock API Server**:
   ```bash
   npm run server
   ```
   *This starts the JSON Server on `http://localhost:3001` based on `server/db.json`.*

2. **Start the Vite Frontend Server**:
   ```bash
   npm run dev
   ```
   *This launches the development web server (usually at `http://localhost:5173` or `http://localhost:5174`). Open the provided link in your browser to view the application.*

3. **Build for Production**:
   To build the optimized client bundle:
   ```bash
   npm run build
   ```
