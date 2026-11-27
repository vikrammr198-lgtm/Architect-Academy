import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export interface NodeBaseProps {
  id: string;
  position: [number, number, number];
  label: string;
  sublabel?: string;
  color?: string;
  isActive?: boolean;
  isSelected?: boolean;
  showLabels?: boolean;
  onSelect: (id: string) => void;
}

const usePointerCursor = () => {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    onPointerOver: (e: any) => {
      e.stopPropagation();
      setHovered(true);
      document.body.style.cursor = 'pointer';
    },
    onPointerOut: () => {
      setHovered(false);
      document.body.style.cursor = 'auto';
    },
  };
};

/** 3D Server Rack Node */
export const ServerRack3D: React.FC<NodeBaseProps & { size?: [number, number, number]; ledColor?: string }> = ({
  id,
  position,
  label,
  sublabel,
  color = '#059669',
  ledColor = '#34d399',
  isActive = false,
  isSelected = false,
  showLabels = true,
  size = [1.4, 1.8, 0.9],
  onSelect,
}) => {
  const { hovered, onPointerOver, onPointerOut } = usePointerCursor();
  const active = isActive || isSelected || hovered;

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Main Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          metalness={0.75}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={active ? 0.65 : 0.15}
        />
      </mesh>
      {/* Rack Bay Slots */}
      {[-0.4, 0, 0.4].map((yOff, idx) => (
        <mesh key={idx} position={[0, yOff, size[2] / 2 + 0.02]}>
          <boxGeometry args={[size[0] * 0.78, 0.2, 0.02]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Status LED */}
      <mesh position={[size[0] * 0.3, size[1] * 0.35, size[2] / 2 + 0.03]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={active ? 2.5 : 1.2} />
      </mesh>
      {/* Selection Wireframe Halo */}
      {(isSelected || isActive) && (
        <mesh>
          <boxGeometry args={[size[0] + 0.14, size[1] + 0.14, size[2] + 0.14]} />
          <meshBasicMaterial color={ledColor} wireframe transparent opacity={isSelected ? 0.8 : 0.35} />
        </mesh>
      )}
      {showLabels && (
        <>
          <Text position={[0, size[1] / 2 + 0.35, 0]} fontSize={0.22} color="#f8fafc" anchorX="center">
            {label}
          </Text>
          {sublabel && (
            <Text position={[0, -size[1] / 2 - 0.3, 0]} fontSize={0.16} color="#94a3b8" anchorX="center">
              {sublabel}
            </Text>
          )}
        </>
      )}
    </group>
  );
};

/** 3D Client Workstation / Device Node */
export const ClientNode3D: React.FC<NodeBaseProps> = ({
  id,
  position,
  label,
  sublabel,
  color = '#0284c7',
  isActive = false,
  isSelected = false,
  showLabels = true,
  onSelect,
}) => {
  const { hovered, onPointerOver, onPointerOut } = usePointerCursor();
  const active = isActive || isSelected || hovered;

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Monitor Screen */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.35, 0.9, 0.12]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={active ? 0.7 : 0.2}
        />
      </mesh>
      {/* Stand & Base */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.3, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.45, 0.05]}>
        <boxGeometry args={[0.7, 0.06, 0.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} />
      </mesh>
      {(isSelected || isActive) && (
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.48, 1.02, 0.22]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.5} />
        </mesh>
      )}
      {showLabels && (
        <>
          <Text position={[0, 0.95, 0]} fontSize={0.21} color="#bae6fd" anchorX="center">
            {label}
          </Text>
          {sublabel && (
            <Text position={[0, -0.78, 0]} fontSize={0.15} color="#7dd3fc" anchorX="center">
              {sublabel}
            </Text>
          )}
        </>
      )}
    </group>
  );
};

