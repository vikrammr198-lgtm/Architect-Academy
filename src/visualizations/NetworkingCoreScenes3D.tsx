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

const OSI_LAYERS = [
  { num: 7, name: '7. Application', pdu: 'Data', color: '#ec4899' },
  { num: 6, name: '6. Presentation', pdu: 'Data', color: '#d946ef' },
  { num: 5, name: '5. Session', pdu: 'Data', color: '#a855f7' },
  { num: 4, name: '4. Transport', pdu: 'Segment', color: '#6366f1' },
  { num: 3, name: '3. Network', pdu: 'Packet', color: '#0ea5e9' },
  { num: 2, name: '2. Data Link', pdu: 'Frame', color: '#10b981' },
  { num: 1, name: '1. Physical', pdu: 'Bits', color: '#f59e0b' },
];

export const OsiModelScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'encapsulation',
  speed = 1,
}) => {
  const isDecap = activeMode === 'decapsulation';
  const packetStart: [number, number, number] = isDecap ? [3.2, -2.4, 0] : [-3.2, 2.4, 0];
  const packetEnd: [number, number, number] = isDecap ? [3.2, 2.4, 0] : [-3.2, -2.4, 0];

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.2, 0]} />

      {/* 7-Layer Interactive Tower */}
      {OSI_LAYERS.map((layer, index) => {
        const yPos = 2.4 - index * 0.8;
        const layerId = `layer-${layer.num}`;
        const isHovered = selectedComponentId === layerId;
        const isActiveInStep = step.activeNodes.includes(layerId);

        return (
          <group
            key={layer.num}
            position={[0, yPos, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent(layerId);
            }}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[4.4 - index * 0.12, 0.62, 1.8]} />
              <meshStandardMaterial
                color={layer.color}
                metalness={0.65}
                roughness={0.25}
                emissive={layer.color}
                emissiveIntensity={isActiveInStep || isHovered ? 0.8 : 0.18}
              />
            </mesh>
            {showLabels && (
              <>
                <Text position={[-1.6, 0, 1.0]} fontSize={0.21} color="#ffffff" anchorX="left">
                  {layer.name}
                </Text>
                <Text position={[1.6, 0, 1.0]} fontSize={0.17} color="#e2e8f0" anchorX="right">
                  [{layer.pdu}]
                </Text>
              </>
            )}
          </group>
        );
      })}

      {/* Physical Wire Connector at Base */}
      <NetworkLink3D start={[-2.6, -2.4, 0]} end={[2.6, -2.4, 0]} color="#f59e0b" active={true} />

      <AnimatedPacket3D
        from={packetStart}
        to={packetEnd}
        speed={0.65 * speed}
        color={isDecap ? '#10b981' : '#38bdf8'}
        label={isDecap ? 'Decapsulation (Unwrap Headers)' : 'Encapsulation (Add Headers)'}
        showLabels={showLabels}
      />
    </group>
  );
};

