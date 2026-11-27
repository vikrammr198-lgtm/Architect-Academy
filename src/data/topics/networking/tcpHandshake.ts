import { TopicContent } from '../../../types';

export const tcpHandshakeTopic: TopicContent = {
  id: 'tcp-three-way-handshake',
  title: 'TCP Three-Way Handshake, Four-Way Termination & Flow Control',
  module: 'networking',
  category: 'TCP and UDP Transport Protocols',
  readTime: '11 min',
  difficulty: 'Intermediate',
  summary: 'Transmission Control Protocol (TCP) establishes reliable, full-duplex communication channels between hosts using a 3-way synchronization handshake (SYN, SYN-ACK, ACK) and guarantees ordered packet delivery.',
  introduction: {
    definition: 'The TCP Three-Way Handshake is a mechanism used to establish a stateful connection between a client and server before any application data is exchanged. It synchronizes sequence numbers and negotiates window sizes.',
    analogousStory: 'Imagine a high-stakes telephone conversation between two foreign ambassadors: Ambassador A says: "Hello, can you hear me clearly? I am ready to speak starting on page 100" (SYN, Seq=100). Ambassador B replies: "Yes, I hear your page 100 loud and clear! Can you hear me? I am ready to reply starting on page 300" (SYN-ACK, Seq=300, Ack=101). Ambassador A confirms: "Yes, I hear you loud and clear. Let us begin our secret meeting" (ACK, Ack=301). Both parties are now completely confident the line is active in both directions.',
    keyTakeaway: 'The handshake establishes mutual trust: both client and server verify they can both send and receive data reliably.',
  },
  whyRequired: {
    problemsSolved: [
      'Prevents old, delayed duplicate packets from causing phantom sessions.',
      'Synchronizes initial Sequence Numbers (ISNs) to guarantee ordered packet reconstruction.',
      'Negotiates buffer parameters (Maximum Segment Size [MSS] and Window Scale options) to prevent overwhelming either machine.',
    ],
    realWorldImpact: 'Every single web browsing click, banking transaction, and database query begins with a TCP handshake.',
    metricsAffected: [
      'Round-Trip Time (RTT) - TCP handshake adds exactly 1 full RTT before first byte of data',
      'Packet delivery reliability (100% in-order delivery guaranteed)',
      'Network buffer saturation mitigation via sliding window',
    ],
  },
  coreArchitecture: {
    description: 'TCP maintains a state machine on both client (SYN_SENT, ESTABLISHED, FIN_WAIT) and server (LISTEN, SYN_RCVD, ESTABLISHED, CLOSE_WAIT). Flags in the 20-byte TCP header govern state transitions.',
    components: [
      { name: 'SYN Flag (Synchronize)', role: 'Sequence Alignment', details: 'Initial packet sent by client containing a randomized 32-bit Initial Sequence Number (ISN).' },
      { name: 'ACK Flag (Acknowledge)', role: 'Receipt Confirmation', details: 'Confirms receipt of previous bytes by specifying the NEXT byte sequence number expected.' },
      { name: 'FIN / RST Flags', role: 'Connection Teardown', details: 'FIN initiates graceful 4-way termination; RST immediately aborts an invalid or crashed connection.' },
      { name: 'Sliding Window', role: 'Flow Control', details: 'Advertises the receiver buffer space remaining, throttling the sender if receiver CPU is saturated.' },
    ],
  },
  howItWorks: {
    steps: [
      { stepNumber: 1, action: 'Step 1: SYN', technicalDetail: 'Client sends TCP segment with SYN=1, ACK=0, Seq=X (random 32-bit integer). Client enters SYN_SENT state.' },
      { stepNumber: 2, action: 'Step 2: SYN-ACK', technicalDetail: 'Server replies with SYN=1, ACK=1, Seq=Y, and Ack=X+1. Server allocates TCB buffer and enters SYN_RCVD state.' },
      { stepNumber: 3, action: 'Step 3: ACK', technicalDetail: 'Client replies with ACK=1, Seq=X+1, and Ack=Y+1. Both endpoints enter ESTABLISHED state. Application payload can now flow.' },
      { stepNumber: 4, action: 'Data Transmission', technicalDetail: 'Application data is chunked into segments; receiver acknowledges received ranges using cumulative ACKs.' },
    ],
  },
  visualizationId: 'tcp-handshake-3d',
  visualizationScene: 'tcp-handshake',
  visualizationModes: [
    { id: 'tcp', label: 'TCP 3-Way Handshake' },
    { id: 'udp', label: 'Compare UDP (Connectionless)' },
  ],
  visualizationType: 'networking',
  animationSteps: [
    {
      step: 1,
      title: 'Step 1: Client Transmits SYN (Synchronize)',
      description: 'Client generates a randomized Initial Sequence Number (Seq = 1000) and sends a SYN packet to Server port 443.',
      activeNodes: ['client-node', 'server-node'],
      packet: { from: 'client-node', to: 'server-node', label: 'SYN [Seq=1000, ACK=0]', type: 'request' },
    },
    {
      step: 2,
      title: 'Step 2: Server Responds with SYN-ACK',
      description: 'Server accepts connection, generates its own Seq = 5000, and acknowledges client by setting Ack = 1001 (1000 + 1).',
      activeNodes: ['server-node', 'client-node'],
      packet: { from: 'server-node', to: 'client-node', label: 'SYN-ACK [Seq=5000, Ack=1001]', type: 'sync' },
    },
    {
      step: 3,
      title: 'Step 3: Client Sends Final ACK (Established)',
      description: 'Client acknowledges server Seq by sending Ack = 5001. Both sides enter the ESTABLISHED state. Channel is open!',
      activeNodes: ['client-node', 'server-node'],
      packet: { from: 'client-node', to: 'server-node', label: 'ACK [Seq=1001, Ack=5001]', type: 'response' },
    },
    {
      step: 4,
      title: 'Step 4: Full-Duplex Data Transmission',
      description: 'Client immediately piggybacks its encrypted HTTP GET request on the connection, streaming application data.',
      activeNodes: ['client-node', 'server-node'],
      packet: { from: 'client-node', to: 'server-node', label: 'HTTP Payload (Data Transfer)', type: 'request' },
    },
  ],
  interactiveComponents: [
    {
      id: 'client-node',
      name: 'Client Endpoint',
      role: 'Initiator',
      description: 'Host generating socket connection (e.g. Browser or Mobile App).',
      metrics: [
        { label: 'Client State', value: 'ESTABLISHED' },
        { label: 'Socket Port', value: '54210' },
      ],
      technologies: ['TCP/IP Stack', 'Linux Kernel Netfilter', 'POSIX Sockets'],
    },
    {
      id: 'server-node',
      name: 'Server Endpoint',
      role: 'Listener & Responder',
      description: 'Host listening on public service port (e.g. 443 for HTTPS).',
      metrics: [
        { label: 'Server State', value: 'ESTABLISHED' },
        { label: 'Listen Port', value: '443' },
      ],
      technologies: ['Nginx', 'Apache', 'Linux Epoll'],
    },
  ],
  realWorldExample: {
    company: 'Google / QUIC Working Group',
    scenario: 'Eliminating the latency penalty of the TCP Handshake + TLS Handshake on mobile networks.',
    implementation: 'Because a traditional TCP connection requires 1 RTT for TCP handshake and 1-2 RTTs for TLS handshake (total 2-3 RTTs before data flows), Google engineered QUIC (now HTTP/3) on top of UDP. QUIC combines transport and cryptographic negotiation into a single 0-RTT / 1-RTT handshake.',
    scaleDetails: 'Over 75% of Chrome web requests now run on QUIC/HTTP/3, saving hundreds of millions of seconds of mobile latency daily.',
  },
  advantages: [
    'Guaranteed reliability: Dropped packets are detected and automatically retransmitted.',
    'In-order delivery: Packets arriving out of order are reassembled based on sequence numbers.',
    'Congestion control: Protects global internet routers from collapsing under heavy traffic (TCP Cubic / BBR).',
    'Flow control: Prevents fast sender from overflowing slow receiver\'s RAM buffer.',
  ],
  disadvantages: [
    'Head-of-Line (HoL) Blocking: If packet #2 is dropped, packets #3, #4, and #5 must wait in buffer until #2 is retransmitted.',
    'Connection latency overhead: Requires 1 full RTT before application data can be transmitted.',
    'Vulnerable to SYN Flood DDoS attacks without SYN Cookies enabled.',
  ],
  relatedTopics: [
    { id: 'tcp-vs-udp', title: 'TCP vs UDP Comparison', module: 'networking' },
    { id: 'ssl-tls-handshake', title: 'SSL/TLS Handshake', module: 'networking' },
    { id: 'http-evolution-http1-2-3', title: 'HTTP Evolution (HTTP/1, 2, 3 & QUIC)', module: 'networking' },
  ],
  interviewQuestions: [
    {
      level: 'beginner',
      question: 'Why does TCP require a 3-way handshake instead of just a 2-way handshake?',
      answer: 'A 2-way handshake (Client sends SYN, Server sends ACK) is insufficient because: 1) The client would know the server received its message, but the server would have NO confirmation that the client is actually listening to its reply. 2) Delayed duplicate packets from an old, crashed connection could arrive at the server, causing the server to open a bogus ghost connection and waste memory without client confirmation.',
      keyPoints: ['Validates bi-directional communication (both send and receive paths work)', 'Prevents old duplicate packets from opening phantom connections', 'Allows mutual agreement on initial sequence numbers'],
    },
    {
      level: 'intermediate',
      question: 'What is a SYN Flood attack, and how do SYN Cookies defend against it?',
      answer: 'In a SYN Flood attack, an attacker spams thousands of SYN packets with forged, non-existent IP addresses. The server allocates a Transmission Control Block (TCB) in memory and waits in the SYN_RCVD state for the final ACK that never arrives, exhausting server memory. SYN Cookies defend against this by NOT allocating memory when receiving a SYN. Instead, the server encodes the connection parameters into the Initial Sequence Number (ISN) cryptographically using a hash of client IP, port, and a secret seed. Only when the client returns a valid ACK with that decoded cookie does the server allocate memory.',
      keyPoints: ['Attacker spams SYNs to exhaust server half-open connection queues', 'SYN Cookies eliminate memory allocation during initial SYN phase', 'Server validates mathematically upon receiving final ACK'],
    },
    {
      level: 'advanced',
      question: 'Explain TCP TIME_WAIT state and why it persists for 2*MSL (Maximum Segment Lifetime).',
      answer: 'After a host sends the final ACK to terminate a connection, it does not immediately close the socket; it enters TIME_WAIT for 2*MSL (typically 60-120 seconds). This exists for two vital reasons: 1) To ensure the final ACK was received by the peer. If that ACK was lost, the peer retransmits its FIN; if our host had already closed, it would reply with an error RST instead of a clean FIN. 2) To allow lingering delayed packets from the old connection to expire and dissipate across the internet so they cannot collide with or corrupt a future connection reusing the same 4-tuple (Src IP, Dst IP, Src Port, Dst Port).',
      keyPoints: ['Ensures peer receives final ACK reliably', 'Allows lingering packets from old connection to drain from the internet', 'Standard duration is 2 * MSL (usually 1-2 minutes)'],
    },
  ],
  quiz: [
    {
      id: 'tcp-q1',
      question: 'What is the exact sequence of packet flags exchanged during TCP connection establishment?',
      options: ['SYN -> ACK -> FIN', 'SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> DATA', 'PING -> PONG -> ACK'],
      correctAnswer: 1,
      explanation: 'TCP 3-way handshake sends SYN from client, SYN-ACK from server, and final ACK from client.',
    },
    {
      id: 'tcp-q2',
      question: 'Why are Initial Sequence Numbers (ISNs) randomized rather than starting at zero?',
      options: [
        'To prevent TCP Sequence Prediction attacks and packet collision with delayed packets from previous connections',
        'Because computers cannot count from zero in TCP',
        'To compress the packet headers',
        'To speed up CPU clock frequency',
      ],
      correctAnswer: 0,
      explanation: 'Randomized ISNs protect against attackers spoofing packets into an active connection and prevent delayed packets from old sockets from corrupting new ones.',
    },
    {
      id: 'tcp-q3',
      question: 'What mechanism does TCP use to prevent a fast sender from overwhelming a slow receiver\'s buffer?',
      options: ['Sliding Window (Flow Control)', 'DNS Round Robin', 'BGP Anycast', 'IP Subnetting'],
      correctAnswer: 0,
      explanation: 'The TCP Sliding Window advertises available receiver buffer space, throttling the sender when the buffer fills up.',
    },
    {
      id: 'tcp-q4',
      question: 'How many packets are exchanged in a standard graceful TCP connection termination?',
      options: ['1 packet', '2 packets', '4 packets (FIN, ACK, FIN, ACK)', '7 packets'],
      correctAnswer: 2,
      explanation: 'Because TCP is full-duplex, each direction closes independently, requiring 4 steps: Client FIN, Server ACK, Server FIN, Client ACK.',
    },
    {
      id: 'tcp-q5',
      question: 'What happens when a packet is dropped in a TCP connection?',
      options: [
        'The connection is permanently terminated and must be re-dialed',
        'The sender detects missing ACK via timeout or 3 duplicate ACKs and automatically retransmits the missing segment',
        'The receiver ignores it and continues playing audio/video without interruption',
        'The router generates a new packet from scratch',
      ],
      correctAnswer: 1,
      explanation: 'TCP guarantees reliability: missing segments trigger retransmission timers (RTO) or fast retransmit upon receiving 3 duplicate ACKs.',
    },
  ],
};
