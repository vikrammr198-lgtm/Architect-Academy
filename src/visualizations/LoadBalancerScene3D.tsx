import React from 'react';
import { Text } from '@react-three/drei';
import { Scene3DProps } from './ReverseProxyScene3D';
import {
  ClientNode3D,
  GatewayNode3D,
  ServerRack3D,
  NetworkLink3D,
  AnimatedPacket3D,
} from './ScenePrimitives';

export const LoadBalancerScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'least-connections',
  speed = 1,
}) => {
  const client1: [number, number, number] = [-4.8, 1.3, 0];
  const client2: [number, number, number] = [-4.8, -1.3, 0];
  const lbPos: [number, number, number] = [-0.4, 0, 0];
  const srvA: [number, number, number] = [4.0, 2.0, 0];
  const srvB: [number, number, number] = [4.0, 0, 0];
  const srvC: [number, number, number] = [4.0, -2.0, 0];

  // Pick destination server based on selected algorithm mode!
  let targetServer = srvB;
  let targetLabel = 'Server B (12 conn)';
  let modeLabel = 'Least Connections';
  if (activeMode === 'round-robin') {
    modeLabel = 'Round Robin (Sequential)';
    const idx = step.step % 3;
    if (idx === 1) {
      targetServer = srvA;
      targetLabel = 'RR Turn #1 -> Server A';
    } else if (idx === 2) {
      targetServer = srvB;
      targetLabel = 'RR Turn #2 -> Server B';
    } else {
      targetServer = srvC;
      targetLabel = 'RR Turn #3 -> Server C';
    }
  } else if (activeMode === 'ip-hash') {
    modeLabel = 'IP Hash (Consistent Pinning)';
    targetServer = srvA;
    targetLabel = 'hash(203.0.113.5) -> Server A';
  }

  let pFrom = client1;
  let pTo = lbPos;
  let pColor = '#38bdf8';
  let pText = step.packet?.label || 'HTTP Request';

  if (step.step === 1) {
    pFrom = client1;
    pTo = lbPos;
    pColor = '#38bdf8';
  } else if (step.step === 2) {
    pFrom = client2;
    pTo = lbPos;
    pColor = '#a855f7';
    pText = modeLabel;
  } else if (step.step === 3) {
    pFrom = lbPos;
    pTo = targetServer;
    pColor = '#10b981';
    pText = targetLabel;
  } else {
    pFrom = targetServer;
    pTo = client1;
    pColor = '#34d399';
    pText = '200 OK Response';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.1, 0]} />

      <ClientNode3D
        id="client-1"
        position={client1}
        label="Client Pool A"
        sublabel="HTTP/2 Traffic"
        isActive={step.activeNodes.includes('client-1')}
        isSelected={selectedComponentId === 'client-1'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ClientNode3D
        id="client-2"
        position={client2}
        label="Client Pool B"
        sublabel="Mobile API"
        isActive={step.activeNodes.includes('client-2')}
        isSelected={selectedComponentId === 'client-2'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="load-balancer"
        position={lbPos}
        label="Load Balancer"
        sublabel={modeLabel}
        color="#7e22ce"
        isActive={step.activeNodes.includes('load-balancer')}
        isSelected={selectedComponentId === 'load-balancer'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Server A + Visual Load Meter */}
      <ServerRack3D
        id="server-a"
        position={srvA}
        label="Server A (45 conn)"
        sublabel="CPU 68% • Healthy"
        color="#d97706"
        ledColor="#10b981"
        size={[1.4, 1.2, 0.8]}
        isActive={targetServer === srvA && step.step >= 3}
        isSelected={selectedComponentId === 'server-a'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Server B (Lowest load) */}
      <ServerRack3D
        id="server-b"
        position={srvB}
        label="Server B (12 conn)"
        sublabel="CPU 19% • Optimal ★"
        color="#059669"
        ledColor="#34d399"
        size={[1.4, 1.2, 0.8]}
        isActive={targetServer === srvB && step.step >= 3}
        isSelected={selectedComponentId === 'server-b'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Server C */}
      <ServerRack3D
        id="server-c"
        position={srvC}
        label="Server C (50 conn)"
        sublabel="CPU 74% • Healthy"
        color="#d97706"
        ledColor="#10b981"
        size={[1.4, 1.2, 0.8]}
        isActive={targetServer === srvC && step.step >= 3}
        isSelected={selectedComponentId === 'server-c'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* 3D Load Bars next to servers */}
      {[
        { pos: srvA, load: 0.7, color: '#f59e0b' },
        { pos: srvB, load: 0.22, color: '#10b981' },
        { pos: srvC, load: 0.82, color: '#ef4444' },
      ].map((bar, i) => (
        <group key={i} position={[5.3, bar.pos[1], 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.22, 1.0, 0.22]} />
            <meshStandardMaterial color="#1e293b" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0, -0.5 + bar.load * 0.5, 0]}>
            <boxGeometry args={[0.24, bar.load, 0.24]} />
            <meshStandardMaterial color={bar.color} emissive={bar.color} emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
      {showLabels && (
        <Text position={[5.3, 2.9, 0]} fontSize={0.16} color="#94a3b8" anchorX="center">
          Active Load
        </Text>
      )}

      {/* Links */}
      <NetworkLink3D start={client1} end={lbPos} color="#38bdf8" active={step.step === 1} />
      <NetworkLink3D start={client2} end={lbPos} color="#a855f7" active={step.step === 2} />
      <NetworkLink3D start={lbPos} end={srvA} color="#10b981" active={targetServer === srvA && step.step >= 3} />
      <NetworkLink3D start={lbPos} end={srvB} color="#10b981" active={targetServer === srvB && step.step >= 3} />
      <NetworkLink3D start={lbPos} end={srvC} color="#10b981" active={targetServer === srvC && step.step >= 3} />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.4 * speed} color={pColor} label={pText} showLabels={showLabels} />
    </group>
  );
};