export const TcpHandshakeScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'tcp',
  speed = 1,
}) => {
  const clientPos: [number, number, number] = [-4.2, 0, 0];
  const serverPos: [number, number, number] = [4.2, 0, 0];

  const isUdp = activeMode === 'udp';

  let pFrom = clientPos;
  let pTo = serverPos;
  let pColor = '#38bdf8';
  let pLabel = 'SYN [Seq=1000]';
  let laneY = 0.7;

  if (isUdp) {
    pFrom = clientPos;
    pTo = serverPos;
    pColor = '#f59e0b';
    pLabel = 'UDP Datagram (Fire & Forget - No Handshake!)';
    laneY = 0;
  } else if (step.step === 1) {
    pFrom = [-4.2, 0.8, 0];
    pTo = [4.2, 0.8, 0];
    pColor = '#38bdf8';
    pLabel = '1. SYN [Seq=1000]';
    laneY = 0.8;
  } else if (step.step === 2) {
    pFrom = [4.2, 0, 0];
    pTo = [-4.2, 0, 0];
    pColor = '#10b981';
    pLabel = '2. SYN-ACK [Seq=5000, Ack=1001]';
    laneY = 0;
  } else if (step.step === 3) {
    pFrom = [-4.2, -0.8, 0];
    pTo = [4.2, -0.8, 0];
    pColor = '#a855f7';
    pLabel = '3. ACK [Ack=5001] -> ESTABLISHED';
    laneY = -0.8;
  } else {
    pFrom = [-4.2, 0, 0];
    pTo = [4.2, 0, 0];
    pColor = '#34d399';
    pLabel = 'Reliable Data Stream';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -2.6, 0]} />

      <ClientNode3D
        id="client-node"
        position={clientPos}
        label="Client Host"
        sublabel={isUdp ? 'UDP Socket (Stateless)' : step.step >= 3 ? 'State: ESTABLISHED' : 'State: SYN_SENT'}
        isActive={true}
        isSelected={selectedComponentId === 'client-node'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="server-node"
        position={serverPos}
        label="Server Endpoint (:443)"
        sublabel={isUdp ? 'Listening Port 53/UDP' : step.step >= 2 ? 'State: ESTABLISHED' : 'State: LISTEN'}
        color="#059669"
        isActive={true}
        isSelected={selectedComponentId === 'server-node'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {!isUdp ? (
        <>
          <NetworkLink3D start={[-3.4, 0.8, 0]} end={[3.4, 0.8, 0]} color="#38bdf8" active={step.step === 1} />
          <NetworkLink3D start={[3.4, 0, 0]} end={[-3.4, 0, 0]} color="#10b981" active={step.step === 2} />
          <NetworkLink3D start={[-3.4, -0.8, 0]} end={[3.4, -0.8, 0]} color="#a855f7" active={step.step >= 3} />
          {showLabels && (
            <>
              <Text position={[0, 1.05, 0]} fontSize={0.16} color="#7dd3fc">
                Step 1: SYN
              </Text>
              <Text position={[0, 0.25, 0]} fontSize={0.16} color="#6ee7b7">
                Step 2: SYN-ACK
              </Text>
              <Text position={[0, -0.55, 0]} fontSize={0.16} color="#d8b4fe">
                Step 3: ACK
              </Text>
            </>
          )}
        </>
      ) : (
        <NetworkLink3D start={[-3.4, 0, 0]} end={[3.4, 0, 0]} color="#f59e0b" active={true} dashed />
      )}

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.25 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const DnsResolutionScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'iterative',
  speed = 1,
}) => {
  const clientPos: [number, number, number] = [-4.8, 0, 0];
  const resolverPos: [number, number, number] = [-1.0, 0, 0];
  const rootPos: [number, number, number] = [3.2, 2.2, 0];
  const tldPos: [number, number, number] = [4.4, 0, 0];
  const authPos: [number, number, number] = [3.2, -2.2, 0];

  const isCached = activeMode === 'cached-hit';

  let pFrom = clientPos;
  let pTo = resolverPos;
  let pColor = '#38bdf8';
  let pLabel = 'Lookup: architect.io';

  if (isCached) {
    pFrom = step.step % 2 === 1 ? clientPos : resolverPos;
    pTo = step.step % 2 === 1 ? resolverPos : clientPos;
    pColor = '#10b981';
    pLabel = step.step % 2 === 1 ? 'Query architect.io' : 'Instant Resolver Cache HIT (2ms)!';
  } else if (step.step === 2) {
    pFrom = resolverPos;
    pTo = rootPos;
    pColor = '#ef4444';
    pLabel = 'Ask Root (.) -> Refers .io TLD';
  } else if (step.step === 3) {
    pFrom = resolverPos;
    pTo = tldPos;
    pColor = '#f59e0b';
    pLabel = 'Ask .io TLD -> Refers Authoritative NS';
  } else if (step.step === 4) {
    pFrom = resolverPos;
    pTo = authPos;
    pColor = '#10b981';
    pLabel = 'Ask Auth NS -> IP 76.76.21.21';
  } else if (step.step >= 5) {
    pFrom = resolverPos;
    pTo = clientPos;
    pColor = '#34d399';
    pLabel = 'Answer: 76.76.21.21 (Cached)';
  }

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -3.2, 0]} />

      <ClientNode3D
        id="client-dns"
        position={clientPos}
        label="Client Browser"
        sublabel="Local DNS Cache"
        isActive={step.step === 1 || step.step >= 5}
        isSelected={selectedComponentId === 'client-dns'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <GatewayNode3D
        id="resolver-dns"
        position={resolverPos}
        label="Recursive Resolver"
        sublabel="ISP / 1.1.1.1"
        color="#7c3aed"
        isActive={true}
        isSelected={selectedComponentId === 'resolver-dns'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <ServerRack3D
        id="root-dns"
        position={rootPos}
        label="Root Nameserver (.)"
        sublabel="13 Global Clusters"
        color="#dc2626"
        size={[1.3, 1.0, 0.7]}
        isActive={!isCached && step.step === 2}
        isSelected={selectedComponentId === 'root-dns'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="tld-dns"
        position={tldPos}
        label="TLD Server (.com / .io)"
        sublabel="Top-Level Authority"
        color="#d97706"
        size={[1.3, 1.0, 0.7]}
        isActive={!isCached && step.step === 3}
        isSelected={selectedComponentId === 'tld-dns'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />
      <ServerRack3D
        id="authoritative-dns"
        position={authPos}
        label="Authoritative NS"
        sublabel="Master A / AAAA / MX Zone"
        color="#059669"
        size={[1.3, 1.0, 0.7]}
        isActive={!isCached && step.step === 4}
        isSelected={selectedComponentId === 'authoritative-dns'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={clientPos} end={resolverPos} color="#38bdf8" active={true} />
      <NetworkLink3D start={resolverPos} end={rootPos} color="#ef4444" active={!isCached && step.step === 2} />
      <NetworkLink3D start={resolverPos} end={tldPos} color="#f59e0b" active={!isCached && step.step === 3} />
      <NetworkLink3D start={resolverPos} end={authPos} color="#10b981" active={!isCached && step.step === 4} />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.35 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const RoutingSwitchingScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  speed = 1,
}) => {
  const pcA: [number, number, number] = [-5.4, 1.2, 0];
  const swA: [number, number, number] = [-3.0, 0, 0];
  const rtrA: [number, number, number] = [-0.5, 0, 0];
  const rtrB: [number, number, number] = [2.2, 0, 0];
  const swB: [number, number, number] = [4.6, 0, 0];
  const pcB: [number, number, number] = [6.4, -1.2, 0];

  let pFrom = pcA;
  let pTo = swA;
  let pLabel = 'L2 Frame (MAC Switch)';
  let pColor = '#10b981';

  if (step.step === 2) {
    pFrom = swA;
    pTo = rtrA;
    pLabel = 'Default Gateway (192.168.1.1)';
    pColor = '#0284c7';
  } else if (step.step === 3) {
    pFrom = rtrA;
    pTo = rtrB;
    pLabel = 'L3 IP Routing Across WAN (BGP/OSPF)';
    pColor = '#a855f7';
  } else if (step.step >= 4) {
    pFrom = rtrB;
    pTo = pcB;
    pLabel = 'Deliver to Subnet 10.0.2.20';
    pColor = '#34d399';
  }

  return (
    <group>
      <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0.5, -2.6, 0]} />

      <ClientNode3D id="pc-a" position={pcA} label="Host A (192.168.1.10)" isActive={step.step === 1} isSelected={selectedComponentId === 'pc-a'} showLabels={showLabels} onSelect={onSelectComponent} />
      <ServerRack3D id="switch-a" position={swA} label="L2 Switch A" sublabel="MAC Table" color="#059669" size={[1.1, 0.8, 0.7]} isActive={step.step <= 2} isSelected={selectedComponentId === 'switch-a'} showLabels={showLabels} onSelect={onSelectComponent} />
      <GatewayNode3D id="router-a" position={rtrA} label="L3 Router A" sublabel="NAT + Routing Table" color="#7c3aed" radius={0.75} isActive={step.step >= 2 && step.step <= 3} isSelected={selectedComponentId === 'router-a'} showLabels={showLabels} onSelect={onSelectComponent} />
      <GatewayNode3D id="router-b" position={rtrB} label="L3 Router B" sublabel="Subnet 10.0.2.0/24" color="#0284c7" radius={0.75} isActive={step.step >= 3} isSelected={selectedComponentId === 'router-b'} showLabels={showLabels} onSelect={onSelectComponent} />
      <ServerRack3D id="switch-b" position={swB} label="L2 Switch B" sublabel="VLAN 20" color="#059669" size={[1.1, 0.8, 0.7]} isActive={step.step >= 4} isSelected={selectedComponentId === 'switch-b'} showLabels={showLabels} onSelect={onSelectComponent} />
      <ClientNode3D id="pc-b" position={pcB} label="Host B (10.0.2.20)" isActive={step.step >= 4} isSelected={selectedComponentId === 'pc-b'} showLabels={showLabels} onSelect={onSelectComponent} />

      <NetworkLink3D start={pcA} end={swA} color="#10b981" active={step.step === 1} />
      <NetworkLink3D start={swA} end={rtrA} color="#0284c7" active={step.step === 2} />
      <NetworkLink3D start={rtrA} end={rtrB} color="#a855f7" active={step.step === 3} />
      <NetworkLink3D start={rtrB} end={swB} color="#34d399" active={step.step >= 4} />
      <NetworkLink3D start={swB} end={pcB} color="#34d399" active={step.step >= 4} />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.4 * speed} color={pColor} label={pLabel} showLabels={showLabels} />
    </group>
  );
};

