/*
-- Clickup ticket
Build <TimeEntryTable> using MRT. Columns: Date, Project chip, Duration (h), Notes, row actions (edit / delete).
Acceptance Criteria
Pagination (10 rows) handled by hook page,limit
Footer row shows page total hours.
While fetching: skeleton rows.
On fetch error: alert banner with retry.
*/
import TimeCard from "../components/TimeCard";

export default function TimeLogPage() {
    return (
        <main>
            <h2>Welcome to Time Log!</h2>
            <TimeCard />
        </main>
    );
};