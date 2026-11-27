import { TopicContent } from '../../../types';

export const sdCdnApiMessagingTopics: Record<string, TopicContent> = {
  'cdn-architecture': {
    id: 'cdn-architecture',
    title: 'CDN Architecture: Edge Servers vs Origin Servers & Anycast',
    module: 'system-design',
    category: '6. Content Delivery Network (CDN)',
    readTime: '9 min',
    difficulty: 'Beginner',
    summary: 'A Content Delivery Network (CDN) caches static and dynamic media across hundreds of global Edge Points of Presence (PoPs) geographically close to end users, cutting speed-of-light latency and shielding origin servers.',
    introduction: {
      definition: 'A CDN is a globally distributed network of caching edge proxy servers located inside major internet exchange points (IXPs) across continents. When a user fetches a video, image, or JS bundle, Anycast BGP routing directs them to the nearest physical Edge Server instead of crossing oceans to the Origin.',
      analogousStory: 'Imagine a global bakery chain headquartered in Paris (Origin Server). Instead of flying fresh croissants 10 hours from Paris for every New York or Tokyo customer, you build local express bakeries stocked with popular goods right inside Tokyo and New York neighborhoods (Edge Servers).',
      keyTakeaway: 'Light traveling through fiber optic cables is bounded by physics (~200,000 km/s). Moving data physically closer to users is the ONLY way to beat continental speed-of-light latency.',
    },
    whyRequired: {
      problemsSolved: [
        'Cuts trans-oceanic RTT latency from ~250ms down to ~10ms.',
        'Offloads 90-98% of static asset bandwidth (4K video, images, JS) away from expensive Origin cloud egress.',
        'Absorbs multi-terabit DDoS attacks right at distributed global Edge PoPs before traffic ever approaches Origin.',
      ],
      realWorldImpact: 'Over 70% of all consumer internet traffic (YouTube, Netflix, Spotify, Cloud gaming) is served directly from CDN edge nodes.',
      metricsAffected: ['First Contentful Paint (FCP)', 'Origin Bandwidth Offload (%)', 'Global DDoS Mitigation Capacity'],
    },
    coreArchitecture: {
      description: 'BGP Anycast routes client packets to the topologically nearest Edge PoP, which checks NVMe/RAM edge caches before falling back to an Origin Shield or Master Origin.',
      components: [
        { name: 'CDN Edge PoP Nodes', role: 'Distributed Edge Caches', details: 'Hundreds of regional servers terminating TLS locally and serving hot cached files.' },
        { name: 'Anycast BGP Routing', role: 'Proximity Steering', details: 'Broadcasts the exact same public IP across all global PoPs so routers naturally route users to the closest node.' },
        { name: 'Origin Server (S3 / Web Cluster)', role: 'Authoritative Master', details: 'Holds canonical copies of assets fetched on cold Edge cache misses.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Anycast Geo-Steering', technicalDetail: 'User in Tokyo connects to CDN Anycast IP and lands automatically on Tokyo Edge PoP.' },
        { stepNumber: 2, action: 'Edge Cache Check', technicalDetail: 'If asset is warm on Tokyo NVMe SSD, Edge streams it immediately in ~11ms.' },
        { stepNumber: 3, action: 'Origin Pull & Cache', technicalDetail: 'On Edge Miss, Edge fetches once from US-East Origin, stores with `Cache-Control: max-age=86400`, and serves user.' },
      ],
    },
    visualizationId: 'cdn-arch-3d',
    visualizationScene: 'cdn',
    visualizationModes: [
      { id: 'edge-hit', label: 'Edge Cache HIT (11ms)' },
      { id: 'edge-miss', label: 'Edge Miss -> Origin Pull' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: User Connects via Anycast DNS', description: 'Tokyo user resolves domain and hits nearest Tokyo Edge PoP instead of crossing the Pacific Ocean.', activeNodes: ['user-geo', 'edge-tokyo'], packet: { from: 'user-geo', to: 'edge-tokyo', label: 'GET /video/chunk1.ts', type: 'request' } },
      { step: 2, title: 'Step 2: Edge Cache Evaluation', description: 'Toggle Edge Miss vs Edge Hit above! On HIT, Tokyo Edge serves instantly; on MISS, Edge pulls from US-East Origin.', activeNodes: ['edge-tokyo', 'origin-server'], packet: { from: 'edge-tokyo', to: 'origin-server', label: 'Evaluate Edge Cache', type: 'cached' } },
      { step: 3, title: 'Step 3: High-Speed Edge Streaming', description: 'Subsequent users in Tokyo receive instant 11ms cached delivery.', activeNodes: ['edge-tokyo', 'user-geo'], packet: { from: 'edge-tokyo', to: 'user-geo', label: '200 OK (Edge HIT)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'user-geo', name: 'End User (Tokyo)', role: 'Consumer', description: 'Requests heavy static/streaming content.' },
      { id: 'edge-tokyo', name: 'Tokyo Edge PoP', role: 'Nearest Edge Cache', description: 'Serves cached payloads in ~11ms and terminates TLS locally.' },
      { id: 'edge-frankfurt', name: 'Frankfurt Edge PoP', role: 'Regional EU Edge', description: 'Serves European visitors independently.' },
      { id: 'origin-server', name: 'Origin Server (US-East)', role: 'Source of Truth', description: 'Only contacted on initial Edge cache misses.' },
    ],
    realWorldExample: {
      company: 'Netflix Open Connect',
      scenario: 'Streaming 4K HDR video simultaneously to 250M+ subscribers without congesting public internet backbones.',
      implementation: 'Netflix ships custom Open Connect Appliances (OCAs)—specialized storage servers—directly inside local ISP data centers worldwide. Over 95% of Netflix video traffic travels just one hop from the user\'s local ISP building rather than crossing cloud regions.',
      scaleDetails: 'Handles 15%+ of all global downstream internet traffic.',
    },
    advantages: [
      'Slashes global latency and speeds up TLS handshakes via nearby Edge termination.',
      'Massive cloud bandwidth egress cost savings at Origin.',
      'Protects Origin from traffic surges and DDoS floods.',
    ],
    disadvantages: [
      'Cache invalidation ("Purge") across 300+ global cities takes seconds to propagate.',
      'Cannot easily cache highly personalized private user responses without strict auth isolation.',
    ],
    relatedTopics: [
      { id: 'cdn-request-flow', title: 'CDN Request Flow & Cache Headers', module: 'system-design' },
      { id: 'cdn-vs-reverse-proxy', title: 'CDN vs Reverse Proxy', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Explain Push CDN vs Pull CDN.', answer: 'In a Pull CDN (most common), the CDN leaves the edge empty initially; the first user request misses the edge, so the CDN automatically pulls the file from Origin and caches it per `Cache-Control` headers. In a Push CDN, you manually upload/push static assets to CDN storage directly before users request them (good for rare giant video libraries).', keyPoints: ['Pull = Lazy automated fetch on first miss', 'Push = Proactive manual upload to CDN'] },
      { level: 'intermediate', question: 'How does Anycast BGP routing allow 300 global CDN cities to share one single IP address?', answer: 'Every CDN PoP announces the exact same IP prefix (`104.16.x.x`) to neighboring ISP routers via BGP. Internet routers use BGP shortest AS-path routing, naturally sending packets from a user in Madrid to Madrid\'s PoP and packets from Sydney to Sydney\'s PoP automatically.', keyPoints: ['Single IP announced at 300+ PoPs via BGP', 'Routers automatically select nearest topological path'] },
      { level: 'advanced', question: 'What is "Origin Shield" (Tiered Caching) in CDN architectures?', answer: 'If 300 global edge nodes all miss a brand-new popular video simultaneously, 300 edge servers could stampede the Origin at once. An Origin Shield places an intermediate consolidated regional cache tier between outer Edges and the Origin—so only 1 shield request reaches Origin, which then fans out to all outer PoPs.', keyPoints: ['Collapses multi-PoP cache misses into 1 Origin fetch', 'Protects Origin during global cache cold starts'] },
    ],
    quiz: [
      { id: 'cdn-1', question: 'What is the primary physical reason a CDN reduces latency for distant global users?', options: ['Data travels physically shorter distances through fiber optics to nearby Edge PoPs', 'CDNs invent faster speeds than light', 'CDNs turn off TCP', 'CDNs delete HTML headers'], correctAnswer: 0, explanation: 'Proximity drastically shrinks speed-of-light propagation delay and TLS handshake RTTs.' },
      { id: 'cdn-2', question: 'Which HTTP response header tells a CDN Edge server how long to cache a file in seconds?', options: ['Cache-Control: public, max-age=3600', 'X-Forwarded-For', 'Authorization', 'Set-Cookie'], correctAnswer: 0, explanation: 'Cache-Control `max-age` / `s-maxage` specifies edge caching TTLs.' },
      { id: 'cdn-3', question: 'What does an "Origin Shield" prevent?', options: ['300 Edge PoPs simultaneously hammering the Origin Server on a fresh cache miss', 'Browsers rendering JavaScript', 'Users using HTTPS', 'DNS timeouts'], correctAnswer: 0, explanation: 'Tiered Origin Shields coalesce regional edge misses before hitting the origin.' },
      { id: 'cdn-4', question: 'How do you immediately update a cached `app.js` file on a CDN without waiting 24 hours for TTL expiry?', options: ['Use content-hashed filenames (`app.9a4f2b.js`) or trigger an Edge Cache Purge API', 'Restart user laptops', 'Change domain name', 'Delete DNS A records'], correctAnswer: 0, explanation: 'Immutable hashed filenames ("cache busting") provide instant updates with zero stale cache risk.' },
      { id: 'cdn-5', question: 'Which routing technique lets multiple global CDN PoPs advertise the exact same public IP?', options: ['BGP Anycast', 'ARP Broadcast', 'DHCP Relay', 'Static NAT'], correctAnswer: 0, explanation: 'BGP Anycast steers packets automatically to the topologically closest PoP.' },
    ],
  },

  'cdn-request-flow': {
    id: 'cdn-request-flow',
    title: 'CDN Request Flow, Cache Miss Handling & Cache Busting',
    module: 'system-design',
    category: '6. Content Delivery Network (CDN)',
    readTime: '8 min',
    difficulty: 'Intermediate',
    summary: 'Follow the complete lifecycle of a CDN-backed asset lookup—from DNS CNAME steering and TLS Edge termination to Cache-Control evaluation, Origin Pull, and Cache Busting invalidation.',
    introduction: {
      definition: 'Understanding CDN request flow reveals how HTTP caching headers (`Cache-Control`, `ETag`, `Vary`) coordinate with DNS CNAMEs and Edge PoP storage during both Cache Hits and Cache Misses.',
      analogousStory: 'Think of a magazine stand (Edge) checking the publication date stamped on its stock (`ETag` / `max-age`). If the issue is today\'s, it hands you one immediately. If expired, it calls the printing press (`If-None-Match: "v4"`); if unchanged, the press says `304 Not Modified`—saving printing costs!',
      keyTakeaway: 'Properly configuring `s-maxage`, `stale-while-revalidate`, and hashed filenames unlocks near-100% CDN hit ratios with instant deployments.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents browsers and CDNs from serving broken stale JS/CSS after a new deployment.',
        'Avoids redundant Origin bandwidth transfers via conditional ETag revalidation (`304 Not Modified`).',
        'Eliminates user-perceived wait times during background cache refreshes (`stale-while-revalidate`).',
      ],
      realWorldImpact: 'Frontend frameworks (Vite, Next.js, React) rely on content-hashed bundles (`index-BLcweExS.js`) paired with `max-age=31536000, immutable` CDN headers.',
      metricsAffected: ['Edge Cache Hit Rate (%)', '304 Bandwidth Savings', 'Stale Deployment Bugs'],
    },
    coreArchitecture: {
      description: 'Browser DNS resolves CDN CNAME -> Edge evaluates Cache-Control & Vary headers -> Origin Shield handles conditional revalidation.',
      components: [
        { name: 'Cache-Control Policy Engine', role: 'TTL Evaluator', details: 'Parses `s-maxage`, `public/private`, and `stale-while-revalidate` directives.' },
        { name: 'ETag Revalidator', role: 'Conditional Pull', details: 'Sends `If-None-Match` to Origin so unchanged files return lightweight 304 headers.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'CNAME Resolution', technicalDetail: '`cdn.app.com` CNAMEs to CDN Anycast edge network.' },
        { stepNumber: 2, action: 'Cache Key Lookup', technicalDetail: 'Edge hashes URL + Vary headers (like `Accept-Encoding: br, gzip`).' },
        { stepNumber: 3, action: 'Hit vs Conditional Origin Pull', technicalDetail: 'On miss or expiry, Edge pulls from Origin, caches copy, and sets `X-Cache: MISS` (next visitor gets `HIT`).' },
      ],
    },
    visualizationId: 'cdn-flow-3d',
    visualizationScene: 'cdn',
    visualizationModes: [
      { id: 'edge-miss', label: 'Cold Cache Miss -> Origin Pull' },
      { id: 'edge-hit', label: 'Warm Edge Cache HIT' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Browser Requests Static Bundle', description: 'Client requests `/assets/app.9f2a.js` from closest CDN PoP.', activeNodes: ['user-geo', 'edge-tokyo'], packet: { from: 'user-geo', to: 'edge-tokyo', label: 'GET /app.9f2a.js', type: 'request' } },
      { step: 2, title: 'Step 2: Edge Miss -> Origin Fetch + Headers', description: 'PoP misses cache, queries Origin Server, and receives `200 OK` with `Cache-Control: immutable`.', activeNodes: ['edge-tokyo', 'origin-server'], packet: { from: 'edge-tokyo', to: 'origin-server', label: 'Origin Pull + Store Copy', type: 'sync' } },
      { step: 3, title: 'Step 3: Subsequent Requests Hit Edge Directly', description: 'Every future user in that region gets `X-Cache: HIT` directly from the Edge.', activeNodes: ['edge-tokyo', 'user-geo'], packet: { from: 'edge-tokyo', to: 'user-geo', label: '200 OK (X-Cache: HIT)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'user-geo', name: 'Browser Client', role: 'Asset Requester', description: 'Maintains local browser cache + fetches from CDN.' },
      { id: 'edge-tokyo', name: 'CDN Edge PoP', role: 'Regional Cache Proxy', description: 'Evaluates `s-maxage`, `ETag`, and `Vary` headers.' },
      { id: 'edge-frankfurt', name: 'Secondary Edge PoP', role: 'Independent Cache Store', description: 'Maintains separate regional cache entries.' },
      { id: 'origin-server', name: 'Origin Web/S3 Tier', role: 'Authoritative File Host', description: 'Responds to cold misses or `304 Not Modified` checks.' },
    ],
    realWorldExample: {
      company: 'Vercel Edge Network',
      scenario: 'Instant atomic rollouts and zero-stale deployments for React/Next.js frontends.',
      implementation: 'HTML documents use short/revalidated headers (`stale-while-revalidate`), while JS/CSS chunks have cryptographic content hashes in filenames cached for 1 full year (`immutable`). New deploys generate new filenames—meaning zero manual purge lag.',
      scaleDetails: 'Achieves >95% global edge hit ratios with zero broken old-JS deploys.',
    },
    advantages: [
      'Hash-based URLs give 1-year caching with instantaneous updates.',
      '`stale-while-revalidate` hides Origin pull latency completely from end users.',
    ],
    disadvantages: [
      'Misconfigured `Vary: Cookie` or `Set-Cookie` headers accidentally turn caching off (`BYPASS`), slamming the Origin.',
    ],
    relatedTopics: [
      { id: 'cdn-architecture', title: 'CDN Architecture', module: 'system-design' },
      { id: 'caching-fundamentals', title: 'Caching Fundamentals', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is "Cache Busting", and how does Vite/Webpack implement it?', answer: 'Cache busting appends a cryptographic hash of file contents into the filename (e.g. `main.8f2c1a.js`). Because changing 1 line changes the URL completely, CDNs can safely cache assets for 1 year without risking stale code.', keyPoints: ['Content hash in filename', 'Instant updates without waiting for TTL'] },
      { level: 'intermediate', question: 'What is the difference between `max-age` and `s-maxage` in `Cache-Control`?', answer: '`max-age` applies to both private browser caches AND shared CDN proxies. `s-maxage` ("shared max-age") specifically overrides `max-age` ONLY for shared caches like CDNs/Reverse Proxies—allowing you to cache a page for 1 hour on the CDN while keeping browser TTL at 60 seconds.', keyPoints: ['`s-maxage` targets CDNs/shared proxies only', 'Allows shorter browser cache with longer CDN cache'] },
      { level: 'advanced', question: 'How does `Cache-Control: stale-while-revalidate=60` improve user P99 latency?', answer: 'If a cached asset just expired (within the 60s grace window), the CDN serves the slightly stale cached copy to the user IMMEDIATELY in ~10ms so the user never waits, while firing an asynchronous background request to the Origin to refresh the cache for the next visitor.', keyPoints: ['Zero user wait during refresh', 'Background async revalidation'] },
    ],
    quiz: [
      { id: 'cf-1', question: 'Which `Cache-Control` directive overrides `max-age` exclusively for shared CDN and proxy caches?', options: ['s-maxage', 'no-store', 'private', 'must-revalidate'], correctAnswer: 0, explanation: 'Shared max-age (`s-maxage`) configures shared CDN/proxy TTLs separately from browser TTLs.' },
      { id: 'cf-2', question: 'What HTTP status code does an Origin return when an Edge PoP sends `If-None-Match` with an unchanged ETag?', options: ['304 Not Modified', '500 Internal Server Error', '403 Forbidden', '201 Created'], correctAnswer: 0, explanation: '304 confirms the cached copy is still valid without re-transmitting the file body.' },
      { id: 'cf-3', question: 'Why should authenticated private user banking pages use `Cache-Control: private, no-store`?', options: ['Prevents shared CDNs from caching one user\'s private bank balances and showing them to another user', 'To make files load slower', 'To turn off TLS', 'To enable Anycast'], correctAnswer: 0, explanation: '`private, no-store` forbids shared intermediate proxies from storing sensitive responses.' },
      { id: 'cf-4', question: 'What does `stale-while-revalidate` allow a CDN Edge to do?', options: ['Return a slightly expired cached copy immediately while refreshing from Origin in the background', 'Delete all files forever', 'Block mobile browsers', 'Disable gzip compression'], correctAnswer: 0, explanation: 'Keeps user latency at edge speed even when TTL has just rolled over.' },
      { id: 'cf-5', question: 'Why do production static files use names like `bundle.a94f21.js`?', options: ['Content hashing guarantees a unique URL whenever code changes ("Cache Busting")', 'Hackers cannot read hexadecimal letters', 'Browsers reject plain names', 'DNS prefers dots'], correctAnswer: 0, explanation: 'Content hashes safely allow long immutable CDN TTLs.' },
    ],
  },

  'cdn-vs-reverse-proxy': {
    id: 'cdn-vs-reverse-proxy',
    title: 'CDN vs Reverse Proxy: Differences & When to Use Both',
    module: 'system-design',
    category: '6. Content Delivery Network (CDN)',
    readTime: '7 min',
    difficulty: 'Beginner',
    summary: 'Both act as caching proxies in front of origin servers—but a Reverse Proxy operates inside your application cluster/region for routing and TLS, while a CDN spans hundreds of global edge cities.',
    introduction: {
      definition: 'A Reverse Proxy (Nginx/HAProxy) sits directly inside your cloud VPC in front of application servers. A CDN (Cloudflare/CloudFront/Fastly) is a geographically distributed fleet of edge reverse proxies spanning continents close to users.',
      analogousStory: 'A Reverse Proxy is your store\'s front counter inside the mall checking tickets and managing kitchen queues. A CDN is a franchise of 300 neighborhood vending kiosks located on street corners across the entire country stocking your popular products.',
      keyTakeaway: 'Production architectures layer BOTH: Global CDN at the extreme internet edge -> Cloud Reverse Proxy / LB inside your region -> Backend Servers.',
    },
    whyRequired: {
      problemsSolved: [
        'A local Reverse Proxy alone cannot eliminate 250ms trans-continental distance latency.',
        'A static CDN alone cannot inspect private VPC internal microservice health or route dynamic internal containers.',
      ],
      realWorldImpact: 'Stacking Cloudflare/CloudFront in front of Nginx/AWS ALB provides both planetary speed and granular regional control.',
      metricsAffected: ['Global TTFB', 'Internal Microservice Routing Control', 'Infrastructure Security'],
    },
    coreArchitecture: {
      description: 'Global CDN PoPs cache media worldwide, forwarding uncacheable dynamic API calls across dedicated backbones to your regional Reverse Proxy.',
      components: [
        { name: 'Global CDN Edge', role: 'Planetary Cache & WAF', details: 'Absorbs static traffic and edge DDoS near end users.' },
        { name: 'Regional Reverse Proxy (Nginx/Envoy)', role: 'VPC Perimeter Gateway', details: 'Routes dynamic APIs across private app fleets inside your cloud region.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Static Assets Stop at CDN', technicalDetail: 'Images, CSS, and videos resolve cleanly right at the nearby CDN PoP.' },
        { stepNumber: 2, action: 'Dynamic APIs Proxy to Region', technicalDetail: 'Uncacheable POST /checkout requests pass through CDN WAF straight to regional Reverse Proxy -> App Cluster.' },
      ],
    },
    visualizationId: 'cdn-vs-rp-3d',
    visualizationScene: 'reverse-proxy',
    visualizationModes: [
      { id: 'cache-hit', label: 'Static Hit at Edge/Proxy' },
      { id: 'reverse-proxy', label: 'Dynamic API Pass-Through' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Client Requests Static vs Dynamic Resource', description: 'Client requests either cached static assets or live dynamic API endpoints.', activeNodes: ['client-1', 'reverse-proxy'], packet: { from: 'client-1', to: 'reverse-proxy', label: 'Static vs API Request', type: 'request' } },
      { step: 2, title: 'Step 2: Cache Hit vs Backend Proxy Routing', description: 'Static files hit Cache instantly; dynamic API requests pass privately to internal App Workers.', activeNodes: ['reverse-proxy', 'cache-layer', 'app-server-2'], packet: { from: 'reverse-proxy', to: 'app-server-2', label: 'Dynamic Route / Cache Hit', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'client-devices', name: 'Global Client', role: 'User', description: 'Requests both media assets and dynamic APIs.' },
      { id: 'reverse-proxy', name: 'Edge / Reverse Proxy Tier', role: 'Shield & Router', description: 'CDN caches globally; regional Reverse Proxy routes VPC workloads.' },
      { id: 'cache-layer', name: 'Distributed / Local Cache', role: 'Fast Storage', description: 'Serves hot assets without waking backend CPUs.' },
      { id: 'app-servers', name: 'Regional App Servers', role: 'Dynamic Compute', description: 'Executes non-cacheable personalized APIs.' },
      { id: 'database', name: 'Origin Database', role: 'Persistent Truth', description: 'Stores dynamic application mutations.' },
    ],
    realWorldExample: {
      company: 'Modern SaaS Apps (Cloudflare + AWS ALB + Nginx)',
      scenario: 'Serving a globally used SaaS tool hosted in AWS US-East.',
      implementation: 'Cloudflare CDN terminates TLS worldwide and serves React bundles & marketing pages from 300+ edge nodes, while dynamic `/api/*` requests tunnel over persistent warm connections to AWS ALB + Nginx inside US-East.',
      scaleDetails: 'Reduces page load times globally by 60%+ while keeping VPC routing inside Kubernetes flexible.',
    },
    advantages: [
      'Layering both yields global static speed + fine-grained internal routing.',
    ],
    disadvantages: [
      'Debugging TLS/cache headers across two stacked proxy hops requires checking `CF-Ray` and `X-Forwarded-For` carefully.',
    ],
    relatedTopics: [
      { id: 'reverse-proxy', title: 'Reverse Proxy (Deep Dive)', module: 'system-design' },
      { id: 'cdn-architecture', title: 'CDN Architecture', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the simplest distinction between a CDN and a Reverse Proxy?', answer: 'A CDN IS technically a globally distributed network of reverse proxies focused on geographic proximity and caching static/edge content. A classic Reverse Proxy (like Nginx) typically runs inside your single data center/VPC in front of your backend servers.', keyPoints: ['CDN = Global geo-distributed caching network', 'Reverse Proxy = Regional/VPC server gateway'] },
      { level: 'intermediate', question: 'If you already use a CDN like Cloudflare, why keep Nginx inside your Kubernetes cluster?', answer: 'The CDN handles global edge TLS, DDoS, and static assets, while internal Nginx / Envoy handles private VPC service discovery, internal mTLS, Kubernetes Ingress path rewrites, and zero-downtime blue/green pod switching.', keyPoints: ['CDN handles planetary perimeter', 'Internal reverse proxy handles VPC ingress & pod routing'] },
      { level: 'advanced', question: 'How does "Connection Reuse / Argo Smart Routing" on a CDN speed up even UNCACHEABLE dynamic API calls?', answer: 'Opening a new TCP + TLS handshake from India to Virginia takes ~750ms (3 RTTs). When a user hits a local CDN PoP in Mumbai, TLS completes locally in 15ms, and the CDN reuses pre-warmed persistent TCP tunnels across optimized private fiber backbones straight to your Origin—cutting dynamic API latency significantly.', keyPoints: ['Local TLS termination', 'Pre-warmed persistent Edge-to-Origin TCP pools'] },
    ],
    quiz: [
      { id: 'crp-1', question: 'Which statement accurately describes the relationship between a CDN and a Reverse Proxy?', options: ['A CDN operates as a globally distributed network of edge reverse proxies', 'They have completely opposite security goals', 'A CDN replaces all SQL databases', 'Reverse proxies only work over Bluetooth'], correctAnswer: 0, explanation: 'CDNs deploy reverse-proxy caching servers across global PoPs.' },
      { id: 'crp-2', question: 'Where does a traditional Nginx Reverse Proxy typically run?', options: ['Inside your cloud VPC / data center right in front of application servers', 'Inside the user\'s web browser extension', 'On DNS Root servers', 'Inside mouse firmware'], correctAnswer: 0, explanation: 'Reverse proxies sit directly inside your server infrastructure perimeter.' },
      { id: 'crp-3', question: 'Which layer primarily reduces physical speed-of-light latency for a user in Tokyo accessing a US server?', options: ['CDN Edge PoP in Tokyo', 'A second Nginx server inside Virginia', 'Larger SQL primary keys', 'Uncompressed PNG files'], correctAnswer: 0, explanation: 'Only geographically local Edge nodes cut physical distance latency.' },
      { id: 'crp-4', question: 'Why might a dynamic POST `/checkout` request pass through BOTH a CDN and an internal Reverse Proxy?', options: ['CDN provides edge WAF/DDoS protection and warm connection reuse; internal Reverse Proxy routes to private microservice pods', 'CDNs cannot handle GET requests', 'Browsers require two proxies', 'To double latency intentionally'], correctAnswer: 0, explanation: 'Defense-in-depth combines edge security with internal VPC routing.' },
      { id: 'crp-5', question: 'What HTTP header carries the original client IP when traffic traverses a CDN and then an internal Reverse Proxy?', options: ['X-Forwarded-For / CF-Connecting-IP', 'Content-Length', 'ETag', 'Accept-Charset'], correctAnswer: 0, explanation: 'Proxy tiers append original client IPs into forwarding headers.' },
    ],
  },

  'rest-vs-graphql-soap': {
    id: 'rest-vs-graphql-soap',
    title: 'API Paradigms: REST vs GraphQL vs gRPC & SOAP',
    module: 'system-design',
    category: '7. API Design & API Gateway',
    readTime: '9 min',
    difficulty: 'Beginner',
    summary: 'Compare modern API architectures: RESTful HTTP resources, GraphQL flexible client queries, ultra-fast binary gRPC over HTTP/2, and legacy XML SOAP.',
    introduction: {
      definition: 'APIs define strict communication contracts between clients and servers. REST uses standard HTTP verbs on resource URLs (`/users/42`). GraphQL lets clients query exact JSON fields from a typed graph schema. gRPC uses binary Protocol Buffers over HTTP/2 for high-speed microservice RPCs.',
      analogousStory: 'REST is ordering fixed combo meals off a restaurant menu (easy to cache, predictable, though sometimes gives you extra fries you didn\'t want). GraphQL is a custom buffet counter where you list the exact items and quantities you want on one plate. gRPC is an internal pneumatic conveyor tube shooting compact binary capsules between chefs.',
      keyTakeaway: 'Use REST for public APIs (caching & simplicity); GraphQL for complex multi-client UIs avoiding over-fetching; gRPC for low-latency microservice-to-microservice calls.',
    },
    whyRequired: {
      problemsSolved: [
        'REST solves chaotic ad-hoc endpoints with uniform HTTP semantics and native browser/CDN GET caching.',
        'GraphQL solves Over-fetching (downloading 50 unused fields) and Under-fetching (making 5 sequential waterfall API calls on mobile).',
        'gRPC solves verbose JSON parsing bottlenecks between internal microservices via compact binary Protobuf.',
      ],
      realWorldImpact: 'Facebook created GraphQL for mobile feeds; Google built gRPC for hyper-scale internal RPCs; Stripe sets the gold standard for clean REST APIs.',
      metricsAffected: ['Payload Byte Size', 'Network Round-Trips (Waterfall)', 'HTTP Cacheability'],
    },
    coreArchitecture: {
      description: 'An API Gateway often translates external REST/GraphQL JSON requests into high-speed internal gRPC calls between microservices.',
      components: [
        { name: 'REST Endpoint Router', role: 'Resource-Oriented HTTP', details: 'Maps GET, POST, PUT, DELETE to resource nouns with HTTP status codes and native caching.' },
        { name: 'GraphQL Resolver Engine', role: 'Single Endpoint Graph', details: 'Parses client query AST on POST /graphql, resolving exact nested fields.' },
        { name: 'gRPC / Protobuf Mesh', role: 'Binary RPC', details: 'Uses strict `.proto` contracts and HTTP/2 multiplexing for internal speed.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Client Dispatches Contract', technicalDetail: 'Mobile/Web client sends REST GET, GraphQL query document, or gRPC call.' },
        { stepNumber: 2, action: 'Gateway Validates & Translates', technicalDetail: 'API Gateway checks auth/schema and delegates to internal services.' },
        { stepNumber: 3, action: 'Response Serialization', technicalDetail: 'Returns JSON (REST/GraphQL) or compact binary Protobuf (gRPC).' },
      ],
    },
    visualizationId: 'api-paradigms-3d',
    visualizationScene: 'api-gateway',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: External Client Sends REST / GraphQL Request', description: 'Mobile client sends single GraphQL query or REST call to API Gateway.', activeNodes: ['api-client', 'api-gateway'], packet: { from: 'api-client', to: 'api-gateway', label: 'GraphQL / REST Query', type: 'request' } },
      { step: 2, title: 'Step 2: Gateway Resolves Across Internal gRPC Services', description: 'Gateway fans out fast internal binary gRPC calls across User and Order microservices.', activeNodes: ['api-gateway', 'svc-users', 'svc-orders'], packet: { from: 'api-gateway', to: 'svc-orders', label: 'Internal Binary gRPC', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'api-client', name: 'Web / Mobile Client', role: 'API Consumer', description: 'Consumes REST JSON or GraphQL exact-shape payloads.' },
      { id: 'api-gateway', name: 'API Gateway / GraphQL Server', role: 'Protocol Aggregator', description: 'Translates public REST/GraphQL into internal gRPC.' },
      { id: 'auth-service', name: 'Schema & Auth Validator', role: 'Contract Guard', description: 'Verifies JWTs and GraphQL query depth limits.' },
      { id: 'svc-users', name: 'User gRPC Microservice', role: 'Internal RPC Node', description: 'High-speed Protobuf responder.' },
      { id: 'svc-orders', name: 'Order gRPC Microservice', role: 'Internal RPC Node', description: 'High-speed Protobuf responder.' },
      { id: 'svc-payments', name: 'Payment Service', role: 'Idempotent REST/gRPC', description: 'Handles secure billing contracts.' },
    ],
    realWorldExample: {
      company: 'GitHub & Netflix',
      scenario: 'Supporting complex nested developer queries alongside public REST integrations.',
      implementation: 'GitHub maintains both a REST v3 API for simple webhook/script integration AND a GraphQL v4 API so IDE clients can fetch a repo\'s last 10 commits, PR reviewers, and issues in one single network round trip. Netflix uses GraphQL Federation over internal gRPC microservices.',
      scaleDetails: 'Eliminates hundreds of millions of redundant mobile waterfall round-trips.',
    },
    advantages: [
      'REST: Simple, universal HTTP caching (CDN/browser GET), stateless semantics.',
      'GraphQL: Zero over-fetching, strongly typed schema, eliminates multi-request mobile waterfalls.',
      'gRPC: 5-10x smaller binary payloads, bi-directional HTTP/2 streaming, strict codegen.',
    ],
    disadvantages: [
      'REST: Prone to over-fetching/under-fetching across complex UI screens.',
      'GraphQL: Harder to HTTP-cache (uses POST), N+1 database query risks unless DataLoader is used.',
      'gRPC: Not natively human-readable in browser dev tools without gRPC-Web proxy.',
    ],
    relatedTopics: [
      { id: 'api-gateway-architecture', title: 'API Gateway Architecture', module: 'system-design' },
      { id: 'http-evolution-http1-2-3', title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What are "Over-fetching" and "Under-fetching" in REST APIs?', answer: 'Over-fetching is downloading more fields than needed (e.g., `/users/42` returns 40 profile columns when the UI only wants `username`). Under-fetching is when `/users/42` lacks the user\'s recent posts, forcing a second round-trip to `/users/42/posts`. GraphQL solves both in one query.', keyPoints: ['Over-fetching = extra unused fields', 'Under-fetching = multiple waterfall round trips'] },
      { level: 'intermediate', question: 'Why is caching harder in GraphQL than in REST?', answer: 'REST assigns distinct cacheable URLs to resources (`GET /products/12`), so CDNs and browsers cache responses natively. GraphQL typically sends dynamic query payloads via `POST /graphql`, bypassing standard URL-based CDN/browser HTTP caches unless persisted queries (GET with query hash) or client normalized caches (Apollo) are configured.', keyPoints: ['REST uses cacheable GET URLs', 'GraphQL uses dynamic POST bodies'] },
      { level: 'advanced', question: 'Explain the "N+1 Query Problem" in GraphQL resolvers and how DataLoader fixes it.', answer: 'If a GraphQL query asks for 50 Posts and each Post\'s `author` field triggers a SQL query inside the `author` resolver (`SELECT * FROM users WHERE id=?`), rendering 50 posts runs 1 + 50 = 51 database queries! Facebook\'s `DataLoader` batches all 50 requested `author_id`s across one event-loop tick into a single batched SQL query (`WHERE id IN (...)`).', keyPoints: ['Nested resolvers loop into N extra SQL queries', 'DataLoader batches & deduplicates per request tick'] },
    ],
    quiz: [
      { id: 'api-1', question: 'Which API technology uses binary Protocol Buffers over HTTP/2 and excels at internal microservice-to-microservice speed?', options: ['gRPC', 'SOAP XML', 'Plain Text FTP', 'HTML Forms'], correctAnswer: 0, explanation: 'gRPC leverages compact binary Protobuf serialization and HTTP/2 multiplexing.' },
      { id: 'api-2', question: 'What problem does Facebook\'s `DataLoader` solve inside GraphQL servers?', options: ['The N+1 nested resolver SQL query explosion via batching', 'TLS encryption', 'DNS poisoning', 'CSS layout'], correctAnswer: 0, explanation: 'DataLoader batches per-item resolver lookups into single `IN (...)` queries.' },
      { id: 'api-3', question: 'Which HTTP method is BOTH safe (no side effects) AND idempotent?', options: ['GET', 'POST', 'CONNECT', 'PATCH'], correctAnswer: 0, explanation: 'GET reads data without mutating state, making it safe and idempotent.' },
      { id: 'api-4', question: 'Why is REST generally easier to cache at a CDN edge than default GraphQL?', options: ['REST exposes deterministic resource URLs over HTTP GET', 'GraphQL forbids HTTPS', 'CDNs only understand XML', 'REST has no headers'], correctAnswer: 0, explanation: 'Standard HTTP caches key off GET URLs natively.' },
      { id: 'api-5', question: 'Which legacy enterprise protocol relies strictly on verbose XML envelopes (WSDL)?', options: ['SOAP', 'REST', 'gRPC', 'GraphQL'], correctAnswer: 0, explanation: 'SOAP uses XML envelopes and WSDL contracts.' },
    ],
  },

  'api-gateway-architecture': {
    id: 'api-gateway-architecture',
    title: 'API Gateway Architecture (Routing, Auth, Composition & Security)',
    module: 'system-design',
    category: '7. API Design & API Gateway',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'An API Gateway serves as the unified control plane sitting in front of microservices—handling authentication, authorization, rate limiting, request composition, protocol translation, and observability.',
    introduction: {
      definition: 'An API Gateway is a specialized Layer 7 reverse proxy designed specifically for managing APIs at scale. It decouples public client contracts from internal microservice topology and centralizes cross-cutting concerns.',
      analogousStory: 'Think of airport border control & concierge: instead of passengers walking straight onto 12 different airline tarmacs where every pilot has to check passports, scan luggage, and convert currency individually, one centralized gateway checks passports (Auth), limits carry-ons (Rate Limiting), and routes travelers to the exact boarding gate.',
      keyTakeaway: 'Never duplicate JWT verification, CORS, logging, and rate-limiting code across 30 microservices—centralize them cleanly at the API Gateway.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents repeating auth, rate-limiting, logging, and CORS boilerplate inside every single microservice.',
        'Hides internal microservice refactoring (splitting or merging services) without breaking mobile app URLs.',
        'Aggregates multiple backend calls into one round-trip for slow mobile networks (BFF: Backend for Frontend).',
      ],
      realWorldImpact: 'Tools like Kong, AWS API Gateway, Envoy, and Apigee guard nearly all modern SaaS and fintech APIs.',
      metricsAffected: ['Cross-Cutting Code Duplication', 'Unauthorized Traffic Rejection Rate', 'Mobile Network Round-Trips'],
    },
    coreArchitecture: {
      description: 'Gateway pipeline validates TLS -> Rate Limit -> Auth JWT -> Route/Compose -> Downstream Microservices.',
      components: [
        { name: 'JWT / OAuth2 Auth Middleware', role: 'Identity Guard', details: 'Validates cryptographic token signatures and injects verified `X-User-ID` headers internally.' },
        { name: 'Distributed Rate Limiter', role: 'Abuse Shield', details: 'Tracks Token Bucket counters in Redis, dropping bursts with HTTP 429.' },
        { name: 'Path Router & BFF Aggregator', role: 'Traffic Composer', details: 'Maps `/v1/users` or composes parallel internal calls into one response.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Ingress & Rate Limit Check', technicalDetail: 'Gateway evaluates IP/API-key quotas; rejects excessive floods with `429 Too Many Requests`.' },
        { stepNumber: 2, action: 'Authentication & Claims Injection', technicalDetail: 'Verifies JWT signature and passes sanitized identity context downstream.' },
        { stepNumber: 3, action: 'Route & Protocol Translation', technicalDetail: 'Dispatches public REST call over internal gRPC to matching microservice.' },
      ],
    },
    visualizationId: 'api-gw-3d',
    visualizationScene: 'api-gateway',
    visualizationModes: [
      { id: 'authorized', label: 'Authenticated Flow (200 OK)' },
      { id: 'rate-limited', label: 'Rate Limit Shield (429 Blocked)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Mobile & Web Clients Hit API Gateway', description: 'External apps call unified endpoint `https://api.company.com/v1/orders`.', activeNodes: ['api-client', 'api-gateway'], packet: { from: 'api-client', to: 'api-gateway', label: 'HTTPS + Bearer JWT', type: 'request' } },
      { step: 2, title: 'Step 2: Gateway Validates JWT & Rate Limit Bucket', description: 'Auth guard verifies token and Redis Token Bucket permits quota (try switching to Rate Limit Shield mode above!).', activeNodes: ['api-gateway', 'auth-service'], packet: { from: 'api-gateway', to: 'auth-service', label: 'Check JWT & Token Bucket', type: 'sync' } },
      { step: 3, title: 'Step 3: Clean Internal Routing to Microservice', description: 'Authorized request forwards internally to Order Service over VPC.', activeNodes: ['svc-orders'], packet: { from: 'api-gateway', to: 'svc-orders', label: 'Internal Dispatch -> Orders', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'api-client', name: 'External Clients', role: 'Mobile/Web Consumers', description: 'Communicates exclusively with the single Gateway host.' },
      { id: 'api-gateway', name: 'API Gateway (Kong / Envoy)', role: 'API Control Plane', description: 'Enforces routing, versioning, TLS, and payload transformations.' },
      { id: 'auth-service', name: 'Auth & Rate Limit Guard', role: 'Security Policy Engine', description: 'Validates OAuth2/JWTs and enforces Token Bucket quotas.' },
      { id: 'svc-users', name: 'Users Microservice', role: 'Identity Pool', description: 'Handles user CRUD.' },
      { id: 'svc-orders', name: 'Orders Microservice', role: 'Order Pool', description: 'Handles order creation.' },
      { id: 'svc-payments', name: 'Payments Microservice', role: 'Billing Pool', description: 'Handles financial transactions.' },
    ],
    realWorldExample: {
      company: 'Netflix / SoundCloud (BFF Pattern)',
      scenario: 'Serving drastically different UI payloads to TVs, iPhones, and Web browsers from shared microservices.',
      implementation: 'Netflix popularized the "Backend for Frontend" (BFF) API Gateway pattern: tailored gateway adapters optimize payload shaping specifically for Apple TV vs Android vs Web instead of returning massive one-size-fits-all JSON.',
      scaleDetails: 'Handles billions of daily API gateway calls across hundreds of internal microservices.',
    },
    advantages: [
      'Centralizes security, auth, rate limiting, and API versioning (`/v1` vs `/v2`).',
      'Shields internal service refactoring from breaking client apps.',
    ],
    disadvantages: [
      'Can become a bottleneck or SPOF if not horizontally scaled across Availability Zones.',
      'Risk of turning into an anti-pattern if complex business domain logic creeps into Gateway plugins.',
    ],
    relatedTopics: [
      { id: 'rate-limiting', title: 'Rate Limiting Algorithms', module: 'system-design' },
      { id: 'reverse-proxy', title: 'Reverse Proxy vs API Gateway', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'How does an API Gateway differ from a standard Load Balancer?', answer: 'A Load Balancer primarily distributes network/HTTP traffic across healthy replicas of a service. An API Gateway adds API-lifecycle intelligence: JWT authentication, fine-grained per-user rate limiting, API versioning, request aggregation (BFF), billing/monetization, and REST-to-gRPC protocol translation.', keyPoints: ['LB = Distribution & health checks', 'API Gateway = Auth, rate limits, composition, versioning'] },
      { level: 'intermediate', question: 'What is the "Backend for Frontend" (BFF) pattern?', answer: 'Instead of one bloated universal API Gateway trying to satisfy web, mobile, and smart-watch screens identically, BFF creates dedicated lightweight gateway layers tailored per client platform (e.g., Mobile BFF returns compact summaries; Web BFF returns rich dashboard data).', keyPoints: ['Separate tailored gateway per client type', 'Avoids bloated one-size-fits-all payloads'] },
      { level: 'advanced', question: 'Explain the difference between Authentication and Authorization at the API Gateway.', answer: 'Authentication ("Who are you?") verifies identity credentials (validating JWT signature or API key at the Gateway). Authorization ("What are you allowed to do?") verifies fine-grained permissions (e.g., "Can User 42 delete Order 99?"). Gateways typically handle Authentication and coarse RBAC scopes centrally, while microservices enforce fine-grained object-level Authorization.', keyPoints: ['AuthN = Identity (Centralized at Gateway)', 'AuthZ = Resource permissions (Coarse scopes at Gateway, fine-grained object ownership inside microservice)'] },
    ],
    quiz: [
      { id: 'agw-1', question: 'Which HTTP status code does an API Gateway return when a caller exceeds their allowed API request quota?', options: ['429 Too Many Requests', '200 OK', '404 Not Found', '301 Moved Permanently'], correctAnswer: 0, explanation: 'HTTP 429 signals rate limit enforcement.' },
      { id: 'agw-2', question: 'What is the "Backend for Frontend" (BFF) pattern?', options: ['Dedicated API Gateway adapters shaped specifically for Web vs Mobile vs TV clients', 'Putting SQL queries inside React components', 'Turning off backend servers', 'Using CSS inside Python'], correctAnswer: 0, explanation: 'BFF tailors API composition to each distinct frontend interface.' },
      { id: 'agw-3', question: 'What anti-pattern should architects avoid inside an API Gateway?', options: ['Embedding heavy business domain logic inside Gateway routing scripts', 'Terminating TLS', 'Verifying JWTs', 'Injecting Request IDs'], correctAnswer: 0, explanation: 'Gateways should stick to cross-cutting routing/security, keeping business logic inside domain services.' },
      { id: 'agw-4', question: 'Which cross-cutting responsibility is ideally centralized at an API Gateway?', options: ['Authentication, Rate Limiting, CORS, and Request Logging', 'SQL Foreign Key checks', 'CSS animation frames', 'Disk defragmentation'], correctAnswer: 0, explanation: 'Centralizing edge policies avoids duplicating code across dozens of microservices.' },
      { id: 'agw-5', question: 'How does an API Gateway support graceful API evolution without breaking old mobile app versions?', options: ['URI or Header-based Versioning (`/v1/orders` vs `/v2/orders`)', 'Forcing users to reinstall OS', 'Shutting down old databases overnight', 'Deleting JSON keys silently'], correctAnswer: 0, explanation: 'Version routing preserves compatibility for older clients while rolling out v2.' },
    ],
  },

  'rate-limiting': {
    id: 'rate-limiting',
    title: 'Rate Limiting Algorithms (Token Bucket, Leaky Bucket & Sliding Window)',
    module: 'system-design',
    category: '7. API Design & API Gateway',
    readTime: '10 min',
    difficulty: 'Advanced',
    summary: 'Rate limiting governs the maximum frequency of requests a client or IP can execute in a time window—preventing DDoS floods, brute-force attacks, and noisy-neighbor resource starvation.',
    introduction: {
      definition: 'A Rate Limiter inspects incoming API traffic by user ID, API key, or IP address and throttles requests exceeding policy thresholds using algorithms such as Token Bucket, Leaky Bucket, Fixed Window Counter, and Sliding Window Log.',
      analogousStory: 'Token Bucket is an arcade game cabinet where tokens drop into your cup at 1 token/second up to a max cup size of 10. You can burst 10 rapid plays using saved tokens, then you are paced at 1/sec. Leaky Bucket is a bucket with a small hole at the bottom: no matter how fast water pours in, it drips out at a smooth constant rate.',
      keyTakeaway: 'Token Bucket (backed by Redis atomic Lua scripts) is the industry standard for API rate limiting because it supports controlled traffic bursts with minimal memory.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents scraping bots and Layer 7 DoS floods from crashing databases.',
        'Stops brute-force password/OTP guessing attacks.',
        'Enforces tiered monetization limits (e.g., Free Tier = 100 req/min vs Enterprise = 10,000 req/min).',
      ],
      realWorldImpact: 'Every public API—GitHub, Stripe, OpenAI, Twitter—enforces distributed Redis rate limits returning `X-RateLimit-Remaining` and `Retry-After` headers.',
      metricsAffected: ['HTTP 429 Rejection Rate', 'Redis Atomic Ops Latency (<1ms)', 'Downstream Database Protection'],
    },
    coreArchitecture: {
      description: 'API Gateway intercepts calls and executes an atomic Redis Lua script checking/decrementing user quota before forwarding upstream.',
      components: [
        { name: 'Token Bucket Limiter', role: 'Burst-Friendly Throttler', details: 'Stores `(tokens, last_refill_ts)` per user key in Redis; permits bursts up to bucket capacity.' },
        { name: 'Sliding Window Counter', role: 'Boundary-Accurate Limiter', details: 'Eliminates Fixed Window edge-spike double-bursts using weighted rolling overlap.' },
        { name: 'Redis Atomic Lua Script', role: 'Race-Free Counter', details: 'Executes read-check-decrement atomically on Redis single thread, preventing race conditions.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Extract Limiter Key', technicalDetail: 'Gateway identifies caller via `user_id`, `api_key`, or client IP.' },
        { stepNumber: 2, action: 'Atomic Redis Check', technicalDetail: 'Redis Lua script refills tokens elapsed since last request; if tokens >= 1, decrements and allows.' },
        { stepNumber: 3, action: 'Allow or Reject (HTTP 429)', technicalDetail: 'Allowed calls proceed; exhausted buckets return `429 Too Many Requests` + `Retry-After`.' },
      ],
    },
    visualizationId: 'rate-limit-3d',
    visualizationScene: 'api-gateway',
    visualizationModes: [
      { id: 'rate-limited', label: 'Bucket Empty -> 429 Block' },
      { id: 'authorized', label: 'Tokens Available -> 200 OK' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Burst Request Hits Limiter', description: 'Client fires high-frequency burst requests toward the API Gateway.', activeNodes: ['api-client', 'api-gateway'], packet: { from: 'api-client', to: 'api-gateway', label: 'Burst Requests', type: 'request' } },
      { step: 2, title: 'Step 2: Redis Token Bucket Evaluation', description: 'Limiter evaluates remaining tokens in Redis. When bucket hits 0, requests are blocked immediately!', activeNodes: ['api-gateway', 'auth-service'], packet: { from: 'api-gateway', to: 'auth-service', label: 'Lua Atomic Token Check', type: 'sync' } },
      { step: 3, title: 'Step 3: Downstream Services Protected', description: 'Excess flood returns 429 instantly so backend microservices stay fast and healthy.', activeNodes: ['api-gateway', 'api-client'], packet: { from: 'api-gateway', to: 'api-client', label: '429 Too Many Requests', type: 'blocked' } },
    ],
    interactiveComponents: [
      { id: 'api-client', name: 'Bursting API Client', role: 'Traffic Source', description: 'Sends bursts exceeding configured quota.' },
      { id: 'api-gateway', name: 'Gateway Limiter Edge', role: 'Enforcement Point', description: 'Drops excess requests cleanly before touching app servers.' },
      { id: 'auth-service', name: 'Redis Token Bucket Store', role: 'Quota Counter', description: 'Atomic Lua scripts prevent race-condition overshoots.' },
      { id: 'svc-orders', name: 'Protected Order Service', role: 'Downstream Backend', description: 'Shielded from flood exhaustion.' },
      { id: 'svc-users', name: 'Protected User Service', role: 'Downstream Backend', description: 'Shielded from brute force.' },
      { id: 'svc-payments', name: 'Protected Billing Service', role: 'Downstream Backend', description: 'Shielded from abuse.' },
    ],
    realWorldExample: {
      company: 'Stripe & Figma',
      scenario: 'Enforcing multi-tier distributed rate limits across global edge gateways without race conditions.',
      implementation: 'Stripe implements layered limiters (Concurrent Request Limiter + Token Bucket Rate Limiter + Load Shedder) backed by Redis clusters executing atomic Lua scripts, communicating limits transparently via `Retry-After` headers.',
      scaleDetails: 'Drops thousands of rogue flood bursts per second with < 1ms overhead on valid calls.',
    },
    advantages: [
      'Token Bucket: Tiny memory footprint (2 numbers per user) + smooth support for short bursts.',
      'Sliding Window Counter: Eliminates the boundary burst flaw of naive Fixed Windows.',
    ],
    disadvantages: [
      'Strict Sliding Window Logs consume huge RAM if storing every individual request timestamp.',
      'Distributed rate limiters must handle Redis network race conditions carefully via Lua scripts.',
    ],
    relatedTopics: [
      { id: 'api-gateway-architecture', title: 'API Gateway Architecture', module: 'system-design' },
      { id: 'redis-architecture', title: 'Redis Architecture Internals', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Compare Token Bucket vs Leaky Bucket rate limiting.', answer: 'Token Bucket refills tokens at rate R up to capacity B—allowing short controlled traffic bursts as long as tokens exist. Leaky Bucket queues incoming requests in a FIFO buffer and leaks them out at a strict fixed steady pace—smoothing bursts into constant flat downstream traffic.', keyPoints: ['Token Bucket = Permits short bursts', 'Leaky Bucket = Enforces flat constant output rate'] },
      { level: 'intermediate', question: 'What is the "Boundary Spike Bug" in a naive Fixed Window Counter?', answer: 'Suppose a Fixed Window limits users to 100 requests/minute. A sneaky client fires 100 requests at 12:00:59 and another 100 requests at 12:01:01—landing 200 requests inside just 2 seconds (2x the limit!). Sliding Window Counter solves this by weighting the overlap across adjacent windows.', keyPoints: ['2x spike right across minute boundaries', 'Solved by Sliding Window Counter'] },
      { level: 'advanced', question: 'In a distributed cluster of 20 API Gateways sharing Redis, how do you prevent Race Conditions during rate checking?', answer: 'If Gateway A and B both read `tokens=5` concurrently, both decrement to `4`, and both write `4`, two requests consumed only one token! Fix this by executing the read-refill-check-decrement inside a single atomic Redis Lua script (or Redis `INCR` + `EXPIRE`), since Redis executes Lua scripts atomically on its single thread.', keyPoints: ['Read-modify-write across network causes race bugs', 'Use atomic Redis Lua script'] },
    ],
    quiz: [
      { id: 'rl-1', question: 'Which algorithm allows legitimate short bursts while maintaining an average long-term rate?', options: ['Token Bucket', 'Fixed Zero Window', 'Random Drop', 'TCP FIN'], correctAnswer: 0, explanation: 'Accumulated tokens in a Token Bucket permit controlled bursts up to bucket capacity.' },
      { id: 'rl-2', question: 'Which HTTP header informs a throttled client how many seconds to wait before retrying?', options: ['Retry-After', 'Content-Type', 'User-Agent', 'Host'], correctAnswer: 0, explanation: '`Retry-After` communicates exact cooldown duration alongside HTTP 429.' },
      { id: 'rl-3', question: 'Why is executing Token Bucket checks via a Redis Lua script superior to separate GET + SET calls?', options: ['Lua scripts execute atomically in Redis, eliminating concurrent race conditions', 'Lua turns HTTP into UDP', 'GET + SET deletes all data', 'Lua disables RAM'], correctAnswer: 0, explanation: 'Atomic Lua scripts avoid lost-update races across parallel API gateway instances.' },
      { id: 'rl-4', question: 'What flaw occurs at `00:59` and `01:01` with a 1-minute Fixed Window Counter?', options: ['A user can squeeze 2x the allowed limit within 2 seconds straddling the boundary', 'Servers stop counting forever', 'Browsers crash', 'Redis deletes keys'], correctAnswer: 0, explanation: 'Fixed boundaries allow double bursts right across clock resets.' },
      { id: 'rl-5', question: 'What does a "Leaky Bucket" prioritize?', options: ['Smoothing bursty traffic into a completely steady, constant outflow rate', 'Allowing unlimited instant bursts', 'Storing passwords', 'DNS caching'], correctAnswer: 0, explanation: 'Leaky buckets pace outgoing traffic at an invariant drip rate.' },
    ],
  },

  'sync-vs-async-communication': {
    id: 'sync-vs-async-communication',
    title: 'Synchronous vs Asynchronous Communication in Distributed Systems',
    module: 'system-design',
    category: '8. Communication & Message Queues',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'Synchronous calls (REST/gRPC) block the caller waiting for an immediate answer, while Asynchronous communication (Queues/Brokers) dispatches messages non-blockingly for resilient background processing.',
    introduction: {
      definition: 'Synchronous communication requires both sender and receiver to be available simultaneously while the caller blocks waiting for a reply. Asynchronous communication routes messages through an intermediary queue or broker so the producer continues immediately without blocking.',
      analogousStory: 'Synchronous is a phone call: you dial, stand holding the receiver against your ear until your friend picks up and finishes answering. Asynchronous is sending a text message or email: you hit send, walk away to finish other tasks, and your friend replies whenever they are ready.',
      keyTakeaway: 'Use Synchronous calls when the user\'s next UI screen strictly needs the immediate answer (e.g., Login, Inventory Check); use Asynchronous queues for heavy side-effects (emails, video encoding, PDFs, analytics).',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents slow 10-second tasks (video transcoding, invoice generation) from timing out HTTP connections.',
        'Stops downstream outages from crashing the upstream checkout service.',
        'Smooths out violent peak traffic bursts without dropping user orders.',
      ],
      realWorldImpact: 'Every responsive e-commerce checkout confirms the order immediately while sending emails, analytics, and warehouse alerts asynchronously.',
      metricsAffected: ['API P95 Latency', 'Fault Coupling', 'Spike Survival Rate'],
    },
    coreArchitecture: {
      description: 'Compare blocking Request-Response RPC against Producer -> Durable Queue -> Worker Asynchronous pipelines.',
      components: [
        { name: 'Sync HTTP / gRPC Client', role: 'Immediate Answer Path', details: 'Blocks on critical reads/auth checks expecting sub-100ms answers.' },
        { name: 'Async Message Broker', role: 'Decoupling Buffer', details: 'Persists background work events so producers return HTTP 202 Accepted instantly.' },
        { name: 'Background Worker Pool', role: 'Async Processors', details: 'Scales independently by queue depth to process heavy jobs cleanly.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Publish Async Job', technicalDetail: 'User uploads video -> API saves file to S3, pushes `TranscodeJob` to queue, returns `202 Accepted` in 30ms.' },
        { stepNumber: 2, action: 'Queue Buffers Load', technicalDetail: 'If 10,000 videos arrive at once, queue safely holds the backlog.' },
        { stepNumber: 3, action: 'Workers Process & Notify', technicalDetail: 'GPU worker pulls job, transcodes 4K/1080p/720p, and pushes WebSocket completion alert.' },
      ],
    },
    visualizationId: 'sync-async-3d',
    visualizationScene: 'message-queue',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Producer Publishes Non-Blocking Job', description: 'API server enqueues background task onto Broker and immediately responds 202 Accepted to user.', activeNodes: ['producer', 'broker'], packet: { from: 'producer', to: 'broker', label: 'Enqueue Job (Non-Blocking)', type: 'request' } },
      { step: 2, title: 'Step 2: Broker Buffers Work Safely', description: 'Broker holds events safely in memory/disk buffer even if consumer workers are busy or restarting.', activeNodes: ['broker'], packet: { from: 'producer', to: 'broker', label: 'Durable Queue Buffer', type: 'sync' } },
      { step: 3, title: 'Step 3: Workers Consume Asynchronously', description: 'Background worker pods pull jobs at their sustainable pace without timeouts.', activeNodes: ['broker', 'consumer'], packet: { from: 'broker', to: 'consumer', label: 'Async Worker Process', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'producer', name: 'Producer API Server', role: 'Job Enqueuer', description: 'Offloads slow side-effects and returns quickly to users.' },
      { id: 'broker', name: 'Async Broker Queue', role: 'Shock Absorber', description: 'Decouples producer speed from worker speed.' },
      { id: 'consumer', name: 'Background Consumer Workers', role: 'Async Processors', description: 'Executes heavy CPU/IO jobs with retries and DLQs.' },
    ],
    realWorldExample: {
      company: 'Stripe Webhooks & Shopify Checkout',
      scenario: 'Handling order confirmation, warehouse ERP sync, receipt email, and loyalty points.',
      implementation: 'Checkout synchronizes ONLY payment card authorization synchronously; warehouse updates, receipts, and analytics run via async background queues so a temporary email server glitch never blocks paying customers.',
      scaleDetails: 'Maintains <250ms checkout response times even during Black Friday peaks.',
    },
    advantages: [
      'Dramatically improves user-facing API speed and availability.',
      'Protects workers from burst spikes via queue buffering.',
    ],
    disadvantages: [
      'Adds eventual consistency UX complexity (need polling, WebSockets, or `202 Accepted` status pages).',
    ],
    relatedTopics: [
      { id: 'message-queues-brokers', title: 'Message Queues & RabbitMQ', module: 'system-design' },
      { id: 'kafka-architecture', title: 'Apache Kafka Architecture', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What HTTP status code properly represents an accepted Asynchronous background job?', answer: 'HTTP `202 Accepted` (often accompanied by a `Location` header or `job_id` URL where the client can poll progress).', keyPoints: ['HTTP 202 Accepted', 'Include job_id for status polling or webhook callback'] },
      { level: 'intermediate', question: 'How does Synchronous RPC chaining create cascading availability loss?', answer: 'If Service A calls B -> C -> D synchronously, and D hangs for 30 seconds, C\'s threads fill up waiting, then B\'s threads fill up, and finally A crashes even for endpoints that didn\'t need D! Asynchronous queues decouple those failure domains completely.', keyPoints: ['Slow downstream exhausts upstream thread pools', 'Queues isolate failure domains'] },
      { level: 'advanced', question: 'What is "Backpressure" in asynchronous streaming systems?', answer: 'Backpressure occurs when Producers generate events faster than Consumers can process them, risking queue memory overflow. Solutions include bounded queue sizes with producer throttling, consumer auto-scaling driven by queue depth metrics (KEDA), or load shedding non-critical events.', keyPoints: ['Producer rate > Consumer rate', 'Fix via bounded queues, auto-scaling on lag, or load shedding'] },
    ],
    quiz: [
      { id: 'sa-1', question: 'Which HTTP status code best indicates a server queued a heavy async task for background processing?', options: ['202 Accepted', '404 Not Found', '503 Service Unavailable', '301 Moved Permanently'], correctAnswer: 0, explanation: '202 Accepted signals the request is valid and queued asynchronously.' },
      { id: 'sa-2', question: 'Which task is ideally suited for Synchronous communication rather than an Async Queue?', options: ['Validating a user\'s password during login', 'Generating a 50-page monthly PDF report', 'Sending 10,000 promotional emails', 'Transcoding a 2-hour 4K video'], correctAnswer: 0, explanation: 'Login requires an immediate synchronous pass/fail decision before entering the app.' },
      { id: 'sa-3', question: 'What happens in an async architecture if the email worker server crashes for 10 minutes?', options: ['The message queue retains pending emails safely until the worker restarts', 'Checkout payments crash immediately', 'User passwords get deleted', 'DNS resets'], correctAnswer: 0, explanation: 'Durable queues buffer events safely across consumer outages.' },
      { id: 'sa-4', question: 'What is "Backpressure"?', options: ['Mechanisms signaling/throttling fast producers when slow consumers fall behind', 'Running wires backwards', 'Over-indexing SQL tables', 'Caching static fonts'], correctAnswer: 0, explanation: 'Backpressure prevents unbounded memory overflow when consumption lags production.' },
      { id: 'sa-5', question: 'Why does Asynchronous processing improve user perceived latency?', options: ['Producers offload slow tasks to queues and return immediately to the user', 'TCP packets travel faster than light', 'JSON becomes empty', 'Browsers skip rendering'], correctAnswer: 0, explanation: 'Users only wait for fast queueing (~5ms) rather than slow execution (10s).' },
    ],
  },

  'message-queues-brokers': {
    id: 'message-queues-brokers',
    title: 'Message Queues & Broker Architectures (RabbitMQ, SQS, Pub/Sub)',
    module: 'system-design',
    category: '8. Communication & Message Queues',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Message brokers (RabbitMQ, AWS SQS) route work tasks reliably using Point-to-Point Competing Consumers or Publish-Subscribe fan-out exchanges with acknowledgments and Dead Letter Queues.',
    introduction: {
      definition: 'A Message Queue is an asynchronous durable buffer adhering to FIFO ordering where producers enqueue messages and workers consume them. Traditional brokers like RabbitMQ implement AMQP smart exchanges that route messages into queues and delete each message once acknowledged.',
      analogousStory: 'Picture a commercial kitchen ticket rail (Queue). Waiters (Producers) clip meal tickets onto the rail. Line cooks (Competing Consumers) grab the next available ticket, cook it, and tear the ticket off the rail (ACK) when done. If a cook drops a plate, the ticket returns to the rail for another cook.',
      keyTakeaway: 'Point-to-Point Queues distribute tasks evenly across competing workers (each message processed ONCE); Pub/Sub broadcasts copies to multiple independent subscribers.',
    },
    whyRequired: {
      problemsSolved: [
        'Guarantees zero lost work jobs even when consumer machines reboot mid-task (via explicit Consumer ACKs).',
        'Balances parallel worker throughput cleanly ("Competing Consumers").',
        'Supports complex routing patterns via RabbitMQ Direct, Fanout, and Topic exchanges.',
      ],
      realWorldImpact: 'AWS SQS and RabbitMQ process billions of background notifications, payment webhooks, and thumbnail jobs daily.',
      metricsAffected: ['Queue Depth / Backlog', 'Visibility Timeout Duration', 'Dead-Letter Error Isolation'],
    },
    coreArchitecture: {
      description: 'Producers publish to Exchanges -> Exchange routes to Queues -> Consumers fetch with Visibility Timeout -> ACK deletes message.',
      components: [
        { name: 'AMQP Exchange Router', role: 'Smart Message Routing', details: 'Routes by Direct key, Fanout broadcast, or wildcard Topic patterns (`order.*.created`).' },
        { name: 'Durable FIFO Queue', role: 'Task Buffer', details: 'Stores unacknowledged messages until a worker finishes and sends an explicit ACK.' },
        { name: 'Competing Consumer Pool', role: 'Parallel Workers', details: 'Multiple worker pods pulling disjoint tasks cleanly from one shared queue.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Publish to Exchange', technicalDetail: 'Producer pushes task payload to Broker exchange with routing key.' },
        { stepNumber: 2, action: 'Queue Delivery & Lock', technicalDetail: 'Broker delivers message to Worker 1 and hides it temporarily (Visibility Timeout).' },
        { stepNumber: 3, action: 'ACK or Redelivery', technicalDetail: 'If Worker 1 sends ACK, Broker removes message; if Worker 1 crashes before timeout, Broker redelivers to Worker 2.' },
      ],
    },
    visualizationId: 'mq-3d',
    visualizationScene: 'message-queue',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Producers Push Jobs to Broker', description: 'Multiple upstream producers publish independent tasks into the Message Broker.', activeNodes: ['producer', 'broker'], packet: { from: 'producer', to: 'broker', label: 'Publish Task Payload', type: 'request' } },
      { step: 2, title: 'Step 2: Tasks Line Up Inside Broker Queue', description: 'Messages remain durably queued inside the broker until healthy consumers pull them.', activeNodes: ['broker'], packet: { from: 'producer', to: 'broker', label: 'Queued & Locked Safely', type: 'sync' } },
      { step: 3, title: 'Step 3: Competing Consumers Pull & ACK', description: 'Worker 1 & Worker 2 pull separate messages in parallel and send ACK upon completion.', activeNodes: ['broker', 'consumer'], packet: { from: 'broker', to: 'consumer', label: 'Deliver -> Process -> ACK', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'producer', name: 'Task Producers', role: 'Publishers', description: 'Enqueues background tasks cleanly.' },
      { id: 'broker', name: 'Broker (RabbitMQ / SQS)', role: 'Smart Router & Queue', description: 'Tracks Visibility Timeouts, ACKs, and Dead Letter Queues.' },
      { id: 'consumer', name: 'Competing Consumers', role: 'Worker Fleet', description: 'Auto-scales based on queue backlog depth.' },
    ],
    realWorldExample: {
      company: 'Instagram / Reddit Background Jobs',
      scenario: 'Processing image resizing, spam classification, and push notifications asynchronously.',
      implementation: 'Web handlers push lightweight task descriptors (`{image_id: 924}`) into RabbitMQ/Celery or SQS queues. Dedicated worker fleets pull tasks, run ML/resize operations, and send ACKs back to the broker.',
      scaleDetails: 'Processes hundreds of thousands of background tasks/second reliably.',
    },
    advantages: [
      'Smart routing (RabbitMQ Topic/Fanout exchanges) + automatic task deletion on ACK.',
      'Simple auto-scaling directly off Queue Depth.',
    ],
    disadvantages: [
      'Unlike Kafka, messages are deleted after consumption—so you cannot replay last week\'s event history.',
      'Strict global FIFO ordering limits parallel consumer scaling compared to partitioned logs.',
    ],
    relatedTopics: [
      { id: 'kafka-architecture', title: 'Apache Kafka Architecture', module: 'system-design' },
      { id: 'event-driven-architecture', title: 'Event-Driven Architecture', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the difference between Point-to-Point Queueing and Pub/Sub?', answer: 'In Point-to-Point, one message is consumed by ONLY ONE competing consumer worker (ideal for distributing background tasks like sending an invoice). In Pub/Sub, a copy of the event is broadcast to MULTIPLE different subscriber services simultaneously (e.g., Analytics + Email + Fraud all react to `OrderCreated`).', keyPoints: ['Point-to-Point = Exactly 1 worker processes task', 'Pub/Sub = Broadcast copy to N independent subscribers'] },
      { level: 'intermediate', question: 'How does SQS "Visibility Timeout" prevent duplicate work while still guarding against crashed workers?', answer: 'When Worker A pulls a message, SQS keeps it in the queue but makes it INVISIBLE to other workers for the Visibility Timeout (e.g. 30s). If Worker A finishes and calls Delete/ACK, it\'s gone permanently. If Worker A crashes mid-task, the 30s timer expires and the message becomes visible again for Worker B to retry.', keyPoints: ['Temporarily hides message during processing', 'Auto-requeues if worker crashes before ACK'] },
      { level: 'advanced', question: 'What are the 3 Message Delivery Semantics, and why is "Exactly-Once" practically impossible over a network without application idempotency?', answer: '1) At-Most-Once (fire-and-forget, may lose data), 2) At-Least-Once (retries until ACK received—no loss, but if ACK drops in network, duplicate delivery happens), 3) Effectively-Once ("Exactly-Once" achieved by combining At-Least-Once delivery + Idempotent Consumer deduplication). Over an unreliable network, true raw transport-level exactly-once is impossible (Two Generals Problem).', keyPoints: ['At-Most-Once (fast, lossy)', 'At-Least-Once (safe, duplicates possible)', 'Effective Exactly-Once = At-Least-Once + Idempotency'] },
    ],
    quiz: [
      { id: 'mq-1', question: 'In RabbitMQ/SQS, what happens to a message after a consumer finishes processing and sends an ACK?', options: ['The broker permanently deletes the message from the queue', 'It broadcasts it to all users forever', 'It marks it as a DNS error', 'It shuts down the producer'], correctAnswer: 0, explanation: 'Traditional message queues purge messages upon explicit consumer acknowledgment.' },
      { id: 'mq-2', question: 'Which delivery semantic guarantees no messages are lost, though occasional duplicates may occur during retries?', options: ['At-Least-Once Delivery', 'At-Most-Once Delivery', 'Zero-Delivery', 'Static Delivery'], correctAnswer: 0, explanation: 'At-least-once retries until ACKed, trading potential duplicates for zero data loss.' },
      { id: 'mq-3', question: 'Which RabbitMQ exchange broadcasts a copy of every message to ALL bound queues regardless of routing key?', options: ['Fanout Exchange', 'Direct Exchange', 'Hash Exchange', 'Null Exchange'], correctAnswer: 0, explanation: 'Fanout exchanges replicate messages across all bound queues (Pub/Sub).' },
      { id: 'mq-4', question: 'What happens if a consumer crashes BEFORE sending an ACK?', options: ['Once Visibility Timeout expires, the broker redelivers the message to another healthy consumer', 'The message vanishes forever', 'The entire queue explodes', 'Producers crash immediately'], correctAnswer: 0, explanation: 'Timeout redelivery guarantees crashed tasks get retried.' },
      { id: 'mq-5', question: 'How do engineers achieve "Effectively Exactly-Once" processing in production?', options: ['Combine At-Least-Once delivery with Idempotent Consumers (deduplication IDs)', 'Turn off retries', 'Use UDP without checks', 'Disable network cables'], correctAnswer: 0, explanation: 'Idempotency safely discards duplicate deliveries.' },
    ],
  },

  'kafka-architecture': {
    id: 'kafka-architecture',
    title: 'Apache Kafka Architecture & Distributed Event Streaming',
    module: 'system-design',
    category: '8. Communication & Message Queues',
    readTime: '12 min',
    difficulty: 'Advanced',
    summary: 'Apache Kafka is a distributed, fault-tolerant, append-only commit log event streaming platform capable of millions of messages/sec, replayable consumer offsets, and strict partition ordering.',
    introduction: {
      definition: 'Unlike traditional message queues that pop and delete messages, Kafka stores immutable records inside partitioned append-only log files on disk for configurable retention periods (days/weeks), tracking each Consumer Group\'s read position via numerical Offsets.',
      analogousStory: 'If RabbitMQ is a post office throwing away letters once delivered, Kafka is a permanent master ledger book separated into numbered chapters (Partitions). Multiple independent auditors (Consumer Groups) can read from any page number (Offset) at their own speed—and even rewind to page 1 to re-audit historical events!',
      keyTakeaway: 'Kafka achieves colossal throughput via sequential disk I/O + zero-copy (`sendfile`), horizontal topic partitioning, and independent replayable consumer offsets.',
    },
    whyRequired: {
      problemsSolved: [
        'Traditional queues choke at ~50k msgs/sec and lose data once read; Kafka sustains millions of msgs/sec and allows multi-day event replay.',
        'Guarantees strict message ordering within a partition (e.g., all events for `user_id=42` land in Partition 3 in exact order).',
        'Powers real-time stream processing (Flink/Spark), Change Data Capture (CDC), and log aggregation simultaneously from one stream.',
      ],
      realWorldImpact: 'Adopted by 80%+ of Fortune 100 enterprises (Uber, Netflix, LinkedIn, Airbnb) as the central nervous system for real-time streaming.',
      metricsAffected: ['Throughput (Millions/sec)', 'Consumer Offset Lag', 'Zero-Copy Disk Transfer Speed'],
    },
    coreArchitecture: {
      description: 'Topics split into Partitions replicated across Brokers -> Producers hash keys to Partitions -> Consumer Groups assign 1 Partition per Consumer.',
      components: [
        { name: 'Topics & Partitions', role: 'Parallel Append Logs', details: 'Each Topic splits into P ordered, immutable append-only log segments across Brokers.' },
        { name: 'Consumer Groups & Offsets', role: 'Parallel Replayable Readers', details: 'Each consumer tracks its own integer Offset; different Consumer Groups read independently without deleting data.' },
        { name: 'Replication & ISR', role: 'Fault Tolerance', details: 'Each partition has 1 Leader and N In-Sync Replicas (ISR) orchestrated by KRaft / ZooKeeper.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Producer Key Hashing', technicalDetail: 'Producer hashes message key (`hash(order_id) % P`) so related events stay ordered in the same Partition.' },
        { stepNumber: 2, action: 'Sequential Log Append', technicalDetail: 'Leader Broker appends sequentially to OS Page Cache and syncs to ISRs (`acks=all`).' },
        { stepNumber: 3, action: 'Consumer Offset Pull', technicalDetail: 'Consumers pull batches via `sendfile` zero-copy and commit processed Offsets independently.' },
      ],
    },
    visualizationId: 'kafka-3d',
    visualizationScene: 'message-queue',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Producer Hashes Key to Partition', description: 'Producers hash record keys (`user_id`) and batch-append events into partitioned Kafka topics.', activeNodes: ['producer', 'broker'], packet: { from: 'producer', to: 'broker', label: 'Append Partition Log + ISR Sync', type: 'request' } },
      { step: 2, title: 'Step 2: Immutable Append-Only Log Storage', description: 'Records stay persisted in Partition logs with sequential Offsets (0, 1, 2, 3...)—never deleted on read!', activeNodes: ['broker'], packet: { from: 'producer', to: 'broker', label: 'Offset 0..N Retained on Disk', type: 'sync' } },
      { step: 3, title: 'Step 3: Parallel Consumer Group Pull', description: 'Each Consumer reads an assigned partition using `zero-copy` transfer and commits its Offset.', activeNodes: ['broker', 'consumer'], packet: { from: 'broker', to: 'consumer', label: 'Pull Offset Batch (Zero-Copy)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'producer', name: 'Kafka Producers', role: 'Batch Writers', description: 'Compresses and routes keyed events deterministically to partitions.' },
      { id: 'broker', name: 'Kafka Broker Cluster (Partitions)', role: 'Distributed Commit Log', description: 'Uses sequential disk + OS page cache + ISR replication.' },
      { id: 'consumer', name: 'Consumer Group Fleet', role: 'Parallel Offset Readers', description: 'Scale up to `P` consumers per group for maximum throughput.' },
    ],
    realWorldExample: {
      company: 'Uber',
      scenario: 'Streaming real-time driver GPS pings, surge pricing updates, and trip state changes globally.',
      implementation: 'Uber runs massive multi-region Kafka clusters ingesting millions of location pings and billing events per second, feeding real-time Flink surge pricing engines, fraud detection models, and analytics data lakes concurrently.',
      scaleDetails: 'Handles trillions of events and petabytes of streaming telemetry daily.',
    },
    advantages: [
      'Colossal throughput (millions of messages/sec) with surprisingly low disk overhead via sequential I/O + zero-copy.',
      'Full event replay: re-read historical streams by resetting Consumer Group Offsets.',
      'Multiple independent Consumer Groups share the same topic seamlessly.',
    ],
    disadvantages: [
      'Overkill for simple small background task queues (where SQS/RabbitMQ are simpler).',
      'Maximum parallel consumers inside one Consumer Group cannot exceed the topic\'s Partition count.',
    ],
    relatedTopics: [
      { id: 'message-queues-brokers', title: 'Message Queues & RabbitMQ', module: 'system-design' },
      { id: 'cqrs-event-sourcing', title: 'CQRS & Event Sourcing', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why doesn\'t Kafka slow down dramatically despite writing messages to disk?', answer: 'Because disk is only slow for RANDOM seeks! Kafka writes strictly SEQUENTIALLY to append-only log files, leveraging Linux OS Page Cache (RAM) and `sendfile()` zero-copy transfers directly from disk buffer to network socket without copying bytes into JVM user space.', keyPoints: ['Sequential disk I/O matches RAM speeds', 'OS Page Cache + `sendfile` zero-copy'] },
      { level: 'intermediate', question: 'What happens if a Kafka topic has 4 Partitions and you spin up 6 Consumers inside ONE Consumer Group?', answer: 'In Kafka, a single partition can only be read by at most ONE consumer within a given Consumer Group to preserve ordering. Therefore, 4 consumers read 1 partition each, and the extra 2 consumers sit completely IDLE! To scale consumers further, you must increase partition count.', keyPoints: ['Max active consumers in a group = Partition count', 'Extra consumers sit idle as warm standbys'] },
      { level: 'advanced', question: 'Explain the Producer `acks=all` + `min.insync.replicas` guarantee in Kafka.', answer: 'With `acks=0`, producer doesn\'t wait (fastest, lossy). With `acks=1`, leader confirms immediately after writing locally (risks data loss if leader dies before followers replicate). Setting `acks=all` paired with `min.insync.replicas=2` guarantees writes succeed ONLY after at least 2 In-Sync Replicas commit the record—providing zero data loss during single-broker crashes.', keyPoints: ['acks=0 (lossy), acks=1 (leader only)', 'acks=all + min.insync.replicas=2 = strong durability'] },
    ],
    quiz: [
      { id: 'kfk-1', question: 'What happens to a Kafka message immediately after a Consumer reads and commits its Offset?', options: ['It stays stored in the partition log until the topic\'s retention time/size expires', 'It is permanently erased immediately', 'It turns into an HTTP 404', 'It reboots the broker'], correctAnswer: 0, explanation: 'Kafka retains logs by time/size policy, enabling event replay and multiple consumer groups.' },
      { id: 'kfk-2', question: 'If a topic has 3 Partitions, what is the maximum number of active parallel consumers inside a SINGLE Consumer Group?', options: ['3', '6', '30', 'Unlimited'], correctAnswer: 0, explanation: 'One partition is assigned to at most one consumer per consumer group.' },
      { id: 'kfk-3', question: 'How do you guarantee all events for `customer_id=88` are processed in exact chronological order in Kafka?', options: ['Pass `customer_id=88` as the Kafka Message Key so all its events route to the same single Partition', 'Disable partitioning globally', 'Set `acks=0`', 'Use random timestamps'], correctAnswer: 0, explanation: 'Kafka guarantees strict order within each individual partition.' },
      { id: 'kfk-4', question: 'What Linux kernel optimization lets Kafka send disk log segments over the network without copying bytes into application RAM?', options: ['Zero-Copy (`sendfile` system call)', 'Busy-Wait Polling', 'Two-Phase Commit', 'Subnet Masking'], correctAnswer: 0, explanation: '`sendfile` copies directly from kernel page cache to NIC socket buffer.' },
      { id: 'kfk-5', question: 'Which modern consensus protocol replaced Apache ZooKeeper inside newer Kafka clusters?', options: ['KRaft (Kafka Raft Metadata Mode)', 'SMTP', 'BGP', 'RIP'], correctAnswer: 0, explanation: 'KRaft runs Raft consensus natively inside Kafka brokers.' },
    ],
  },
};