/** 3D Database Cylinder Stack */
export const DatabaseNode3D: React.FC<NodeBaseProps & { radius?: number }> = ({
  id,
  position,
  label,
  sublabel,
  color = '#d97706',
  radius = 0.75,
  isActive = false,
  isSelected = false,
  showLabels = true,
  onSelect,
}) => {
  const { hovered, onPointerOver, onPointerOut } = usePointerCursor();
  const active = isActive || isSelected || hovered;

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {[-0.38, 0, 0.38].map((yOff, idx) => (
        <mesh key={idx} position={[0, yOff, 0]} castShadow>
          <cylinderGeometry args={[radius, radius, 0.28, 28]} />
          <meshStandardMaterial
            color={color}
            metalness={0.65}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={active ? 0.65 : 0.18}
          />
        </mesh>
      ))}
      {(isSelected || isActive) && (
        <mesh>
          <cylinderGeometry args={[radius + 0.1, radius + 0.1, 1.2, 16]} />
          <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.45} />
        </mesh>
      )}
      {showLabels && (
        <>
          <Text position={[0, 0.92, 0]} fontSize={0.21} color="#fef3c7" anchorX="center">
            {label}
          </Text>
          {sublabel && (
            <Text position={[0, -0.96, 0]} fontSize={0.15} color="#fcd34d" anchorX="center">
              {sublabel}
            </Text>
          )}
        </>
      )}
    </group>
  );
};

/** 3D Gateway / Router / Proxy Hexagonal Core */
export const GatewayNode3D: React.FC<NodeBaseProps & { radius?: number }> = ({
  id,
  position,
  label,
  sublabel,
  color = '#7c3aed',
  radius = 1.0,
  isActive = false,
  isSelected = false,
  showLabels = true,
  onSelect,
}) => {
  const { hovered, onPointerOver, onPointerOut } = usePointerCursor();
  const active = isActive || isSelected || hovered;
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (active ? 1.2 : 0.35);
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, 1.3, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={active ? 0.75 : 0.25}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 0.25, 0.04, 12, 36]} />
        <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={active ? 1.5 : 0.4} />
      </mesh>
      {showLabels && (
        <>
          <Text position={[0, 1.1, 0]} fontSize={0.22} color="#f3e8ff" anchorX="center">
            {label}
          </Text>
          {sublabel && (
            <Text position={[0, -1.05, 0]} fontSize={0.16} color="#d8b4fe" anchorX="center">
              {sublabel}
            </Text>
          )}
        </>
      )}
    </group>
  );
};

/** Connecting Conduit Line between two 3D points */
export const NetworkLink3D: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  active?: boolean;
  dashed?: boolean;
}> = ({ start, end, color = '#334155', active = false, dashed = false }) => {
  return (
    <Line
      points={[start, end]}
      color={active ? color : '#334155'}
      lineWidth={active ? 2.5 : 1.2}
      dashed={dashed}
      dashSize={0.25}
      gapSize={0.15}
      transparent
      opacity={active ? 0.95 : 0.55}
    />
  );
};

/** Animated Traveling Packet Sphere between two 3D coordinates */
export const AnimatedPacket3D: React.FC<{
  from: [number, number, number];
  to: [number, number, number];
  speed?: number;
  color?: string;
  label?: string;
  showLabels?: boolean;
}> = ({ from, to, speed = 1.4, color = '#38bdf8', label, showLabels = true }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.getElapsedTime() * speed) % 1;
    groupRef.current.position.set(
      THREE.MathUtils.lerp(from[0], to[0], t),
      THREE.MathUtils.lerp(from[1], to[1], t) + Math.sin(t * Math.PI) * 0.25,
      THREE.MathUtils.lerp(from[2], to[2], t)
    );
  });

  return (
    <group ref={groupRef} position={from}>
      <mesh>
        <sphereGeometry args={[0.17, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
      </mesh>
      <pointLight color={color} intensity={1.8} distance={2.2} />
      {showLabels && label && (
        <Text position={[0, 0.35, 0]} fontSize={0.16} color="#ffffff" anchorX="center" outlineWidth={0.02} outlineColor="#000000">
          {label}
        </Text>
      )}
    </group>
  );
};
