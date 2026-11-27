import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { AnimationStep } from '../types';
import {
  ClientNode3D,
  GatewayNode3D,
  ServerRack3D,
  DatabaseNode3D,
  NetworkLink3D,
  AnimatedPacket3D,
} from './ScenePrimitives';

export interface Scene3DProps {
  step: AnimationStep;
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  showLabels: boolean;
  activeMode?: string;
  speed?: number;
  variant?: string;
}

export const ReverseProxyScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'reverse-proxy',
  speed = 1,
}) => {
  const shieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
    }
  });

  const isActive = (id: string) => step.activeNodes.includes(id);
  const isCacheHitMode = activeMode === 'cache-hit';
  const isForwardCompare = activeMode === 'forward-proxy';

  // Coordinates
  const clientPos1: [number, number, number] = [-5.0, 1.1, 0];
  const clientPos2: [number, number, number] = [-5.0, -1.1, 0];
  const proxyPos: [number, number, number] = [-0.6, 0, 0];
  const cachePos: [number, number, number] = [-0.6, 2.65, 0];
  const app1Pos: [number, number, number] = [3.6, 1.3, 0];
  const app2Pos: [number, number, number] = [3.6, -1.3, 0];
  const dbPos: [number, number, number] = [6.2, 0, 0];

  // Dynamic packet target based on step & activeMode
  let packetFrom = clientPos1;
  let packetTo = proxyPos;
  let packetColor = '#38bdf8';
  let packetLabel = step.packet?.label || 'HTTPS GET';

  if (isCacheHitMode) {
    if (step.step % 2 === 1) {
      packetFrom = clientPos1;
      packetTo = proxyPos;
      packetColor = '#38bdf8';
      packetLabel = 'GET /logo.png';
    } else {
      packetFrom = proxyPos;
      packetTo = clientPos1;
      packetColor = '#10b981';
      packetLabel = '200 OK (X-Cache: HIT)';
    }
  } else if (step.step === 1) {
    packetFrom = clientPos1;
    packetTo = proxyPos;
    packetColor = '#38bdf8';
  } else if (step.step === 2) {
    packetFrom = clientPos2;
    packetTo = proxyPos;
    packetColor = '#c084fc';
    packetLabel = 'TLS 1.3 Termination';
  } else if (step.step === 3) {
    packetFrom = proxyPos;
    packetTo = cachePos;
    packetColor = '#06b6d4';
  } else if (step.step === 4) {
    packetFrom = proxyPos;
    packetTo = app2Pos;
    packetColor = '#34d399';
  } else if (step.step === 5) {
    packetFrom = app2Pos;
    packetTo = dbPos;
    packetColor = '#f59e0b';
  } else {
    packetFrom = proxyPos;
    packetTo = clientPos1;
    packetColor = '#10b981';
  }

  return (
    <group>
      <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0.5, -2.7, 0]} />

      {/* Public Clients */}
      <ClientNode3D
        id="client-devices"
        position={clientPos1}
        label={isForwardCompare ? 'Masked Client' : 'Web Browser'}
        sublabel="Public IP: 203.0.113.5"
        isActive={isActive('client-1') || isActive('client-devices')}
        isSelected={selectedComponentId === 'client-devices'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ClientNode3D
        id="client-devices"
        position={clientPos2}
        label="Mobile App"
        sublabel="TLS 1.3 Client"
        isActive={isActive('client-2')}
        isSelected={selectedComponentId === 'client-devices'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* DMZ / Security Barrier Shield */}
      <mesh ref={shieldRef} position={[1.65, 0, 0]}>
        <boxGeometry args={[0.08, 4.4, 4.0]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.14} emissive="#7c3aed" emissiveIntensity={0.4} />
      </mesh>
      {showLabels && (
        <Text position={[1.65, -2.55, 0]} fontSize={0.17} color="#c4b5fd" anchorX="center">
          Private VPC Shield (Backend IPs Hidden)
        </Text>
      )}

      {/* Reverse Proxy Gateway */}
      <GatewayNode3D
        id="reverse-proxy"
        position={proxyPos}
        label={isForwardCompare ? 'Forward Proxy' : 'Nginx Reverse Proxy'}
        sublabel={isForwardCompare ? 'Protects Client Identity' : 'SSL Offload • WAF • Route'}
        color="#7c3aed"
        isActive={isActive('reverse-proxy')}
        isSelected={selectedComponentId === 'reverse-proxy'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Proxy Cache Layer */}
      <DatabaseNode3D
        id="cache-layer"
        position={cachePos}
        label="Proxy Cache (NVMe/RAM)"
        sublabel="Static + Micro-Cache"
        color="#06b6d4"
        radius={0.6}
        isActive={isActive('cache-layer') || isCacheHitMode}
        isSelected={selectedComponentId === 'cache-layer'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Private Upstream App Servers */}
      <ServerRack3D
        id="app-servers"
        position={app1Pos}
        label="App Worker 01"
        sublabel="10.0.1.14 (Private)"
        color="#059669"
        isActive={isActive('app-server-1')}
        isSelected={selectedComponentId === 'app-servers'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="app-servers"
        position={app2Pos}
        label="App Worker 02"
        sublabel="10.0.1.15 (Private)"
        color="#059669"
        isActive={isActive('app-server-2') || isActive('app-servers')}
        isSelected={selectedComponentId === 'app-servers'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Primary Database */}
      <DatabaseNode3D
        id="database"
        position={dbPos}
        label="Primary Database"
        sublabel="PostgreSQL Cluster"
        color="#d97706"
        isActive={isActive('database')}
        isSelected={selectedComponentId === 'database'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Network Links */}
      <NetworkLink3D start={clientPos1} end={proxyPos} color="#38bdf8" active={step.step === 1 || step.step === 6} />
      <NetworkLink3D start={clientPos2} end={proxyPos} color="#c084fc" active={step.step === 2} />
      <NetworkLink3D start={proxyPos} end={cachePos} color="#06b6d4" active={step.step === 3 || isCacheHitMode} dashed />
      <NetworkLink3D start={proxyPos} end={app1Pos} color="#10b981" active={false} />
      <NetworkLink3D start={proxyPos} end={app2Pos} color="#10b981" active={step.step === 4} />
      <NetworkLink3D start={app1Pos} end={dbPos} color="#f59e0b" active={false} />
      <NetworkLink3D start={app2Pos} end={dbPos} color="#f59e0b" active={step.step === 5} />

      {/* Animated Packet */}
      <AnimatedPacket3D
        from={packetFrom}
        to={packetTo}
        speed={1.3 * speed}
        color={packetColor}
        label={packetLabel}
        showLabels={showLabels}
      />
    </group>
  );
};
