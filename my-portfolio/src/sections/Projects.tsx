import React from 'react';
import portalImg from '../assets/portal.png'; // adjust the path if needed

const Projects: React.FC = () => (
  <div>
    <h1>Projects Page</h1>
    <img src={portalImg} alt="Portal" style={{ width: '200px', height: '200px' }} />
  </div>
);

export default Projects;