import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import portalTexture from '../assets/portal.png'; // adjust path if needed

const Blackhole: React.FC<{ onClick: () => void; className?: string}> = ({ onClick, className }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Load the texture
  const texture = useLoader(THREE.TextureLoader, portalTexture);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.2;

      const scale = 1 + (isHovered ? 0.2 : 0);
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh
      name={className}
      ref={ref}
      onClick={onClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <circleGeometry args={[1.5, 128]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

export default Blackhole;
