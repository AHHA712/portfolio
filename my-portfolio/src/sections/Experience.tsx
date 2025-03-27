import React from 'react';

const experiences = [
  {
    role: 'Software Intern',
    company: 'Volia',
    type: 'Internship',
    date: 'Jan 2025 – Present · 3 months',
    location: 'Remote',
    description: [
      'Developed a comprehensive dashboard that enabled seamless tracking and management of over 2,000 transactions, improving the user experience by integrating intuitive search and filter functionalities.',
      'Collaborated closely with backend developers to ensure accurate data integration and real-time updates.',
    ],
    technologies: ['React', 'Dashboard Design', 'API Integration']
  },
  {
    role: 'Software Intern',
    company: 'Dongze Manufacture Inc',
    type: 'Internship',
    date: 'Jun 2024 – Sep 2024 · 4 months',
    location: 'Guangzhou, Guangdong, China · On-site',
    description: [
      'Developed the frontend of an internal management system using React.js and leveraged React component libraries to enhance the user interface aesthetics and usability.',
      'Integrated REST APIs to facilitate communication between the frontend and the backend, enhancing system interoperability and data exchange efficiency.',
      'Formulated a migration plan to move MySQL to AWS RDS, employing AWS DMS and other technologies to achieve a seamless transition. Implemented a dual-write strategy to ensure data integrity during the migration, maintaining 99% system availability throughout the process.',
    ],
    technologies: ['React.js', 'REST APIs', 'AWS RDS', 'MySQL Migration']
  },
];

const Experience: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-8 text-center">Professional Experience</h2>

      <div className="flex flex-col items-center w-full space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`
              ${idx === 0 ? 'bg-green-200' : 'bg-blue-200'} 
              w-full 
              md:w-4/5 
              lg:w-3/4 
              rounded-2xl 
              shadow-md 
              p-6 
              border 
              border-gray-200 
              hover:shadow-lg 
              transition-all 
              duration-300 
              ease-in-out
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-gray-600">
                  {exp.company} · {exp.type}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{exp.date}</p>
                <p className="text-sm text-gray-500">{exp.location}</p>
              </div>
            </div>

            <ul className="pl-5 space-y-2 text-sm text-gray-700 mb-4 list-disc">
              {exp.description.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;