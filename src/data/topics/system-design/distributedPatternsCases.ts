import { TopicContent } from '../../../types';

export const sdDistributedPatternsCasesTopics: Record<string, TopicContent> = {
  'cap-theorem': {
    id: 'cap-theorem',
    title: 'CAP Theorem & PACELC Explained',
    module: 'system-design',
    category: '9. Distributed Systems Core Concepts',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Brewer\'s CAP Theorem proves that when a distributed data store experiences a Network Partition (P), it must choose between Consistency (C) or Availability (A).',
    introduction: {
      definition: 'In distributed databases, Consistency means every read receives the most recent write or an error; Availability means every non-failing node returns a response (even if stale); Partition Tolerance means the cluster continues operating despite dropped network messages between nodes.',
      analogousStory: 'Imagine two bank tellers in separate branches linked by phone (Nodes A & C). Suddenly, a storm cuts the phone line (Network Partition). A customer asks Teller C to withdraw $100. Teller C faces CAP: either lock the window and refuse service until the phone line returns (CP — Consistent, Unavailable) OR let the customer withdraw anyway risking overdraft divergence (AP — Available, Potentially Inconsistent).',
      keyTakeaway: 'Network partitions (P) happen inevitably in real networks—so distributed systems are practically either **CP** (reject writes on minority side) or **AP** (accept writes and reconcile conflicts later).',
    },
    whyRequired: {
      problemsSolved: [
        'Guides selecting the right database per business domain (CP for banking vs AP for shopping carts/social likes).',
        'Prevents impossible architecture goals (demanding 100% linearizable consistency AND 100% availability during ocean cable cuts).',
        'Introduces PACELC to address normal-operation latency vs consistency trade-offs when NO partition exists.',
      ],
      realWorldImpact: 'Spanner, etcd, ZooKeeper, and HBase prioritize CP; Cassandra, DynamoDB (default reads), and DNS prioritize AP.',
      metricsAffected: ['Linearizability vs Eventual Consistency', 'Write Rejection Rate Under Partition', 'Normal-Path Replication Latency'],
    },
    coreArchitecture: {
      description: 'Compare CP quorum blocking vs AP optimistic execution when a Partition Wall slices nodes apart.',
      components: [
        { name: 'Node A & B (Majority Quorum)', role: 'Connected Cluster Side', details: 'Maintains sync replication across connected nodes.' },
        { name: 'Network Partition Boundary', role: 'Severed Interconnect', details: 'Drops packets between Node A/B and isolated Node C.' },
        { name: 'Node C (Isolated Minority)', role: 'CP vs AP Decision Point', details: 'Rejects calls under CP mode; serves potentially stale reads/writes under AP mode.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Normal Healthy Operation', technicalDetail: 'Without partitions, updates replicate smoothly across all nodes.' },
        { stepNumber: 2, action: 'Network Partition Strikes', technicalDetail: 'Fiber cut isolates Node C from Nodes A & B.' },
        { stepNumber: 3, action: 'CP vs AP Policy Triggered', technicalDetail: 'Switch between CP Mode and AP Mode above to inspect Node C\'s behavior!' },
      ],
    },
    visualizationId: 'cap-3d',
    visualizationScene: 'cap-theorem',
    visualizationModes: [
      { id: 'cp-mode', label: 'CP Mode (Consistency Over Availability)' },
      { id: 'ap-mode', label: 'AP Mode (Availability Over Consistency)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Network Partition Severs Node C', description: 'Link between Majority (Nodes A+B) and Minority (Node C) snaps. Nodes A and B continue syncing.', activeNodes: ['cap-node-a', 'cap-node-b'], packet: { from: 'cap-node-a', to: 'cap-node-b', label: 'Majority Quorum Sync', type: 'sync' } },
      { step: 2, title: 'Step 2: Isolated Node C Evaluates CP vs AP', description: 'Toggle CP vs AP mode above! Under CP, Node C refuses stale replies (503). Under AP, Node C stays online serving stale values.', activeNodes: ['cap-node-c'], packet: { from: 'cap-node-a', to: 'cap-node-c', label: 'Partition Cut (CP Rejects / AP Responds)', type: 'blocked' } },
    ],
    interactiveComponents: [
      { id: 'cap-node-a', name: 'Node A (Majority Leader)', role: 'Primary Quorum Side', description: 'Continues committing safely with Node B quorum.' },
      { id: 'cap-node-b', name: 'Node B (Majority Peer)', role: 'Quorum Partner', description: 'Confirms replication writes with Node A.' },
      { id: 'cap-node-c', name: 'Node C (Partitioned Node)', role: 'CP vs AP Decision Point', description: 'Demonstrates exact trade-off between rejecting stale operations (CP) vs accepting them (AP).' },
    ],
    realWorldExample: {
      company: 'Apache Cassandra vs Google Spanner / ZooKeeper',
      scenario: 'Choosing consistency models for social timelines vs distributed configuration locks.',
      implementation: 'Cassandra operates as a tunable AP store (allowing writes on surviving nodes even during partitions and resolving conflicts via Last-Write-Wins/Vector Clocks). ZooKeeper and etcd operate as strict CP consensus stores so two Kubernetes clusters never elect conflicting leaders.',
      scaleDetails: 'Governs global distributed storage architecture design.',
    },
    advantages: [
      'CP: Zero stale financial/locking errors; guarantees strict linearizable accuracy.',
      'AP: High uptime; systems stay responsive to users even during severe datacenter network splits.',
    ],
    disadvantages: [
      'CP refuses requests on minority partitions.',
      'AP requires complex conflict resolution (CRDTs, Vector Clocks, Last-Write-Wins).',
    ],
    relatedTopics: [
      { id: 'distributed-consensus-leader', title: 'Distributed Consensus & Leader Election', module: 'system-design' },
      { id: 'database-replication', title: 'Database Replication', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why can\'t a real distributed system simply choose "CA" (Consistent + Available without Partition Tolerance)?', answer: 'Because you cannot turn off network partitions in the real world! Fiber cables get cut, switches reboot, and packets drop inevitably. Therefore Partition Tolerance (P) is mandatory—forcing every real distributed system to choose between CP or AP when a partition occurs.', keyPoints: ['Network partitions are inevitable', 'Must pick CP or AP during partition'] },
      { level: 'intermediate', question: 'What does the PACELC theorem add beyond CAP?', answer: 'CAP only describes what happens DURING a partition. PACELC says: if there is a Partition (P), choose Availability (A) or Consistency (C); ELSE (E) during normal healthy operation, choose between Latency (L) and Consistency (C)—because waiting for cross-continent replication lowers latency vs confirming strong consistency.', keyPoints: ['CAP covers partition crises', 'PACELC adds normal-state Latency vs Consistency trade-off'] },
      { level: 'advanced', question: 'How does Quorum Tuning (`R + W > N`) allow Cassandra/Dynamo to behave as CP or AP dynamically?', answer: 'With `N=3` replicas, setting Write Quorum `W=2` and Read Quorum `R=2` satisfies `R + W > N` (4 > 3), guaranteeing at least 1 overlapping node always holds the latest write (Strong Consistency). Setting `W=1, R=1` maximizes Availability and lowest latency at the cost of stale reads.', keyPoints: ['N = total replicas, W = write acks, R = read replies', 'R + W > N enforces overlapping fresh read quorum'] },
    ],
    quiz: [
      { id: 'cap-1', question: 'In CAP Theorem, what does "Partition Tolerance" mean?', options: ['The cluster continues operating even when network links between nodes drop or delay messages', 'Tables are split alphabetically', 'Every node shares 1 CPU', 'SSL is disabled'], correctAnswer: 0, explanation: 'Partition tolerance handles arbitrary network communication splits between nodes.' },
      { id: 'cap-2', question: 'Which choice best suits an automated banking ledger during a severe network partition?', options: ['CP (Reject potentially conflicting updates on isolated side to preserve exact balances)', 'AP (Allow conflicting double-spends)', 'Ignore partitions', 'Turn off ACID'], correctAnswer: 0, explanation: 'Financial ledgers prioritize consistency over accepting conflicting disconnected withdrawals.' },
      { id: 'cap-3', question: 'In Quorum replication with `N = 5` replicas and `W = 3`, what minimum `R` guarantees strong overlapping reads?', options: ['R = 3 (since 3 + 3 > 5)', 'R = 1', 'R = 2', 'R = 0'], correctAnswer: 0, explanation: '`R + W > N` (3 + 3 > 5) forces at least one replica in R to hold the newest write.' },
      { id: 'cap-4', question: 'What does PACELC state happens during normal operation when NO network partition exists?', options: ['Systems trade off Latency (L) vs Consistency (C)', 'Systems always crash', 'CP systems become HTTP', 'RAM turns into SSD'], correctAnswer: 0, explanation: 'Synchronous replication increases normal-state latency to guarantee consistency.' },
      { id: 'cap-5', question: 'Which classic system prioritizes CP consistency for cluster metadata and leader locks?', options: ['etcd / Apache ZooKeeper', 'DNS Cache', 'Static CDN Images', 'UDP Video Stream'], correctAnswer: 0, explanation: 'Consensus stores like etcd/ZooKeeper strictly enforce CP via Raft/Zab.' },
    ],
  },

  'consistent-hashing': {
    id: 'consistent-hashing',
    title: 'Consistent Hashing & Hash Ring with Virtual Nodes',
    module: 'system-design',
    category: '9. Distributed Systems Core Concepts',
    readTime: '11 min',
    difficulty: 'Advanced',
    summary: 'Consistent Hashing maps both server nodes and data keys onto a continuous circular 360° Hash Ring—ensuring adding or removing a server remaps only `K/N` adjacent keys rather than reshuffling the whole cluster.',
    introduction: {
      definition: 'Traditional `hash(key) % N` sharding fails catastrophically when `N` changes because almost 100% of keys change modulo slots, triggering massive cache misses. Consistent Hashing places servers and keys onto a ring `[0, 2^32 - 1]`; each key belongs to the first server encountered walking clockwise.',
      analogousStory: 'Imagine 3 guards spaced evenly around a circular museum track. Each visitor stands at a random spot on the track and walks clockwise until reaching the nearest guard. If a 4th guard steps onto the circle, ONLY visitors right behind the new guard switch guards—everyone else stays put!',
      keyTakeaway: 'Consistent Hashing limits key movement to only `K/N` during cluster scaling, while Virtual Nodes balance uneven ring gaps smoothly.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates catastrophic "Cache Stampede" when adding or losing a Redis/Memcached cache shard.',
        'Minimizes data migration cost during elastic database cluster rescaling.',
        'Virtual Nodes eliminate hotspot clustering when few physical servers sit unevenly on the ring.',
      ],
      realWorldImpact: 'Powers Amazon DynamoDB, Apache Cassandra, Discord Guild rings, and Akamai/Cloudflare edge routing.',
      metricsAffected: ['Key Remap Percentage (`K/N`)', 'Cluster Rebalance Traffic', 'Node Load Standard Deviation'],
    },
    coreArchitecture: {
      description: 'Physical servers hash to multiple Virtual Node positions around a `[0 .. 2^32 - 1]` ring; incoming data keys hash onto the same ring and resolve clockwise.',
      components: [
        { name: 'Circular Hash Ring', role: 'Modulo 2^32 Address Space', details: 'Maps both node IPs and data keys uniformly around a 360-degree ring.' },
        { name: 'Server & Virtual Nodes', role: 'Balanced Ownership Anchors', details: 'Each physical node spawns 100-200 Virtual Nodes so load stays statistically uniform.' },
        { name: 'Clockwise Binary Search', role: 'O(log N) Key Lookup', details: 'Finds the first clockwise server >= `hash(key)`.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Place Nodes onto Ring', technicalDetail: 'Hash Node A, B, C identifiers onto positions around the circular ring.' },
        { stepNumber: 2, action: 'Route Key Clockwise', technicalDetail: 'Hash Data Key #101 -> walk clockwise until hitting the next node on the ring.' },
        { stepNumber: 3, action: 'Add Node D Minimally', technicalDetail: 'Toggle "Add Node D" above! Notice only keys directly preceding Node D migrate while all other keys stay unaffected.' },
      ],
    },
    visualizationId: 'hash-ring-3d',
    visualizationScene: 'consistent-hashing',
    visualizationModes: [
      { id: '3-nodes', label: '3 Server Nodes on Ring' },
      { id: 'add-node-d', label: 'Add Node D (Minimal Remap)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Nodes & Keys Placed on 360° Ring', description: 'Nodes A, B, and C sit spaced around the Hash Ring; yellow data keys map clockwise to their owning node.', activeNodes: ['ring-node-a', 'ring-node-b', 'ring-node-c'], packet: { from: 'ring-node-a', to: 'ring-node-b', label: 'Clockwise Key Ownership', type: 'sync' } },
      { step: 2, title: 'Step 2: Scale Up by Adding Node D', description: 'Toggle "Add Node D" above! Only Key #101 sitting immediately counter-clockwise of Node D migrates—Keys #204, #309, and #415 do not move at all!', activeNodes: ['ring-node-d'], packet: { from: 'ring-node-d', to: 'ring-node-a', label: 'Only K/N Keys Migrate', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'ring-node-a', name: 'Ring Server Node A (0°)', role: 'Storage Shard', description: 'Owns keys hashing in the arc preceding 0°.' },
      { id: 'ring-node-b', name: 'Ring Server Node B (120°)', role: 'Storage Shard', description: 'Owns keys hashing between 0° and 120°.' },
      { id: 'ring-node-c', name: 'Ring Server Node C (240°)', role: 'Storage Shard', description: 'Owns keys hashing between 120° and 240°.' },
      { id: 'ring-node-d', name: 'New Server Node D (60°)', role: 'Elastic Scale Node', description: 'Absorbs keys cleanly from Node B without touching Nodes A or C.' },
    ],
    realWorldExample: {
      company: 'Amazon Dynamo & Apache Cassandra',
      scenario: 'Distributing petabytes across dynamic server rings where nodes join and fail routinely.',
      implementation: 'Cassandra assigns 16 to 256 virtual tokens (`vnodes`) per physical machine across the Murmur3 hash ring, automatically streaming only affected token ranges when nodes scale up or replace failed hardware.',
      scaleDetails: 'Enables zero-downtime elastic expansion across thousands of storage nodes.',
    },
    advantages: [
      'Only `K/N` keys move on node add/remove instead of ~100% under naive modulo.',
      'Virtual nodes balance uneven distribution and accommodate heterogeneous hardware sizes.',
    ],
    disadvantages: [
      'Slightly trickier to implement than naive `% N` (requires sorted ring structure + binary search).',
    ],
    relatedTopics: [
      { id: 'database-sharding', title: 'Database Sharding', module: 'system-design' },
      { id: 'load-balancing-algorithms', title: 'Load Balancing Algorithms', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why does naive `hash(key) % N` cause disasters when scaling a distributed cache?', answer: 'If N changes from 10 to 11 servers, nearly every single key produces a completely different remainder (`% 11 != % 10`), invalidating ~91% of cache lookups at once and causing a massive Database Stampede.', keyPoints: ['Changing N breaks ~90%+ mappings', 'Triggers massive DB Cache Stampede'] },
      { level: 'intermediate', question: 'What problem do "Virtual Nodes (Vnodes)" solve on a Consistent Hash Ring?', answer: 'If you only have 3 physical nodes, random hashing might drop two nodes right next to each other, leaving one server stuck holding 70% of the ring! By assigning each physical server 100+ Virtual Node tokens scattered around the ring, every physical node receives near-identical load even with small clusters—and bigger machines can get more Vnodes.', keyPoints: ['Prevents uneven arc clustering', 'Supports weighted heterogeneous hardware'] },
      { level: 'advanced', question: 'How does Consistent Hashing help replicate data cleanly in Dynamo/Cassandra?', answer: 'Instead of stopping at the first clockwise server, the coordinator simply walks clockwise past the first `R` distinct physical servers on the ring and writes replicas to all `R` nodes automatically (skipping duplicate virtual nodes belonging to the same physical host).', keyPoints: ['Walk clockwise to first N distinct physical nodes', 'Automatic fault-tolerant replication placement'] },
    ],
    quiz: [
      { id: 'ch-1', question: 'Approximately what fraction of K total keys must move when adding 1 node to an N-node Consistent Hash Ring?', options: ['K / N', '99% of K', 'All K keys', '0 keys'], correctAnswer: 0, explanation: 'Only the adjacent segment owned by the newly inserted node migrates (~K/N).' },
      { id: 'ch-2', question: 'Why are "Virtual Nodes" added to a Consistent Hash Ring?', options: ['To smooth out uneven key distribution across physical servers and support weighted capacities', 'To eliminate hash functions', 'To encrypt HTTP cookies', 'To turn off TCP'], correctAnswer: 0, explanation: 'Virtual nodes split physical ownership into dozens of uniform slices.' },
      { id: 'ch-3', question: 'Which direction do implementations conventionally scan from `hash(key)` to find the owning server?', options: ['Clockwise to the next server position', 'Strictly counter-clockwise 5 times', 'Random jump', 'Straight to index 0 always'], correctAnswer: 0, explanation: 'Keys snap clockwise to the next node along the ring.' },
      { id: 'ch-4', question: 'What data structure commonly stores ring positions for O(log V) clockwise node lookup?', options: ['Balanced BST (TreeMap) or sorted array + binary search', 'Unsorted stack', 'Plain text log', 'Single integer'], correctAnswer: 0, explanation: 'Sorted ring maps allow O(log V) `ceilingEntry` binary search.' },
      { id: 'ch-5', question: 'Which real-world database relies natively on a Consistent Hash Ring with virtual tokens?', options: ['Apache Cassandra & Amazon DynamoDB', 'SQLite single-file DB', 'Excel CSV', 'Windows Registry'], correctAnswer: 0, explanation: 'Dynamo and Cassandra pioneered ring-based consistent hashing.' },
    ],
  },

  'distributed-consensus-leader': {
    id: 'distributed-consensus-leader',
    title: 'Distributed Consensus & Leader Election (Raft & Paxos)',
    module: 'system-design',
    category: '9. Distributed Systems Core Concepts',
    readTime: '12 min',
    difficulty: 'Advanced',
    summary: 'Consensus algorithms (Raft, Paxos) allow unreliable distributed nodes to agree reliably on a single elected Leader and a consistent replicated state log even when machines crash or packets drop.',
    introduction: {
      definition: 'Distributed consensus ensures a cluster of nodes agrees on shared state values (such as "Who is the active Primary Database?" or "Which node holds this distributed lock?") despite network delays and node crashes, as long as a majority quorum stays online.',
      analogousStory: 'Imagine 5 committee members voting over flaky radio channels. No decision passes unless a strict majority (at least 3 of 5) raises their hands together. Even if 2 members drop offline, the remaining 3 still form a decisive quorum—and two minority subsets can NEVER simultaneously pass conflicting votes!',
      keyTakeaway: 'Odd-sized quorums (`2F + 1` nodes tolerate `F` failures) guarantee exactly ONE unambiguous Leader per election Term, preventing split-brain.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents catastrophic Split-Brain when choosing a single Primary database or cluster controller.',
        'Powers distributed locking, configuration metadata (Kubernetes etcd), and service discovery.',
        'Provides deterministic majority-quorum failover without manual sysadmin intervention.',
      ],
      realWorldImpact: 'Kubernetes relies entirely on etcd (Raft consensus) as its single source of truth; Kafka relies on KRaft.',
      metricsAffected: ['Election Timeout (ms)', 'Quorum Fault Tolerance (`(N-1)/2`)', 'Split-Brain Immunity'],
    },
    coreArchitecture: {
      description: 'Nodes transition between Follower, Candidate, and Leader states over numbered monotonic Terms using Raft Heartbeats and RequestVote RPCs.',
      components: [
        { name: 'Raft Leader Node', role: 'Log Coordinator', details: 'Accepts client writes, appends to followers, and broadcasts periodic heartbeats.' },
        { name: 'Follower Quorum Nodes', role: 'Replicators & Voters', details: 'Vote once per Term and replicate leader logs safely.' },
        { name: 'Randomized Election Timer', role: 'Split-Vote Breaker', details: '150–300ms randomized countdown prevents infinite tied votes.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Leader Heartbeat Stops', technicalDetail: 'If Leader crashes, Follower timeout fires after randomized 150-300ms.' },
        { stepNumber: 2, action: 'Candidate Requests Quorum Votes', technicalDetail: 'Follower increments Term, votes for itself, and sends `RequestVote` to peers.' },
        { stepNumber: 3, action: 'Majority Wins & Commits Log', technicalDetail: 'Upon securing >N/2 votes, new Leader starts heartbeating and replicating writes.' },
      ],
    },
    visualizationId: 'consensus-3d',
    visualizationScene: 'cap-theorem',
    visualizationModes: [
      { id: 'cp-mode', label: 'Raft Quorum Majority (Safe Commit)' },
      { id: 'ap-mode', label: 'Minority Partition (No Leader Allowed)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Quorum Majority Agrees on Leader', description: 'Nodes A and B form a majority quorum (2/3) and stay strongly consistent.', activeNodes: ['cap-node-a', 'cap-node-b'], packet: { from: 'cap-node-a', to: 'cap-node-b', label: 'AppendEntries Heartbeat (Term 4)', type: 'sync' } },
      { step: 2, title: 'Step 2: Isolated Minority Cannot Form Quorum', description: 'Because Node C is alone (1/3 < majority), Raft prevents it from electing itself leader—zero split-brain!', activeNodes: ['cap-node-c'], packet: { from: 'cap-node-a', to: 'cap-node-c', label: 'Minority Blocked (No Quorum)', type: 'blocked' } },
    ],
    interactiveComponents: [
      { id: 'cap-node-a', name: 'Raft Leader (Node A)', role: 'Elected Term Leader', description: 'Coordinates AppendEntries log replication across majority.' },
      { id: 'cap-node-b', name: 'Quorum Follower (Node B)', role: 'Majority Voter', description: 'Confirms leader heartbeats and persists entries.' },
      { id: 'cap-node-c', name: 'Partitioned Node C', role: 'Minority Node', description: 'Cannot achieve majority quorum alone, preventing dual-leader split-brain.' },
    ],
    realWorldExample: {
      company: 'Kubernetes (etcd) & CockroachDB',
      scenario: 'Coordinating cluster pod scheduling and distributed ACID transactions safely.',
      implementation: 'etcd runs Raft consensus across 3 or 5 odd-numbered control plane nodes. Even if an Availability Zone fails, the surviving majority continues committing cluster state cleanly with zero conflict.',
      scaleDetails: 'Powers every major cloud Kubernetes orchestration cluster globally.',
    },
    advantages: [
      'Mathematically eliminates Split-Brain corruption under network partitions.',
      'Raft breaks Paxos into clean understandable sub-problems: Leader Election + Log Replication.',
    ],
    disadvantages: [
      'Requires at least 3 nodes (odd counts: 3, 5, 7) and quorum RTT latency on writes.',
      'Not designed for massive multi-million throughput storage—keep consensus clusters small (3-5 nodes).',
    ],
    relatedTopics: [
      { id: 'cap-theorem', title: 'CAP Theorem', module: 'system-design' },
      { id: 'kafka-architecture', title: 'Kafka KRaft Architecture', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why should consensus clusters (like etcd or ZooKeeper) always have an ODD number of nodes (3 or 5 instead of 4)?', answer: 'A 3-node cluster needs a majority of 2 (tolerates 1 failure). A 4-node cluster needs a majority of 3 (STILL tolerates only 1 failure—4 minus 3 = 1!), so adding the 4th node gives ZERO extra fault tolerance while increasing replication overhead! Always choose odd counts (3, 5, 7).', keyPoints: ['3 nodes tolerate 1 failure; 4 nodes ALSO tolerate only 1 failure', 'Odd counts maximize fault tolerance per node'] },
      { level: 'intermediate', question: 'How does Raft prevent infinite tied elections ("Split Votes")?', answer: 'Every Follower picks a RANDOMIZED election timeout (e.g., 150ms–300ms). Because one node\'s timer almost always fires earlier than peers, it broadcasts RequestVote and wins a clean majority before other nodes even become Candidates.', keyPoints: ['Randomized election timeouts', 'One candidate requests votes first'] },
      { level: 'advanced', question: 'What is a "Fencing Token" in distributed locking?', answer: 'If Process A acquires a distributed lock, then freezes for 60s due to a long Garbage Collection pause, its lease expires and Process B acquires the lock. When Process A wakes up thinking it still holds the lock and writes to storage, it could corrupt B\'s write! Solution: Lock service returns a monotonically increasing Fencing Token (33, then 34), and the storage server rejects any stale write carrying token 33 after seeing 34.', keyPoints: ['Prevents GC-paused zombie lock holders from corrupting storage', 'Monotonically increasing fencing token validated by storage'] },
    ],
    quiz: [
      { id: 'cons-1', question: 'How many node failures can a 5-node Raft cluster survive while maintaining consensus?', options: ['2 failures (requires 3/5 quorum)', '4 failures', '1 failure only', 'Zero failures'], correctAnswer: 0, explanation: 'Majority quorum of 5 is 3, tolerating `(5 - 1) / 2 = 2` node crashes.' },
      { id: 'cons-2', question: 'Why do engineers prefer 3 nodes over 4 nodes in an etcd cluster?', options: ['Both tolerate only 1 failure, so a 4th node adds cost without extra resilience', '4 is an unlucky DNS port', 'Raft crashes on even integers', '3 nodes use 4x RAM'], correctAnswer: 0, explanation: 'Quorum of 4 is 3 (1 failure tolerance); quorum of 3 is 2 (also 1 failure tolerance).' },
      { id: 'cons-3', question: 'How does Raft break election ties when multiple candidates run simultaneously?', options: ['Randomized election timeouts', 'Alphabetical hostnames', 'Human operator intervention', 'Rebooting switches'], correctAnswer: 0, explanation: 'Randomized countdown timers ensure one candidate typically claims majority swiftly.' },
      { id: 'cons-4', question: 'What problem do monotonic "Fencing Tokens" solve?', options: ['Preventing a paused/zombie process whose lock expired from overwriting newer lock holders\' data', 'Compressing JSON strings', 'Encrypting TLS certificates', 'Speeding up CSS'], correctAnswer: 0, explanation: 'Storage verifies the monotonic token number to reject stale lock holders.' },
      { id: 'cons-5', question: 'Which statement describes the Raft "Leader"?', options: ['All client state mutations flow through the single elected Leader per Term', 'Every node acts as leader simultaneously', 'There is no leader', 'Clients elect leaders via DNS'], correctAnswer: 0, explanation: 'Raft enforces strong leadership where one node sequences log entries per term.' },
    ],
  },

  'idempotency-distributed-systems': {
    id: 'idempotency-distributed-systems',
    title: 'Idempotency in Distributed Systems & Safe Retries',
    module: 'system-design',
    category: '9. Distributed Systems Core Concepts',
    readTime: '7 min',
    difficulty: 'Intermediate',
    summary: 'Idempotency guarantees that executing the same operation multiple times—due to network retries or user double-clicks—produces the exact same end state as executing it once.',
    introduction: {
      definition: 'Mathematically, `f(f(x)) = f(x)`. In distributed systems, an API or message handler is idempotent if retrying a timed-out `POST /payments` request 5 times charges the user\'s credit card ONLY ONCE.',
      analogousStory: 'An elevator call button is idempotent: pressing "Up" 1 time or 10 times still summons one elevator once. By contrast, a bank ATM "Dispense $100" without idempotency would dispense $500 if pressed 5 times during a slow network glitch!',
      keyTakeaway: 'Because networks drop ACK replies routinely, safe automatic retries are IMPOSSIBLE without Idempotency Keys.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents catastrophic double-charging credit cards when mobile networks drop response packets.',
        'Allows safe At-Least-Once retries in Kafka/SQS message consumers.',
        'Eliminates duplicate orders when impatient users double-click "Pay Now".',
      ],
      realWorldImpact: 'Stripe, PayPal, and Uber enforce mandatory `Idempotency-Key` UUID headers across every financial mutation endpoint.',
      metricsAffected: ['Duplicate Charge Incident Rate (0%)', 'Safe Retry Success Rate'],
    },
    coreArchitecture: {
      description: 'Client attaches a UUID `Idempotency-Key` -> Server checks atomic key table in Redis/DB inside the same transaction -> returns cached result on repeat.',
      components: [
        { name: 'Idempotency Key Header', role: 'Unique Request Token', details: 'Client-generated UUIDv4 identifying a single logical intent.' },
        { name: 'Atomic Deduplication Store', role: 'State Lock', details: 'Stores `{key -> status + cached_response}` atomically inside SQL/Redis.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Generate UUID Client-Side', technicalDetail: 'Client creates `Idempotency-Key: 9f8a-...` before calling `POST /charge`.' },
        { stepNumber: 2, action: 'Atomic Insert & Execute', technicalDetail: 'First attempt locks key, charges card once, and persists HTTP 200 JSON result beside the key.' },
        { stepNumber: 3, action: 'Safe Retry Replay', technicalDetail: 'If connection drops and client retries with the same UUID, server returns saved HTTP 200 without charging again!' },
      ],
    },
    visualizationId: 'idempotency-3d',
    visualizationScene: 'circuit-breaker',
    visualizationModes: [
      { id: 'half-open', label: 'Network Timeout -> Safe Retry' },
      { id: 'closed', label: 'Normal Single Execution' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Initial Request with Idempotency-Key', description: 'Client sends `POST /pay` with unique UUID `key-842`. Payment succeeds, response cached.', activeNodes: ['cb-client', 'target-service'], packet: { from: 'cb-client', to: 'target-service', label: 'POST /pay [Key=842]', type: 'request' } },
      { step: 2, title: 'Step 2: Network Drops Reply -> Client Retries Safely', description: 'Timeout triggers retry with the SAME `Key=842`. Guard detects duplicate key and replays cached 200 OK without re-charging!', activeNodes: ['circuit-breaker', 'cb-client'], packet: { from: 'circuit-breaker', to: 'cb-client', label: 'Replay Cached 200 OK (Charged Once!)', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'cb-client', name: 'Retrying Mobile Client', role: 'Sender', description: 'Reuses identical Idempotency-Key across retries for the same action.' },
      { id: 'circuit-breaker', name: 'Idempotency Deduplication Guard', role: 'Replay & Lock Layer', description: 'Stores request key outcomes atomically to block double charges.' },
      { id: 'target-service', name: 'Payment Ledger Engine', role: 'Protected Backend', description: 'Executes financial mutation exactly once.' },
    ],
    realWorldExample: {
      company: 'Stripe Payments API',
      scenario: 'Charging credit cards reliably over flaky mobile 4G/5G networks.',
      implementation: 'Stripe stores `Idempotency-Key` entries alongside exact HTTP responses for 24 hours. Concurrent identical requests get a `409 Conflict` lock error while completed retries immediately replay the saved receipt.',
      scaleDetails: 'Eliminates double-charges across hundreds of billions of dollars in annual payment volume.',
    },
    advantages: [
      'Makes automatic client/worker retries 100% safe without financial duplication.',
    ],
    disadvantages: [
      'Requires durable atomic storage and TTL cleanup of idempotency keys.',
    ],
    relatedTopics: [
      { id: 'circuit-breaker-pattern', title: 'Circuit Breaker Pattern', module: 'system-design' },
      { id: 'message-queues-brokers', title: 'Message Queues', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Which standard HTTP methods are naturally idempotent, and which one is NOT?', answer: 'GET, PUT, and DELETE are idempotent by spec (setting `user.name = "Bob"` via PUT 5 times leaves `name = "Bob"`). `POST` (creating a new order or payment) is NOT naturally idempotent unless you enforce an `Idempotency-Key`.', keyPoints: ['GET, PUT, DELETE = Idempotent', 'POST = Not idempotent without explicit key'] },
      { level: 'intermediate', question: 'Why should the Client generate the Idempotency-Key UUID instead of the Server generating it?', answer: 'If the first HTTP request drops before reaching the client or times out mid-flight, the client wouldn\'t even know the server\'s ID when retrying! Generating the UUID on the client BEFORE sending ensures every retry shares the exact same key.', keyPoints: ['Client generates UUID before first attempt', 'Retries reuse identical UUID'] },
      { level: 'advanced', question: 'What happens if two concurrent threads submit the SAME Idempotency-Key at the exact same millisecond before the first finishes?', answer: 'Use a database `UNIQUE` constraint or Redis `SETNX` atomic lock (`IN_PROGRESS` status). Thread 1 acquires the lock and processes; Thread 2 sees `IN_PROGRESS` and immediately receives `409 Conflict` / `425 Too Early` asking it to retry shortly until Thread 1 commits the final cached response.', keyPoints: ['Atomic unique lock (`IN_PROGRESS`) prevents concurrent race execution', 'Second thread gets 409/retry until first commits'] },
    ],
    quiz: [
      { id: 'idm-1', question: 'Who must generate the `Idempotency-Key` UUID for a safe payment retry?', options: ['The Client, before sending the first request', 'The Server, after finishing the payment', 'The DNS resolver', 'The firewall'], correctAnswer: 0, explanation: 'Only a client-generated key guarantees all retries carry the same identifier if replies drop.' },
      { id: 'idm-2', question: 'Which HTTP method is NOT idempotent by default?', options: ['POST', 'GET', 'PUT', 'DELETE'], correctAnswer: 0, explanation: 'Repeating POST typically creates duplicate resources unless guarded by an idempotency key.' },
      { id: 'idm-3', question: 'How does storing the Idempotency Key in the SAME SQL ACID transaction as the account debit help?', options: ['Ensures key recording and balance deduction either both commit or both roll back atomically', 'Makes TCP run on layer 1', 'Compresses images', 'Disables TLS'], correctAnswer: 0, explanation: 'Atomic DB commits prevent a crash between debit and deduplication recording.' },
      { id: 'idm-4', question: 'What should a server return if an already-completed Idempotency Key is sent again with the same payload?', options: ['The exact saved original HTTP response without re-executing the charge', 'A second double charge', 'HTTP 404 forever', 'Server shutdown'], correctAnswer: 0, explanation: 'Replaying the cached response fulfills retries seamlessly.' },
      { id: 'idm-5', question: 'Why is idempotency mandatory in At-Least-Once Kafka/SQS consumers?', options: ['Duplicate deliveries occur on network/worker retries, and consumers must safely ignore repeats', 'Kafka deletes keys before read', 'Queues cannot hold numbers', 'Consumers run on 1-bit CPUs'], correctAnswer: 0, explanation: 'Deduplicating message IDs guarantees effectively-once state mutations.' },
    ],
  },

  'circuit-breaker-pattern': {
    id: 'circuit-breaker-pattern',
    title: 'Circuit Breaker Pattern (Closed, Open & Half-Open States)',
    module: 'system-design',
    category: '10. Distributed System Design Patterns',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'The Circuit Breaker pattern wraps fragile network calls in a stateful proxy that trips OPEN when errors surge—failing fast immediately instead of letting slow timeouts exhaust caller threads.',
    introduction: {
      definition: 'Inspired by household electrical breakers, a software Circuit Breaker tracks failures over a rolling window across three states: CLOSED (normal traffic passes), OPEN (breaker tripped—requests fail immediately without calling the dying service), and HALF-OPEN (allows limited test probes to verify recovery).',
      analogousStory: 'If a kitchen toaster short-circuits, the electrical breaker flips OPEN immediately—cutting power before the wires overheat and burn down the entire house. Once you unplug the broken toaster, you flip the switch back to test if power stays stable.',
      keyTakeaway: 'Failing fast in 0.1ms saves your entire platform; hanging for 30s timeouts kills every upstream microservice.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents cascading outages when one downstream API stalls under load.',
        'Protects upstream connection/thread pools from saturating on dead sockets.',
        'Gives struggling downstream dependencies breathing room (zero traffic) to recover gracefully.',
      ],
      realWorldImpact: 'Pioneered at scale by Netflix Hystrix and now built natively into Resilience4j, Polly, Envoy, and Istio service meshes.',
      metricsAffected: ['Upstream Thread Pool Saturation', 'Fail-Fast Latency (<1ms)', 'Downstream Recovery Speed'],
    },
    coreArchitecture: {
      description: 'State machine tracking rolling failure percentage across CLOSED -> OPEN -> HALF-OPEN transitions.',
      components: [
        { name: 'CLOSED State (Green)', role: 'Normal Operation', details: 'Forwards calls normally; counts timeouts and 5xx failures in sliding window.' },
        { name: 'OPEN State (Red Tripped)', role: 'Fail-Fast Protection', details: 'Short-circuits calls instantly to local Fallback without touching downstream service.' },
        { name: 'HALF-OPEN State (Amber)', role: 'Recovery Probe', details: 'After cooldown timeout, lets N trial calls through; closes on success or re-opens on failure.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'CLOSED Monitoring', technicalDetail: 'Failure threshold (e.g. >50% of last 20 calls failed) trips breaker.' },
        { stepNumber: 2, action: 'OPEN Fast Fallback', technicalDetail: 'During 30s cooldown, breaker returns cached/default fallback in <1ms.' },
        { stepNumber: 3, action: 'HALF-OPEN Testing', technicalDetail: 'Allows 3 probe requests; if all pass 200 OK, resets back to CLOSED.' },
      ],
    },
    visualizationId: 'cb-3d',
    visualizationScene: 'circuit-breaker',
    visualizationModes: [
      { id: 'closed', label: 'CLOSED (Healthy Flow)' },
      { id: 'open', label: 'OPEN (Tripped - Fail Fast)' },
      { id: 'half-open', label: 'HALF-OPEN (Probing Recovery)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: CLOSED State (Healthy Traffic)', description: 'Switch arm sits flat closed; requests flow straight through to healthy downstream service.', activeNodes: ['cb-client', 'circuit-breaker', 'target-service'], packet: { from: 'cb-client', to: 'target-service', label: 'CLOSED: Normal 200 OK', type: 'request' } },
      { step: 2, title: 'Step 2: OPEN State (Breaker Flipped Open!)', description: 'Downstream errors breach 50%! Click OPEN above to see the physical breaker flip open and bounce requests back immediately.', activeNodes: ['cb-client', 'circuit-breaker'], packet: { from: 'circuit-breaker', to: 'cb-client', label: 'OPEN: Fail-Fast Fallback', type: 'blocked' } },
      { step: 3, title: 'Step 3: HALF-OPEN Probe Recovery', description: 'Click HALF-OPEN above! After cooldown, a single probe packet tests whether the target recovered.', activeNodes: ['circuit-breaker', 'target-service'], packet: { from: 'circuit-breaker', to: 'target-service', label: 'HALF-OPEN: Trial Probe', type: 'sync' } },
    ],
    interactiveComponents: [
      { id: 'cb-client', name: 'Caller Microservice', role: 'Protected Upstream', description: 'Avoids thread exhaustion by receiving immediate fallback answers.' },
      { id: 'circuit-breaker', name: 'Circuit Breaker Switch', role: '3-State FSM', description: 'Transitions CLOSED <-> OPEN <-> HALF-OPEN automatically.' },
      { id: 'target-service', name: 'Downstream Payment/Recs API', role: 'Monitored Target', description: 'Protected from stampede traffic while recovering.' },
    ],
    realWorldExample: {
      company: 'Netflix / Envoy Service Mesh',
      scenario: 'Isolating struggling microservices across thousands of distributed nodes.',
      implementation: 'Envoy sidecars enforce outlier detection and circuit breaking per cluster—ejecting unhealthy pods within milliseconds and serving fallback recommendations cleanly.',
      scaleDetails: 'Stops minor zone degradation from escalating into global site outages.',
    },
    advantages: [
      'Prevents cascading thread exhaustion.',
      'Accelerates degraded-mode fallback latency down to sub-millisecond.',
      'Enables self-healing recovery probes automatically.',
    ],
    disadvantages: [
      'Threshold tuning (window size, error percentage, cooldown) requires careful production calibration.',
      'Must pair with meaningful Fallbacks (cached defaults or graceful UI alerts).',
    ],
    relatedTopics: [
      { id: 'fault-tolerance', title: 'Fault Tolerance & Redundancy', module: 'system-design' },
      { id: 'idempotency-distributed-systems', title: 'Idempotency', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Describe all 3 states of the Circuit Breaker Pattern.', answer: '1) CLOSED: Requests pass normally while errors are counted. 2) OPEN: Errors crossed threshold; breaker blocks downstream calls immediately and invokes a fallback for a cooldown period. 3) HALF-OPEN: After cooldown, lets a few test calls through—if they succeed, resets to CLOSED; if they fail, snaps back to OPEN.', keyPoints: ['CLOSED = Pass + monitor', 'OPEN = Block + fast fallback', 'HALF-OPEN = Test recovery'] },
      { level: 'intermediate', question: 'Why should Circuit Breakers pair with Timeouts and NOT wrap fast local in-memory checks?', answer: 'If a call has no timeout and hangs for 120 seconds before failing, threads block long before errors even register! Strict short timeouts detect stalled calls quickly so the Circuit Breaker can trip OPEN in seconds.', keyPoints: ['Always configure strict timeouts inside breakers', 'Only wrap remote I/O / fragile dependencies'] },
      { level: 'advanced', question: 'Should a `404 Not Found` or `400 Bad Request` trip a Circuit Breaker?', answer: 'NO! 4xx client errors indicate bad user input or missing entities—the downstream server itself is completely healthy! Only infrastructure/availability failures (`5xx`, network connection refused, socket timeouts) should increment the Circuit Breaker error counter.', keyPoints: ['Only count 5xx & timeouts', 'Exclude 4xx user-input errors'] },
    ],
    quiz: [
      { id: 'cb-1', question: 'What happens immediately when a Circuit Breaker transitions into the OPEN state?', options: ['Calls to the failing service are skipped completely and a fast fallback response returns immediately', 'It retries infinitely in a loop', 'It deletes the database', 'It disables TLS'], correctAnswer: 0, explanation: 'OPEN short-circuits calls immediately without waiting on dying downstream hosts.' },
      { id: 'cb-2', question: 'Which state allows a small controlled number of test calls through after a cooldown period?', options: ['HALF-OPEN', 'CLOSED', 'PERMANENT-LOCK', 'UDP-OPEN'], correctAnswer: 0, explanation: 'HALF-OPEN tests whether the downstream service has recovered.' },
      { id: 'cb-3', question: 'Which HTTP error codes should NOT trigger a Circuit Breaker trip?', options: ['400 Bad Request / 404 Not Found (Client errors)', '503 Service Unavailable', '504 Gateway Timeout', 'TCP Connection Timeout'], correctAnswer: 0, explanation: '4xx responses reflect valid service health reacting to bad client inputs.' },
      { id: 'cb-4', question: 'What happens if a HALF-OPEN probe call succeeds?', options: ['The Circuit Breaker resets back to CLOSED normal traffic flow', 'The server shuts down', 'It blocks all future traffic', 'It flips to DNS'], correctAnswer: 0, explanation: 'Passing probe thresholds restores normal CLOSED flow.' },
      { id: 'cb-5', question: 'Which pattern isolates thread pools per dependency alongside Circuit Breakers?', options: ['Bulkhead Pattern', 'Singleton Pattern', 'Subnet Masking', '3NF Normalization'], correctAnswer: 0, explanation: 'Bulkheads isolate pools so one dependency cannot consume all threads.' },
    ],
  },

  'saga-pattern': {
    id: 'saga-pattern',
    title: 'Saga Pattern for Distributed Transactions (Choreography vs Orchestration)',
    module: 'system-design',
    category: '10. Distributed System Design Patterns',
    readTime: '10 min',
    difficulty: 'Advanced',
    summary: 'Because Two-Phase Commit (2PC) kills availability across microservices, the Saga pattern sequences local ACID transactions paired with compensating rollback actions if any downstream step fails.',
    introduction: {
      definition: 'A Saga breaks a distributed business transaction (e.g., Book Flight + Book Hotel + Charge Card) into a chain of local ACID transactions across independent microservices. If Step 3 fails, the Saga triggers compensating undo actions for Steps 2 and 1.',
      analogousStory: 'When planning a vacation across separate airlines and hotels, there is no universal lock button freezing both computers simultaneously. You book the flight (Step 1), then book the hotel (Step 2), then pay (Step 3). If your card declines at Step 3, you immediately run the cancellation steps for the hotel and flight (Compensating Transactions)!',
      keyTakeaway: 'Sagas trade strict ACID Isolation for high microservice availability—replacing locks with Compensating Rollback transactions.',
    },
    whyRequired: {
      problemsSolved: [
        'Replaces blocking Two-Phase Commit (2PC) locks that freeze microservices during cross-service writes.',
        'Maintains business consistency across Database-per-Service microservices.',
      ],
      realWorldImpact: 'Used across travel booking engines (Expedia, Airbnb), e-commerce fulfillment, and ride-hailing transactions.',
      metricsAffected: ['Cross-Service Availability', 'Lock Contention Elimination', 'Compensating Recovery Accuracy'],
    },
    coreArchitecture: {
      description: 'Compare Event Choreography (services react via Event Bus) vs Central Saga Orchestrator (coordinator state machine directs commands).',
      components: [
        { name: 'Saga Orchestrator / Coordinator', role: 'Central State Machine', details: 'Commands Order -> Inventory -> Payment sequentially and dispatches explicit Undo commands on failure.' },
        { name: 'Domain Microservices', role: 'Local ACID Steps', details: 'Each service executes atomic local commits + idempotent compensating undo actions.' },
        { name: 'Event Bus', role: 'Choreography Spine', details: 'Publishes Success and Failure compensation events reliably.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Step 1: Reserve Order (PENDING)', technicalDetail: 'Order Service commits pending order locally (Pivot/Semantic Lock).' },
        { stepNumber: 2, action: 'Step 2: Charge Payment', technicalDetail: 'Payment Service charges account or emits `PaymentFailed`.' },
        { stepNumber: 3, action: 'Step 3: Compensate or Finalize', technicalDetail: 'On success -> Notify user! On failure -> Compensating action marks Order CANCELLED and releases inventory.' },
      ],
    },
    visualizationId: 'saga-3d',
    visualizationScene: 'microservices',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Order Service Starts Local ACID Transaction', description: 'Order Service creates Order in PENDING state and initiates distributed Saga.', activeNodes: ['api-gateway', 'order-service'], packet: { from: 'api-gateway', to: 'order-service', label: 'Step 1: Create Pending Order', type: 'request' } },
      { step: 2, title: 'Step 2: Event Bus Triggers Downstream Saga Steps', description: 'OrderCreated flows through Event Bus toward Payment Service.', activeNodes: ['order-service', 'event-bus', 'payment-service'], packet: { from: 'event-bus', to: 'payment-service', label: 'Step 2: Charge Card', type: 'sync' } },
      { step: 3, title: 'Step 3: Finalize or Compensating Rollback', description: 'If Payment succeeds -> Notification sends receipt. If Payment fails -> Refund/Cancel compensating transaction runs backwards!', activeNodes: ['payment-service', 'notification-service'], packet: { from: 'event-bus', to: 'notification-service', label: 'Complete or Compensate!', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'api-gateway', name: 'Saga Entry / Orchestrator', role: 'Workflow Trigger', description: 'Tracks state progress and coordinates compensation steps.' },
      { id: 'order-service', name: 'Order Service (Step 1)', role: 'Compensatable Step', description: 'Undo action: Cancel Order & Release Stock.' },
      { id: 'payment-service', name: 'Payment Service (Step 2)', role: 'Pivot Transaction', description: 'Executes charge or triggers rollback events.' },
      { id: 'notification-service', name: 'Notification Service (Step 3)', role: 'Retryable Confirmation', description: 'Sends confirmation or cancellation alert.' },
      { id: 'event-bus', name: 'Reliable Event Spine', role: 'Saga Messaging', description: 'Persists transition states reliably.' },
      { id: 'user-service', name: 'User Account Context', role: 'Supporting Entity', description: 'Provides customer metadata.' },
    ],
    realWorldExample: {
      company: 'Uber / Airbnb Booking Pipelines',
      scenario: 'Coordinating payments, host calendars, tax compliance, and confirmation alerts across separate microservices.',
      implementation: 'Uber uses Temporal/Cadence (durable workflow Orchestrator Sagas) so if any downstream service crashes mid-booking, the orchestrator resumes cleanly or executes explicit compensating refunds without ever leaving half-booked states.',
      scaleDetails: 'Executes millions of durable workflows reliably across multi-step pipelines.',
    },
    advantages: [
      'Avoids distributed locking bottlenecks of Two-Phase Commit (2PC).',
      'Preserves microservice autonomy and independent databases.',
    ],
    disadvantages: [
      'Lacks Isolation (dirty reads possible while Saga is mid-flight unless using Semantic Locks like `PENDING` status).',
      'Engineers must carefully code idempotent Compensating Transactions for every forward step.',
    ],
    relatedTopics: [
      { id: 'monolith-vs-microservices', title: 'Microservices Architecture', module: 'system-design' },
      { id: 'cqrs-event-sourcing', title: 'CQRS & Event Sourcing', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why is Two-Phase Commit (2PC) avoided in modern microservices?', answer: '2PC holds blocking database locks across multiple network nodes simultaneously while waiting for a central coordinator. If one service or the coordinator crashes mid-protocol, all participating databases remain locked and unavailable!', keyPoints: ['Blocking locks across networks', 'Coordinator crash freezes all participating DBs'] },
      { level: 'intermediate', question: 'Compare Saga Choreography vs Saga Orchestration.', answer: 'In Choreography, there is no central coordinator—each service listens to events and emits the next event (simple for 2-3 steps, messy spaghetti for 10+ steps). In Orchestration, a dedicated central Orchestrator tells each service what to do and tracks state explicitly (great for complex 5-15 step workflows).', keyPoints: ['Choreography = Decentralized events (2-3 steps)', 'Orchestration = Central workflow engine (complex flows)'] },
      { level: 'advanced', question: 'What is a "Semantic Lock" countermeasure for Saga\'s missing Isolation?', answer: 'Because Step 1 commits immediately before Step 3 finishes, another user could see an uncommitted order halfway done (lack of Isolation). Fix this using a Semantic Lock: mark the Order row with `status = "APPROVAL_PENDING"` during Step 1, and only flip it to `CONFIRMED` once the final Saga step completes.', keyPoints: ['Mitigates lack of ACID isolation', 'Uses explicit `PENDING` intermediate status flags'] },
    ],
    quiz: [
      { id: 'sg-1', question: 'How does the Saga Pattern roll back changes when Step 3 fails across microservices?', options: ['By executing explicit Compensating Transactions to undo Steps 2 and 1', 'By executing a single SQL `ROLLBACK` across 4 separate servers', 'By restarting every server', 'It leaves invalid partial orders forever'], correctAnswer: 0, explanation: 'Compensating transactions semantically reverse earlier local commits.' },
      { id: 'sg-2', question: 'Which Saga variant uses a central coordinator state machine to invoke each service step?', options: ['Orchestration Saga', 'Choreography Saga', '2-Phase Locking', 'Star Bus'], correctAnswer: 0, explanation: 'An Orchestrator directs step sequencing and rollback paths centrally.' },
      { id: 'sg-3', question: 'Why is Saga Choreography difficult when workflows exceed 8-10 microservices?', options: ['Cyclic event dependencies become hard to trace and debug across decoupled queues', 'Queues drop integers', 'HTTP stops working', 'Databases refuse strings'], correctAnswer: 0, explanation: 'Too many decentralized event hops create complex implicit workflows.' },
      { id: 'sg-4', question: 'Which ACID property is explicitly relaxed by the Saga Pattern?', options: ['Isolation (I)', 'Atomicity of single local steps', 'Durability', 'HTTPS'], correctAnswer: 0, explanation: 'Sagas commit intermediate local changes visibly before the full flow finishes.' },
      { id: 'sg-5', question: 'What helps mitigate Saga\'s relaxed Isolation so other users don\'t act on half-complete rows?', options: ['Semantic Locks (e.g., setting `status = PENDING` until Saga completes)', 'Removing primary keys', 'Turning off databases', 'Using UDP'], correctAnswer: 0, explanation: 'Pending flags prevent external actions on in-flight transactions.' },
    ],
  },

  'cqrs-event-sourcing': {
    id: 'cqrs-event-sourcing',
    title: 'CQRS & Event Sourcing',
    module: 'system-design',
    category: '10. Distributed System Design Patterns',
    readTime: '11 min',
    difficulty: 'Advanced',
    summary: 'CQRS separates Read models from Write models for independent scaling and tailored schemas; Event Sourcing stores every state mutation as an immutable sequence of historical events rather than overwriting current values.',
    introduction: {
      definition: 'Command Query Responsibility Segregation (CQRS) splits data mutations (Commands) from data lookups (Queries) into distinct pipelines and often separate databases. Event Sourcing persists an append-only ledger of all historical events (`Deposited $50`, `Withdrew $20`) instead of overwriting `balance = $30`.',
      analogousStory: 'Your bank statement is Event Sourced: the bank doesn\'t just store one mutable cell saying `Balance: $420`; it stores every chronological deposit and withdrawal line item so you can audit exactly how $420 happened! CQRS is having a strict locked vault teller handle deposits (Commands) while fast digital kiosk screens show pre-formatted summaries (Queries).',
      keyTakeaway: 'CQRS optimizes mismatched read/write workloads independently; Event Sourcing gives a 100% lossless audit trail and time-travel debugging.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates heavy read/write contention where complex reporting queries lock transactional write tables.',
        'Lets the Write store stay normalized/ACID while Read projections use ElasticSearch or Redis optimized views.',
        'Provides regulatory audit logs and state time-travel ("What was balance on Nov 1st?") automatically.',
      ],
      realWorldImpact: 'Fintech ledgers, version control systems (Git!), accounting engines, and multiplayer game state sync rely on Event Sourcing + CQRS.',
      metricsAffected: ['Independent Read vs Write Scaling', 'Auditability (100% Traceable)', 'Projection Lag'],
    },
    coreArchitecture: {
      description: 'Commands validate and append events to Write Event Store -> Async Event Projector updates tailored Read Views (SQL, Elasticsearch, Redis).',
      components: [
        { name: 'Command Write Model', role: 'Validation & Append', details: 'Validates business invariants and appends immutable events atomically.' },
        { name: 'Event Projector Stream', role: 'Async View Synchronizer', details: 'Consumes event stream to build optimized Read Views.' },
        { name: 'Read Query Store', role: 'Tailored Fast Projections', details: 'Zero-join denormalized tables or Elasticsearch indexes answering UI queries in <5ms.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Issue Command', technicalDetail: 'Client sends Command (`WithdrawMoney`). Write side validates balance and appends Event.' },
        { stepNumber: 2, action: 'Stream to Read Projectors', technicalDetail: 'Event emits to stream projectors updating Read Replicas / Elasticsearch.' },
        { stepNumber: 3, action: 'Fast Query Lookup', technicalDetail: 'Client Queries read pre-computed fast projections without touching Write DB.' },
      ],
    },
    visualizationId: 'cqrs-3d',
    visualizationScene: 'database-replication',
    visualizationModes: [
      { id: 'async-replication', label: 'CQRS Async Read Projection' },
      { id: 'sync-replication', label: 'Strict Sync Ledger' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Command Appends Event to Write Store', description: 'Write Service validates invariants and appends immutable domain event to Write Store.', activeNodes: ['write-client', 'primary-db'], packet: { from: 'write-client', to: 'primary-db', label: 'Command -> Append Event', type: 'request' } },
      { step: 2, title: 'Step 2: Event Stream Updates Read Projections', description: 'Async Projectors update specialized Read Models (SQL Views / Search / Redis) without blocking writers.', activeNodes: ['primary-db', 'replica-3'], packet: { from: 'primary-db', to: 'replica-3', label: 'Project Optimized Read Model', type: 'sync' } },
      { step: 3, title: 'Step 3: Query Side Reads Denormalized View', description: 'Read clients query specialized read stores independently at hyper-scale.', activeNodes: ['read-client', 'replica-3'], packet: { from: 'read-client', to: 'replica-3', label: 'Query Optimized View (2ms)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'write-client', name: 'Command Side (Mutations)', role: 'Write Handler', description: 'Processes create/update commands cleanly.' },
      { id: 'primary-db', name: 'Immutable Event / Write Store', role: 'Append-Only Truth', description: 'Stores chronological domain events.' },
      { id: 'replica-3', name: 'Query Read Projection DB', role: 'Optimized Read Store', description: 'Tailored pre-joined models for instant UI retrieval.' },
      { id: 'read-client', name: 'Query Side (UI Readers)', role: 'Fast Consumer', description: 'Queries read models without contending with writers.' },
    ],
    realWorldExample: {
      company: 'Fintech Ledgers & Apache Kafka / Debezium Stacks',
      scenario: 'Powering instant full-text search and complex dashboards over strict ACID banking transactions.',
      implementation: 'Commands write transactions into normalized PostgreSQL / Event Logs; Debezium CDC streams events into Elasticsearch (for instant search) and Redis (for live dashboards)—forming a seamless CQRS split.',
      scaleDetails: 'Allows zero-lag search and reporting without degrading core ledger TPS.',
    },
    advantages: [
      'Scales read and write databases using completely different storage engines!',
      'Event Sourcing provides complete historical auditing and temporal state reconstruction.',
    ],
    disadvantages: [
      'Introduces Eventual Consistency between Write commit and Read view update.',
      'Significantly increases architectural complexity—avoid for basic CRUD apps.',
    ],
    relatedTopics: [
      { id: 'kafka-architecture', title: 'Apache Kafka Architecture', module: 'system-design' },
      { id: 'normalization-denormalization', title: 'Normalization vs Denormalization', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Do you HAVE to use Event Sourcing to implement CQRS?', answer: 'No! CQRS simply separates the Read model from the Write model (e.g., writing to PostgreSQL and syncing projections to Elasticsearch/Redis). Event Sourcing is an optional pairing that replaces mutable state rows with an append-only event log.', keyPoints: ['CQRS can work with standard SQL + Read Replicas/Elasticsearch', 'Event Sourcing is optional'] },
      { level: 'intermediate', question: 'In Event Sourcing, if an account has 10 million historical events, doesn\'t replaying from event #1 take forever?', answer: 'Yes—so Event Sourced systems periodically save "Snapshots" (e.g., every 1,000 events, store `Snapshot(event=1000, balance=$540)`). To load state, you fetch the latest Snapshot and only replay events occurring AFTER event #1000!', keyPoints: ['Use periodic Snapshots to bound replay length'] },
      { level: 'advanced', question: 'Why is mutating schemas hard in Event Sourcing, and how do teams handle it?', answer: 'Because historical events stored 3 years ago are immutable, changing an event\'s schema breaks old replay code! Teams use Event Upcasting (lightweight versioned adapters that upgrade `OrderPlacedV1` into `OrderPlacedV2` in memory during replay).', keyPoints: ['Historical events are immutable', 'Use Versioned Upcasters during replay'] },
    ],
    quiz: [
      { id: 'cq-1', question: 'What does CQRS stand for?', options: ['Command Query Responsibility Segregation', 'Cache Queue Replication Sync', 'Client Quick Routing Service', 'Consistent Quorum Read Storage'], correctAnswer: 0, explanation: 'CQRS decouples write commands from read queries.' },
      { id: 'cq-2', question: 'How does Event Sourcing persist current entity state?', options: ['By appending immutable domain events chronologically rather than overwriting current state in place', 'By deleting old rows daily', 'By saving HTML screenshots', 'By keeping values solely in browser cookies'], correctAnswer: 0, explanation: 'Current state is derived by folding immutable historical events.' },
      { id: 'cq-3', question: 'How do Event Sourced systems avoid replaying millions of events from day 1 on every read?', options: ['Periodic State Snapshots', 'Disabling reads', 'Deleting event history every hour', 'Turning off databases'], correctAnswer: 0, explanation: 'Snapshots let systems resume folding from a recent checkpoint.' },
      { id: 'cq-4', question: 'What consistency trade-off occurs when CQRS uses async projectors to update a separate Elasticsearch Read Store?', options: ['Eventual Consistency (brief projection delay between write and read visibility)', 'Strong Instant ACID Locks', 'Zero write capacity', 'Loss of indexes'], correctAnswer: 0, explanation: 'Async projection introduces slight propagation delay.' },
      { id: 'cq-5', question: 'Which classic developer tool works conceptually like an immutable Event Sourced log?', options: ['Git commit history', 'A volatile calculator variable', 'An unplugged ethernet cable', 'Static CSS'], correctAnswer: 0, explanation: 'Git appends immutable commit deltas rather than overwriting history.' },
    ],
  },

  'vertical-vs-horizontal-scaling': {
    id: 'vertical-vs-horizontal-scaling',
    title: 'Vertical Scaling, Horizontal Scaling & Auto-Scaling',
    module: 'system-design',
    category: '11. Scalability & Performance Engineering',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'Vertical scaling ("Scale Up") upgrades a single machine\'s CPU/RAM; Horizontal scaling ("Scale Out") adds more machines behind a load balancer for near-infinite capacity and fault tolerance.',
    introduction: {
      definition: 'Vertical Scaling increases capacity by moving to bigger hardware (e.g., 4 cores -> 128 cores). Horizontal Scaling increases capacity by multiplying commodity machines into a distributed cluster.',
      analogousStory: 'Vertical scaling is replacing a delivery van with a massive monster freight truck—eventually roads and bridges limit how big one vehicle can grow. Horizontal scaling is buying a fleet of 50 agile delivery vans sharing routes via a dispatcher.',
      keyTakeaway: 'Vertical scaling is simple and fast initially (zero code changes); Horizontal scaling is mandatory for high availability and planetary cloud scale.',
    },
    whyRequired: {
      problemsSolved: [
        'Breaks through physical silicon ceilings of a single CPU/motherboard.',
        'Eliminates single-machine downtime during upgrades or crashes.',
        'Allows elastic cloud Auto-Scaling (scale out during daytime peaks, scale in at 3 AM to save 60% cloud bills).',
      ],
      realWorldImpact: 'Every Kubernetes Horizontal Pod Autoscaler (HPA) and AWS Auto Scaling Group scales compute horizontally on live CPU/RPS metrics.',
      metricsAffected: ['Throughput Ceiling', 'Hardware Single Point of Failure', 'Cloud Cost Elasticity'],
    },
    coreArchitecture: {
      description: 'Compare single mega-instance topology against Load Balancer + stateless auto-scaling pod fleet.',
      components: [
        { name: 'Load Balancer', role: 'Horizontal Entry Point', details: 'Distributes traffic dynamically as auto-scaling adds or removes pods.' },
        { name: 'Stateless Worker Fleet', role: 'Elastic Compute', details: 'Identical containers sharing zero local state (delegated to Redis/DB).' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Monitor Metrics', technicalDetail: 'Autoscaler watches CPU %, RAM %, or Queue Depth.' },
        { stepNumber: 2, action: 'Scale Out (Add Pods)', technicalDetail: 'When CPU > 70% for 2 mins, launch new stateless containers and register with Load Balancer.' },
        { stepNumber: 3, action: 'Scale In (Save Cost)', technicalDetail: 'When traffic subsides overnight, drain connections gracefully and terminate excess instances.' },
      ],
    },
    visualizationId: 'scaling-3d',
    visualizationScene: 'scaling-architecture',
    visualizationModes: [
      { id: 'horizontal', label: 'Horizontal Scaling (Scale Out Fleet)' },
      { id: 'vertical', label: 'Vertical Scaling (Scale Up 1 Server)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Compare Horizontal Fleet vs Vertical Super-Server', description: 'Toggle Vertical vs Horizontal above! Horizontal scaling spreads traffic safely across independent pods.', activeNodes: ['scale-client', 'scale-lb'], packet: { from: 'scale-lb', to: 'node-1', label: 'Scale Out Pods', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'scale-client', name: 'Traffic Surge', role: 'Load Demand', description: 'Spikes during peak daytime hours or sales events.' },
      { id: 'scale-lb', name: 'Auto-Scale Load Balancer', role: 'Fleet Dispatcher', description: 'Automatically discovers newly booted pods.' },
      { id: 'node-1', name: 'Stateless Pod #1', role: 'Elastic Instance', description: 'Scales horizontally with zero downtime.' },
      { id: 'vertical-server', name: 'Vertical Monolith Machine', role: 'Scale-Up Single Node', description: 'Hits physical ceiling and suffers downtime on upgrades.' },
    ],
    realWorldExample: {
      company: 'Netflix / Spotify Cloud Elasticity',
      scenario: 'Evening viewing traffic surges 4x higher than 4 AM lows every single day.',
      implementation: 'Predictive and reactive Auto-Scaling spins up thousands of additional stateless AWS compute nodes right before evening prime time and scales them back overnight.',
      scaleDetails: 'Saves tens of millions annually in cloud compute expenses while preventing evening outages.',
    },
    advantages: [
      'Vertical: Zero distributed architecture complexity; preserves simple single-node SQL transactions.',
      'Horizontal: Virtually unlimited scale ceiling, zero-downtime upgrades, automatic crash resilience.',
    ],
    disadvantages: [
      'Vertical: Hard hardware limit, expensive super-servers, downtime during resizing, SPOF.',
      'Horizontal: Requires stateless code, load balancers, and externalized session/DB management.',
    ],
    relatedTopics: [
      { id: 'load-balancing-fundamentals', title: 'Load Balancing', module: 'system-design' },
      { id: 'database-sharding', title: 'Database Sharding', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Summarize Vertical vs Horizontal Scaling in one sentence each.', answer: 'Vertical scaling ("Scale Up") upgrades a single machine with more CPU, RAM, or faster SSDs; Horizontal scaling ("Scale Out") adds more interconnected machines working in parallel behind a load balancer.', keyPoints: ['Vertical = Bigger machine', 'Horizontal = More machines'] },
      { level: 'intermediate', question: 'Why is Horizontal Scaling easy for stateless web servers yet tricky for stateful SQL Databases?', answer: 'Web servers store no local state, so adding 10 copies takes seconds. Databases hold persistent state—simply spinning up 10 copies without replication or sharding causes conflicting out-of-sync data!', keyPoints: ['Stateless compute scales trivially', 'Stateful DBs require replication/sharding coordination'] },
      { level: 'advanced', question: 'What is "Scale-In Thrashing" in Auto-Scaling, and how do Cooldown Windows prevent it?', answer: 'If CPU crosses 70% -> boot new pod -> load spreads -> CPU immediately drops to 40% -> autoscaler immediately kills pod -> CPU jumps back to 70% -> infinite boot/kill loop! Cooldown / stabilization windows (e.g., wait 5 minutes after scaling before scaling in) eliminate thrashing.', keyPoints: ['Rapid scale-up/scale-down flapping', 'Fix with cooldown stabilization windows + hysteresis gap (scale up at 75%, down at 35%)'] },
    ],
    quiz: [
      { id: 'vhs-1', question: 'Upgrading an AWS EC2 server from 8 GB RAM to 64 GB RAM is an example of:', options: ['Vertical Scaling (Scaling Up)', 'Horizontal Scaling', 'Database Sharding', 'CDN Edge Caching'], correctAnswer: 0, explanation: 'Adding hardware capacity to one existing instance is Vertical Scaling.' },
      { id: 'vhs-2', question: 'What prerequisite makes web application servers trivial to scale Horizontally?', options: ['Keeping them completely Stateless', 'Storing user sessions inside local server RAM only', 'Disabling Load Balancers', 'Using SQLite files on local disk'], correctAnswer: 0, explanation: 'Stateless services delegate state to external caches/DBs so any instance serves any user.' },
      { id: 'vhs-3', question: 'What prevents Auto-Scalers from endlessly booting and deleting instances every 30 seconds?', options: ['Cooldown / Stabilization Windows and Asymmetric Thresholds', 'Deleting Load Balancers', 'Turning off CPU telemetry', 'Using larger fonts'], correctAnswer: 0, explanation: 'Cooldown periods stabilize fleet sizes between metric fluctuations.' },
      { id: 'vhs-4', question: 'Which scaling approach provides inherent protection against a single server motherboard dying?', options: ['Horizontal Scaling across multiple machines', 'Vertical Scaling on 1 bigger box', 'Using faster local SSDs only', 'Overclocking 1 CPU'], correctAnswer: 0, explanation: 'Multiple independent machines eliminate single-machine hardware SPOFs.' },
      { id: 'vhs-5', question: 'What does "Scale In" mean?', options: ['Automatically terminating excess idle server instances during low-traffic periods to save cost', 'Buying larger monitors', 'Sharding a database', 'Blocking user IPs'], correctAnswer: 0, explanation: 'Scale-in shrinks cluster size cleanly when demand drops.' },
    ],
  },

  'bottleneck-identification': {
    id: 'bottleneck-identification',
    title: 'Identifying Bottlenecks, Tail Latency (P99) & High Availability',
    module: 'system-design',
    category: '11. Scalability & Performance Engineering',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Systems run only as fast as their slowest bottleneck (Amdahl\'s Law). Learn how to diagnose CPU vs I/O vs DB lock bottlenecks, track P95/P99 tail latency, and apply Little\'s Law.',
    introduction: {
      definition: 'Bottleneck identification uses observability (Metrics, Logs, Distributed Traces) to uncover which exact resource—CPU, memory, disk IOPS, network bandwidth, lock contention, or external API—caps overall system throughput and inflates P99 tail latency.',
      analogousStory: 'A 6-lane highway flowing into a 1-lane tollbooth doesn\'t move faster if you widen the highway to 12 lanes behind it! All traffic still bottlenecks at the single tollbooth. You must always measure and widen the narrowest constraint.',
      keyTakeaway: 'Never optimize averages—optimize **P99 Tail Latency**, because if a page loads 20 parallel microservices and each has a 1% chance of stalling, nearly 18% of users suffer slow pages!',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents wasting weeks optimizing fast app code when the true bottleneck is an unindexed SQL query or exhausted DB connection pool.',
        'Exposes hidden P99 latency spikes obscured by deceptive "average latency" charts.',
      ],
      realWorldImpact: 'Google\'s "The Tail at Scale" research transformed how cloud architectures tame P99 tail latency using hedged requests and load shedding.',
      metricsAffected: ['P50 / P95 / P99 Latency', 'Saturation Metrics (USE Method)', 'Database Connection Pool Queue'],
    },
    coreArchitecture: {
      description: 'Monitor Load Balancers and Target Nodes via the RED Method (Rate, Errors, Duration) and USE Method (Utilization, Saturation, Errors).',
      components: [
        { name: 'Load Balancer Telemetry', role: 'RED Metrics Collector', details: 'Measures Request Rate, 5xx Errors, and P99 Duration percentiles.' },
        { name: 'Worker Node Profiler', role: 'USE Resource Inspector', details: 'Distinguishes CPU-bound bottlenecks from I/O wait, GC pauses, and DB locks.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Inspect Distributed Trace', technicalDetail: 'Check OpenTelemetry flamegraphs to see which downstream span consumed 90% of time.' },
        { stepNumber: 2, action: 'Apply USE Method', technicalDetail: 'Check CPU, Memory, Disk IOPS, and Connection Pool saturation.' },
        { stepNumber: 3, action: 'Widen Primary Constraint', technicalDetail: 'Add index, Redis cache, pooler (PgBouncer), or horizontal capacity where bottleneck lies.' },
      ],
    },
    visualizationId: 'bottleneck-3d',
    visualizationScene: 'load-balancer',
    visualizationModes: [
      { id: 'least-connections', label: 'Mitigated (Balanced Load)' },
      { id: 'round-robin', label: 'Unbalanced Tail Latency Spike' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Identify Saturated Bottleneck Node', description: 'Notice the red/amber active load bar on Server C (50 conns, 74% CPU) inflating P99 tail latency.', activeNodes: ['load-balancer', 'server-c'], packet: { from: 'load-balancer', to: 'server-b', label: 'Shift Load Off Bottleneck', type: 'request' } },
      { step: 2, title: 'Step 2: Balance Traffic to Relieve Saturation', description: 'Routing traffic toward underutilized Server B lowers queue wait times and restores P99 SLA.', activeNodes: ['server-b'], packet: { from: 'server-b', to: 'client-1', label: 'Fast P99 Response', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-1', name: 'Traffic Generators', role: 'Concurrency Source', description: 'Drives simultaneous RPS testing saturation limits.' },
      { id: 'load-balancer', name: 'Telemetry Gateway', role: 'P99 Observer', description: 'Records duration histograms and redirects around slow workers.' },
      { id: 'server-a', name: 'Server A (Normal)', role: 'Compute Worker', description: 'Balanced load.' },
      { id: 'server-b', name: 'Server B (Low Queue)', role: 'Optimal Capacity', description: 'Absorbs diverted traffic.' },
      { id: 'server-c', name: 'Server C (Bottlenecked)', role: 'Tail Latency Hot Node', description: 'Demonstrates queue saturation raising P99 delay.' },
    ],
    realWorldExample: {
      company: 'Google Search ("The Tail at Scale")',
      scenario: 'A single search query fans out across 1,000 leaf servers—if even ONE leaf server experiences a 200ms GC pause, the entire search page waits 200ms.',
      implementation: 'Google uses Hedged Requests: if a leaf server doesn\'t reply within its expected P95 window (e.g., 10ms), the coordinator fires an identical backup request to a replica and uses whichever responds first—slashing P99 tail latency dramatically.',
      scaleDetails: 'Drops P99 tail latency by up to 96% with minimal extra ~2% CPU overhead.',
    },
    advantages: [
      'Data-driven profiling eliminates guesswork optimizations.',
      'Tracking P99 catches tail problems before customers churn.',
    ],
    disadvantages: [
      'Hedged requests increase baseline load slightly unless carefully rate-budgeted.',
    ],
    relatedTopics: [
      { id: 'load-balancing-algorithms', title: 'Load Balancing Algorithms', module: 'system-design' },
      { id: 'database-indexing', title: 'Database Indexing', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why is "Average Latency" misleading compared to P95 / P99 Percentiles?', answer: 'If 99 users get a 10ms cached response and 1 unlucky user hits an unindexed query taking 10,000ms (10s), the average looks fine (~110ms)—yet P99 is a terrible 10 seconds! Moreover, users clicking around load 10–20 requests per page, making hitting the slow 1% tail extremely likely.', keyPoints: ['Averages hide catastrophic spikes', 'P99 measures worst 1% user experience'] },
      { level: 'intermediate', question: 'Explain Little\'s Law (`L = λ × W`) in capacity planning.', answer: 'Average concurrent requests in a system (`L`) equals Arrival Rate (`λ` requests/sec) multiplied by Average Wait/Processing Time (`W` seconds). If traffic arrives at 1,000 RPS and each DB query takes 0.05s, you need at least 50 concurrent connections (`1000 * 0.05 = 50`). If DB slows to 0.5s, concurrency suddenly balloons to 500, exhausting connection pools!', keyPoints: ['Concurrency = Arrival Rate × Latency', 'Slow queries cause massive concurrency spikes'] },
      { level: 'advanced', question: 'What are "Hedged Requests" and "Load Shedding" for controlling tail latency?', answer: 'Hedged Requests send a duplicate request to a replica if the primary fails to respond within P95 time, taking the fastest answer. Load Shedding actively drops low-priority excess requests early at the gateway when CPU/queue hits critical limits so the server stays fast for the requests it CAN handle instead of crashing completely.', keyPoints: ['Hedged Requests = Backup call on slow tail', 'Load Shedding = Intentionally drop excess to save core availability'] },
    ],
    quiz: [
      { id: 'bi-1', question: 'What does a P99 latency of 120ms mean?', options: ['99% of all requests completed in 120ms or less; the slowest 1% took longer', '99 servers are offline', 'Average latency is 120ms', '99% of requests failed'], correctAnswer: 0, explanation: 'Percentiles capture tail latencies across the fastest 99% of calls.' },
      { id: 'bi-2', question: 'Using Little\'s Law (`L = λ × W`), if 200 req/sec arrive and each takes 0.25s, how many concurrent active workers are needed?', options: ['50 workers', '200 workers', '800 workers', '5 workers'], correctAnswer: 0, explanation: '200 × 0.25 = 50 concurrent active jobs.' },
      { id: 'bi-3', question: 'Which metrics constitute Brendan Gregg\'s "USE Method" for resource bottlenecks?', options: ['Utilization, Saturation, Errors', 'Users, SQL, Encryption', 'UDP, Subnet, Ethernet', 'Upload, Save, Exit'], correctAnswer: 0, explanation: 'USE monitors Utilization, Saturation (queueing), and Errors on every hardware/pool resource.' },
      { id: 'bi-4', question: 'What does "Load Shedding" do during an overwhelming overload crisis?', options: ['Proactively rejects non-critical or excess calls early so core services do not collapse entirely', 'Deletes all database rows', 'Disables HTTPS', 'Restarts routers endlessly'], correctAnswer: 0, explanation: 'Shedding excess load prevents total brownout collapse.' },
      { id: 'bi-5', question: 'Why shouldn\'t a backend open 5,000 simultaneous unpooled connections to PostgreSQL?', options: ['Context switching and lock contention crush DB CPU; use a connection pooler like PgBouncer instead', 'PostgreSQL supports max 1 connection', 'TCP bans >100 ports', 'SQL refuses integers'], correctAnswer: 0, explanation: 'PostgreSQL spawns processes per connection; pooling caps active DB workers cleanly.' },
    ],
  },

  'disaster-recovery-backup': {
    id: 'disaster-recovery-backup',
    title: 'Disaster Recovery (RTO, RPO) & Multi-Region Strategies',
    module: 'system-design',
    category: '11. Scalability & Performance Engineering',
    readTime: '8 min',
    difficulty: 'Intermediate',
    summary: 'Disaster Recovery plans protect businesses against catastrophic regional blackouts, ransomware, and accidental data destruction—governed by Recovery Time Objective (RTO) and Recovery Point Objective (RPO).',
    introduction: {
      definition: 'Disaster Recovery (DR) encompasses automated backups, cross-region replication, and failover architectures. Two core numbers define any DR plan: RPO (maximum acceptable data loss measured in time) and RTO (maximum acceptable downtime until service restoration).',
      analogousStory: 'If your laptop gets stolen while writing a thesis: RPO is how long ago your last cloud backup ran (e.g., lost 10 minutes of typing vs lost 1 week). RTO is how fast you can buy a replacement laptop and restore your documents to keep writing (e.g., 1 hour vs 3 days).',
      keyTakeaway: 'Unverified backups are NOT backups—routinely test full restore drills ("GameDays") to verify RTO and RPO actually hold!',
    },
    whyRequired: {
      problemsSolved: [
        'Survives whole AWS/GCP region blackouts or accidental `DROP TABLE` disasters.',
        'Protects immutable off-site snapshots against ransomware encryption.',
        'Balances cloud standby expenses against strict enterprise RTO/RPO SLA tiers.',
      ],
      realWorldImpact: 'Banks require near-zero RPO/RTO via Multi-Region Active-Active, whereas blogs use simple hourly snapshots (Backup & Restore).',
      metricsAffected: ['RPO (Data Loss Window)', 'RTO (Downtime Recovery Window)', 'DR Standby Infrastructure Cost'],
    },
    coreArchitecture: {
      description: 'Compare 4 DR Tiers: Backup & Restore (Hours) -> Pilot Light (Tens of mins) -> Warm Standby (Minutes) -> Multi-Region Active-Active (Seconds/Zero).',
      components: [
        { name: 'Primary Region (US-East)', role: 'Active Production', details: 'Handles live production traffic and streams snapshots/WAL to DR region.' },
        { name: 'Cross-Region DR Replica (EU-West)', role: 'Failover Target', details: 'Receives continuous async/sync replication ready for DNS failover promotion.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Continuous WAL + Snapshot Shipping', technicalDetail: 'Primary continuously ships encrypted WAL logs and hourly snapshots to immutable cross-region S3 buckets.' },
        { stepNumber: 2, action: 'Detect Regional Outage', technicalDetail: 'Global DNS health checks detect US-East failure.' },
        { stepNumber: 3, action: 'Promote DR Region', technicalDetail: 'Promote DR replica to Primary, scale compute auto-groups, and swing Route53 DNS to EU-West.' },
      ],
    },
    visualizationId: 'dr-3d',
    visualizationScene: 'database-replication',
    visualizationModes: [
      { id: 'sync-replication', label: 'Multi-Region Zero-RPO Sync' },
      { id: 'async-replication', label: 'Warm Standby Async DR' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Primary Streams State Cross-Region', description: 'Primary Region (US-East) replicates transactions continuously to Standby Region (EU-West).', activeNodes: ['write-client', 'primary-db', 'replica-1'], packet: { from: 'primary-db', to: 'replica-1', label: 'Cross-Region DR Stream', type: 'sync' } },
      { step: 2, title: 'Step 2: Regional Failover Promotion', description: 'If Region 1 goes dark, Standby Replica promotes to leader cleanly within target RTO.', activeNodes: ['replica-1', 'read-client'], packet: { from: 'read-client', to: 'replica-1', label: 'Failover Promoted! (RTO Met)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'write-client', name: 'Production Traffic', role: 'Active Users', description: 'Rerouted via DNS/Anycast upon regional failure.' },
      { id: 'primary-db', name: 'Primary Region (US-East)', role: 'Primary Zone', description: 'Ships snapshots and replication streams.' },
      { id: 'replica-1', name: 'DR Region (EU-West)', role: 'Standby Failover', description: 'Takes over leadership on regional blackout.' },
      { id: 'read-client', name: 'Post-Failover Traffic', role: 'Recovered Clients', description: 'Resumes operations cleanly against promoted DR region.' },
    ],
    realWorldExample: {
      company: 'Netflix Multi-Region Chaos Kong',
      scenario: 'Surviving a complete outage of an entire AWS Cloud Region (e.g., US-East-1 going completely offline).',
      implementation: 'Netflix regularly runs "Chaos Kong" exercises that artificially evacuate an entire AWS region via DNS traffic steering into surviving US-West/EU regions in under 10 minutes without disrupting active streams.',
      scaleDetails: 'Proven sub-10-minute full-region evacuation across 250M+ subscribers.',
    },
    advantages: [
      'Protects businesses from existential data loss and multi-hour outages.',
    ],
    disadvantages: [
      'Lower RTO/RPO exponentially increases standby hosting and cross-region data transfer bills.',
    ],
    relatedTopics: [
      { id: 'database-replication', title: 'Database Replication', module: 'system-design' },
      { id: 'scalability-availability-reliability', title: 'Availability & Reliability', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Explain RPO vs RTO using a clear example.', answer: 'RPO (Recovery Point Objective) defines HOW MUCH DATA you can afford to lose measured in time (e.g., RPO = 15 mins means backups run at least every 15 mins). RTO (Recovery Time Objective) defines HOW LONG THE SYSTEM CAN BE DOWN (e.g., RTO = 1 hr means engineers must restore full service within 60 mins).', keyPoints: ['RPO = Max acceptable data loss', 'RTO = Max acceptable downtime'] },
      { level: 'intermediate', question: 'Compare "Pilot Light" vs "Warm Standby" Disaster Recovery.', answer: 'Pilot Light keeps only critical core databases replicated in the DR region with app servers turned OFF—cheaper, takes ~15-30 mins to boot compute during a disaster. Warm Standby keeps scaled-down compute and databases running live—more expensive, scales up in just 1-2 minutes.', keyPoints: ['Pilot Light = Only DB live, compute off', 'Warm Standby = Scaled-down full stack live'] },
      { level: 'advanced', question: 'Why doesn\'t Synchronous Replication solve accidental `DROP TABLE` human mistakes?', answer: 'Because Replication faithfully copies the `DROP TABLE` command onto every replica in milliseconds! To recover from human errors or ransomware, you MUST combine replication with Point-in-Time Recovery (PITR) WAL archives and Immutable (WORM) Write-Once-Read-Many off-site backups.', keyPoints: ['Replication propagates human deletions instantly', 'Need immutable PITR backups for deletion/ransomware'] },
    ],
    quiz: [
      { id: 'dr-1', question: 'Which metric defines the maximum tolerable duration of downtime during a disaster?', options: ['RTO (Recovery Time Objective)', 'RPO (Recovery Point Objective)', 'TTL', 'CIDR'], correctAnswer: 0, explanation: 'RTO measures acceptable recovery duration.' },
      { id: 'dr-2', question: 'Which metric measures the maximum acceptable age of data lost after a crash?', options: ['RPO (Recovery Point Objective)', 'RTO', 'QPS', 'MTU'], correctAnswer: 0, explanation: 'RPO determines backup/replication frequency.' },
      { id: 'dr-3', question: 'Why do security teams configure Object Lock / Immutable WORM backups?', options: ['So neither hackers/ransomware nor accidental scripts can delete historical backups', 'To increase CPU clock', 'To speed up HTTP GETs', 'To replace DNS'], correctAnswer: 0, explanation: 'Immutable backups cannot be encrypted or deleted during retention.' },
      { id: 'dr-4', question: 'Which DR strategy achieves near-zero RTO and RPO by serving live traffic simultaneously from multiple continents?', options: ['Multi-Region Active-Active', 'Cold Tape Backup', 'Manual USB Drive', 'Pilot Light'], correctAnswer: 0, explanation: 'Active-Active routes traffic immediately to surviving regions.' },
      { id: 'dr-5', question: 'If a company runs nightly database backups once every 24 hours, what is its worst-case RPO?', options: ['24 hours of lost mutations', 'Zero seconds', '5 milliseconds', '10 minutes'], correctAnswer: 0, explanation: 'Up to 24 hours of transactions since the last nightly snapshot could be lost.' },
    ],
  },

  'case-study-url-shortener': {
    id: 'case-study-url-shortener',
    title: 'Case Study: Design a URL Shortener (Bitly — Illustrative Architecture)',
    module: 'system-design',
    category: '12. Real-World System Design Case Studies',
    readTime: '14 min',
    difficulty: 'Intermediate',
    summary: 'End-to-end conceptual system design for a Bitly-like URL Shortener: capacity estimation, Base62 encoding vs KGS, Redis read caching, 301 vs 302 redirects, and horizontal NoSQL sharding.',
    introduction: {
      definition: 'A URL Shortener maps long arbitrary URLs (`https://example.com/very/long/path?id=99`) into compact 7-character aliases (`https://sho.rt/aB9x2K1`) and performs ultra-low-latency HTTP redirects at massive read-heavy scale.',
      analogousStory: 'Imagine an enormous coat check desk: you hand over a bulky winter coat (long URL) and receive a tiny numbered plastic tag (7-char short code). Whenever you flash the tiny tag, the attendant looks up the rack instantly and hands back your full coat.',
      keyTakeaway: 'A URL Shortener is heavily read-dominant (100:1 read/write ratio)—making Redis caching + Base62 collision-free IDs the architectural centerpieces.',
    },
    whyRequired: {
      problemsSolved: [
        'Shortens unwieldy links cleanly for SMS/social character limits.',
        'Tracks click analytics (location, referrer, timestamps) using 302 redirects.',
        'Calculates scale: `62^7 = 3.5 TRILLION` unique 7-character Base62 URLs!',
      ],
      realWorldImpact: 'Illustrative conceptual blueprint demonstrating caching, Base62 encoding, and read-heavy NoSQL scaling.',
      metricsAffected: ['Redirect P99 Latency (< 15ms)', 'Read/Write Ratio (100:1)', '3.5 Trillion Keyspace Capacity'],
    },
    coreArchitecture: {
      description: 'Read path checks Redis Cache -> falls back to sharded NoSQL/SQL store -> issues HTTP 301/302 Location redirect + emits async analytics event.',
      components: [
        { name: 'Base62 Encoder / KGS', role: 'Short Code Generator', details: 'Converts distributed Snowflake/Auto-Inc IDs into 7-char `[0-9a-zA-Z]` strings with zero hash collisions.' },
        { name: 'Redis Hot-URL Cache', role: 'Sub-2ms Redirect Cache', details: 'Stores top 20% viral links in RAM, absorbing 80-90%+ of redirect reads.' },
        { name: 'Sharded Storage (Cassandra/DynamoDB)', role: 'Durable Key-Value Store', details: 'Sharded by `short_code` key for O(1) lookups across billions of URLs.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Create Short Link (Write)', technicalDetail: 'POST `/shorten` obtains unique ID from Key Generation Service -> encodes Base62 (`x9Z1k2P`) -> saves to DB.' },
        { stepNumber: 2, action: 'Click Redirect (Read Hit)', technicalDetail: 'GET `/x9Z1k2P` hits Redis in <1ms -> responds `302 Found` with `Location: <long_url>`.' },
        { stepNumber: 3, action: 'Async Click Analytics', technicalDetail: 'API pushes click metadata onto Kafka asynchronously so analytics never slow down the user redirect.' },
      ],
    },
    visualizationId: 'cs-bitly-3d',
    visualizationScene: 'case-study',
    visualizationVariant: 'url-shortener',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: User Clicks Short Link', description: 'Browser requests `GET https://sho.rt/x9Z1k2P` at the CDN / Edge Redirector.', activeNodes: ['cs-client', 'cs-edge'], packet: { from: 'cs-client', to: 'cs-edge', label: 'GET /x9Z1k2P', type: 'request' } },
      { step: 2, title: 'Step 2: Cache Lookup & Base62 Resolution', description: 'API checks Redis hot cache; on miss, resolves `short_code` directly in sharded NoSQL DB.', activeNodes: ['cs-edge', 'cs-svc2', 'cs-store'], packet: { from: 'cs-edge', to: 'cs-svc2', label: 'Redis Hot Cache Lookup', type: 'cached' } },
      { step: 3, title: 'Step 3: 301/302 Redirect Returned + Analytics Logged', description: 'Server returns `Location` redirect header to user in <10ms and emits click analytics async.', activeNodes: ['cs-client'], packet: { from: 'cs-edge', to: 'cs-client', label: '302 Found -> Target URL', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'cs-client', name: 'Browser Clicking Short Link', role: 'Read Client', description: 'Expects instant redirect without noticeable delay.' },
      { id: 'cs-edge', name: 'Edge Redirector & LB', role: 'Ingress Tier', description: 'Terminates TLS and routes `/shortCode` hits.' },
      { id: 'cs-svc1', name: 'Base62 Key Generator API', role: 'Write Encoder', description: 'Generates collision-free 7-character Base62 short codes.' },
      { id: 'cs-svc2', name: 'Redis Hot-Link Cache', role: 'Read Accelerator', description: 'Keeps viral short links warm in memory.' },
      { id: 'cs-store', name: 'Sharded Cassandra / DynamoDB', role: 'Billion-Row Store', description: 'Stores permanent `short_code -> long_url` mappings.' },
    ],
    realWorldExample: {
      company: 'Bitly / TinyURL (Illustrative Reference Architecture)',
      scenario: 'Handling 100M new links/month (~40 writes/sec) and 10B redirects/month (~4,000+ reads/sec).',
      implementation: 'This conceptual architecture separates write key generation (Base62 counter/Snowflake or pre-generated Key Generation Service pools) from the read-optimized redirect path backed by Redis and partitioned NoSQL storage.',
      scaleDetails: '5 years of storage at 500 bytes/URL = 6 Billion URLs × 500B ≈ 3 TB total disk—easily cached and sharded.',
      isConceptual: true,
    },
    advantages: [
      'Base62 counter encoding guarantees 0% hash collisions without retry loops.',
      '80/20 caching serves viral links entirely out of Redis RAM.',
    ],
    disadvantages: [
      'Sequential integer Base62 IDs are predictable—add a random permutation / KGS shuffle for privacy.',
    ],
    relatedTopics: [
      { id: 'caching-fundamentals', title: 'Caching & Redis', module: 'system-design' },
      { id: 'database-sharding', title: 'Database Sharding', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'How many unique URLs can a 7-character Base62 (`0-9, a-z, A-Z`) code represent?', answer: '62^7 ≈ 3.52 trillion unique short URLs. Even generating 1,000 new URLs every single second, 3.5 trillion links lasts over 110 years!', keyPoints: ['62^7 ≈ 3.52 trillion combinations', 'Far larger than needed for decades'] },
      { level: 'intermediate', question: 'Should a URL Shortener return HTTP `301 Moved Permanently` or `302 Found`?', answer: '`301` instructs the user\'s browser to cache the redirect permanently—reducing server load, BUT future clicks never hit your server so you LOSE click analytics! `302` (or `307`) forces the browser to hit your redirect server every time, enabling accurate click tracking and destination editing.', keyPoints: ['301 = Browser caches forever (low server load, breaks analytics)', '302 = Hits server every click (accurate analytics)'] },
      { level: 'advanced', question: 'Why is taking MD5/SHA256 of the long URL and slicing the first 7 chars flawed compared to a Key Generation Service (KGS)?', answer: 'Truncating MD5 to 7 Base62 chars causes frequent hash collisions (two different URLs producing the same 7 chars), forcing expensive database existence-check queries and retries. A KGS pre-generates millions of unique unused 7-char strings offline in a key-DB, handing out batches directly to app servers in O(1) with zero collisions.', keyPoints: ['Truncated MD5 risks collisions and extra DB checks', 'Pre-generated KGS or distributed Snowflake + Base62 = zero collisions'] },
    ],
    quiz: [
      { id: 'us-1', question: 'Why choose HTTP `302 Found` over `301 Moved Permanently` in a commercial link tracker?', options: ['302 routes every click back through your servers so click analytics work', '302 encrypts the link', '301 only supports IPv6', '302 doubles character count'], correctAnswer: 0, explanation: '301 causes browsers to skip your servers on repeat clicks, blind-spotting analytics.' },
      { id: 'us-2', question: 'How many characters exist in the Base62 alphabet?', options: ['62 (0-9, a-z, A-Z)', '16', '64', '100'], correctAnswer: 0, explanation: '10 digits + 26 lowercase + 26 uppercase = 62 URL-safe alphanumeric chars.' },
      { id: 'us-3', question: 'Roughly how much disk storage do 100 million URLs/month take over 5 years at 500 bytes per record?', options: ['~3 TB', '~300 PB', '~50 MB', '~1 KB'], correctAnswer: 0, explanation: '6 billion records × 500 bytes = 3 trillion bytes = 3 TB.' },
      { id: 'us-4', question: 'Why should click analytics logging happen asynchronously via Kafka rather than synchronously before redirecting?', options: ['So users get redirected in <10ms without waiting for analytics DB writes', 'Kafka blocks browsers', 'Analytics cannot be saved in JSON', 'To crash Redis'], correctAnswer: 0, explanation: 'Async analytics preserves ultra-low redirect latency.' },
      { id: 'us-5', question: 'What bottleneck happens if a single centralized auto-increment SQL sequence generates IDs globally?', options: ['Single primary write bottleneck & predictable sequential URLs', 'Browsers crash', 'Base62 stops working', 'DNS fails'], correctAnswer: 0, explanation: 'Use distributed Snowflake ranges or pre-allocated KGS batches.' },
    ],
  },

  'case-study-whatsapp': {
    id: 'case-study-whatsapp',
    title: 'Case Study: Design Real-Time Chat (WhatsApp — Illustrative Architecture)',
    module: 'system-design',
    category: '12. Real-World System Design Case Studies',
    readTime: '15 min',
    difficulty: 'Advanced',
    summary: 'Conceptual architecture for massive real-time 1:1 and group messaging: persistent bidirectional WebSockets, Chat Gateway presence tracking, offline store-and-forward queues, and E2E encryption.',
    introduction: {
      definition: 'A real-time chat engine maintains persistent bidirectional TCP/WebSocket connections for tens of millions of online users simultaneously, delivering messages in milliseconds and storing messages temporarily while recipients are offline.',
      analogousStory: 'Instead of mailing letters where you constantly walk down to check your mailbox (HTTP Polling), WebSockets leave a dedicated live intercom pipe open straight into your living room so messages chime instantaneously.',
      keyTakeaway: 'Stateful Chat Gateways hold live WebSockets mapped in Redis (`user_id -> gateway_server_ip`), while offline messages queue durably until delivery ACKs return.',
    },
    whyRequired: {
      problemsSolved: [
        'Replaces wasteful HTTP polling with persistent low-overhead bidirectional WebSockets.',
        'Solves Online/Offline Presence ("Last Seen", Double-Tick Delivered, Blue-Tick Read) across millions of phones.',
        'Delivers group chats efficiently via fan-out without freezing sender phones.',
      ],
      realWorldImpact: 'Illustrative conceptual reference inspired by high-scale messaging architectures handling 100B+ daily messages.',
      metricsAffected: ['Concurrent Open WebSocket Sockets', 'Message Delivery Latency (< 100ms)', 'Offline Sync Consistency'],
    },
    coreArchitecture: {
      description: 'Clients keep persistent WebSocket sockets on Chat Gateways -> Presence & Routing via Redis/Kafka -> Offline Store-and-Forward DB.',
      components: [
        { name: 'Stateful WebSocket Gateways', role: 'Persistent Socket Holders', details: 'Lightweight Erlang/Go edge servers holding 500k–2M open TCP sockets per node.' },
        { name: 'Session & Presence Service', role: 'User-to-Gateway Map', details: 'Tracks in Redis which exact Gateway server holds User B\'s active socket.' },
        { name: 'Message Queue & Offline DB', role: 'Store-and-Forward', details: 'Holds undelivered encrypted blobs until recipient reconnects and ACKs.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'WebSocket Connect', technicalDetail: 'Alice connects persistently to Chat Gateway 1; Presence records `Alice -> GW1`.' },
        { stepNumber: 2, action: 'Message Route Lookup', technicalDetail: 'Alice sends encrypted message for Bob -> GW1 asks Presence where Bob is connected (`GW4`).' },
        { stepNumber: 3, action: 'Real-Time Push or Offline Queue', technicalDetail: 'If Bob is online on GW4, push instantly over Bob\'s socket! If offline, store in Message Queue/DB + trigger APNs/FCM Push Notification.' },
      ],
    },
    visualizationId: 'cs-whatsapp-3d',
    visualizationScene: 'case-study',
    visualizationVariant: 'whatsapp',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Alice Sends Encrypted Frame via WebSocket', description: 'Client maintains persistent bidirectional WebSocket to Chat Gateway.', activeNodes: ['cs-client', 'cs-edge'], packet: { from: 'cs-client', to: 'cs-edge', label: 'WS Frame (E2E Encrypted)', type: 'request' } },
      { step: 2, title: 'Step 2: Presence Lookup & Message Queue', description: 'Gateway queries Session/Presence map and routes through Kafka Message Queue.', activeNodes: ['cs-edge', 'cs-svc1', 'cs-svc2'], packet: { from: 'cs-edge', to: 'cs-svc2', label: 'Lookup Recipient & Enqueue', type: 'sync' } },
      { step: 3, title: 'Step 3: Persist Offline or Push Live', description: 'Persist if recipient offline; push immediately to recipient WebSocket and mark Double-Tick Delivered.', activeNodes: ['cs-store', 'cs-client'], packet: { from: 'cs-store', to: 'cs-client', label: 'Delivered ✓✓', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'cs-client', name: 'Mobile Apps (E2E Client)', role: 'WebSocket Endpoint', description: 'Encrypts payloads locally (Signal Protocol) and keeps WebSocket alive.' },
      { id: 'cs-edge', name: 'WebSocket Chat Gateway', role: 'Persistent Socket Fleet', description: 'Manages millions of concurrent TCP connections with minimal RAM.' },
      { id: 'cs-svc1', name: 'Presence & Routing Service', role: 'Heartbeat Tracker', description: 'Tracks Online / Last-Seen / Typing indicators.' },
      { id: 'cs-svc2', name: 'Kafka Message Bus', role: 'Group Fan-Out & Delivery', description: 'Reliably delivers messages across gateways and group members.' },
      { id: 'cs-store', name: 'Sharded Chat Store (Cassandra)', role: 'Offline Inbox Queue', description: 'Stores messages sorted by `conversation_id` + `message_id` until ACKed.' },
    ],
    realWorldExample: {
      company: 'WhatsApp / Discord (Illustrative Reference Architecture)',
      scenario: 'Maintaining 50M+ concurrent WebSocket connections and instant delivery receipts.',
      implementation: 'Real-world messengers frequently use Erlang/Elixir BEAM VMs or Rust/Go gateways (famous for handling 2M+ connections on one tuned server), Signal Protocol End-to-End Encryption so servers never read plaintext, and partitioned wide-column stores (Cassandra/ScyllaDB) clustered by `(channel_id, message_id)`.',
      scaleDetails: 'Supports 100B+ daily messages with sub-100ms delivery latency.',
      isConceptual: true,
    },
    advantages: [
      'Sub-100ms instant bidirectional communication without HTTP header overhead.',
      'End-to-End Encryption protects message privacy even on intermediary servers.',
    ],
    disadvantages: [
      'Stateful WebSocket Gateways require careful graceful connection draining during deploys.',
      'Naive Presence heartbeat broadcasts across large group chats can flood servers ("Presence Storm").',
    ],
    relatedTopics: [
      { id: 'websockets-vs-http', title: 'WebSockets vs Long Polling', module: 'networking' },
      { id: 'kafka-architecture', title: 'Apache Kafka Architecture', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why is WebSocket far better than Short Polling every 2 seconds for chat?', answer: 'With Short Polling across 50M users, servers receive 25 MILLION empty HTTP requests every second even when nobody is typing—wasting massive CPU and mobile battery! WebSockets hold 1 lightweight persistent TCP socket and push bytes ONLY when actual messages arrive.', keyPoints: ['Eliminates wasteful empty HTTP polls', 'Instant server push with minimal framing overhead'] },
      { level: 'intermediate', question: 'How do you handle a "Last Seen / Online" Presence Storm when a celebrity or 1,000-person group opens the app?', answer: 'Never broadcast online/offline changes globally! Instead: 1) Lazy Pull Presence: fetch status ONLY for contacts currently visible on the user\'s screen, and 2) Debounce heartbeats (mark offline only after 30–60s of missed pings, ignoring brief 2s cellular drops).', keyPoints: ['Lazy screen-visible fetching', 'Debounce offline state with 30-60s grace window'] },
      { level: 'advanced', question: 'Why shouldn\'t a server use random UUIDv4s to order chat messages in Cassandra, and what should it use instead?', answer: 'Random UUIDv4s do not sort chronologically! In distributed chat, clocks on Alice\'s and Bob\'s phones can drift (Clock Skew). Use Snowflake / ULID / TimeUUID K-sortable 64-bit IDs generated server-side (embedding timestamp + shard ID + sequence) as the Clustering Key so messages query in crisp sorted order.', keyPoints: ['Phone clocks are untrusted', 'Server-side Snowflake / ULID K-sortable IDs preserve chronological order'] },
    ],
    quiz: [
      { id: 'wa-1', question: 'Which protocol keeps a full-duplex persistent TCP connection open for instant server-to-client chat pushes?', options: ['WebSockets', 'HTTP Short Polling', 'SMTP', 'DNS'], correctAnswer: 0, explanation: 'WebSockets upgrade an HTTP handshake into persistent bidirectional framing.' },
      { id: 'wa-2', question: 'In End-to-End Encryption (like Signal Protocol), can the Chat Server read message text?', options: ['No—only sender and recipient hold cryptographic keys; servers route opaque ciphertext', 'Yes, stored in plain SQL', 'Only admins can read plaintext', 'Encryption turns off after 1 minute'], correctAnswer: 0, explanation: 'E2EE ensures intermediaries see only encrypted ciphertext.' },
      { id: 'wa-3', question: 'Why do chat databases cluster messages using server-side Snowflake IDs instead of client timestamps?', options: ['User device clocks can be wrong/skewed; Snowflake IDs sort chronologically across shards', 'Snowflake IDs are smaller than 1 bit', 'SQL bans timestamps', 'To break ordering'], correctAnswer: 0, explanation: 'K-sortable Snowflake IDs give monotonic chronological sorting cleanly.' },
      { id: 'wa-4', question: 'What is the "Store-and-Forward" model in messaging?', options: ['Holding undelivered messages in durable queues/storage while recipient is offline, deleting/archiving once delivered', 'Deleting messages immediately if recipient phone is off', 'Mailing paper letters', 'Turning off databases'], correctAnswer: 0, explanation: 'Store-and-forward ensures offline users never miss messages.' },
      { id: 'wa-5', question: 'How should huge group chats (e.g., 5,000 members) avoid crippling sender devices?', options: ['Server-side Fan-Out via Message Broker instead of client uploading 5,000 copies', 'Client loops 5,000 HTTP calls', 'Disable group chats', 'Send via UDP broadcast'], correctAnswer: 0, explanation: 'Sender sends 1 message; backend broker fans out across member sockets.' },
    ],
  },

  'case-study-youtube-netflix': {
    id: 'case-study-youtube-netflix',
    title: 'Case Study: Design Video Streaming (YouTube / Netflix — Illustrative)',
    module: 'system-design',
    category: '12. Real-World System Design Case Studies',
    readTime: '16 min',
    difficulty: 'Advanced',
    summary: 'Conceptual architecture for planetary video streaming: chunked resumable uploads, distributed DAG transcoding into HLS/DASH Adaptive Bitrate chunks, Object Storage, and CDN edge streaming.',
    introduction: {
      definition: 'Video streaming platforms separate heavy asynchronous Write Ingestion (chunked uploads + parallel transcoding into 360p/720p/1080p/4K) from ultra-scale Read Delivery (Adaptive Bitrate streaming directly from global CDN edge nodes).',
      analogousStory: 'You don\'t mail an entire 2-hour movie reel at 4K resolution before letting someone press play! You slice the movie into 4-second micro-episodes across multiple quality sizes, stock copies in every neighborhood kiosk (CDN), and let the viewer\'s TV seamlessly switch between 4K and 720p mid-scene whenever Wi-Fi fluctuates.',
      keyTakeaway: 'Never stream raw monolithic MP4 files from app servers—transcode into 4-second HLS/DASH Adaptive Bitrate segments served globally from CDN Edge caches.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents buffering freezes when mobile bandwidth fluctuates between 5G and slow 3G.',
        'Allows 10x faster transcoding by splitting 2-hour videos into parallel GOP chunks across worker fleets.',
        'Offloads 95%+ of terabit/sec video egress off origin servers onto CDN edges.',
      ],
      realWorldImpact: 'Illustrative conceptual reference demonstrating DAG media processing pipelines and Adaptive Bitrate streaming.',
      metricsAffected: ['Startup Buffer Delay (< 500ms)', 'Rebuffer Ratio', 'CDN Edge Offload (> 95%)'],
    },
    coreArchitecture: {
      description: 'Uploader -> Object Storage (S3) -> Kafka + DAG Transcoding Workers -> Multi-Bitrate HLS/DASH Chunks -> Global CDN Edge.',
      components: [
        { name: 'Video Ingestion & S3 Store', role: 'Resumable Chunked Upload', details: 'Uploads huge multi-GB videos in resumable chunks straight into S3 via pre-signed URLs.' },
        { name: 'DAG Transcoding Pipeline', role: 'Parallel Video Processing', details: 'Splits raw video at keyframe boundaries, transcoding 360p/720p/1080p/4K + thumbnails in parallel.' },
        { name: 'HLS / DASH Adaptive Streaming & CDN', role: 'Edge Delivery', details: 'Serves `.m3u8` manifests and small 4s `.ts/.m4s` segments from nearest CDN PoP.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Pre-Signed Chunked Upload', technicalDetail: 'Creator uploads raw chunks directly to S3 Object Storage without clogging API servers.' },
        { stepNumber: 2, action: 'Parallel DAG Transcoding', technicalDetail: 'Workers encode multiple resolutions/codecs (H.264, VP9, AV1) segmented into 4s chunks.' },
        { stepNumber: 3, action: 'Adaptive Bitrate (ABR) Playback', technicalDetail: 'Player downloads manifest, measures live Wi-Fi speed, and fetches matching 4K or 720p chunks from closest CDN.' },
      ],
    },
    visualizationId: 'cs-yt-3d',
    visualizationScene: 'case-study',
    visualizationVariant: 'youtube-netflix',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Player Requests Video Manifest', description: 'Smart TV / Web Player hits nearest Edge CDN for playback manifest.', activeNodes: ['cs-client', 'cs-edge'], packet: { from: 'cs-client', to: 'cs-edge', label: 'GET /master.m3u8', type: 'request' } },
      { step: 2, title: 'Step 2: Transcoding DAG & ABR Chunks Ready in S3', description: 'Transcoder DAG pre-generated 4K, 1080p, 720p segments stored durably in Object Storage.', activeNodes: ['cs-svc1', 'cs-svc2', 'cs-store'], packet: { from: 'cs-svc1', to: 'cs-store', label: 'Transcoded 4s ABR Chunks', type: 'sync' } },
      { step: 3, title: 'Step 3: Smooth Edge CDN Chunk Streaming', description: 'Player seamlessly pulls adaptive 4s chunks straight from local Edge CDN with zero origin buffering.', activeNodes: ['cs-edge', 'cs-client'], packet: { from: 'cs-edge', to: 'cs-client', label: 'Stream 4K Segment (.m4s)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'cs-client', name: 'Smart TV / Browser Player', role: 'ABR Video Client', description: 'Dynamically picks video quality chunk-by-chunk based on bandwidth.' },
      { id: 'cs-edge', name: 'Global Video CDN Edge', role: 'High-Throughput Cache', description: 'Serves 95%+ of video chunks one hop away from users.' },
      { id: 'cs-svc1', name: 'Video Transcoding DAG', role: 'Parallel Compute Fleet', description: 'Converts raw creator uploads into multi-bitrate segments.' },
      { id: 'cs-svc2', name: 'ABR Manifest Engine (HLS/DASH)', role: 'Metadata & DRM', description: 'Serves `.m3u8`/`.mpd` bitrates and Widevine DRM licenses.' },
      { id: 'cs-store', name: 'Object Blob Storage (S3)', role: 'Durable Master Video', description: 'Stores petabytes of encoded video chunks and raw masters.' },
    ],
    realWorldExample: {
      company: 'YouTube / Netflix (Illustrative Reference Architecture)',
      scenario: 'Delivering buffer-free 4K playback globally alongside massive creator video uploads.',
      implementation: 'This conceptual model decouples heavy async video encoding pipelines (using chunked split-and-stitch DAGs) from playback delivery via Adaptive Bitrate manifests (HLS/DASH) cached on edge CDN appliances.',
      scaleDetails: 'Reduces rebuffering dramatically while serving petabytes of video daily.',
      isConceptual: true,
    },
    advantages: [
      'Adaptive Bitrate prevents mid-video buffering stalls across fluctuating mobile/Wi-Fi speeds.',
      'Pre-signed direct-to-S3 uploads keep backend API servers lightweight.',
    ],
    disadvantages: [
      'Multi-resolution transcoding (storing 360p, 720p, 1080p, 4K across multiple codecs) multiplies storage requirements.',
    ],
    relatedTopics: [
      { id: 'cdn-architecture', title: 'CDN Architecture', module: 'system-design' },
      { id: 'sync-vs-async-communication', title: 'Async Processing Queues', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'How does Adaptive Bitrate Streaming (HLS / MPEG-DASH) eliminate buffering freezes?', answer: 'Videos are encoded into multiple quality levels (360p, 720p, 1080p, 4K) and sliced into tiny 2-to-6 second segments. The video player checks real-time download speed every few seconds and seamlessly requests lower-resolution chunks if Wi-Fi drops, keeping playback continuous instead of freezing.', keyPoints: ['Multiple quality encodings + short 4s segments', 'Player switches resolution dynamically per segment'] },
      { level: 'intermediate', question: 'Why use Pre-Signed URLs when users upload a 10 GB video file?', answer: 'Routing a 10 GB binary upload through your Node.js/Python API servers wastes bandwidth, fills memory buffers, and ties up worker processes for 20 minutes. A Pre-Signed S3 URL lets the browser upload chunks directly to AWS S3 Object Storage safely with temporary scoped credentials.', keyPoints: ['Browser uploads straight to S3/Blob Storage', 'Bypasses API compute bottlenecks completely'] },
      { level: 'advanced', question: 'How do you transcode a 3-hour 4K movie in 5 minutes instead of 4 hours?', answer: 'Chunk-based Parallel Transcoding (DAG): Split the raw uploaded file into tiny Group-of-Pictures (GOP) segments along keyframes, distribute all 500 segments simultaneously across 500 cloud worker pods in parallel, and stitch the encoded streams together—cutting encoding time linearly!', keyPoints: ['Split at GOP keyframes', 'Parallelize encoding across worker clusters'] },
    ],
    quiz: [
      { id: 'yt-1', question: 'What standard protocol slices video into short multi-bitrate chunks accompanied by a `.m3u8` playlist manifest?', options: ['HLS (HTTP Live Streaming)', 'SMTP', 'Telnet', 'ARP'], correctAnswer: 0, explanation: 'Apple\'s HLS uses `.m3u8` manifests and short media chunks for adaptive streaming.' },
      { id: 'yt-2', question: 'Why should clients upload multi-gigabyte raw videos directly to S3 via Pre-Signed URLs?', options: ['Prevents API application servers from bottlenecking on massive binary streams', 'Turns video into HTML text', 'Disables TLS', 'Deletes CDN edges'], correctAnswer: 0, explanation: 'Direct-to-object-storage uploads scale effortlessly.' },
      { id: 'yt-3', question: 'Where should SQL/NoSQL databases store raw MP4 video binaries?', options: ['They shouldn\'t—store metadata/URLs in DB and binary video files in Object Storage (S3/GCS)', 'Inside VARCHAR(255) columns', 'Inside Redis RAM cache only', 'Inside DNS TXT records'], correctAnswer: 0, explanation: 'Object blob storage handles large binaries far more cheaply and scalably than databases.' },
      { id: 'yt-4', question: 'How does parallel DAG transcoding encode a 2-hour movie rapidly?', options: ['Splits video into small GOP chunks and encodes all chunks concurrently across many workers', 'Overclocks 1 CPU by 100x', 'Skips half the frames', 'Asks viewers to transcode'], correctAnswer: 0, explanation: 'Splitting at keyframe boundaries enables parallel distributed transcoding.' },
      { id: 'yt-5', question: 'Which CDN advantage matters most for viral trending videos watched by millions?', options: ['Edge PoPs serve the same segments from local RAM/NVMe without hitting Origin repeatedly', 'CDNs create new movies automatically', 'CDNs disable browsers', 'CDNs erase copyrights'], correctAnswer: 0, explanation: 'Edge caching collapses millions of duplicate streams onto local ISP/edge servers.' },
    ],
  },

  'case-study-uber': {
    id: 'case-study-uber',
    title: 'Case Study: Design Ride-Sharing Dispatch (Uber — Illustrative Architecture)',
    module: 'system-design',
    category: '12. Real-World System Design Case Studies',
    readTime: '16 min',
    difficulty: 'Advanced',
    summary: 'Conceptual architecture for real-time geospatial ride dispatch: high-frequency driver GPS ingestion, Spatial Indexing (QuadTree / Geohash / Google S2 / H3), ETA routing, and atomic driver-rider matching.',
    introduction: {
      definition: 'A ride-sharing backend continuously ingests millions of moving driver GPS coordinates every 4 seconds, indexes them spatially in RAM for fast "Find drivers within 3 km" radius queries, and atomically locks one driver to one rider request.',
      analogousStory: 'Imagine an air-traffic radar board divided into numbered hexagonal grid squares (Uber H3). Every 4 seconds, every cab blinks its current grid hex onto the live board. When a rider taps "Request Ride", dispatch scans only the rider\'s immediate hex and its 6 neighbors instead of checking every cab in the whole country!',
      keyTakeaway: 'Standard SQL `WHERE lat BETWEEN ...` collapses under moving 2D updates—spatial grid indexing (H3 / S2 / Geohash) in RAM + Kafka location streams solves real-time geo-matching.',
    },
    whyRequired: {
      problemsSolved: [
        'Handles 1M+ GPS location write pings per second from moving driver apps.',
        'Executes fast 2D nearby-driver radius lookups without scanning global databases.',
        'Prevents two riders from accidentally booking the exact same driver simultaneously (atomic lock).',
      ],
      realWorldImpact: 'Illustrative conceptual blueprint highlighting geospatial indexing, high-frequency telemetry streaming, and distributed locking.',
      metricsAffected: ['Location Ingestion Rate (Writes/sec)', 'Geo-Radius Query Speed (< 15ms)', 'Match Lock Correctness'],
    },
    coreArchitecture: {
      description: 'Driver GPS -> API Gateway -> Kafka Location Stream -> Spatial Index (H3/Redis Geo) + Matching Engine.',
      components: [
        { name: 'Geospatial Index (H3 / S2 / Redis Geo)', role: '2D Radius Engine', details: 'Maps `(lat, lng)` coordinates into hierarchical spatial cell IDs (`O(1)` lookup of neighbors).' },
        { name: 'Location Ingestion & Kafka', role: 'High-Frequency Stream', details: 'Ingests driver coordinates every 4s, updating in-memory spatial cells and persisting trip breadcrumbs.' },
        { name: 'Dispatch & Surge Engine', role: 'Atomic Matcher', details: 'Locks chosen driver (`REDIS SETNX` / Distributed Lock) for 15s offer countdown; computes demand/supply ratio per hex.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Driver GPS Heartbeat', technicalDetail: 'Active driver phone sends `(driver_id, lat, lng)` every 4 seconds -> updates spatial cell index in RAM.' },
        { stepNumber: 2, action: 'Rider Requests Ride', technicalDetail: 'Dispatch translates rider `(lat, lng)` to Hex Cell + 6 adjacent neighbor cells, fetching nearby drivers.' },
        { stepNumber: 3, action: 'ETA Rank & Atomic Dispatch', technicalDetail: 'Routing service computes street-road ETA (not straight crow-flies distance!), locks top driver for 15s offer.' },
      ],
    },
    visualizationId: 'cs-uber-3d',
    visualizationScene: 'case-study',
    visualizationVariant: 'uber',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Driver Apps Stream GPS Pings Every 4s', description: 'Moving drivers transmit coordinates into geo-sharded API Gateway & Kafka telemetry bus.', activeNodes: ['cs-client', 'cs-edge', 'cs-store'], packet: { from: 'cs-client', to: 'cs-edge', label: 'GPS Ping (Lat/Lng)', type: 'request' } },
      { step: 2, title: 'Step 2: Spatial Hex Index Finds Nearby Drivers', description: 'Spatial Index resolves rider\'s Hex Cell + neighbors in <5ms, passing candidate drivers to Dispatch Engine.', activeNodes: ['cs-svc1', 'cs-svc2'], packet: { from: 'cs-svc1', to: 'cs-svc2', label: 'Query H3 Hex Neighbors', type: 'sync' } },
      { step: 3, title: 'Step 3: Atomic Lock & Driver Dispatch Offer', description: 'Dispatch Engine calculates true road ETA, locks top driver atomically, and pushes Ride Offer!', activeNodes: ['cs-svc2', 'cs-client'], packet: { from: 'cs-edge', to: 'cs-client', label: 'Match Locked: Driver Arriving 3 min', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'cs-client', name: 'Rider & Driver Apps', role: 'Mobile Clients', description: 'Streams GPS telemetry and receives real-time map locations via WebSockets.' },
      { id: 'cs-edge', name: 'Geo-Sharded API Gateway', role: 'Regional Ingress', description: 'Routes city traffic directly to local regional data centers (New York, London, Delhi).' },
      { id: 'cs-svc1', name: 'Geospatial Index (H3 / QuadTree)', role: 'Spatial Cell Store', description: 'Maintains active driver lists per hexagonal cell in RAM.' },
      { id: 'cs-svc2', name: 'Dispatch & Surge Engine', role: 'Matching & Pricing', description: 'Acquires atomic driver locks and calculates supply/demand ratios.' },
      { id: 'cs-store', name: 'Kafka Telemetry & Trip DB', role: 'Event Spine & History', description: 'Streams GPS pings and persists completed trip receipts.' },
    ],
    realWorldExample: {
      company: 'Uber / Lyft (Illustrative Reference Architecture)',
      scenario: 'Coordinating millions of live trips across hundreds of independent metropolitan cities.',
      implementation: 'Uber open-sourced **H3** (Hexagonal Hierarchical Spatial Index)—preferring hexagons over squares because all 6 adjacent neighbors of a hexagon sit equidistant from its center! Location tracking is geo-sharded by city ("ringpop" / regional cells) because a rider in Mumbai never needs to query drivers in Chicago.',
      scaleDetails: 'Processes millions of GPS location updates per second with city-level fault isolation.',
      isConceptual: true,
    },
    advantages: [
      'Spatial hashing converts 2D radius scans into instant O(1) cell lookups.',
      'Geo-sharding by city contains outages locally and minimizes cross-region latency.',
    ],
    disadvantages: [
      'Dynamic moving-object spatial indexes must remain in memory (RAM) because disk B-Tree index updates at 1M/sec fail.',
    ],
    relatedTopics: [
      { id: 'database-sharding', title: 'Geo-Sharding Strategies', module: 'system-design' },
      { id: 'kafka-architecture', title: 'Kafka Streaming Telemetry', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why is a city-based Geo-Sharding key ideal for a ride-sharing backend?', answer: 'Rides are completely localized geographically—a passenger in Tokyo only interacts with drivers in Tokyo! Sharding clusters by City/Region guarantees zero cross-shard joins and isolates any database issue strictly to one region.', keyPoints: ['Rides are inherently localized', 'Zero cross-city matching queries'] },
      { level: 'intermediate', question: 'Why did Uber choose Hexagons (H3) over Squares (Geohash / S2) for spatial indexing?', answer: 'In a square grid, diagonal corner neighbors are √2 (1.41x) farther away from the center than edge neighbors, distorting radius searches and surge pricing borders. In a hexagonal grid, ALL 6 surrounding neighbor cells sit at the exact same uniform distance from the center!', keyPoints: ['Uniform equidistant distance to all 6 neighbors', 'Better smooth smoothing for surge & radius lookups'] },
      { level: 'advanced', question: 'How do you guarantee two riders tapping "Request Ride" simultaneously don\'t both match the same nearby driver?', answer: 'Use an atomic distributed lock or compare-and-set state transition (`UPDATE driver_state SET status = "OFFERED" WHERE driver_id = 42 AND status = "AVAILABLE"`, or Redis `SET driver_lock:42 rider_id NX EX 15`). Only the winning caller proceeds to push the 15-second notification offer; the losing caller picks the next driver.', keyPoints: ['Atomic CAS / Redis `SET NX` lock with 15s TTL', 'Prevents double-dispatch race conditions'] },
    ],
    quiz: [
      { id: 'ub-1', question: 'Why does Uber\'s H3 Spatial Index use hexagons instead of squares or triangles?', options: ['Every single one of a hexagon\'s 6 neighbors lies equidistant from its center', 'Hexagons save CSS pixels', 'Squares cannot represent coordinates', 'Hexagons require zero math'], correctAnswer: 0, explanation: 'Uniform neighbor distance avoids diagonal corner distortions.' },
      { id: 'ub-2', question: 'Why shouldn\'t a ride matcher rank nearby drivers purely by straight-line Euclidean distance?', options: ['A driver 200m away across a river with no bridge might take 25 minutes by road (ETA)!', 'Crow-flies distance uses too much CPU', 'GPS lacks longitude', 'Rivers block Wi-Fi'], correctAnswer: 0, explanation: 'Road network ETA routing reflects actual driving time.' },
      { id: 'ub-3', question: 'Where should live updating driver `(lat, lng)` positions be stored for millisecond radius searches?', options: ['In-memory Spatial Index (e.g., RAM H3 / Redis Geospatial) fed via Kafka streams', 'On archival magnetic tape', 'Inside static CDN HTML files', 'Unindexed SQL heap tables on spinning HDDs'], correctAnswer: 0, explanation: 'Millions of moving updates/sec demand in-memory spatial indexing.' },
      { id: 'ub-4', question: 'How do you prevent double-booking a single driver across two simultaneous riders?', options: ['Atomic Distributed Lock (`Redis SET ... NX EX 15`) or conditional DB status lock', 'Ask drivers to reply by email', 'Allow two riders in the same cab automatically', 'Turn off load balancing'], correctAnswer: 0, explanation: 'Atomic compare-and-set locks prevent race conditions cleanly.' },
      { id: 'ub-5', question: 'Why update driver GPS positions every 3–5 seconds rather than every 10 milliseconds?', options: ['Balances smooth map UX against phone battery life, mobile data, and server ingestion load', 'GPS satellites only orbit once an hour', 'TCP drops sub-second packets', 'Android bans floats'], correctAnswer: 0, explanation: '3–5s intervals + client-side map interpolation smooths visuals efficiently.' },
    ],
  },
};