export const VpnFirewallScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'vpn-encrypted',
  speed = 1,
}) => {
  const clientPos: [number, number, number] = [-4.8, 0, 0];
  const firewallPos: [number, number, number] = [0.6, 0, 0];
  const serverPos: [number, number, number] = [4.8, 0, 0];

  const isAttack = activeMode === 'ddos-blocked';

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -2.7, 0]} />

      <ClientNode3D
        id="vpn-client"
        position={clientPos}
        label={isAttack ? 'Attacker Botnet' : 'Remote Engineer'}
        sublabel={isAttack ? 'Spoofed Traffic' : 'Encrypted VPN Tunnel'}
        color={isAttack ? '#ef4444' : '#0284c7'}
        isActive={true}
        isSelected={selectedComponentId === 'vpn-client'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      {/* Translucent Encrypted VPN Armor Tunnel */}
      {!isAttack && (
        <group position={[-2.1, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.75, 0.75, 4.4, 24, 1, true]} />
            <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.4} emissive="#0891b2" emissiveIntensity={0.4} />
          </mesh>
          {showLabels && (
            <Text position={[0, 1.05, 0]} fontSize={0.18} color="#67e8f9" anchorX="center">
              AES-256 Encrypted VPN Tunnel
            </Text>
          )}
        </group>
      )}

      {/* Stateful Firewall Wall */}
      <group position={firewallPos} onClick={() => onSelectComponent('firewall')}>
        <mesh>
          <boxGeometry args={[0.5, 3.4, 2.8]} />
          <meshStandardMaterial
            color="#ef4444"
            metalness={0.6}
            roughness={0.25}
            transparent
            opacity={0.75}
            emissive="#b91c1c"
            emissiveIntensity={0.5}
          />
        </mesh>
        {showLabels && (
          <Text position={[0, 2.0, 0]} fontSize={0.22} color="#fca5a5" anchorX="center">
            Stateful Firewall / WAF
          </Text>
        )}
      </group>

      <ServerRack3D
        id="corp-server"
        position={serverPos}
        label="Corporate Intranet"
        sublabel="Protected Asset"
        color="#059669"
        isActive={!isAttack}
        isSelected={selectedComponentId === 'corp-server'}
        showLabels={showLabels}
        onSelect={onSelectComponent}
      />

      <NetworkLink3D start={clientPos} end={firewallPos} color={isAttack ? '#ef4444' : '#06b6d4'} active={true} />
      <NetworkLink3D start={firewallPos} end={serverPos} color="#10b981" active={!isAttack} dashed={isAttack} />

      <AnimatedPacket3D
        from={clientPos}
        to={isAttack ? [0.1, 0, 0] : serverPos}
        speed={1.3 * speed}
        color={isAttack ? '#ef4444' : '#10b981'}
        label={isAttack ? 'BLOCKED BY FIREWALL (DROP)' : 'Encrypted Payload Verified'}
        showLabels={showLabels}
      />
    </group>
  );
};

