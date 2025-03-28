import React from 'react';
import laundryImg from '../assets/Laundry_Image.png';
import cafeImg from '../assets/Cafe_Image.png';
import YAEWImg from '../assets/YAEW_Image.png'

const projects = [
  {
    name: 'YAEW',
    description: 'BioQuest is a mobile app available for iOS and Android that revolutionizes outdoor exploration.',
    repoUrl: 'https://github.com/AHHA712/YAEW',
    imageUrl: YAEWImg,
  },
  {
    name: 'Cafe Hopper',
    description: 'An app that helps users discover and keep track of cafes they’ve visited or want to try.',
    repoUrl: 'https://github.com/AHHA712/Cafe-Hopper',
    imageUrl: cafeImg, // using imported local image
  },
  {
    name: 'Laundry Room Maintenance Portal',
    description: 'Portal for managing laundry room maintenance and reporting service requests.',
    repoUrl: 'https://github.com/AHHA712/Laundry-Room-Maintenance-Portal',
    imageUrl: laundryImg, // using imported local image
  },
];

const Projects: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#e3f1f4',
            }}
          >
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={project.imageUrl}
                alt={`${project.name} Preview`}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              />
            </a>
            <div>
              <h3 style={{ margin: '0 0 0.5rem' }}>{project.name}</h3>
              <p style={{ margin: 0 }}>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
