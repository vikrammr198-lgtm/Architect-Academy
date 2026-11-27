import React from 'react';
import { Scene3DProps } from './ReverseProxyScene3D';
import {
  ClientNode3D,
  GatewayNode3D,
  ServerRack3D,
  DatabaseNode3D,
  NetworkLink3D,
  AnimatedPacket3D,
} from './ScenePrimitives';

export const CaseStudyArchitectureScene3D: React.FC<Scene3DProps> = ({
  step,
  selectedComponentId,
  onSelectComponent,
  showLabels,
  variant = 'url-shortener',
  speed = 1,
}) => {
  const configs: Record<
    string,
    {
      client: string;
      edge: string;
      svc1: string;
      svc2: string;
      store: string;
      packet: string;
    }
  > = {
    'url-shortener': {
      client: 'User Clicking bit.ly/x9Z',
      edge: 'CDN & Edge Redirector',
      svc1: 'Base62 Encoder API',
      svc2: 'Redis Cache (Hot URLs)',
      store: 'Cassandra / NoSQL Store',
      packet: '301/302 Redirect -> Target URL',
    },
    whatsapp: {
      client: 'Mobile Clients (E2E)',
      edge: 'WebSocket Chat Gateway',
      svc1: 'Session & Presence Service',
      svc2: 'Kafka Message Queue',
      store: 'Mnesia / Cassandra Chat DB',
      packet: 'Persistent TCP WebSocket Frame',
    },
    'youtube-netflix': {
      client: 'Smart TV / Web Player',
      edge: 'Global OpenConnect CDN',
      svc1: 'Video Transcoding DAG',
      svc2: 'Adaptive Bitrate (HLS/DASH)',
      store: 'S3 Object Blob Storage',
      packet: '4K Chunk Segment (.ts/.m4s)',
    },
    uber: {
      client: 'Rider & Driver Apps',
      edge: 'API Gateway (Geo-Sharded)',
      svc1: 'Geospatial QuadTree Index',
      svc2: 'Dispatch & Surge Engine',
      store: 'Kafka Location Stream + DB',
      packet: 'GPS Ping Every 4s (Lat/Lng)',
    },
  };

  const cfg = configs[variant] || configs['url-shortener'];

  const pClient: [number, number, number] = [-5.0, 0, 0];
  const pEdge: [number, number, number] = [-1.6, 0, 0];
  const pSvc1: [number, number, number] = [2.0, 1.5, 0];
  const pSvc2: [number, number, number] = [2.0, -1.5, 0];
  const pStore: [number, number, number] = [5.4, 0, 0];

  const pFrom = step.step === 1 ? pClient : step.step === 2 ? pEdge : step.step === 3 ? pSvc1 : pStore;
  const pTo = step.step === 1 ? pEdge : step.step === 2 ? pSvc1 : step.step === 3 ? pStore : pClient;

  return (
    <group>
      <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0.2, -2.9, 0]} />

      <ClientNode3D id="cs-client" position={pClient} label={cfg.client} isActive={step.step === 1 || step.step === 4} isSelected={selectedComponentId === 'cs-client'} showLabels={showLabels} onSelect={onSelectComponent} />
      <GatewayNode3D id="cs-edge" position={pEdge} label={cfg.edge} color="#7c3aed" isActive={step.step <= 2} isSelected={selectedComponentId === 'cs-edge'} showLabels={showLabels} onSelect={onSelectComponent} />
      <ServerRack3D id="cs-svc1" position={pSvc1} label={cfg.svc1} color="#059669" size={[1.6, 1.1, 0.8]} isActive={step.step === 2 || step.step === 3} isSelected={selectedComponentId === 'cs-svc1'} showLabels={showLabels} onSelect={onSelectComponent} />
      <ServerRack3D id="cs-svc2" position={pSvc2} label={cfg.svc2} color="#0284c7" size={[1.6, 1.1, 0.8]} isActive={step.step === 2} isSelected={selectedComponentId === 'cs-svc2'} showLabels={showLabels} onSelect={onSelectComponent} />
      <DatabaseNode3D id="cs-store" position={pStore} label={cfg.store} color="#d97706" isActive={step.step >= 3} isSelected={selectedComponentId === 'cs-store'} showLabels={showLabels} onSelect={onSelectComponent} />

      <NetworkLink3D start={pClient} end={pEdge} color="#38bdf8" active={step.step === 1} />
      <NetworkLink3D start={pEdge} end={pSvc1} color="#10b981" active={step.step === 2} />
      <NetworkLink3D start={pEdge} end={pSvc2} color="#0284c7" active={step.step === 2} />
      <NetworkLink3D start={pSvc1} end={pStore} color="#f59e0b" active={step.step === 3} />
      <NetworkLink3D start={pSvc2} end={pStore} color="#f59e0b" />

      <AnimatedPacket3D from={pFrom} to={pTo} speed={1.35 * speed} color="#38bdf8" label={cfg.packet} showLabels={showLabels} />
    </group>
  );
};
