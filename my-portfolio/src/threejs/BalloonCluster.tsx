import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TubeGeometry, Vector3, CatmullRomCurve3 } from 'three';


type BalloonData = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  initialPosition: THREE.Vector3;
  scatterTarget: THREE.Vector3;
};

const BalloonCluster: React.FC<{
  onInteract: () => void;
  isScattered: boolean;
}> = ({ onInteract, isScattered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const stringRefs = useRef<(THREE.Group | null)[]>([]); 
  const mouseRef = useRef(new THREE.Vector2());
  const { camera, raycaster, size } = useThree();
  const [isInteracting, setIsInteracting] = useState(false);
  const [mouseWorldPosition, setMouseWorldPosition] = useState<THREE.Vector3 | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;

      mouseRef.current.set(x, y);

      const intersectionPoint = new THREE.Vector3();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.setFromCamera(mouseRef.current, camera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);

      setMouseWorldPosition(intersectionPoint);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [camera, raycaster, size]);

  const balloons = useMemo<BalloonData[]>(() => {
    const colors = ['#f87171', '#60a5fa', '#facc15', '#34d399', '#c084fc'];
    return Array.from({ length: 20 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random()*0.5;
      const x = Math.cos(angle) * radius;
      const y = Math.random() * 1.9 - 0.7;
      const z = Math.sin(angle) * radius;

      const position = new THREE.Vector3(x, y, z);
      const scatterTarget = new THREE.Vector3(x * 5, y * 5, z * 5);

      return {
        position: position.clone(),
        initialPosition: position.clone(),
        scatterTarget,
        velocity: new THREE.Vector3(),
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const SPEED = 0.015;

    balloons.forEach((b, i) => {
      if (isScattered) {
        if (b.velocity.length() === 0) {
          b.velocity.set(
            (Math.random() - 0.5),
            (Math.random() - 0.5),
            (Math.random() - 0.5)
          ).normalize().multiplyScalar(SPEED);
        }

        b.position.add(b.velocity);

        const bounds = { x: 6, y: 4, z: 4 };
        if (b.position.x < -bounds.x || b.position.x > bounds.x) {
          b.velocity.x *= -1;
          b.position.x = THREE.MathUtils.clamp(b.position.x, -bounds.x, bounds.x);
        }
        if (b.position.y < -bounds.y || b.position.y > bounds.y) {
          b.velocity.y *= -1;
          b.position.y = THREE.MathUtils.clamp(b.position.y, -bounds.y, bounds.y);
        }
        if (b.position.z < -bounds.z || b.position.z > bounds.z) {
          b.velocity.z *= -1;
          b.position.z = THREE.MathUtils.clamp(b.position.z, -bounds.z, bounds.z);
        }

        b.velocity.setLength(SPEED);
      } else {
        if (mouseWorldPosition) {
          const dist = b.position.distanceTo(mouseWorldPosition);
          if (dist < 0.8) {
            const force = b.position.clone()
              .sub(mouseWorldPosition)
              .normalize()
              .multiplyScalar(0.03);
            b.velocity.add(force);
          }
        }

        b.position.y += Math.sin(t + i) * 0.002;
        b.velocity.multiplyScalar(0.95);
        b.position.add(b.velocity);
      }

      // 🎯 String lean logic
      const stringGroup = stringRefs.current[i];
      if (stringGroup) {
        const maxAngle = 0.4;
        const leanX = THREE.MathUtils.clamp(-b.velocity.y * 20, -maxAngle, maxAngle);
        const leanZ = THREE.MathUtils.clamp(b.velocity.x * 20, -maxAngle, maxAngle);

        stringGroup.rotation.x = THREE.MathUtils.lerp(stringGroup.rotation.x, leanX, 0.1);
        stringGroup.rotation.z = THREE.MathUtils.lerp(stringGroup.rotation.z, leanZ, 0.1);
      }
    });

    if (mouseWorldPosition && !isScattered && !isInteracting) {
      const shouldTrigger = balloons.some(
        (b) => b.position.distanceTo(mouseWorldPosition) < 0.8
      );
      if (shouldTrigger) {
        setIsInteracting(true);
        onInteract();
      }
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, i) => {
        mesh.position.copy(balloons[i].position);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {balloons.map((b, i) => (
        <group key={i}>
          <mesh scale={[1.4, 1.8, 1.4]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.3}
              metalness={0.2}
              transparent
              opacity={1}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>

          <mesh position={[0, -0.35, 0]}>
            <coneGeometry args={[0.03, 0.1, 8]} />
            <meshStandardMaterial
              color={b.color}
              transparent
              opacity={1}
            />
          </mesh>

          <mesh>
  <tubeGeometry
    args={[
      new CatmullRomCurve3([
        new Vector3(0, -0.35, 0),   
        new Vector3(0.05 * Math.sin(i), -0.6, 0.06 * Math.cos(i)), 
        new Vector3(0, -1.05, 0)                  
      ]),
      20,  
      0.005, 
      8,    
      false 
    ]}
  />
  <meshStandardMaterial color="#222" />
</mesh>
        </group>
      ))}
    </group>
  );
};

export default BalloonCluster;


