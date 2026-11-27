import { TopicContent } from '../../../types';

export const sdFundamentalsAndArchTopics: Record<string, TopicContent> = {
  'what-is-system-design': {
    id: 'what-is-system-design',
    title: 'What is System Design? (Principles, Architecture & Trade-offs)',
    module: 'system-design',
    category: '1. System Design Fundamentals',
    readTime: '7 min',
    difficulty: 'Beginner',
    summary: 'System design is the architectural engineering discipline of defining modules, data storage, network interfaces, and scaling boundaries so software satisfies functional and reliability goals.',
    introduction: {
      definition: 'System design is the structured process of defining the architecture, components, data flow, and scalability mechanisms of a software system to handle millions of users reliably.',
      analogousStory: 'Think of designing a modern skyscraper. Anyone can nail four wooden walls together for a cabin, but constructing a 100-story tower requires load-bearing steel cores, elevator traffic scheduling, fire sprinkler fail-safes, and earthquake dampening. System design is structural engineering for software.',
      keyTakeaway: 'There is no single "perfect" architecture—system design is the art of choosing the right trade-offs (latency vs consistency, cost vs redundancy) for your exact workload.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents single-server prototypes from collapsing when user traffic jumps from 100 to 10,000,000.',
        'Avoids single points of failure where one crashed hard drive takes an entire company offline.',
        'Controls infrastructure costs by scaling compute, caching, and database tiers independently.',
      ],
      realWorldImpact: 'Every high-scale engineering organization evaluates system design carefully to hit 99.99% uptime SLAs while keeping cloud bills sustainable.',
      metricsAffected: ['Throughput (Requests/sec)', 'P99 Latency', 'Availability SLA', 'Infrastructure Cost/Request'],
    },
    coreArchitecture: {
      description: 'Modern internet architectures compose load balancers, stateless compute clusters, distributed caches, message queues, and partitioned persistent databases.',
      components: [
        { name: 'Stateless Compute Tier', role: 'Horizontal Scaling', details: 'Application nodes holding zero local session state so instances can multiply or terminate on demand.' },
        { name: 'Edge & Caching Tier', role: 'Latency Reduction', details: 'CDNs and Redis clusters serving hot read traffic in sub-millisecond RAM.' },
        { name: 'Durable Storage Tier', role: 'Source of Truth', details: 'Replicated and sharded SQL/NoSQL clusters persisting critical business state.' },
        { name: 'Observability Control Plane', role: 'Telemetry', details: 'Centralized logs, distributed traces, and alert dashboards detecting regressions.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Clarify Requirements', technicalDetail: 'Define core API features (Functional) and scale targets like DAU, QPS, and latency (Non-Functional).' },
        { stepNumber: 2, action: 'Back-of-the-Envelope Estimation', technicalDetail: 'Calculate storage growth per year, read-to-write ratios, and peak network bandwidth.' },
        { stepNumber: 3, action: 'High-Level Component Layout', technicalDetail: 'Sketch DNS, CDN, Load Balancers, App Services, Caches, Queues, and Databases.' },
        { stepNumber: 4, action: 'Resolve Bottlenecks', technicalDetail: 'Eliminate SPOFs with replication, sharding, async queues, and rate limiters.' },
      ],
    },
    visualizationId: 'what-is-sd-3d',
    visualizationScene: 'scaling-architecture',
    visualizationModes: [
      { id: 'horizontal', label: 'Horizontally Scaled Fleet' },
      { id: 'vertical', label: 'Single Monolith (Scale Up)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Global Traffic Arrives', description: 'Users worldwide issue concurrent HTTP requests toward the system entry point.', activeNodes: ['scale-client'], packet: { from: 'scale-client', to: 'scale-lb', label: 'Incoming Traffic Surge', type: 'request' } },
      { step: 2, title: 'Step 2: Traffic Distributed Across Stateless Fleet', description: 'The load balancer spreads requests horizontally across stateless worker pods instead of overloading a single machine.', activeNodes: ['scale-lb', 'node-1', 'node-2', 'node-3'], packet: { from: 'scale-lb', to: 'node-1', label: 'Elastic Horizontal Routing', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'scale-client', name: 'Global User Traffic', role: 'Request Origin', description: 'Millions of daily active users accessing web and mobile endpoints.', metrics: [{ label: 'Peak Load', value: '85,000 QPS' }] },
      { id: 'scale-lb', name: 'Auto-Scale Load Balancer', role: 'Traffic Distributor', description: 'Monitors pod CPU/latency and balances traffic across healthy compute workers.', technologies: ['AWS ALB', 'Envoy', 'Kubernetes HPA'] },
      { id: 'node-1', name: 'Stateless Compute Fleet', role: 'Business Logic Pods', description: 'Auto-scaling worker containers that scale horizontally in seconds.', technologies: ['Docker', 'Kubernetes', 'Go / Node.js'] },
      { id: 'vertical-server', name: 'Vertically Scaled Monolith', role: 'Single Large Machine', description: 'Upgrading one box with more CPU/RAM hits hardware limits and creates a single point of failure.', technologies: ['Bare Metal Server'] },
    ],
    realWorldExample: {
      company: 'Discord',
      scenario: 'Scaling real-time voice and text channels from thousands to 150M+ monthly active users.',
      implementation: 'Discord combines stateless edge gateways, distributed Elixir actor rings, ScyllaDB message shards, and hot-key caching to eliminate central bottlenecks.',
      scaleDetails: 'Trillions of messages stored with sub-50ms delivery across millions of concurrent WebSocket connections.',
    },
    advantages: [
      'Prevents costly emergency rewrites during hyper-growth.',
      'Makes trade-offs explicit before writing production code.',
      'Aligns backend, frontend, and SRE teams around clear SLAs.',
    ],
    disadvantages: [
      'Over-engineering early-stage products slows down initial delivery.',
      'Distributed architectures introduce network debugging complexity.',
    ],
    relatedTopics: [
      { id: 'hld-vs-lld', title: 'HLD vs LLD', module: 'system-design' },
      { id: 'scalability-availability-reliability', title: 'Scalability, Availability & Reliability', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What are the first steps you take in a System Design interview?', answer: 'First clarify functional and non-functional requirements, estimate QPS and storage needs (back-of-the-envelope math), define API contracts and schema, then draw a high-level architecture before deep-diving into bottlenecks.', keyPoints: ['Clarify scope first', 'Estimate read/write QPS and storage', 'Draw HLD then resolve bottlenecks'] },
      { level: 'intermediate', question: 'Why should application servers generally be designed as stateless?', answer: 'Stateless servers store zero user session data in local RAM or disk, delegating state to Redis or databases. This allows load balancers to route any request to any server and enables instant horizontal auto-scaling or container replacement without dropping users.', keyPoints: ['Any node can handle any request', 'Zero data loss when pods restart', 'Effortless horizontal auto-scaling'] },
      { level: 'advanced', question: 'How do you identify when an early startup is over-engineering its system design?', answer: 'Signs include adopting multi-region active-active databases, Kafka, and 20 microservices when peak traffic is under 50 QPS. A well-structured modular monolith with a managed relational DB handles 10,000+ QPS cleanly while keeping velocity high.', keyPoints: ['Match complexity to actual QPS/team size', 'Start with modular monolith + read replicas', 'Split bottlenecks incrementally'] },
    ],
    quiz: [
      { id: 'wsd-1', question: 'What is the primary goal of System Design?', options: ['Memorizing syntax of one programming language', 'Designing software components, interfaces, and data storage to meet scale and reliability goals', 'Eliminating all databases', 'Writing CSS animations'], correctAnswer: 1, explanation: 'System design focuses on architecting components, data stores, and network paths to satisfy scalability, availability, and latency requirements.' },
      { id: 'wsd-2', question: 'Which factor belongs to Non-Functional Requirements?', options: ['User can upload a profile photo', '99.99% availability and < 100ms P95 latency', 'User can reset password', 'Admin can delete comments'], correctAnswer: 1, explanation: 'Availability, latency, throughput, and durability are non-functional system qualities.' },
      { id: 'wsd-3', question: 'Why is making app servers stateless beneficial?', options: ['It removes the need for internet', 'It enables horizontal scaling and seamless failover across instances', 'It increases SQL query latency', 'It disables TLS encryption'], correctAnswer: 1, explanation: 'Stateless nodes hold no local session state, allowing any server to serve any request.' },
      { id: 'wsd-4', question: 'What does "back-of-the-envelope estimation" estimate?', options: ['Office rent cost', 'Approximate QPS, storage growth, memory cache size, and bandwidth', 'Employee salaries', 'HTML tag counts'], correctAnswer: 1, explanation: 'Engineers estimate traffic (QPS), storage, RAM, and network throughput early to pick appropriate hardware and databases.' },
      { id: 'wsd-5', question: 'In system design, what is a Single Point of Failure (SPOF)?', options: ['A component whose failure brings down the entire system', 'A primary key in SQL', 'A cache hit in Redis', 'A redundant backup server'], correctAnswer: 0, explanation: 'An SPOF is any non-redundant part of an architecture that stops the whole service if it crashes.' },
    ],
  },

  'hld-vs-lld': {
    id: 'hld-vs-lld',
    title: 'High-Level Design (HLD) vs Low-Level Design (LLD)',
    module: 'system-design',
    category: '1. System Design Fundamentals',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'HLD maps macro-architecture across distributed services, databases, and networks, whereas LLD designs internal classes, schemas, interfaces, and SOLID code structures inside each service.',
    introduction: {
      definition: 'High-Level Design (HLD) focuses on the macro system topology—microservices, message queues, load balancers, and storage engines. Low-Level Design (LLD) focuses on micro implementation—class diagrams, OOP design patterns, API payloads, and table schemas.',
      analogousStory: 'In urban planning, HLD is the city master blueprint deciding where highways, power plants, water reservoirs, and residential zones sit. LLD is the structural architect\'s schematic detailing exact door hinges, plumbing pipe diameters, and electrical wiring inside a single apartment building.',
      keyTakeaway: 'HLD solves distributed scale and network reliability; LLD solves code maintainability, extensibility, and concurrency safety within a service.',
    },
    whyRequired: {
      problemsSolved: [
        'Bridges the gap between macro infrastructure capacity planning and clean day-to-day coding.',
        'Prevents tight coupling where changing one business rule forces rewriting an entire distributed pipeline.',
        'Establishes crisp API contracts so multiple engineering squads can build in parallel.',
      ],
      realWorldImpact: 'Tech interviews separate HLD rounds (System Design) from LLD rounds (Machine Coding / Object-Oriented Design) because senior engineers must excel at both abstraction levels.',
      metricsAffected: ['Deployment Velocity', 'Defect Density', 'Code Reusability', 'Cross-Team Autonomy'],
    },
    coreArchitecture: {
      description: 'HLD orchestrates inter-service topology across machines; LLD structures interfaces, design patterns, and database columns inside each node.',
      components: [
        { name: 'HLD Macro Gateway', role: 'Inter-Service Orchestration', details: 'Defines API Gateway routes, Load Balancers, and external ingress protocols.' },
        { name: 'LLD Domain Classes & Interfaces', role: 'SOLID Code Structure', details: 'Encapsulates Strategy, Factory, and Repository patterns inside each microservice.' },
        { name: 'Database Schema & Indexes (LLD)', role: 'Data Modeling', details: 'Defines exact columns, foreign keys, B-Tree indexes, and thread-safe locks.' },
        { name: 'Async Event Contracts (HLD)', role: 'Decoupling', details: 'Specifies Kafka topic schemas and retry DLQs connecting bounded contexts.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Define HLD System Boundaries', technicalDetail: 'Split platform into cohesive microservices (e.g., User, Order, Payment) and pick databases per service.' },
        { stepNumber: 2, action: 'Specify Inter-Service APIs', technicalDetail: 'Lock down REST/gRPC endpoints and async event payloads.' },
        { stepNumber: 3, action: 'Author LLD Class & State Diagrams', technicalDetail: 'Model core entities, interfaces, design patterns (Factory/Observer), and mutex locking inside each service.' },
        { stepNumber: 4, action: 'Implement & Unit Test', technicalDetail: 'Write modular code adhering to Single Responsibility and Dependency Inversion principles.' },
      ],
    },
    visualizationId: 'hld-lld-3d',
    visualizationScene: 'microservices',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: HLD Macro Ingress (API Gateway)', description: 'High-Level Design defines how external traffic enters the API Gateway and maps to domain microservices.', activeNodes: ['api-gateway', 'order-service'], packet: { from: 'api-gateway', to: 'order-service', label: 'HLD Service Route', type: 'request' } },
      { step: 2, title: 'Step 2: Event Bus Decoupling (HLD)', description: 'Services publish domain events asynchronously over the Event Bus instead of brittle synchronous chains.', activeNodes: ['order-service', 'event-bus'], packet: { from: 'order-service', to: 'event-bus', label: 'OrderCreatedEvent', type: 'sync' } },
      { step: 3, title: 'Step 3: LLD Internal Service Execution', description: 'Inside Payment Service, LLD patterns (Strategy for Stripe/PayPal, Idempotency key lock) safely execute the charge.', activeNodes: ['payment-service'], packet: { from: 'event-bus', to: 'payment-service', label: 'LLD Strategy Pattern', type: 'request' } },
      { step: 4, title: 'Step 4: Notification Dispatch', description: 'Notification worker consumes the event and dispatches confirmation receipts.', activeNodes: ['notification-service'], packet: { from: 'event-bus', to: 'notification-service', label: 'Send Email Receipt', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'api-gateway', name: 'HLD Ingress Gateway', role: 'Macro Boundary', description: 'Routes external requests across bounded-context microservices.' },
      { id: 'order-service', name: 'Order Service (HLD + LLD)', role: 'Domain Bounded Context', description: 'HLD defines its DB & Kafka output; LLD defines OrderStateMachine & Repository classes.' },
      { id: 'payment-service', name: 'Payment Service (LLD Focus)', role: 'Strategy & Retry Logic', description: 'Uses Strategy Pattern to swap payment gateways cleanly.' },
      { id: 'event-bus', name: 'Distributed Event Bus', role: 'HLD Spine', description: 'Connects decoupled services asynchronously.' },
      { id: 'notification-service', name: 'Notification Worker', role: 'Async Consumer', description: 'Delivers emails/SMS cleanly without blocking checkout.' },
      { id: 'user-service', name: 'User Identity Service', role: 'Auth Bounded Context', description: 'Manages user profiles and credentials.' },
    ],
    realWorldExample: {
      company: 'Uber',
      scenario: 'Designing a global Ride-Dispatch system across macro regions (HLD) and pricing/matching algorithms (LLD).',
      implementation: 'At HLD level, Uber splits Rider, Driver Location, Trip, and Pricing into geo-sharded services communicating via gRPC and Kafka. At LLD level, each service implements clean interfaces like `PricingStrategy` (Surge vs Flat) and thread-safe state machines (`REQUESTED -> ACCEPTED -> IN_PROGRESS -> COMPLETED`).',
      scaleDetails: 'Supports millions of concurrent rides globally while allowing squads to update pricing rules safely.',
    },
    advantages: [
      'HLD catches scaling bottlenecks and cost blowups before coding begins.',
      'LLD guarantees clean, testable, SOLID codebases easy to refactor.',
    ],
    disadvantages: [
      'Skipping HLD produces a "big ball of mud" that fails under network load.',
      'Skipping LLD produces unmaintainable spaghetti code inside microservices.',
    ],
    relatedTopics: [
      { id: 'what-is-system-design', title: 'What is System Design?', module: 'system-design' },
      { id: 'monolith-vs-microservices', title: 'Monolithic vs Microservices', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the core difference between HLD and LLD?', answer: 'HLD describes the macro architecture (services, databases, caches, load balancers, network protocols). LLD describes the micro software design inside each service (classes, OOP interfaces, SOLID principles, design patterns, and exact database table schemas).', keyPoints: ['HLD = Macro distributed topology', 'LLD = Micro code/class/schema design'] },
      { level: 'intermediate', question: 'Where do Database Sharding and Design Patterns (Factory/Strategy) belong—HLD or LLD?', answer: 'Database Sharding and Replication strategies are HLD decisions because they govern cross-machine topology and network partitioning. OOP Design Patterns like Factory, Strategy, and Observer are LLD decisions governing code organization inside a service.', keyPoints: ['Sharding/Caching/LB = HLD', 'OOP Patterns/Class Hierarchy/Mutexes = LLD'] },
      { level: 'advanced', question: 'How does poor LLD negatively impact an otherwise well-designed HLD?', answer: 'Even with great HLD (Kafka + Redis + Kubernetes), poor LLD inside a service—such as lack of connection pooling, unindexed SQL queries, missing thread safety on shared state, or tight coupling to external SDKs—causes memory leaks, thread deadlocks, and cascading latency spikes across the HLD.', keyPoints: ['Thread deadlocks & unclosed connections inside pods', 'Missing indexes break DB performance', 'Tight coupling blocks swapping providers'] },
    ],
    quiz: [
      { id: 'hld-1', question: 'Which artifact is part of High-Level Design (HLD)?', options: ['Exact Java/TypeScript class private attributes', 'Microservice topology, CDN placement, and database selection', 'For-loop variable naming', 'Unit test mock syntax'], correctAnswer: 1, explanation: 'HLD specifies system-wide components such as services, caches, load balancers, and data stores.' },
      { id: 'hld-2', question: 'Which artifact belongs to Low-Level Design (LLD)?', options: ['Class diagrams, OOP interfaces, and table column schemas', 'Choosing AWS region availability zones', 'Global Anycast BGP routing', 'Company hiring plan'], correctAnswer: 0, explanation: 'LLD covers class hierarchy, interfaces, design patterns, and exact DB column schemas.' },
      { id: 'hld-3', question: 'Which OOP pattern in LLD allows swapping payment providers (Stripe vs Razorpay) cleanly?', options: ['Sharding Pattern', 'Strategy Pattern', 'DNS Round Robin', 'Two-Phase Commit'], correctAnswer: 1, explanation: 'The Strategy Pattern encapsulates interchangeable algorithms behind a shared interface.' },
      { id: 'hld-4', question: 'Who primarily consumes an HLD specification?', options: ['System architects, DevOps/SRE, and cross-team tech leads', 'End-user mobile browsers', 'CPU microcode firmware', 'Graphics card shaders'], correctAnswer: 0, explanation: 'HLD aligns architects, platform engineers, and service teams on system boundaries.' },
      { id: 'hld-5', question: 'What happens if you ignore LLD and focus only on HLD?', options: ['Each microservice becomes brittle, untestable spaghetti code prone to concurrency bugs', 'Services run 10x faster automatically', 'Databases stop needing schemas', 'Network latency drops to zero'], correctAnswer: 0, explanation: 'Weak LLD leads to unmaintainable internal service code, memory leaks, and race conditions.' },
    ],
  },

  'functional-vs-nonfunctional': {
    id: 'functional-vs-nonfunctional',
    title: 'Functional vs Non-Functional Requirements',
    module: 'system-design',
    category: '1. System Design Fundamentals',
    readTime: '7 min',
    difficulty: 'Beginner',
    summary: 'Functional requirements specify WHAT a system must do for users, while Non-Functional requirements specify HOW reliably, fast, securely, and scalably it must perform.',
    introduction: {
      definition: 'Functional requirements capture user-facing features and business logic (e.g., "Users can shorten a URL" or "Send a chat message"). Non-functional requirements (NFRs) capture operational qualities such as latency, availability, consistency, durability, and security.',
      analogousStory: 'For an electric car: Functional requirements are "steering wheel turns wheels, brakes stop car, Bluetooth plays music." Non-functional requirements are "0-60 mph in 3.5 seconds, 350-mile battery range, 5-star crash safety rating, operates from -20°C to +50°C."',
      keyTakeaway: 'Functional requirements dictate your API endpoints and database schema; Non-Functional requirements dictate your caching, replication, rate limiting, and distributed systems architecture.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents building features that work for 1 test user but crash at 10,000 concurrent requests.',
        'Clarifies consistency vs availability priorities early (e.g., banking vs social media likes).',
        'Establishes measurable SLAs/SLOs (e.g., 99.95% uptime, <200ms P99 latency).',
      ],
      realWorldImpact: 'Misunderstanding a single NFR—such as strong consistency vs eventual consistency—can force a complete database engine migration later.',
      metricsAffected: ['P95/P99 Latency Targets', 'Availability SLA (Nines)', 'Data Durability (11 Nines)', 'Throughput Ceiling'],
    },
    coreArchitecture: {
      description: 'An API Gateway and policy plane often enforce critical Non-Functional Requirements (rate limiting, auth, SLA monitoring) right in front of Functional microservices.',
      components: [
        { name: 'API Gateway Policy Layer (NFRs)', role: 'SLA & Security Guard', details: 'Enforces rate limits, TLS encryption, authentication, and latency timeouts.' },
        { name: 'Domain Microservices (FRs)', role: 'Business Features', details: 'Executes core functional endpoints like /orders, /users, and /payments.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'List Core User Stories (FRs)', technicalDetail: 'Identify the top 3-5 primary workflows the system must support.' },
        { stepNumber: 2, action: 'Quantify Scale & SLAs (NFRs)', technicalDetail: 'Set numbers: e.g., 50M DAU, 100:1 read/write ratio, <50ms redirect latency, 99.99% uptime.' },
        { stepNumber: 3, action: 'Map NFRs to Tech Choices', technicalDetail: 'Low latency -> Redis + CDN; High durability -> Multi-AZ Replication; Abuse prevention -> Rate Limiter.' },
      ],
    },
    visualizationId: 'fr-nfr-3d',
    visualizationScene: 'api-gateway',
    visualizationModes: [
      { id: 'authorized', label: 'Functional Flow (200 OK)' },
      { id: 'rate-limited', label: 'NFR Enforcement (429 Rate Limit)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Client Invokes Functional Endpoint', description: 'Client requests POST /api/v1/orders to fulfill a functional user action.', activeNodes: ['api-client', 'api-gateway'], packet: { from: 'api-client', to: 'api-gateway', label: 'Functional: POST /orders', type: 'request' } },
      { step: 2, title: 'Step 2: Gateway Enforces Non-Functional Policies', description: 'Before business logic runs, the Gateway validates JWT Auth (Security NFR) and Token Bucket Rate Limits (Reliability NFR).', activeNodes: ['api-gateway', 'auth-service'], packet: { from: 'api-gateway', to: 'auth-service', label: 'NFR Check: Auth & Rate Limit', type: 'sync' } },
      { step: 3, title: 'Step 3: Functional Service Executes Logic', description: 'Once NFR guardrails pass, Order Service processes the order within its <100ms latency budget.', activeNodes: ['svc-orders'], packet: { from: 'api-gateway', to: 'svc-orders', label: 'Execute Order Logic', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'api-client', name: 'Client Application', role: 'Functional Actor', description: 'Triggers user-facing product workflows.' },
      { id: 'api-gateway', name: 'API Gateway', role: 'NFR Enforcer', description: 'Enforces rate limits, TLS security, timeouts, and observability logging.' },
      { id: 'auth-service', name: 'Auth & Token Bucket Guard', role: 'Security & Availability NFR', description: 'Protects downstream services from abusive bursts and unauthorized callers.' },
      { id: 'svc-orders', name: 'Order Service', role: 'Functional Core', description: 'Implements functional checkout rules.' },
      { id: 'svc-users', name: 'User Service', role: 'Functional Profile', description: 'Handles user profiles.' },
      { id: 'svc-payments', name: 'Payment Service', role: 'Strong Consistency NFR', description: 'Enforces ACID financial integrity.' },
    ],
    realWorldExample: {
      company: 'Stripe',
      scenario: 'Ensuring 99.999% API availability and strict financial idempotency while processing payment charges.',
      implementation: 'Stripe\'s functional API creates charges and refunds, while its non-functional architecture enforces strict idempotency keys, rate limiting, TLS 1.3 security, and multi-region database durability.',
      scaleDetails: 'Maintains >99.999% uptime during Black Friday/Cyber Monday spikes.',
    },
    advantages: [
      'Clarifies ambiguous product requirements into concrete engineering targets.',
      'Prevents blind spots around security, burst traffic, and disaster recovery.',
    ],
    disadvantages: [
      'Unrealistic NFRs (e.g., asking for 100% availability + zero latency + strict consistency globally) create impossible constraints.',
    ],
    relatedTopics: [
      { id: 'scalability-availability-reliability', title: 'Scalability, Availability & Reliability', module: 'system-design' },
      { id: 'cap-theorem', title: 'CAP Theorem', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Give 3 examples each of Functional and Non-Functional requirements for YouTube.', answer: 'Functional: Upload video, stream video, post/like comments. Non-Functional: Smooth 4K playback with minimal buffering (<200ms start), 99.99% global availability, zero loss of uploaded creator videos (high durability).', keyPoints: ['FR = Features (upload, watch, comment)', 'NFR = Qualities (buffering latency, availability, durability)'] },
      { level: 'intermediate', question: 'How do Non-Functional requirements drive database choices?', answer: 'If an NFR demands strict ACID transactional correctness (online banking), you pick a relational SQL database (PostgreSQL). If an NFR demands massive write throughput and horizontal scale with relaxed consistency (IoT telemetry), you choose a wide-column NoSQL store like Cassandra.', keyPoints: ['ACID / financial NFR -> SQL', 'Massive write scale / flexible schema -> NoSQL'] },
      { level: 'advanced', question: 'Distinguish SLA, SLO, and SLI in Non-Functional specifications.', answer: 'SLI (Service Level Indicator) is the actual measured metric (e.g., 99.97% successful requests). SLO (Service Level Objective) is the internal engineering target (e.g., 99.95% uptime). SLA (Service Level Agreement) is the legal contract with external customers specifying financial penalties if uptime drops below 99.9%.', keyPoints: ['SLI = Actual measurement', 'SLO = Internal goal (stricter than SLA)', 'SLA = Legal customer contract'] },
    ],
    quiz: [
      { id: 'fnf-1', question: 'Which of the following is a Functional Requirement?', options: ['System must support 10,000 requests/second', 'Users must be able to reset their password via email', 'System uptime must be 99.99%', 'Database backups must run nightly'], correctAnswer: 1, explanation: 'Password reset is a specific user-facing feature (what the system does).' },
      { id: 'fnf-2', question: 'Which NFR governs how fast a single request completes?', options: ['Durability', 'Latency', 'Maintainability', 'Schema Normalization'], correctAnswer: 1, explanation: 'Latency measures the time delay from request initiation to response arrival.' },
      { id: 'fnf-3', question: 'In SRE terminology, what is an SLO?', options: ['Service Level Objective (internal reliability target)', 'Simple Load Optimizer', 'Static Link Output', 'SQL Lookup Order'], correctAnswer: 0, explanation: 'An SLO is the internal reliability target engineering teams strive to maintain.' },
      { id: 'fnf-4', question: 'Which NFR is prioritized when designing an online banking ledger?', options: ['Eventual consistency with possible lost updates', 'Strong ACID consistency and durability', 'Zero authentication', 'Unencrypted HTTP'], correctAnswer: 1, explanation: 'Financial systems require strict ACID consistency so account balances never diverge.' },
      { id: 'fnf-5', question: 'Why should non-functional requirements be defined BEFORE selecting architecture?', options: ['Because requirements like read/write ratios and consistency dictate caching, sharding, and DB choices', 'Because code compilers reject files without NFR comments', 'To avoid writing unit tests', 'To disable load balancers'], correctAnswer: 0, explanation: 'NFRs directly determine whether you need CDNs, Redis, sharding, or multi-region replication.' },
    ],
  },

  'scalability-availability-reliability': {
    id: 'scalability-availability-reliability',
    title: 'Scalability, Availability, Reliability & Maintainability',
    module: 'system-design',
    category: '1. System Design Fundamentals',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Scalability measures how well a system handles growth; Availability measures uptime percentage ("nines"); Reliability measures correctness over time without silent errors.',
    introduction: {
      definition: 'Scalability is a system\'s ability to handle increased load gracefully by adding resources. Availability is the proportion of time a system is operational and responsive. Reliability is the probability that a system performs its intended function accurately without failures or data corruption.',
      analogousStory: 'Imagine an ambulance service: Scalability is adding more ambulances and paramedics seamlessly during a marathon so response time stays under 5 minutes. Availability means someone always picks up 911 immediately (99.999%). Reliability means the ambulance arrives at the right address with working medical gear instead of getting lost or breaking down.',
      keyTakeaway: 'A system can be Available (returns 200 OK) yet Unreliable (returns wrong corrupted account data). True production excellence demands both.',
    },
    whyRequired: {
      problemsSolved: [
        'Quantifies downtime tolerances: 99.9% ("three nines") allows 8.76 hours of downtime per year, whereas 99.999% ("five nines") allows just 5.26 minutes per year!',
        'Identifies vertical vs horizontal bottlenecks before traffic surges.',
        'Builds redundancy (active-passive or active-active) to survive whole data center outages.',
      ],
      realWorldImpact: 'Every minute of downtime at major e-commerce or cloud providers can cost $100,000+ in lost revenue and broken SLAs.',
      metricsAffected: ['Availability ("Nines")', 'MTBF (Mean Time Between Failures)', 'MTTR (Mean Time To Recovery)', 'Linear Scale Efficiency'],
    },
    coreArchitecture: {
      description: 'High availability and reliability rely on redundant database replication across Availability Zones, automated failover monitors, and scalable compute tiers.',
      components: [
        { name: 'Primary Database Leader', role: 'Authoritative Write Node', details: 'Receives mutations and replicates WAL logs to standby nodes.' },
        { name: 'Multi-AZ Synchronous Replica', role: 'High Availability Failover', details: 'Standby replica in a separate physical data center ready for instant promotion if primary dies.' },
        { name: 'Async Read Replicas', role: 'Read Scalability', details: 'Absorb 90% of read queries horizontally without slowing down the primary writer.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Replicate Across Failure Domains', technicalDetail: 'Deploy servers and databases across 3 separate Availability Zones so a power outage in Zone A leaves Zones B & C healthy.' },
        { stepNumber: 2, action: 'Health Check & Automated Failover', technicalDetail: 'Consensus monitors detect dead primary nodes within seconds and promote a healthy replica.' },
        { stepNumber: 3, action: 'Auto-Scale Load Tiers', technicalDetail: 'Scale compute pods horizontally based on CPU/RPS metrics while offloading read DBs.' },
      ],
    },
    visualizationId: 'sar-3d',
    visualizationScene: 'database-replication',
    visualizationModes: [
      { id: 'sync-replication', label: 'Synchronous HA (Zero Data Loss)' },
      { id: 'async-replication', label: 'Async Read Scaling' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Write Mutation Hits Primary', description: 'Application writes critical state update to the Primary Database leader.', activeNodes: ['write-client', 'primary-db'], packet: { from: 'write-client', to: 'primary-db', label: 'Write Transaction', type: 'request' } },
      { step: 2, title: 'Step 2: Redundant Replication Across Zones', description: 'Primary replicates changes across redundant replicas in separate Availability Zones to guarantee high availability.', activeNodes: ['primary-db', 'replica-1', 'replica-2'], packet: { from: 'primary-db', to: 'replica-1', label: 'Sync Replicate to AZ-2', type: 'sync' } },
      { step: 3, title: 'Step 3: Scalable Read Distribution', description: 'Read clients scale horizontally across Read Replicas while maintaining reliable system uptime.', activeNodes: ['read-client', 'replica-3'], packet: { from: 'read-client', to: 'replica-3', label: 'Scalable Read Query', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'write-client', name: 'Write Workload', role: 'State Mutator', description: 'Submits critical write transactions requiring durable persistence.' },
      { id: 'read-client', name: 'Read Workload', role: 'Query Traffic', description: 'Read-heavy requests scaled across replica pools.' },
      { id: 'primary-db', name: 'Primary DB (AZ-1)', role: 'Leader Node', description: 'Processes writes and coordinates replication streams.' },
      { id: 'replica-1', name: 'HA Standby (AZ-2)', role: 'Failover Replica', description: 'Promoted automatically if AZ-1 goes down.' },
      { id: 'replica-2', name: 'Read Replica 2', role: 'Horizontal Read Scale', description: 'Offloads heavy analytical queries.' },
      { id: 'replica-3', name: 'Read Replica 3', role: 'Edge Read Scale', description: 'Serves low-latency regional reads.' },
    ],
    realWorldExample: {
      company: 'Amazon Aurora / AWS RDS Multi-AZ',
      scenario: 'Achieving 99.99%+ database availability without manual DBA intervention during hardware failures.',
      implementation: 'Aurora replicates 6 copies of data across 3 separate Availability Zones automatically. If the primary writer crashes, failover completes typically under 30 seconds while preserving durability.',
      scaleDetails: 'Supports up to 15 low-latency read replicas with sub-10ms replication lag.',
    },
    advantages: [
      'Survives hardware, rack, or entire Availability Zone outages seamlessly.',
      'Separates read scaling from write bottlenecks.',
    ],
    disadvantages: [
      'Synchronous replication increases write latency due to network round trips.',
      'Redundant multi-AZ infrastructure multiplies baseline hosting costs.',
    ],
    relatedTopics: [
      { id: 'fault-tolerance', title: 'Fault Tolerance & Redundancy', module: 'system-design' },
      { id: 'database-replication', title: 'Database Replication', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Explain the difference between Availability and Reliability.', answer: 'Availability is the percentage of time a system is operational and accepting requests (uptime). Reliability means the system consistently performs correctly without crashing, losing data, or producing corrupted answers. If a server stays online 100% of the time but returns random garbage data, it is highly available yet unreliable.', keyPoints: ['Availability = Uptime %', 'Reliability = Correctness & failure-free operation', 'Reliability implies availability, but availability alone does not guarantee correctness'] },
      { level: 'intermediate', question: 'Approximately how much downtime per year does "Four Nines" (99.99%) availability allow?', answer: '99.99% availability allows only 0.01% downtime: 365 days * 24 hrs * 60 mins * 0.0001 ≈ 52.56 minutes of downtime per year. By contrast, 99.9% allows 8.76 hours/year, and 99.999% allows only ~5.26 minutes/year.', keyPoints: ['99.9% = 8.76 hrs/year', '99.99% = 52.6 mins/year', '99.999% = 5.26 mins/year'] },
      { level: 'advanced', question: 'If two components in series each have 99.9% availability, what is the combined availability of the system?', answer: 'When components are in series (both must work), availabilities multiply: 0.999 × 0.999 = 0.998001 (99.8%). Adding many serial dependencies rapidly degrades total availability. Conversely, putting two 99.9% components in parallel (redundant failover) yields 1 - (0.001 × 0.001) = 99.9999% ("six nines").', keyPoints: ['Series dependencies multiply (availability drops)', 'Parallel redundancy multiplies failure rates (availability rises dramatically)'] },
    ],
    quiz: [
      { id: 'sar-1', question: 'How much annual downtime corresponds to 99.9% ("Three Nines") availability?', options: ['~5 minutes', '~52 minutes', '~8.76 hours', '~3.65 days'], correctAnswer: 2, explanation: '0.1% of 8,760 hours in a year equals 8.76 hours.' },
      { id: 'sar-2', question: 'What does MTTR stand for in reliability engineering?', options: ['Mean Time To Recovery', 'Maximum Traffic Transmission Rate', 'Multi-Tier Table Replication', 'Memory Thread Target Ratio'], correctAnswer: 0, explanation: 'MTTR measures the average time needed to restore a failed component back to healthy operation.' },
      { id: 'sar-3', question: 'What happens to overall availability when you chain 5 microservices synchronously in series?', options: ['Availability increases', 'Availability decreases because failure of any single service fails the request', 'Availability stays 100%', 'Latency drops to zero'], correctAnswer: 1, explanation: 'Serial dependencies multiply individual availabilities, reducing total system uptime.' },
      { id: 'sar-4', question: 'Which metric tracks the average operational uptime between crashes?', options: ['MTBF (Mean Time Between Failures)', 'TTL', 'CIDR', 'QPS'], correctAnswer: 0, explanation: 'MTBF measures average elapsed time between inherent system failures.' },
      { id: 'sar-5', question: 'How do you make a critical component achieve higher availability than its individual hardware limit?', options: ['Deploy redundant instances in parallel behind health checks/failover', 'Remove all monitoring', 'Use smaller passwords', 'Disable caching'], correctAnswer: 0, explanation: 'Parallel redundancy ensures one node crash does not interrupt service.' },
    ],
  },

  'fault-tolerance': {
    id: 'fault-tolerance',
    title: 'Fault Tolerance, Graceful Degradation & Redundancy',
    module: 'system-design',
    category: '1. System Design Fundamentals',
    readTime: '8 min',
    difficulty: 'Intermediate',
    summary: 'Fault tolerance ensures a system continues functioning smoothly—potentially with graceful degradation—even when individual servers, disks, or networks fail.',
    introduction: {
      definition: 'Fault tolerance is the property enabling a distributed system to continue operating uninterrupted despite hardware crashes, network packet drops, or third-party API outages.',
      analogousStory: 'A commercial twin-engine jetliner is fault-tolerant: if one engine fails mid-flight over the ocean, the plane automatically transfers load to the remaining engine and flies safely to a landing instead of falling out of the sky.',
      keyTakeaway: 'In distributed systems at scale, hardware failures are guaranteed daily events—fault tolerance shifts failure from an outage into a routine background event.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents cascading failures where one slow dependency exhausts caller thread pools across all services.',
        'Avoids catastrophic total outages when a single zone or rack loses power.',
        'Maintains core checkout/playback functionality even if secondary features (like recommendations) fail.',
      ],
      realWorldImpact: 'Netflix intentionally runs "Chaos Monkey" in production—randomly terminating live servers during business hours—to verify fault tolerance never breaks.',
      metricsAffected: ['Blast Radius Containment', 'Cascading Error Rate', 'Mean Time To Recovery (MTTR)'],
    },
    coreArchitecture: {
      description: 'Fault tolerance combines Retry with Exponential Backoff, Circuit Breakers, Bulkhead resource pools, and Fallback caches.',
      components: [
        { name: 'Circuit Breaker Gate', role: 'Cascading Failure Prevention', details: 'Trips OPEN when downstream error thresholds breach, failing fast instead of blocking threads.' },
        { name: 'Bulkhead Thread Pools', role: 'Failure Isolation', details: 'Separates connection pools per dependency so a stalled recommendation API cannot starve payment threads.' },
        { name: 'Graceful Fallback Cache', role: 'Degraded Mode', details: 'Returns default/cached trending items when live personalization services time out.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Detect Anomaly', technicalDetail: 'Monitor downstream timeout rates and HTTP 5xx errors in rolling time windows.' },
        { stepNumber: 2, action: 'Trip Circuit Breaker Open', technicalDetail: 'Stop sending requests to the failing dependency for a cooldown window and return fallback values immediately.' },
        { stepNumber: 3, action: 'Half-Open Probe Recovery', technicalDetail: 'Send limited probe calls after cooldown; if healthy, close the circuit and resume full flow.' },
      ],
    },
    visualizationId: 'fault-tolerance-3d',
    visualizationScene: 'circuit-breaker',
    visualizationModes: [
      { id: 'closed', label: 'Healthy (CLOSED)' },
      { id: 'open', label: 'Failing (OPEN - Fail Fast)' },
      { id: 'half-open', label: 'Recovery (HALF-OPEN Probe)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Normal Operation (Closed State)', description: 'Caller traffic flows smoothly through the closed circuit switch to the healthy downstream service.', activeNodes: ['cb-client', 'circuit-breaker', 'target-service'], packet: { from: 'cb-client', to: 'target-service', label: '200 OK Healthy Flow', type: 'request' } },
      { step: 2, title: 'Step 2: Service Degrades -> Breaker Trips Open', description: 'When error rates cross 50%, the breaker arm flips OPEN. Requests fail fast with a fallback response, shielding system threads.', activeNodes: ['cb-client', 'circuit-breaker'], packet: { from: 'circuit-breaker', to: 'cb-client', label: 'Fast Fallback (No Timeout)', type: 'blocked' } },
      { step: 3, title: 'Step 3: Half-Open Probe Tests Recovery', description: 'After cooldown, a single probe packet tests whether the downstream service recovered before restoring full traffic.', activeNodes: ['circuit-breaker', 'target-service'], packet: { from: 'circuit-breaker', to: 'target-service', label: 'Half-Open Recovery Probe', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'cb-client', name: 'Caller Microservice', role: 'Protected Upstream', description: 'Receives instant fallback values instead of hanging for 30s timeouts.' },
      { id: 'circuit-breaker', name: 'Circuit Breaker Switch', role: 'Fault Isolator', description: 'Switches dynamically between CLOSED, OPEN, and HALF-OPEN states.' },
      { id: 'target-service', name: 'Downstream Dependency', role: 'Target Service', description: 'Protected from retry storms while recovering from overload.' },
    ],
    realWorldExample: {
      company: 'Netflix (Hystrix / Chaos Engineering)',
      scenario: 'Preventing personalized recommendation failures from crashing movie playback.',
      implementation: 'If the personalized recommendations engine spikes in latency, Netflix\'s fault-tolerance layer isolates the thread pool, trips the circuit breaker, and gracefully degrades to showing a pre-cached list of globally trending titles so video playback continues seamlessly.',
      scaleDetails: 'Eliminated cascading multi-hour platform blackouts across 200M+ subscriber streams.',
    },
    advantages: [
      'Prevents localized errors from cascading into global site outages.',
      'Gives overloaded dependencies breathing room to recover.',
    ],
    disadvantages: [
      'Requires disciplined testing (e.g., Chaos Engineering) to verify fallbacks actually work.',
      'Adds state tracking complexity on client callers.',
    ],
    relatedTopics: [
      { id: 'circuit-breaker-pattern', title: 'Circuit Breaker Pattern', module: 'system-design' },
      { id: 'idempotency-distributed-systems', title: 'Idempotency in Distributed Systems', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is Graceful Degradation?', answer: 'Graceful degradation means designing a system so that when a non-critical component fails, the platform sheds non-essential features (like personalized recommendations or live view counts) and serves cached defaults while keeping core workflows (checkout, playback) running.', keyPoints: ['Keep core features alive', 'Serve cached/default data for failed secondary widgets'] },
      { level: 'intermediate', question: 'What is a "Retry Storm", and how do Exponential Backoff + Jitter stop it?', answer: 'If thousands of clients immediately retry failed requests simultaneously, they amplify load on a recovering server and crush it repeatedly (Retry Storm). Exponential Backoff doubles the wait delay after each failure (1s, 2s, 4s), and Jitter adds random noise so retries spread out smoothly over time instead of hitting in synchronized spikes.', keyPoints: ['Immediate retries crush recovering servers', 'Exponential backoff spaces retries out', 'Jitter desynchronizes concurrent clients'] },
      { level: 'advanced', question: 'Explain the Bulkhead Pattern by analogy to shipbuilding.', answer: 'Ships divide hulls into watertight compartments (bulkheads) so a hull breach floods only one compartment instead of sinking the ship. In software, we assign isolated thread pools and connection limits per downstream dependency (e.g., 20 threads for Inventory, 20 for Recommendations). If Inventory stalls, only its 20 threads block, leaving Checkout and Auth completely responsive.', keyPoints: ['Isolate thread pools/semaphores per dependency', 'Contains blast radius of slow downstream APIs'] },
    ],
    quiz: [
      { id: 'ft-1', question: 'Why is "Jitter" added to exponential backoff retries?', options: ['To spread client retries randomly over time and prevent synchronized thundering herd spikes', 'To make requests run with no delay', 'To encrypt HTTP cookies', 'To compress JSON'], correctAnswer: 0, explanation: 'Without jitter, clients that failed together will retry at the exact same millisecond.' },
      { id: 'ft-2', question: 'What does the Bulkhead pattern isolate?', options: ['Resource pools (threads, connections, memory) per service dependency', 'DNS records', 'CSS stylesheets', 'Public IPv6 headers'], correctAnswer: 0, explanation: 'Bulkheads isolate pools so one slow dependency cannot exhaust all threads in an application.' },
      { id: 'ft-3', question: 'What is Chaos Engineering?', options: ['Proactively injecting controlled failures in production/staging to verify fault tolerance', 'Deleting backups intentionally without recovery plans', 'Turning off firewalls', 'Deploying untested code'], correctAnswer: 0, explanation: 'Chaos engineering tests system resilience by simulating server crashes, latency, and zone outages.' },
      { id: 'ft-4', question: 'What happens during graceful degradation when a recommendation microservice crashes?', options: ['The entire homepage returns HTTP 500', 'The site displays cached popular items and keeps checkout functional', 'All user accounts are deleted', 'The database shuts down'], correctAnswer: 1, explanation: 'Graceful degradation falls back to safe cached data while keeping essential workflows intact.' },
      { id: 'ft-5', question: 'Which technique prevents cascading thread exhaustion when a downstream service hangs?', options: ['Strict timeouts + Circuit Breaker', 'Infinite retry loops', 'Disabling TCP', 'Storing passwords in plain text'], correctAnswer: 0, explanation: 'Timeouts bound waiting time, and Circuit Breakers cut off calls to failing services immediately.' },
    ],
  },

  'client-server-architecture': {
    id: 'client-server-architecture',
    title: 'Client-Server Architecture & Request-Response Communication',
    module: 'system-design',
    category: '2. Client-Server Architecture',
    readTime: '7 min',
    difficulty: 'Beginner',
    summary: 'Client-server architecture divides computing into service consumers (clients) that initiate requests and centralized service providers (servers) that process logic and return responses.',
    introduction: {
      definition: 'Client-server architecture is a distributed computing model in which client software (web browsers, mobile apps, IoT devices) sends structured requests over a network to dedicated servers that manage resources, security, and business logic.',
      analogousStory: 'Just like dining at a restaurant: you (the Client) sit at a table and request a meal from the menu. You do not walk into the kitchen to light the stove yourself. The kitchen (the Server) prepares the food safely with shared ingredients and returns your plated dish.',
      keyTakeaway: 'Centralizing data, authentication, and business logic on servers ensures consistency, security, and multi-device synchronization.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents shipping sensitive database credentials or proprietary business logic onto untrusted user devices.',
        'Allows millions of heterogeneous devices (iOS, Android, Chrome, macOS) to interact with one unified data source.',
        'Enables instant software updates on the server without forcing users to reinstall binaries for every logic tweak.',
      ],
      realWorldImpact: 'Virtually the entire modern internet—from banking apps to streaming platforms—is built atop the Client-Server paradigm.',
      metricsAffected: ['Request/Response Round-Trip Time (RTT)', 'Server Concurrency Capacity', 'Payload Bandwidth Efficiency'],
    },
    coreArchitecture: {
      description: 'Clients initiate network sockets over DNS + TCP/TLS toward server listeners on well-known ports (80/443), exchanging structured HTTP payloads.',
      components: [
        { name: 'Client Application', role: 'UI & Request Initiator', details: 'Renders visual interfaces, validates user input locally, and dispatches HTTP/WebSocket calls.' },
        { name: 'Transport & TLS Channel', role: 'Secure Conduit', details: 'Establishes encrypted TCP/QUIC channels protecting credentials and user payloads in flight.' },
        { name: 'Application Server', role: 'Authoritative Logic & Storage', details: 'Authenticates requests, enforces authorization rules, executes queries, and returns JSON/HTML.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Resolve & Connect', technicalDetail: 'Client resolves server domain via DNS and establishes a TCP + TLS 1.3 connection.' },
        { stepNumber: 2, action: 'Transmit Request', technicalDetail: 'Client sends HTTP verb (GET/POST), headers, auth tokens, and JSON body.' },
        { stepNumber: 3, action: 'Server Execution', technicalDetail: 'Server validates permissions, reads/writes persistent data, and computes response.' },
        { stepNumber: 4, action: 'Return Response', technicalDetail: 'Server sends HTTP status code (200 OK / 404 / 500) and response payload; client updates UI.' },
      ],
    },
    visualizationId: 'client-server-3d',
    visualizationScene: 'http-https',
    visualizationModes: [
      { id: 'https-tls', label: 'Client-Server HTTPS/TLS' },
      { id: 'http2-multiplex', label: 'Multiplexed Streams (HTTP/2)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Client Initiates Connection', description: 'Web browser opens an encrypted TLS channel toward the remote server.', activeNodes: ['browser', 'tls-layer'], packet: { from: 'browser', to: 'tls-layer', label: 'ClientHello & HTTP Request', type: 'request' } },
      { step: 2, title: 'Step 2: Server Verifies & Processes', description: 'Server decrypts the TLS session, verifies auth tokens, and executes application logic.', activeNodes: ['tls-layer', 'web-server'], packet: { from: 'tls-layer', to: 'web-server', label: 'Process Business Logic', type: 'sync' } },
      { step: 3, title: 'Step 3: Response Sent Back to Client', description: 'Server streams the HTTP 200 OK JSON/HTML payload back to the browser.', activeNodes: ['web-server', 'browser'], packet: { from: 'web-server', to: 'browser', label: '200 OK Response', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'browser', name: 'Client Device (Browser / Mobile)', role: 'Consumer', description: 'Initiates requests and renders UI state.' },
      { id: 'tls-layer', name: 'Network & TLS Channel', role: 'Secure Transport', description: 'Encrypts traffic between untrusted public networks and servers.' },
      { id: 'web-server', name: 'Origin Server', role: 'Provider', description: 'Listens on port 443, enforces rules, and serves data.' },
    ],
    realWorldExample: {
      company: 'Shopify',
      scenario: 'Serving millions of storefront shoppers concurrently across desktop and mobile apps.',
      implementation: 'Shoppers\' browsers act as lightweight clients communicating with Shopify\'s multi-tenant edge and application servers over HTTPS, ensuring inventory counts and credit card transactions remain secure and atomic on the server.',
      scaleDetails: 'Processes tens of thousands of concurrent checkouts per minute during global flash sales.',
    },
    advantages: [
      'Centralized security, data integrity, and access control.',
      'Easy cross-platform client maintenance (web, iOS, Android share one backend API).',
    ],
    disadvantages: [
      'Server becomes a bottleneck or SPOF if not scaled and replicated.',
      'Requires continuous network connectivity (unlike pure local offline apps).',
    ],
    relatedTopics: [
      { id: 'n-tier-architecture', title: '2-Tier, 3-Tier & N-Tier Architectures', module: 'system-design' },
      { id: 'reverse-proxy', title: 'Reverse Proxy (Deep Dive)', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why shouldn\'t a mobile app connect directly to a PostgreSQL database without a backend server?', answer: 'Connecting directly embeds database credentials inside the client binary (which attackers can extract), bypasses server-side authorization checks, exposes the DB port to the public internet, and exhausts DB connection pools across thousands of phones.', keyPoints: ['Leaks DB credentials', 'Bypasses business logic & auth', 'Exhausts database connection limits'] },
      { level: 'intermediate', question: 'Compare Client-Server architecture with Peer-to-Peer (P2P) architecture.', answer: 'Client-Server centralizes control, storage, and security on dedicated servers (great for banking, SaaS, e-commerce). P2P distributes roles equally so every node acts as both client and server (great for BitTorrent file distribution or blockchain networks where decentralization and shared bandwidth are desired).', keyPoints: ['Client-Server = Centralized authority & easier consistency', 'P2P = Decentralized resilience & shared bandwidth'] },
      { level: 'advanced', question: 'How do Thin Clients differ from Thick (Fat) Clients in modern web applications?', answer: 'Thin clients offload almost all state and rendering to servers (like traditional server-rendered HTML or remote desktop terminals). Thick clients (like Figma, Google Docs, or SPAs with heavy local state) execute complex canvas rendering, validation, and local caching directly on the user\'s CPU/GPU while syncing deltas with the server.', keyPoints: ['Thin = Server does heavy lifting', 'Thick = Client caches & computes locally, syncing deltas'] },
    ],
    quiz: [
      { id: 'csa-1', question: 'In Client-Server architecture, which component initiates communication?', options: ['The Database', 'The Client', 'The Disk Controller', 'The Power Supply'], correctAnswer: 1, explanation: 'Clients initiate requests; servers passively listen on ports and respond.' },
      { id: 'csa-2', question: 'What is a major risk of embedding database queries and credentials directly inside client JavaScript?', options: ['Slightly larger CSS files', 'Any user can inspect network/JS code, steal credentials, and compromise the entire database', 'Faster page load times', 'Better SEO'], correctAnswer: 1, explanation: 'Client devices are untrusted environments; secrets must always stay on servers.' },
      { id: 'csa-3', question: 'Which protocol powers standard encrypted client-server web traffic?', options: ['HTTPS (HTTP over TLS)', 'ARP', 'ICMP', 'Telnet'], correctAnswer: 0, explanation: 'HTTPS secures HTTP communication using TLS encryption.' },
      { id: 'csa-4', question: 'What does an HTTP 404 status code indicate?', options: ['Server crashed internally', 'Client requested a resource that does not exist on the server', 'Authentication succeeded', 'Database replicated'], correctAnswer: 1, explanation: '404 Not Found indicates the requested URI resource is absent.' },
      { id: 'csa-5', question: 'Which architecture distributes workload equally among peers without a central server?', options: ['Peer-to-Peer (P2P)', '3-Tier Architecture', 'Mainframe Terminal', 'Star Switch'], correctAnswer: 0, explanation: 'In P2P networks, each participant acts simultaneously as client and server.' },
    ],
  },

  'n-tier-architecture': {
    id: 'n-tier-architecture',
    title: '2-Tier, 3-Tier & N-Tier Architectures',
    module: 'system-design',
    category: '2. Client-Server Architecture',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'Layered system topology separating Presentation (UI), Application Logic (Backend), and Data Persistence (Database) into distinct physical and logical tiers.',
    introduction: {
      definition: '2-Tier architecture places Client directly against Database; 3-Tier inserts an independent Application Server tier between Presentation and Data; N-Tier expands further with Caching, Reverse Proxy, and Search tiers.',
      analogousStory: 'In a small home kitchen (2-tier), diners grab food straight from the fridge. In a commercial restaurant (3-tier), diners (Presentation) order via chefs (Application Tier) who fetch ingredients from cold storage (Data Tier). In a massive catering enterprise (N-tier), you add receptionists (Reverse Proxy) and warming stations (Cache Tier).',
      keyTakeaway: 'Decoupling Presentation, Business Logic, and Data allows each tier to scale, update, and secure independently.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates 2-tier security risks where clients hold direct database access.',
        'Allows scaling compute application servers separately from heavy stateful database instances.',
        'Enables adding specialized intermediate tiers (Redis caching, search indexes, WAF proxies) seamlessly.',
      ],
      realWorldImpact: '3-Tier and N-Tier designs remain the foundational blueprint for enterprise web platforms.',
      metricsAffected: ['Tier Isolation', 'Independent Scaling Ratio', 'Security Boundary Strength'],
    },
    coreArchitecture: {
      description: 'Traffic flows through Presentation/Proxy Edge -> Stateless Business Logic Tier -> Caching / Data Storage Tier.',
      components: [
        { name: 'Presentation / Edge Tier', role: 'Tier 1: UI & Reverse Proxy', details: 'Serves React/HTML assets, terminates TLS, and routes API traffic.' },
        { name: 'Application Logic Tier', role: 'Tier 2: Business Rules', details: 'Validates inputs, coordinates workflows, enforces permissions, and applies algorithms.' },
        { name: 'Caching & Persistence Tier', role: 'Tier 3/N: Redis & Databases', details: 'Combines high-speed RAM caches with ACID SQL or scalable NoSQL databases.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Presentation Capture', technicalDetail: 'User interacts with UI; browser submits HTTPS call to edge proxy.' },
        { stepNumber: 2, action: 'Application Processing', technicalDetail: 'Proxy routes request into private VPC app workers executing business rules.' },
        { stepNumber: 3, action: 'Data Tier Query', technicalDetail: 'App workers read/write cache and relational storage tiers, returning formatted output.' },
      ],
    },
    visualizationId: 'n-tier-3d',
    visualizationScene: 'reverse-proxy',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Tier 1: Presentation Client -> Edge Proxy', description: 'Client UI layer sends HTTPS request to the outer web/proxy tier.', activeNodes: ['client-1', 'reverse-proxy'], packet: { from: 'client-1', to: 'reverse-proxy', label: 'Tier 1: Presentation', type: 'request' } },
      { step: 2, title: 'Tier 2: Edge -> Application Tier (Private VPC)', description: 'Request enters the middle Application Logic tier inside the secured network.', activeNodes: ['reverse-proxy', 'app-server-2'], packet: { from: 'reverse-proxy', to: 'app-server-2', label: 'Tier 2: Business Logic', type: 'request' } },
      { step: 3, title: 'Tier 3: App Tier -> Data Persistence Tier', description: 'Application tier reads persistent state from the isolated Database tier.', activeNodes: ['app-server-2', 'database'], packet: { from: 'app-server-2', to: 'database', label: 'Tier 3: Data Access', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'client-devices', name: 'Tier 1: Client Presentation', role: 'Browser / Mobile UI', description: 'Renders frontend interfaces and captures user actions.' },
      { id: 'reverse-proxy', name: 'Tier 1.5: Web / Proxy Edge', role: 'Perimeter Layer', description: 'Terminates TLS, serves static bundles, and shields internal tiers.' },
      { id: 'app-servers', name: 'Tier 2: Application Logic Servers', role: 'Middle Tier', description: 'Executes stateless domain logic and security checks.' },
      { id: 'database', name: 'Tier 3: Data Persistence Layer', role: 'Storage Tier', description: 'Private database cluster accessible only from Tier 2.' },
      { id: 'cache-layer', name: 'Tier N: Distributed Cache', role: 'Acceleration Tier', description: 'Speeds up frequent reads between Tier 2 and Tier 3.' },
    ],
    realWorldExample: {
      company: 'Enterprise Banking Portals',
      scenario: 'Strict PCI-DSS compliance requiring complete network isolation of customer ledger databases.',
      implementation: 'Web proxies sit in the DMZ (Tier 1), Java/Go banking logic sits in a locked application subnet (Tier 2), and mainframe/PostgreSQL ledgers sit in an air-gapped data subnet (Tier 3) unreachable from anywhere except Tier 2.',
      scaleDetails: 'Enforces defense-in-depth across millions of secure daily financial sessions.',
    },
    advantages: [
      'Strong security: Data tier has zero exposure to the public internet.',
      'Independent scaling: Add app servers without touching database hardware.',
    ],
    disadvantages: [
      'Extra network hops between tiers add minor serialization latency compared to embedded local apps.',
    ],
    relatedTopics: [
      { id: 'client-server-architecture', title: 'Client-Server Architecture', module: 'system-design' },
      { id: 'monolith-vs-microservices', title: 'Monolithic vs Microservices', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the defining feature of 3-Tier architecture compared to 2-Tier?', answer: '3-Tier introduces a separate Application Logic middle tier between the Client (Presentation) and the Database (Data), protecting DB credentials and allowing independent scaling.', keyPoints: ['Middle application server tier', 'Security & business logic centralization'] },
      { level: 'intermediate', question: 'Explain the difference between "Layers" (logical) and "Tiers" (physical).', answer: 'Layers refer to logical code organization within a codebase (Controller, Service, Repository). Tiers refer to physical deployment separation across distinct machines or network boundaries (Web Tier, App Tier, DB Tier). A monolith can have 3 logical layers running inside 1 physical tier.', keyPoints: ['Layer = Logical code separation', 'Tier = Physical/network separation'] },
      { level: 'advanced', question: 'What makes an architecture "N-Tier", and what are its risks?', answer: 'N-Tier adds specialized infrastructure tiers like Reverse Proxies, Distributed Caches (Redis), Search Clusters (Elasticsearch), and Message Brokers. The risk is added operational complexity, network serialization overhead, and distributed debugging challenges if over-tiered unnecessarily.', keyPoints: ['Specialized proxy, cache, search, queue tiers', 'Risk of latency hops & operational overhead'] },
    ],
    quiz: [
      { id: 'nt-1', question: 'Which three components constitute classic 3-Tier Architecture?', options: ['Presentation, Application Logic, and Data Storage', 'Monitor, Keyboard, and Mouse', 'HTML, CSS, and Fonts', 'DNS, DHCP, and ARP'], correctAnswer: 0, explanation: '3-Tier separates UI presentation, middle business logic, and backend data persistence.' },
      { id: 'nt-2', question: 'In a secure 3-Tier deployment, which tier is exposed directly to the public internet?', options: ['The Database Tier', 'Only the Presentation / Edge Tier', 'All 3 tiers simultaneously', 'None'], correctAnswer: 1, explanation: 'Only the outer edge/presentation tier accepts public traffic; App and Data tiers remain private.' },
      { id: 'nt-3', question: 'What is the difference between a logical "Layer" and a physical "Tier"?', options: ['Layers organize code logically; Tiers separate components physically across machines/networks', 'They are identical terms', 'Tiers only exist in CSS', 'Layers are hardware cables'], correctAnswer: 0, explanation: 'Logical layers structure code; physical tiers represent deployment boundaries.' },
      { id: 'nt-4', question: 'Which additional tier commonly transforms a 3-Tier app into N-Tier for speed?', options: ['Distributed Caching Tier (e.g., Redis)', 'Floppy Disk Tier', 'Manual Paper Ledger', 'Printer Queue'], correctAnswer: 0, explanation: 'Adding an in-memory cache tier or search tier creates a multi-tier N-Tier system.' },
      { id: 'nt-5', question: 'Why did modern web engineering move away from 2-Tier desktop-to-SQL architectures?', options: ['2-Tier apps exposed DB passwords, couldn\'t scale connections cleanly, and required updating every client for business logic changes', 'SQL stopped working over cables', 'Browsers cannot render fonts', 'Servers became illegal'], correctAnswer: 0, explanation: '2-tier direct DB access creates severe security, scaling, and deployment issues.' },
    ],
  },

  'monolith-vs-microservices': {
    id: 'monolith-vs-microservices',
    title: 'Monolithic vs Microservices Architecture',
    module: 'system-design',
    category: '2. Client-Server Architecture',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'A Monolith packages all business modules into one unified deployable unit, whereas Microservices decompose domains into independently deployable services communicating over networks.',
    introduction: {
      definition: 'Monolithic architecture builds an entire application (auth, catalog, billing, notifications) into a single unified codebase and process. Microservices architecture splits each business capability into an autonomous small service with its own codebase, deployment pipeline, and dedicated database.',
      analogousStory: 'A Monolith is a Swiss Army knife—compact, zero assembly required, every tool shares one handle; great for camping, though if the scissor blade snaps you replace the whole knife. Microservices are a specialized surgical toolkit—each instrument is separate, independently upgradable, and specialized, but requires a skilled team and tool cart to organize.',
      keyTakeaway: 'Start with a well-structured Modular Monolith; adopt Microservices only when team size, independent scaling needs, or fault isolation justify distributed complexity.',
    },
    whyRequired: {
      problemsSolved: [
        'Allows hundreds of engineers to deploy features independently without merge conflicts or monolithic release trains.',
        'Scales CPU-heavy modules (e.g., video transcoding) independently from lightweight services (e.g., user profiles).',
        'Supports polyglot tech stacks (Python ML for Recommendations, Go/Rust for low-latency Payment Gateway).',
      ],
      realWorldImpact: 'Amazon and Netflix pioneered microservices to move from bottlenecked weekly releases to thousands of independent deployments per day.',
      metricsAffected: ['Deployment Frequency', 'Blast Radius Isolation', 'Network Serialization Overhead', 'Team Velocity'],
    },
    coreArchitecture: {
      description: 'Microservices route external calls through an API Gateway to domain services (User, Order, Payment, Notification), each owning its private database and communicating via REST/gRPC or an Event Bus.',
      components: [
        { name: 'API Gateway', role: 'Unified Entry Point', details: 'Aggregates microservice APIs into a single public interface and validates auth.' },
        { name: 'Domain Services (Order/Payment/User)', role: 'Autonomous Bounded Contexts', details: 'Each service owns its own codebase, deployment schedule, and private database ("Database-per-Service").' },
        { name: 'Event Bus / Service Mesh', role: 'Inter-Service Communication', details: 'Provides async pub/sub messaging and mTLS service-to-service discovery.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Request Hits API Gateway', technicalDetail: 'Client calls POST /checkout; Gateway verifies JWT and routes to Order Service.' },
        { stepNumber: 2, action: 'Database-per-Service Write', technicalDetail: 'Order Service persists pending order in its private Order DB and emits OrderCreated.' },
        { stepNumber: 3, action: 'Choreographed Downstream Execution', technicalDetail: 'Payment Service charges the card in its DB; Notification Service sends confirmation asynchronously.' },
      ],
    },
    visualizationId: 'micro-3d',
    visualizationScene: 'microservices',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Checkout Enters API Gateway', description: 'Client invokes checkout endpoint; API Gateway dispatches request to Order Service.', activeNodes: ['api-gateway', 'order-service'], packet: { from: 'api-gateway', to: 'order-service', label: 'POST /checkout', type: 'request' } },
      { step: 2, title: 'Step 2: Order Service Publishes Event', description: 'Order Service records pending state and emits OrderCreatedEvent onto the Event Bus.', activeNodes: ['order-service', 'event-bus'], packet: { from: 'order-service', to: 'event-bus', label: 'OrderCreatedEvent', type: 'sync' } },
      { step: 3, title: 'Step 3: Payment Service Charges Account', description: 'Payment Service consumes the event, updates Payment DB, and completes transaction.', activeNodes: ['event-bus', 'payment-service'], packet: { from: 'event-bus', to: 'payment-service', label: 'Process Payment', type: 'request' } },
      { step: 4, title: 'Step 4: Notification Service Alerts User', description: 'Notification worker independently emits email/push receipt without blocking checkout.', activeNodes: ['event-bus', 'notification-service'], packet: { from: 'event-bus', to: 'notification-service', label: 'Dispatch Receipt', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'api-gateway', name: 'API Gateway', role: 'Ingress Mesh', description: 'Single unified endpoint masking internal microservice topology.' },
      { id: 'user-service', name: 'User Service + User DB', role: 'Identity Domain', description: 'Manages user profiles and credentials independently.' },
      { id: 'order-service', name: 'Order Service + Order DB', role: 'Checkout Domain', description: 'Owns shopping carts and order lifecycles.' },
      { id: 'payment-service', name: 'Payment Service + Ledger DB', role: 'Financial Domain', description: 'Strictly isolated service handling PCI-compliant transactions.' },
      { id: 'notification-service', name: 'Notification Service', role: 'Messaging Worker', description: 'Sends asynchronous emails, SMS, and push alerts.' },
      { id: 'event-bus', name: 'Event Bus (Kafka)', role: 'Async Glue', description: 'Decouples inter-service communication.' },
    ],
    realWorldExample: {
      company: 'Amazon (Prime Video Case Study)',
      scenario: 'Balancing microservices scale against monolith efficiency.',
      implementation: 'While Amazon\'s core retail store runs on thousands of microservices for team autonomy, Amazon Prime Video famously refactored a high-throughput video monitoring pipeline FROM distributed serverless microservices BACK into a single monolith—cutting infrastructure costs by 90% by removing network serialization overhead!',
      scaleDetails: 'Proves that microservices are a team & scaling tool, not a universal upgrade.',
    },
    advantages: [
      'Independent deployments, scaling, and fault isolation per domain.',
      'Freedom to use optimal languages/databases per problem.',
      'Clear ownership boundaries for large engineering organizations.',
    ],
    disadvantages: [
      'Distributed systems complexity: network latency, partial failures, distributed tracing.',
      'No cross-service ACID SQL joins—requires Saga pattern for distributed transactions.',
      'Significantly higher DevOps, CI/CD, and cloud orchestration overhead.',
    ],
    relatedTopics: [
      { id: 'api-gateway-architecture', title: 'API Gateway Architecture', module: 'system-design' },
      { id: 'saga-pattern', title: 'Saga Pattern (Distributed Transactions)', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why shouldn\'t two microservices directly read and write to each other\'s database tables?', answer: 'Sharing a database creates tight hidden coupling: if Service A renames a column, Service B crashes unexpectedly, destroying independent deployment and fault isolation. Each microservice should own its private database and expose data only through versioned APIs or events.', keyPoints: ['Database-per-Service rule', 'Schema changes break external readers', 'Communicate via APIs/events only'] },
      { level: 'intermediate', question: 'When is a Monolith BETTER than Microservices?', answer: 'For small teams (<15 engineers), early-stage startups finding product-market fit, or latency-critical pipelines where network serialization overhead kills throughput. Monoliths provide instant function calls, atomic SQL ACID transactions, and effortless debugging.', keyPoints: ['Small teams / early stage', 'Need strict local ACID joins', 'Latency-sensitive tightly coupled loops'] },
      { level: 'advanced', question: 'What is a "Distributed Monolith", and how do teams accidentally build one?', answer: 'A Distributed Monolith has all the network latency and DevOps pain of microservices with none of the independence—every service requires synchronous lock-step calls to 5 other services to do anything, and all services must be deployed simultaneously. Teams create this by splitting by technical layers or making synchronous chatty RPC chains instead of cohesive business domains.', keyPoints: ['Tight synchronous coupling across network boundaries', 'Requires coordinated deployments', 'Fix using asynchronous events and Domain-Driven Design'] },
    ],
    quiz: [
      { id: 'mm-1', question: 'What is the "Database-per-Service" pattern in microservices?', options: ['Each microservice owns its private database schema, accessed only via its APIs or events', 'All services share one giant root SQL table', 'Databases are deleted after 24 hours', 'Clients hold local SQL files'], correctAnswer: 0, explanation: 'Private databases enforce loose coupling and independent scaling.' },
      { id: 'mm-2', question: 'Why is debugging harder in Microservices than in a Monolith?', options: ['A single user request crosses multiple machines and networks, requiring distributed tracing (correlation IDs)', 'Logs are encrypted illegally', 'Microservices cannot run on Linux', 'Databases reject SQL'], correctAnswer: 0, explanation: 'Tracing requests across disparate services requires OpenTelemetry/Jaeger correlation IDs.' },
      { id: 'mm-3', question: 'Which is an advantage of starting with a Modular Monolith?', options: ['Zero network latency between modules, simple ACID transactions, and low operational overhead', 'Impossible to test locally', 'Requires Kubernetes on day one', 'Forces 10 different programming languages'], correctAnswer: 0, explanation: 'A modular monolith gives clean code boundaries without distributed systems overhead.' },
      { id: 'mm-4', question: 'Which component typically provides a unified external entry point in front of microservices?', options: ['API Gateway', 'Telnet Terminal', 'DHCP Relay', 'Ethernet Hub'], correctAnswer: 0, explanation: 'An API Gateway acts as the unified ingress facade.' },
      { id: 'mm-5', question: 'What problem did Amazon Prime Video solve by consolidating a noisy video pipeline back into a monolith?', options: ['Eliminated expensive intermediate network/storage serialization costs (90% cost drop)', 'Added more bugs', 'Disabled video streaming', 'Increased latency'], correctAnswer: 0, explanation: 'Removing unnecessary network hops between tightly coupled high-throughput steps cut costs by 90%.' },
    ],
  },

  'event-driven-architecture': {
    id: 'event-driven-architecture',
    title: 'Event-Driven Architecture (EDA)',
    module: 'system-design',
    category: '2. Client-Server Architecture',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Event-driven architecture structures software around producing, detecting, and reacting asynchronously to immutable state-change events via brokers rather than blocking RPC calls.',
    introduction: {
      definition: 'Event-Driven Architecture (EDA) decouples event producers from event consumers. When an action occurs (e.g. "PaymentSucceeded"), the producer publishes an event to a broker (like Kafka), and zero or more interested consumers react asynchronously.',
      analogousStory: 'Think of a newspaper subscription vs knocking on every neighbor\'s door. When breaking news happens, the publisher prints the edition once (Event Broker). Subscribers read it on their own schedule; the publisher doesn\'t block waiting for every single citizen to pick up the phone.',
      keyTakeaway: 'EDA converts brittle synchronous chains into resilient, scalable, shock-absorbing pipelines.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates cascading timeouts when downstream analytics, email, or fraud services slow down.',
        'Absorbs massive traffic spikes (load leveling) inside persistent broker buffers instead of crashing workers.',
        'Makes adding new features trivial: plug in a new consumer group without editing the producer service.',
      ],
      realWorldImpact: 'Powers real-time fraud detection, Uber ride state telemetry, IoT pipelines, and fintech ledgers.',
      metricsAffected: ['Producer P99 Latency', 'Peak Burst Absorption', 'Service Coupling Degree'],
    },
    coreArchitecture: {
      description: 'Event Producers publish immutable domain facts to an Event Broker (Kafka/EventBridge), where independent Consumer Groups process them at their own pace.',
      components: [
        { name: 'Event Producers', role: 'Fact Publishers', details: 'Emit immutable events (e.g., OrderPlaced) and immediately return success to users.' },
        { name: 'Distributed Event Broker', role: 'Durable Buffer & Router', details: 'Stores partitioned event logs on disk with replayability and retention policies.' },
        { name: 'Consumer Groups', role: 'Parallel Reactors', details: 'Independent worker pools (Analytics, Email, Inventory) reacting asynchronously.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Action & Event Emission', technicalDetail: 'User completes checkout; Checkout Service publishes OrderPlaced to Kafka topic.' },
        { stepNumber: 2, action: 'Broker Persistence', technicalDetail: 'Broker appends event to partition log and acknowledges producer in <5ms.' },
        { stepNumber: 3, action: 'Parallel Fan-Out Consumption', technicalDetail: 'Inventory, Billing, and Notification consumer groups independently read and process the event.' },
      ],
    },
    visualizationId: 'eda-3d',
    visualizationScene: 'message-queue',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Producer Emits Domain Event', description: 'Checkout Service publishes an immutable OrderPlaced event without waiting for email or inventory responses.', activeNodes: ['producer', 'broker'], packet: { from: 'producer', to: 'broker', label: 'Emit: OrderPlaced', type: 'request' } },
      { step: 2, title: 'Step 2: Broker Persists & Buffers Event', description: 'The broker durably appends the event into its ordered partition log, absorbing any traffic spikes.', activeNodes: ['broker'], packet: { from: 'producer', to: 'broker', label: 'Append Partition Log', type: 'sync' } },
      { step: 3, title: 'Step 3: Independent Consumer Groups React', description: 'Consumer Worker 1 (Inventory) and Worker 2 (Notifications) pull and process the event asynchronously.', activeNodes: ['broker', 'consumer'], packet: { from: 'broker', to: 'consumer', label: 'Async Fan-Out Consume', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'producer', name: 'Event Producers', role: 'Publishers', description: 'Services emitting immutable state events.' },
      { id: 'broker', name: 'Distributed Event Broker (Kafka)', role: 'Durable Spine', description: 'Persists ordered partitioned logs for asynchronous consumption.' },
      { id: 'consumer', name: 'Consumer Workers', role: 'Async Subscribers', description: 'Process events independently with offset tracking and retry DLQs.' },
    ],
    realWorldExample: {
      company: 'LinkedIn',
      scenario: 'Synchronizing profile edits, feed updates, analytics, and search indexes across hundreds of internal systems.',
      implementation: 'LinkedIn engineered Apache Kafka specifically to serve as their unified central event pipeline—handling trillions of daily domain events cleanly.',
      scaleDetails: 'Processes over 7+ trillion messages per day across global data centers.',
    },
    advantages: [
      'Extreme decoupling: Producers have zero knowledge of downstream consumers.',
      'Shock absorption: Traffic spikes queue cleanly instead of crashing databases.',
      'Event replay: New analytics services can replay historical events from day one.',
    ],
    disadvantages: [
      'Eventual consistency: Data across views updates after a brief async propagation delay.',
      'Idempotency mandatory: Consumers may receive duplicate deliveries and must deduplicate.',
    ],
    relatedTopics: [
      { id: 'kafka-architecture', title: 'Apache Kafka Architecture', module: 'system-design' },
      { id: 'sync-vs-async-communication', title: 'Synchronous vs Asynchronous Communication', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the main advantage of Event-Driven Architecture over synchronous REST calls?', answer: 'Loose coupling and resilience: the producer publishes an event and returns immediately without blocking or crashing if a downstream consumer like the email server is slow or offline.', keyPoints: ['Loose coupling', 'Resilience against slow consumers', 'Built-in spike buffering'] },
      { level: 'intermediate', question: 'How do you handle a Poison Pill message (corrupted event that crashes a consumer repeatedly)?', answer: 'Configure a maximum retry limit (e.g., 3 retries with backoff). After exhausting retries, route the corrupted message to a Dead Letter Queue (DLQ) so the healthy consumer unblocks and processes subsequent valid messages while engineers inspect the DLQ offline.', keyPoints: ['Prevent infinite retry crash loops', 'Route toxic messages to Dead Letter Queue (DLQ)'] },
      { level: 'advanced', question: 'What is the Dual-Write Problem in EDA, and how does the Transactional Outbox Pattern solve it?', answer: 'If a service commits a row to PostgreSQL and then calls Kafka.publish(), a crash right between those two calls leaves the DB updated but no event emitted (silent inconsistency). The Transactional Outbox Pattern writes both the business record AND an outbox event row inside the SAME atomic local SQL transaction. A background CDC relay (e.g., Debezium) then streams outbox rows reliably to Kafka.', keyPoints: ['DB commit + Kafka publish is not atomic', 'Outbox table inside local ACID transaction', 'CDC (Debezium) relays outbox rows safely'] },
    ],
    quiz: [
      { id: 'eda-1', question: 'What is a "Dead Letter Queue (DLQ)" in event-driven systems?', options: ['A storage queue holding messages that repeatedly failed processing so healthy traffic isn\'t blocked', 'An archived email spam folder', 'A dropped TCP packet', 'A deleted SQL table'], correctAnswer: 0, explanation: 'DLQs isolate unprocessable messages for manual inspection and recovery.' },
      { id: 'eda-2', question: 'Which pattern solves the Dual-Write inconsistency between a SQL DB commit and Kafka publish?', options: ['Transactional Outbox Pattern', 'Singleton Pattern', 'Subnetting', 'CSS Grid'], correctAnswer: 0, explanation: 'Writing events to an outbox table in the same DB transaction guarantees atomicity.' },
      { id: 'eda-3', question: 'Why must event consumers generally be idempotent?', options: ['Brokers typically guarantee At-Least-Once delivery, meaning duplicate events can arrive', 'Events cannot contain JSON', 'CPUs duplicate integers', 'To disable authentication'], correctAnswer: 0, explanation: 'At-least-once delivery means duplicates occur during retries; idempotent consumers safely deduplicate.' },
      { id: 'eda-4', question: 'How does EDA behave during a massive Black Friday traffic burst?', options: ['The broker buffers excess events smoothly so consumers process at maximum sustainable capacity without crashing', 'Every client connection gets terminated immediately', 'Servers melt physically', 'DNS stops resolving'], correctAnswer: 0, explanation: 'Brokers act as durable shock absorbers for burst traffic.' },
      { id: 'eda-5', question: 'In EDA, how much does a producer know about its consumers?', options: ['Nothing—it only emits events to a broker topic', 'Every consumer\'s private SQL password', 'Every consumer\'s MAC address', 'The exact screen resolution of every admin'], correctAnswer: 0, explanation: 'Producers and consumers are completely decoupled via the broker.' },
    ],
  },
};