export const HttpHttpsScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'https-tls',
  speed = 1,
}) => {
  const browserPos: [number, number, number] = [-4.6, 0, 0];
  const tlsGatePos: [number, number, number] = [-0.4, 0, 0];
  const webServerPos: [number, number, number] = [4.4, 0, 0];

  const isHttp2 = activeMode === 'http2-multiplex';

  return (
    <group>
      <gridHelper args={[22, 22, '#1e293b', '#0f172a']} position={[0, -2.6, 0]} />

      <ClientNode3D id="browser" position={browserPos} label="Web Browser" sublabel="URL Bar -> Render" isActive={true} isSelected={selectedComponentId === 'browser'} showLabels={showLabels} onSelect={onSelectComponent} />
      <GatewayNode3D id="tls-layer" position={tlsGatePos} label={isHttp2 ? 'HTTP/2 Multiplexer' : 'TLS 1.3 Handshake'} sublabel={isHttp2 ? 'Single TCP • Parallel Streams' : 'X.509 Cert + Session Keys'} color="#0284c7" isActive={true} isSelected={selectedComponentId === 'tls-layer'} showLabels={showLabels} onSelect={onSelectComponent} />
      <ServerRack3D id="web-server" position={webServerPos} label="Origin Web Server" sublabel="200 OK HTML/JSON" color="#059669" isActive={true} isSelected={selectedComponentId === 'web-server'} showLabels={showLabels} onSelect={onSelectComponent} />

      {isHttp2 ? (
        <>
          <NetworkLink3D start={browserPos} end={[4.4, 0.5, 0]} color="#38bdf8" active={true} />
          <NetworkLink3D start={browserPos} end={[4.4, 0, 0]} color="#10b981" active={true} />
          <NetworkLink3D start={browserPos} end={[4.4, -0.5, 0]} color="#a855f7" active={true} />
          <AnimatedPacket3D from={browserPos} to={[4.4, 0.5, 0]} speed={1.6 * speed} color="#38bdf8" label="Stream 1: index.html" showLabels={showLabels} />
          <AnimatedPacket3D from={browserPos} to={[4.4, -0.5, 0]} speed={1.1 * speed} color="#a855f7" label="Stream 3: bundle.js" showLabels={showLabels} />
        </>
      ) : (
        <>
          <NetworkLink3D start={browserPos} end={tlsGatePos} color="#38bdf8" active={true} />
          <NetworkLink3D start={tlsGatePos} end={webServerPos} color="#10b981" active={true} />
          <AnimatedPacket3D
            from={step.step <= 2 ? browserPos : tlsGatePos}
            to={step.step <= 2 ? tlsGatePos : webServerPos}
            speed={1.3 * speed}
            color="#10b981"
            label={step.step <= 2 ? 'ClientHello / ServerCert' : 'Encrypted HTTP Payload'}
            showLabels={showLabels}
          />
        </>
      )}
    </group>
  );
};

