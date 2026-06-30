# APPROACH

This document outlines the architectural approach and key design decisions taken to enhance the existing React + Tailwind LMS project into a modern, responsive, and feature-rich learning portal.

## Architectural Constraints

The following project constraints were maintained throughout development:

* Preserved the existing React Router structure (`/` for the dashboard and `/courses/:courseId` for course details).
* Did not modify the existing state management, React Query hooks, Axios requests, or mutation logic. Existing caching and data-fetching strategies were retained.
* Left the `db.json` data unchanged.
* Used only Tailwind CSS (v4) for styling to ensure consistency with the existing project.

## Implementation Details

### 1. UI & Typography Enhancements

* Imported **Plus Jakarta Sans** as the primary application font.
* Applied a modern red-based color palette inspired by the provided design reference.
* Customized lightweight scrollbars that adapt to both light and dark themes.

### 2. Dashboard Layout

* Created a reusable `DashboardLayout` component to provide a consistent layout across pages.
* Implemented a collapsible sidebar for desktop devices and a slide-out navigation drawer for tablets and mobile devices.
* Removed unused navigation items and placeholder content to improve usability.
* Simplified the header by removing unnecessary mock profile information and inactive notification elements.

### 3. Dynamic Progress Tracking

The original project stored static course progress values that did not reflect user interactions.

To address this, course progress is now calculated dynamically based on completed study materials.

Progress is calculated as:

**Progress = (Completed Materials / Total Materials) × 100**

Whenever a study material is marked as completed, the existing `updateMaterial` mutation invalidates the `materials` query. React Query automatically refetches the updated data, ensuring that progress bars, completion percentages, and course status remain synchronized across both the dashboard and course details pages.

## Additional Features

### Course Search

Implemented real-time filtering of courses by title using the dashboard search bar.

### Favorites

Users can mark courses as favorites. Favorite selections are stored in `localStorage` and can be viewed through a dedicated **Favorites** tab.

### Dark Mode

Added a light/dark theme toggle. The selected theme is stored in `localStorage`, and the interface updates using Tailwind's `dark:` utility classes.

### Dynamic Dashboard Statistics

Dashboard statistics are calculated dynamically using live application data, including:

* Total Courses
* Completed Materials
* Pending Assignments
* Upcoming Live Sessions

### Next Live Class

Displays the nearest upcoming live session at the top of the dashboard with a quick **Join Class** action.

## Verification

Before submission, the application was verified by:

* Running production builds using `npm run build`.
* Testing responsive layouts across desktop, tablet, and mobile devices.
* Verifying search functionality.
* Testing favorites persistence.
* Confirming dark mode persistence.
* Ensuring checklist updates correctly refresh course progress.
* Validating dashboard statistics and live session calculations.
* Confirming smooth navigation and overall application stability.
