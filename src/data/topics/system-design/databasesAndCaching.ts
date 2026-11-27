import { TopicContent } from '../../../types';

export const sdDatabasesAndCachingTopics: Record<string, TopicContent> = {
  'sql-vs-nosql': {
    id: 'sql-vs-nosql',
    title: 'Relational (SQL) vs Non-Relational (NoSQL) Databases',
    module: 'system-design',
    category: '4. Database Design & Architecture',
    readTime: '9 min',
    difficulty: 'Beginner',
    summary: 'Relational SQL databases enforce rigid schemas and strict ACID transactions, while NoSQL databases (Document, Key-Value, Wide-Column, Graph) prioritize horizontal sharding and flexible schemas.',
    introduction: {
      definition: 'SQL databases (PostgreSQL, MySQL) store structured rows across normalized tables with foreign key relations and ACID guarantees. NoSQL databases (MongoDB, Cassandra, DynamoDB, Neo4j) abandon rigid schemas and multi-table joins in favor of native horizontal scaling and flexible data models.',
      analogousStory: 'SQL is like an ultra-strict accounting spreadsheet workbook with enforced columns, formula cross-checks, and locked rows—zero typos allowed. NoSQL is like labeled shipping containers where each container can hold differently shaped cargo and you can stack thousands of containers across endless ships effortlessly.',
      keyTakeaway: 'Pick SQL by default for complex relational queries and ACID transactions; pick NoSQL when scale, write volume, or schema flexibility outgrow a single relational cluster.',
    },
    whyRequired: {
      problemsSolved: [
        'SQL protects financial balances, inventory counts, and multi-entity relations against partial transaction corruption.',
        'NoSQL solves single-node relational scaling walls when ingestion reaches hundreds of thousands of writes/sec.',
        'Graph NoSQL (Neo4j) evaluates 6-hop social friend graphs in milliseconds where SQL recursive JOINs grind to a halt.',
      ],
      realWorldImpact: 'Large architectures are polyglot: using PostgreSQL for billing, DynamoDB/Cassandra for activity logs, and Redis for hot sessions.',
      metricsAffected: ['ACID Consistency vs BASE Availability', 'Write Throughput Ceiling', 'Schema Evolution Agility'],
    },
    coreArchitecture: {
      description: 'Compare centralized ACID B-Tree tables against horizontally partitioned key-hashed NoSQL shard clusters.',
      components: [
        { name: 'SQL Relational Engine', role: 'ACID & Relational Joins', details: 'Executes B-Tree index scans, foreign keys, and ACID commits.' },
        { name: 'NoSQL Partition Router', role: 'Horizontal Scale Router', details: 'Hashes partition keys directly to storage nodes across clusters.' },
        { name: 'LSM-Tree / Document Shards', role: 'High-Throughput Storage', details: 'Stores append-optimized wide-column or JSON documents without cross-node locking.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Model Access Patterns', technicalDetail: 'SQL models entities and relationships first; NoSQL models query access patterns first (denormalized).' },
        { stepNumber: 2, action: 'Route Query via Partition Key', technicalDetail: 'NoSQL hashes partition keys directly to the owning shard without locking other shards.' },
        { stepNumber: 3, action: 'Guarantee Durability', technicalDetail: 'Write-Ahead Logs (WAL) or distributed quorums guarantee committed writes survive crashes.' },
      ],
    },
    visualizationId: 'sql-nosql-3d',
    visualizationScene: 'database-sharding',
    visualizationModes: [
      { id: 'hash-sharding', label: 'NoSQL Hash-Partitioned Shards' },
      { id: 'range-sharding', label: 'Range-Partitioned Storage' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Application Submits Query', description: 'Service queries data by primary/partition key.', activeNodes: ['app-client', 'shard-router'], packet: { from: 'app-client', to: 'shard-router', label: 'Query Key=9821', type: 'request' } },
      { step: 2, title: 'Step 2: Direct Partition Routing', description: 'In NoSQL, the coordinator hashes the key directly to Shard 2 with zero cross-shard joins.', activeNodes: ['shard-router', 'shard-2'], packet: { from: 'shard-router', to: 'shard-2', label: 'Single-Shard Fast Lookup', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'app-client', name: 'Application Query Client', role: 'ORM / SDK', description: 'Issues SQL transactions or NoSQL document/key lookups.' },
      { id: 'shard-router', name: 'Query / Partition Coordinator', role: 'Planner & Hasher', description: 'Optimizes SQL query plans or computes NoSQL partition hashes.' },
      { id: 'shard-1', name: 'Storage Node 1', role: 'Data Partition', description: 'Holds subset of distributed keys.' },
      { id: 'shard-2', name: 'Storage Node 2', role: 'Target Data Partition', description: 'Serves matching document/row directly.' },
      { id: 'shard-3', name: 'Storage Node 3', role: 'Data Partition', description: 'Independent horizontal scaling slice.' },
    ],
    realWorldExample: {
      company: 'Netflix & Amazon',
      scenario: 'Serving massive global playback history and shopping carts.',
      implementation: 'Amazon uses DynamoDB (Key-Value/Document NoSQL) for hyper-scale shopping carts where 99.99% availability and single-digit ms latency matter, while keeping critical financial settlement pipelines in relational ACID databases.',
      scaleDetails: 'DynamoDB peaks above 100 million requests per second during Amazon Prime Day.',
    },
    advantages: [
      'SQL: ACID guarantees, ad-hoc SQL flexibility, mature tooling, strong data integrity.',
      'NoSQL: Built-in horizontal auto-sharding, high write throughput, flexible schema evolution.',
    ],
    disadvantages: [
      'SQL: Cross-node horizontal sharding and multi-million write scaling require significant manual architecture.',
      'NoSQL: Lack of multi-table joins and cross-partition transactions forces data duplication.',
    ],
    relatedTopics: [
      { id: 'database-sharding', title: 'Database Sharding & Partitioning', module: 'system-design' },
      { id: 'normalization-denormalization', title: 'Normalization vs Denormalization', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What are the 4 main categories of NoSQL databases, with an example of each?', answer: '1) Key-Value (Redis, DynamoDB), 2) Document (MongoDB, Couchbase), 3) Wide-Column (Apache Cassandra, ScyllaDB, HBase), 4) Graph (Neo4j, Amazon Neptune).', keyPoints: ['Key-Value = Redis', 'Document = MongoDB', 'Wide-Column = Cassandra', 'Graph = Neo4j'] },
      { level: 'intermediate', question: 'What does ACID stand for in Relational Databases?', answer: 'Atomicity (all steps succeed or all roll back), Consistency (database invariants/constraints never violated), Isolation (concurrent transactions don\'t corrupt each other), Durability (committed data survives power failure via WAL).', keyPoints: ['Atomicity', 'Consistency', 'Isolation', 'Durability'] },
      { level: 'advanced', question: 'Why do Wide-Column stores like Cassandra write faster than B-Tree SQL engines for write-heavy telemetry?', answer: 'Traditional B-Tree SQL engines update fixed disk pages in-place (requiring random disk seeks and page splits on write). Cassandra uses LSM-Trees (Log-Structured Merge Trees): writes append sequentially to an in-memory MemTable and append-only Commit Log (sequential disk I/O is orders of magnitude faster than random I/O), flushing sorted SSTables asynchronously.', keyPoints: ['B-Tree = random disk seeks on write', 'LSM-Tree = sequential append-only MemTable + Commit Log'] },
    ],
    quiz: [
      { id: 'sn-1', question: 'Which database category is best suited for traversing multi-hop social friend recommendations?', options: ['Graph Database (e.g., Neo4j)', 'Flat CSV file', 'Key-Value store', 'Time-series log'], correctAnswer: 0, explanation: 'Graph databases store nodes and edges natively for O(1) adjacency traversal.' },
      { id: 'sn-2', question: 'What does the "A" in ACID stand for?', options: ['Atomicity (All-or-nothing transaction execution)', 'Availability', 'Asynchronous', 'Authentication'], correctAnswer: 0, explanation: 'Atomicity ensures partial transactions never persist—either everything commits or everything rolls back.' },
      { id: 'sn-3', question: 'Why does Cassandra achieve extraordinary write throughput?', options: ['It appends writes sequentially using LSM-Trees (MemTable + Commit Log) avoiding random disk seeks', 'It stores everything in browser cookies', 'It drops 50% of writes', 'It runs without disk storage'], correctAnswer: 0, explanation: 'LSM-Trees turn random writes into sequential memory/append operations.' },
      { id: 'sn-4', question: 'When should you strictly prefer a Relational SQL database?', options: ['When modeling complex interrelated entities requiring ACID transactions (banking, inventory)', 'When storing temporary clickstream logs with zero relations', 'When caching HTML pages for 5 seconds', 'When storing raw MP4 videos'], correctAnswer: 0, explanation: 'SQL excels at strict ACID integrity and complex relational queries.' },
      { id: 'sn-5', question: 'What trade-off does NoSQL typically accept when duplicating data across documents?', options: ['Faster single-query reads at the cost of higher storage usage and update fan-out', 'Zero read capability', 'No disk persistence', 'Single-user access'], correctAnswer: 0, explanation: 'Denormalized NoSQL trades extra storage and update complexity for rapid single-lookup reads.' },
    ],
  },

  'database-indexing': {
    id: 'database-indexing',
    title: 'Database Indexing & B-Tree Internals',
    module: 'system-design',
    category: '4. Database Design & Architecture',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Database indexes create sorted lookup data structures (typically B+ Trees) pointing directly to disk row offsets, transforming slow O(N) full table scans into fast O(log N) lookups.',
    introduction: {
      definition: 'An index is a separate, sorted auxiliary data structure maintained alongside a table that maps column values (like user_email) directly to physical disk row locations.',
      analogousStory: 'Imagine searching a 1,000-page unindexed textbook for "Reverse Proxy". Without an index, you must read page 1 to page 1,000 (Full Table Scan). With an alphabetical index at the back of the book, you jump straight to "R" in seconds and flip directly to page 412.',
      keyTakeaway: 'Indexes dramatically accelerate SELECT queries (1,000x+) at the cost of extra disk space and slightly slower INSERT/UPDATE/DELETE operations.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates multi-second O(N) full table scans on tables containing millions of rows.',
        'Prevents database CPU spikes and thread pool starvation caused by missing WHERE-clause indexes.',
        'Accelerates ORDER BY sorting and enforces UNIQUE constraints cleanly.',
      ],
      realWorldImpact: 'Adding a single missing composite index is frequently the highest-ROI optimization in backend engineering—cutting 3,000ms queries down to 2ms.',
      metricsAffected: ['Query Latency (ms)', 'Disk IOPS', 'Write Amplification Overhead'],
    },
    coreArchitecture: {
      description: 'Relational engines traverse balanced shallow B+ Trees (3-4 levels deep for 100M rows) in RAM/SSD instead of scanning raw heap data pages.',
      components: [
        { name: 'Query Planner', role: 'Index vs Scan Selector', details: 'Evaluates cardinality and chooses Index Seek over Sequential Scan.' },
        { name: 'B+ Tree Index Structure', role: 'Fast Sorted Lookup', details: 'Balanced multi-way search tree keeping leaf pointers sorted for instant range and equality queries.' },
        { name: 'Heap Table Pages', role: 'Full Row Storage', details: 'Raw unordered table blocks storing full column records on SSD.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Query Parsing & Planning', technicalDetail: 'DB receives `SELECT * FROM users WHERE email = "a@b.com"` and checks catalog stats.' },
        { stepNumber: 2, action: 'B+ Tree Traversal', technicalDetail: 'Engine hops root -> branch -> leaf node in just 3 disk/RAM reads (O(log N)).' },
        { stepNumber: 3, action: 'Heap Row Fetch', technicalDetail: 'Leaf node returns exact page pointer; DB fetches the single row immediately.' },
      ],
    },
    visualizationId: 'db-index-3d',
    visualizationScene: 'caching',
    visualizationModes: [
      { id: 'cache-hit', label: 'Indexed B-Tree Lookup (2ms)' },
      { id: 'cache-miss', label: 'Unindexed Full Scan -> Slow I/O' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: SQL Query Reaches Engine', description: 'Application executes WHERE email = ... query.', activeNodes: ['client-1', 'app-server'], packet: { from: 'client-1', to: 'app-server', label: 'SELECT WHERE email=...', type: 'request' } },
      { step: 2, title: 'Step 2: B+ Tree Index Seek vs Full Table Scan', description: 'Indexed query traverses shallow B-Tree directly in RAM/Cache; unindexed query scans huge disk pages.', activeNodes: ['app-server', 'redis-cache'], packet: { from: 'app-server', to: 'redis-cache', label: 'B+ Tree Leaf Pointer (O log N)', type: 'cached' } },
      { step: 3, title: 'Step 3: Direct Disk Row Retrieval', description: 'Using the leaf offset, DB retrieves the exact row without scanning millions of unrelated rows.', activeNodes: ['database'], packet: { from: 'database', to: 'client-1', label: 'Exact Row Returned (1.8ms)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-1', name: 'SQL Query Client', role: 'Caller', description: 'Executes read and write SQL statements.' },
      { id: 'app-server', name: 'Query Optimizer / Planner', role: 'Execution Engine', description: 'Analyzes EXPLAIN plans and chooses optimal B-Tree indexes.' },
      { id: 'redis-cache', name: 'B+ Tree Index Pages (RAM Buffer)', role: 'O(log N) Index', description: 'Sorted index tree structure enabling sub-2ms key seeks.' },
      { id: 'database', name: 'Table Heap Pages (Disk)', role: 'Full Row Blocks', description: 'Physical data pages containing full table records.' },
    ],
    realWorldExample: {
      company: 'PostgreSQL Production Systems',
      scenario: 'Querying 500 million order records by `(customer_id, created_at DESC)`.',
      implementation: 'A composite B+ Tree index on `(customer_id, created_at)` allows PostgreSQL to jump straight to a customer\'s newest orders in 4 tree hops without sorting or scanning the other 499.9M rows. A "Covering Index" (`INCLUDE total_amount`) serves the query completely from the index without touching the main table heap at all!',
      scaleDetails: 'Drops query execution time from 45 seconds to < 2 milliseconds.',
    },
    advantages: [
      'Orders of magnitude faster SELECT lookups, sorting, and range queries.',
      'Covering indexes eliminate main table heap reads entirely.',
    ],
    disadvantages: [
      'Write penalty: Every INSERT, UPDATE, and DELETE must also update every index on that table.',
      'Consumes substantial RAM and disk storage if tables are over-indexed blindly.',
    ],
    relatedTopics: [
      { id: 'sql-vs-nosql', title: 'Relational vs NoSQL Databases', module: 'system-design' },
      { id: 'database-sharding', title: 'Database Sharding', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why shouldn\'t you simply add an index to every single column in a table?', answer: 'Indexes consume extra disk/RAM and slow down every INSERT, UPDATE, and DELETE because the database must rebalance and update every B-Tree index on every write mutation.', keyPoints: ['Write amplification overhead', 'Extra RAM/SSD consumption'] },
      { level: 'intermediate', question: 'Why does column order matter in a Composite Index `(A, B)` (Leftmost Prefix Rule)?', answer: 'A composite B+ Tree on `(country, city)` sorts entries primarily by `country`, and then by `city` within each country. Queries filtering by `country` alone or `country AND city` use the index. However, a query filtering ONLY by `city` skips the leftmost prefix and usually cannot use the sorted tree efficiently.', keyPoints: ['Leftmost prefix rule', 'Sorted by col1 first, then col2'] },
      { level: 'advanced', question: 'Distinguish a Clustered Index from a Non-Clustered (Secondary) Index.', answer: 'In a Clustered Index (like MySQL InnoDB Primary Key), the actual table rows are physically stored sorted inside the leaf nodes of the B+ Tree—meaning there can be only ONE clustered index per table, and PK lookups require zero secondary jump. A Non-Clustered Index stores only the indexed key and a pointer (row ID or PK) back to the main table, requiring a second lookup unless it is a Covering Index.', keyPoints: ['Clustered = Leaf nodes ARE the physical data rows (max 1 per table)', 'Non-Clustered = Leaf nodes point to PK/row location'] },
    ],
    quiz: [
      { id: 'idx-1', question: 'What data structure powers standard SQL indexes to support both equality and range (`<`, `>`) queries?', options: ['B+ Tree', 'Unsorted Linked List', 'Stack', 'Single Hash Bucket'], correctAnswer: 0, explanation: 'B+ Trees keep keys sorted in linked leaf nodes, making range scans and equality seeks O(log N).' },
      { id: 'idx-2', question: 'What is the main downside of having 15 indexes on a write-heavy table?', options: ['Every INSERT/UPDATE becomes much slower because all 15 index trees must be updated', 'SELECT queries stop working', 'SQL syntax breaks', 'Tables delete rows'], correctAnswer: 0, explanation: 'Write mutations must synchronize every associated index.' },
      { id: 'idx-3', question: 'According to the Leftmost Prefix Rule, which query CANNOT effectively use an index on `(last_name, first_name)`?', options: ['WHERE first_name = "Alice"', 'WHERE last_name = "Smith"', 'WHERE last_name = "Smith" AND first_name = "Alice"', 'WHERE last_name LIKE "Sm%"'], correctAnswer: 0, explanation: 'Skipping the leftmost column (`last_name`) prevents efficient B-Tree range narrowing.' },
      { id: 'idx-4', question: 'What is a "Covering Index"?', options: ['An index that contains all columns requested by a query, avoiding main table heap reads completely', 'An encrypted password column', 'A backup database server', 'A table with no primary key'], correctAnswer: 0, explanation: 'Covering indexes allow Index-Only Scans with zero extra disk fetches.' },
      { id: 'idx-5', question: 'How many Clustered Indexes can exist on a single SQL table?', options: ['One (because data rows can only be physically sorted in one order)', 'Unlimited', 'Exactly seven', 'Zero'], correctAnswer: 0, explanation: 'Physical row sorting defines a single clustered order per table.' },
    ],
  },

  'database-sharding': {
    id: 'database-sharding',
    title: 'Database Sharding & Horizontal Partitioning',
    module: 'system-design',
    category: '4. Database Design & Architecture',
    readTime: '11 min',
    difficulty: 'Advanced',
    summary: 'Database sharding splits massive tables horizontally across multiple independent physical database servers ("shards"), distributing storage and write load beyond single-machine limits.',
    introduction: {
      definition: 'Sharding (Horizontal Partitioning across nodes) divides rows of a massive database table across multiple autonomous database instances, each holding an isolated subset of rows determined by a Shard Key.',
      analogousStory: 'When a city library grows from 10,000 books to 50 million books, no single room can hold them all. You open 4 branch libraries across town: Branch 1 holds authors A–F, Branch 2 holds G–M, Branch 3 holds N–S, Branch 4 holds T–Z. Every patron goes straight to the branch holding their author\'s slice.',
      keyTakeaway: 'Sharding scales WRITES and STORAGE horizontally across machines—whereas Read Replicas only scale READS.',
    },
    whyRequired: {
      problemsSolved: [
        'Solves write throughput bottlenecks when one primary database saturates maximum CPU/SSD IOPS.',
        'Overcomes single-machine disk storage ceilings when tables hit tens of terabytes.',
        'Keeps B-Tree indexes small enough per shard to stay warm in RAM.',
      ],
      realWorldImpact: 'Discord, Instagram, Slack, and Uber shard user, message, and trip datasets across hundreds of physical database clusters.',
      metricsAffected: ['Aggregate Write QPS', 'Index RAM Residency', 'Cross-Shard Query Overhead'],
    },
    coreArchitecture: {
      description: 'A Shard Router / Proxy inspects the Shard Key (e.g., `user_id` or `tenant_id`), hashes or maps its range, and routes queries exclusively to the owning physical shard.',
      components: [
        { name: 'Shard Coordinator / Router', role: 'Query Dispatcher', details: 'Computes `hash(shard_key) % N` or checks a Range Directory to pinpoint the target shard.' },
        { name: 'Shard 1, 2, 3 (Isolated DBs)', role: 'Horizontal Data Slices', details: 'Independent physical database servers storing disjoint subsets of rows.' },
        { name: 'Shard Key Selection', role: 'Distribution Determinant', details: 'Critical column (e.g. `user_id`) governing even distribution and preventing hotspots.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Extract Shard Key', technicalDetail: 'App or Vitess proxy parses `WHERE user_id = 9821`.' },
        { stepNumber: 2, action: 'Evaluate Hash / Range Map', technicalDetail: 'Computes shard assignment (Hash Modulo or Consistent Hashing Ring) -> Shard 2.' },
        { stepNumber: 3, action: 'Execute Single-Shard Query', technicalDetail: 'Only Shard 2 executes the read/write, leaving Shards 1 & 3 completely untouched.' },
      ],
    },
    visualizationId: 'db-sharding-3d',
    visualizationScene: 'database-sharding',
    visualizationModes: [
      { id: 'hash-sharding', label: 'Hash-Based Sharding' },
      { id: 'range-sharding', label: 'Range-Based Sharding' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Application Sends Partitioned Query', description: 'Application sends write/read request containing the Shard Key (`user_id`).', activeNodes: ['app-client', 'shard-router'], packet: { from: 'app-client', to: 'shard-router', label: 'Query user_id=9821', type: 'request' } },
      { step: 2, title: 'Step 2: Router Hashes Key -> Shard 2', description: 'Shard Router maps key directly to Shard 2 without touching Shards 1 or 3.', activeNodes: ['shard-router', 'shard-2'], packet: { from: 'shard-router', to: 'shard-2', label: 'Route -> Shard 2', type: 'sync' } },
      { step: 3, title: 'Step 3: Multi-Key Lookup Routes to Shard 1', description: 'Different user_id hashes evenly to Shard 1, spreading load and storage horizontally.', activeNodes: ['shard-router', 'shard-1'], packet: { from: 'shard-router', to: 'shard-1', label: 'Query user_id=104 -> Shard 1', type: 'request' } },
      { step: 4, title: 'Step 4: Return Shard Result', description: 'Target shard executes fast query on smaller local indexes and responds.', activeNodes: ['shard-2', 'app-client'], packet: { from: 'shard-2', to: 'app-client', label: 'Row Result (12ms)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'app-client', name: 'Application Service', role: 'Query Origin', description: 'Supplies Shard Key on every data request.' },
      { id: 'shard-router', name: 'Shard Router (Vitess / Citus)', role: 'Partition Mapper', description: 'Routes queries cleanly using Hash or Range shard directories.' },
      { id: 'shard-1', name: 'Database Shard 1', role: 'Horizontal Partition #1', description: 'Owns slice 1 of rows and indexes.' },
      { id: 'shard-2', name: 'Database Shard 2', role: 'Horizontal Partition #2', description: 'Owns slice 2 of rows and indexes.' },
      { id: 'shard-3', name: 'Database Shard 3', role: 'Horizontal Partition #3', description: 'Owns slice 3 of rows and indexes.' },
    ],
    realWorldExample: {
      company: 'Slack & YouTube (Vitess)',
      scenario: 'Scaling MySQL beyond single-node write limits for billions of workspaces and video metadata rows.',
      implementation: 'YouTube built Vitess (later adopted by Slack, GitHub, and PlanetScale) as a clustering proxy sitting over sharded MySQL instances. Vitess parses SQL, routes by `channel_id` / `workspace_id`, and supports live zero-downtime shard splitting.',
      scaleDetails: 'Powers tens of millions of QPS across thousands of sharded MySQL pods.',
    },
    advantages: [
      'Near-infinite horizontal scaling of both write throughput and disk storage.',
      'Smaller per-shard B-Tree indexes keep hot data resident in memory.',
    ],
    disadvantages: [
      'Cross-shard SQL JOINs and distributed ACID transactions become painfully slow or impossible.',
      'Resharding (adding new shards later) requires complex data migration unless Consistent Hashing is used.',
      'Celebrity/Hotspot Keys: One mega-influencer account can still overload a single shard.',
    ],
    relatedTopics: [
      { id: 'consistent-hashing', title: 'Consistent Hashing & Hash Ring', module: 'system-design' },
      { id: 'database-replication', title: 'Database Replication & Read Replicas', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the difference between Horizontal Partitioning and Sharding?', answer: 'Horizontal partitioning splits rows into smaller tables/partitions inside the SAME physical database server (e.g. PostgreSQL table partitioning by month). Sharding takes horizontal partitioning a step further by placing those partitions across DIFFERENT independent physical database servers.', keyPoints: ['Partitioning = Split tables on 1 server', 'Sharding = Split across multiple separate servers'] },
      { level: 'intermediate', question: 'What makes a good Shard Key, and what is the "Celebrity / Hotspot" problem?', answer: 'A good shard key has high cardinality, even data distribution, and aligns with the most frequent query filter (`WHERE tenant_id = ?`). If you shard Twitter tweets by `author_id`, Justin Bieber\'s shard gets 100x more traffic than others (Hotspot Problem). Hashing `tweet_id` or adding salt suffixes splits celebrity hot keys across shards.', keyPoints: ['High cardinality + matches query access patterns', 'Avoid hotspots via composite/salted shard keys'] },
      { level: 'advanced', question: 'How do you handle a cross-shard query (like searching all users by email when sharded by `user_id`)?', answer: '1) Scatter-Gather: Query ALL shards in parallel and merge results (slow, doesn\'t scale well). 2) Secondary Lookup Table / Global Index: Maintain a separate lightweight table mapping `email -> user_id`, or replicate searchable fields asynchronously to an Elasticsearch cluster for cross-shard queries.', keyPoints: ['Scatter-Gather fails as shard count grows', 'Secondary global lookup table or Elasticsearch index'] },
    ],
    quiz: [
      { id: 'sh-1', question: 'What is the primary reason to adopt Database Sharding instead of only Read Replicas?', options: ['To scale WRITE throughput and storage capacity beyond one machine', 'To eliminate primary keys', 'To enable SQL JOINs across servers', 'To remove network latency'], correctAnswer: 0, explanation: 'Read replicas only scale reads; sharding splits data so writes and disk storage scale horizontally.' },
      { id: 'sh-2', question: 'Which problem occurs when one specific Shard Key receives orders of magnitude more traffic than others?', options: ['Hotspot / Celebrity Partition Skew', 'Cache Hit', 'Three-Way Handshake', 'TCP Flow Control'], correctAnswer: 0, explanation: 'Uneven access patterns create hotspot shards while peer shards stay idle.' },
      { id: 'sh-3', question: 'Why are SQL `JOIN` operations discouraged across different database shards?', options: ['Fetching and joining rows across multiple network servers incurs huge latency and locks', 'SQL parsers forbid JOIN keywords', 'Shards cannot store integers', 'It breaks CSS rendering'], correctAnswer: 0, explanation: 'Cross-shard joins require expensive scatter-gather network traffic.' },
      { id: 'sh-4', question: 'How does Range-Based Sharding differ from Hash-Based Sharding?', options: ['Range groups adjacent IDs together (easy range scans, risk of hotspot on newest IDs); Hash spreads keys uniformly', 'Range only works for strings', 'Hash requires manual human routing', 'They are identical'], correctAnswer: 0, explanation: 'Range sharding risks overloading the newest/latest ID shard, whereas Hash balances load uniformly.' },
      { id: 'sh-5', question: 'What open-source proxy built by YouTube manages live MySQL sharding and resharding?', options: ['Vitess', 'Nginx', 'Wireshark', 'Redis'], correctAnswer: 0, explanation: 'Vitess orchestrates horizontal MySQL sharding at massive cloud scale.' },
    ],
  },

  'database-replication': {
    id: 'database-replication',
    title: 'Database Replication & Read Replicas (Primary-Replica Architecture)',
    module: 'system-design',
    category: '4. Database Design & Architecture',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Database replication maintains live synchronized copies of data across multiple database nodes, scaling read traffic horizontally and providing automatic failover high availability.',
    introduction: {
      definition: 'Database replication copies write mutations from a Primary (Leader/Master) database node to one or more Replica (Follower/Standby) database nodes via Write-Ahead Logs (WAL) or Binary Logs.',
      analogousStory: 'A head author writes chapters in a master manuscript (Primary DB). Photocopies are constantly distributed to 5 regional reading rooms (Read Replicas). Visitors can read books smoothly in all 5 rooms simultaneously without crowding the author\'s desk.',
      keyTakeaway: 'Most web apps are 90-99% read-heavy—Read Replicas scale reads cleanly, while Standby Replicas prevent total outages if the Primary dies.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents heavy SELECT analytics or feed queries from locking up write transactions on the Primary.',
        'Provides instant high-availability failover if the Primary hardware catches fire or suffers disk failure.',
        'Places Read Replicas in distant geographic regions (US, EU, Asia) for lower read latency.',
      ],
      realWorldImpact: 'Every production PostgreSQL/MySQL deployment runs at least 1 Multi-AZ failover replica and dedicated read replicas.',
      metricsAffected: ['Aggregate Read QPS', 'Replication Lag (ms)', 'Recovery Point Objective (RPO)'],
    },
    coreArchitecture: {
      description: 'Application splits Writes (INSERT/UPDATE/DELETE) exclusively to Primary DB, while Read queries distribute across Read Replicas fed by WAL streaming.',
      components: [
        { name: 'Primary Leader DB', role: 'Authoritative Writer', details: 'Accepts all writes, commits to WAL, and streams log changes to replicas.' },
        { name: 'Synchronous Standby Replica', role: 'Zero-Data-Loss HA', details: 'Confirms WAL flush before Primary returns ACK to client.' },
        { name: 'Asynchronous Read Replicas', role: 'Read Scaling Pool', details: 'Applies WAL stream asynchronously with minor lag (5-50ms) to serve high-volume reads.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Write Hits Primary', technicalDetail: 'Application submits INSERT/UPDATE to Primary Leader.' },
        { stepNumber: 2, action: 'WAL Log Replication', technicalDetail: 'Primary streams binary/WAL changes to Replicas (Sync waits for ACK; Async fires and returns).' },
        { stepNumber: 3, action: 'Read Scaling Offload', technicalDetail: 'Read-only API services route SELECT queries across Replica pool.' },
      ],
    },
    visualizationId: 'db-rep-3d',
    visualizationScene: 'database-replication',
    visualizationModes: [
      { id: 'async-replication', label: 'Async Replication (Fast Writes)' },
      { id: 'sync-replication', label: 'Sync Replication (Zero Data Loss)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Write Mutation Sent to Primary', description: 'Write service issues INSERT/UPDATE exclusively to the Primary Leader DB.', activeNodes: ['write-client', 'primary-db'], packet: { from: 'write-client', to: 'primary-db', label: 'INSERT INTO orders', type: 'request' } },
      { step: 2, title: 'Step 2: WAL Stream Replicated to Replica 1', description: 'Primary streams Write-Ahead Log changes to Replica 1 (Sync mode awaits confirmation before returning!).', activeNodes: ['primary-db', 'replica-1'], packet: { from: 'primary-db', to: 'replica-1', label: 'Stream WAL Changes', type: 'sync' } },
      { step: 3, title: 'Step 3: Syncing Remaining Read Replicas', description: 'Replica 2 receives WAL logs asynchronously to stay fresh.', activeNodes: ['primary-db', 'replica-2'], packet: { from: 'primary-db', to: 'replica-2', label: 'Update Replica 2', type: 'sync' } },
      { step: 4, title: 'Step 4: Read Client Queries Replica 3', description: 'Read-heavy requests query Read Replicas directly, leaving Primary CPU free for writes.', activeNodes: ['read-client', 'replica-3'], packet: { from: 'read-client', to: 'replica-3', label: 'SELECT * (Read Scaling)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'write-client', name: 'Write Workload Service', role: 'Mutation Client', description: 'Executes INSERT/UPDATE/DELETE operations against Primary.' },
      { id: 'read-client', name: 'Read Workload Service', role: 'Query Client', description: 'Executes SELECT queries distributed across Read Replicas.' },
      { id: 'primary-db', name: 'Primary Database Leader', role: 'Authoritative Writer', description: 'Single point of write truth broadcasting WAL changes.' },
      { id: 'replica-1', name: 'Replica 01 (HA Failover)', role: 'Sync / Warm Standby', description: 'Ready for instant leader promotion.' },
      { id: 'replica-2', name: 'Replica 02', role: 'Read Pool Member', description: 'Absorbs catalog and search SELECT traffic.' },
      { id: 'replica-3', name: 'Replica 03', role: 'Analytics / Feed Reader', description: 'Offloads heavy reporting queries.' },
    ],
    realWorldExample: {
      company: 'GitHub & Instagram',
      scenario: 'Handling huge read-heavy social feeds and repository lookups with MySQL/PostgreSQL.',
      implementation: 'Both platforms deploy primary writers backed by tiers of read replicas behind HAProxy/ProxySQL pools, automatically routing heavy read traffic away from primaries while keeping standby replicas ready for instant promotion.',
      scaleDetails: 'Supports millions of reads per second with 99.99% uptime.',
    },
    advantages: [
      'Scales read capacity linearly by simply attaching more Read Replicas.',
      'Provides immediate disaster recovery and hardware failover.',
    ],
    disadvantages: [
      'Replication Lag: Under async mode, a user who just updated their profile might briefly see old data when hitting a lagged replica.',
      'Multi-Master (Write-Write) replication introduces complex write conflict resolution.',
    ],
    relatedTopics: [
      { id: 'database-sharding', title: 'Database Sharding', module: 'system-design' },
      { id: 'cap-theorem', title: 'CAP Theorem', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is "Replication Lag", and how does it cause the Read-Your-Own-Writes anomaly?', answer: 'In asynchronous replication, the Primary confirms a write immediately before replicas finish applying the WAL stream (lagging by 10–500ms). If a user updates their avatar (written to Primary) and immediately refreshes the page (read from a lagged Replica), they see their OLD avatar and think it failed.', keyPoints: ['Async delay between Primary commit and Replica update', 'Solution: Route user\'s own reads to Primary for a brief window after write'] },
      { level: 'intermediate', question: 'Explain the trade-off between Synchronous and Asynchronous replication.', answer: 'Synchronous replication guarantees zero data loss (RPO=0) because Primary waits for Replica acknowledgment before confirming commit—but write latency doubles and if the replica stalls, writes block. Asynchronous replication keeps writes super fast and decoupled, at the risk of losing the last few milliseconds of uncommitted replica logs if Primary explodes.', keyPoints: ['Sync = Zero data loss, higher write latency, lower availability', 'Async = Fast writes, slight risk of recent data loss on sudden Primary death'] },
      { level: 'advanced', question: 'What is a "Split-Brain" scenario during database failover, and how is it prevented?', answer: 'Split-Brain occurs when a network glitch makes standby Replica B think Primary A died, so Replica B promotes itself to Primary—yet Primary A is actually still alive and accepting writes! Both accept conflicting writes simultaneously, corrupting data. Prevented using fencing tokens (STONITH), odd-numbered consensus quorums (Raft/Patroni), and lease TTLs.', keyPoints: ['Two primaries accepting conflicting writes simultaneously', 'Prevent via odd-numbered Raft quorum + STONITH fencing tokens'] },
    ],
    quiz: [
      { id: 'rep-1', question: 'How do you fix the "Read-Your-Own-Writes" issue caused by async replication lag?', options: ['Route reads for a user\'s newly modified record temporarily to the Primary DB', 'Delete the Primary DB', 'Stop using replicas altogether', 'Disable user logins'], correctAnswer: 0, explanation: 'Pinning a user\'s post-write reads briefly to Primary guarantees fresh consistency.' },
      { id: 'rep-2', question: 'What does Synchronous Replication guarantee if the Primary suffers total hardware destruction?', options: ['Zero committed data loss (RPO = 0) because the standby already flushed the change', 'Zero read latency globally', 'Infinite free disk space', 'Automatic SQL query rewriting'], correctAnswer: 0, explanation: 'Sync replicas commit alongside the primary before returning success to the caller.' },
      { id: 'rep-3', question: 'What is "Split-Brain" in database replication?', options: ['Two nodes simultaneously believing they are the sole Primary writer due to a network partition', 'A fast B-Tree index', 'Splitting a table into columns', 'Compressing JSON payloads'], correctAnswer: 0, explanation: 'Dual primaries cause silent, catastrophic data divergence.' },
      { id: 'rep-4', question: 'Which workload benefits most from adding 5 Read Replicas?', options: ['Read-heavy social feeds (95% SELECT, 5% INSERT)', 'Write-only IoT sensor ingestion (99% INSERT)', 'Single-user local CLI tool', 'Static image hosting'], correctAnswer: 0, explanation: 'Read replicas distribute SELECT load; writes must still execute across every replica.' },
      { id: 'rep-5', question: 'What log stream carries mutations from Primary to Replicas in PostgreSQL?', options: ['WAL (Write-Ahead Log)', 'HTML Error Log', 'DNS Zone File', 'ARP Cache'], correctAnswer: 0, explanation: 'WAL streaming continuously ships physical/logical page updates to replicas.' },
    ],
  },

  'normalization-denormalization': {
    id: 'normalization-denormalization',
    title: 'Database Normalization vs Denormalization',
    module: 'system-design',
    category: '4. Database Design & Architecture',
    readTime: '8 min',
    difficulty: 'Intermediate',
    summary: 'Normalization eliminates redundant data across structured tables to guarantee update integrity, whereas Denormalization intentionally duplicates columns to eliminate expensive multi-table JOINs for ultra-fast reads.',
    introduction: {
      definition: 'Normalization (1NF, 2NF, 3NF) organizes relational tables so every fact appears once, eliminating update anomalies. Denormalization purposefully embeds duplicate attributes (like `author_name` inside `posts`) to optimize read-heavy workloads.',
      analogousStory: 'Normalization is keeping a single master address book: if your friend moves, you edit 1 line and every department sees the update. Denormalization is printing their address directly onto every shipping envelope in advance: faster to grab and read, though if they move you must reprint multiple labels.',
      keyTakeaway: 'Normalize for write integrity (OLTP banking/inventory); Denormalize selectively for high-scale read speed (feeds, dashboards, NoSQL).',
    },
    whyRequired: {
      problemsSolved: [
        'Normalization stops update anomalies where editing a user\'s email leaves stale copies in 4 other tables.',
        'Denormalization prevents multi-way SQL JOINs across sharded or high-concurrency tables from grinding reads to a halt.',
      ],
      realWorldImpact: 'Social feeds, e-commerce product listings, and analytics warehouses denormalize heavily to return full cards in a single read.',
      metricsAffected: ['Read Join Latency', 'Storage Footprint', 'Write Update Anomaly Risk'],
    },
    coreArchitecture: {
      description: 'Write models remain normalized in the Primary relational core while read-optimized replicas or materialized views denormalize payloads.',
      components: [
        { name: 'Normalized Primary (3NF)', role: 'Integrity Core', details: 'Eliminates data redundancy using Foreign Keys.' },
        { name: 'Denormalized Read Store', role: 'Zero-Join Read Speed', details: 'Stores pre-joined JSON/row projections for instant UI loading.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Store Atomic Facts (3NF)', technicalDetail: 'Orders table stores `user_id` FK rather than repeating `user_name` and `user_address`.' },
        { stepNumber: 2, action: 'Identify Expensive Read Joins', technicalDetail: 'Feed endpoints joining 6 tables under 50k RPS hit CPU bottlenecks.' },
        { stepNumber: 3, action: 'Project Denormalized Read Views', technicalDetail: 'Pre-compute/embed `author_name` and `avatar_url` directly into feed rows or Redis cache.' },
      ],
    },
    visualizationId: 'norm-denorm-3d',
    visualizationScene: 'database-replication',
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Normalized Write Commits Cleanly', description: 'Transaction commits strictly normalized rows to Primary DB with zero duplicate anomalies.', activeNodes: ['write-client', 'primary-db'], packet: { from: 'write-client', to: 'primary-db', label: 'Normalized 3NF Commit', type: 'request' } },
      { step: 2, title: 'Step 2: Project Denormalized Read View', description: 'Materialized view / replica projects pre-joined records for zero-join instant retrieval.', activeNodes: ['primary-db', 'replica-3'], packet: { from: 'primary-db', to: 'replica-3', label: 'Project Pre-Joined View', type: 'sync' } },
      { step: 3, title: 'Step 3: High-Speed Zero-Join Read', description: 'Read services retrieve complete payloads in 1 single lookup without joining 6 tables.', activeNodes: ['read-client', 'replica-3'], packet: { from: 'read-client', to: 'replica-3', label: 'Single-Read Fetch (No JOIN)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'write-client', name: 'Normalized Writer', role: 'OLTP Mutator', description: 'Maintains single source of truth without duplicate update bugs.' },
      { id: 'primary-db', name: 'Normalized Core DB (3NF)', role: 'Canonical Store', description: 'Enforces Foreign Keys and Third Normal Form.' },
      { id: 'replica-3', name: 'Denormalized Read Projection', role: 'Zero-Join Store', description: 'Serves complete pre-joined records cleanly.' },
      { id: 'read-client', name: 'High-Traffic Feed Reader', role: 'Fast Consumer', description: 'Reads UI cards in 1 query.' },
    ],
    realWorldExample: {
      company: 'Facebook / Instagram Feeds',
      scenario: 'Rendering a post card showing author name, avatar, post text, and comment count at 100k+ RPS.',
      implementation: 'Instead of running expensive live 5-table SQL JOINs across billions of rows on every page scroll, feed tables/caches embed denormalized summary fields (`like_count`, `author_name`) directly alongside the post.',
      scaleDetails: 'Reduces read CPU by >80% at massive feed concurrency.',
    },
    advantages: [
      'Normalization: Zero duplicate waste, clean ACID updates.',
      'Denormalization: Blazing fast read queries with zero JOIN overhead.',
    ],
    disadvantages: [
      'Normalization: Requires multi-table JOINs that bottleneck across distributed shards.',
      'Denormalization: Extra disk usage and complex background updates when shared fields change.',
    ],
    relatedTopics: [
      { id: 'sql-vs-nosql', title: 'SQL vs NoSQL', module: 'system-design' },
      { id: 'cqrs-event-sourcing', title: 'CQRS & Event Sourcing', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Briefly summarize 1NF, 2NF, and 3NF in SQL normalization.', answer: '1NF: Atomic column values (no comma-separated lists in one cell) + primary key. 2NF: In 1NF, and non-key columns depend on the ENTIRE composite primary key. 3NF: In 2NF, and non-key columns have no transitive dependencies ("depend on the key, the whole key, and nothing but the key").', keyPoints: ['1NF = Atomic values', '2NF = Full PK dependency', '3NF = No transitive non-key dependencies'] },
      { level: 'intermediate', question: 'When is Denormalization a smart engineering optimization?', answer: 'When a workload is heavily read-dominant (e.g. >95% reads), multi-table JOINs cause high CPU latency, or data has been horizontally sharded across servers where cross-node JOINs are impossible.', keyPoints: ['Extreme read-to-write ratio', 'Sharded NoSQL / distributed DBs', 'Pre-computed summary counters like `likes_count`'] },
      { level: 'advanced', question: 'If you denormalize `username` onto 10 million `comments` rows, how do you safely handle a user changing their username?', answer: 'Update the canonical `users` table immediately, then emit an asynchronous `UserRenamed` event to a background queue (Kafka/worker) that batches updates across the `comments` shards slowly over time without locking production traffic—or use read-time caching with short TTLs for profile metadata.', keyPoints: ['Update canonical source synchronously', 'Propagate denormalized updates asynchronously via queues'] },
    ],
    quiz: [
      { id: 'nd-1', question: 'What anomaly does 3NF Normalization specifically prevent?', options: ['Storing redundant copies of data that become inconsistent when updated partially', 'Fast SELECT queries', 'TLS encryption', 'DNS lookups'], correctAnswer: 0, explanation: 'Normalization ensures every attribute lives in one canonical place.' },
      { id: 'nd-2', question: 'Why do developers store a pre-computed `comment_count` column on a `posts` table?', options: ['Denormalization: avoids scanning and counting millions of comment rows on every feed load', 'Because SQL lacks COUNT()', 'To waste disk storage', 'To slow down reads'], correctAnswer: 0, explanation: 'Pre-aggregated counters are a classic read-optimization denormalization pattern.' },
      { id: 'nd-3', question: 'Which normal form prohibits storing a comma-separated list of phone numbers inside a single `phone` column?', options: ['First Normal Form (1NF)', 'Fifth Normal Form', 'Denormalized Form', 'Shard Form'], correctAnswer: 0, explanation: '1NF mandates atomic, indivisible values per cell.' },
      { id: 'nd-4', question: 'What is the main cost of Denormalization?', options: ['Increased storage footprint and complex synchronization on writes', 'Slower single-table reads', 'Inability to store strings', 'Mandatory downtime'], correctAnswer: 0, explanation: 'Duplicating fields speeds reads while making writes and updates heavier.' },
      { id: 'nd-5', question: 'Which database type inherently favors Denormalization by embedding nested sub-objects?', options: ['Document NoSQL (e.g., MongoDB)', 'Normalized PostgreSQL 3NF', 'DNS Root Zone', 'ARP Cache'], correctAnswer: 0, explanation: 'Document stores naturally encourage embedding related sub-entities to read whole records in one hop.' },
    ],
  },

  'caching-patterns': {
    id: 'caching-patterns',
    title: 'Caching Patterns (Cache-Aside, Read-Through, Write-Through, Write-Behind)',
    module: 'system-design',
    category: '5. Caching Strategies & Architecture',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Choosing how applications synchronize caches and databases: Cache-Aside (lazy loading), Read-Through, Write-Through (consistent synchronous), and Write-Behind (ultra-fast async batching).',
    introduction: {
      definition: 'Caching patterns specify who is responsible for loading and invalidating data between the Application, Cache, and Database during reads and writes.',
      analogousStory: 'Cache-Aside is checking your desk first and walking to the library yourself if missing. Read-Through is asking an assistant who automatically fetches from the archive and puts a copy on your desk. Write-Through makes the assistant file a new sheet in BOTH the desk binder and master cabinet before confirming. Write-Behind puts it on your desk immediately and files it to the cabinet overnight.',
      keyTakeaway: 'Cache-Aside + Write-Invalidation is the most common internet pattern; Write-Behind maximizes write speed at the risk of data loss if RAM crashes.',
    },
    whyRequired: {
      problemsSolved: [
        'Balances read freshness, write latency, and crash durability across different workloads.',
        'Avoids stale cache bugs where DB updates leave outdated values in Redis.',
        'Protects databases from write bursts using Write-Behind batch coalescing.',
      ],
      realWorldImpact: 'Online gaming leaderboards and IoT counters rely heavily on Write-Behind, whereas banking/e-commerce catalogs rely on Cache-Aside or Write-Through.',
      metricsAffected: ['Write Commit Latency', 'Cache Consistency Window', 'Data Loss Risk on Crash'],
    },
    coreArchitecture: {
      description: 'Compare synchronous Cache-Aside / Write-Through coordination against async Write-Behind buffering.',
      components: [
        { name: 'App Cache Orchestrator', role: 'Pattern Controller', details: 'Implements Cache-Aside, Write-Through, or Write-Behind logic.' },
        { name: 'Redis Memory Tier', role: 'Fast Read/Write Layer', details: 'Serves hot reads and buffers writes.' },
        { name: 'Persistent DB', role: 'Durable System of Record', details: 'Syncs synchronously (Write-Through) or asynchronously (Write-Behind).' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Cache-Aside / Read-Through', technicalDetail: 'On miss, populate cache lazily with a TTL so only actively read keys consume RAM.' },
        { stepNumber: 2, action: 'Write-Through', technicalDetail: 'Write updates to Cache AND DB synchronously—zero stale reads, higher write latency.' },
        { stepNumber: 3, action: 'Write-Behind (Write-Back)', technicalDetail: 'Write to Cache and return instantly; flush batched dirty keys to DB asynchronously.' },
      ],
    },
    visualizationId: 'cache-patterns-3d',
    visualizationScene: 'caching',
    visualizationModes: [
      { id: 'cache-hit', label: 'Read Hit / Write-Through' },
      { id: 'cache-miss', label: 'Cache-Aside Lazy Load' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Application Initiates Pattern Flow', description: 'App Server checks Redis Cache before touching disk storage.', activeNodes: ['client-1', 'app-server', 'redis-cache'], packet: { from: 'app-server', to: 'redis-cache', label: 'Check Redis Key', type: 'cached' } },
      { step: 2, title: 'Step 2: Sync / Fallback with Database', description: 'Depending on Cache-Aside miss or Write-Through sync, DB updates or fetches the authoritative record.', activeNodes: ['app-server', 'database'], packet: { from: 'app-server', to: 'database', label: 'DB Sync / Fetch', type: 'request' } },
      { step: 3, title: 'Step 3: Return Fresh Data', description: 'Cache and client stay synchronized with low future latency.', activeNodes: ['redis-cache', 'client-1'], packet: { from: 'redis-cache', to: 'client-1', label: 'Serve Fast Payload', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-1', name: 'Client Caller', role: 'Consumer', description: 'Reads and mutates records.' },
      { id: 'app-server', name: 'Application Logic', role: 'Cache Pattern Engine', description: 'Coordinates Cache-Aside vs Write-Through strategies.' },
      { id: 'redis-cache', name: 'Redis In-Memory Cache', role: 'RAM Layer', description: 'Stores hot serialized items with TTLs.' },
      { id: 'database', name: 'Primary Database', role: 'Disk Source of Truth', description: 'Persists permanent records.' },
    ],
    realWorldExample: {
      company: 'Live Video View Counters & E-Commerce Inventory',
      scenario: 'Counting millions of viral video views per minute without hammering PostgreSQL.',
      implementation: 'View increments use Write-Behind in Redis (`INCR video:99:views`), returning instantly in <1ms and flushing batched sums to SQL every 10 seconds instead of running 50,000 SQL UPDATEs per second.',
      scaleDetails: 'Compresses database write IOPS by 99.9% via batch coalescing.',
    },
    advantages: [
      'Cache-Aside: Resilient if Redis goes down (falls back to DB); only hot keys use RAM.',
      'Write-Through: Cache is always fresh with zero stale read inconsistency.',
      'Write-Behind: Blazing fast writes with massive DB write coalescing.',
    ],
    disadvantages: [
      'Write-Through pays write latency to both Cache and DB even for keys never read again.',
      'Write-Behind risks losing recent uncommitted writes if the cache server crashes before flushing.',
    ],
    relatedTopics: [
      { id: 'caching-fundamentals', title: 'Caching Fundamentals', module: 'system-design' },
      { id: 'cache-eviction-policies', title: 'Cache Eviction Policies', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Which caching pattern only loads data into the cache when it is actually requested?', answer: 'Cache-Aside (Lazy Loading) and Read-Through only populate cache entries upon a cache miss, avoiding wasting RAM on unread data.', keyPoints: ['Lazy loading on first miss', 'Conserves expensive RAM'] },
      { level: 'intermediate', question: 'When updating a record under Cache-Aside, should you UPDATE the cache value or DELETE (invalidate) the cache key?', answer: 'Deleting (invalidating) the cache key after updating the DB is strongly preferred over updating the cache value. Under concurrent writes (Thread A & B racing), updating the cache can leave Thread A\'s stale value stuck in Redis after Thread B committed newer data to the DB. Deletion forces the next read to reload cleanly.', keyPoints: ['Delete cache key > overwrite cache key', 'Avoids concurrent race-condition staleness'] },
      { level: 'advanced', question: 'What is "Cache Penetration", and how does a Bloom Filter stop it?', answer: 'Cache Penetration happens when attackers query non-existent IDs (e.g., `GET /user/-999999`) repeatedly. Every query misses Redis (not cached) AND hits the database (not found), bypassing cache protection completely! Fix it by: 1) Caching null/empty sentinel values briefly (`NULL` with 60s TTL), and 2) Placing an ultra-compact in-memory Bloom Filter in front to reject impossible non-existent keys in O(1) before hitting Redis or SQL.', keyPoints: ['Queries for missing keys bypass cache & crush DB', 'Fix: Cache NULL sentinel + Bloom Filter'] },
    ],
    quiz: [
      { id: 'cp-1', question: 'Which caching pattern risks losing recent writes if the cache node loses power before flushing to disk?', options: ['Write-Behind (Write-Back)', 'Write-Through', 'Cache-Aside', 'Read-Through'], correctAnswer: 0, explanation: 'Write-Behind acknowledges the client after writing to RAM only, flushing asynchronously later.' },
      { id: 'cp-2', question: 'Which strategy guarantees cache and database are always updated synchronously together?', options: ['Write-Through', 'Write-Behind', 'Lazy Eviction', 'Random Flush'], correctAnswer: 0, explanation: 'Write-Through writes synchronously to both cache and DB before confirming success.' },
      { id: 'cp-3', question: 'How do you prevent attackers from crashing your DB by querying millions of random non-existent IDs?', options: ['Use a Bloom Filter and/or cache short-TTL NULL markers', 'Delete the cache', 'Disable HTTPS', 'Run full table scans'], correctAnswer: 0, explanation: 'Bloom filters reject non-existent keys instantly in memory.' },
      { id: 'cp-4', question: 'In Cache-Aside updates, why is invalidating (deleting) the cache key safer than overwriting it?', options: ['Prevents race conditions where out-of-order concurrent writers leave stale data in cache', 'Deleting keys uses more RAM', 'Redis cannot overwrite strings', 'SQL requires it'], correctAnswer: 0, explanation: 'Deleting forces a clean reload on the next miss.' },
      { id: 'cp-5', question: 'Why combine Write-Through with a Read-Through TTL?', options: ['Guarantees fresh writes while still expiring cold unused keys automatically', 'Doubles network latency', 'Disables Redis', 'Prevents indexing'], correctAnswer: 0, explanation: 'Combining Write-Through with TTL maintains freshness while capping RAM growth.' },
    ],
  },

  'cache-eviction-policies': {
    id: 'cache-eviction-policies',
    title: 'Cache Eviction Policies (LRU, LFU, FIFO & TTL)',
    module: 'system-design',
    category: '5. Caching Strategies & Architecture',
    readTime: '8 min',
    difficulty: 'Intermediate',
    summary: 'Because RAM is finite and expensive, eviction algorithms (LRU, LFU, FIFO) govern which cached keys are discarded when memory reaches its capacity ceiling.',
    introduction: {
      definition: 'A Cache Eviction Policy decides which existing entry to remove from full RAM cache to make space for incoming items.',
      analogousStory: 'Your physical study desk only holds 3 textbooks. When you bring a 4th book: FIFO removes whichever book you placed on the desk earliest; LRU removes the book you haven\'t opened in the longest time; LFU removes the book you\'ve consulted the fewest total times all semester.',
      keyTakeaway: 'LRU (HashMap + Doubly Linked List) is the O(1) industry workhorse; LFU protects evergreen viral keys from being flushed by one-off batch scans.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents Redis/Memcached Out-Of-Memory (OOM) crashes when cache fills up.',
        'Maximizes Cache Hit Ratio inside constrained RAM budgets.',
        'Protects frequently accessed hot keys from one-off full-scan pollution.',
      ],
      realWorldImpact: 'Redis exposes `maxmemory-policy` options (`allkeys-lru`, `allkeys-lfu`, `volatile-ttl`) tuned specifically per application access profile.',
      metricsAffected: ['Cache Hit Ratio (%)', 'RAM Memory Footprint', 'Eviction CPU Overhead'],
    },
    coreArchitecture: {
      description: 'LRU uses a HashMap combined with a Doubly Linked List for O(1) lookup and O(1) recency promotion; LFU tracks probabilistic Morris counters.',
      components: [
        { name: 'HashMap Index', role: 'O(1) Key Lookup', details: 'Maps keys directly to linked-list cache nodes.' },
        { name: 'Doubly Linked List (LRU)', role: 'Recency Tracker', details: 'Moves accessed items to Head; evicts stale items from Tail.' },
        { name: 'Frequency Counter (LFU)', role: 'Popularity Tracker', details: 'Tracks access counts with periodic decay so evergreen hits stay warm.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Cache Reaches Maxmemory', technicalDetail: 'New Key D arrives while all 3 memory slots (A, B, C) are full.' },
        { stepNumber: 2, action: 'Evaluate Eviction Policy', technicalDetail: 'LRU evicts oldest unused slot; LFU evicts lowest access count slot; FIFO evicts oldest inserted slot.' },
        { stepNumber: 3, action: 'Insert New Key D', technicalDetail: 'Memory stays bounded without OOM crash.' },
      ],
    },
    visualizationId: 'eviction-3d',
    visualizationScene: 'cache-eviction',
    visualizationModes: [
      { id: 'lru', label: 'LRU (Least Recently Used)' },
      { id: 'lfu', label: 'LFU (Least Frequently Used)' },
      { id: 'fifo', label: 'FIFO (First In First Out)' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: Cache Slots Full (3/3 Capacity)', description: 'Memory holds Key A, Key B, and Key C at maximum capacity.', activeNodes: ['slot-1', 'slot-2', 'slot-3'], packet: { from: 'slot-4', to: 'slot-3', label: 'Memory Cap Reached', type: 'sync' } },
      { step: 2, title: 'Step 2: Key D Arrives -> Trigger Eviction', description: 'New Key D needs space. Switch between LRU, LFU, and FIFO above to inspect slot metadata!', activeNodes: ['slot-4'], packet: { from: 'slot-4', to: 'slot-1', label: 'Insert Key D', type: 'request' } },
      { step: 3, title: 'Step 3: Victim Key Evicted from RAM', description: 'Victim slot drops out of memory cleanly while Key D takes its place.', activeNodes: ['slot-1', 'slot-4'], packet: { from: 'slot-1', to: 'slot-4', label: 'Slot Evicted & Reclaimed', type: 'blocked' } },
    ],
    interactiveComponents: [
      { id: 'slot-1', name: 'Cache Slot 1 (Key A)', role: 'Eviction Candidate', description: 'Oldest untouched entry evicted under LRU/FIFO.' },
      { id: 'slot-2', name: 'Cache Slot 2 (Key B)', role: 'Active Slot', description: 'Warm memory slot holding active key.' },
      { id: 'slot-3', name: 'Cache Slot 3 (Key C)', role: 'Hot Slot', description: 'Recently accessed / high frequency entry.' },
      { id: 'slot-4', name: 'Incoming Key D', role: 'New Write Entry', description: 'Triggers eviction of victim entry when RAM is full.' },
    ],
    realWorldExample: {
      company: 'Redis 7 / Memcached',
      scenario: 'Serving billions of e-commerce product views inside fixed 64GB cache shards.',
      implementation: 'Redis implements approximated LRU (sampling 5-10 random keys and evicting the oldest) and probabilistic Morris-counter LFU to achieve near-exact eviction quality without storing massive linked-list pointers on millions of keys.',
      scaleDetails: 'Maintains >96% hit ratios at sub-millisecond speeds.',
    },
    advantages: [
      'LRU: Adapts swiftly to shifting trends ("hot today" stays cached).',
      'LFU: Immune to one-time batch crawlers flushing long-term popular items.',
    ],
    disadvantages: [
      'LRU gets polluted if a bot scans 10,000 old archives once, pushing popular items out.',
      'Strict LFU can keep old retired viral items trapped unless frequency decay is configured.',
    ],
    relatedTopics: [
      { id: 'caching-fundamentals', title: 'Caching Fundamentals', module: 'system-design' },
      { id: 'redis-architecture', title: 'Redis Architecture', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What two data structures combine to build an O(1) LRU Cache?', answer: 'A HashMap (giving O(1) lookup of any key to its node pointer) paired with a Doubly Linked List (giving O(1) removal from the middle and O(1) insertion at the Head/Tail without shifting arrays).', keyPoints: ['HashMap + Doubly Linked List', 'O(1) get() and O(1) put()'] },
      { level: 'intermediate', question: 'Why does Redis use "Approximated LRU" instead of an exact Doubly Linked List?', answer: 'Storing two 64-bit `prev`/`next` pointers per key across hundreds of millions of small Redis keys wastes gigabytes of RAM. Instead, Redis stores a tiny 24-bit timestamp in every object header and samples N random keys (default 5) to evict the oldest among the sample—saving massive RAM while matching real LRU closely.', keyPoints: ['Saves huge pointer RAM overhead', 'Random sampling achieves near-identical hit rates'] },
      { level: 'advanced', question: 'Explain the "Cache Pollution" problem in LRU and how LFU or LRU-K fixes it.', answer: 'If a single analytics job sequentially reads 1 million archived items once, standard LRU pushes out all genuinely popular homepage items because the one-time items look "most recently used". LFU (or segmented LRU / TinyLFU) protects items accessed frequently over time from being evicted by single-use scans.', keyPoints: ['Batch scans flush hot LRU keys', 'LFU / TinyLFU requires repeat hits to enter hot segment'] },
    ],
    quiz: [
      { id: 'ev-1', question: 'What is the time complexity of `get()` and `put()` in a classic HashMap + Doubly Linked List LRU Cache?', options: ['O(1)', 'O(N log N)', 'O(N^2)', 'O(N)'], correctAnswer: 0, explanation: 'Both lookup and linked-list reordering run in constant O(1) time.' },
      { id: 'ev-2', question: 'Which eviction policy is vulnerable to a single batch crawler scanning old items once and kicking out popular items?', options: ['LRU', 'LFU with decay', 'Static Pinning', 'TTL-only'], correctAnswer: 0, explanation: 'Because one-time reads look "most recently used", standard LRU can suffer scan pollution.' },
      { id: 'ev-3', question: 'Which policy evicts the key with the lowest access count?', options: ['LFU (Least Frequently Used)', 'FIFO', 'LRU', 'Random'], correctAnswer: 0, explanation: 'LFU tracks hit frequency and drops the least popular entries.' },
      { id: 'ev-4', question: 'What happens if Redis `maxmemory-policy` is set to `noeviction` and RAM fills up?', options: ['Redis rejects new write commands with an OOM error while still serving reads', 'Redis deletes the operating system', 'Redis automatically buys cloud RAM', 'Redis clears all keys'], correctAnswer: 0, explanation: '`noeviction` returns errors on memory-allocating writes once maxmemory is reached.' },
      { id: 'ev-5', question: 'Why does LFU require "frequency decay" over time?', options: ['So formerly viral keys from last month eventually lose score and yield space to newly trending keys', 'To slow down CPU clock', 'To delete passwords', 'To encrypt numbers'], correctAnswer: 0, explanation: 'Without aging/decay, old viral items hold permanent high counts forever.' },
    ],
  },

  'redis-architecture': {
    id: 'redis-architecture',
    title: 'Distributed Caching & Redis Architecture Internals',
    module: 'system-design',
    category: '5. Caching Strategies & Architecture',
    readTime: '11 min',
    difficulty: 'Advanced',
    summary: 'Explore Redis internals: single-threaded I/O multiplexing event loop, rich in-memory data structures, RDB/AOF durability, Sentinel HA, and Redis Cluster 16,384 hash slots.',
    introduction: {
      definition: 'Redis (Remote Dictionary Server) is an ultra-fast, in-memory key-value data store supporting Strings, Hashes, Lists, Sets, Sorted Sets, Streams, and HyperLogLogs, capable of sub-millisecond reads and horizontal sharding via Redis Cluster.',
      analogousStory: 'Think of a single hyper-focused chess grandmaster playing 50 speed-chess games simultaneously without ever pausing to switch rooms or wait for slow assistants—zero lock contention, instant RAM memory access.',
      keyTakeaway: 'Redis is fast not just because it runs in RAM, but because its single-threaded event loop eliminates thread context-switching and mutex locking bottlenecks.',
    },
    whyRequired: {
      problemsSolved: [
        'Powers distributed session storage, rate limiters, real-time leaderboards (Sorted Sets), and Pub/Sub notifications.',
        'Avoids multi-thread lock overhead via epoll/kqueue multiplexed event loops.',
        'Scales past single-node RAM limits using Redis Cluster\'s 16,384 hash slots.',
      ],
      realWorldImpact: 'Used across virtually every high-scale backend (Twitter, StackOverflow, GitHub, Uber, Airbnb).',
      metricsAffected: ['Sub-Millisecond P99 Latency', '100k-500k Ops/sec per Core', '16,384 Hash Slot Partitioning'],
    },
    coreArchitecture: {
      description: 'Redis Cluster partitions keys across 16,384 CRC16 hash slots spread across primary shard nodes, each backed by replica nodes and optional RDB/AOF disk persistence.',
      components: [
        { name: 'Single-Threaded Event Loop', role: 'Lock-Free Execution', details: 'Processes multiplexed network I/O (`epoll`/`kqueue`) cleanly without thread race conditions.' },
        { name: 'Redis Cluster Hash Slots (16384)', role: 'Distributed Sharding', details: 'Computes `CRC16(key) % 16384` to route keys across clustered Redis nodes.' },
        { name: 'RDB Snapshots & AOF Log', role: 'Optional Persistence', details: 'Flushes point-in-time memory snapshots (RDB) or append-only command logs (AOF) to survive restarts.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Hash Slot Calculation', technicalDetail: 'Client SDK computes `CRC16(key) % 16384` to identify which Redis Cluster shard owns the key.' },
        { stepNumber: 2, action: 'Event Loop Execution', technicalDetail: 'Redis executes command atomically in RAM in microseconds.' },
        { stepNumber: 3, action: 'Async Replication & Persistence', technicalDetail: 'Updates stream asynchronously to replica nodes and optional AOF disk buffers.' },
      ],
    },
    visualizationId: 'redis-arch-3d',
    visualizationScene: 'caching',
    visualizationModes: [
      { id: 'cache-hit', label: 'Redis In-Memory RAM Hit' },
      { id: 'cache-miss', label: 'Cache Cold Fallback & Warm' },
    ],
    visualizationType: 'system-design',
    animationSteps: [
      { step: 1, title: 'Step 1: App Computes Redis Hash Slot', description: 'Smart Redis client computes CRC16 hash slot and routes command directly to owning shard.', activeNodes: ['client-1', 'app-server'], packet: { from: 'client-1', to: 'app-server', label: 'ZADD leaderboard 990 user1', type: 'request' } },
      { step: 2, title: 'Step 2: Single-Threaded RAM Execution', description: 'Redis event loop processes Sorted Set / Hash update atomically in RAM in 0.4ms.', activeNodes: ['app-server', 'redis-cache'], packet: { from: 'app-server', to: 'redis-cache', label: 'Atomic Event Loop (0.4ms)', type: 'cached' } },
      { step: 3, title: 'Step 3: Instant Response & Async AOF', description: 'Client receives immediate reply while RDB/AOF persists to SSD asynchronously.', activeNodes: ['redis-cache', 'client-1'], packet: { from: 'redis-cache', to: 'client-1', label: 'OK (Sub-Millisecond)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-1', name: 'Application SDK', role: 'Slot-Aware Client', description: 'Caches slot topology map to talk straight to target Redis nodes.' },
      { id: 'app-server', name: 'Service Worker', role: 'Command Issuer', description: 'Runs Sorted Set, Hash, and Lua scripts on Redis.' },
      { id: 'redis-cache', name: 'Redis Shard + Event Loop', role: 'In-Memory Engine', description: 'Executes commands lock-free over multiplexed epoll I/O.' },
      { id: 'database', name: 'AOF / RDB & Cold DB', role: 'Durable Backup', description: 'Preserves snapshots and permanent relational state.' },
    ],
    realWorldExample: {
      company: 'Twitter / GitHub / Pinterest',
      scenario: 'Maintaining real-time rate-limiting buckets, session tokens, and live follower timelines.',
      implementation: 'Redis Sorted Sets (`ZSET`) score events by timestamp, allowing sliding-window rate limiters (`ZREMRANGEBYSCORE` + `ZCARD`) and instant top-K leaderboards in O(log N) memory time.',
      scaleDetails: 'Clusters serve tens of millions of commands/sec with < 1ms P99 latency.',
    },
    advantages: [
      'Sub-millisecond atomic operations without thread locking.',
      'Rich native structures (Sorted Sets, Geospatial, Streams, HyperLogLog) eliminate round trips.',
    ],
    disadvantages: [
      'RAM costs significantly more per GB than NVMe disk storage.',
      'Running heavy O(N) commands (like `KEYS *` in production) blocks the single thread for ALL clients!',
    ],
    relatedTopics: [
      { id: 'caching-fundamentals', title: 'Caching Fundamentals', module: 'system-design' },
      { id: 'rate-limiting', title: 'Rate Limiting Algorithms', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why is Redis fast despite being predominantly single-threaded for command execution?', answer: 'Because Redis operates completely in RAM (no slow disk seeks), uses non-blocking I/O multiplexing (`epoll`/`kqueue`) to serve thousands of concurrent sockets without thread-per-connection overhead, and suffers zero CPU lock contention or context switching.', keyPoints: ['In-memory RAM storage', 'Non-blocking epoll I/O multiplexing', 'Zero mutex/lock contention'] },
      { level: 'intermediate', question: 'Why should you NEVER run `KEYS *` in a production Redis instance, and what should you use instead?', answer: '`KEYS *` scans the entire memory keyspace linearly in a single blocking pass—freezing the single-threaded Redis event loop for seconds and timing out every user request. Use `SCAN` instead, which iterates incrementally in tiny cursor batches without blocking.', keyPoints: ['`KEYS *` blocks the single event loop', 'Use cursor-based `SCAN` instead'] },
      { level: 'advanced', question: 'Compare Redis RDB and AOF persistence strategies.', answer: 'RDB takes compact binary point-in-time snapshots every N minutes by `fork()`ing a background child process (fast restarts, tiny files, but loses minutes of data between snapshots). AOF (Append-Only File) logs every single write command to disk (typically `fsync` every 1 second—at most 1s data loss, larger files). Production systems often enable both together.', keyPoints: ['RDB = Point-in-time snapshots (fast recovery, larger RPO window)', 'AOF = Append-only write log (max 1s loss with everysec)'] },
    ],
    quiz: [
      { id: 'red-1', question: 'How many hash slots does Redis Cluster divide the distributed keyspace into?', options: ['16,384 slots', '100 slots', '1,000,000 slots', '7 slots'], correctAnswer: 0, explanation: 'Redis Cluster uses `CRC16(key) % 16384` across 16,384 logical slots.' },
      { id: 'red-2', question: 'Which Redis command safely iterates through keys in production without freezing the server?', options: ['SCAN', 'KEYS *', 'FLUSHALL', 'SELECT *'], correctAnswer: 0, explanation: 'SCAN iterates incrementally via cursors without blocking the single thread.' },
      { id: 'red-3', question: 'Which native Redis data structure maintains automatically sorted scored items (ideal for leaderboards and sliding-window rate limiters)?', options: ['Sorted Set (ZSET)', 'String', 'Plain List', 'Bitmap'], correctAnswer: 0, explanation: 'ZSETs store unique members ordered by floating-point score in O(log N).' },
      { id: 'red-4', question: 'What does `fork()` Copy-on-Write allow Redis RDB snapshots to do?', options: ['Persist an entire snapshot on disk in a child process without blocking main client queries', 'Double CPU cores', 'Turn RAM into TCP', 'Bypass TLS'], correctAnswer: 0, explanation: 'OS Copy-on-Write lets a forked background process dump memory safely.' },
      { id: 'red-5', question: 'Why does `redis-cli` execute Lua scripts atomically?', options: ['Redis executes a Lua script from start to finish on its single thread with zero interleaving from other clients', 'Lua compiles into HTML', 'It shuts down replicas', 'It runs across 100 threads'], correctAnswer: 0, explanation: 'Single-threaded execution makes Lua scripts naturally atomic transactions.' },
    ],
  },
};