export const NetworkTopologyScene3D: React.FC<Scene3DProps> = ({
  selectedComponentId,
  onSelectComponent,
  showLabels,
  activeMode = 'star',
  speed = 1,
}) => {
  const mode = activeMode || 'star';
  const nodes: [number, number, number][] = [
    [0, 2.2, 0],
    [2.4, 0.8, 0],
    [1.6, -2.0, 0],
    [-1.6, -2.0, 0],
    [-2.4, 0.8, 0],
  ];
  const center: [number, number, number] = [0, 0, 0];

  return (
    <group>
      <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -3.0, 0]} />
      {showLabels && (
        <Text position={[0, 3.0, 0]} fontSize={0.24} color="#e2e8f0" anchorX="center">
          {mode.toUpperCase()} Network Topology
        </Text>
      )}

      {mode === 'star' && (
        <GatewayNode3D id="hub-switch" position={center} label="Central Switch" color="#7c3aed" radius={0.75} isActive={true} isSelected={selectedComponentId === 'hub-switch'} showLabels={showLabels} onSelect={onSelectComponent} />
      )}

      {nodes.map((pos, i) => (
        <React.Fragment key={i}>
          <ClientNode3D id={`topo-node-${i}`} position={pos} label={`Node ${i + 1}`} isActive={true} isSelected={selectedComponentId === `topo-node-${i}`} showLabels={showLabels} onSelect={onSelectComponent} />
          {mode === 'star' && <NetworkLink3D start={center} end={pos} color="#38bdf8" active={true} />}
          {mode === 'ring' && <NetworkLink3D start={pos} end={nodes[(i + 1) % nodes.length]} color="#10b981" active={true} />}
          {mode === 'mesh' &&
            nodes.slice(i + 1).map((target, j) => (
              <NetworkLink3D key={`${i}-${j}`} start={pos} end={target} color="#a855f7" active={true} />
            ))}
        </React.Fragment>
      ))}

      {mode === 'bus' && <NetworkLink3D start={[-4.5, 0, 0]} end={[4.5, 0, 0]} color="#f59e0b" active={true} />}

      <AnimatedPacket3D
        from={nodes[0]}
        to={mode === 'star' ? center : nodes[1]}
        speed={1.3 * speed}
        color="#38bdf8"
        label="Frame Packet"
        showLabels={showLabels}
      />
    </group>
  );
};
