import { TopicContent } from '../../../types';

export const sdLbAndProxyExtraTopics: Record<string, TopicContent> = {
  'l4-vs-l7-load-balancing': {
    id: 'l4-vs-l7-load-balancing',
    title: 'Layer 4 vs Layer 7 Load Balancing',
    module: 'system-design',
    category: '3. Load Balancing & Reverse Proxy',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Layer 4 load balancers route packets rapidly using only IP and TCP/UDP ports, while Layer 7 load balancers terminate connections to inspect HTTP headers, cookies, and URLs for content-aware routing.',
    introduction: {
      definition: 'Layer 4 (Transport Layer) load balancing inspects only network packet headers (Source/Destination IP + Port) via NAT without decrypting TLS or reading payloads. Layer 7 (Application Layer) load balancing acts as a full reverse proxy, decrypting TLS and inspecting HTTP verbs, paths (/api/users), and cookies.',
      analogousStory: 'A Layer 4 balancer is like a highway toll collector sorting cars strictly by license plate state without looking inside the car. A Layer 7 balancer is like a hotel valet who opens the door, checks your VIP reservation card and luggage tags, and parks you in the exact VIP or Economy garage.',
      keyTakeaway: 'Choose L4 (AWS NLB) for extreme ultra-low-latency TCP/UDP throughput; choose L7 (AWS ALB / Nginx / Envoy) for URL routing, Canary deployments, and WAF security.',
    },
    whyRequired: {
      problemsSolved: [
        'Microservices need content-based routing (e.g. /video -> GPU transcoders, /auth -> Identity service) impossible at Layer 4.',
        'Ultra-high-frequency gaming, trading, or raw TCP streams require multi-million PPS packet forwarding without HTTP parsing overhead.',
        'Enables A/B testing and Canary deployments based on HTTP headers or user cookies.',
      ],
      realWorldImpact: 'Most cloud stacks chain them together: an L4 Network Load Balancer at the extreme front absorbing raw TCP bursts, feeding L7 Envoy/ALB proxies inside.',
      metricsAffected: ['Throughput (Packets/sec vs HTTP Req/sec)', 'TLS Termination CPU Cost', 'Routing Granularity'],
    },
    coreArchitecture: {
      description: 'L7 balancers terminate TCP + TLS, evaluate HTTP path/header rules, apply rate limits, and dispatch to distinct microservice target pools.',
      components: [
        { name: 'L4 Packet Forwarder', role: 'IP/Port NAT', details: 'Forwards raw TCP/UDP packets at kernel/DPDK line rate without decrypting payloads.' },
        { name: 'L7 HTTP/TLS Inspector', role: 'Content Router', details: 'Terminates TLS, reads URLs, cookies, JWT claims, and GraphQL headers.' },
        { name: 'Specialized Backend Pools', role: 'Target Groups', details: 'Distinct service clusters separated by workload (/users, /orders, /payments).' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Packet Ingress', technicalDetail: 'Client packet arrives on port 443.' },
        { stepNumber: 2, action: 'L4 vs L7 Decision', technicalDetail: 'L4 immediately maps TCP tuple to a backend IP; L7 completes TLS handshake and parses HTTP GET /api/orders.' },
        { stepNumber: 3, action: 'Upstream Dispatch', technicalDetail: 'L7 routes specifically to the Order target group with X-Forwarded-For headers.' },
      ],
    },
    visualizationId: 'l4-l7-3d',
    visualizationScene: 'api-gateway',
    visualizationModes: [
      { id: 'authorized', label: 'L7 Path & Header Routing' },
      { id: 'rate-limited', label: 'L7 Policy Block (429)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: HTTP/TLS Request Enters L7 Balancer', description: 'Client sends HTTPS request with URL path /api/v1/orders and JWT header.', activeNodes: ['api-client', 'api-gateway'], packet: { from: 'api-client', to: 'api-gateway', label: 'HTTPS /api/orders', type: 'request' } },
      { step: 2, title: 'Step 2: L7 Decrypts & Inspects Headers', description: 'Unlike L4, L7 decrypts TLS and inspects URL paths, headers, and rate limits.', activeNodes: ['api-gateway', 'auth-service'], packet: { from: 'api-gateway', to: 'auth-service', label: 'Inspect URL & JWT', type: 'sync' } },
      { step: 3, title: 'Step 3: Content-Aware Upstream Dispatch', description: 'L7 routes strictly to Order Service pool while User & Payment pools stay isolated.', activeNodes: ['svc-orders'], packet: { from: 'api-gateway', to: 'svc-orders', label: 'Route -> Order Pool', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'api-client', name: 'Client Traffic', role: 'HTTPS Sender', description: 'Sends TLS encrypted requests containing HTTP metadata.' },
      { id: 'api-gateway', name: 'L7 Load Balancer', role: 'Content-Aware Proxy', description: 'Parses HTTP paths, cookies, and headers after TLS termination.' },
      { id: 'auth-service', name: 'L7 Policy / Auth Guard', role: 'Header Inspector', description: 'Validates JWTs and rate limits.' },
      { id: 'svc-orders', name: 'Order Service Pool', role: '/api/orders Target', description: 'Receives order-specific paths only.' },
      { id: 'svc-users', name: 'User Service Pool', role: '/api/users Target', description: 'Receives user profile routes.' },
      { id: 'svc-payments', name: 'Payment Service Pool', role: '/api/payments Target', description: 'Isolated financial pool.' },
    ],
    realWorldExample: {
      company: 'Cloudflare',
      scenario: 'Handling both raw volumetric network traffic and smart HTTP microservice routing.',
      implementation: 'Cloudflare uses XDP/eBPF at Layer 3/4 (Magic Transit) to scrub multi-terabit UDP/TCP floods at line rate, before passing legitimate web connections up to Layer 7 proxies (Pingora) for HTTP routing and caching.',
      scaleDetails: 'Processes 55M+ HTTP requests per second globally.',
    },
    advantages: [
      'L4: Ultra-low latency, minimal CPU usage, supports non-HTTP protocols (MySQL, SSH, Game UDP).',
      'L7: Smart path/header routing, SSL offloading, caching, WAF protection, Canary releases.',
    ],
    disadvantages: [
      'L4 cannot read URLs, redirect HTTP to HTTPS, or block bad SQL injection payloads.',
      'L7 requires higher CPU/RAM for TLS termination and HTTP parsing.',
    ],
    relatedTopics: [
      { id: 'load-balancing-fundamentals', title: 'Load Balancing Fundamentals', module: 'system-design' },
      { id: 'reverse-proxy', title: 'Reverse Proxy (Deep Dive)', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Can a Layer 4 load balancer route `/images` to one server group and `/api` to another?', answer: 'No. Layer 4 only inspects IP addresses and TCP/UDP port numbers. URL paths like `/images` reside inside the encrypted HTTP Layer 7 payload, so only a Layer 7 load balancer can inspect and route by URI path.', keyPoints: ['L4 sees only IP + Port', 'L7 sees HTTP URI, headers, and cookies'] },
      { level: 'intermediate', question: 'What is Direct Server Return (DSR) in Layer 4 load balancing?', answer: 'In DSR, inbound client packets pass through the L4 load balancer, which forwards the packet to the backend server while preserving the client\'s original IP. The backend server responds directly to the client without passing heavy outbound video/file responses back through the load balancer—doubling/tripling outbound bandwidth capacity.', keyPoints: ['Response bypasses LB on return path', 'Dramatically increases throughput for video/media downloads'] },
      { level: 'advanced', question: 'Why does L7 load balancing keep two separate TCP connections per request while L4 maintains one?', answer: 'L4 acts as a transparent packet NAT router, forwarding the exact TCP stream from client to backend (1 end-to-end TCP connection). L7 acts as a full Reverse Proxy: it terminates Client->LB TCP/TLS, parses HTTP, and opens/reuses a separate backend LB->Server TCP connection pool (keep-alive multiplexing).', keyPoints: ['L4 = Single NATed TCP flow', 'L7 = Two decoupled TCP connections with backend connection pooling'] },
    ],
    quiz: [
      { id: 'l47-1', question: 'Which load balancer type routes traffic based on HTTP cookies and URL paths?', options: ['Layer 4 (Transport)', 'Layer 7 (Application)', 'Layer 2 (MAC)', 'Layer 1 (Physical)'], correctAnswer: 1, explanation: 'Layer 7 inspects application protocols including HTTP URLs, headers, and cookies.' },
      { id: 'l47-2', question: 'Which layer is required to load balance raw non-HTTP TCP database or game server connections?', options: ['Layer 4 Load Balancer', 'HTML Parser', 'CSS Grid', 'L7 HTTP Cache'], correctAnswer: 0, explanation: 'L4 handles arbitrary TCP/UDP streams without requiring HTTP framing.' },
      { id: 'l47-3', question: 'What is a key benefit of Direct Server Return (DSR)?', options: ['Responses travel straight from backend servers to clients, bypassing LB egress bottlenecks', 'It disables TLS globally', 'It removes IPv4 addresses', 'It slows down packets intentionally'], correctAnswer: 0, explanation: 'DSR prevents the load balancer from becoming an outbound bandwidth bottleneck.' },
      { id: 'l47-4', question: 'Why does L7 load balancing consume more CPU than L4?', options: ['L7 performs TLS cryptography termination and HTTP header parsing', 'L7 uses larger HTML fonts', 'L4 turns off the server CPU', 'L7 stores video files in CPU registers'], correctAnswer: 0, explanation: 'Terminating TLS and parsing HTTP payloads requires substantially more CPU than L4 header NAT.' },
      { id: 'l47-5', question: 'How many independent TCP connections exist across a Layer 7 Reverse Proxy load balancer?', options: ['Two (Client-to-LB and LB-to-Backend)', 'Zero', 'One raw continuous wire', 'Seven'], correctAnswer: 0, explanation: 'L7 terminates the client TCP connection and forwards over a separate pooled backend TCP connection.' },
    ],
  },

  'reverse-proxy-vs-forward-proxy': {
    id: 'reverse-proxy-vs-forward-proxy',
    title: 'Reverse Proxy vs Forward Proxy vs Load Balancer',
    module: 'system-design',
    category: '3. Load Balancing & Reverse Proxy',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'A Forward Proxy sits in front of clients to shield and govern outbound browsing; a Reverse Proxy sits in front of backend servers to shield, terminate TLS, and route inbound requests; a Load Balancer specifically distributes load across multiple instances.',
    introduction: {
      definition: 'While all three sit between clients and servers, they protect opposite sides of the network. Forward proxies serve clients (privacy, corporate filtering, VPN-like bypassing); Reverse proxies serve backend servers (security, caching, SSL termination, routing); Load balancers specialize in horizontal server pool distribution.',
      analogousStory: 'A Forward Proxy is a celebrity\'s personal assistant buying coffee so the barista never knows the celebrity\'s identity (hides the client). A Reverse Proxy is a corporate reception desk shielding company executives from walk-in visitors (hides the server). A Load Balancer is a bank queue manager evenly feeding customers to 10 tellers.',
      keyTakeaway: 'Reverse Proxy = Server\'s bodyguard (1+ backends). Forward Proxy = Client\'s representative. Load Balancer = Multi-server traffic distributor.',
    },
    whyRequired: {
      problemsSolved: [
        'Clears up the single most frequent system design interview confusion (Forward vs Reverse vs LB).',
        'Explains why a Reverse Proxy is useful even with only ONE backend server (for SSL, caching, and security).',
        'Shows how organizations govern employee outbound traffic (Forward Proxy) while shielding public web servers (Reverse Proxy).',
      ],
      realWorldImpact: 'Every corporate office network deploys Forward Proxies (Squid/Zscaler) for employees, while every cloud production API deploys Reverse Proxies (Nginx/Envoy/Cloudflare) in front of servers.',
      metricsAffected: ['Client Anonymity vs Server Anonymity', 'Egress Policy Enforcement', 'Ingress Attack Surface'],
    },
    coreArchitecture: {
      description: 'Compare outbound client-configured Forward Proxies vs transparent inbound server-side Reverse Proxies.',
      components: [
        { name: 'Forward Proxy (Client Side)', role: 'Egress Shield', details: 'Configured on user/corporate devices; masks client IP, caches popular external pages, blocks malicious domains.' },
        { name: 'Reverse Proxy (Server Side)', role: 'Ingress Shield', details: 'Transparent to users; terminates TLS, enforces WAF, caches static assets, hides private server IPs.' },
        { name: 'Load Balancer Pool', role: 'Horizontal Distributor', details: 'Monitors server health and spreads traffic across multiple identical backend instances.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Forward Proxy Flow', technicalDetail: 'Browser explicitly sends outbound request to Corporate Proxy -> Proxy checks policy -> Proxy contacts Internet using Proxy IP.' },
        { stepNumber: 2, action: 'Reverse Proxy Flow', technicalDetail: 'Client connects to example.com (thinking it\'s the origin) -> Reverse Proxy intercepts -> forwards privately to internal backend.' },
      ],
    },
    visualizationId: 'rp-vs-fp-3d',
    visualizationScene: 'reverse-proxy',
    visualizationModes: [
      { id: 'forward-proxy', label: 'Forward Proxy (Hides Client)' },
      { id: 'reverse-proxy', label: 'Reverse Proxy (Hides Servers)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Client Dispatches Request', description: 'Client initiates outbound HTTP/S request. Notice who the proxy protects in each simulation mode.', activeNodes: ['client-1', 'reverse-proxy'], packet: { from: 'client-1', to: 'reverse-proxy', label: 'Client -> Proxy', type: 'request' } },
      { step: 2, title: 'Step 2: Proxy Masks Identity Across Boundary', description: 'Forward Proxy masks Client IP from the public internet; Reverse Proxy masks Server IPs from the client.', activeNodes: ['reverse-proxy', 'app-server-2'], packet: { from: 'reverse-proxy', to: 'app-server-2', label: 'Identity Masked Across VPC', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'client-devices', name: 'Client Devices', role: 'Protected in Forward Proxy', description: 'Masked behind Forward Proxy; unaware of backend topology in Reverse Proxy.' },
      { id: 'reverse-proxy', name: 'Proxy Intermediary', role: 'Forward vs Reverse Role', description: 'Switch modes above to compare Client-side Forward Proxy vs Server-side Reverse Proxy.' },
      { id: 'app-servers', name: 'Backend Servers', role: 'Protected in Reverse Proxy', description: 'Completely shielded from direct public traffic behind Reverse Proxy.' },
      { id: 'cache-layer', name: 'Shared Cache Store', role: 'Response Acceleration', description: 'Both Forward and Reverse proxies cache hot files to save bandwidth.' },
      { id: 'database', name: 'Internal Database', role: 'Private Storage', description: 'Accessible solely via backend servers.' },
    ],
    realWorldExample: {
      company: 'Zscaler vs Cloudflare',
      scenario: 'Enterprise outbound protection vs Website inbound protection.',
      implementation: 'Zscaler acts as a cloud Forward Proxy for Fortune 500 employees so corporate laptops never hit malicious sites directly. Cloudflare acts as a Reverse Proxy in front of 25M+ internet websites so attackers never see origin server IPs.',
      scaleDetails: 'Millions of endpoints protected on both client egress and server ingress.',
    },
    advantages: [
      'Forward Proxy: Enforces corporate compliance, blocks malware downloads, bypasses geo-blocks.',
      'Reverse Proxy: Protects origin IPs, centralizes TLS, offloads static caching.',
    ],
    disadvantages: [
      'Forward Proxy requires explicit client/OS proxy setup or transparent network interception.',
      'Reverse Proxy becomes an ingress single point of failure if deployed without HA failover.',
    ],
    relatedTopics: [
      { id: 'reverse-proxy', title: 'Reverse Proxy (Deep Dive)', module: 'system-design' },
      { id: 'load-balancing-fundamentals', title: 'Load Balancing Fundamentals', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Can you use a Reverse Proxy without a Load Balancer, or vice versa?', answer: 'Yes! You can deploy a Reverse Proxy in front of just ONE backend server purely for SSL termination, compression, caching, and security. Conversely, a simple L4 Load Balancer spreads TCP packets without offering full reverse proxy caching or URL rewriting. Modern tools like Nginx and Envoy perform both roles together.', keyPoints: ['Reverse proxy valuable even with 1 server', 'Nginx/HAProxy combine both features'] },
      { level: 'intermediate', question: 'How does the destination server know the client\'s real IP behind a Reverse Proxy vs an anonymous Forward Proxy?', answer: 'A transparent Reverse Proxy appends the client\'s real IP into the `X-Forwarded-For` HTTP header so the internal backend knows who the user is. An anonymous Forward Proxy strips client identifiers so external websites only see the Forward Proxy\'s public IP.', keyPoints: ['Reverse proxy sends X-Forwarded-For internally', 'Forward proxy strips client IP externally'] },
      { level: 'advanced', question: 'How does an HTTP `CONNECT` tunnel work through a Forward Proxy for HTTPS traffic?', answer: 'Because HTTPS is end-to-end encrypted, a Forward Proxy cannot inspect the HTTP URL inside. Instead, the client sends an unencrypted `CONNECT example.com:443 HTTP/1.1` request to the Forward Proxy. The proxy opens a raw TCP pipe to `example.com:443` and relays encrypted bytes transparently without seeing the payload.', keyPoints: ['HTTP CONNECT creates raw TCP tunnel', 'Preserves end-to-end TLS encryption between browser and origin'] },
    ],
    quiz: [
      { id: 'rvf-1', question: 'Which proxy protects and hides the identity of client computers browsing the internet?', options: ['Forward Proxy', 'Reverse Proxy', 'Database Shard', 'Read Replica'], correctAnswer: 0, explanation: 'Forward proxies act on behalf of clients to mask client identities and filter outbound traffic.' },
      { id: 'rvf-2', question: 'Why might an architecture with only ONE backend server still place Nginx Reverse Proxy in front of it?', options: ['For TLS termination, static response caching, compression, and hiding server ports', 'Because 1 server cannot run TCP', 'To multiply RAM physically', 'To delete SQL rows'], correctAnswer: 0, explanation: 'Reverse proxies handle SSL offloading, caching, rate limiting, and security even for a single backend.' },
      { id: 'rvf-3', question: 'Which HTTP method asks a Forward Proxy to establish an encrypted TCP tunnel for HTTPS?', options: ['GET', 'POST', 'CONNECT', 'DELETE'], correctAnswer: 2, explanation: 'HTTP CONNECT creates a blind TCP tunnel through a forward proxy for TLS sessions.' },
      { id: 'rvf-4', question: 'Which side knows about a Reverse Proxy in normal web browsing?', options: ['Server administrators configure it; end clients are unaware they aren\'t talking straight to the origin', 'End clients must manually enter its IP into browser settings', 'Only ISP routers', 'Only DNS Root servers'], correctAnswer: 0, explanation: 'Reverse proxies are server-side infrastructure completely transparent to clients.' },
      { id: 'rvf-5', question: 'What primary duty differentiates a Load Balancer from a basic Reverse Proxy?', options: ['Algorithmically distributing load across multiple healthy backend instances with health checks', 'Encrypting CSS fonts', 'Storing user passwords in DNS', 'Formatting hard drives'], correctAnswer: 0, explanation: 'Load balancers specialize in multi-instance traffic scheduling and health-check failover.' },
    ],
  },

  'load-balancing-algorithms': {
    id: 'load-balancing-algorithms',
    title: 'Load Balancing Algorithms (Round Robin, Weighted, Least Connections, IP Hash)',
    module: 'system-design',
    category: '3. Load Balancing & Reverse Proxy',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Deep dive into static and dynamic load balancing scheduling algorithms: Round Robin, Weighted Round Robin, Least Connections, Least Response Time, and IP Hash.',
    introduction: {
      definition: 'Load balancing algorithms determine which healthy backend node receives each incoming request, balancing uniformity, server hardware differences, active concurrency, and session affinity.',
      analogousStory: 'Imagine dispatching deliveries across 3 trucks: Round Robin gives 1 box to each truck in rotation. Weighted Round Robin gives 3 boxes to the huge freight truck and 1 to the small van. Least Connections gives the next box to whichever truck currently has the fewest undelivered stops. IP Hash always assigns a specific zip code to the same driver.',
      keyTakeaway: 'Static algorithms (Round Robin) assume equal request times; Dynamic algorithms (Least Connections / EWMA) adapt to real-time server load.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents powerful 64-core servers from sitting idle while older 8-core servers choke under equal Round Robin splits.',
        'Avoids long-lived WebSocket or slow SQL queries piling up unevenly on one machine.',
        'Ensures deterministic cache locality when routing by client IP or hash key.',
      ],
      realWorldImpact: 'Twitter/Envoy improved P99 tail latency by over 40% switching from naive Round Robin to Least-Request / Power-of-Two-Choices (P2C).',
      metricsAffected: ['P99 Tail Latency', 'Server CPU Variance Across Fleet', 'Cache Locality Hit Rate'],
    },
    coreArchitecture: {
      description: 'The load balancer maintains an active target registry tracking server weights, active open TCP connection counts, and sliding response latencies.',
      components: [
        { name: 'Round Robin / Weighted Counter', role: 'Static Rotation', details: 'Cycles sequentially across healthy backends; Weighted assigns proportional shares.' },
        { name: 'Active Connection Tracker', role: 'Least Connections Engine', details: 'Tracks real-time concurrent in-flight streams per backend node.' },
        { name: 'IP / Consistent Hasher', role: 'Affinity Engine', details: 'Hashes client IP / session ID to pin users deterministically to a target node.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Collect Target Metrics', technicalDetail: 'LB updates active open connections and health status per node.' },
        { stepNumber: 2, action: 'Execute Selected Algorithm', technicalDetail: 'Switch modes above in the 3D scene to watch Round Robin, Least Connections, and IP Hash pick different servers live!' },
        { stepNumber: 3, action: 'Dispatch & Track Completion', technicalDetail: 'Increment active connection counter on dispatch; decrement when response completes.' },
      ],
    },
    visualizationId: 'lb-algos-3d',
    visualizationScene: 'load-balancer',
    visualizationModes: [
      { id: 'round-robin', label: 'Round Robin (A -> B -> C)' },
      { id: 'least-connections', label: 'Least Connections (Always B)' },
      { id: 'ip-hash', label: 'IP Hash (Consistent)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Incoming Request Reaches Scheduler', description: 'Client traffic hits the central Load Balancer virtual IP.', activeNodes: ['client-1', 'load-balancer'], packet: { from: 'client-1', to: 'load-balancer', label: 'Incoming Request', type: 'request' } },
      { step: 2, title: 'Step 2: Evaluate Algorithm Policy', description: 'Try toggling Round Robin vs Least Connections vs IP Hash in the Simulation Mode bar above to watch routing change!', activeNodes: ['load-balancer'], packet: { from: 'client-2', to: 'load-balancer', label: 'Evaluate Target Pool', type: 'sync' } },
      { step: 3, title: 'Step 3: Dispatch to Chosen Backend', description: 'Packet routes to the mathematically selected backend server.', activeNodes: ['load-balancer', 'server-b'], packet: { from: 'load-balancer', to: 'server-b', label: 'Dispatch to Optimal Node', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-1', name: 'Client Pool A', role: 'Traffic Source', description: 'Generates concurrent requests.' },
      { id: 'client-2', name: 'Client Pool B', role: 'Mobile Traffic', description: 'Varies payload sizes and latency.' },
      { id: 'load-balancer', name: 'Algorithmic Scheduler', role: 'Traffic Router', description: 'Supports Round Robin, Least Connections, and IP Hash policies.' },
      { id: 'server-a', name: 'Server A (45 Conns)', role: 'Loaded Backend', description: 'Handles heavy concurrent connections.' },
      { id: 'server-b', name: 'Server B (12 Conns)', role: 'Lightly Loaded Node', description: 'Selected immediately by Least Connections.' },
      { id: 'server-c', name: 'Server C (50 Conns)', role: 'Busy Backend', description: 'Currently near high concurrency.' },
    ],
    realWorldExample: {
      company: 'Envoy Proxy / Linkerd',
      scenario: 'Avoiding "herd behavior" in large distributed microservices.',
      implementation: 'Instead of scanning all 500 backend servers on every request (O(N)), Envoy uses "Power of Two Choices" (P2C) Least Request: it picks 2 healthy backends at random (O(1)) and sends the request to whichever of the two has fewer active requests.',
      scaleDetails: 'Cuts P99 latency across huge Kubernetes clusters while keeping scheduler CPU near zero.',
    },
    advantages: [
      'Round Robin: Zero state overhead, predictable uniform spread for uniform requests.',
      'Least Connections: Prevents slow queries or WebSockets from starving a single server.',
      'IP Hash: Preserves in-memory cache warmth and sticky affinity without cookies.',
    ],
    disadvantages: [
      'Round Robin breaks when servers have heterogeneous hardware or wildly variable request durations.',
      'Simple IP Hash breaks behind large corporate NATs (thousands of users sharing 1 public IP hit 1 server).',
    ],
    relatedTopics: [
      { id: 'load-balancing-fundamentals', title: 'Load Balancing Fundamentals', module: 'system-design' },
      { id: 'consistent-hashing', title: 'Consistent Hashing & Hash Ring', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'How does Weighted Round Robin work?', answer: 'Each server is assigned a static integer weight proportional to its hardware capacity (e.g., Server A weight=4, Server B weight=1). Over 5 requests, Server A receives 4 requests and Server B receives 1.', keyPoints: ['Proportional capacity weights', 'Handles mixed hardware sizes cleanly'] },
      { level: 'intermediate', question: 'Explain the "Power of Two Random Choices" (P2C) load balancing algorithm.', answer: 'Scanning thousands of servers to find the absolute least-loaded node is slow and causes thundering herds where everyone picks the exact same quiet server simultaneously. P2C picks 2 random healthy nodes and routes to the less loaded one—mathematically reducing max queue length from O(log N) to O(log log N) in O(1) time!', keyPoints: ['Pick 2 random healthy nodes, choose better one', 'O(1) time complexity', 'Eliminates thundering herd onto newly booted nodes'] },
      { level: 'advanced', question: 'Why can pure IP Hash fail badly for mobile users and corporate offices?', answer: '1) Corporate offices and mobile carrier CGNATs put tens of thousands of users behind a single public NAT IP—so IP Hash dumps ALL those users onto a single backend server. 2) Mobile clients switch between Wi-Fi and 5G constantly, changing IP mid-session. 3) Adding/removing a server with naive `hash(IP) % N` breaks nearly every user mapping.', keyPoints: ['Carrier CGNAT hotspots', 'Mobile Wi-Fi/5G IP changes', 'Modulo N breaks all mappings on node resize (fixed by Consistent Hashing)'] },
    ],
    quiz: [
      { id: 'lba-1', question: 'Which algorithm is best when backend instances have unequal CPU and RAM capacities?', options: ['Simple Round Robin', 'Weighted Round Robin / Weighted Least Connections', 'Random Guessing', 'FIFO'], correctAnswer: 1, explanation: 'Weighted algorithms allocate traffic proportional to each machine\'s capacity.' },
      { id: 'lba-2', question: 'Which algorithm prevents long-lived WebSocket connections from clustering unevenly?', options: ['Round Robin', 'Least Connections', 'IP Broadcast', 'Alphabetical DNS'], correctAnswer: 1, explanation: 'Least Connections routes new connections to whichever node currently holds the fewest active sockets.' },
      { id: 'lba-3', question: 'What flaw occurs with `hash(IP) % N` when one server crashes (N changes to N-1)?', options: ['Almost all client-to-server mappings shift abruptly, wiping local caches', 'Servers double in speed', 'Nothing changes', 'TCP ports turn into UDP'], correctAnswer: 0, explanation: 'Modulo-N hashing remaps nearly 100% of keys when N changes, unlike Consistent Hashing.' },
      { id: 'lba-4', question: 'How does "Power of Two Choices" improve upon global Least Connections?', options: ['O(1) speed and avoids sending every new burst request to a single freshly started node', 'It deletes half the servers', 'It requires no cables', 'It encrypts headers twice'], correctAnswer: 0, explanation: 'Sampling 2 random nodes avoids O(N) scans and prevents thundering herds.' },
      { id: 'lba-5', question: 'Why is naive IP Hash uneven for mobile carrier traffic?', options: ['Carrier-Grade NAT (CGNAT) funnels thousands of phones behind one shared public IP', 'Mobile phones lack IP addresses', 'Routers hate mobile packets', 'IP Hash only supports IPv6'], correctAnswer: 0, explanation: 'CGNAT creates massive traffic hotspots on a single shared IP.' },
    ],
  },

  'health-checks-active-passive': {
    id: 'health-checks-active-passive',
    title: 'Health Checks & Active-Passive Load Balancing',
    module: 'system-design',
    category: '3. Load Balancing & Reverse Proxy',
    readTime: '7 min',
    difficulty: 'Intermediate',
    summary: 'Health checks continuously probe backend availability (active synthetic pings vs passive failure detection), while Active-Passive HA pairs eliminate load balancer single points of failure using VRRP floating IPs.',
    introduction: {
      definition: 'Active health checks periodically send synthetic requests (e.g. GET /healthz every 5s) to verify server health. Passive health checks watch live user traffic for 5xx/timeout errors. Active-Passive failover pairs two load balancers using a floating Virtual IP (VIP) via VRRP/Keepalived.',
      analogousStory: 'Active health checks are like a doctor checking a runner\'s pulse every minute. Passive health checks are noticing the runner tripped during the race. Active-Passive failover is having a co-pilot sitting in the cockpit ready to grab the controls instantly if the captain faints.',
      keyTakeaway: 'Never expose a single load balancer instance—pair two in Active-Passive (or ECMP Active-Active) with deep dependency health checks.',
    },
    whyRequired: {
      problemsSolved: [
        'Stops load balancers from routing user traffic into crashed, hung, or OOM-killed containers.',
        'Prevents the load balancer itself from becoming a single point of failure.',
        'Distinguishes shallow "process alive" checks from deep "database reachable" readiness probes.',
      ],
      realWorldImpact: 'Kubernetes Liveness/Readiness probes and AWS Target Group health checks keep modern cloud infrastructure self-healing 24/7.',
      metricsAffected: ['Automated Failover Time (< 5 seconds)', 'Error Rate During Deployments', 'Zero-Downtime Rolling Updates'],
    },
    coreArchitecture: {
      description: 'Health probes evaluate backend readiness while Keepalived/VRRP heartbeats coordinate active-passive Virtual IP ownership.',
      components: [
        { name: 'Active-Passive VIP Pair', role: 'HA Ingress', details: 'Primary handles traffic while Passive standby listens for VRRP heartbeats; claims VIP immediately on failure.' },
        { name: 'Readiness Health Endpoint (/healthz)', role: 'Deep Check', details: 'Verifies DB connection pool and memory health before accepting production traffic.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Heartbeat & Readiness Probes', technicalDetail: 'LB polls GET /healthz every 3 seconds; server replies HTTP 200 OK.' },
        { stepNumber: 2, action: 'Failure Threshold Trip', technicalDetail: 'If 3 consecutive checks fail, LB flips node to Unhealthy and drains connections.' },
        { stepNumber: 3, action: 'Auto-Recovery', technicalDetail: 'Once server passes 2 consecutive healthy checks, traffic smoothly resumes.' },
      ],
    },
    visualizationId: 'health-checks-3d',
    visualizationScene: 'circuit-breaker',
    visualizationModes: [
      { id: 'closed', label: 'Healthy Probe (HTTP 200)' },
      { id: 'open', label: 'Unhealthy (Removed from Pool)' },
      { id: 'half-open', label: 'Recovery Probe (Drain Complete)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Active Health Check Succeeds', description: 'Load balancer sends GET /healthz and receives 200 OK; server stays in healthy rotation.', activeNodes: ['cb-client', 'circuit-breaker', 'target-service'], packet: { from: 'cb-client', to: 'target-service', label: 'GET /healthz -> 200 OK', type: 'request' } },
      { step: 2, title: 'Step 2: Server Fails Consecutive Probes', description: 'Three failed checks trip the health gate OPEN—live user traffic is diverted away from the dead node.', activeNodes: ['circuit-breaker'], packet: { from: 'circuit-breaker', to: 'cb-client', label: 'Failover to Healthy Pool', type: 'blocked' } },
      { step: 3, title: 'Step 3: Recovery Probe Verification', description: 'Once restarted server passes half-open recovery probes, it rejoins the healthy pool.', activeNodes: ['circuit-breaker', 'target-service'], packet: { from: 'circuit-breaker', to: 'target-service', label: 'Verify Readiness -> Re-add', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'cb-client', name: 'Health Monitor / LB', role: 'Probe Initiator', description: 'Sends periodic TCP/HTTP checks and manages VRRP heartbeat.' },
      { id: 'circuit-breaker', name: 'Health State Gate', role: 'Rotation Controller', description: 'Controls whether a target stays active, draining, or quarantined.' },
      { id: 'target-service', name: 'Target Backend Server', role: 'Monitored Worker', description: 'Exposes /healthz readiness endpoint.' },
    ],
    realWorldExample: {
      company: 'Kubernetes & Envoy',
      scenario: 'Zero-downtime rolling deployments across thousands of microservices.',
      implementation: 'Kubernetes separates Liveness probes (restart dead container) from Readiness probes (pause LB traffic during startup warm-up or overload) and gracefully drains active connections via SIGTERM before shutting down pods.',
      scaleDetails: 'Supports millions of automated rolling upgrades daily without dropped client requests.',
    },
    advantages: [
      'Self-healing: Automatically isolates dead servers in seconds without human paging.',
      'Zero-downtime software deployments via graceful connection draining.',
    ],
    disadvantages: [
      'Overly sensitive health checks that fail on momentary GC pauses can flap healthy servers out of rotation.',
      'Passive standby nodes in Active-Passive setups sit idle unless using Active-Active ECMP.',
    ],
    relatedTopics: [
      { id: 'load-balancing-fundamentals', title: 'Load Balancing Fundamentals', module: 'system-design' },
      { id: 'circuit-breaker-pattern', title: 'Circuit Breaker Pattern', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the difference between Active and Passive health checks?', answer: 'Active checks proactively send periodic synthetic requests (e.g., GET /healthz every 5s) even when there is no user traffic. Passive checks observe real user traffic responses and mark a server down if it returns consecutive 502/504/connection errors.', keyPoints: ['Active = Synthetic scheduled pings', 'Passive = Watching real user traffic errors'] },
      { level: 'intermediate', question: 'Why shouldn\'t a deep `/healthz` readiness endpoint fail just because a non-critical external service is down, or cascade DB load?', answer: 'If `/healthz` triggers an expensive `SELECT COUNT(*)` SQL query across 50 servers every second, the health checks themselves DDoS your database! And if `/healthz` fails on ALL servers simultaneously because a downstream dependency hiccups, the load balancer kills 100% of your servers causing total outage. Use lightweight local checks for liveness and careful readiness isolation.', keyPoints: ['Avoid heavy DB queries inside high-frequency health checks', 'Prevent mass false-positive eviction across the whole fleet'] },
      { level: 'advanced', question: 'How does VRRP (Keepalived) prevent an Active-Passive Load Balancer pair from suffering a Single Point of Failure?', answer: 'Both load balancers share a floating Virtual IP (VIP). The Active primary broadcasts VRRP multicast heartbeats every second. If the primary fails, the Passive backup stops hearing heartbeats, claims the VIP, and broadcasts a Gratuitous ARP packet to update data center switches within ~1-3 seconds.', keyPoints: ['Shared floating VIP', 'VRRP heartbeat + Gratuitous ARP failover'] },
    ],
    quiz: [
      { id: 'hc-1', question: 'What protocol commonly manages floating Virtual IP failover between Active-Passive Load Balancers?', options: ['VRRP (Virtual Router Redundancy Protocol)', 'SMTP', 'FTP', 'POP3'], correctAnswer: 0, explanation: 'VRRP coordinates heartbeats and automatic VIP takeover between standby routers/balancers.' },
      { id: 'hc-2', question: 'In Kubernetes, which probe temporarily stops load balancer traffic to a slow-starting pod without killing it?', options: ['Readiness Probe', 'Liveness Probe', 'DNS Probe', 'ARP Probe'], correctAnswer: 0, explanation: 'Readiness probes remove unready pods from Service endpoints without restarting the container.' },
      { id: 'hc-3', question: 'What is "Connection Draining" during server maintenance?', options: ['Stopping NEW requests to a server while allowing existing in-flight requests to finish cleanly', 'Unplugging the power cord instantly', 'Deleting all cache entries', 'Rebooting the database'], correctAnswer: 0, explanation: 'Connection draining ensures zero aborted requests during shutdowns or deployments.' },
      { id: 'hc-4', question: 'What danger exists if `/healthz` runs slow full-table database queries every 500ms?', options: ['Health check probes can overload and crash your own database', 'It speeds up DNS', 'It compresses images', 'It fixes memory leaks'], correctAnswer: 0, explanation: 'Health endpoints should be lightweight to avoid amplifying load during crises.' },
      { id: 'hc-5', question: 'Which type of health check detects failures solely by monitoring live user request errors?', options: ['Passive Health Check', 'Active Synthetic Check', 'ICMP Ping', 'Cron Backup'], correctAnswer: 0, explanation: 'Passive checks inspect real traffic status codes/timeouts without generating synthetic pings.' },
    ],
  },
};
