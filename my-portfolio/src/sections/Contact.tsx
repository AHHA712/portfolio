import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const RotatingGlobe = () => {
    const globeRef = useRef<any>(null);
  
    useFrame(() => {
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.003; // speed of rotation
      }
    });
  
    return (
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#2dd4bf" wireframe />
      </mesh>
    );
  };

const Contact: React.FC = () => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />

          <RotatingGlobe />

          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* Overlay Contact Info */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center space-y-10 px-6">
        <h1 className="text-xl sm:text-2xl font-semibold max-w-xl">
          Here are my contact info, feel free to check it out!
        </h1>

        <div className="flex gap-8 text-4xl">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/a_rn_old/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition duration-200"
          >
            <FaInstagram />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/arnold-he-4a305519b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-200"
          >
            <FaLinkedin />
          </a>

          {/* Email */}
          <div className="relative">
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="hover:text-amber-400 transition duration-200 bg-transparent p-0 border-none outline-none"
            >
              <MdEmail />
            </button>

            {showEmail && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200 z-20">
                arnoldhe712@gmail.com
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
