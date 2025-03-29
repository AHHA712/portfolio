import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import gsap from 'gsap';
import BalloonCluster from '../threejs/BalloonCluster';
import Blackhole from '../threejs/BlackHole';

// Sentences for text animation
const sentences = [
  "Welcome! This is Arnold's portfolio.",
  "I'm a passionate developer & designer.",
  "Feel free to explore around.",
];

// Custom Blackhole Zoom Transition Component
const BlackholeZoomTransition = ({
  entered,
  onTransitionComplete,
}: {
  entered: boolean;
  onTransitionComplete: () => void;
}) => {
  const { camera } = useThree();
  const [transitionProgress, setTransitionProgress] = useState(0);

  useFrame(() => {
    if (entered) {
      // Zoom into the blackhole
      camera.position.z = 8 - transitionProgress * 5;
      camera.position.y = transitionProgress * 1.5;

      setTransitionProgress(prev => {
        const next = prev + 0.01;
        if (next >= 1) onTransitionComplete();
        return Math.min(next, 1);
      });
    }
  });

  return null;
};

// Custom Universe Transition Component
const UniverseTransition = ({ entered, onTransitionComplete }:{
  entered:boolean;
  onTransitionComplete:()=>void;
}) => {
  const { camera } = useThree();
  const [transitionProgress, setTransitionProgress] = useState(0);

  useFrame(() => {
    if (entered) {
      // Continue zooming out into the universe
      camera.position.z = 2 + transitionProgress * 100;
      camera.rotation.x = Math.sin(transitionProgress * 0.5) * 0.1;
      camera.rotation.y = Math.cos(transitionProgress * 0.5) * 0.1;

      setTransitionProgress(prev => {
        const next = prev + 0.005;
        if (next >= 1) onTransitionComplete();
        return Math.min(next, 1);
      });
    }
  });

  return null;
};

const Home: React.FC = () => {
  //const [balloonsVisible, setBalloonsVisible] = useState(true);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isScattered, setIsScattered] = useState(false);
  const [showBlackhole, setShowBlackhole] = useState(false);
  const [enteredPortal, setEnteredPortal] = useState(false);
  const [zoomToBlackhole, setZoomToBlackhole] = useState(false);
  const [universeTransition, setUniverseTransition] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [portalVisible, setPortalVisible] = useState(true);

  const textRef = useRef<HTMLHeadingElement>(null);

  // Animate sentences
  useEffect(() => {
    if (transitionComplete) {
      const el = textRef.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              delay: 2,
              duration: 1.5,
              onComplete: () => {
                setCurrentSentence(prev => (prev + 1) % sentences.length);
              }
            });
          }
        }
      );
    }
  }, [currentSentence, transitionComplete]);

  // Handle interactions
  const handleBalloonInteract = () => {
    setIsScattered(true);
    setTimeout(() => setShowBlackhole(true), 500);
  };

  const handleBlackholeClick = () => {
    setEnteredPortal(true);
    setZoomToBlackhole(true);
    //setBalloonsVisible(false);
    setTimeout(() => setPortalVisible(false), 500);
  };

  const handleBlackholeZoomComplete = () => {
    setZoomToBlackhole(false);
    setUniverseTransition(true);
  };

  const handleUniverseTransitionComplete = () => {
    setUniverseTransition(false);
    setTransitionComplete(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={[enteredPortal ? 'black' : '#e0f7fa']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1} />

        {!transitionComplete && portalVisible && (
          <>
            <BalloonCluster 
              className="balloon-cluster"
              onInteract={handleBalloonInteract} 
              isScattered={isScattered} 
            />

            {showBlackhole && (
              <Blackhole 
                className="blackhole"
                onClick={handleBlackholeClick} 
              />
            )}
          </>
        )}  

        {/* Blackhole Zoom Transition */}
        {zoomToBlackhole && (
          <BlackholeZoomTransition 
            entered={zoomToBlackhole} 
            onTransitionComplete={handleBlackholeZoomComplete} 
          />
        )}

        {/* Universe Transition and Background */}
        {(universeTransition || transitionComplete) && (
          <>
            {universeTransition && (
              <UniverseTransition 
                entered={universeTransition} 
                onTransitionComplete={handleUniverseTransitionComplete} 
              />
            )}
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
          </>
        )}
      </Canvas>

      {/* Overlay Text */}
      {transitionComplete && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50">
          <h1 ref={textRef} className="text-3xl font-bold text-white opacity-0">
            {sentences[currentSentence]}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;