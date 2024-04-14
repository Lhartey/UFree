// ProjectDetailsPage.js

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';

const ProjectDetailsPage = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`/api/gigs/${projectId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                } else {
                    throw new Error('Failed to fetch project details');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    return (
        <div>
            {project && (
                <div>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>Posted by: {project.postedBy}</p>
                    {/* Other project details */}
                    {/* Render the ApplicationForm with its own submit button */}
                    <ApplicationForm />
                </div>
            )}
        </div>
    );
};

export default ProjectDetailsPage;
