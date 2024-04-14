import React, { useState } from 'react';
// Assuming ProjectDetails and ApplicationForm components are defined

function ProjectApplicationPage() {
  const [projectDetails, setProjectDetails] = useState({
    // Define project details object with title, description, etc.
  });

  return (
    <div className="project-application">
      <ProjectDetails project={projectDetails} />
      <ApplicationForm />
    </div>
  );
}

export default ProjectApplicationPage;
