# ⚙️ Technical Approach: LMS UI Overhaul

This document details the architectural approach and design decisions taken to transform the existing React + Tailwind LMS project into a modern, responsive, and feature-rich learning portal.

---

## 🧭 Architectural Constraints

We strictly adhered to the following developer constraints:
1. **No modifications to routing structure**: Retained React Router routes (`/` for dashboard catalog, `/courses/:courseId` for course details page).
2. **No changes to state libraries, hooks, or Axios queries**: Preserved React Query caching strategies, fetch handlers, and mutation mechanisms (such as `useUpdateMaterial` for checklist updates) completely.
3. **No database mutations**: Kept `db.json` unaltered.
4. **Style isolation**: Used strictly **Tailwind CSS (v4)** classes and Tailwind-native themes.

---

## 🛠️ Implementation Details

### 1. Style & Typography Upgrades
- **Font Face**: Imported the premium **Plus Jakarta Sans** typeface via `@import url(...)` in `src/index.css`.
- **Color Palettes**: Configured a primary brand crimson red color scheme (`#b30d0d`) matched to the user's reference dashboard design screenshot.
- **Scrollbars**: Designed responsive, low-profile webkit scrollbars that blend smoothly into light and dark interfaces.

### 2. Header & Clean Sidebar Layout (`DashboardLayout.jsx`)
- Wrapped all pages in a cohesive `DashboardLayout` component.
- Implemented a collapsible desktop sidebar and a slide-over drawer structure for tablet/mobile screen sizes.
- Cleared out mock categories and non-functional navigation lists to ensure zero broken links.
- Stripped hardcoded profile text and warning bell buttons to clean the top-right header view.

### 3. Integrated Dynamic Progress Indicators
- **Problem**: The database contains a static `progress` integer (e.g. `40%`) that was not updated dynamically in the backend when the student toggled course checklist materials.
- **Solution**: We integrated the dashboard catalog (`MyCourses.jsx`) with the `useMaterials` and `useFaculty` query hooks. Instead of rendering static db percentages, the dashboard dynamically calculates each course's true completion percentage based on checked materials:
  $$\text{Progress} = \text{round}\left( \frac{\text{Completed Materials}}{\text{Total Materials}} \times 100 \right)$$
- **Instant Sync**: Toggling items on the Course Details page executes the `updateMaterial` mutation, which invalidates the `["materials"]` query. This causes React Query to automatically refetch and synchronize progress bars across both the catalog and details pages instantly, updating the dashboard tabs in real-time.

### 4. Added Features (Client-Side Enhancements)
- **🔍 Course Search**: Implemented a stateful title search input in the catalog toolbar, matching character queries.
- **❤️ Favorites System**: Rendered interactive Heart buttons on course thumbnails. Selections are stored in a serialized array in `localStorage` and filterable with a dedicated "Favorites" tab.
- **🌙 Manual Dark Mode**: Added a Sun/Moon toggle button in the header. Toggling applies the `.dark` class to the HTML root, switching background/border/text values dynamically using Tailwind `dark:` variants. Prefers-color-theme state is saved in `localStorage`.
- **📊 Dynamic Stats Panel**: Calculates counters (Total Courses, Completed Materials, Pending Assignments, Upcoming Sessions) dynamically based on actual database entries.
- **🔔 Next Live Session Card**: Queries upcoming sessions, sorts them chronologically, and pins the next scheduled live event to the top of the dashboard catalog.

---

## 🧪 Verification & Stability Checks

- **Compilation**: Verified using production Vite build scripts (`npm run build`) to ensure zero CSS compiler warnings, TypeScript rule failures, or bundler anomalies.
- **Browser Validation**: Launched browser subagents to test:
  1. Theme toggling (Dark/Light mode rendering).
  2. Search filtering and favorites tab sorting.
  3. Interactive checklist checkbox triggers.
  4. Auto-calculation of statistics counts.
  5. Responsive layout drawer behaviors.
