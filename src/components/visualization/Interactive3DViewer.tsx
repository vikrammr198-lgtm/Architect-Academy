import React, { useState, useEffect, useRef, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { TopicContent, Component3DInfo } from '../../types';
import { VisualizerToolbar } from './VisualizerToolbar';
import { StepExplanationPanel } from './StepExplanationPanel';
import { ComponentDetailModal } from './ComponentDetailModal';
import { Architecture2DFallback } from './Architecture2DFallback';
import { ReverseProxyScene3D, Scene3DProps } from '../../visualizations/ReverseProxyScene3D';
import { LoadBalancerScene3D } from '../../visualizations/LoadBalancerScene3D';
import { DatabaseShardingScene3D, DatabaseReplicationScene3D } from '../../visualizations/DatabaseSystemsScenes3D';
import { CachingScene3D, CacheEvictionScene3D, CdnNetworkScene3D } from '../../visualizations/CachingAndCdnScenes3D';
import {
  ApiGatewayScene3D,
  MicroservicesScene3D,
  MessageQueueScene3D,
  ConsistentHashingScene3D,
  CapTheoremScene3D,
  CircuitBreakerScene3D,
  ScalingArchitectureScene3D,
} from '../../visualizations/DistributedSystemsScenes3D';
import {
  OsiModelScene3D,
  TcpHandshakeScene3D,
  DnsResolutionScene3D,
  RoutingSwitchingScene3D,
  VpnFirewallScene3D,
  HttpHttpsScene3D,
  NetworkTopologyScene3D,
} from '../../visualizations/NetworkingCoreScenes3D';
import { CaseStudyArchitectureScene3D } from '../../visualizations/CaseStudyArchitectureScene3D';
import { Loader2, Sliders } from 'lucide-react';

interface CanvasErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}
interface CanvasErrorBoundaryState {
  hasError: boolean;
}
class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  constructor(props: CanvasErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL 3D Canvas fell back to 2D schematic:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface Interactive3DViewerProps {
  topic: TopicContent;
}

/** Helper inside Canvas to support explicit Zoom In / Zoom Out / Reset Camera */
const CameraController: React.FC<{
  controlsRef: React.RefObject<OrbitControlsImpl>;
  zoomSignal: { type: 'in' | 'out' | 'reset'; nonce: number } | null;
}> = ({ controlsRef, zoomSignal }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (!zoomSignal) return;
    if (zoomSignal.type === 'reset') {
      camera.position.set(0, 2.8, 10.2);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
      return;
    }

    const target = controlsRef.current ? controlsRef.current.target : new THREE.Vector3(0, 0, 0);
    const dir = new THREE.Vector3().subVectors(camera.position, target);
    const currentDist = dir.length();
    const factor = zoomSignal.type === 'in' ? 0.8 : 1.25;
    const nextDist = THREE.MathUtils.clamp(currentDist * factor, 4.0, 20.0);
    dir.setLength(nextDist);
    camera.position.copy(target).add(dir);
    controlsRef.current?.update();
  }, [zoomSignal, camera, controlsRef]);

  return null;
};

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({ topic }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [is2DView, setIs2DView] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<string>(
    topic.visualizationModes?.[0]?.id || ''
  );
  const [zoomSignal, setZoomSignal] = useState<{ type: 'in' | 'out' | 'reset'; nonce: number } | null>(null);

  const controlsRef = useRef<OrbitControlsImpl>(null);
  const totalSteps = topic.animationSteps.length;
  const currentStep = topic.animationSteps[currentStepIndex] || topic.animationSteps[0];

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlAvailable(false);
        setIs2DView(true);
      }
    } catch {
      setWebGlAvailable(false);
      setIs2DView(true);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || totalSteps <= 1) return;
    const intervalTime = Math.max(1800 / speed, 900);
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % totalSteps);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, speed, totalSteps]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setSelectedComponentId(null);
    setActiveMode(topic.visualizationModes?.[0]?.id || '');
  }, [topic.id, topic.visualizationModes]);

  const handleTogglePlay = () => setIsPlaying((prev) => !prev);
  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };
  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };
  const handleChangeSpeed = () => {
    const speeds = [0.5, 1, 2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };
  const handleZoomIn = () => setZoomSignal({ type: 'in', nonce: Date.now() });
  const handleZoomOut = () => setZoomSignal({ type: 'out', nonce: Date.now() });
  const handleResetCamera = () => setZoomSignal({ type: 'reset', nonce: Date.now() });

  // Resolve component details for ComponentDetailModal cleanly without generic blank fallbacks
  const resolveComponent = (): Component3DInfo | null => {
    if (!selectedComponentId) return null;
    const exact = topic.interactiveComponents.find((c) => c.id === selectedComponentId);
    if (exact) return exact;

    const matchByPartial = topic.interactiveComponents.find(
      (c) => selectedComponentId.includes(c.id) || c.id.includes(selectedComponentId)
    );
    if (matchByPartial) return matchByPartial;

    const archComp = topic.coreArchitecture.components.find((ac) =>
      ac.name.toLowerCase().includes(selectedComponentId.split('-')[0].toLowerCase())
    );
    if (archComp) {
      return {
        id: selectedComponentId,
        name: archComp.name,
        role: archComp.role,
        description: archComp.details,
      };
    }

    return {
      id: selectedComponentId,
      name: selectedComponentId.replace(/-/g, ' ').toUpperCase(),
      role: `${topic.category} Component`,
      description: `Active interactive node within ${topic.title}. Click other 3D nodes to compare responsibilities.`,
    };
  };

  const sceneProps: Scene3DProps = {
    step: currentStep,
    selectedComponentId,
    onSelectComponent: setSelectedComponentId,
    showLabels,
    activeMode,
    speed,
    variant: topic.visualizationVariant,
  };

  const render3DScene = () => {
    switch (topic.visualizationScene) {
      case 'reverse-proxy':
        return <ReverseProxyScene3D {...sceneProps} />;
      case 'load-balancer':
        return <LoadBalancerScene3D {...sceneProps} />;
      case 'database-sharding':
        return <DatabaseShardingScene3D {...sceneProps} />;
      case 'database-replication':
        return <DatabaseReplicationScene3D {...sceneProps} />;
      case 'caching':
        return <CachingScene3D {...sceneProps} />;
      case 'cache-eviction':
        return <CacheEvictionScene3D {...sceneProps} />;
      case 'cdn':
        return <CdnNetworkScene3D {...sceneProps} />;
      case 'api-gateway':
        return <ApiGatewayScene3D {...sceneProps} />;
      case 'microservices':
        return <MicroservicesScene3D {...sceneProps} />;
      case 'message-queue':
        return <MessageQueueScene3D {...sceneProps} />;
      case 'consistent-hashing':
        return <ConsistentHashingScene3D {...sceneProps} />;
      case 'cap-theorem':
        return <CapTheoremScene3D {...sceneProps} />;
      case 'circuit-breaker':
        return <CircuitBreakerScene3D {...sceneProps} />;
      case 'scaling-architecture':
        return <ScalingArchitectureScene3D {...sceneProps} />;
      case 'osi-model':
        return <OsiModelScene3D {...sceneProps} />;
      case 'tcp-handshake':
        return <TcpHandshakeScene3D {...sceneProps} />;
      case 'dns-resolution':
        return <DnsResolutionScene3D {...sceneProps} />;
      case 'routing-switching':
        return <RoutingSwitchingScene3D {...sceneProps} />;
      case 'vpn-firewall':
        return <VpnFirewallScene3D {...sceneProps} />;
      case 'http-https':
        return <HttpHttpsScene3D {...sceneProps} />;
      case 'network-topology':
        return <NetworkTopologyScene3D {...sceneProps} />;
      case 'case-study':
        return <CaseStudyArchitectureScene3D {...sceneProps} />;
      default:
        return <ReverseProxyScene3D {...sceneProps} />;
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-dark-950 shadow-2xl flex flex-col">
      {/* Top Controls Toolbar */}
      <div className="p-3 bg-dark-900/90 border-b border-slate-800/80 z-10 space-y-2.5">
        <VisualizerToolbar
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onRestart={handleRestart}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          canPrev={currentStepIndex > 0}
          canNext={currentStepIndex < totalSteps - 1}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
          speed={speed}
          onChangeSpeed={handleChangeSpeed}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetCamera={handleResetCamera}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((prev) => !prev)}
          is2DView={is2DView}
          onToggle2DView={() => setIs2DView((prev) => !prev)}
        />

        {/* Interactive Mode / Algorithm Switcher when topic supports multiple simulation modes */}
        {topic.visualizationModes && topic.visualizationModes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
              <Sliders className="w-3 h-3 text-cyan-400" />
              Simulation Mode:
            </span>
            {topic.visualizationModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  activeMode === mode.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : 'bg-dark-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-dark-950 flex items-center justify-center">
        {is2DView || !webGlAvailable ? (
          <Architecture2DFallback
            topic={topic}
            step={currentStep}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
            showLabels={showLabels}
          />
        ) : (
          <CanvasErrorBoundary
            fallback={
              <Architecture2DFallback
                topic={topic}
                step={currentStep}
                selectedComponentId={selectedComponentId}
                onSelectComponent={setSelectedComponentId}
                showLabels={showLabels}
              />
            }
          >
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center gap-3 text-cyan-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-sm font-mono text-slate-400">Loading 3D Architecture Scene...</span>
                </div>
              }
            >
              <Canvas
                shadows
                dpr={[1, 1.5]}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                gl={{ antialias: true, alpha: true }}
              >
                <PerspectiveCamera makeDefault position={[0, 2.8, 10.2]} fov={45} />
                <ambientLight intensity={0.75} />
                <directionalLight position={[10, 15, 10]} intensity={1.25} castShadow />
                <pointLight position={[-8, 6, -5]} intensity={0.85} color="#06b6d4" />
                <pointLight position={[8, -4, 5]} intensity={0.65} color="#8b5cf6" />

                {render3DScene()}

                <CameraController controlsRef={controlsRef} zoomSignal={zoomSignal} />
                <OrbitControls
                  ref={controlsRef}
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={4}
                  maxDistance={20}
                  maxPolarAngle={Math.PI / 2 + 0.15}
                />
              </Canvas>
            </Suspense>
          </CanvasErrorBoundary>
        )}

        <ComponentDetailModal component={resolveComponent()} onClose={() => setSelectedComponentId(null)} />

        {!is2DView && (
          <div className="absolute bottom-3 right-3 pointer-events-none px-2.5 py-1 rounded-full bg-dark-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-sm hidden sm:block">
            Drag to Rotate | Scroll or Buttons to Zoom | Click Node to Inspect
          </div>
        )}
      </div>

      {/* Step Explanation Panel */}
      <div className="p-3 bg-dark-900/95 border-t border-slate-800/80">
        <StepExplanationPanel
          step={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onSelectStep={(idx) => {
            setIsPlaying(false);
            setCurrentStepIndex(idx);
          }}
        />
      </div>
    </div>
  );
};
