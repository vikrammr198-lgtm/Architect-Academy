import React from 'react';
import { Text } from '@react-three/drei';
import { Scene3DProps } from './ReverseProxyScene3D';
import {
  ClientNode3D,
  GatewayNode3D,
  DatabaseNode3D,
  NetworkLink3D,
  AnimatedPacket3D,
} from './ScenePrimitives';

export const DatabaseShardingScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'hash-sharding',
  speed = 1,
}) => {
  const appPos: [number, number, number] = [-4.6, 0, 0];
  const routerPos: [number, number, number] = [-0.8, 0, 0];
  const shard1: [number, number, number] = [3.8, 2.1, 0];
  const shard2: [number, number, number] = [3.8, 0, 0];
  const shard3: [number, number, number] = [3.8, -2.1, 0];

  const isRangeMode = activeMode === 'range-sharding';

  let pFrom = appPos;
  let pTo = routerPos;
  let pColor = '#38bdf8';
  let pLabel = isRangeMode ? 'Query user_id=2,450,000' : 'Query hash(user_id=9821) % 3';

  if (step.step === 1) {
    pFrom = appPos;
    pTo = routerPos;
    pColor = '#38bdf8';
  } else if (step.step === 2) {
    pFrom = routerPos;
    pTo = shard2;
    pColor = '#10b981';
    pLabel = isRangeMode ? 'Range [1M-3M] -> Shard 2' : 'Hash Mod 1 -> Shard 2';
  } else if (step.step === 3) {
    pFrom = routerPos;
    pTo = shard1;
    pColor = '#f59e0b';
    pLabel = isRangeMode ? 'Range [0-1M] -> Shard 1' : 'Hash Mod 0 -> Shard 1';
  } else {
    pFrom = shard2;
    pTo = appPos;
    pColor = '#a855f7';
    pLabel = 'Row Result (12ms)';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.2, 0]} />

      <ClientNode3D
        id="app-client"
        position={appPos}
        label="Application Service"
        sublabel="SQL / ORM Query"
        isActive={step.activeNodes.includes('app-client')}
        isSelected={selectedComponentId === 'app-client'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="shard-router"
        position={routerPos}
        label="Shard Router / Coordinator"
        sublabel={isRangeMode ? 'Range Key Lookup' : 'Consistent Hash Modulo'}
        color="#7c3aed"
        isActive={step.activeNodes.includes('shard-router')}
        isSelected={selectedComponentId === 'shard-router'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="shard-1"
        position={shard1}
        label={isRangeMode ? 'Shard 1 (IDs 1-1M)' : 'Shard 1 (Hash % 3 == 0)'}
        sublabel="Node East-A • 420 GB"
        color="#0284c7"
        radius={0.7}
        isActive={step.step === 3}
        isSelected={selectedComponentId === 'shard-1'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="shard-2"
        position={shard2}
        label={isRangeMode ? 'Shard 2 (IDs 1M-3M)' : 'Shard 2 (Hash % 3 == 1)'}
        sublabel="Node East-B • 415 GB"
        color="#059669"
        radius={0.7}
        isActive={step.step === 2 || step.step === 4}
        isSelected={selectedComponentId === 'shard-2'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="shard-3"
        position={shard3}
        label={isRangeMode ? 'Shard 3 (IDs 3M+)' : 'Shard 3 (Hash % 3 == 2)'}
        sublabel="Node West-C • 418 GB"
        color="#d97706"
        radius={0.7}
        isActive={false}
        isSelected={selectedComponentId === 'shard-3'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Partition Data Blocks beside each shard */}
      {[
        { pos: shard1, color: '#38bdf8' },
        { pos: shard2, color: '#34d399' },
        { pos: shard3, color: '#fbbf24' },
      ].map((s, idx) => (
        <group key={idx} position={[5.4, s.pos[1], 0]}>
          {[-0.35, 0, 0.35].map((zOff, i) => (
            <mesh key={i} position={[0, 0, zOff]}>
              <boxGeometry args={[0.25, 0.25, 0.25]} />
              <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.4} />
            </mesh>
          ))}
        </group>
      ))}
      {showLabels && (
        <Text position={[5.4, 2.9, 0]} fontSize={0.16} color="#94a3b8" anchorX="center">
          Partitioned Rows
        </Text>
      )}

      <NetworkLink3D start={appPos} end={routerPos} color="#38bdf8" active={step.step === 1} />
      <NetworkLink3D start={routerPos} end={shard1} color="#0284c7" active={step.step === 3} />
      <NetworkLink3D start={routerPos} end={shard2} color="#10b981" active={step.step === 2 || step.step === 4} />
      <NetworkLink3D start={routerPos} end={shard3} color="#d97706" active={false} />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.4 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const DatabaseReplicationScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'async-replication',
  speed = 1,
}) => {
  const writeClient: [number, number, number] = [-4.8, 1.5, 0];
  const readClient: [number, number, number] = [-4.8, -1.5, 0];
  const primaryDb: [number, number, number] = [-0.4, 1.2, 0];
  const replica1: [number, number, number] = [4.0, 2.0, 0];
  const replica2: [number, number, number] = [4.0, 0, 0];
  const replica3: [number, number, number] = [4.0, -2.0, 0];

  const isSyncMode = activeMode === 'sync-replication';

  let pFrom = writeClient;
  let pTo = primaryDb;
  let pColor = '#f59e0b';
  let pLabel = 'INSERT INTO orders';

  if (step.step === 1) {
    pFrom = writeClient;
    pTo = primaryDb;
    pColor = '#f59e0b';
    pLabel = 'Write Operation (Primary)';
  } else if (step.step === 2) {
    pFrom = primaryDb;
    pTo = replica1;
    pColor = '#a855f7';
    pLabel = isSyncMode ? 'Sync WAL Commit (Wait ACK)' : 'Async WAL Stream (Lag ~15ms)';
  } else if (step.step === 3) {
    pFrom = primaryDb;
    pTo = replica2;
    pColor = '#a855f7';
    pLabel = 'Replicate Binlog -> Replica 2';
  } else {
    pFrom = readClient;
    pTo = replica3;
    pColor = '#10b981';
    pLabel = 'SELECT * (Read Replica)';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.1, 0]} />

      <ClientNode3D
        id="write-client"
        position={writeClient}
        label="Write Service (POST)"
        sublabel="Mutations Only"
        color="#d97706"
        isActive={step.step === 1}
        isSelected={selectedComponentId === 'write-client'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ClientNode3D
        id="read-client"
        position={readClient}
        label="Read Service (GET)"
        sublabel="Analytics & Feeds"
        color="#0284c7"
        isActive={step.step >= 4}
        isSelected={selectedComponentId === 'read-client'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="primary-db"
        position={primaryDb}
        label="Primary Master DB"
        sublabel="Read + Write Leader"
        color="#eab308"
        radius={0.9}
        isActive={step.step <= 3}
        isSelected={selectedComponentId === 'primary-db'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="replica-1"
        position={replica1}
        label="Read Replica 01"
        sublabel={isSyncMode ? 'Sync Follower' : 'Async Follower'}
        color="#059669"
        radius={0.68}
        isActive={step.step === 2}
        isSelected={selectedComponentId === 'replica-1'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="replica-2"
        position={replica2}
        label="Read Replica 02"
        sublabel="WAL Stream Receiver"
        color="#059669"
        radius={0.68}
        isActive={step.step === 3}
        isSelected={selectedComponentId === 'replica-2'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <DatabaseNode3D
        id="replica-3"
        position={replica3}
        label="Read Replica 03"
        sublabel="Serves Read Queries"
        color="#0284c7"
        radius={0.68}
        isActive={step.step >= 4}
        isSelected={selectedComponentId === 'replica-3'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={writeClient} end={primaryDb} color="#f59e0b" active={step.step === 1} />
      <NetworkLink3D start={primaryDb} end={replica1} color="#a855f7" active={step.step === 2} dashed={!isSyncMode} />
      <NetworkLink3D start={primaryDb} end={replica2} color="#a855f7" active={step.step === 3} dashed={!isSyncMode} />
      <NetworkLink3D start={primaryDb} end={replica3} color="#a855f7" active={false} dashed={!isSyncMode} />
      <NetworkLink3D start={readClient} end={replica3} color="#10b981" active={step.step >= 4} />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.3 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};
