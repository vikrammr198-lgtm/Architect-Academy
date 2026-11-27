import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { Scene3DProps } from './ReverseProxyScene3D';
import {
  ClientNode3D,
  ServerRack3D,
  DatabaseNode3D,
  GatewayNode3D,
  NetworkLink3D,
  AnimatedPacket3D,
} from './ScenePrimitives';

export const CachingScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'cache-miss',
  speed = 1,
}) => {
  const clientPos: [number, number, number] = [-4.8, 0, 0];
  const appPos: [number, number, number] = [-1.0, 0, 0];
  const redisPos: [number, number, number] = [3.2, 1.8, 0];
  const dbPos: [number, number, number] = [3.2, -1.8, 0];

  const isHitMode = activeMode === 'cache-hit';

  let pFrom = clientPos;
  let pTo = appPos;
  let pColor = '#38bdf8';
  let pLabel = 'GET /product/4092';

  if (isHitMode) {
    if (step.step % 2 === 1) {
      pFrom = appPos;
      pTo = redisPos;
      pColor = '#06b6d4';
      pLabel = 'GET item:4092';
    } else {
      pFrom = redisPos;
      pTo = clientPos;
      pColor = '#10b981';
      pLabel = 'CACHE HIT (0.7ms)';
    }
  } else {
    if (step.step === 1) {
      pFrom = clientPos;
      pTo = appPos;
      pColor = '#38bdf8';
      pLabel = 'GET /item/4092';
    } else if (step.step === 2) {
      pFrom = appPos;
      pTo = redisPos;
      pColor = '#f43f5e';
      pLabel = 'CACHE MISS (NIL)';
    } else if (step.step === 3) {
      pFrom = appPos;
      pTo = dbPos;
      pColor = '#f59e0b';
      pLabel = 'SQL SELECT (25ms)';
    } else if (step.step === 4) {
      pFrom = dbPos;
      pTo = redisPos;
      pColor = '#a855f7';
      pLabel = 'Populate Cache (TTL 300s)';
    } else {
      pFrom = redisPos;
      pTo = clientPos;
      pColor = '#10b981';
      pLabel = 'Subsequent HIT (0.8ms)';
    }
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.0, 0]} />

      <ClientNode3D
        id="client-1"
        position={clientPos}
        label="Client Browser"
        sublabel="Requests Product"
        isActive={step.step === 1 || step.step === 5}
        isSelected={selectedComponentId === 'client-1'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="app-server"
        position={appPos}
        label="App Server"
        sublabel="Cache-Aside Orchestrator"
        color="#059669"
        isActive={step.step <= 4}
        isSelected={selectedComponentId === 'app-server'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="redis-cache"
        position={redisPos}
        label="Redis Cluster (RAM)"
        sublabel="~0.8 ms Sub-Millisecond"
        color="#ef4444"
        radius={0.85}
        isActive={isHitMode || step.step === 2 || step.step >= 4}
        isSelected={selectedComponentId === 'redis-cache'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="database"
        position={dbPos}
        label="PostgreSQL (Disk)"
        sublabel="~25 ms Durable Store"
        color="#d97706"
        radius={0.85}
        isActive={!isHitMode && (step.step === 3 || step.step === 4)}
        isSelected={selectedComponentId === 'database'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={clientPos} end={appPos} color="#38bdf8" active={step.step === 1 || step.step === 5} />
      <NetworkLink3D start={appPos} end={redisPos} color="#ef4444" active={isHitMode || step.step === 2 || step.step === 5} />
      <NetworkLink3D start={appPos} end={dbPos} color="#f59e0b" active={!isHitMode && step.step === 3} />
      <NetworkLink3D start={dbPos} end={redisPos} color="#a855f7" active={!isHitMode && step.step === 4} dashed />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.4 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const CacheEvictionScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'lru',
  speed = 1,
}) => {
  const mode = activeMode || 'lru';
  const slots = [
    { id: 'slot-1', x: -3.0, label: 'Key: A', meta: mode === 'lfu' ? 'Hits: 42' : 'Recency: Oldest', color: '#ef4444' },
    { id: 'slot-2', x: -1.0, label: 'Key: B', meta: mode === 'lfu' ? 'Hits: 18' : 'Recency: Mid', color: '#f59e0b' },
    { id: 'slot-3', x: 1.0, label: 'Key: C', meta: mode === 'lfu' ? 'Hits: 91' : 'Recency: Recent', color: '#0284c7' },
    { id: 'slot-4', x: 3.0, label: 'Key: D', meta: 'Incoming New Key', color: '#10b981' },
  ];

  return (
    <group>
      <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -2.5, 0]} />

      {/* Memory Frame Container */}
      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[9.2, 2.8, 0.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>
      {showLabels && (
        <Text position={[0, 1.85, 0]} fontSize={0.24} color="#e2e8f0" anchorX="center">
          {mode.toUpperCase()} Eviction Queue (Max Memory Cap: 3 Slots)
        </Text>
      )}

      {slots.map((s, idx) => {
        const isEvicted = idx === 0 && step.step >= 3;
        return (
          <group
            key={s.id}
            position={[s.x, isEvicted ? -1.4 : 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent(s.id);
            }}
          >
            <mesh castShadow>
              <boxGeometry args={[1.5, 1.6, 0.7]} />
              <meshStandardMaterial
                color={isEvicted ? '#64748b' : s.color}
                metalness={0.65}
                roughness={0.25}
                transparent={isEvicted}
                opacity={isEvicted ? 0.45 : 1}
                emissive={s.color}
                emissiveIntensity={selectedComponentId === s.id ? 0.7 : 0.2}
              />
            </mesh>
            {showLabels && (
              <>
                <Text position={[0, 0.2, 0.45]} fontSize={0.22} color="#ffffff" anchorX="center">
                  {s.label}
                </Text>
                <Text position={[0, -0.25, 0.45]} fontSize={0.14} color="#f1f5f9" anchorX="center">
                  {isEvicted ? 'EVICTED!' : s.meta}
                </Text>
              </>
            )}
          </group>
        );
      })}

      <AnimatedPacket3D
        from={[4.5, 1.4, 0]}
        to={[3.0, 0.2, 0]}
        speed={1.3 * speed}
        color="#10b981"
        label="Insert Key: D"
        showLabels={showLabels}
      />
    </group>
  );
};

export const CdnNetworkScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'edge-hit',
  speed = 1,
}) => {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  const userPos: [number, number, number] = [-4.6, 1.2, 1.2];
  const edgePos: [number, number, number] = [-1.8, 1.5, 1.0];
  const originPos: [number, number, number] = [4.4, -0.5, -1.0];
  const edgeEuPos: [number, number, number] = [1.4, 1.8, 0.8];

  const isMissMode = activeMode === 'edge-miss';

  let pFrom = userPos;
  let pTo = edgePos;
  let pColor = '#38bdf8';
  let pLabel = 'Anycast DNS -> Nearest Edge PoP';

  if (step.step === 1) {
    pFrom = userPos;
    pTo = edgePos;
    pColor = '#38bdf8';
  } else if (step.step === 2) {
    if (isMissMode) {
      pFrom = edgePos;
      pTo = originPos;
      pColor = '#f59e0b';
      pLabel = 'Edge Cache Miss -> Pull from Origin';
    } else {
      pFrom = edgePos;
      pTo = userPos;
      pColor = '#10b981';
      pLabel = 'Edge HIT (11 ms Latency!)';
    }
  } else {
    pFrom = isMissMode ? originPos : edgePos;
    pTo = isMissMode ? edgePos : userPos;
    pColor = '#10b981';
    pLabel = isMissMode ? 'Cache at Edge & Deliver' : 'Streaming 4K Video Chunks';
  }

  return (
    <group>
      {/* Global Wireframe Planet */}
      <mesh ref={globeRef} position={[0, -0.5, -0.5]}>
        <sphereGeometry args={[2.1, 24, 24]} />
        <meshStandardMaterial color="#0369a1" wireframe transparent opacity={0.28} emissive="#0284c7" emissiveIntensity={0.2} />
      </mesh>

      <ClientNode3D
        id="user-geo"
        position={userPos}
        label="End User (Tokyo)"
        sublabel="Browser Video Player"
        isActive={step.step === 1}
        isSelected={selectedComponentId === 'user-geo'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="edge-tokyo"
        position={edgePos}
        label="CDN Edge PoP (Tokyo)"
        sublabel="NVMe Edge Cache • 11ms"
        color="#06b6d4"
        radius={0.75}
        isActive={true}
        isSelected={selectedComponentId === 'edge-tokyo'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="edge-frankfurt"
        position={edgeEuPos}
        label="CDN Edge PoP (EU)"
        sublabel="Anycast Regional Node"
        color="#0284c7"
        radius={0.6}
        isActive={false}
        isSelected={selectedComponentId === 'edge-frankfurt'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="origin-server"
        position={originPos}
        label="Origin Server (US-East)"
        sublabel="Master Assets & S3"
        color="#d97706"
        isActive={isMissMode && step.step >= 2}
        isSelected={selectedComponentId === 'origin-server'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={userPos} end={edgePos} color="#38bdf8" active={true} />
      <NetworkLink3D start={edgePos} end={originPos} color="#f59e0b" active={isMissMode} dashed />
      <NetworkLink3D start={edgeEuPos} end={originPos} color="#475569" dashed />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.4 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};
