/*
src/components/DashboardPage.jsx
- Overview of all project highlights

route: '/dashboard'

-- Clickup ticket
Open /dashboard; cards render once (no duplicate requests) and display project + total time
Resize browser; card count per row matches breakpoints.
Loading & Error States: While fetching: project-card skeletons shown.
On fetch error: alert banner with retry button appears.
Empty State: If no projects exist, show illustration and “Add Project” button.
*/

export default function DashboardPage() {
    return (
        <main>
            <h2>Overview</h2>
            <p>Welcome to the Admin Dashboard!</p>
        </main>
    );
};