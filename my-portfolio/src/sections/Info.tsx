const Info: React.FC = () => {
    return (
      <section className="max-w-4xl mx-auto px-6 py-12 text-left text-gray-800">
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-2">
          Activities & Skills
        </h2>
        <hr className="border-t border-gray-400 mb-6" />
  
        <div className="space-y-4 text-[1rem] leading-relaxed">
          <p>
            <span className="font-semibold">Prizes:</span>{' '}
            UCLA HOTH Best Web Winner.
          </p>
  
          <p>
            <span className="font-semibold">Programming Languages:</span>{' '}
            Python, C++, HTML/CSS, JavaScript, R
          </p>
  
          <p>
            <span className="font-semibold">Tools:</span>{' '}
            REST APIs, Git, React, React Native, Flask, Emacs, MongoDB, AWS
          </p>
        </div>
      </section>
    );
  };
  
  export default Info;
  