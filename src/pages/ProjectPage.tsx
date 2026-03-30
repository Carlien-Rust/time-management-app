/*
src/components/ProjectPage.jsx
- Calls Project Card component

route: '/projects'

TODO:
Header with Project name
Project card for specific project - send project id
Project, Date, Duration, Notes
*/

import ProjectCard from "../components/ProjectCard";

export default function ProjectPage() {
    return (
        <main>
            <h2>Welcome to Projects!</h2>
            <ProjectCard />
        </main>
    );
};