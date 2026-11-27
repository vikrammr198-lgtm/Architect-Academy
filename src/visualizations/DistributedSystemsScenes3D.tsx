import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { Scene3DProps } from './ReverseProxyScene3D';
import {
  ClientNode3D,
  GatewayNode3D,
  ServerRack3D,
  DatabaseNode3D,
  NetworkLink3D,
  AnimatedPacket3D,
} from './ScenePrimitives';

export const ApiGatewayScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'authorized',
  speed = 1,
}) => {
  const clientPos: [number, number, number] = [-4.8, 0, 0];
  const gwPos: [number, number, number] = [-0.8, 0, 0];
  const authPos: [number, number, number] = [-0.8, 2.3, 0];
  const svcUsers: [number, number, number] = [3.8, 1.8, 0];
  const svcOrders: [number, number, number] = [3.8, 0, 0];
  const svcPay: [number, number, number] = [3.8, -1.8, 0];

  const isRateLimited = activeMode === 'rate-limited';

  let pFrom = clientPos;
  let pTo = gwPos;
  let pColor = '#38bdf8';
  let pLabel = 'GET /api/v1/orders [JWT]';

  if (isRateLimited) {
    pFrom = step.step % 2 === 1 ? clientPos : gwPos;
    pTo = step.step % 2 === 1 ? gwPos : clientPos;
    pColor = '#ef4444';
    pLabel = step.step % 2 === 1 ? 'Flood Burst (>100 req/s)' : '429 Too Many Requests!';
  } else if (step.step === 2) {
    pFrom = gwPos;
    pTo = authPos;
    pColor = '#a855f7';
    pLabel = 'Verify JWT & Token Bucket';
  } else if (step.step >= 3) {
    pFrom = gwPos;
    pTo = svcOrders;
    pColor = '#10b981';
    pLabel = 'Route -> Order Service';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.0, 0]} />

      <ClientNode3D
        id="api-client"
        position={clientPos}
        label="Mobile / Web Clients"
        sublabel="REST / GraphQL"
        isActive={true}
        isSelected={selectedComponentId === 'api-client'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="api-gateway"
        position={gwPos}
        label="API Gateway"
        sublabel={isRateLimited ? 'Token Bucket: EMPTY (429)' : 'Route • Rate Limit • Transform'}
        color={isRateLimited ? '#dc2626' : '#7c3aed'}
        isActive={true}
        isSelected={selectedComponentId === 'api-gateway'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="auth-service"
        position={authPos}
        label="Auth & Rate Limiter"
        sublabel="JWT + Redis Token Bucket"
        color="#0284c7"
        size={[1.4, 1.0, 0.7]}
        isActive={step.step === 2}
        isSelected={selectedComponentId === 'auth-service'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="svc-users"
        position={svcUsers}
        label="User Service"
        sublabel="/api/users"
        color="#059669"
        size={[1.4, 1.0, 0.7]}
        isActive={false}
        isSelected={selectedComponentId === 'svc-users'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="svc-orders"
        position={svcOrders}
        label="Order Service"
        sublabel="/api/orders"
        color="#059669"
        size={[1.4, 1.0, 0.7]}
        isActive={!isRateLimited && step.step >= 3}
        isSelected={selectedComponentId === 'svc-orders'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="svc-payments"
        position={svcPay}
        label="Payment Service"
        sublabel="/api/payments"
        color="#d97706"
        size={[1.4, 1.0, 0.7]}
        isActive={false}
        isSelected={selectedComponentId === 'svc-payments'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={clientPos} end={gwPos} color={isRateLimited ? '#ef4444' : '#38bdf8'} active={true} />
      <NetworkLink3D start={gwPos} end={authPos} color="#a855f7" active={step.step === 2} dashed />
      <NetworkLink3D start={gwPos} end={svcUsers} color="#10b981" />
      <NetworkLink3D start={gwPos} end={svcOrders} color="#10b981" active={!isRateLimited && step.step >= 3} />
      <NetworkLink3D start={gwPos} end={svcPay} color="#10b981" />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.5 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const MicroservicesScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  speed = 1,
}) => {
  const gwPos: [number, number, number] = [-4.6, 0, 0];
  const userSvc: [number, number, number] = [-0.5, 2.0, 0];
  const orderSvc: [number, number, number] = [-0.5, -2.0, 0];
  const paySvc: [number, number, number] = [3.6, 1.6, 0];
  const notifSvc: [number, number, number] = [3.6, -1.6, 0];
  const busPos: [number, number, number] = [1.5, 0, 0];

  let pFrom = gwPos;
  let pTo = orderSvc;
  let pColor = '#38bdf8';
  let pLabel = 'POST /checkout';

  if (step.step === 2) {
    pFrom = orderSvc;
    pTo = busPos;
    pColor = '#a855f7';
    pLabel = 'Emit: OrderCreatedEvent';
  } else if (step.step === 3) {
    pFrom = busPos;
    pTo = paySvc;
    pColor = '#f59e0b';
    pLabel = 'Charge Credit Card';
  } else if (step.step >= 4) {
    pFrom = busPos;
    pTo = notifSvc;
    pColor = '#10b981';
    pLabel = 'Send Email Receipt';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.2, 0]} />

      <GatewayNode3D
        id="api-gateway"
        position={gwPos}
        label="API Gateway"
        sublabel="Ingress Mesh"
        color="#7c3aed"
        radius={0.85}
        isActive={step.step === 1}
        isSelected={selectedComponentId === 'api-gateway'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="event-bus"
        position={busPos}
        label="Event Bus / Mesh"
        sublabel="Async Pub/Sub Spine"
        color="#0284c7"
        radius={0.75}
        isActive={step.step >= 2}
        isSelected={selectedComponentId === 'event-bus'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="user-service"
        position={userSvc}
        label="User Service + DB"
        color="#059669"
        size={[1.4, 1.1, 0.7]}
        isSelected={selectedComponentId === 'user-service'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="order-service"
        position={orderSvc}
        label="Order Service + DB"
        color="#059669"
        size={[1.4, 1.1, 0.7]}
        isActive={step.step <= 2}
        isSelected={selectedComponentId === 'order-service'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="payment-service"
        position={paySvc}
        label="Payment Service + DB"
        color="#d97706"
        size={[1.4, 1.1, 0.7]}
        isActive={step.step === 3}
        isSelected={selectedComponentId === 'payment-service'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="notification-service"
        position={notifSvc}
        label="Notification Worker"
        color="#06b6d4"
        size={[1.4, 1.1, 0.7]}
        isActive={step.step >= 4}
        isSelected={selectedComponentId === 'notification-service'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={gwPos} end={userSvc} color="#38bdf8" />
      <NetworkLink3D start={gwPos} end={orderSvc} color="#38bdf8" active={step.step === 1} />
      <NetworkLink3D start={orderSvc} end={busPos} color="#a855f7" active={step.step === 2} />
      <NetworkLink3D start={userSvc} end={busPos} color="#475569" dashed />
      <NetworkLink3D start={busPos} end={paySvc} color="#f59e0b" active={step.step === 3} />
      <NetworkLink3D start={busPos} end={notifSvc} color="#10b981" active={step.step >= 4} />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.4 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const MessageQueueScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  speed = 1,
}) => {
  const prod1: [number, number, number] = [-4.8, 1.2, 0];
  const prod2: [number, number, number] = [-4.8, -1.2, 0];
  const brokerPos: [number, number, number] = [0, 0, 0];
  const cons1: [number, number, number] = [4.8, 1.2, 0];
  const cons2: [number, number, number] = [4.8, -1.2, 0];

  const queueBlocksRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (queueBlocksRef.current) {
      queueBlocksRef.current.children.forEach((child, i) => {
        child.position.x = -1.2 + (((state.clock.getElapsedTime() * 0.8 + i * 0.5) % 2.4));
      });
    }
  });

  const pFrom = step.step <= 2 ? prod1 : brokerPos;
  const pTo = step.step <= 2 ? brokerPos : cons1;

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -2.8, 0]} />

      <ClientNode3D
        id="producer"
        position={prod1}
        label="Producer Service A"
        sublabel="Order Events"
        isActive={step.step === 1}
        isSelected={selectedComponentId === 'producer'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ClientNode3D
        id="producer"
        position={prod2}
        label="Producer Service B"
        sublabel="Clickstream Logs"
        isActive={step.step === 2}
        isSelected={selectedComponentId === 'producer'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Broker Partition Tunnel */}
      <group position={brokerPos} onClick={() => onSelectComponent('broker')}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.9, 0.9, 3.2, 24, 1, true]} />
          <meshStandardMaterial color="#7c3aed" wireframe transparent opacity={0.45} />
        </mesh>
        <group ref={queueBlocksRef}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, 0, 0]}>
              <boxGeometry args={[0.35, 0.35, 0.35]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
        {showLabels && (
          <>
            <Text position={[0, 1.35, 0]} fontSize={0.22} color="#e9d5ff" anchorX="center">
              Message Broker (Kafka / RabbitMQ)
            </Text>
            <Text position={[0, -1.25, 0]} fontSize={0.16} color="#c084fc" anchorX="center">
              Buffered Append-Only Log Partitions
            </Text>
          </>
        )}
      </group>

      <ServerRack3D
        id="consumer"
        position={cons1}
        label="Consumer Worker 1"
        sublabel="Partition 0 Reader"
        color="#059669"
        size={[1.4, 1.1, 0.7]}
        isActive={step.step >= 3}
        isSelected={selectedComponentId === 'consumer'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="consumer"
        position={cons2}
        label="Consumer Worker 2"
        sublabel="Partition 1 Reader"
        color="#059669"
        size={[1.4, 1.1, 0.7]}
        isActive={step.step >= 4}
        isSelected={selectedComponentId === 'consumer'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={prod1} end={[-1.6, 0, 0]} color="#38bdf8" active={step.step === 1} />
      <NetworkLink3D start={prod2} end={[-1.6, 0, 0]} color="#38bdf8" active={step.step === 2} />
      <NetworkLink3D start={[1.6, 0, 0]} end={cons1} color="#10b981" active={step.step >= 3} />
      <NetworkLink3D start={[1.6, 0, 0]} end={cons2} color="#10b981" active={step.step >= 4} />

      <AnimatedPacket3D
        from={pFrom}
        to={pTo}
        speed={1.4 * speed}
        color={step.step <= 2 ? '#38bdf8' : '#10b981'}
        label={step.step <= 2 ? 'Publish Event' : 'Consume & Commit Offset'}
        showLabels={showLabels}
      />
    </group>
  );
};

export const ConsistentHashingScene3D: React.FC<Scene3DProps> = ({
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = '3-nodes',
}) => {
  const ringRadius = 2.6;
  const includeNodeD = activeMode === 'add-node-d';
  const ringNodes = [
    { id: 'ring-node-a', label: 'Node A (0°)', angle: 0, color: '#06b6d4' },
    { id: 'ring-node-b', label: 'Node B (120°)', angle: (2 * Math.PI) / 3, color: '#8b5cf6' },
    { id: 'ring-node-c', label: 'Node C (240°)', angle: (4 * Math.PI) / 3, color: '#10b981' },
    ...(includeNodeD ? [{ id: 'ring-node-d', label: 'Node D (New 60°)', angle: Math.PI / 3, color: '#f59e0b' }] : []),
  ];

  const dataKeys = [
    { id: 'key-1', label: 'Key #101', angle: 0.45 },
    { id: 'key-2', label: 'Key #204', angle: 1.45 },
    { id: 'key-3', label: 'Key #309', angle: 2.7 },
    { id: 'key-4', label: 'Key #415', angle: 4.8 },
  ];

  return (
    <group rotation={[0.55, 0, 0]}>
      {/* Main Hash Ring Torus */}
      <mesh>
        <torusGeometry args={[ringRadius, 0.06, 16, 72]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
      {showLabels && (
        <Text position={[0, 0, 0]} fontSize={0.22} color="#e2e8f0" anchorX="center">
          {includeNodeD ? 'Node D Added: Only adjacent keys migrate!' : 'Hash Ring [0 ... 2^32 - 1]'}
        </Text>
      )}

      {/* Server Nodes along ring */}
      {ringNodes.map((n) => {
        const x = Math.cos(n.angle) * ringRadius;
        const y = Math.sin(n.angle) * ringRadius;
        return (
          <group
            key={n.id}
            position={[x, y, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent(n.id);
            }}
          >
            <mesh>
              <sphereGeometry args={[0.35, 24, 24]} />
              <meshStandardMaterial
                color={n.color}
                emissive={n.color}
                emissiveIntensity={selectedComponentId === n.id ? 1.2 : 0.45}
              />
            </mesh>
            {showLabels && (
              <Text position={[x * 0.35, y * 0.35, 0.3]} fontSize={0.2} color="#ffffff" anchorX="center">
                {n.label}
              </Text>
            )}
          </group>
        );
      })}

      {/* Data Keys mapped clockwise on ring */}
      {dataKeys.map((k) => {
        const x = Math.cos(k.angle) * ringRadius;
        const y = Math.sin(k.angle) * ringRadius;
        return (
          <group key={k.id} position={[x, y, 0]}>
            <mesh>
              <boxGeometry args={[0.24, 0.24, 0.24]} />
              <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.8} />
            </mesh>
            {showLabels && (
              <Text position={[0, 0.38, 0.2]} fontSize={0.14} color="#fef08a" anchorX="center">
                {k.label}
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
};

export const CapTheoremScene3D: React.FC<Scene3DProps> = ({
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'cp-mode',
  speed = 1,
}) => {
  const nodeA: [number, number, number] = [-3.2, 1.4, 0];
  const nodeB: [number, number, number] = [-3.2, -1.6, 0];
  const nodeC: [number, number, number] = [3.6, 0, 0];

  const isCP = activeMode === 'cp-mode';

  return (
    <group>
      <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -2.8, 0]} />

      <DatabaseNode3D
        id="cap-node-a"
        position={nodeA}
        label="Node A (Primary)"
        sublabel="Side 1 • Write Received"
        color="#0284c7"
        isActive={true}
        isSelected={selectedComponentId === 'cap-node-a'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <DatabaseNode3D
        id="cap-node-b"
        position={nodeB}
        label="Node B (Quorum Peer)"
        sublabel="Side 1 • In Sync"
        color="#059669"
        isActive={true}
        isSelected={selectedComponentId === 'cap-node-b'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Glowing Red Network Partition Wall */}
      <mesh position={[0.4, 0, 0]}>
        <boxGeometry args={[0.12, 4.4, 3.2]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.35} emissive="#dc2626" emissiveIntensity={0.8} />
      </mesh>
      {showLabels && (
        <Text position={[0.4, 2.65, 0]} fontSize={0.2} color="#fca5a5" anchorX="center">
          NETWORK PARTITION (Link Severed)
        </Text>
      )}

      <DatabaseNode3D
        id="cap-node-c"
        position={nodeC}
        label="Node C (Isolated)"
        sublabel={isCP ? 'CP: Rejects Reads/Writes (503)' : 'AP: Serves Stale Data (200 OK)'}
        color={isCP ? '#ef4444' : '#f59e0b'}
        isActive={true}
        isSelected={selectedComponentId === 'cap-node-c'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={nodeA} end={nodeB} color="#10b981" active={true} />
      <NetworkLink3D start={nodeA} end={nodeC} color="#ef4444" dashed />

      <AnimatedPacket3D from={nodeA} to={nodeB} speed={1.2 * speed} color="#10b981" label="Sync A <-> B" showLabels={showLabels} />
    </group>
  );
};

export const CircuitBreakerScene3D: React.FC<Scene3DProps> = ({
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'closed',
  speed = 1,
}) => {
  const clientPos: [number, number, number] = [-4.4, 0, 0];
  const breakerPos: [number, number, number] = [0, 0, 0];
  const servicePos: [number, number, number] = [4.4, 0, 0];

  const isOpen = activeMode === 'open';
  const isHalfOpen = activeMode === 'half-open';
  const breakerColor = isOpen ? '#ef4444' : isHalfOpen ? '#f59e0b' : '#10b981';

  return (
    <group>
      <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -2.5, 0]} />

      <ClientNode3D
        id="cb-client"
        position={clientPos}
        label="Caller Microservice"
        sublabel={isOpen ? 'Receives Fast Fallback!' : 'Sending Requests'}
        isActive={true}
        isSelected={selectedComponentId === 'cb-client'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Circuit Breaker Arm & Gate */}
      <group position={breakerPos} onClick={() => onSelectComponent('circuit-breaker')}>
        <mesh>
          <boxGeometry args={[1.6, 1.6, 1.0]} />
          <meshStandardMaterial color={breakerColor} metalness={0.7} roughness={0.2} emissive={breakerColor} emissiveIntensity={0.45} />
        </mesh>
        {/* Physical Rotating Switch Arm */}
        <mesh position={[0, 1.1, 0]} rotation={[0, 0, isOpen ? 0.75 : isHalfOpen ? 0.35 : 0]}>
          <boxGeometry args={[1.6, 0.2, 0.2]} />
          <meshStandardMaterial color="#f8fafc" emissive={breakerColor} emissiveIntensity={0.6} />
        </mesh>
        {showLabels && (
          <>
            <Text position={[0, 1.75, 0]} fontSize={0.22} color="#ffffff" anchorX="center">
              Circuit Breaker: {activeMode.toUpperCase()}
            </Text>
            <Text position={[0, -1.15, 0]} fontSize={0.16} color={breakerColor} anchorX="center">
              {isOpen ? 'Tripped! Fail-Fast Mode' : isHalfOpen ? 'Testing 1 Probe Request' : 'Healthy Closed Flow'}
            </Text>
          </>
        )}
      </group>

      <ServerRack3D
        id="target-service"
        position={servicePos}
        label="Downstream Payment API"
        sublabel={isOpen ? 'Status: Overloaded / 503' : isHalfOpen ? 'Recovering...' : 'Status: 200 OK'}
        color={isOpen ? '#b91c1c' : isHalfOpen ? '#d97706' : '#059669'}
        ledColor={breakerColor}
        isActive={!isOpen}
        isSelected={selectedComponentId === 'target-service'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={clientPos} end={breakerPos} color="#38bdf8" active={true} />
      <NetworkLink3D start={breakerPos} end={servicePos} color={breakerColor} active={!isOpen} dashed={isOpen} />

      <AnimatedPacket3D
        from={isOpen ? breakerPos : clientPos}
        to={isOpen ? clientPos : servicePos}
        speed={1.3 * speed}
        color={breakerColor}
        label={isOpen ? 'Instant Fallback (No Timeout Wait)' : isHalfOpen ? 'Probe Request' : '200 OK'}
        showLabels={showLabels}
      />
    </group>
  );
};

export const ScalingArchitectureScene3D: React.FC<Scene3DProps> = ({
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'horizontal',
  speed = 1,
}) => {
  const isVertical = activeMode === 'vertical';

  return (
    <group>
      <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -2.8, 0]} />

      {isVertical ? (
        <group>
          {/* Single Giant Vertically Scaled Server */}
          <ServerRack3D
            id="vertical-server"
            position={[0, 0.2, 0]}
            label="Monolith Super-Server (Scale Up)"
            sublabel="128 vCPU • 512 GB RAM • NVMe RAID"
            color="#d97706"
            size={[2.6, 3.6, 1.8]}
            isActive={true}
            isSelected={selectedComponentId === 'vertical-server'}
            showLabels={showLabels}
            onSelect={onSelectComponent}
          />
          <ClientNode3D
            id="scale-client"
            position={[-4.5, 0, 0]}
            label="Clients"
            isActive={true}
            isSelected={selectedComponentId === 'scale-client'}
            showLabels={showLabels}
            onSelect={onSelectComponent}
          />
          <NetworkLink3D start={[-4.5, 0, 0]} end={[-1.3, 0, 0]} color="#f59e0b" active={true} />
          <AnimatedPacket3D from={[-4.5, 0, 0]} to={[-1.3, 0, 0]} speed={1.5 * speed} color="#f59e0b" label="All Load -> 1 Machine" showLabels={showLabels} />
        </group>
      ) : (
        <group>
          {/* Horizontal Scaling Cluster */}
          <ClientNode3D
            id="scale-client"
            position={[-4.8, 0, 0]}
            label="Global Traffic"
            isActive={true}
            isSelected={selectedComponentId === 'scale-client'}
            showLabels={showLabels}
            onSelect={onSelectComponent}
          />
          <GatewayNode3D
            id="scale-lb"
            position={[-1.2, 0, 0]}
            label="Auto-Scale Load Balancer"
            sublabel="Horizontal Scale Out"
            color="#7c3aed"
            isActive={true}
            isSelected={selectedComponentId === 'scale-lb'}
            showLabels={showLabels}
            onSelect={onSelectComponent}
          />
          {[-2.0, 0, 2.0].map((y, idx) => (
            <React.Fragment key={idx}>
              <ServerRack3D
                id={`node-${idx + 1}`}
                position={[3.6, y, 0]}
                label={`Stateless Pod #${idx + 1}`}
                sublabel="4 vCPU • 16 GB RAM"
                color="#059669"
                size={[1.4, 1.1, 0.8]}
                isActive={true}
                isSelected={selectedComponentId === `node-${idx + 1}`}
                showLabels={showLabels}
                onSelect={onSelectComponent}
              />
              <NetworkLink3D start={[-1.2, 0, 0]} end={[3.6, y, 0]} color="#10b981" active={true} />
            </React.Fragment>
          ))}
          <NetworkLink3D start={[-4.8, 0, 0]} end={[-1.2, 0, 0]} color="#38bdf8" active={true} />
          <AnimatedPacket3D from={[-1.2, 0, 0]} to={[3.6, 2.0, 0]} speed={1.4 * speed} color="#10b981" label="Distributed Elastic Fleet" showLabels={showLabels} />
        </group>
      )}
    </group>
  );
};
