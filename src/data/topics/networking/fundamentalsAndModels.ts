import { TopicContent } from '../../../types';

export const netFundamentalsAndModelsTopics: Record<string, TopicContent> = {
  'networking-basics': {
    id: 'networking-basics',
    title: 'What is Computer Networking? (LAN, MAN, WAN & PAN)',
    module: 'networking',
    category: '1. Networking Fundamentals',
    readTime: '7 min',
    difficulty: 'Beginner',
    summary: 'Computer networking interconnects independent computing devices to exchange data and share resources across Personal (PAN), Local (LAN), Metropolitan (MAN), and global Wide Area Networks (WAN).',
    introduction: {
      definition: 'A computer network is an interconnected graph of hosts (laptops, phones, servers) and forwarding hardware (switches, routers) exchanging standardized digital packets over copper, fiber optic, or wireless links.',
      analogousStory: 'Think of transportation networks: PAN is walking between rooms in your house (Bluetooth); LAN is driving inside a gated office campus (Ethernet/Wi-Fi); MAN is a city subway linking campuses across town; WAN is international airlines and highways connecting continents (the Internet).',
      keyTakeaway: 'Scale and ownership define network boundaries: Switches glue local LAN subnets together, while Routers stitch LANs into global WANs.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates physical disk "sneakernet" copying by sharing files, printers, and cloud applications instantaneously.',
        'Connects distributed global server clusters into one unified Internet.',
      ],
      realWorldImpact: 'Over 5 billion people and 30+ billion IoT devices communicate simultaneously over layered LAN-to-WAN interconnections.',
      metricsAffected: ['Hop Count', 'Geographic Reach', 'Propagation Delay (ms)'],
    },
    coreArchitecture: {
      description: 'Local devices link through Layer 2 Switches inside a LAN, crossing Layer 3 Routers across WAN backbones to reach remote subnets.',
      components: [
        { name: 'PAN (Personal Area Network)', role: '1–10 Meters', details: 'Bluetooth headphones, smartwatches, and USB tethering around one individual.' },
        { name: 'LAN (Local Area Network)', role: 'Room / Building / Campus', details: 'High-speed Gigabit Ethernet or Wi-Fi connecting local machines behind one Switch/Router.' },
        { name: 'MAN & WAN (Internet)', role: 'City / Global Scope', details: 'ISP fiber backbones linking disparate cities and continents via BGP Routers.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Local LAN Framing', technicalDetail: 'Host A wraps payload in Ethernet frame and passes through local Switch.' },
        { stepNumber: 2, action: 'Gateway Router Handoff', technicalDetail: 'If destination IP lies outside local subnet, Router strips MAC frame and routes packet across WAN.' },
        { stepNumber: 3, action: 'Destination LAN Delivery', technicalDetail: 'Remote Router delivers packet through local Switch B to Host B.' },
      ],
    },
    visualizationId: 'net-basics-3d',
    visualizationScene: 'routing-switching',
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Host A Sends Frame Inside Local LAN', description: 'Host A inside Subnet 192.168.1.0/24 sends an Ethernet frame to local Switch A.', activeNodes: ['pc-a', 'switch-a'], packet: { from: 'pc-a', to: 'switch-a', label: 'LAN Frame (Local Switch)', type: 'request' } },
      { step: 2, title: 'Step 2: Local Router Bridges LAN to WAN', description: 'Router A forwards the IP packet across the WAN ISP backbone toward Router B.', activeNodes: ['router-a', 'router-b'], packet: { from: 'router-a', to: 'router-b', label: 'Cross-WAN IP Transit', type: 'sync' } },
      { step: 3, title: 'Step 3: Remote Switch Delivers to Destination Host', description: 'Router B hands frame to Switch B, delivering straight to Host B in remote LAN.', activeNodes: ['switch-b', 'pc-b'], packet: { from: 'switch-b', to: 'pc-b', label: 'Deliver Remote Host B', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'pc-a', name: 'Source Host A (LAN 1)', role: 'Origin Device', description: 'Desktop inside local office/home LAN.' },
      { id: 'switch-a', name: 'Local LAN Switch A', role: 'L2 Switch', description: 'Connects devices inside the same building subnet.' },
      { id: 'router-a', name: 'Border Router A', role: 'LAN-to-WAN Gateway', description: 'Forwards packets beyond the local building.' },
      { id: 'router-b', name: 'Remote Border Router B', role: 'WAN Entry', description: 'Receives packets arriving across ISP WAN backbones.' },
      { id: 'switch-b', name: 'Remote LAN Switch B', role: 'L2 Switch', description: 'Delivers frame on destination subnet.' },
      { id: 'pc-b', name: 'Destination Host B (LAN 2)', role: 'Target Server/PC', description: 'Receives transmitted packet.' },
    ],
    realWorldExample: {
      company: 'University Campus Network',
      scenario: 'Connecting 30,000 student laptops across dorms (LANs) to global research clouds (WAN).',
      implementation: 'Each dorm building runs switched Gigabit Ethernet/Wi-Fi LANs aggregated through fiber MAN links across campus into redundant border routers peering with global Tier-1 WAN ISPs.',
      scaleDetails: 'Routes terabytes per hour between local classrooms and external internet servers.',
    },
    advantages: [
      'Enables seamless global communication, shared cloud resources, and centralized services.',
    ],
    disadvantages: [
      'Exposure across shared networks necessitates firewalls, encryption, and access controls.',
    ],
    relatedTopics: [
      { id: 'network-topologies', title: 'Network Topologies', module: 'networking' },
      { id: 'routing-vs-switching', title: 'Routing vs Switching', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Rank PAN, LAN, MAN, and WAN from smallest to largest geographic footprint.', answer: 'PAN (Personal, ~10m, e.g., Bluetooth) < LAN (Local building/home) < MAN (Metropolitan city-wide fiber) < WAN (Wide Area spanning countries/continents, e.g., the Internet).', keyPoints: ['PAN < LAN < MAN < WAN'] },
      { level: 'intermediate', question: 'Why is an Ethernet Switch used inside a LAN while a Router is needed to cross into a WAN?', answer: 'Switches forward frames rapidly within ONE broadcast domain using flat hardware MAC addresses. Routers connect DIFFERENT IP networks/subnets across WAN hops using hierarchical IP routing tables.', keyPoints: ['Switch = Intra-LAN MAC delivery', 'Router = Inter-network IP path selection'] },
      { level: 'advanced', question: 'How do modern "SD-WAN" networks optimize enterprise WAN connections over traditional MPLS?', answer: 'Legacy MPLS leased private lines are expensive and rigid. Software-Defined WAN (SD-WAN) overlays encrypted IPSec tunnels across cheap commodity broadband + 5G + MPLS links simultaneously, dynamically steering latency-sensitive video/VoIP packets onto whichever link currently has the lowest packet loss and jitter.', keyPoints: ['SD-WAN bonds multiple ISP links with software control', 'Dynamically steers traffic by live latency/loss'] },
    ],
    quiz: [
      { id: 'nb-1', question: 'Which network type connects wireless earbuds to your smartphone over a 5-meter range?', options: ['PAN (Personal Area Network)', 'WAN', 'MAN', 'SAN'], correctAnswer: 0, explanation: 'Personal Area Networks cover immediate human-radius devices.' },
      { id: 'nb-2', question: 'Which network spans countries and oceans, with the public Internet as its largest example?', options: ['WAN (Wide Area Network)', 'PAN', 'LAN', 'VLAN'], correctAnswer: 0, explanation: 'WANs connect distant LANs across cities and continents.' },
      { id: 'nb-3', question: 'What hardware device connects devices together inside a single Local Area Network (LAN)?', options: ['Ethernet Switch', 'DNS Root Server', 'Browser Cache', 'SQL Database'], correctAnswer: 0, explanation: 'Switches forward Ethernet frames locally across LAN ports.' },
      { id: 'nb-4', question: 'What type of network links multiple campus buildings across a single metropolitan city?', options: ['MAN (Metropolitan Area Network)', 'PAN', 'Bluetooth Mesh', 'Local Loopback'], correctAnswer: 0, explanation: 'MANs span city/campus-wide fiber backbones.' },
      { id: 'nb-5', question: 'Which characteristic typically distinguishes a LAN from a WAN?', options: ['LANs offer much higher speeds (1-100 Gbps), lower latency (<1ms), and single-org private ownership', 'LANs are slower than dial-up', 'WANs never use routers', 'LANs require satellite dishes'], correctAnswer: 0, explanation: 'Local cabling delivers far higher speeds and lower RTTs than wide-area hops.' },
    ],
  },

  'network-topologies': {
    id: 'network-topologies',
    title: 'Network Topologies (Star, Mesh, Ring, Bus & Tree)',
    module: 'networking',
    category: '1. Networking Fundamentals',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'Network topology defines how physical or logical nodes and links interconnect—directly determining fault resilience, cabling cost, and bottleneck risks across Star, Mesh, Ring, and Bus layouts.',
    introduction: {
      definition: 'Network topology describes the geometric arrangement of hosts and communication links. Every topology balances fault tolerance against cable/port complexity.',
      analogousStory: 'In a Star topology, every house connects straight to one central town roundabout (easy to wire, but if the roundabout floods, everyone stops). In a Full Mesh, every house has a direct private road to every other house (zero central failure, yet way too many roads!).',
      keyTakeaway: 'Modern LANs overwhelmingly use **Star** (or hierarchical Spine-Leaf Tree) topologies; internet ISP backbones and resilient clusters use **Partial/Full Mesh**.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents total network collapse when a single node or cable breaks (Bus failure vs Star/Mesh resilience).',
        'Calculates exact physical wiring complexity (`N*(N-1)/2` links for Full Mesh).',
      ],
      realWorldImpact: 'Cloud data centers evolved from 3-tier Tree topologies into high-bisection-bandwidth Leaf-Spine (Clos Mesh) fabrics.',
      metricsAffected: ['Link Count Cost', 'Single Point of Failure Immunity', 'Bisection Bandwidth'],
    },
    coreArchitecture: {
      description: 'Interactive 3D comparison of Star (central switch), Full Mesh (`N(N-1)/2` redundant links), Ring (token circle), and Bus (shared backbone).',
      components: [
        { name: 'Star Topology', role: 'Central Hub/Switch', details: 'Every node connects directly to one central switch; 1 broken cable affects only 1 host.' },
        { name: 'Mesh Topology', role: 'Maximum Redundancy', details: 'Multiple redundant paths between nodes (`N*(N-1)/2` links in Full Mesh); survives multiple link cuts.' },
        { name: 'Ring & Bus Topologies', role: 'Legacy / Optical Loops', details: 'Bus shares one coaxial cable (collisions); Ring passes tokens sequentially (used in optical SONET rings).' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Switch Topologies Live in 3D', technicalDetail: 'Click Star, Mesh, Ring, or Bus in the Simulation Mode toolbar above to transform the 3D geometry live!' },
        { stepNumber: 2, action: 'Evaluate Failure Impact', technicalDetail: 'Notice in Star, cutting the center stops everyone; in Mesh, packets simply take alternate paths.' },
      ],
    },
    visualizationId: 'topo-3d',
    visualizationScene: 'network-topology',
    visualizationModes: [
      { id: 'star', label: 'Star Topology' },
      { id: 'mesh', label: 'Full Mesh Topology' },
      { id: 'ring', label: 'Ring Topology' },
      { id: 'bus', label: 'Bus Topology' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Explore Topology Interconnects', description: 'Switch between Star, Mesh, Ring, and Bus modes above to inspect link counts and fault tolerance paths in 3D!', activeNodes: ['hub-switch', 'topo-node-0'], packet: { from: 'topo-node-0', to: 'hub-switch', label: 'Topology Packet Flow', type: 'request' } },
    ],
    interactiveComponents: [
      { id: 'hub-switch', name: 'Central Star Switch', role: 'Core Aggregator', description: 'Connects every leaf node in a Star topology.' },
      { id: 'topo-node-0', name: 'Network Node 1', role: 'Endpoint Host', description: 'Transmits frames across active topology links.' },
      { id: 'topo-node-1', name: 'Network Node 2', role: 'Endpoint Host', description: 'Receives packets via switch or direct mesh link.' },
      { id: 'topo-node-2', name: 'Network Node 3', role: 'Endpoint Host', description: 'Peer host node.' },
    ],
    realWorldExample: {
      company: 'Modern Cloud Data Centers (Spine-Leaf Mesh)',
      scenario: 'Connecting 50,000 server racks inside an AI training / AWS Availability Zone.',
      implementation: 'Data centers deploy a two-tier Spine-Leaf (Bipartite Mesh) topology where every Leaf top-of-rack switch connects directly to every Spine core switch—guaranteeing uniform 2-hop latency and zero single switch bottlenecks.',
      scaleDetails: 'Delivers petabit/sec East-West internal bisection bandwidth.',
    },
    advantages: [
      'Star: Easy troubleshooting and adding/removing cables without disturbing peers.',
      'Mesh: Unmatched fault tolerance and zero central switch bottlenecks.',
    ],
    disadvantages: [
      'Full Mesh cabling grows quadratically `O(N^2)`—unusable above ~10-20 direct devices.',
      'Bus: A single break in the main backbone cable brings down the entire network.',
    ],
    relatedTopics: [
      { id: 'networking-basics', title: 'Networking Basics', module: 'networking' },
      { id: 'routing-vs-switching', title: 'Routing vs Switching', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'In a Full Mesh network with 6 nodes, how many direct cables are required?', answer: 'Using `N × (N - 1) / 2`: `6 × 5 / 2 = 15` direct point-to-point cables.', keyPoints: ['Formula: N(N-1)/2', 'Quadratic O(N^2) cable explosion'] },
      { level: 'intermediate', question: 'Why did offices abandon Bus topology in favor of Switched Star topology?', answer: 'In coax Bus topology, all hosts shared one wire—causing frequent signal collisions (CSMA/CD), easy snooping, and total network death if the main cable broke or lacked a terminator. Switched Star gives every node a dedicated full-duplex cable.', keyPoints: ['Dedicated collision-free full duplex cables', 'Broken drop cable isolates only 1 PC'] },
      { level: 'advanced', question: 'Why is a "Leaf-Spine" (Clos) topology superior to a classic 3-tier Tree topology inside modern cloud data centers?', answer: 'Legacy 3-tier trees choke when East-West server-to-server traffic explodes (like distributed databases and AI clusters) and lose half their links to Spanning Tree Protocol (STP) loop blocking. Leaf-Spine allows active ECMP multi-path routing across ALL uplinks simultaneously with predictable fixed hop latency.', keyPoints: ['High East-West server-to-server bandwidth', 'Active ECMP across all uplinks (no STP blocked ports)'] },
    ],
    quiz: [
      { id: 'ntop-1', question: 'How many point-to-point links are needed for a Full Mesh of 10 routers?', options: ['45 links', '10 links', '100 links', '9 links'], correctAnswer: 0, explanation: '10 × 9 / 2 = 45 distinct bidirectional links.' },
      { id: 'ntop-2', question: 'Which topology isolates a broken cable to just one workstation while keeping all other computers online?', options: ['Star Topology', 'Bus Topology', 'Unidirectional Single Ring', 'Daisy Chain'], correctAnswer: 0, explanation: 'Each host uses an independent cable into the central switch.' },
      { id: 'ntop-3', question: 'What happens if the central backbone cable in a Bus topology snaps?', options: ['Signal reflections crash communication for the entire network', 'Only 1 computer disconnects', 'Traffic routes via Bluetooth automatically', 'Bandwidth doubles'], correctAnswer: 0, explanation: 'Bus networks depend on a single continuous terminated coaxial line.' },
      { id: 'ntop-4', question: 'Which topology eliminates all Single Points of Failure (SPOFs) by providing multiple alternate routes?', options: ['Mesh Topology', 'Single-Switch Star', 'Bus', 'Simplex Chain'], correctAnswer: 0, explanation: 'Redundant interconnects reroute cleanly around dead links or switches.' },
      { id: 'ntop-5', question: 'Which topology powers virtually all modern home and office wired Ethernet LANs?', options: ['Star (or Extended Star / Tree)', 'Coaxial Bus', 'Token Ring', 'Full Mesh between laptops'], correctAnswer: 0, explanation: 'PCs wire directly into central Ethernet switches.' },
    ],
  },

  'bandwidth-latency-throughput': {
    id: 'bandwidth-latency-throughput',
    title: 'Bandwidth, Latency, Throughput, Jitter & Packet Loss',
    module: 'networking',
    category: '1. Networking Fundamentals',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'Bandwidth is theoretical max capacity; Throughput is actual data delivered per second; Latency is one-way/round-trip time delay; Jitter is latency variance; Packet Loss is dropped datagrams.',
    introduction: {
      definition: 'Network performance cannot be measured by "megabits" alone. High bandwidth does NOT mean low latency! Bandwidth measures pipe width (Mbps/Gbps), Latency measures transit travel time (ms), and Throughput measures real sustained data rate after overhead and packet loss.',
      analogousStory: 'Imagine shipping hard drives from New York to Los Angeles. A Boeing 747 loaded with 10,000 SSDs has COLOSSAL Bandwidth (petabits per day!), yet terrible Latency (a 6-hour flight just to say "Hi!"). Meanwhile a fiber wire carrying 1 Mbps has tiny Bandwidth yet instant ~40ms Latency!',
      keyTakeaway: 'Gaming and Zoom care deeply about low **Latency** & **Jitter**; 4K movie downloads and backups care about high **Throughput** & **Bandwidth**.',
    },
    whyRequired: {
      problemsSolved: [
        'Explains why upgrading from 100 Mbps to 1 Gbps fiber doesn\'t reduce your 150ms overseas game ping!',
        'Diagnoses choppy VoIP/Zoom audio (Jitter & Packet Loss) vs slow file downloads (Low Throughput / Bandwidth-Delay Product).',
      ],
      realWorldImpact: 'Every cloud SLA and video streaming protocol optimizes around the Bandwidth-Delay Product (`Bandwidth × RTT`).',
      metricsAffected: ['Round-Trip Time (RTT ms)', 'Goodput / Throughput (Mbps)', 'Packet Loss (%)', 'Jitter (ms variance)'],
    },
    coreArchitecture: {
      description: 'Compare single-stream latency delays against HTTP/2 parallel multiplexed throughput streams across network pipes.',
      components: [
        { name: 'Bandwidth (Pipe Width)', role: 'Theoretical Max Capacity', details: 'Physical link ceiling (e.g., 1 Gbps fiber).' },
        { name: 'Latency (Speed of Light + Queues)', role: 'Travel Time (ms)', details: 'Sum of Propagation + Transmission + Queueing + Processing delays.' },
        { name: 'Throughput & Goodput', role: 'Actual Useful Rate', details: 'Actual payload bytes delivered per second after TCP headers, congestion, and retransmissions.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Measure Latency Components', technicalDetail: 'Packet incurs Processing (router lookup), Queueing (buffer wait), Transmission (`Size/BW`), and Propagation (`Distance/c`).' },
        { stepNumber: 2, action: 'Observe Throughput Drop Under Packet Loss', technicalDetail: 'Just 1% packet loss forces TCP Congestion Control to halve throughput over high-latency links!' },
      ],
    },
    visualizationId: 'bw-lat-3d',
    visualizationScene: 'http-https',
    visualizationModes: [
      { id: 'http2-multiplex', label: 'High Throughput (Parallel Streams)' },
      { id: 'https-tls', label: 'Sequential RTT Latency' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Compare Latency vs Parallel Throughput', description: 'Toggle modes above! Sequential handshakes suffer RTT Latency; parallel multiplexed streams maximize pipe Bandwidth/Throughput.', activeNodes: ['browser', 'web-server'], packet: { from: 'browser', to: 'web-server', label: 'Multiplexed Bandwidth Streams', type: 'request' } },
    ],
    interactiveComponents: [
      { id: 'browser', name: 'Sender Endpoint', role: 'Transmitter', description: 'Pumps packets into network pipe constrained by TCP Window size.' },
      { id: 'tls-layer', name: 'Network Pipe (BW & Latency)', role: 'Physical & Queued Medium', description: 'Applies physical distance delay, queuing delay, and bandwidth caps.' },
      { id: 'web-server', name: 'Receiver Endpoint', role: 'Throughput Sink', description: 'Measures delivered Goodput and ACKs.' },
    ],
    realWorldExample: {
      company: 'Starlink LEO Satellites vs Geostationary Satellites',
      scenario: 'Why old satellite internet felt painfully sluggish even at 50 Mbps download.',
      implementation: 'Geostationary satellites orbit 35,786 km up—forcing radio signals into a mandatory ~600ms round-trip Latency just due to the speed of light! Starlink flies Low-Earth Orbit (~550 km), cutting Latency down to ~25-40ms.',
      scaleDetails: 'Speed of light delay drops 15x by moving satellites closer to Earth.',
    },
    advantages: [
      'Understanding all 4 metrics lets engineers tune TCP Window Scaling (`BDP`) and pick the right CDN/protocol.',
    ],
    disadvantages: [
      'Long high-bandwidth WAN links suffer dramatic throughput collapse if TCP receive windows are too small (`Bandwidth-Delay Product` limit).',
    ],
    relatedTopics: [
      { id: 'tcp-flow-congestion-control', title: 'TCP Flow & Congestion Control', module: 'networking' },
      { id: 'http-evolution-http1-2-3', title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the difference between Bandwidth and Throughput?', answer: 'Bandwidth is the theoretical maximum capacity of a link (e.g., 1,000 Mbps Ethernet). Throughput is the actual rate of data successfully transferred in practice (e.g., 640 Mbps after protocol headers, Wi-Fi interference, and TCP congestion backoff).', keyPoints: ['Bandwidth = Theoretical max ceiling', 'Throughput = Actual achieved transfer rate'] },
      { level: 'intermediate', question: 'List the 4 sources of total Packet Latency across a network.', answer: '1) Transmission Delay (`Packet Size / Bandwidth`), 2) Propagation Delay (`Physical Distance / Speed of Signal in medium`), 3) Queueing Delay (waiting in busy router buffers—the biggest variable cause of Jitter!), 4) Processing Delay (router reading headers/checksums).', keyPoints: ['Transmission + Propagation + Queueing + Processing'] },
      { level: 'advanced', question: 'Explain the "Bandwidth-Delay Product (BDP)" and why high-latency 10 Gbps links get stuck at slow speeds without TCP Window Scaling.', answer: 'BDP (`Bandwidth × RTT`) equals how many bytes can be "in flight" on the wire at once. On a 1 Gbps link with 100ms RTT, `BDP = 125 MB/s × 0.1s = 12.5 MB`! Classic 16-bit TCP headers cap window size at only `65 KB`—meaning the sender fills 65 KB and sits idle waiting 100ms! TCP Window Scaling (RFC 7323) expands the window up to 1 GB so the pipe stays 100% full.', keyPoints: ['BDP = Bandwidth × RTT', 'Default 64KB TCP window starves fast long-distance links', 'Requires TCP Window Scaling'] },
    ],
    quiz: [
      { id: 'blt-1', question: 'What is "Jitter" in computer networking?', options: ['Variation in packet arrival latency over time (causing choppy voice/video calls)', 'Theoretical max fiber capacity', 'MAC address length', 'DNS TTL expiry'], correctAnswer: 0, explanation: 'Jitter measures inconsistent delay spikes between consecutive packets.' },
      { id: 'blt-2', question: 'Which factor primarily dictates minimum Propagation Delay between New York and Tokyo?', options: ['Physical distance divided by speed of light in fiber (~200,000 km/s)', 'User\'s RAM size', 'Font size on webpage', 'Number of SQL columns'], correctAnswer: 0, explanation: 'Physics bounds signal speed through glass fiber.' },
      { id: 'blt-3', question: 'Why is actual Throughput always strictly less than raw Link Bandwidth?', options: ['Protocol headers (Ethernet/IP/TCP), congestion backoffs, and retransmitted packet loss consume capacity', 'Bandwidth is measured in years', 'Switches delete half of bytes', 'TCP disables links'], correctAnswer: 0, explanation: 'Framing overhead and congestion keep real throughput below theoretical link speed.' },
      { id: 'blt-4', question: 'Which network delay increases dramatically during sudden internet router congestion?', options: ['Queueing Delay inside router packet buffers', 'Speed of light in vacuum', 'Cable physical length', 'Packet bit size'], correctAnswer: 0, explanation: 'Packets waiting in congested router queues cause Latency spikes ("Bufferbloat").' },
      { id: 'blt-5', question: 'What real-time application suffers worst from 5% Packet Loss and 80ms Jitter?', options: ['Live VoIP Voice/Video Calls & Competitive Multiplayer Gaming', 'Downloading an offline PDF textbook', 'Sending an asynchronous email', 'Nightly SQL tape backups'], correctAnswer: 0, explanation: 'Real-time interactive audio/gaming cannot buffer indefinitely for late packets.' },
    ],
  },

  'osi-layer-responsibilities': {
    id: 'osi-layer-responsibilities',
    title: 'PDUs & Data Encapsulation: Bits, Frames, Packets, Segments',
    module: 'networking',
    category: '2. The OSI 7-Layer Model',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Follow how user payloads transform at every OSI boundary via Header Encapsulation (Data -> Segment -> Packet -> Frame -> Bits) and Header Stripping Decapsulation at the destination.',
    introduction: {
      definition: 'Protocol Data Units (PDUs) name the packaged unit of data at each OSI layer. Encapsulation wraps downward payloads with control headers (ports, IPs, MACs); Decapsulation unwraps headers upward at the receiver.',
      analogousStory: 'Putting a confidential memo inside an inner sealed envelope labeled with Apartment #443 (TCP Segment), placing that inside a shipping box labeled with Street Address (IP Packet), loading it onto a tagged cargo pallet (Ethernet Frame), and rolling it across asphalt (Physical Bits).',
      keyTakeaway: 'Switches inspect only up to Layer 2 (Frames); Routers inspect up to Layer 3 (Packets), swapping Layer 2 MAC headers at every single hop while keeping Layer 3 IP headers untouched!',
    },
    whyRequired: {
      problemsSolved: [
        'Explains MTU (1500 byte Maximum Transmission Unit) fragmentation limits.',
        'Shows how intermediate routers swap hop-by-hop MACs without altering end-to-end IPs.',
      ],
      realWorldImpact: 'Every network engineer debugging Wireshark packet captures reads nested Layer 2 -> Layer 3 -> Layer 4 -> Layer 7 headers inside one frame.',
      metricsAffected: ['Header Overhead Bytes (~54-66 bytes/packet)', 'MTU (1500 Bytes)', 'NIC Hardware Offloading'],
    },
    coreArchitecture: {
      description: 'Nested packet anatomy showing Layer 2 Ethernet header (14B + 4B FCS), Layer 3 IPv4 header (20B), Layer 4 TCP header (20B), and Layer 7 payload.',
      components: [
        { name: 'Layer 4 Segment / Datagram', role: 'Ports + Seq/Ack', details: '20-byte TCP header adding Source/Dest Ports and reliability checksums.' },
        { name: 'Layer 3 IP Packet', role: 'Src/Dst IP + TTL', details: '20-byte IPv4 header enabling global routing and hop-limit TTL.' },
        { name: 'Layer 2 Ethernet Frame', role: 'Src/Dst MAC + CRC', details: '14-byte MAC header + 4-byte Trailer checksum for local wire error detection.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Encapsulate Downward (Sender)', technicalDetail: 'App Data -> +TCP Header (Segment) -> +IP Header (Packet) -> +Ethernet Header & Trailer (Frame) -> Bits.' },
        { stepNumber: 2, action: 'Hop-by-Hop L2 Rewrite', technicalDetail: 'Each router strips old L2 Ethernet MAC header, decrements IP TTL by 1, and attaches next-hop MAC header.' },
        { stepNumber: 3, action: 'Decapsulate Upward (Receiver)', technicalDetail: 'Server NIC verifies CRC trailer, OS strips IP & TCP headers, and delivers clean HTTP Data to port 443 app.' },
      ],
    },
    visualizationId: 'osi-pdu-3d',
    visualizationScene: 'osi-model',
    visualizationModes: [
      { id: 'decapsulation', label: 'Decapsulation (Wire -> App)' },
      { id: 'encapsulation', label: 'Encapsulation (App -> Wire)' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Physical Bits Arrive at Receiver NIC', description: 'Toggle Decapsulation vs Encapsulation above! Raw bits assemble into a Layer 2 Frame and validate CRC checksum.', activeNodes: ['layer-1', 'layer-2'], packet: { from: 'layer-1', to: 'layer-2', label: 'Bits -> Ethernet Frame', type: 'request' } },
      { step: 2, title: 'Step 2: Strip MAC -> Inspect IP Packet (Layer 3)', description: 'OS strips Ethernet header and confirms Destination IP matches this host.', activeNodes: ['layer-3'], packet: { from: 'layer-2', to: 'layer-3', label: 'Unwrap IP Packet', type: 'sync' } },
      { step: 3, title: 'Step 3: Strip TCP Segment -> Deliver App Data (L4->L7)', description: 'TCP reorders bytes by sequence number, strips header, and passes clean payload to Port 443 server!', activeNodes: ['layer-4', 'layer-7'], packet: { from: 'layer-4', to: 'layer-7', label: 'Deliver Clean HTTP Data', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'layer-7', name: 'Layer 7: Application Data', role: 'Payload', description: 'HTTP/JSON/DNS user payload.' },
      { id: 'layer-4', name: 'Layer 4: Segment / Datagram', role: 'Transport Header', description: 'Contains Source/Dest Ports + Seq/Ack.' },
      { id: 'layer-3', name: 'Layer 3: IP Packet', role: 'Network Header', description: 'Contains Source/Dest IP + TTL.' },
      { id: 'layer-2', name: 'Layer 2: Ethernet Frame', role: 'Data Link Header + FCS', description: 'Contains Local Hop Src/Dst MAC + CRC check.' },
      { id: 'layer-1', name: 'Layer 1: Raw Bits', role: 'Physical Medium', description: 'Electrical/Optical/RF 0s and 1s.' },
    ],
    realWorldExample: {
      company: 'Ethernet Jumbo Frames & Cloud VPCs (VXLAN)',
      scenario: 'Avoiding header overhead across 100 Gbps cloud virtual networks.',
      implementation: 'Cloud providers like AWS/GCP wrap guest virtual machine Ethernet frames INSIDE UDP+IP outer VXLAN tunnels (Encapsulation inside Encapsulation!), raising internal physical MTU to 9000 bytes (Jumbo Frames) so efficiency stays high.',
      scaleDetails: 'Allows isolated multi-tenant virtual networks across shared physical switches.',
    },
    advantages: [
      'Clean separation lets Ethernet swap to Wi-Fi seamlessly at Layer 2 without changing TCP/IP or HTTP.',
    ],
    disadvantages: [
      'Tiny 1-byte payloads still pay ~54+ bytes of Ethernet+IP+TCP framing overhead.',
    ],
    relatedTopics: [
      { id: 'osi-model', title: 'The OSI 7-Layer Model', module: 'networking' },
      { id: 'tcp-ip-model', title: 'TCP/IP Architecture', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Match each PDU to its OSI layer: Bits, Frame, Packet, Segment.', answer: 'Layer 1 = Bits; Layer 2 = Frame; Layer 3 = Packet; Layer 4 = Segment (TCP) / Datagram (UDP).', keyPoints: ['1=Bits, 2=Frame, 3=Packet, 4=Segment'] },
      { level: 'intermediate', question: 'What is Ethernet MTU (1500 bytes), and what happens if you send a 4,000-byte packet?', answer: 'Standard Ethernet frames cap payload at 1500 bytes (Maximum Transmission Unit). Oversized packets are either fragmented into smaller IP packets (bad for performance/loss) or dropped with ICMP "Fragmentation Needed" so Path MTU Discovery (PMTUD) shrinks TCP MSS down to 1460 bytes cleanly.', keyPoints: ['Standard MTU = 1500 bytes', 'TCP MSS = 1460 bytes (1500 - 20B IP - 20B TCP)'] },
      { level: 'advanced', question: 'When a packet travels across 12 internet routers, which headers change at EVERY hop vs stay constant end-to-end?', answer: 'The Layer 2 Ethernet MAC headers (Src MAC / Dst MAC) are stripped and rewritten at EVERY single router hop to address the next physical machine on that link. The Layer 3 IP headers (Src IP / Dst IP) stay constant end-to-end (except TTL decrementing by 1 and NAT border rewrites).', keyPoints: ['L2 MACs change every hop', 'L3 IPs stay constant end-to-end (unless NAT)'] },
    ],
    quiz: [
      { id: 'pdu-1', question: 'What is the standard Ethernet Maximum Transmission Unit (MTU) payload size?', options: ['1,500 bytes', '64 bytes', '100 megabytes', '8 bits'], correctAnswer: 0, explanation: 'Standard IEEE 802.3 Ethernet frames carry up to 1,500 bytes of IP packet.' },
      { id: 'pdu-2', question: 'Why is a standard TCP Maximum Segment Size (MSS) commonly 1,460 bytes?', options: ['1,500 byte MTU minus 20B IPv4 header and 20B TCP header', 'Arbitrary random number', 'Because 1460 is a year', 'To double latency'], correctAnswer: 0, explanation: '1500 - 20 - 20 = 1460 bytes fits cleanly inside one Ethernet frame without fragmentation.' },
      { id: 'pdu-3', question: 'Which header gets replaced at every single intermediate router hop across the Internet?', options: ['Layer 2 Data Link MAC Header', 'Layer 7 HTTP URL', 'Layer 4 TCP Port', 'Application JSON'], correctAnswer: 0, explanation: 'MAC addresses only have local hop-by-hop link significance.' },
      { id: 'pdu-4', question: 'What field inside the Layer 3 IP header prevents a routing loop from circulating a packet infinitely?', options: ['TTL (Time-To-Live / Hop Limit)', 'Source Port', 'MAC Checksum', 'HTTP Cookie'], correctAnswer: 0, explanation: 'Each router decrements TTL by 1 and drops packets hitting 0.' },
      { id: 'pdu-5', question: 'What is the only OSI layer that typically attaches BOTH a Header AND a Trailer (CRC Frame Check Sequence)?', options: ['Layer 2 (Data Link Layer)', 'Layer 7 (Application)', 'Layer 5 (Session)', 'Layer 3 (Network)'], correctAnswer: 0, explanation: 'Ethernet attaches an FCS CRC-32 trailer for wire bit-error detection.' },
    ],
  },

  'tcp-ip-model': {
    id: 'tcp-ip-model',
    title: 'TCP/IP Architecture & OSI vs TCP/IP Comparison',
    module: 'networking',
    category: '3. TCP/IP Architecture',
    readTime: '9 min',
    difficulty: 'Beginner',
    summary: 'While the 7-layer OSI model serves as a theoretical teaching blueprint, the practical 4-layer TCP/IP Internet Protocol Suite actually powers the global Internet.',
    introduction: {
      definition: 'Developed by DARPA (Vint Cerf & Bob Kahn), the TCP/IP model condenses networking into four practical layers: Network Access (Link), Internet (IP), Transport (TCP/UDP), and Application (HTTP/DNS/SSH).',
      analogousStory: 'OSI is a formal textbook blueprint drawn by a committee of architects specifying 7 distinct floors. TCP/IP is the lean 4-story building engineers actually constructed first because it worked pragmatically in the real world!',
      keyTakeaway: 'TCP/IP merges OSI Layers 5–7 into one Application Layer and Layers 1–2 into one Network Access Layer—keeping IP (Layer 3) as the narrow waist of the entire internet.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminated the empty/redundant OSI Session and Presentation layers that modern apps handle inside HTTP/TLS libraries.',
        'Created the "Hourglass Model": countless apps above (HTTP, SSH, Zoom) and countless links below (Fiber, Wi-Fi, 5G) all interoperate solely via IP.',
      ],
      realWorldImpact: '100% of public Internet traffic runs on the TCP/IP protocol suite.',
      metricsAffected: ['Universal Interoperability', 'Protocol Simplicity', 'End-to-End Principle'],
    },
    coreArchitecture: {
      description: 'Four practical tiers: Application -> Transport -> Internet -> Network Access.',
      components: [
        { name: '4. Application Layer', role: 'OSI 5 + 6 + 7', details: 'Combines HTTP, TLS, DNS, SSH, SMTP directly inside user-space apps.' },
        { name: '3. Transport Layer', role: 'OSI 4', details: 'TCP, UDP, and QUIC managing ports, reliability, and congestion.' },
        { name: '2. Internet Layer', role: 'OSI 3', details: 'IPv4, IPv6, ICMP, BGP global packet routing.' },
        { name: '1. Network Access Layer', role: 'OSI 1 + 2', details: 'Ethernet, Wi-Fi, ARP, and physical wire signaling.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'App Formats & Encrypts', technicalDetail: 'Browser constructs HTTP + TLS right inside Application Layer.' },
        { stepNumber: 2, action: 'OS Kernel Transport + Internet', technicalDetail: 'OS kernel wraps TCP/UDP segment inside an IPv4/IPv6 packet.' },
        { stepNumber: 3, action: 'NIC Driver Network Access', technicalDetail: 'Network card frames Ethernet MACs and transmits physical pulses.' },
      ],
    },
    visualizationId: 'tcpip-3d',
    visualizationScene: 'osi-model',
    visualizationModes: [
      { id: 'encapsulation', label: 'TCP/IP Downward Stack' },
      { id: 'decapsulation', label: 'TCP/IP Upward Stack' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: TCP/IP Application Layer (Merges OSI 5-7)', description: 'Web apps combine HTTP formatting, JSON, and TLS encryption together at the top tier.', activeNodes: ['layer-7', 'layer-6', 'layer-5'], packet: { from: 'layer-7', to: 'layer-4', label: 'TCP/IP App Layer (HTTP+TLS)', type: 'request' } },
      { step: 2, title: 'Step 2: Transport & Internet Waist (TCP + IP)', description: 'OS kernel attaches TCP/UDP ports (L4) and IP addresses (L3) — the universal hourglass waist.', activeNodes: ['layer-4', 'layer-3'], packet: { from: 'layer-4', to: 'layer-3', label: 'TCP Segment -> IP Packet', type: 'sync' } },
      { stepNumber: 3, step: 3, title: 'Step 3: Network Access (Merges OSI 1-2)', description: 'Hardware driver frames Ethernet/Wi-Fi MACs and fires electrical/radio signals onto wire.', activeNodes: ['layer-2', 'layer-1'], packet: { from: 'layer-2', to: 'layer-1', label: 'Network Access Link', type: 'response' } } as any,
    ],
    interactiveComponents: [
      { id: 'layer-7', name: 'TCP/IP Application (OSI 5-7)', role: 'Merged Top Tier', description: 'Handles HTTP, DNS, SSH, and TLS encryption natively inside software.' },
      { id: 'layer-4', name: 'TCP/IP Transport (OSI 4)', role: 'Port & Delivery Tier', description: 'TCP reliable streams and UDP fast datagrams.' },
      { id: 'layer-3', name: 'TCP/IP Internet Layer (OSI 3)', role: 'The Narrow Waist (IP)', description: 'Unifies all links and applications worldwide around IPv4/IPv6.' },
      { id: 'layer-2', name: 'Network Access (OSI 1-2)', role: 'Hardware & Link Tier', description: 'Ethernet/Wi-Fi framing and physical bit signaling.' },
    ],
    realWorldExample: {
      company: 'IETF & The Modern Internet',
      scenario: 'Evolving from 1970s ARPANET to billions of mobile 5G + Fiber hosts without changing the core IP waist.',
      implementation: 'Because TCP/IP decouples apps from hardware via IP ("Hourglass architecture"), engineers invented Wi-Fi, 5G, and HTTP/3 without ever having to rewrite physical fiber routers.',
      scaleDetails: 'Connects 30+ billion devices globally on one unified protocol suite.',
    },
    advantages: [
      'Practical, battle-tested, simpler 4-layer model matching real OS kernel vs user-space splits.',
    ],
    disadvantages: [
      'Grouping Physical + Data Link together hides distinctions when diagnosing cable vs MAC switch problems (where OSI shines).',
    ],
    relatedTopics: [
      { id: 'osi-model', title: 'The OSI 7-Layer Model', module: 'networking' },
      { id: 'ip-addressing-ipv4-ipv6', title: 'IP Addressing (IPv4 vs IPv6)', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Which 3 layers of the OSI model are merged into the single TCP/IP Application Layer?', answer: 'Application (7), Presentation (6), and Session (5) are all merged into the TCP/IP Application Layer.', keyPoints: ['OSI 5, 6, 7 -> TCP/IP Application Layer'] },
      { level: 'intermediate', question: 'Why is the Internet Architecture often called an "Hourglass Model" centered on IP?', answer: 'There are dozens of physical link technologies at the bottom (Ethernet, Wi-Fi, 5G, Fiber, Satellite) and hundreds of application protocols at the top (HTTP, SSH, BitTorrent, Zoom), all squeezing cleanly through ONE universal narrow waist: the IP Layer (IPv4/IPv6).', keyPoints: ['Many links below + many apps above converge on IP'] },
      { level: 'advanced', question: 'Why do network engineers still talk using OSI layer numbers ("Layer 4 LB", "Layer 7 WAF", "Layer 2 Switch") even though the internet actually runs TCP/IP?', answer: 'Because TCP/IP merges Physical (L1) and Data Link (L2) into one bucket, whereas engineers need exact precision: a Layer 1 hub/cable tester vs a Layer 2 MAC switch vs a Layer 3 IP router vs a Layer 4 TCP balancer vs a Layer 7 HTTP proxy!', keyPoints: ['OSI gives sharper hardware vs software diagnostic vocabulary (L1 vs L2 vs L3 vs L4 vs L7)'] },
    ],
    quiz: [
      { id: 'tip-1', question: 'How many layers are in the classic TCP/IP Internet Protocol Suite?', options: ['4 layers (Network Access, Internet, Transport, Application)', '7 layers', '12 layers', '2 layers'], correctAnswer: 0, explanation: 'TCP/IP simplifies networking into 4 practical tiers.' },
      { id: 'tip-2', question: 'Which TCP/IP layer corresponds directly to the OSI Network Layer (Layer 3)?', options: ['Internet Layer (IP)', 'Network Access Layer', 'Application Layer', 'Session Layer'], correctAnswer: 0, explanation: 'The Internet Layer manages logical IP addressing and routing.' },
      { id: 'tip-3', question: 'Which two OSI layers merge into TCP/IP\'s Network Access (Link) Layer?', options: ['Physical (1) and Data Link (2)', 'Transport (4) and Session (5)', 'Network (3) and Transport (4)', 'Presentation (6) and Application (7)'], correctAnswer: 0, explanation: 'TCP/IP combines hardware bit transmission and local MAC framing into Network Access.' },
      { id: 'tip-4', question: 'In the Internet "Hourglass Model", which protocol forms the narrow universal waist?', options: ['IP (Internet Protocol)', 'FTP', 'HTML', 'Ethernet'], correctAnswer: 0, explanation: 'Everything above runs over IP, and IP runs over every link technology below.' },
      { id: 'tip-5', question: 'Which organization maintains TCP/IP RFC standards today?', options: ['IETF (Internet Engineering Task Force)', 'ISO solely', 'W3C CSS group', 'IEEE Gaming Committee'], correctAnswer: 0, explanation: 'IETF publishes open Request for Comments (RFC) Internet standards.' },
    ],
  },
};
