import { TopicContent } from '../../../types';

export const netIpProtocolsTcpDnsTopics: Record<string, TopicContent> = {
  'ip-addressing-ipv4-ipv6': {
    id: 'ip-addressing-ipv4-ipv6',
    title: 'IP Addressing: IPv4 vs IPv6, Public vs Private & Dynamic IPs',
    module: 'networking',
    category: '4. IP Addressing & Subnetting',
    readTime: '9 min',
    difficulty: 'Beginner',
    summary: 'IP addresses uniquely identify network interfaces across subnets and global internets—spanning scarce 32-bit IPv4 (4.3B addresses + RFC 1918 Private NAT) and vast 128-bit IPv6 (340 undecillion addresses).',
    introduction: {
      definition: 'An IP address is a logical Layer 3 numerical identifier assigned to a device interface. IPv4 uses 32 bits written as four dotted octets (`192.168.1.10`); IPv6 uses 128 bits written in eight hexadecimal groups (`2001:0db8::1`).',
      analogousStory: 'IPv4 is like 7-digit telephone numbers when a town had only a few thousand homes—eventually the city ran out of numbers and had to add building extensions (Private IPs + NAT). IPv6 is giving every single grain of sand on Earth billions of its own direct phone numbers!',
      keyTakeaway: 'Public IPs route globally across the internet; RFC 1918 Private IPs (`10.x`, `172.16-31.x`, `192.168.x`) stay local behind routers using NAT.',
    },
    whyRequired: {
      problemsSolved: [
        'IPv4 ran out of its 4.29 billion addresses globally due to smartphones and IoT—solved temporarily by Private IPs + NAT and permanently by IPv6.',
        'Separates static server endpoints (Static IP) from temporary client leases (DHCP Dynamic IP).',
      ],
      realWorldImpact: 'Over 45% of global Google traffic now runs natively over IPv6 alongside legacy IPv4.',
      metricsAffected: ['Address Space Size (`2^32` vs `2^128`)', 'NAT Traversal Overhead', 'Header Routing Speed'],
    },
    coreArchitecture: {
      description: 'Compare Private LAN IP spaces translated via Border Router NAT into globally routable Public IPv4/IPv6 addresses.',
      components: [
        { name: 'Private IPv4 (RFC 1918)', role: 'Local Subnet Addressing', details: '`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` — freely reusable inside any home/VPC; dropped by public internet routers.' },
        { name: 'Public IP / Static VIP', role: 'Globally Routable', details: 'Unique address allocated by ICANN/RIRs reachable from anywhere on Earth.' },
        { name: 'IPv6 (128-bit)', role: 'Next-Gen Addressing', details: '`3.4 × 10^38` addresses with simplified 40-byte fixed header and native SLAAC autoconfig.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'DHCP Local Lease', technicalDetail: 'Laptop joins Wi-Fi and receives dynamic private IP `192.168.1.10` from router.' },
        { stepNumber: 2, action: 'NAT Border Translation', technicalDetail: 'Router translates `192.168.1.10` into ISP Public IP before crossing WAN.' },
        { stepNumber: 3, action: 'Global Delivery', technicalDetail: 'Packet reaches public server IP cleanly.' },
      ],
    },
    visualizationId: 'ip-addr-3d',
    visualizationScene: 'routing-switching',
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Private LAN Host Sends Packet', description: 'Host A uses local Private IP `192.168.1.10` inside its office LAN.', activeNodes: ['pc-a', 'switch-a'], packet: { from: 'pc-a', to: 'switch-a', label: 'Src: 192.168.1.10 (Private)', type: 'request' } },
      { step: 2, title: 'Step 2: Border Router Translates Private -> Public IP', description: 'Router A applies NAT to swap Private IP into a routable Public IP across the WAN.', activeNodes: ['router-a', 'router-b'], packet: { from: 'router-a', to: 'router-b', label: 'Public WAN IP Routing', type: 'sync' } },
      { step: 3, title: 'Step 3: Remote Subnet Receives Packet', description: 'Destination server/host receives packet seamlessly on remote subnet.', activeNodes: ['switch-b', 'pc-b'], packet: { from: 'switch-b', to: 'pc-b', label: 'Delivered to 10.0.2.20', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'pc-a', name: 'Private Host (`192.168.1.10`)', role: 'RFC 1918 Client', description: 'Uses non-routable local private IP assigned via DHCP.' },
      { id: 'switch-a', name: 'Local Switch', role: 'LAN Forwarder', description: 'Forwards frames within 192.168.1.0/24.' },
      { id: 'router-a', name: 'NAT Border Router', role: 'Public IP Translator', description: 'Holds the ISP Public IP and performs SNAT/DNAT.' },
      { id: 'router-b', name: 'Remote Gateway Router', role: 'WAN Receiver', description: 'Routes packet into remote enterprise subnet.' },
      { id: 'switch-b', name: 'Remote LAN Switch', role: 'Destination Switch', description: 'Routes local frame.' },
      { id: 'pc-b', name: 'Destination Host (`10.0.2.20`)', role: 'Target Endpoint', description: 'Receives payload.' },
    ],
    realWorldExample: {
      company: 'Cloud VPCs & Mobile Carriers (IPv6 Adoption)',
      scenario: 'Connecting 100M+ smartphones when IPv4 addresses cost $40+ per single IP on auction markets.',
      implementation: 'T-Mobile and Jio run IPv6-native mobile backbones using 464XLAT/NAT64 to reach legacy IPv4 websites—giving every phone a native IPv6 address without depleting IPv4 pools.',
      scaleDetails: 'Connects hundreds of millions of phones simultaneously.',
    },
    advantages: [
      'IPv6 eliminates NAT headaches, offers vast address space, and speeds router parsing via fixed headers.',
      'Private RFC 1918 IPs conserve IPv4 while giving automatic basic isolation behind NAT.',
    ],
    disadvantages: [
      'IPv4 and IPv6 are NOT directly compatible—requiring Dual-Stack networks or translation gateways.',
    ],
    relatedTopics: [
      { id: 'subnetting-cidr', title: 'Subnetting & CIDR Notation', module: 'networking' },
      { id: 'nat-and-vlan', title: 'NAT & VLAN Segmentation', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'List the three Private IPv4 address ranges (RFC 1918).', answer: '1) `10.0.0.0 – 10.255.255.255` (`10.0.0.0/8`), 2) `172.16.0.0 – 172.31.255.255` (`172.16.0.0/12`), 3) `192.168.0.0 – 192.168.255.255` (`192.168.0.0/16`).', keyPoints: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'] },
      { level: 'intermediate', question: 'What is `127.0.0.1` (`::1` in IPv6) vs `0.0.0.0`?', answer: '`127.0.0.1` (`localhost`) is the loopback interface allowing software on a machine to talk to itself without leaving the OS kernel. `0.0.0.0` when binding a server socket means "listen on ALL available network interfaces (loopback + Wi-Fi + Ethernet)"—while in routing tables `0.0.0.0/0` means the Default Gateway route for all internet traffic.', keyPoints: ['127.0.0.1 = Localhost loopback', '0.0.0.0 = All local interfaces (listen) or Default Route (routing)'] },
      { level: 'advanced', question: 'Why is the IPv6 header faster for hardware routers to parse than IPv4 despite being 4x longer in address bits?', answer: 'IPv4 headers have variable length (20–60 bytes due to optional fields) AND force every single router to recompute the Header Checksum every time TTL decrements! IPv6 uses a streamlined FIXED 40-byte header with NO header checksum (relying on Layer 2 CRC and Layer 4 TCP/UDP checksums) and moves options into chained Extension Headers.', keyPoints: ['Fixed 40-byte length', 'Dropped redundant L3 header checksum'] },
    ],
    quiz: [
      { id: 'ip-1', question: 'How many total bits are in an IPv4 address vs an IPv6 address?', options: ['32 bits vs 128 bits', '8 bits vs 16 bits', '64 bits vs 256 bits', '16 bits vs 32 bits'], correctAnswer: 0, explanation: 'IPv4 uses 32-bit addresses (~4.3B); IPv6 uses 128-bit addresses (3.4×10^38).' },
      { id: 'ip-2', question: 'Which IP address belongs to a Private RFC 1918 range?', options: ['172.18.42.10', '8.8.8.8', '1.1.1.1', '142.250.190.46'], correctAnswer: 0, explanation: '`172.16.0.0` through `172.31.255.255` is reserved for private networks.' },
      { id: 'ip-3', question: 'What does binding a Node.js/Python server to `0.0.0.0:8080` do?', options: ['Listens on all network interfaces available on that machine', 'Disables networking completely', 'Connects only to Google DNS', 'Blocks port 8080'], correctAnswer: 0, explanation: '`0.0.0.0` binds the socket to every local IP interface (LAN + loopback).' },
      { id: 'ip-4', question: 'What protocol automatically assigns Dynamic IP addresses, Subnet Masks, and Default Gateways to laptops joining Wi-Fi?', options: ['DHCP (Dynamic Host Configuration Protocol)', 'HTTP', 'SMTP', 'BGP'], correctAnswer: 0, explanation: 'DHCP handles automatic lease assignment via DORA (Discover, Offer, Request, Ack).' },
      { id: 'ip-5', question: 'What is the IPv6 Loopback address equivalent to IPv4 `127.0.0.1`?', options: ['::1', '255.255.255.255', '192.168.0.1', 'ff02::1'], correctAnswer: 0, explanation: '`::1` represents 127 zeroes followed by 1.' },
    ],
  },

  'subnetting-cidr': {
    id: 'subnetting-cidr',
    title: 'Subnetting, Subnet Masks & CIDR Notation Demystified',
    module: 'networking',
    category: '4. IP Addressing & Subnetting',
    readTime: '11 min',
    difficulty: 'Intermediate',
    summary: 'Subnetting divides large IP networks into isolated smaller sub-networks using bitwise Subnet Masks and CIDR slash notation (`/24`, `/26`), optimizing IP utilization, security segmentation, and broadcast control.',
    introduction: {
      definition: 'An IP address splits into a Network Prefix (identifying the street/neighborhood) and a Host ID (identifying the exact house). CIDR notation (`192.168.1.0/24`) states how many leading bits belong to the fixed Network Prefix.',
      analogousStory: 'Imagine an entire university sharing one gigantic mailing room where every announcement gets shouted over one intercom to 10,000 students (Broadcast Storm). Subnetting partitions that campus into clean departments (`Engineering /26`, `Finance /26`, `Guest Wi-Fi /25`) with dedicated door routers.',
      keyTakeaway: 'A `/N` CIDR mask leaves `(32 - N)` host bits—yielding `2^(32 - N) - 2` usable host IPs (subtracting 1 Network ID and 1 Broadcast IP).',
    },
    whyRequired: {
      problemsSolved: [
        'Stopped wasteful Class A/B/C allocation where buying a Class B wasted 65,000 unused IPs.',
        'Isolates broadcast traffic (ARP storms) inside clean small subnets.',
        'Enables VPC security firewall rules between Public Web Subnets and Private Database Subnets.',
      ],
      realWorldImpact: 'Every AWS VPC, Azure VNet, and Kubernetes Pod cluster configures CIDR ranges (`10.0.0.0/16` carved into `/24` AZ subnets).',
      metricsAffected: ['Usable Host Capacity', 'Broadcast Domain Size', 'Longest Prefix Match Routing'],
    },
    coreArchitecture: {
      description: 'Bitwise AND between an IP address and its Subnet Mask isolates the Network ID; routers inspect Default Gateways when destination masks differ.',
      components: [
        { name: 'Network ID (First Address)', role: 'Subnet Identifier', details: 'All host bits = 0 (e.g. `192.168.1.0`). Identifies the subnet itself; cannot be assigned to hosts.' },
        { name: 'Broadcast IP (Last Address)', role: 'Subnet All-Hosts Address', details: 'All host bits = 1 (e.g. `192.168.1.255`). Reaches every device in that subnet.' },
        { name: 'Default Gateway', role: 'Exit Router Interface', details: 'Local router IP (often `.1`) where hosts send packets destined outside their subnet mask.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Bitwise AND Check', technicalDetail: 'Host computes `(Target_IP & Mask) == (My_IP & Mask)`. If equal -> Local LAN ARP + Switch!' },
        { stepNumber: 2, action: 'Remote Subnet Forwarding', technicalDetail: 'If unequal -> Send frame to Default Gateway Router MAC to route across subnets.' },
        { stepNumber: 3, action: 'Longest Prefix Match', technicalDetail: 'Routers match packet destination against the most specific `/N` CIDR route in their routing table.' },
      ],
    },
    visualizationId: 'subnet-3d',
    visualizationScene: 'routing-switching',
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Host Checks Subnet Mask (`192.168.1.0/24`)', description: 'Host A compares destination `10.0.2.20` against its `/24` mask -> sees it sits on a DIFFERENT subnet!', activeNodes: ['pc-a', 'switch-a'], packet: { from: 'pc-a', to: 'switch-a', label: 'Outside /24 -> Send to Gateway', type: 'request' } },
      { step: 2, title: 'Step 2: Default Gateway Routes Across Subnets', description: 'Router A evaluates Longest Prefix Match for `10.0.2.0/24` and forwards across WAN.', activeNodes: ['router-a', 'router-b'], packet: { from: 'router-a', to: 'router-b', label: 'Route -> 10.0.2.0/24', type: 'sync' } },
      { step: 3, title: 'Step 3: Destination Subnet Delivery', description: 'Router B delivers frame into `10.0.2.0/24` directly to Host B (`10.0.2.20`).', activeNodes: ['switch-b', 'pc-b'], packet: { from: 'switch-b', to: 'pc-b', label: 'Arrived in Subnet 10.0.2.0/24', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'pc-a', name: 'Subnet 1 Host (`192.168.1.10/24`)', role: 'Subnet A Member', description: 'Usable host range `192.168.1.1 – 192.168.1.254`.' },
      { id: 'switch-a', name: 'Subnet 1 Switch', role: 'Broadcast Domain 1', description: 'Scopes ARP broadcasts inside `192.168.1.0/24`.' },
      { id: 'router-a', name: 'Default Gateway (`192.168.1.1`)', role: 'Cross-Subnet Router', description: 'Connects disjoint CIDR blocks using Longest Prefix Match.' },
      { id: 'router-b', name: 'Remote Gateway (`10.0.2.1`)', role: 'Subnet 2 Router', description: 'Routes into destination CIDR block.' },
      { id: 'switch-b', name: 'Subnet 2 Switch', role: 'Broadcast Domain 2', description: 'Delivers local frames inside `10.0.2.0/24`.' },
      { id: 'pc-b', name: 'Subnet 2 Host (`10.0.2.20/24`)', role: 'Target Host', description: 'Resides in isolated remote subnet.' },
    ],
    realWorldExample: {
      company: 'AWS VPC Subnetting Design',
      scenario: 'Architecting secure cloud networking inside a `10.0.0.0/16` VPC (65,536 IPs).',
      implementation: 'Cloud architects carve `10.0.0.0/16` into Public ALB Subnets (`10.0.1.0/24`, `10.0.2.0/24` with Internet Gateway route), Private App Subnets (`10.0.10.0/24`), and Isolated DB Subnets (`10.0.20.0/24` blocking all external internet routes).',
      scaleDetails: 'Enforces strict subnet-level Network ACLs and Security Groups across every AWS region.',
    },
    advantages: [
      'Prevents huge Classful IP address wastage (VLSM / CIDR).',
      'Contains ARP broadcast storms and strengthens subnet-level firewall policies.',
    ],
    disadvantages: [
      'Undersizing a Kubernetes/AWS subnet (`/28` = 14 IPs) forces painful downtime to recreate and re-IP workloads later!',
    ],
    relatedTopics: [
      { id: 'ip-addressing-ipv4-ipv6', title: 'IP Addressing (IPv4 vs IPv6)', module: 'networking' },
      { id: 'nat-and-vlan', title: 'NAT & VLAN Segmentation', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'How many usable host IP addresses are in a `192.168.1.0/24` subnet, and what is its Subnet Mask?', answer: 'Subnet Mask is `255.255.255.0`. There are `32 - 24 = 8` host bits, giving `2^8 = 256` total addresses, minus 2 (Network ID `.0` and Broadcast `.255`) = **254 usable host IPs**.', keyPoints: ['Mask: 255.255.255.0', '2^8 - 2 = 254 usable hosts'] },
      { level: 'intermediate', question: 'Calculate the Network ID, Broadcast IP, and usable hosts for `10.0.5.130/26`.', answer: 'A `/26` leaves `32 - 26 = 6` host bits, meaning block size = `2^6 = 64` addresses! Subnets step by 64: `.0–.63`, `.64–.127`, `.128–.191`, `.192–.255`. Since `130` falls inside `128–191`: Network ID = `10.0.5.128`, Broadcast IP = `10.0.5.191`, Usable Hosts = `10.0.5.129 – 10.0.5.190` (**62 usable IPs**).', keyPoints: ['Block size = 64 (`2^6`)', 'Network: .128, Broadcast: .191, Usable: 62'] },
      { level: 'advanced', question: 'Why does AWS reserve 5 IP addresses (instead of 2) inside every VPC CIDR subnet?', answer: 'Standard networking reserves `.0` (Network) and `.255` (Broadcast). AWS reserves 3 extra: `.1` (VPC Router), `.2` (Amazon DNS Server), and `.3` (reserved for future AWS use)—so a `/24` in AWS yields 251 usable IPs instead of 254.', keyPoints: ['Standard reserves 2 (Network + Broadcast)', 'AWS VPC reserves 5 (+Router, +DNS, +Future)'] },
    ],
    quiz: [
      { id: 'sub-1', question: 'What is the dotted-decimal Subnet Mask equivalent to CIDR `/24`?', options: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.192'], correctAnswer: 0, explanation: '24 leading 1-bits equals three full octets of 255 (`255.255.255.0`).' },
      { id: 'sub-2', question: 'How many usable host IPs exist inside a `/28` IPv4 subnet?', options: ['14 usable hosts (`2^4 - 2`)', '16 usable hosts', '254 usable hosts', '62 usable hosts'], correctAnswer: 0, explanation: '32 - 28 = 4 host bits -> `2^4 - 2 = 14` usable hosts.' },
      { id: 'sub-3', question: 'What happens when a computer sends traffic to an IP outside its own subnet mask?', options: ['It sends the packet to its configured Default Gateway router', 'It drops the packet immediately', 'It uses ARP on the entire internet', 'It broadcasts on Ethernet forever'], correctAnswer: 0, explanation: 'Off-subnet packets route via the local Default Gateway.' },
      { id: 'sub-4', question: 'What rule does a router use when a packet destination matches BOTH `10.0.0.0/16` AND `10.0.5.0/24` in its routing table?', options: ['Longest Prefix Match (picks `/24` because it is more specific)', 'Shortest Prefix Match', 'Alphabetical order', 'Drops packet'], correctAnswer: 0, explanation: 'Routers always prefer the longest/most-specific subnet mask match.' },
      { id: 'sub-5', question: 'What is the Broadcast IP address for subnet `192.168.10.0/25`?', options: ['192.168.10.127', '192.168.10.255', '192.168.10.128', '192.168.10.63'], correctAnswer: 0, explanation: 'A `/25` splits a `/24` into two halves of 128 addresses: `.0–.127` and `.128–.255`.' },
    ],
  },

  'protocols-overview': {
    id: 'protocols-overview',
    title: 'Core Networking Protocols (HTTP, HTTPS, DNS, DHCP, SSH, ICMP, ARP, FTP, SMTP)',
    module: 'networking',
    category: '5. Core Networking Protocols',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Master the essential protocols and well-known ports powering network automation, identity resolution, email delivery, remote administration, and web transfers.',
    introduction: {
      definition: 'A network protocol is a formal specification of packet syntax, timing, and state rules enabling diverse machines to communicate. Each protocol occupies a specific OSI layer and standard port number.',
      analogousStory: 'Just as global air traffic controllers, diplomats, and postal couriers each follow strict standardized rulebooks—HTTP speaks web pages on port 443, SSH opens encrypted admin shells on port 22, DHCP hands out IP leases on 67/68, and ARP translates IP addresses into local MAC hardware tags!',
      keyTakeaway: 'Knowing well-known ports (`22 SSH, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 443 HTTPS`) and layer placement (`ARP L2/3, ICMP L3, TCP/UDP L4`) is essential for debugging and interviews.',
    },
    whyRequired: {
      problemsSolved: [
        'Automates zero-touch network onboarding (DHCP assigns IPs automatically; ARP finds local MACs automatically).',
        'Replaces plaintext insecure legacy protocols (Telnet -> SSH, FTP -> SFTP, HTTP -> HTTPS).',
      ],
      realWorldImpact: 'Every corporate office and cloud VM relies on DHCP, ARP, DNS, ICMP, SSH, and HTTPS working invisibly in concert.',
      metricsAffected: ['Port Standardization', 'Encrypted vs Cleartext Security', 'Auto-Discovery Speed'],
    },
    coreArchitecture: {
      description: 'Compare L2/L3 control protocols (ARP, ICMP) against L4/L7 service protocols (DHCP, DNS, SSH, SMTP, HTTP).',
      components: [
        { name: 'ARP & ICMP (Control)', role: 'L2/L3 Plumbing', details: 'ARP maps `IP -> MAC` inside local LANs via broadcast; ICMP carries `ping` echoes and TTL errors.' },
        { name: 'DHCP & DNS (Bootstrapping)', role: 'Auto-Config & Naming', details: 'DHCP DORA leases local IPs (UDP 67/68); DNS resolves domain names to IPs (UDP 53).' },
        { name: 'SSH, SFTP & SMTP (Services)', role: 'Encrypted Admin & Mail', details: 'SSH/SFTP secure shells and file transfers (TCP 22); SMTP pushes email (25/587); IMAP (993) syncs inboxes.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Bootstrap via DHCP + ARP', technicalDetail: 'New laptop broadcasts DHCP Discover -> gets IP + Gateway IP -> runs ARP to learn Gateway MAC.' },
        { stepNumber: 2, action: 'Resolve Domain via DNS', technicalDetail: 'Queries DNS UDP port 53 to resolve `api.site.com`.' },
        { stepNumber: 3, action: 'Connect Secure Service', technicalDetail: 'Connects over HTTPS (TCP 443) or SSH (TCP 22) cleanly.' },
      ],
    },
    visualizationId: 'protocols-3d',
    visualizationScene: 'dns-resolution',
    visualizationModes: [
      { id: 'iterative', label: 'Multi-Server Protocol Discovery' },
      { id: 'cached-hit', label: 'Cached Local Lookup' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Host Bootstraps via DHCP & DNS', description: 'Client gets IP via DHCP (UDP 67/68) and queries DNS (UDP 53) to locate server IP.', activeNodes: ['client-dns', 'resolver-dns'], packet: { from: 'client-dns', to: 'resolver-dns', label: 'DHCP + DNS Lookup (:53)', type: 'request' } },
      { step: 2, title: 'Step 2: Iterative Hierarchy Traversal', description: 'Resolver steps across Root -> TLD -> Authoritative protocol nodes cleanly.', activeNodes: ['resolver-dns', 'root-dns', 'tld-dns', 'authoritative-dns'], packet: { from: 'resolver-dns', to: 'authoritative-dns', label: 'Resolve Authority', type: 'sync' } },
      { step: 3, title: 'Step 3: Application Protocol Connects (HTTPS / SSH)', description: 'Resolved IP connects securely via HTTPS (:443) or SSH (:22).', activeNodes: ['client-dns'], packet: { from: 'resolver-dns', to: 'client-dns', label: 'Ready for HTTPS (:443) / SSH (:22)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-dns', name: 'Client Host Stack', role: 'Multi-Protocol Initiator', description: 'Runs DHCP, ARP, ICMP, DNS, SSH, and HTTPS clients.' },
      { id: 'resolver-dns', name: 'Local Gateway / DNS / DHCP', role: 'LAN Infrastructure', description: 'Leases local IPs and forwards recursive name queries.' },
      { id: 'root-dns', name: 'Core Directory Tier', role: 'Global Root', description: 'Directs top-level protocol lookups.' },
      { id: 'tld-dns', name: 'Extension Authority', role: 'Intermediate Registry', description: 'Delegates domain domains cleanly.' },
      { id: 'authoritative-dns', name: 'Destination Service Endpoint', role: 'HTTPS/SSH/SMTP Host', description: 'Terminates encrypted application protocols.' },
    ],
    realWorldExample: {
      company: 'SSH vs Telnet & SMTP vs IMAP',
      scenario: 'Securing remote Linux server administration and enterprise email delivery.',
      implementation: 'Engineers replaced cleartext Telnet (Port 23) and FTP (Port 21) completely with encrypted SSH & SFTP (Port 22) using Ed25519 public keys. Email systems use SMTP (Port 25/587) to push mail server-to-server while IMAP (Port 993) syncs folders across devices.',
      scaleDetails: 'Eliminated plaintext credential sniffing across cloud server administration.',
    },
    advantages: [
      'Modular standardized protocols enable universal plug-and-play networking across any OS or vendor.',
    ],
    disadvantages: [
      'Legacy unencrypted protocols (Telnet, FTP, plain HTTP, unencrypted ARP) remain vulnerable to sniffing and spoofing if left enabled.',
    ],
    relatedTopics: [
      { id: 'dns-resolution', title: 'DNS Resolution', module: 'networking' },
      { id: 'tcp-vs-udp', title: 'TCP vs UDP', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Explain the 4 steps of the DHCP DORA process.', answer: '1) **Discover**: Client broadcasts `255.255.255.255` asking "Any DHCP servers here?". 2) **Offer**: DHCP server offers an available IP lease. 3) **Request**: Client accepts and broadcasts request for that IP. 4) **Acknowledge**: Server confirms lease duration, subnet mask, gateway, and DNS IPs.', keyPoints: ['Discover -> Offer -> Request -> Acknowledge (DORA)'] },
      { level: 'intermediate', question: 'Compare POP3 vs IMAP for email retrieval, and explain what SMTP does.', answer: 'SMTP sends/relays outgoing mail between mail servers (`25`/`587`). POP3 (`110`/`995`) downloads emails to ONE device and usually deletes them off the server (poor multi-device sync). IMAP (`143`/`993`) keeps emails synced on the server so phones, tablets, and laptops all reflect read/folder states seamlessly.', keyPoints: ['SMTP = Sending mail', 'POP3 = Download & delete local', 'IMAP = Synced server mailbox'] },
      { level: 'advanced', question: 'What is ARP Spoofing (ARP Cache Poisoning), and how does it enable Man-in-the-Middle attacks on local Wi-Fi?', answer: 'ARP is stateless and trusts replies blindly without authentication! An attacker on the same coffee-shop Wi-Fi spams unsolicited fake ARP Replies telling the router "I am the victim\'s IP (here is MY MAC)" and telling the victim "I am the router (here is MY MAC)". Every packet then routes straight through the attacker\'s laptop! Mitigated via Dynamic ARP Inspection (DAI) on managed switches and using HTTPS/VPN encryption.', keyPoints: ['ARP is stateless/unauthenticated', 'Attacker redirects LAN traffic through own MAC', 'Defend with HTTPS/VPN + Switch DAI'] },
    ],
    quiz: [
      { id: 'po-1', question: 'Which protocol maps a known IPv4 address to an unknown physical MAC address inside a local LAN?', options: ['ARP (Address Resolution Protocol)', 'DNS', 'SMTP', 'SSH'], correctAnswer: 0, explanation: 'ARP broadcasts "Who has IP X?" to resolve the local hardware MAC address.' },
      { id: 'po-2', question: 'What default TCP port does SSH (and SFTP) listen on?', options: ['Port 22', 'Port 80', 'Port 53', 'Port 443'], correctAnswer: 0, explanation: 'SSH and SFTP run encrypted over TCP Port 22.' },
      { id: 'po-3', question: 'Which email protocol synchronizes read status and folders across multiple devices while leaving mail on the server?', options: ['IMAP', 'POP3', 'DHCP', 'ICMP'], correctAnswer: 0, explanation: 'IMAP maintains synchronized server-side mailboxes.' },
      { id: 'po-4', question: 'Which Layer 3 protocol powers `ping` echo requests and destination unreachable diagnostics?', options: ['ICMP (Internet Control Message Protocol)', 'FTP', 'Telnet', 'ARP'], correctAnswer: 0, explanation: 'ICMP transmits operational network diagnostic signals.' },
      { id: 'po-5', question: 'Why is SFTP dramatically safer than classic FTP?', options: ['SFTP encrypts both authentication passwords and file transfers inside an SSH tunnel', 'FTP uses XML', 'SFTP blocks TCP', 'FTP cannot transfer images'], correctAnswer: 0, explanation: 'Classic FTP sends passwords and payloads in unencrypted cleartext.' },
    ],
  },

  'tcp-vs-udp': {
    id: 'tcp-vs-udp',
    title: 'TCP vs UDP: Connection Reliability vs Ultra-Low Latency',
    module: 'networking',
    category: '6. TCP and UDP Transport Protocols',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'TCP guarantees ordered, lossless byte-stream delivery using handshakes and ACKs; UDP sends lightweight connectionless datagrams immediately without handshakes or retransmission delays.',
    introduction: {
      definition: 'At Layer 4 (Transport), developers pick between TCP (Transmission Control Protocol) for 100% accuracy and UDP (User Datagram Protocol) for zero-overhead real-time speed.',
      analogousStory: 'TCP is sending a multi-box encyclopedia via Registered Mail requiring signed confirmation receipts for every box—if Box #4 falls off a truck, delivery pauses until Box #4 is re-shipped cleanly. UDP is broadcasting live radio over the air—if static eats two words during a live football match, the announcer NEVER pauses to repeat yesterday\'s play!',
      keyTakeaway: 'TCP prioritizes **Reliability over Latency** (Web, Email, DBs, Files); UDP prioritizes **Speed & Real-Time Freshness over Reliability** (VoIP, Gaming, DNS, QUIC/HTTP3).',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents Head-of-Line blocking stalls in real-time voice/video calls and fast-paced multiplayer games.',
        'Keeps header overhead tiny (UDP = just 8 bytes vs TCP = 20–60 bytes).',
      ],
      realWorldImpact: 'Zoom, Discord Voice, Valorant, DNS, and HTTP/3 (QUIC) rely on UDP to beat TCP handshake & retransmission stalls.',
      metricsAffected: ['Header Overhead (8B vs 20B)', 'Handshake RTT Penalty (0 vs 1 RTT)', 'Head-of-Line Blocking'],
    },
    coreArchitecture: {
      description: 'Compare stateful 3-Way Handshake + Sliding Window TCP sockets against stateless 8-byte header UDP datagrams.',
      components: [
        { name: 'TCP Header (20 Bytes)', role: 'Stateful Reliability', details: 'Includes Seq #, Ack #, Flags (SYN/ACK/FIN), Window Size, Checksum.' },
        { name: 'UDP Header (8 Bytes)', role: 'Stateless Speed', details: 'Contains ONLY Source Port, Dest Port, Length, and Checksum—fire-and-forget!' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Compare Connection Setup', technicalDetail: 'Toggle TCP vs UDP mode above! TCP spends 1 RTT exchanging SYN -> SYN-ACK -> ACK; UDP fires payload packet immediately!' },
        { stepNumber: 2, action: 'Compare Packet Loss Behavior', technicalDetail: 'TCP halts delivery stream waiting for missing retransmission; UDP drops missed stale voice frame and keeps playing live.' },
      ],
    },
    visualizationId: 'tcp-udp-3d',
    visualizationScene: 'tcp-handshake',
    visualizationModes: [
      { id: 'udp', label: 'UDP (0-RTT Fire & Forget)' },
      { id: 'tcp', label: 'TCP (3-Way Handshake)' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Compare Connection Setup Speed', description: 'Switch between UDP and TCP modes above! UDP skips the 3-way handshake completely (0-RTT) while TCP verifies both peers first.', activeNodes: ['client-node', 'server-node'], packet: { from: 'client-node', to: 'server-node', label: 'UDP Fire & Forget vs TCP SYN', type: 'request' } },
      { step: 2, title: 'Step 2: Delivery Guarantees vs Real-Time Stream', description: 'TCP ensures 100% ordered lossless delivery; UDP minimizes jitter for live audio, gaming, and QUIC.', activeNodes: ['client-node', 'server-node'], packet: { from: 'server-node', to: 'client-node', label: 'Transport Stream Active', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-node', name: 'Transport Sender (L4)', role: 'Socket Initiator', description: 'Chooses TCP reliability or UDP raw low-latency datagrams.' },
      { id: 'server-node', name: 'Transport Receiver (L4)', role: 'Listening Port', description: 'Reassembles ordered TCP streams or reads independent UDP datagrams.' },
    ],
    realWorldExample: {
      company: 'Discord Voice & Riot Games (Valorant)',
      scenario: 'Streaming 128-tick multiplayer coordinates and live spatial voice across global players.',
      implementation: 'If a game used TCP, losing 1 packet on Wi-Fi would freeze all player updates for 200ms while waiting on retransmission! Games send state snapshots over UDP so a lost old frame is simply overwritten 8 milliseconds later by a fresh snapshot.',
      scaleDetails: 'Maintains responsive sub-30ms gaming tick loops worldwide.',
    },
    advantages: [
      'TCP: Zero lost bytes, automatic error recovery, congestion avoidance, in-order stream.',
      'UDP: Zero handshake wait, 8-byte header, no Head-of-Line blocking, supports multicast/broadcast.',
    ],
    disadvantages: [
      'TCP: 1 RTT setup lag + Head-of-Line blocking delays real-time media.',
      'UDP: No built-in delivery guarantee, ordering, or congestion control (apps or QUIC must handle what they need).',
    ],
    relatedTopics: [
      { id: 'tcp-three-way-handshake', title: 'TCP Three-Way Handshake', module: 'networking' },
      { id: 'http-evolution-http1-2-3', title: 'HTTP/3 & QUIC over UDP', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why do DNS and Video Conferencing (Zoom/Discord) prefer UDP over TCP?', answer: 'DNS queries are tiny single-packet lookups where spending 3 extra handshake packets (SYN/SYN-ACK/ACK) would triple query time. Video/Voice calls prefer dropping a 20ms audio glitch rather than freezing the entire call waiting on late retransmissions.', keyPoints: ['DNS = Tiny single packet (avoids 3-way handshake overhead)', 'Zoom/Gaming = Old data is useless once missed'] },
      { level: 'intermediate', question: 'What is "Head-of-Line (HoL) Blocking" in TCP?', answer: 'Because TCP presents an ordered byte stream to the OS socket, if Packet #2 gets dropped in the network while Packets #3, #4, and #5 arrive safely, the OS holds #3–#5 trapped inside its kernel buffer—blocking the application from reading them until #2 is retransmitted!', keyPoints: ['Single dropped packet stalls all subsequent arrived packets', 'Solved per-stream by QUIC (HTTP/3) over UDP'] },
      { level: 'advanced', question: 'If UDP has NO built-in reliability or congestion control, how does HTTP/3 (QUIC) achieve BOTH reliability AND speed over UDP?', answer: 'Google engineered QUIC in user-space directly on top of UDP! QUIC implements selective stream ACKs, TLS 1.3 encryption, and BBR/CUBIC congestion control independently per multiplexed stream—so losing a packet on Stream A NEVER blocks Stream B (zero Head-of-Line blocking)!', keyPoints: ['QUIC implements reliable streams in user space over UDP', 'Eliminates TCP cross-stream Head-of-Line blocking'] },
    ],
    quiz: [
      { id: 'tu-1', question: 'How large is a standard UDP header vs a minimum TCP header?', options: ['UDP = 8 bytes, TCP = 20 bytes', 'UDP = 64 bytes, TCP = 4 bytes', 'Both are 100 bytes', 'UDP has no header'], correctAnswer: 0, explanation: 'UDP only holds Source Port, Dest Port, Length, and Checksum (8 bytes).' },
      { id: 'tu-2', question: 'Which protocol supports Broadcast and Multicast packet transmission natively?', options: ['UDP', 'TCP', 'HTTP/1.1', 'SSH'], correctAnswer: 0, explanation: 'TCP requires 1-to-1 point connections; UDP supports connectionless multicast.' },
      { id: 'tu-3', question: 'Which workload strictly requires TCP rather than raw UDP?', options: ['Transferring a banking ledger or downloading an executable installer ZIP', 'Real-time live voice chat', 'First-person shooter coordinate snapshots', 'Single-packet local mDNS'], correctAnswer: 0, explanation: 'Corrupting or dropping even 1 byte breaks financial records and software binaries.' },
      { id: 'tu-4', question: 'What does TCP "Head-of-Line Blocking" cause when one segment drops?', options: ['All subsequent already-arrived segments wait stuck in buffer until the missing segment is retransmitted', 'The entire router melts', 'UDP turns on', 'Port 443 closes'], correctAnswer: 0, explanation: 'Strict byte-stream ordering stalls later packets behind one missing packet.' },
      { id: 'tu-5', question: 'Which modern protocol builds fast reliable multiplexed web streams ON TOP OF UDP?', options: ['QUIC (HTTP/3)', 'Telnet', 'ARP', 'ICMP'], correctAnswer: 0, explanation: 'QUIC layers encryption and independent stream reliability atop UDP.' },
    ],
  },

  'tcp-flow-congestion-control': {
    id: 'tcp-flow-congestion-control',
    title: 'TCP Flow Control (Sliding Window) & Congestion Control (Slow Start / BBR)',
    module: 'networking',
    category: '6. TCP and UDP Transport Protocols',
    readTime: '11 min',
    difficulty: 'Advanced',
    summary: 'Flow Control protects the individual receiver\'s RAM buffer from overflowing using Sliding Windows; Congestion Control protects intermediate global internet routers using Slow Start, AIMD, CUBIC, and Google BBR.',
    introduction: {
      definition: 'TCP uses two distinct rate governors: **Flow Control** (`rwnd` Receive Window advertised by the receiver so a fast server never overflows a slow phone\'s RAM) and **Congestion Control** (`cwnd` Congestion Window estimated by the sender to avoid choking shared internet routers). Actual sending rate = `min(rwnd, cwnd)`.',
      analogousStory: 'Flow Control is pouring water no faster than your friend\'s cup can drink (`rwnd`). Congestion Control is slowing your delivery trucks when you see traffic jams forming across shared city intersections (`cwnd`) so the highway grid doesn\'t collapse!',
      keyTakeaway: 'Sender never injects more unacknowledged bytes into the network than `min(rwnd, cwnd)`.',
    },
    whyRequired: {
      problemsSolved: [
        'Prevents the 1986 "Congestion Collapse" where retransmissions multiplied across full internet routers until real throughput dropped 1,000x.',
        'Protects small embedded/mobile receivers with limited RAM from faster fiber servers.',
      ],
      realWorldImpact: 'Google BBR congestion control boosted YouTube global throughput and cut latency across lossy mobile networks without waiting for packet drops.',
      metricsAffected: ['Congestion Window (`cwnd`)', 'Receive Window (`rwnd`)', 'Retransmission Timeout (RTO)'],
    },
    coreArchitecture: {
      description: 'Sender tracks in-flight unacknowledged bytes constrained dynamically by `min(rwnd, cwnd)`.',
      components: [
        { name: 'Sliding Receive Window (`rwnd`)', role: 'Flow Control', details: 'Advertised inside every TCP ACK header showing free space in receiver\'s OS socket buffer.' },
        { name: 'Congestion Window (`cwnd`)', role: 'Network Protection', details: 'Grows exponentially during Slow Start (`1 -> 2 -> 4 -> 8` MSS), then linearly in Congestion Avoidance (AIMD).' },
        { name: 'Loss / BBR Feedback Loop', role: 'Throttle Detector', details: '3 Duplicate ACKs trigger Fast Retransmit (halving `cwnd`); Timeout drops `cwnd` back to 1 MSS; BBR probes bottleneck bandwidth + min RTT.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Slow Start Exponential Ramp', technicalDetail: 'Starts cautiously (`IW=10` segments), doubling `cwnd` each RTT until hitting `ssthresh` or packet loss.' },
        { stepNumber: 2, action: 'Receiver Advertises `rwnd`', technicalDetail: 'If client app stops calling `recv()`, `rwnd` shrinks down to `0` (`Zero Window`), pausing sender cleanly.' },
        { stepNumber: 3, action: 'Congestion Recovery', technicalDetail: 'On 3 duplicate ACKs, TCP executes Fast Retransmit + Fast Recovery without dropping back to zero.' },
      ],
    },
    visualizationId: 'tcp-flow-3d',
    visualizationScene: 'tcp-handshake',
    visualizationModes: [
      { id: 'tcp', label: 'TCP Sliding Window & ACKs' },
      { id: 'udp', label: 'Unthrottled UDP (No Flow Control)' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Establish Connection & Negotiate Window Scale', description: 'Client and Server exchange initial `rwnd` buffer capacities during SYN / SYN-ACK.', activeNodes: ['client-node', 'server-node'], packet: { from: 'client-node', to: 'server-node', label: 'Negotiate MSS & rwnd', type: 'request' } },
      { step: 2, title: 'Step 2: Slow Start Exponential Window Growth', description: 'Sender ramps `cwnd` exponentially up to `min(rwnd, cwnd)` as fast cumulative ACKs return.', activeNodes: ['server-node', 'client-node'], packet: { from: 'server-node', to: 'client-node', label: 'Cumulative ACK + rwnd Update', type: 'sync' } },
      { step: 3, title: 'Step 3: Fast Retransmit & Congestion Backoff', description: 'Missing packet triggers 3 Duplicate ACKs -> sender retransmits instantly and halves congestion window.', activeNodes: ['client-node', 'server-node'], packet: { from: 'client-node', to: 'server-node', label: 'Fast Retransmit + Throttle', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-node', name: 'TCP Sender (`cwnd` Governor)', role: 'Congestion Controller', description: 'Executes Slow Start, AIMD/CUBIC, and Fast Retransmit.' },
      { id: 'server-node', name: 'TCP Receiver (`rwnd` Buffer)', role: 'Flow Controller', description: 'Reports free kernel socket buffer space inside ACK packets.' },
    ],
    realWorldExample: {
      company: 'Google BBR (Bottleneck Bandwidth and Round-trip propagation time)',
      scenario: 'Replacing legacy packet-loss congestion control (CUBIC) on high-speed global fiber and mobile networks.',
      implementation: 'Old CUBIC keeps filling router queues until buffers overflow and drop packets ("Bufferbloat" latency!). Google\'s BBR continuously estimates the true physical pipe speed and minimum RTT, pacing packets at exact link capacity—keeping buffers empty and latencies low.',
      scaleDetails: 'Increased YouTube streaming throughput globally while slashing queue latency by up to 80%.',
    },
    advantages: [
      'Prevents global Internet congestion collapse while maximizing available fiber bandwidth.',
    ],
    disadvantages: [
      'Slow Start takes multiple RTTs to ramp up to full gigabit speed on brand-new short connections.',
    ],
    relatedTopics: [
      { id: 'tcp-three-way-handshake', title: 'TCP Three-Way Handshake', module: 'networking' },
      { id: 'bandwidth-latency-throughput', title: 'Bandwidth & Latency', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Clearly distinguish TCP Flow Control from TCP Congestion Control.', answer: 'Flow Control (`rwnd`) is end-to-end: it stops a fast sender from overflowing the RECEIVER\'s memory buffer. Congestion Control (`cwnd`) protects the NETWORK (intermediate switches and routers) from being flooded by too much traffic.', keyPoints: ['Flow Control = Protects Receiver RAM (`rwnd`)', 'Congestion Control = Protects Network Routers (`cwnd`)'] },
      { level: 'intermediate', question: 'Why do 3 Duplicate ACKs trigger a gentler backoff than a full Retransmission Timeout (RTO)?', answer: 'Receiving 3 Duplicate ACKs means packets AFTER the dropped packet ARE still arriving cleanly at the receiver—so the network is only mildly congested! Thus Fast Recovery halves `cwnd` and immediately retransmits. By contrast, a total RTO timeout means ALL packets vanished—signaling severe network failure so TCP resets `cwnd` all the way down to 1 MSS.', keyPoints: ['3 Dup ACKs = Mild loss -> Fast Retransmit + halve `cwnd`', 'RTO Timeout = Severe blackout -> Drop `cwnd` to 1'] },
      { level: 'advanced', question: 'Explain how Google BBR avoids "Bufferbloat" compared to TCP CUBIC.', answer: 'Loss-based algorithms like CUBIC intentionally keep accelerating until router queues fill 100% and drop a packet—creating huge Queueing Delay ("Bufferbloat"). BBR models the true Bottleneck Bandwidth and minimum RTT (`RTprop`), pacing sends cleanly right at the optimal knee before router queues ever pile up.', keyPoints: ['CUBIC fills queues until packet drops (high latency)', 'BBR models bandwidth + min RTT to prevent queue buildup'] },
    ],
    quiz: [
      { id: 'tfc-1', question: 'What is the maximum unacknowledged data a TCP sender can keep in flight simultaneously?', options: ['min(rwnd, cwnd)', 'rwnd + cwnd', 'max(rwnd, cwnd)', 'Always 1 byte'], correctAnswer: 0, explanation: 'Both the receiver buffer (`rwnd`) and network ceiling (`cwnd`) must be respected (`min`).' },
      { id: 'tfc-2', question: 'Which mechanism protects a slow receiver device\'s socket RAM from overflowing?', options: ['Flow Control via Sliding Receive Window (`rwnd`)', 'DNS Caching', 'ARP Spoofing', 'ICMP Ping'], correctAnswer: 0, explanation: 'Flow control throttles the sender using receiver-advertised `rwnd`.' },
      { id: 'tfc-3', question: 'What happens during the TCP "Slow Start" phase as clean ACKs return?', options: ['`cwnd` grows exponentially (doubling every RTT) until reaching threshold or packet loss', '`cwnd` shrinks to zero', 'Packets travel in reverse', 'Connections close'], correctAnswer: 0, explanation: 'Despite its name, Slow Start ramps exponentially every round trip.' },
      { id: 'tfc-4', question: 'What triggers TCP "Fast Retransmit" immediately without waiting for a slow RTO timer?', options: ['Receiving 3 Duplicate ACKs for the same sequence number', 'Pressing F5 in browser', 'Changing DNS servers', 'Closing the laptop lid'], correctAnswer: 0, explanation: '3 duplicate ACKs signal a lost segment while later packets are still flowing.' },
      { id: 'tfc-5', question: 'What problem does Google BBR congestion control minimize compared to loss-based CUBIC?', options: ['Bufferbloat (excessive router queue delay)', 'HTTPS certificate expiry', 'IPv6 address length', 'SQL table size'], correctAnswer: 0, explanation: 'BBR avoids overfilling intermediate router buffers.' },
    ],
  },

  'dns-record-types': {
    id: 'dns-record-types',
    title: 'DNS Record Types (A, AAAA, CNAME, MX, NS, TXT & PTR)',
    module: 'networking',
    category: '7. Domain Name System (DNS)',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'Authoritative DNS zone files contain structured resource records (RRs) directing web browsers (A/AAAA/CNAME), email routing (MX/TXT SPF/DKIM), domain delegation (NS), and reverse lookups (PTR).',
    introduction: {
      definition: 'Every domain name owns a Zone File inside its Authoritative Nameserver storing typed Resource Records mapping domains to IPs, aliases, mail servers, and security verification tokens.',
      analogousStory: 'A company\'s DNS Zone File is like its building directory board in the lobby: "Reception -> Room 101 (A record)", "Deliveries/Mail -> Loading Dock B (MX record)", "Marketing -> Same office as Sales (CNAME)", "Official Tax Verification Code -> XYZ-99 (TXT record)".',
      keyTakeaway: 'Never place a CNAME record at the root apex domain (`example.com`) alongside NS/MX records—use A/AAAA or provider ALIAS/ANAME flattening!',
    },
    whyRequired: {
      problemsSolved: [
        'Routes web HTTP traffic independently from Email servers (MX) on the exact same domain.',
        'Validates domain ownership and anti-spam email cryptography (SPF, DKIM, DMARC inside TXT records).',
      ],
      realWorldImpact: 'Configuring incorrect MX or TXT SPF records breaks company email deliverability immediately while websites stay up.',
      metricsAffected: ['TTL Propagation Delay', 'Email Authentication Pass Rate', 'CNAME Lookup Chaining'],
    },
    coreArchitecture: {
      description: 'Authoritative DNS Zone stores typed records queried by Recursive Resolvers based on QTYPE (`A`, `AAAA`, `MX`, `TXT`, `CNAME`, `NS`).',
      components: [
        { name: 'A & AAAA Records', role: 'IPv4 / IPv6 Address', details: '`A` maps domain -> 32-bit IPv4; `AAAA` maps domain -> 128-bit IPv6.' },
        { name: 'CNAME & NS Records', role: 'Aliases & Authority', details: '`CNAME` aliases subdomain -> canonical hostname; `NS` delegates authority to nameservers.' },
        { name: 'MX & TXT Records', role: 'Email & Verification', details: '`MX` routes incoming email with priority integers; `TXT` stores SPF/DKIM/domain verification.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Client Requests Typed Lookup', technicalDetail: 'Browser queries `AAAA` and `A` records; Mail server queries `MX` record.' },
        { stepNumber: 2, action: 'Resolver Fetches Authoritative Zone', technicalDetail: 'Resolver returns matching record type + TTL seconds to cache.' },
      ],
    },
    visualizationId: 'dns-rec-3d',
    visualizationScene: 'dns-resolution',
    visualizationModes: [
      { id: 'cached-hit', label: 'A / AAAA Cached Lookup' },
      { id: 'iterative', label: 'MX / CNAME Zone Query' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Query Specific Record Type (A / MX / TXT)', description: 'Client or Mail Server asks Resolver for a specific Resource Record type on `architect.io`.', activeNodes: ['client-dns', 'resolver-dns'], packet: { from: 'client-dns', to: 'resolver-dns', label: 'Query MX / A / TXT Record', type: 'request' } },
      { step: 2, title: 'Step 2: Authoritative Zone File Returns Record + TTL', description: 'Authoritative NS returns exact `A (76.76.21.21)`, `MX (10 mail.host)`, or `TXT` record.', activeNodes: ['authoritative-dns', 'resolver-dns'], packet: { from: 'authoritative-dns', to: 'resolver-dns', label: 'Zone Record + TTL=300', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-dns', name: 'Querying Host / Mail Server', role: 'Record Consumer', description: 'Requests A/AAAA for web, MX for email, PTR for reverse IP.' },
      { id: 'resolver-dns', name: 'Caching Recursive Resolver', role: 'TTL Cache', description: 'Caches each record type independently for its TTL duration.' },
      { id: 'root-dns', name: 'Root NS', role: 'Apex', description: 'Delegates TLD lookup.' },
      { id: 'tld-dns', name: 'TLD NS', role: 'Extension Authority', description: 'Points to domain NS records.' },
      { id: 'authoritative-dns', name: 'Authoritative Zone File', role: 'Master Records', description: 'Holds canonical A, AAAA, CNAME, MX, NS, and TXT entries.' },
    ],
    realWorldExample: {
      company: 'Cloudflare DNS CNAME Flattening',
      scenario: 'Pointing a root apex domain (`example.com`) to a dynamic cloud load balancer (`app.herokuapp.com`) whose IP changes constantly.',
      implementation: 'RFC DNS rules forbid `CNAME` at a zone apex (`example.com`) because it conflicts with mandatory `SOA` and `NS` records. Cloudflare DNS implements CNAME Flattening—resolving the target CNAME behind the scenes and dynamically returning a valid `A` record at the apex.',
      scaleDetails: 'Enables seamless root-domain cloud hosting across millions of domains.',
    },
    advantages: [
      'Clean separation of web hosting, CDN aliases, email routing, and cryptographic TXT security checks.',
    ],
    disadvantages: [
      'Chaining multiple CNAMEs (`a -> b -> c -> IP`) adds extra DNS lookup latency.',
    ],
    relatedTopics: [
      { id: 'dns-resolution', title: 'DNS Resolution Hierarchy', module: 'networking' },
      { id: 'what-happens-when-url-entered', title: 'What Happens When You Type a URL?', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Which DNS record handles incoming emails for `@company.com`, and what does its priority number mean?', answer: 'The `MX` (Mail Exchange) record directs email to mail servers. Lower priority numbers have HIGHER preference (e.g., `10 mail1.google.com` is tried first; `20 mail2.google.com` acts as backup if `10` is down).', keyPoints: ['MX = Mail Exchange', 'Lowest priority integer = tried first'] },
      { level: 'intermediate', question: 'Why shouldn\'t you create a `CNAME` record at the bare root/apex domain (`example.com`)?', answer: 'DNS RFC standards dictate that if a node has a `CNAME`, it CANNOT hold any other record type at that exact name. Yet a root apex domain MUST contain `SOA` and `NS` records! Putting a CNAME on `example.com` breaks NS and MX email records. Instead, use `A`/`AAAA` or provider-specific `ALIAS`/`CNAME Flattening`.', keyPoints: ['CNAME cannot coexist with NS/SOA/MX at root apex', 'Use CNAME on subdomains (`www.`) or ALIAS flattening at apex'] },
      { level: 'advanced', question: 'How do SPF, DKIM, and DMARC use DNS `TXT` records to stop email spoofing?', answer: '1) **SPF** (TXT record) lists authorized IP servers allowed to send mail for your domain. 2) **DKIM** publishes your public signing key in TXT so receivers verify email cryptographic signatures. 3) **DMARC** TXT policy instructs receiving servers whether to reject/quarantine spoofed emails failing SPF/DKIM.', keyPoints: ['SPF = Authorized sender IPs', 'DKIM = Cryptographic email signature public key', 'DMARC = Policy on failure'] },
    ],
    quiz: [
      { id: 'drt-1', question: 'Which DNS record points `www.site.com` as an alias to another hostname `cdn.edge.net`?', options: ['CNAME Record', 'MX Record', 'PTR Record', 'AAAA Record'], correctAnswer: 0, explanation: 'CNAME aliases one domain hostname to another canonical hostname.' },
      { id: 'drt-2', question: 'Which DNS record maps an IP address BACKWARDS to a hostname (Reverse DNS lookup)?', options: ['PTR (Pointer) Record', 'A Record', 'CNAME Record', 'NS Record'], correctAnswer: 0, explanation: 'PTR records resolve `in-addr.arpa` reverse IP lookups back to domain names.' },
      { id: 'drt-3', question: 'Given `MX 10 mailA.com` and `MX 50 mailB.com`, which server receives mail first?', options: ['mailA.com (lowest integer = highest priority)', 'mailB.com', 'Random 50/50 split', 'Both drop mail'], correctAnswer: 0, explanation: 'Smaller preference values take highest routing priority in MX records.' },
      { id: 'drt-4', question: 'Where are Google Workspace verification tokens and SPF anti-spam rules stored in DNS?', options: ['TXT Records', 'AAAA Records', 'SOA Records', 'Port 22'], correctAnswer: 0, explanation: 'TXT records hold arbitrary machine-readable metadata strings.' },
      { id: 'drt-5', question: 'Which DNS record delegates subdomain or root authority to specific DNS servers (like `ns1.awsdns.org`)?', options: ['NS (Name Server) Record', 'MX Record', 'CNAME Record', 'PTR Record'], correctAnswer: 0, explanation: 'NS records specify which authoritative servers host the domain\'s zone.' },
    ],
  },
};
