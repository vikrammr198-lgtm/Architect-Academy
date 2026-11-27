import { TopicContent } from '../../../types';

export const netRoutingSecurityWebToolsTopics: Record<string, TopicContent> = {
  'routing-vs-switching': {
    id: 'routing-vs-switching',
    title: 'Routing vs Switching: Routers, Switches, Hubs, Bridges & MAC Tables',
    module: 'networking',
    category: '8. Routing, Switching & Network Devices',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Switches connect hosts inside ONE LAN using Layer 2 MAC Address Tables; Routers interconnect DIFFERENT subnets across WANs using Layer 3 IP Routing Tables (Static vs Dynamic OSPF/BGP).',
    introduction: {
      definition: 'Switching moves Ethernet frames hop-by-hop within a local network segment via hardware ASIC MAC tables. Routing determines optimal inter-network paths across distinct IP subnets using Routing Tables populated manually (Static) or automatically via BGP/OSPF.',
      analogousStory: 'A Switch is the internal mail clerk inside one office building delivering letters directly to cubicle numbers (MAC addresses). A Router is the regional postal sorting center reading City + ZIP Code (IP Subnets) to dispatch mail trucks between different cities across highways!',
      keyTakeaway: 'Hubs broadcast blindly at Layer 1 (collisions); Switches learn MACs per port at Layer 2; Routers bridge subnets and block broadcasts at Layer 3.',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminated noisy Layer 1 Hub collisions by giving every switch port an isolated collision domain.',
        'Prevents local ARP broadcasts from flooding the entire global internet (Routers drop Layer 2 broadcasts at subnet borders).',
      ],
      realWorldImpact: 'ISP Core BGP Routers carry ~950,000+ global routing prefixes linking 70,000+ Autonomous Systems worldwide.',
      metricsAffected: ['Collision Domain Isolation', 'CAM / MAC Table Lookup Speed (ns)', 'Longest Prefix Match Routing'],
    },
    coreArchitecture: {
      description: 'Host A -> L2 Switch A (MAC lookup) -> L3 Router A (IP Routing Table) -> WAN -> L3 Router B -> L2 Switch B -> Host B.',
      components: [
        { name: 'Layer 2 Switch', role: 'Intra-LAN Forwarding', details: 'Learns source MAC addresses into its CAM table; forwards unicast frames solely to the destination port.' },
        { name: 'Layer 3 Router', role: 'Inter-Subnet Routing', details: 'Inspects Destination IP, chooses optimal next-hop route via Static/OSPF/BGP tables, and rewrites L2 MACs.' },
        { name: 'Hub & Bridge (Legacy)', role: 'Predecessors', details: 'Hub repeats bits blindly to ALL ports (L1); Bridge splits 2 collision domains in software (predecessor to hardware multi-port Switch).' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Switch Learns & Forwards Locally', technicalDetail: 'Switch A learns PC-A MAC on Port 1 and forwards frame straight to Gateway Router A Port 8.' },
        { stepNumber: 2, action: 'Router Consults Routing Table', technicalDetail: 'Router A strips L2 MAC header, matches `10.0.2.20` via Longest Prefix Match, decrements TTL, and forwards to Router B.' },
        { stepNumber: 3, action: 'Destination Switch Delivers', technicalDetail: 'Router B wraps fresh MAC header for Host B and Switch B delivers cleanly.' },
      ],
    },
    visualizationId: 'rs-3d',
    visualizationScene: 'routing-switching',
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: L2 Switch Forwards Frame via MAC Table', description: 'PC-A sends Ethernet frame to Switch A, which maps MAC directly to Router A port.', activeNodes: ['pc-a', 'switch-a'], packet: { from: 'pc-a', to: 'switch-a', label: 'L2 Frame [MAC Lookup]', type: 'request' } },
      { step: 2, title: 'Step 2: L3 Router A Consults Routing Table', description: 'Router A strips L2 MAC, checks Routing Table for `10.0.2.0/24`, and forwards across WAN.', activeNodes: ['router-a', 'router-b'], packet: { from: 'router-a', to: 'router-b', label: 'L3 IP Route (OSPF/BGP)', type: 'sync' } },
      { step: 3, title: 'Step 3: Switch B Delivers to Host B', description: 'Router B re-encapsulates with Host B MAC and Switch B delivers to Host B port.', activeNodes: ['switch-b', 'pc-b'], packet: { from: 'switch-b', to: 'pc-b', label: 'Deliver L2 Frame -> PC-B', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'pc-a', name: 'Host A (`192.168.1.10`)', role: 'Source PC', description: 'Sends frame addressed to Default Gateway MAC.' },
      { id: 'switch-a', name: 'L2 Ethernet Switch A', role: 'MAC Table Forwarder', description: 'Isolates collision domains using CAM hardware ASICs.' },
      { id: 'router-a', name: 'L3 Core Router A', role: 'Routing Table Engine', description: 'Computes shortest/best AS paths via Static, OSPF, or BGP routes.' },
      { id: 'router-b', name: 'L3 Core Router B', role: 'Remote Gateway', description: 'Bridges WAN into remote LAN subnet.' },
      { id: 'switch-b', name: 'L2 Ethernet Switch B', role: 'MAC Table Forwarder', description: 'Delivers frame directly to destination port.' },
      { id: 'pc-b', name: 'Host B (`10.0.2.20`)', role: 'Destination PC', description: 'Target endpoint.' },
    ],
    realWorldExample: {
      company: 'Global Internet BGP Backbone',
      scenario: 'Automatically rerouting traffic when an undersea fiber cable gets cut.',
      implementation: 'Autonomous System Border Routers exchange dynamic BGP path updates globally; within ~30–90 seconds of a subsea fiber break, dynamic routing tables converge onto backup terrestrial/oceanic fiber routes without human intervention.',
      scaleDetails: 'Routes traffic seamlessly across 70,000+ independent ISP networks.',
    },
    advantages: [
      'Switches eliminate collisions and deliver wire-speed gigabit LAN switching.',
      'Dynamic Routing (OSPF/BGP) self-heals around cut cables automatically.',
    ],
    disadvantages: [
      'Switches without Spanning Tree Protocol (STP) suffer catastrophic Broadcast Storms if wired in physical loops.',
      'BGP route hijacking or misconfigurations can temporarily divert global internet traffic.',
    ],
    relatedTopics: [
      { id: 'nat-and-vlan', title: 'NAT & VLAN Segmentation', module: 'networking' },
      { id: 'subnetting-cidr', title: 'Subnetting & CIDR', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Compare a Hub, a Switch, and a Router by OSI Layer and Domain.', answer: 'Hub = Layer 1 (1 shared collision domain + 1 broadcast domain, broadcasts blindly). Switch = Layer 2 (separate collision domain per port, 1 shared broadcast domain, learns MACs). Router = Layer 3 (separates BOTH collision and broadcast domains, routes IPs between networks).', keyPoints: ['Hub: L1 blind repeater', 'Switch: L2 MAC table', 'Router: L3 IP routing & broadcast boundary'] },
      { level: 'intermediate', question: 'Compare Static Routing vs Dynamic Routing (OSPF vs BGP).', answer: 'Static routes are manually typed by admins (`ip route ...`)—zero CPU overhead, good for tiny stub networks, doesn\'t adapt to broken links. Dynamic OSPF (Interior Gateway Protocol) automatically learns shortest paths inside ONE organization via link-state costs. Dynamic BGP (Exterior Gateway Protocol) routes traffic BETWEEN autonomous ISPs globally based on AS-path policies.', keyPoints: ['Static = Manual fixed path', 'OSPF = Fast intra-org dynamic shortest path', 'BGP = Inter-ISP global internet backbone'] },
      { level: 'advanced', question: 'What is a "Broadcast Storm" on Layer 2 Switches, and how does STP (Spanning Tree Protocol) prevent it?', answer: 'Because Ethernet frames have NO TTL field (unlike IP packets!), connecting two switches with two redundant cables creates a physical loop—causing one ARP broadcast to spin around infinitely at wire speed, saturating 100% CPU/ports within milliseconds! STP detects loops and logically blocks one redundant port until the primary fails.', keyPoints: ['L2 Ethernet frames lack TTL', 'Physical loops cause infinite broadcast storms', 'STP disables redundant ports until failover'] },
    ],
    quiz: [
      { id: 'rs-1', question: 'Which network device breaks up Broadcast Domains by forwarding only across different IP subnets?', options: ['Layer 3 Router', 'Layer 1 Hub', 'Layer 2 Unmanaged Switch', 'Ethernet Cable'], correctAnswer: 0, explanation: 'Routers never forward Layer 2 broadcasts (`255.255.255.255`) between interfaces.' },
      { id: 'rs-2', question: 'What table does a Layer 2 Switch build dynamically by reading Source MAC addresses of arriving frames?', options: ['MAC Address Table (CAM Table)', 'DNS Zone File', 'SQL Index', 'BGP AS Path'], correctAnswer: 0, explanation: 'Switches bind `MAC -> Physical Switch Port` inside Content Addressable Memory (CAM).' },
      { id: 'rs-3', question: 'Which Dynamic Routing protocol stitches independent ISPs and Cloud Providers together across the public Internet?', options: ['BGP (Border Gateway Protocol)', 'ARP', 'DHCP', 'STP'], correctAnswer: 0, explanation: 'BGP is the exterior routing protocol of the global Internet.' },
      { id: 'rs-4', question: 'Why can plugging both ends of an Ethernet cable into the same unmanaged switch crash an entire office LAN?', options: ['Ethernet lacks a TTL field, creating an infinite Layer 2 Broadcast Storm', 'Cables run out of copper', 'DHCP turns into HTTP', 'IP addresses double'], correctAnswer: 0, explanation: 'Without STP, L2 broadcast frames circulate forever at 100% link speed.' },
      { id: 'rs-5', question: 'What does a Switch do when it receives a unicast frame whose Destination MAC is NOT yet in its MAC Table?', options: ['Floods ("Unknown Unicast Flood") the frame out all ports except the incoming port', 'Deletes the switch OS', 'Sends to Google DNS', 'Drops all frames permanently'], correctAnswer: 0, explanation: 'Unknown destinations flood locally until the target replies and teaches its port.' },
    ],
  },

  'nat-and-vlan': {
    id: 'nat-and-vlan',
    title: 'Network Address Translation (NAT / PAT) & VLAN Segmentation',
    module: 'networking',
    category: '8. Routing, Switching & Network Devices',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'NAT/PAT translates private internal IPs into shared public IPs at border gateways (saving IPv4 space), while VLANs logically partition one physical switch into multiple isolated virtual broadcast domains.',
    introduction: {
      definition: 'NAT (Network Address Translation) rewrites source/destination IP headers at a router boundary—most commonly PAT (Port Address Translation), letting 50 home/office devices share ONE public IP using distinct ephemeral TCP/UDP port mappings. VLANs (IEEE 802.1Q) tag Ethernet frames with 12-bit IDs to isolate Guest Wi-Fi, IoT, and Finance traffic cleanly on shared physical switches.',
      analogousStory: 'NAT/PAT is a corporate mailroom with ONE public street address (Public IP) and 500 numbered employee mailboxes inside (Private IPs + Port Numbers). When John in Ext #5042 mails a letter out, the mailroom puts the company\'s public address + `Ext 5042` as return tag so replies route straight back to John\'s desk!',
      keyTakeaway: 'NAT/PAT saved IPv4 from exhaustion (and blocks unsolicited inbound traffic by default); VLANs provide Layer 2 security isolation without buying separate physical switches.',
    },
    whyRequired: {
      problemsSolved: [
        'Allows billions of private laptops/phones (`192.168.x.x`) to browse the internet sharing limited Public IPv4 addresses.',
        'Prevents smart TVs or Guest Wi-Fi laptops from sniffing internal Engineering servers plugged into the same office switch.',
      ],
      realWorldImpact: 'Every home Wi-Fi router runs PAT (NAT Overload), and every AWS VPC uses NAT Gateways for private app instances to reach external APIs safely.',
      metricsAffected: ['Public IPv4 Reuse Factor', 'NAT State Table Entries', 'VLAN Broadcast Isolation'],
    },
    coreArchitecture: {
      description: 'VLAN 802.1Q tags segregate L2 switch ports locally; Border Router maintains a NAT/PAT translation table mapping `(PrivateIP:Port <-> PublicIP:Port)`.',
      components: [
        { name: 'PAT / NAT Overload Table', role: 'Border Translation', details: 'Maps `(192.168.1.10:51200) -> (203.0.113.5:60001)` in stateful memory.' },
        { name: 'IEEE 802.1Q VLAN Tag', role: 'L2 Virtual Isolation', details: '4-byte Ethernet tag carrying 12-bit VLAN ID (`1–4094`) across Trunk ports.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'VLAN Tagging on Switch', technicalDetail: 'Switch isolates Port 1 (VLAN 10 Staff) from Port 2 (VLAN 20 Guests); traffic cannot cross without L3 Router rules.' },
        { stepNumber: 2, action: 'Outbound NAT/PAT Rewrite', technicalDetail: 'Router replaces Private Source `192.168.1.10:51200` with Public `203.0.113.5:60001` and logs state.' },
        { stepNumber: 3, action: 'Inbound Reply Reverse Map', technicalDetail: 'When internet replies to `:60001`, Router looks up table and forwards back to `192.168.1.10:51200`.' },
      ],
    },
    visualizationId: 'nat-vlan-3d',
    visualizationScene: 'routing-switching',
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Private Host Inside VLAN 10 Sends Outbound Frame', description: 'Host A on VLAN 10 sends packet with private IP `192.168.1.10:51200` to Switch A.', activeNodes: ['pc-a', 'switch-a'], packet: { from: 'pc-a', to: 'switch-a', label: 'VLAN 10 Private Frame', type: 'request' } },
      { step: 2, title: 'Step 2: NAT Gateway Rewrites Private -> Public IP:Port', description: 'Border Router A applies PAT, storing mapping `192.168.1.10:51200 <-> PublicIP:60001` before crossing WAN.', activeNodes: ['router-a', 'router-b'], packet: { from: 'router-a', to: 'router-b', label: 'SNAT -> PublicIP:60001', type: 'sync' } },
      { step: 3, title: 'Step 3: VLAN 20 Isolated Destination Delivery', description: 'Remote gateway translates and delivers into isolated VLAN 20 (`10.0.2.20`).', activeNodes: ['switch-b', 'pc-b'], packet: { from: 'switch-b', to: 'pc-b', label: 'VLAN 20 Deliver', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'pc-a', name: 'Host A (`192.168.1.10`, VLAN 10)', role: 'Private Endpoint', description: 'Isolated inside corporate Staff VLAN 10.' },
      { id: 'switch-a', name: 'Managed VLAN Switch A', role: '802.1Q Isolator', description: 'Keeps VLAN 10 traffic completely segregated from Guest VLANs.' },
      { id: 'router-a', name: 'NAT / PAT Gateway Router', role: 'IP/Port Translator', description: 'Rewrites outbound Private IP into Public IP + unique port.' },
      { id: 'router-b', name: 'Remote Border Router', role: 'Inbound Gateway', description: 'Forwards into remote private subnet.' },
      { id: 'switch-b', name: 'Managed VLAN Switch B', role: '802.1Q Isolator', description: 'Handles VLAN 20 framing.' },
      { id: 'pc-b', name: 'Host B (`10.0.2.20`, VLAN 20)', role: 'Target Endpoint', description: 'Receives translated stream.' },
    ],
    realWorldExample: {
      company: 'AWS NAT Gateway & Enterprise Trunking',
      scenario: 'Allowing private database/worker EC2 instances to pull OS security updates without getting public internet IPs.',
      implementation: 'Private instances route `0.0.0.0/0` outbound requests through an AWS NAT Gateway sitting in a public subnet—rewriting private IPs into the NAT Gateway\'s Elastic Public IP while blocking all unsolicited external hackers from initiating connections inward.',
      scaleDetails: 'Processes tens of gigabits per second per NAT Gateway cleanly.',
    },
    advantages: [
      'PAT enables thousands of private devices to share a single public IPv4.',
      'VLANs cut physical switch costs and contain security breaches inside logical segments.',
    ],
    disadvantages: [
      'NAT breaks pure end-to-end IP reachability, complicating P2P gaming/WebRTC (requiring STUN/TURN NAT traversal!).',
    ],
    relatedTopics: [
      { id: 'routing-vs-switching', title: 'Routing vs Switching', module: 'networking' },
      { id: 'subnetting-cidr', title: 'Subnetting & CIDR', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Explain the difference between Static 1:1 NAT and PAT (NAT Overload).', answer: 'Static NAT maps 1 private IP strictly to 1 dedicated public IP (used for hosting public servers). PAT (Port Address Translation / NAT Overload) maps THOUSANDS of private IPs onto ONE shared public IP by differentiating streams via unique source port numbers.', keyPoints: ['Static NAT = 1-to-1 IP mapping', 'PAT = Many-to-1 using unique TCP/UDP ports'] },
      { level: 'intermediate', question: 'Why can\'t devices in VLAN 10 talk to devices in VLAN 20 on the same Switch without a Router?', answer: 'A VLAN creates an independent Layer 2 broadcast domain. Switches refuse to bridge frames directly between different VLAN IDs for security and isolation—so traffic MUST pass through a Layer 3 Router (or L3 Switch SVI / "Router-on-a-Stick" trunk) enforcing firewall ACLs.', keyPoints: ['VLANs isolate broadcast domains', 'Inter-VLAN routing requires Layer 3 Router'] },
      { level: 'advanced', question: 'Why do WebRTC video calls need STUN and TURN servers because of NAT?', answer: 'Because both laptops sit behind home NAT routers holding private IPs like `192.168.1.5`, neither knows its public IP:Port! A **STUN** server tells the laptop its public mapped NAT IP:Port so peers can attempt direct UDP hole punching. If a strict symmetric corporate NAT blocks direct hole punching, a **TURN** relay server relays media cleanly.', keyPoints: ['STUN discovers public NAT IP:Port', 'TURN relays traffic when strict symmetric NAT blocks direct P2P'] },
    ],
    quiz: [
      { id: 'nv-1', question: 'Which NAT mechanism allows 200 office computers to browse the web sharing just ONE public IP address?', options: ['PAT (Port Address Translation / NAT Overload)', 'Static 1:1 NAT', 'VLAN Trunking', 'ARP Flooding'], correctAnswer: 0, explanation: 'PAT maps distinct private `IP:Port` pairs to unique source ports on one public IP.' },
      { id: 'nv-2', question: 'Which IEEE standard inserts a 4-byte VLAN ID tag into Ethernet frames across switch Trunk links?', options: ['IEEE 802.1Q', 'IEEE 802.11ax', 'HTTP/3', 'BGP-4'], correctAnswer: 0, explanation: '802.1Q standardizes VLAN tagging across trunks.' },
      { id: 'nv-3', question: 'What is a Switch "Access Port" vs a "Trunk Port"?', options: ['Access Port carries 1 single untagged VLAN to an end PC; Trunk Port carries multiple tagged VLANs between switches/routers', 'Trunk ports only connect printers', 'Access ports disable Ethernet', 'They are identical'], correctAnswer: 0, explanation: 'Trunks multiplex tagged frames across switch interconnects.' },
      { id: 'nv-4', question: 'How does NAT incidentally protect private laptops inside a home Wi-Fi network from random internet scans?', options: ['External attackers cannot initiate inbound sockets to a private IP unless a port-forward or outbound NAT mapping exists', 'NAT encrypts passwords with RSA', 'NAT turns off Wi-Fi', 'NAT deletes browser history'], correctAnswer: 0, explanation: 'Unsolicited inbound packets lack entries in the NAT state table and are dropped.' },
      { id: 'nv-5', question: 'Why is an AWS NAT Gateway placed inside a PUBLIC subnet even though it serves PRIVATE instances?', options: ['Because the NAT Gateway itself needs an Internet Gateway route and a Public Elastic IP to reach the internet', 'Private subnets have no IPv4', 'AWS bans private routers', 'To double DNS latency'], correctAnswer: 0, explanation: 'Outbound NAT translates private packets onto its own public IP bound for the Internet Gateway.' },
    ],
  },

  'network-security-firewall-vpn': {
    id: 'network-security-firewall-vpn',
    title: 'Firewalls & VPN Tunnels: Stateful Filtering & Encrypted Encapsulation',
    module: 'networking',
    category: '9. Network Security & Cryptography',
    readTime: '10 min',
    difficulty: 'Intermediate',
    summary: 'Firewalls filter inbound/outbound packets via security rules (Stateless ACLs vs Stateful Inspection vs Layer 7 WAF), while VPNs encapsulate encrypted traffic inside secure point-to-point IPSec/WireGuard tunnels over untrusted public networks.',
    introduction: {
      definition: 'A Firewall acts as a policy checkpoint inspecting network traffic against allow/deny rules. A VPN (Virtual Private Network) wraps entire IP packets inside encrypted outer tunnels (`WireGuard`, `IPSec`, `OpenVPN`) so remote hosts behave as if plugged directly into a private corporate LAN.',
      analogousStory: 'A Firewall is an armored customs gatehouse inspecting every delivery truck\'s manifest and blocking contraband at the border. A VPN is an armored steel subway tunnel running underneath public streets—anyone looking from above sees an opaque armored tube with zero clue who is inside or what cargo is moving!',
      keyTakeaway: 'Stateful Firewalls remember established outbound connections to auto-allow replies cleanly; VPNs provide privacy and private-LAN access across hostile public Wi-Fi.',
    },
    whyRequired: {
      problemsSolved: [
        'Blocks exposed internal ports (SSH 22, PostgreSQL 5432, Redis 6379) from public internet brute-forcing.',
        'Protects employees on public airport/coffee-shop Wi-Fi against eavesdropping and ARP/DNS hijacking.',
      ],
      realWorldImpact: 'WireGuard and IPSec VPNs secure remote enterprise access while Cloud WAFs block millions of automated SQLi/XSS exploits daily.',
      metricsAffected: ['Blocked Exploit Packets/sec', 'VPN Cryptographic Throughput', 'Attack Surface Exposure'],
    },
    coreArchitecture: {
      description: 'Remote Client -> Encrypted WireGuard/IPSec VPN Tunnel -> Stateful Firewall + WAF Guard -> Private Corporate Internal Servers.',
      components: [
        { name: 'Encrypted VPN Tunnel', role: 'AES-256 / ChaCha20 Armor', details: 'Encapsulates inner private IP packets inside authenticated encrypted outer UDP/IP payloads.' },
        { name: 'Stateful Firewall / WAF', role: 'Connection & Payload Gate', details: 'Tracks connection state table (`SYN/ESTABLISHED`) and inspects L7 HTTP for SQLi/XSS.' },
        { name: 'Protected Private Server', role: 'Internal Intranet', details: 'Unreachable from public internet without valid VPN credentials & firewall clearance.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'VPN Key Exchange & Tunnel', technicalDetail: 'Client establishes WireGuard/IPSec session and wraps private packet inside encrypted outer packet.' },
        { stepNumber: 2, action: 'Firewall Stateful Inspection', technicalDetail: 'Firewall verifies connection state, port rules, and blocks spoofed/malicious signatures.' },
        { stepNumber: 3, action: 'Clean Internal Delivery', technicalDetail: 'Switch modes above to watch Valid VPN Traffic pass vs Attacker Spoofed Traffic get dropped at the Firewall!' },
      ],
    },
    visualizationId: 'vpn-fw-3d',
    visualizationScene: 'vpn-firewall',
    visualizationModes: [
      { id: 'vpn-encrypted', label: 'Encrypted VPN Tunnel (Pass)' },
      { id: 'ddos-blocked', label: 'Malicious Traffic (Firewall DROP)' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Encrypted VPN Tunnel vs Rogue Attack', description: 'Toggle simulation modes above! Valid engineers send packets wrapped inside the glowing AES-256 VPN tunnel; attackers hit the Firewall directly.', activeNodes: ['vpn-client', 'firewall'], packet: { from: 'vpn-client', to: 'firewall', label: 'Encrypted Tunnel / Attack Probe', type: 'request' } },
      { step: 2, title: 'Step 2: Stateful Firewall Filtering Enforcement', description: 'Firewall drops unauthorized attack packets instantly while allowing verified encrypted VPN traffic straight into the Corporate Intranet.', activeNodes: ['firewall', 'corp-server'], packet: { from: 'firewall', to: 'corp-server', label: 'Verified -> Corporate Intranet', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'vpn-client', name: 'Remote Engineer / Attacker', role: 'Traffic Origin', description: 'Connects over untrusted public internet.' },
      { id: 'firewall', name: 'Stateful Firewall & WAF', role: 'Perimeter Guard', description: 'Drops rogue ports/attacks and tracks active TCP/UDP states.' },
      { id: 'corp-server', name: 'Corporate Intranet Server', role: 'Protected Internal Host', description: 'Hosts internal DBs, admin tools, and source repos safely.' },
    ],
    realWorldExample: {
      company: 'Tailscale / WireGuard & AWS Security Groups',
      scenario: 'Replacing fragile legacy VPN concentrators with zero-trust mesh VPNs and cloud stateful firewalls.',
      implementation: 'AWS Security Groups operate as **Stateful Firewalls** (allowing return replies automatically), while Network ACLs act as **Stateless Firewalls** (requiring explicit inbound AND outbound ephemeral port rules). Modern teams use WireGuard-based mesh VPNs (Tailscale) for blazing-fast kernel-level encryption.',
      scaleDetails: 'Secures millions of remote cloud infrastructure tunnels effortlessly.',
    },
    advantages: [
      'VPNs secure ALL device traffic (even non-HTTPS DNS/UDP/DB traffic) across untrusted public Wi-Fi.',
      'Stateful firewalls eliminate tedious manual rules for return ephemeral client ports.',
    ],
    disadvantages: [
      'VPN encryption adds slight CPU & MTU header overhead.',
      'Traditional perimeter VPNs trust users too broadly once inside ("Castle-and-Moat")—shifting industry toward Zero Trust.',
    ],
    relatedTopics: [
      { id: 'ssl-tls-handshake', title: 'SSL/TLS Handshake', module: 'networking' },
      { id: 'network-attacks-ddos-mitm', title: 'DDoS, MitM & Network Attacks', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the difference between a Stateless Firewall and a Stateful Firewall?', answer: 'A Stateless Firewall (like AWS NACLs) inspects every single packet in isolation against static IP/port rules—requiring you to manually open ephemeral return ports `1024-65535`. A Stateful Firewall (like AWS Security Groups / iptables conntrack) tracks active sessions in memory and automatically permits return replies for valid outbound requests!', keyPoints: ['Stateless = Per-packet isolated ACL (no memory)', 'Stateful = Tracks active connections and auto-allows replies'] },
      { level: 'intermediate', question: 'How does a Web Application Firewall (WAF) differ from a traditional Network Firewall?', answer: 'A traditional Network Firewall filters at Layers 3/4 (blocking Ports like 22/3306 or IPs). A WAF operates at Layer 7—decrypting HTTPS to inspect SQL Injection (`OR 1=1`), Cross-Site Scripting (`<script>`), and malformed HTTP payloads inside port 443 web traffic!', keyPoints: ['Network Firewall = L3/L4 (IP & Port)', 'WAF = L7 HTTP payload inspection (SQLi/XSS)'] },
      { level: 'advanced', question: 'Compare IPSec VPN, OpenVPN (TLS), and WireGuard—and explain Split Tunneling vs Full Tunneling.', answer: 'IPSec is heavy/complex yet widely supported in hardware routers. OpenVPN runs over TLS (great for bypassing strict firewalls on TCP 443, slightly slower user-space context switches). WireGuard runs directly inside the Linux kernel using modern ChaCha20/Curve25519 cryptography in ~4,000 lines of code—dramatically faster and simpler! Full Tunneling routes ALL user traffic (even YouTube) through HQ VPN; Split Tunneling sends only private `10.x` corporate traffic through VPN while browsing regular sites directly.', keyPoints: ['WireGuard = Fast modern kernel VPN', 'Full Tunnel = All traffic via VPN; Split Tunnel = Only corporate subnets via VPN'] },
    ],
    quiz: [
      { id: 'nfv-1', question: 'Which AWS firewall control is STATEFUL and automatically allows return traffic for outbound requests?', options: ['Security Groups', 'Network ACLs (NACLs)', 'Route Tables', 'DNS TXT'], correctAnswer: 0, explanation: 'Security Groups are stateful; NACLs are stateless.' },
      { id: 'nfv-2', question: 'Which firewall inspects inside HTTP port 443 payloads to block SQL Injection and XSS attacks?', options: ['WAF (Web Application Firewall)', 'L2 Switch MAC Filter', 'ICMP Blocker', 'ARP Cache'], correctAnswer: 0, explanation: 'WAFs operate at Layer 7 parsing HTTP content.' },
      { id: 'nfv-3', question: 'What modern VPN protocol runs inside the Linux kernel with compact ~4,000 lines of code and ChaCha20 cryptography?', options: ['WireGuard', 'PPTP', 'Telnet', 'Plain FTP'], correctAnswer: 0, explanation: 'WireGuard delivers superior speed, battery life, and auditability.' },
      { id: 'nfv-4', question: 'What does "Split Tunneling" mean in VPN configuration?', options: ['Only internal corporate subnet traffic enters the VPN tunnel; normal public browsing goes directly to ISP', 'Cutting VPN cables physically', 'Using two keyboards', 'Disabling encryption'], correctAnswer: 0, explanation: 'Split tunneling saves corporate VPN bandwidth for external web traffic.' },
      { id: 'nfv-5', question: 'If a Stateless NACL allows inbound port 443 but forgets to allow outbound ephemeral ports `1024-65535`, what happens?', options: ['Clients can send requests in, but server return replies get blocked outbound!', 'Everything runs 2x faster', 'VPN auto-installs', 'DNS resolves faster'], correctAnswer: 0, explanation: 'Stateless ACLs inspect inbound and outbound rules independently.' },
    ],
  },

  'ssl-tls-handshake': {
    id: 'ssl-tls-handshake',
    title: 'SSL/TLS Handshake, Digital Certificates & Asymmetric/Symmetric Cryptography',
    module: 'networking',
    category: '9. Network Security & Cryptography',
    readTime: '12 min',
    difficulty: 'Advanced',
    summary: 'TLS secures HTTPS using hybrid cryptography: Asymmetric Public-Key crypto (ECDHE + X.509 CA Certificates) authenticates servers and negotiates keys in 1 RTT (TLS 1.3), then ultra-fast Symmetric AES-GCM/ChaCha20 encrypts bulk data.',
    introduction: {
      definition: 'Transport Layer Security (TLS) guarantees three security pillars over untrusted networks: **Confidentiality** (encryption), **Integrity** (HMAC/AEAD prevents tampering), and **Authentication** (X.509 Certificate Authorities prove you are genuinely talking to `bank.com`, not an impostor).',
      analogousStory: 'Imagine passing a secret diary lockbox: Asymmetric Crypto (RSA/ECDSA) is a magical padlock anyone can snap shut with your public key, yet ONLY your private key opens. Once the server proves its identity using its passport (CA-signed Certificate), you both agree on a super-fast shared symmetric secret key inside that handshake to chat smoothly!',
      keyTakeaway: 'TLS uses **Asymmetric** cryptography ONLY during the initial handshake for auth & key exchange, then switches to **Symmetric** AES/ChaCha20 (1,000x faster!) for actual data transfer.',
    },
    whyRequired: {
      problemsSolved: [
        'Stops ISPs, hackers on public Wi-Fi, and rogue routers from reading passwords, session cookies, and credit cards.',
        'Detects silent in-flight packet tampering.',
        'TLS 1.3 cuts handshake setup time in half (from 2 RTTs in TLS 1.2 down to just 1 RTT / 0-RTT!).',
      ],
      realWorldImpact: 'Over 95% of all web pages loaded in Chrome/Safari now run encrypted over HTTPS/TLS 1.3.',
      metricsAffected: ['Handshake RTTs (1 RTT in TLS 1.3)', 'Perfect Forward Secrecy (ECDHE)', 'Cipher Speed (AES-GCM)'],
    },
    coreArchitecture: {
      description: 'TLS 1.3 Handshake (`ClientHello + KeyShare` -> `ServerHello + Cert + Verify` -> Encrypted Application Data) anchored to OS Trusted Root CA store.',
      components: [
        { name: 'X.509 Certificate & CA Chain', role: 'Identity Proof', details: 'Digitally signed by trusted Certificate Authority (Let\'s Encrypt, DigiCert) binding domain name to Public Key.' },
        { name: 'ECDHE Key Exchange', role: 'Forward Secrecy', details: 'Ephemeral Diffie-Hellman derives shared symmetric session key; compromising private key later NEVER decrypts past recordings!' },
        { name: 'AES-256-GCM / ChaCha20', role: 'Bulk Symmetric Cipher', details: 'Hardware-accelerated symmetric authenticated encryption encrypting HTTP traffic.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'ClientHello + KeyShare (TLS 1.3)', technicalDetail: 'Browser sends supported ciphers, random nonce, SNI domain name, and ephemeral ECDHE public key.' },
        { stepNumber: 2, action: 'ServerHello + Certificate + Verify', technicalDetail: 'Server picks cipher, sends its ephemeral key share + X.509 certificate signed by CA, and signs proof with private key.' },
        { stepNumber: 3, action: 'Verify Trust Chain & Encrypt Data', technicalDetail: 'Browser verifies CA chain locally, derives identical shared Symmetric Session Key, and begins encrypted HTTP!' },
      ],
    },
    visualizationId: 'tls-3d',
    visualizationScene: 'http-https',
    visualizationModes: [
      { id: 'https-tls', label: 'TLS 1.3 Handshake (1-RTT)' },
      { id: 'http2-multiplex', label: 'Encrypted Multiplexed Data' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Browser Sends ClientHello + Ephemeral KeyShare', description: 'Browser initiates TLS 1.3 handshake including SNI domain name and cipher proposals.', activeNodes: ['browser', 'tls-layer'], packet: { from: 'browser', to: 'tls-layer', label: 'ClientHello + KeyShare', type: 'request' } },
      { step: 2, title: 'Step 2: Server Responds with Cert & CA Signature', description: 'Server returns X.509 certificate, CA chain, and ephemeral Diffie-Hellman key share.', activeNodes: ['tls-layer', 'web-server'], packet: { from: 'web-server', to: 'browser', label: 'ServerHello + X.509 Cert', type: 'sync' } },
      { step: 3, title: 'Step 3: Shared Symmetric Session Active!', description: 'Both endpoints derive identical AES-GCM session keys—HTTPS payload streams securely!', activeNodes: ['browser', 'web-server'], packet: { from: 'browser', to: 'web-server', label: 'AES-GCM Encrypted HTTP', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'browser', name: 'TLS Client (Root CA Store)', role: 'Verifier', description: 'Holds pre-installed trusted Root CA public keys to validate server certificates.' },
      { id: 'tls-layer', name: 'TLS 1.3 Crypto Negotiation', role: 'Hybrid Key Exchange', description: 'Establishes Perfect Forward Secrecy in 1 Round Trip.' },
      { id: 'web-server', name: 'HTTPS Origin / Edge Proxy', role: 'Certificate Holder', description: 'Holds private key matching the CA-signed public certificate.' },
    ],
    realWorldExample: {
      company: 'Let\'s Encrypt & Cloudflare',
      scenario: 'Encrypting the entire web for free with automated 90-day X.509 certificate renewals.',
      implementation: 'Let\'s Encrypt automated domain validation via the ACME protocol, enabling millions of sites to deploy free TLS 1.3 certificates with Perfect Forward Secrecy automatically.',
      scaleDetails: 'Issues hundreds of millions of active X.509 certificates globally.',
    },
    advantages: [
      'Prevents snooping, credential theft, and MitM content injection (ISP ad injection).',
      'TLS 1.3 mandates Perfect Forward Secrecy (ECDHE) and removes weak legacy ciphers.',
    ],
    disadvantages: [
      'Requires vigilant certificate renewal automation (expired certs cause instant browser security warnings blocking users!).',
    ],
    relatedTopics: [
      { id: 'http-evolution-http1-2-3', title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3', module: 'networking' },
      { id: 'reverse-proxy', title: 'Reverse Proxy SSL Termination', module: 'system-design' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Why doesn\'t TLS just use Asymmetric RSA/ECDSA encryption for the entire browsing session instead of switching to Symmetric AES?', answer: 'Asymmetric cryptography (multiplying huge 2048-bit primes or elliptic curve scalar operations) is ~1,000x slower computationally than Symmetric AES (which uses fast CPU AES-NI instructions). Therefore TLS uses Asymmetric crypto ONLY briefly to verify identity and agree on a shared Symmetric session key!', keyPoints: ['Asymmetric = Slow (used for auth + key exchange)', 'Symmetric AES = 1,000x faster (used for bulk stream)'] },
      { level: 'intermediate', question: 'What is "Perfect Forward Secrecy (PFS)", and why did TLS 1.3 deprecate static RSA key exchange?', answer: 'With old static RSA key exchange, if an attacker recorded your encrypted traffic today and stole the server\'s Private Key 3 years later, they could retroactively decrypt ALL past recordings! PFS (using Ephemeral Diffie-Hellman `ECDHE`) generates disposable per-session keys discarded immediately when the session closes—so stealing the long-term private key never compromises past recorded sessions.', keyPoints: ['Disposable per-session ECDHE keys', 'Long-term key compromise cannot decrypt past recorded sessions'] },
      { level: 'advanced', question: 'What is SNI (Server Name Indication), and why is it needed when 100 websites share 1 IP address?', answer: 'When 100 different domains (`siteA.com`, `siteB.com`) sit behind one Nginx server IP `198.51.100.24`, Nginx must know WHICH domain\'s SSL certificate to send back DURING the TLS handshake—BEFORE the HTTP `Host:` header can even be decrypted! SNI sends the requested domain hostname in plaintext inside the initial `ClientHello` message.', keyPoints: ['Virtual hosting multiple TLS domains on 1 IP', 'Hostname sent in `ClientHello` before HTTP decrypts'] },
    ],
    quiz: [
      { id: 'tls-1', question: 'How many network Round Trips (RTTs) does a standard fresh TLS 1.3 handshake require (excluding TCP SYN)?', options: ['1 RTT (down from 2 RTTs in TLS 1.2)', '5 RTTs', '10 RTTs', '7 RTTs'], correctAnswer: 0, explanation: 'TLS 1.3 bundles ClientHello + KeyShare in the first flight, completing in 1 RTT.' },
      { id: 'tls-2', question: 'What guarantees that stealing a server\'s private certificate key years later CANNOT decrypt past recorded sessions?', options: ['Perfect Forward Secrecy (via Ephemeral ECDHE)', 'DNS TTL', 'ARP Caching', 'HTML5 Cookies'], correctAnswer: 0, explanation: 'Ephemeral session keys are never derived solely from the long-term server private key.' },
      { id: 'tls-3', question: 'How does your web browser verify that `google.com`\'s X.509 certificate isn\'t forged by a local hacker?', options: ['Checks the cryptographic signature chain back to a trusted Root Certificate Authority pre-installed in your OS/Browser', 'Asks the hacker directly', 'Checks if the font looks pretty', 'Pings port 22'], correctAnswer: 0, explanation: 'Browsers validate CA digital signature chains against trusted Root CA anchors.' },
      { id: 'tls-4', question: 'What TLS extension lets Nginx serve unique SSL certificates for 50 different domains sharing a single IP address?', options: ['SNI (Server Name Indication)', 'NAT', 'DHCP', 'ICMP'], correctAnswer: 0, explanation: 'SNI reveals the requested hostname inside `ClientHello`.' },
      { id: 'tls-5', question: 'What happens to TLS connections if a server\'s X.509 certificate passes its expiration date?', options: ['Browsers immediately halt with a critical security warning error blocking normal navigation', 'Encryption automatically upgrades', 'Server turns into UDP', 'Nothing happens'], correctAnswer: 0, explanation: 'Expired certs fail browser validation immediately.' },
    ],
  },

  'network-attacks-ddos-mitm': {
    id: 'network-attacks-ddos-mitm',
    title: 'Common Network Attacks: DDoS, Man-in-the-Middle (MitM), IP Spoofing & Packet Sniffing',
    module: 'networking',
    category: '9. Network Security & Cryptography',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Examine how network attackers exploit stateless protocols (SYN Floods, DNS/NTP Amplification DDoS, MitM ARP/TLS interception, IP Spoofing, Sniffing) and how defense-in-depth stops them.',
    introduction: {
      definition: 'Network attacks target availability (DDoS flooding bandwidth/sockets), confidentiality (Sniffing cleartext packets), and integrity/authentication (MitM traffic interception and forged IP Spoofing).',
      analogousStory: 'A DDoS attack is hiring 100,000 prank callers to phone a pizza shop simultaneously so real customers get busy signals. IP Spoofing is writing a fake return address on a postcard. MitM is a rogue mail carrier secretly opening, reading, and altering letters before resealing them!',
      keyTakeaway: 'Encrypt everything end-to-end (TLS 1.3 stops Sniffing & MitM), deploy Edge Anycast Scrubbing + SYN Cookies (stops DDoS), and enforce ingress BCP 38 filtering (stops IP Spoofing).',
    },
    whyRequired: {
      problemsSolved: [
        'Defends public APIs from multi-terabit UDP reflection/amplification floods.',
        'Prevents coffee-shop Wi-Fi attackers from hijacking session cookies.',
      ],
      realWorldImpact: 'Cloudflare and AWS Shield mitigate record-breaking 3+ Tbps / 400M RPS HTTP/2 DDoS botnets automatically.',
      metricsAffected: ['Dropped Spoofed Packets/sec', 'SYN Queue Saturation', 'TLS Downgrade Immunity'],
    },
    coreArchitecture: {
      description: 'Edge Anycast Scrubbing Centers + Stateful Firewalls filter DDoS floods, SYN Cookies protect server queues, and TLS + HSTS blocks MitM.',
      components: [
        { name: 'DDoS Scrubbing & Firewall', role: 'Volumetric Shield', details: 'Drops malformed UDP amplification, SYN floods, and bot L7 patterns before origin.' },
        { name: 'TLS + HSTS Encryption', role: 'Anti-MitM / Anti-Sniff', details: 'Prevents passive packet sniffers and active MitM TLS stripping attacks.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Attack Detection', technicalDetail: 'Edge monitor spots sudden 500x spike in malformed UDP/SYN packets from botnets.' },
        { stepNumber: 2, action: 'Anycast Scrub & Drop', technicalDetail: 'Firewall drops spoofed/flood frames at line rate while legitimate VPN/TLS clients pass.' },
      ],
    },
    visualizationId: 'net-attacks-3d',
    visualizationScene: 'vpn-firewall',
    visualizationModes: [
      { id: 'ddos-blocked', label: 'DDoS / Spoof Attack (Blocked)' },
      { id: 'vpn-encrypted', label: 'Encrypted Safe Traffic (Pass)' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Botnet Launches Spoofed DDoS Flood', description: 'Compromised botnet hosts fire spoofed SYN and amplification packets toward target server.', activeNodes: ['vpn-client', 'firewall'], packet: { from: 'vpn-client', to: 'firewall', label: 'Spoofed SYN Flood!', type: 'blocked' } },
      { step: 2, title: 'Step 2: Edge Firewall Scrubs & Drops Attack', description: 'Stateful Firewall + Scrubbing center drops forged packets instantly—Internal Server remains untouched!', activeNodes: ['firewall', 'corp-server'], packet: { from: 'vpn-client', to: 'firewall', label: 'DROPPED AT PERIMETER', type: 'blocked' } },
    ],
    interactiveComponents: [
      { id: 'vpn-client', name: 'Attacker Botnet / Legitimate Client', role: 'External Source', description: 'Switch modes above to compare blocked spoofed attacks vs encrypted valid traffic.' },
      { id: 'firewall', name: 'DDoS Scrubbing & Stateful Firewall', role: 'Defense Barrier', description: 'Uses SYN Cookies, rate limits, and eBPF packet dropping.' },
      { id: 'corp-server', name: 'Protected Origin Server', role: 'Target System', description: 'Stays online with normal CPU load during massive floods.' },
    ],
    realWorldExample: {
      company: 'Cloudflare HTTP/2 Rapid Reset Defense',
      scenario: 'Stopping a 201-million-request-per-second HTTP/2 DDoS botnet exploit.',
      implementation: 'Attackers opened HTTP/2 streams and immediately cancelled them (`RST_STREAM`), forcing backend servers to allocate/teardown resources infinitely while hiding behind small inbound byte footprints. Edge proxies closed abusive connections aggressively and applied kernel-level eBPF dropping.',
      scaleDetails: 'Blocked 201M+ RPS without impacting protected customer uptime.',
    },
    advantages: [
      'Layered defenses (Anycast + eBPF + WAF + TLS + HSTS) protect availability, privacy, and integrity simultaneously.',
    ],
    disadvantages: [
      'Volumetric DDoS mitigation requires external upstream CDN/ISP capacity—a single origin server cannot drop a 1 Tbps flood on a 10 Gbps NIC!',
    ],
    relatedTopics: [
      { id: 'network-security-firewall-vpn', title: 'Firewalls & VPN Tunnels', module: 'networking' },
      { id: 'ssl-tls-handshake', title: 'SSL/TLS Handshake', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Explain a UDP Amplification DDoS attack (like DNS or NTP amplification).', answer: 'Because UDP has no handshake, an attacker sends a tiny 60-byte query to thousands of open public DNS/NTP servers WITH THE VICTIM\'S IP SPOOFED as the Source IP! Each DNS server then blasts a giant 3,000-byte reply straight at the victim—amplifying the attacker\'s bandwidth 50x!', keyPoints: ['Spoofed victim Source IP over connectionless UDP', 'Tiny request triggers huge 50x reply blasted at victim'] },
      { level: 'intermediate', question: 'How does HSTS (`Strict-Transport-Security`) stop "SSL Stripping" Man-in-the-Middle attacks?', answer: 'When a user types `bank.com` without `https://`, browsers default to plain `http://bank.com` first—letting a coffee-shop MitM attacker intercept the unencrypted redirect and keep the victim on fake HTTP! HSTS tells browsers "ALWAYS use HTTPS directly for `bank.com` for the next year—refuse insecure HTTP completely".', keyPoints: ['Prevents HTTP-to-HTTPS downgrade interception', 'Browser upgrades locally before sending first packet'] },
      { level: 'advanced', question: 'Why can\'t a single Origin server with a 10 Gbps link defend itself against a 500 Gbps DDoS flood purely via local `iptables`?', answer: 'Even if your local Linux firewall drops all 500 Gbps of packets at 100% efficiency, the upstream ISP fiber pipe leading into your server is ALREADY completely clogged and saturated at 10 Gbps—dropping valid user packets BEFORE they even reach your building! You MUST absorb volumetric floods upstream at distributed BGP Anycast scrubbing centers.', keyPoints: ['Local firewall cannot unclog an already-saturated inbound ISP pipe', 'Requires upstream Anycast CDN scrubbing'] },
    ],
    quiz: [
      { id: 'atk-1', question: 'Why is UDP favored over TCP for Reflection / Amplification DDoS attacks?', options: ['UDP lacks a 3-way handshake, making Source IP spoofing trivial without needing to receive replies', 'UDP headers are 500 bytes', 'TCP cannot carry IP addresses', 'Routers drop all TCP'], correctAnswer: 0, explanation: 'Connectionless UDP lets spoofed packets elicit massive replies toward victims.' },
      { id: 'atk-2', question: 'Which HTTP header defeats SSL Stripping MitM attacks by forcing browsers onto HTTPS directly?', options: ['Strict-Transport-Security (HSTS)', 'X-Powered-By', 'Content-Length', 'Cache-Control: public'], correctAnswer: 0, explanation: 'HSTS prevents initial insecure HTTP requests.' },
      { id: 'atk-3', question: 'Which defense allows a server to handle millions of forged TCP SYN Flood packets without running out of RAM?', options: ['SYN Cookies', 'Turning off Ethernet', 'Bigger SQL indexes', 'Sending plaintext passwords'], correctAnswer: 0, explanation: 'SYN Cookies encode connection state into the ISN instead of allocating TCB memory prematurely.' },
      { id: 'atk-4', question: 'What does a passive Packet Sniffer on an unencrypted open Wi-Fi network capture?', options: ['Plaintext HTTP URLs, FTP passwords, and unencrypted DNS queries', 'AES-256 TLS ciphertext keys', 'Server motherboard serial numbers', 'Physical keyboard switches'], correctAnswer: 0, explanation: 'Unencrypted protocols leak readable payloads over shared airwaves.' },
      { id: 'atk-5', question: 'What ISP anti-spoofing best practice drops packets leaving a customer network if their Source IP doesn\'t belong to that network?', options: ['BCP 38 (Ingress Filtering)', 'HTTP/2 Push', 'DNS CNAME', 'Spanning Tree'], correctAnswer: 0, explanation: 'BCP 38 prevents botnets from forging arbitrary external source IPs.' },
    ],
  },

  'what-happens-when-url-entered': {
    id: 'what-happens-when-url-entered',
    title: 'What Happens When You Type a URL in Your Browser? (Complete Journey)',
    module: 'networking',
    category: '10. HTTP & Modern Web Communication',
    readTime: '13 min',
    difficulty: 'Beginner',
    summary: 'Follow the complete end-to-end engineering journey when you press Enter on `https://architect.io`: URL parsing, HSTS check, Browser/OS/DNS resolution, TCP 3-Way Handshake, TLS 1.3 Handshake, HTTP Request, Server/CDN response, and DOM Rendering.',
    introduction: {
      definition: 'This classic interview question ties together virtually every single networking and system design layer—showing how DNS, ARP, Routing, TCP, TLS, CDNs/Load Balancers, HTTP, and Browser Rendering collaborate inside ~150 milliseconds.',
      analogousStory: 'Typing a URL is like dispatching an ultra-fast automated expedition: check local address book (Browser/OS DNS Cache) -> call global directory if missing (Recursive/Root/TLD/Auth DNS) -> confirm open line (TCP SYN/SYN-ACK/ACK) -> verify passport & lockbox (TLS 1.3) -> order the page (HTTP GET) -> construct the painting on screen (HTML DOM/CSSOM/GPU Paint)!',
      keyTakeaway: 'Mastering this end-to-end lifecycle connects Browser -> DNS -> Network Routing -> Transport -> TLS -> Server Backend -> Rendering into one crystal-clear mental model.',
    },
    whyRequired: {
      problemsSolved: [
        'Serves as the single highest-frequency full-stack, backend, and SRE interview question.',
        'Pinpoints where latency bugs live (is it slow DNS, slow TLS, slow backend TTFB, or blocking JS rendering?).',
      ],
      realWorldImpact: 'Browser DevTools "Waterfall" network timings split directly into these exact phases: DNS Lookup -> Initial Connection (TCP) -> SSL (TLS) -> Waiting (TTFB) -> Content Download.',
      metricsAffected: ['DNS Lookup Time', 'TCP+TLS Setup Time', 'Time to First Byte (TTFB)', 'Largest Contentful Paint (LCP)'],
    },
    coreArchitecture: {
      description: 'Browser Check -> DNS Resolution -> TCP + TLS Handshake -> HTTP GET to CDN/Reverse Proxy -> Server Response -> Browser Render.',
      components: [
        { name: '1. URL Parser & HSTS Cache', role: 'Browser Pre-Flight', details: 'Parses scheme/host/path; upgrades HTTP -> HTTPS locally if domain sits on HSTS preload list.' },
        { name: '2. Multi-Layer DNS Resolution', role: 'Name -> IP Lookup', details: 'Checks Browser Cache -> OS Cache -> `/etc/hosts` -> Recursive Resolver -> Root -> TLD -> Authoritative NS.' },
        { name: '3. TCP + TLS + HTTP Pipeline', role: 'Secure Transport & Fetch', details: 'Runs TCP 3-way handshake + TLS 1.3 -> sends HTTP GET -> receives HTML -> parses DOM & loads JS/CSS.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Cache & DNS Resolution', technicalDetail: 'Check Browser/OS DNS cache; on miss, traverse Recursive -> Root -> TLD -> Authoritative NS to get `76.76.21.21`.' },
        { stepNumber: 2, action: 'TCP + TLS 1.3 Setup', technicalDetail: 'Run ARP for default gateway MAC -> TCP SYN/SYN-ACK/ACK on port 443 -> TLS 1.3 cert verification.' },
        { stepNumber: 3, action: 'HTTP GET & Server Response', technicalDetail: 'Send `GET / HTTP/2`; CDN/Reverse Proxy/Backend returns `200 OK` HTML.' },
        { stepNumber: 4, action: 'Browser Critical Rendering Path', technicalDetail: 'Parse HTML -> DOM + CSS -> CSSOM -> Render Tree -> Layout -> GPU Paint!' },
      ],
    },
    visualizationId: 'url-journey-3d',
    visualizationScene: 'dns-resolution',
    visualizationModes: [
      { id: 'iterative', label: 'Full Cold URL Flow (DNS -> Connect)' },
      { id: 'cached-hit', label: 'Warm DNS Cache -> Instant Connect' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Browser Checks HSTS & Queries DNS Resolver', description: 'User hits Enter on `https://architect.io`. Browser upgrades via HSTS and queries Recursive Resolver (`1.1.1.1`).', activeNodes: ['client-dns', 'resolver-dns'], packet: { from: 'client-dns', to: 'resolver-dns', label: '1. DNS Query architect.io', type: 'request' } },
      { step: 2, title: 'Step 2: DNS Hierarchy Resolves Server IP', description: 'Resolver asks Root (.) -> TLD (.io) -> Authoritative NS to obtain IP `76.76.21.21`.', activeNodes: ['resolver-dns', 'root-dns', 'tld-dns', 'authoritative-dns'], packet: { from: 'resolver-dns', to: 'authoritative-dns', label: '2. Resolve -> 76.76.21.21', type: 'sync' } },
      { step: 3, title: 'Step 3: TCP + TLS + HTTP Fetch & DOM Render', description: 'Browser opens TCP + TLS 1.3 to `76.76.21.21:443`, sends `GET /`, receives HTML, and paints UI!', activeNodes: ['client-dns'], packet: { from: 'resolver-dns', to: 'client-dns', label: '3. TCP+TLS+HTTP -> Render UI!', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'client-dns', name: 'Browser (Parser, Cache & Render Engine)', role: 'Client Stack', description: 'Handles HSTS, DNS cache, TCP socket, TLS verification, and DOM/CSSOM paint.' },
      { id: 'resolver-dns', name: 'Recursive DNS Resolver', role: 'Name Lookup Proxy', description: 'Traverses DNS tree to locate destination server IP.' },
      { id: 'root-dns', name: 'DNS Root Server', role: 'Hierarchy Apex', description: 'Points to TLD nameservers.' },
      { id: 'tld-dns', name: 'DNS TLD Server', role: 'Registry', description: 'Points to Authoritative zone servers.' },
      { id: 'authoritative-dns', name: 'Authoritative NS & Target Server', role: 'Origin Endpoint', description: 'Provides final IP and serves HTTP response.' },
    ],
    realWorldExample: {
      company: 'Chrome Networking & Rendering Stack',
      scenario: 'Loading a complex modern React web page in under 1 second on mobile.',
      implementation: 'Chrome accelerates this flow aggressively: `<link rel="preconnect">` runs DNS+TCP+TLS early before assets are even parsed; HTTP/2 & HTTP/3 stream CSS/JS concurrently; Speculative HTML Preload Scanners discover sub-resources immediately.',
      scaleDetails: 'Cuts cold page load latency by 40-60%.',
    },
    advantages: [
      'Modular layered execution allows caching at every boundary (Browser DNS -> OS -> Resolver -> CDN Edge -> Redis).',
    ],
    disadvantages: [
      'Cold uncached loads incur sequential waterfall round-trips unless HTTP/3 0-RTT and `<link rel="preconnect">` are leveraged.',
    ],
    relatedTopics: [
      { id: 'dns-resolution', title: 'DNS Resolution', module: 'networking' },
      { id: 'tcp-three-way-handshake', title: 'TCP Three-Way Handshake', module: 'networking' },
      { id: 'ssl-tls-handshake', title: 'SSL/TLS Handshake', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'Walk through the exact 6 major milestones after pressing Enter on `https://example.com`.', answer: '1) Browser parses URL & checks DNS cache; 2) DNS Resolution maps `example.com` -> IP address; 3) TCP 3-Way Handshake establishes socket on port 443; 4) TLS Handshake verifies certificate & derives encryption keys; 5) HTTP GET request fetches HTML from CDN/Server; 6) Browser parses HTML/CSS/JS to build DOM/CSSOM and paints pixels to screen.', keyPoints: ['DNS -> TCP -> TLS -> HTTP -> DOM Render'] },
      { level: 'intermediate', question: 'Where does ARP come into play during "What happens when you enter a URL?"?', answer: 'Once DNS returns `93.184.216.34`, your OS checks its subnet mask and sees the IP is outside your home/office LAN—so it must send the packet to your Default Gateway router! If your OS doesn\'t yet know your local router\'s physical MAC address, it broadcasts an ARP request on the LAN ("Who has `192.168.1.1`?") before wrapping the first Ethernet frame!', keyPoints: ['ARP resolves Default Gateway MAC on local LAN before first packet leaves'] },
      { level: 'advanced', question: 'What is the "Critical Rendering Path" once HTML bytes arrive in the browser?', answer: '1) Parse HTML bytes into the **DOM** tree (blocked when encountering synchronous `<script>` tags unless `async`/`defer`!). 2) Parse CSS into the **CSSOM** tree (render-blocking!). 3) Combine DOM + CSSOM into the **Render Tree** (excluding `display: none`). 4) **Layout/Reflow** computes exact pixel geometry boxes. 5) **Paint & Composite** rasterizes layers onto the GPU screen at 60–120 FPS.', keyPoints: ['DOM + CSSOM -> Render Tree -> Layout -> Paint -> Composite', 'Use `defer` on scripts to avoid blocking HTML parsing'] },
    ],
    quiz: [
      { id: 'url-1', question: 'In what chronological order do protocols execute for a cold uncached `https://` page visit?', options: ['DNS Lookup -> TCP Handshake -> TLS Handshake -> HTTP GET', 'HTTP GET -> DNS Lookup -> TLS -> TCP', 'TLS -> HTTP -> ARP -> DNS', 'DOM Render -> TCP -> DNS'], correctAnswer: 0, explanation: 'You must resolve IP (DNS), open connection (TCP), secure channel (TLS), then send HTTP.' },
      { id: 'url-2', question: 'Before querying external ISP DNS servers, where does the browser check first for a cached IP?', options: ['Browser internal DNS cache and OS hosts/DNS cache', 'Directly at Root DNS server', 'Inside CSS stylesheets', 'At the target web server'], correctAnswer: 0, explanation: 'Local browser and OS caches answer repeat lookups in <1ms.' },
      { id: 'url-3', question: 'Which HTML script attribute lets HTML parsing continue uninterrupted while downloading JS, executing after DOM parses?', options: ['defer', 'sync-block', 'inline-halt', 'no-cache'], correctAnswer: 0, explanation: '`defer` downloads scripts asynchronously without pausing DOM construction.' },
      { id: 'url-4', question: 'What network lookup resolves your local Wi-Fi router\'s MAC address before sending the first SYN packet out?', options: ['ARP (Address Resolution Protocol)', 'SMTP', 'BGP', 'SNMP'], correctAnswer: 0, explanation: 'ARP finds the Default Gateway\'s local Layer 2 MAC.' },
      { id: 'url-5', question: 'Which DevTools Waterfall metric measures the exact moment the browser receives byte #1 of the server\'s HTTP reply?', options: ['TTFB (Time to First Byte)', 'DNS Time', 'FPS', 'MTU'], correctAnswer: 0, explanation: 'TTFB captures round-trip + backend processing time until response byte 1 arrives.' },
    ],
  },

  'http-evolution-http1-2-3': {
    id: 'http-evolution-http1-2-3',
    title: 'HTTP Evolution: HTTP/1.1 vs HTTP/2 (Multiplexing) vs HTTP/3 (QUIC)',
    module: 'networking',
    category: '10. HTTP & Modern Web Communication',
    readTime: '11 min',
    difficulty: 'Intermediate',
    summary: 'Trace how HTTP evolved from text-based sequential HTTP/1.1 (limited to 6 TCP sockets) to binary multiplexed HTTP/2 (1 TCP socket, parallel streams) and finally QUIC-powered UDP HTTP/3 (eliminating TCP Head-of-Line blocking).',
    introduction: {
      definition: 'Each major version of HTTP eliminated bottlenecks of the previous era: HTTP/1.1 added persistent Keep-Alive connections yet suffered HTTP Head-of-Line blocking; HTTP/2 introduced binary framing, HPACK header compression, and multiplexing over 1 TCP connection; HTTP/3 replaced TCP entirely with QUIC over UDP.',
      analogousStory: 'HTTP/1.1 is a single-lane grocery checkout where 1 slow shopper holding 100 items blocks everyone behind them unless the store opens 6 checkout lanes. HTTP/2 is 1 super-wide automated conveyor belt interleaving everyone\'s scanned items simultaneously. HTTP/3 fixes the hidden flaw when a dropped item freezes that single TCP conveyor belt by giving every shopper an independent mini-belt over UDP!',
      keyTakeaway: 'HTTP/2 fixed **HTTP-layer** HoL blocking via multiplexing, yet still suffered **TCP-layer** HoL blocking; HTTP/3 (QUIC) fixed BOTH!',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminated opening 6 parallel TCP+TLS connections per domain + ugly "domain sharding" & CSS sprites hacks of HTTP/1.1.',
        'Compressed bloated repetitive cookie/user-agent headers (HPACK/QPACK).',
        'Solved Wi-Fi-to-5G cellular IP handoffs gracefully using QUIC Connection IDs instead of broken TCP IP tuples!',
      ],
      realWorldImpact: 'Cloudflare, Google, Meta, and YouTube serve over 30–75% of mobile traffic over HTTP/3 QUIC today.',
      metricsAffected: ['Connection Setup RTTs (0-1 RTT)', 'Header Compression Savings (~85%)', 'Lossy Network HoL Recovery'],
    },
    coreArchitecture: {
      description: 'Compare single sequential text streams (HTTP/1.1) vs binary multiplexed frames over 1 TCP socket (HTTP/2) vs independent QUIC streams over UDP (HTTP/3).',
      components: [
        { name: 'HTTP/1.1 (Keep-Alive)', role: 'Text Protocol', details: '1 request-response at a time per TCP connection; browsers open 6 concurrent TCP sockets.' },
        { name: 'HTTP/2 (Binary Multiplexing)', role: '1 TCP, N Streams', details: 'Interleaves binary frames concurrently over 1 TCP connection + HPACK header compression.' },
        { name: 'HTTP/3 (QUIC over UDP)', role: 'Independent Streams + TLS 1.3', details: 'Combines transport + TLS 1.3 in 0/1-RTT over UDP; losing 1 stream never freezes other streams!' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'HTTP/1.1 Sequential Stall', technicalDetail: 'Request B waits behind Request A on the same socket unless browser opens 6 separate sockets.' },
        { stepNumber: 2, action: 'HTTP/2 Stream Multiplexing', technicalDetail: 'Frames for HTML, CSS, and JS interleave concurrently on Stream IDs 1, 3, 5 over ONE TCP socket.' },
        { stepNumber: 3, action: 'HTTP/3 QUIC Connection Migration', technicalDetail: 'Uses a 64-bit Connection ID so walking from Wi-Fi out onto 5G continues downloading seamlessly without dropping sockets!' },
      ],
    },
    visualizationId: 'http-evo-3d',
    visualizationScene: 'http-https',
    visualizationModes: [
      { id: 'http2-multiplex', label: 'HTTP/2 & HTTP/3 Parallel Multiplexing' },
      { id: 'https-tls', label: 'HTTP/1.1 Single Sequential' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: Multiplexed Binary Streams on Single Connection', description: 'Toggle modes above! HTTP/2 & HTTP/3 interleave HTML, CSS, and JS streams concurrently instead of queuing sequentially.', activeNodes: ['browser', 'web-server'], packet: { from: 'browser', to: 'web-server', label: 'Streams 1, 3, 5 Parallel', type: 'request' } },
      { step: 2, title: 'Step 2: QUIC (HTTP/3) Eliminates TCP HoL Blocking', description: 'Over UDP, a dropped packet in Stream 1 does NOT stall Stream 3 JS execution!', activeNodes: ['tls-layer', 'web-server'], packet: { from: 'web-server', to: 'browser', label: 'Independent QUIC Delivery', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'browser', name: 'Modern Browser Client', role: 'Multiplexer', description: 'Negotiates ALPN (`h2` or `h3` via Alt-Svc header).' },
      { id: 'tls-layer', name: 'HTTP/2 / QUIC Engine', role: 'Stream Framing & Crypto', description: 'Compresses headers (HPACK/QPACK) and interleaves frames.' },
      { id: 'web-server', name: 'Edge CDN / Web Server', role: 'HTTP/3 Responder', description: 'Serves multiplexed assets and supports QUIC 0-RTT.' },
    ],
    realWorldExample: {
      company: 'Google & Meta Mobile Apps',
      scenario: 'Keeping Instagram/YouTube loading smoothly when users commute on trains losing 2% packets or toggling Wi-Fi <-> 5G.',
      implementation: 'With HTTP/2 over TCP, 2% packet loss freezes ALL multiplexed assets simultaneously; switching to QUIC/HTTP/3 isolates packet loss strictly per individual image/video stream and preserves connections across Wi-Fi-to-5G handoffs via Connection IDs.',
      scaleDetails: 'Reduced YouTube video rebuffering noticeably on poor cellular connections.',
    },
    advantages: [
      'HTTP/2: Eliminates 6-connection overhead, compresses headers, unlocks priority stream multiplexing.',
      'HTTP/3: Eliminates TCP HoL blocking, combines handshake into 1-RTT/0-RTT, supports seamless Wi-Fi <-> 5G migration.',
    ],
    disadvantages: [
      'HTTP/3 UDP port 443 traffic is occasionally blocked or throttled by strict legacy corporate firewalls (browsers seamlessly fall back to HTTP/2 over TCP!).',
    ],
    relatedTopics: [
      { id: 'tcp-vs-udp', title: 'TCP vs UDP', module: 'networking' },
      { id: 'ssl-tls-handshake', title: 'SSL/TLS Handshake', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is HTTP/2 "Multiplexing", and why was it revolutionary compared to HTTP/1.1?', answer: 'In HTTP/1.1, one TCP connection could only cleanly handle one active request-response at a time, forcing browsers to open 6 parallel connections and wait in queues. HTTP/2 splits payloads into tagged binary frames, allowing dozens of files (HTML, CSS, JS, images) to download simultaneously over ONE single TCP connection!', keyPoints: ['Dozens of concurrent requests/responses on 1 connection', 'Eliminates HTTP-layer Head-of-Line blocking'] },
      { level: 'intermediate', question: 'If HTTP/2 multiplexed everything over 1 TCP connection, why did engineers still need HTTP/3 (QUIC)?', answer: 'Because on a lossy 2% packet-loss Wi-Fi connection, HTTP/2 actually performs WORSE than 6 HTTP/1.1 sockets! Why? Because ALL HTTP/2 streams share ONE underlying OS TCP socket—so losing 1 tiny packet stalls EVERY stream on the page inside the OS kernel (TCP Head-of-Line Blocking). HTTP/3 moves streams onto UDP via QUIC so streams are completely independent!', keyPoints: ['HTTP/2 still suffers TCP kernel HoL blocking on packet loss', 'HTTP/3 over UDP isolates packet loss per stream'] },
      { level: 'advanced', question: 'How does QUIC "Connection Migration" work when your smartphone walks out of house Wi-Fi onto 5G cellular?', answer: 'Classic TCP identifies connections strictly by a 4-tuple `(Client IP, Client Port, Server IP, Server Port)`. Walking off Wi-Fi changes your Client IP—immediately breaking all TCP/HTTP2 sockets and forcing new slow handshakes! QUIC identifies connections using an independent cryptographic 64-bit `Connection ID`, letting ongoing downloads continue smoothly without re-handshaking even after your IP changes!', keyPoints: ['TCP bound to 4-tuple IP:Port (breaks on Wi-Fi -> 5G)', 'QUIC tracks independent 64-bit Connection ID'] },
    ],
    quiz: [
      { id: 'he-1', question: 'Which underlying Layer 4 transport protocol powers HTTP/3 (QUIC)?', options: ['UDP', 'TCP', 'ICMP', 'ARP'], correctAnswer: 0, explanation: 'HTTP/3 builds QUIC directly on top of UDP port 443.' },
      { id: 'he-2', question: 'Why was the `Alt-Svc: h3=":443"` HTTP response header invented?', options: ['So servers inform browsers they support upgrading future requests to HTTP/3 over UDP', 'To disable encryption', 'To clear browser cookies', 'To force HTTP/1.0'], correctAnswer: 0, explanation: 'Browsers learn HTTP/3 availability via Alt-Svc headers or DNS HTTPS records.' },
      { id: 'he-3', question: 'What header compression algorithm was introduced specifically for HTTP/2 (and adapted to QPACK in HTTP/3)?', options: ['HPACK', 'Gzip only', 'Base64', 'ROT13'], correctAnswer: 0, explanation: 'HPACK deduplicates repetitive HTTP headers using static/dynamic Huffman tables.' },
      { id: 'he-4', question: 'Under high packet loss (e.g. 5%), why can HTTP/2 stall worse than 6 parallel HTTP/1.1 sockets?', options: ['A single dropped TCP packet stalls ALL HTTP/2 multiplexed streams sharing that one TCP socket', 'HTTP/2 lacks CSS support', 'HTTP/1.1 uses UDP', 'TCP bans images'], correctAnswer: 0, explanation: 'Single-socket TCP Head-of-Line blocking freezes all multiplexed streams simultaneously.' },
      { id: 'he-5', question: 'What prevents QUIC connections from dropping when a smartphone switches IP addresses from Wi-Fi to 5G?', options: ['Cryptographic 64-bit QUIC Connection IDs decoupled from IP addresses', 'Static MAC tables', 'Restarting Chrome', 'Using FTP'], correctAnswer: 0, explanation: 'Connection IDs survive IP transitions seamlessly.' },
    ],
  },

  'websockets-vs-http': {
    id: 'websockets-vs-http',
    title: 'Real-Time Web Communication: WebSockets vs Long Polling vs Server-Sent Events (SSE)',
    module: 'networking',
    category: '10. HTTP & Modern Web Communication',
    readTime: '9 min',
    difficulty: 'Intermediate',
    summary: 'Compare real-time browser update patterns: wasteful HTTP Short Polling, hanging HTTP Long Polling, lightweight unidirectional Server-Sent Events (SSE), and full-duplex bidirectional WebSockets.',
    introduction: {
      definition: 'Standard HTTP is strictly Client-Initiated (server cannot speak until spoken to). Real-time dashboards, AI chat streaming, and multiplayer apps bridge this using Long Polling, Server-Sent Events (SSE), or persistent WebSockets.',
      analogousStory: 'Short Polling is a kid asking "Are we there yet?" every 5 seconds. Long Polling is asking once and holding the phone until the parent answers, then immediately calling again. SSE is tuning into a one-way live radio station (great for stock tickers and ChatGPT text streaming!). WebSockets are a live two-way walkie-talkie where both sides speak simultaneously.',
      keyTakeaway: 'Use **SSE** for 1-way server-to-client feeds (LLM AI token streaming, notifications); use **WebSockets** for 2-way bidirectional interaction (Chat, Collaborative Figma, Multiplayer Games).',
    },
    whyRequired: {
      problemsSolved: [
        'Eliminates 99% wasted HTTP request headers generated by periodic short polling.',
        'Powers instant token-by-token AI streaming (SSE) and real-time multi-cursor editing (WebSockets).',
      ],
      realWorldImpact: 'ChatGPT/Claude stream tokens via SSE (`text/event-stream`), while Slack, Discord, and Figma run bidirectional WebSockets.',
      metricsAffected: ['Server Push Latency (< 20ms)', 'Header Framing Overhead (2B vs 800B)', 'Open Concurrent File Descriptors'],
    },
    coreArchitecture: {
      description: 'Client sends `Upgrade: websocket` over HTTP/1.1 (receiving `101 Switching Protocols`) to morph into a persistent full-duplex TCP frame channel.',
      components: [
        { name: 'HTTP Upgrade Handshake', role: 'Protocol Switch (`101`)', details: 'Starts as normal HTTP/1.1 on port 443 (firewall friendly), then promotes TCP socket to WebSocket framing.' },
        { name: 'SSE (`EventSource` HTTP Stream)', role: '1-Way Auto-Reconnect', details: 'Standard HTTP response keeping stream open with automatic browser reconnect (`Last-Event-ID`).' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Client Requests Upgrade', technicalDetail: 'Browser sends `GET /ws` with `Connection: Upgrade`, `Upgrade: websocket`.' },
        { stepNumber: 2, action: 'Server Accepts (`101 Switching Protocols`)', technicalDetail: 'TCP socket remains open indefinitely; HTTP framing drops down to lightweight 2-byte WebSocket frames.' },
        { stepNumber: 3, action: 'Full-Duplex Bidirectional Streaming', technicalDetail: 'Both Client and Server push frames concurrently whenever events happen.' },
      ],
    },
    visualizationId: 'ws-http-3d',
    visualizationScene: 'http-https',
    visualizationModes: [
      { id: 'http2-multiplex', label: 'Full-Duplex Bidirectional Streams' },
      { id: 'https-tls', label: 'Initial HTTP Upgrade Handshake' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: HTTP `101 Switching Protocols` Upgrade', description: 'Client initiates normal port 443 connection and requests upgrading into persistent WebSocket (`ws://` / `wss://`).', activeNodes: ['browser', 'tls-layer'], packet: { from: 'browser', to: 'tls-layer', label: 'Upgrade: websocket (101)', type: 'request' } },
      { step: 2, title: 'Step 2: Concurrent Two-Way Frame Streaming', description: 'Both Server (pushing live chat/AI updates) and Client (sending typing/clicks) stream simultaneously over 1 open socket!', activeNodes: ['browser', 'web-server'], packet: { from: 'web-server', to: 'browser', label: 'Full-Duplex Push Frame', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'browser', name: 'Browser Client (`WebSocket` / `EventSource`)', role: 'Real-Time UI', description: 'Maintains persistent socket with ping/pong heartbeats.' },
      { id: 'tls-layer', name: 'Reverse Proxy (`proxy_set_header Upgrade`)', role: 'WS Tunnel Proxy', description: 'Must configure long read-timeouts so idle WebSockets aren\'t prematurely killed!' },
      { id: 'web-server', name: 'Stateful Socket / SSE Server', role: 'Event Broadcaster', description: 'Pushes instant updates backed by Redis Pub/Sub.' },
    ],
    realWorldExample: {
      company: 'OpenAI ChatGPT (SSE) vs Figma / Slack (WebSockets)',
      scenario: 'Picking the right real-time protocol for AI streaming vs multiplayer canvas sync.',
      implementation: 'AI LLM interfaces use Server-Sent Events (SSE) because the user sends 1 prompt and only the server streams words back—giving built-in browser auto-reconnect and simple HTTP load balancing without stateful WebSocket upgrade pain! Figma uses WebSockets because dozens of collaborators stream cursor positions both ways simultaneously.',
      scaleDetails: 'SSE handles millions of streaming responses over standard HTTP/2.',
    },
    advantages: [
      'WebSockets: Full duplex, tiny 2-byte framing overhead, binary + text support.',
      'SSE: Built-in automatic reconnection + works cleanly over HTTP/2 multiplexing with zero custom proxy upgrade rules.',
    ],
    disadvantages: [
      'Stateful WebSockets complicate horizontal load balancing (need Redis Pub/Sub to bridge messages across multiple server instances and raised Nginx `proxy_read_timeout`).',
    ],
    relatedTopics: [
      { id: 'case-study-whatsapp', title: 'Case Study: Design WhatsApp Chat', module: 'system-design' },
      { id: 'http-evolution-http1-2-3', title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'When should you choose Server-Sent Events (SSE) instead of WebSockets?', answer: 'Whenever real-time updates flow ONLY from Server -> Client (live sports scores, stock tickers, notification bells, AI LLM token streaming). SSE uses plain HTTP, automatically reconnects with `Last-Event-ID`, and multiplexes over HTTP/2 seamlessly without WebSocket state complexity.', keyPoints: ['1-way Server -> Client = Pick SSE', '2-way interactive chat/games = Pick WebSockets'] },
      { level: 'intermediate', question: 'What HTTP status code confirms a WebSocket handshake upgrade succeeded?', answer: 'HTTP `101 Switching Protocols`!', keyPoints: ['HTTP 101 Switching Protocols'] },
      { level: 'advanced', question: 'If you scale a WebSocket chat backend from 1 Node.js server to 10 servers behind Nginx, why do messages stop reaching users on other servers—and how do you fix it?', answer: 'Because Server 1 holds Alice\'s socket in its RAM, while Server 7 holds Bob\'s socket! Calling `io.emit()` on Server 1 cannot magically jump to Server 7\'s RAM. Solution: Attach a **Redis Pub/Sub** (or Kafka) backplane: Server 1 publishes Bob\'s message to Redis Pub/Sub, Server 7 receives it and pushes it down Bob\'s local WebSocket!', keyPoints: ['Sockets reside in individual server RAM', 'Fix using Redis Pub/Sub cross-server adapter'] },
    ],
    quiz: [
      { id: 'ws-1', question: 'What HTTP status code does a server send back when accepting a WebSocket connection upgrade?', options: ['101 Switching Protocols', '200 OK', '302 Found', '429 Too Many Requests'], correctAnswer: 0, explanation: '101 signals transitioning the TCP connection from HTTP to WebSocket framing.' },
      { id: 'ws-2', question: 'Which real-time technology is UNIDIRECTIONAL (Server -> Client only) yet offers automatic browser reconnection natively?', options: ['Server-Sent Events (SSE)', 'WebSockets', 'Short Polling', 'FTP'], correctAnswer: 0, explanation: 'Browser `EventSource` reconnects automatically using `Last-Event-ID`.' },
      { id: 'ws-3', question: 'Why does Nginx often drop idle WebSockets after 60 seconds unless reconfigured?', options: ['Default `proxy_read_timeout` closes quiet proxy connections unless heartbeat ping/pong frames or higher timeouts are set', 'Nginx rejects port 443', 'TCP drops after 60 bytes', 'TLS expires every minute'], correctAnswer: 0, explanation: 'Reverse proxies enforce idle socket timeouts unless heartbeats (`ping/pong`) or extended timeouts are set.' },
      { id: 'ws-4', question: 'What architecture synchronizes WebSocket rooms across 20 separate horizontally scaled backend servers?', options: ['Redis Pub/Sub Adapter connecting all 20 servers', 'Round Robin DNS alone', 'Saving messages in CSS', 'Disabling TLS'], correctAnswer: 0, explanation: 'Redis Pub/Sub broadcasts cross-instance events to whichever node holds the recipient socket.' },
      { id: 'ws-5', question: 'Which technology is most wasteful of server CPU and bandwidth when users are idle?', options: ['HTTP Short Polling every 1 second', 'WebSockets', 'Server-Sent Events', 'HTTP/2 Push'], correctAnswer: 0, explanation: 'Short polling fires endless redundant HTTP handshakes and headers even when zero new data exists.' },
    ],
  },

  'network-troubleshooting-tools': {
    id: 'network-troubleshooting-tools',
    title: 'Network Diagnostics CLI Toolkit (Ping, Traceroute, Dig, NSLookup, Netstat, Curl & Ipconfig)',
    module: 'networking',
    category: '11. Network Troubleshooting & Diagnostics',
    readTime: '10 min',
    difficulty: 'Beginner',
    summary: 'Diagnose any network outage methodically from Layer 1 up to Layer 7 using CLI tools: `ipconfig`/`ip addr`, `ping`, `traceroute`/`mtr`, `dig`/`nslookup`, `netstat`/`ss`, and `curl -v`.',
    introduction: {
      definition: 'Professional engineers diagnose production outages systematically using lightweight command-line diagnostic tools targeting specific OSI layers—pinpointing whether failure lies in local IP config, gateway reachability, DNS resolution, intermediate ISP hops, listening firewall ports, or TLS/HTTP headers.',
      analogousStory: 'Just like a mechanic uses a voltmeter for batteries, a code scanner for engine computers, and a pressure gauge for tires instead of blindly swapping engines, a network engineer steps through `ip addr` -> `ping` -> `traceroute` -> `dig` -> `ss` -> `curl -v` to isolate the broken layer in 60 seconds!',
      keyTakeaway: 'Troubleshoot bottom-up (Physical/IP -> Gateway Ping -> DNS `dig` -> Port `ss`/`nc` -> `curl -v` HTTP/TLS) to find root causes rapidly.',
    },
    whyRequired: {
      problemsSolved: [
        'Immediately isolates "Is DNS broken, is the port firewalled, or is the web server returning 502?"',
        'Locates exact intermediate ISP router hops dropping packets via `traceroute` / `mtr`.',
      ],
      realWorldImpact: 'Every DevOps, SRE, and Cloud Engineer uses these exact CLI commands daily during production incident response.',
      metricsAffected: ['Mean Time To Diagnose (MTTD)', 'Per-Hop Loss Detection', 'DNS TTL Debugging'],
    },
    coreArchitecture: {
      description: 'Map diagnostic tools directly to OSI Layers: L3 (`ip`, `ping`, `traceroute`), L4 (`netstat`/`ss`, `telnet`/`nc`), L7 (`dig`, `nslookup`, `curl -v`).',
      components: [
        { name: '`ping` & `traceroute` (ICMP/TTL)', role: 'L3 Connectivity & Path', details: '`ping` tests RTT & loss via ICMP Echo; `traceroute` increments TTL `1, 2, 3...` to map every intermediate router hop.' },
        { name: '`dig` & `nslookup` (DNS)', role: 'Name Resolution Audit', details: 'Queries authoritative/recursive DNS directly showing exact A/AAAA/MX/TXT records and TTL remaining.' },
        { name: '`ss` / `netstat` & `curl -v`', role: 'Socket & HTTP/TLS Trace', details: '`ss -tulpn` lists listening ports/PIDs; `curl -v` prints full TCP, TLS handshake, SNI, and HTTP headers!' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Verify Local Interface (`ipconfig / ip addr`)', technicalDetail: 'Check local IP, subnet mask, and Default Gateway assignment.' },
        { stepNumber: 2, action: 'Probe Reachability (`ping` & `traceroute`)', technicalDetail: 'Confirm ICMP echo RTT; use `traceroute` TTL=1,2,3 probes to expose where packets stall.' },
        { stepNumber: 3, action: 'Inspect DNS & HTTP (`dig` & `curl -v`)', technicalDetail: 'Run `dig @1.1.1.1 site.com` and `curl -Iv https://site.com` to examine TLS cert and HTTP status.' },
      ],
    },
    visualizationId: 'cli-tools-3d',
    visualizationScene: 'routing-switching',
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: `ip addr` & `ping` Check Local Hop + ICMP', description: 'Verify local IP configuration and test gateway reachability using ICMP Echo.', activeNodes: ['pc-a', 'switch-a', 'router-a'], packet: { from: 'pc-a', to: 'router-a', label: 'ICMP Echo / Gateway Check', type: 'request' } },
      { step: 2, title: 'Step 2: `traceroute` Increments TTL Hop-by-Hop', description: 'Traceroute sends probes with `TTL=1, 2, 3...` catching ICMP Time Exceeded replies from each router!', activeNodes: ['router-a', 'router-b'], packet: { from: 'router-a', to: 'router-b', label: 'TTL=1, 2, 3 Hop Trace', type: 'sync' } },
      { step: 3, title: 'Step 3: `ss` / `curl -v` Verifies Target Port & TLS', description: 'Confirm port 443 listening state and full TLS + HTTP 200 handshake at destination server.', activeNodes: ['pc-b'], packet: { from: 'pc-b', to: 'pc-a', label: 'curl -v -> 200 OK (TLS Verified)', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'pc-a', name: 'Diagnostic Workstation', role: 'CLI Runner', description: 'Executes `ping`, `traceroute`, `dig`, `ss`, and `curl -v`.' },
      { id: 'switch-a', name: 'Local LAN Switch', role: 'L2 Link Check', description: 'Verify physical link LEDs and local ARP resolution.' },
      { id: 'router-a', name: 'Hop 1: Default Gateway (`TTL=1`)', role: 'First Traceroute Hop', description: 'Returns ICMP Time Exceeded when TTL hits 0.' },
      { id: 'router-b', name: 'Hop 2+: WAN ISP Router (`TTL=2`)', role: 'Transit Hop', description: 'Identifies exact ISP bottleneck or packet loss hop in `mtr`.' },
      { id: 'switch-b', name: 'Destination Switch', role: 'Target LAN', description: 'Carries probe to target host.' },
      { id: 'pc-b', name: 'Target Server (`ss -tulpn`)', role: 'Listening Endpoint', description: 'Inspect open listening sockets and TLS/HTTP responses.' },
    ],
    realWorldExample: {
      company: 'SRE Production Incident Triage',
      scenario: 'Users report `api.company.com` fails to load while `ping 8.8.8.8` succeeds.',
      implementation: '1) `ping 8.8.8.8` passes -> physical internet works. 2) `dig api.company.com` returns valid IP -> DNS works. 3) `nc -zv api.company.com 443` times out -> Firewall blocked port 443 or Load Balancer stopped listening (`ss -tlnp`)! Root cause found in 20 seconds.',
      scaleDetails: 'Standardizes triage across cloud SRE teams globally.',
    },
    advantages: [
      'Pre-installed lightweight commands diagnose complex issues across any Linux, macOS, or Windows box in seconds.',
    ],
    disadvantages: [
      'Many cloud firewalls block ICMP (`ping` times out!) even while HTTPS port 443 is 100% healthy—never assume a failed `ping` means a server is down without testing TCP port 443 (`curl` / `nc`)!',
    ],
    relatedTopics: [
      { id: 'packet-analysis-wireshark', title: 'Wireshark Packet Analysis', module: 'networking' },
      { id: 'what-happens-when-url-entered', title: 'What Happens When URL Entered', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'How does `traceroute` discover every intermediate router between your laptop and Google?', answer: 'It uses the IP **TTL (Time-To-Live)** field cleverly! It sends probe 1 with `TTL=1` -> Router #1 decrements TTL to 0, drops it, and replies `ICMP Time Exceeded` (revealing Router #1\'s IP!). Then probe 2 uses `TTL=2` -> Router #2 replies, and so on until reaching destination!', keyPoints: ['Increments IP TTL 1, 2, 3...', 'Routers drop at TTL=0 and send ICMP Time Exceeded'] },
      { level: 'intermediate', question: 'Why might `ping example.com` show 100% Request Timeout even while `curl https://example.com` loads cleanly?', answer: 'Because `ping` uses **ICMP**, whereas `curl` uses **TCP Port 443**. Many security-hardened cloud firewalls and AWS Security Groups drop inbound ICMP pings while allowing HTTPS port 443 open! Always test application ports with `curl` or `nc -zv`.', keyPoints: ['Ping = ICMP; Web = TCP 443', 'Firewalls frequently drop ICMP while allowing TCP 443'] },
      { level: 'advanced', question: 'What command shows which exact Linux process PID is currently occupying Port 8080 (`Address already in use`), and what tool combines `ping` + `traceroute` continuously?', answer: '`ss -tulpn | grep 8080` (modern fast replacement for `netstat -tulpn`) shows exact TCP/UDP sockets, state, and PID/program name. And **`mtr`** (My Traceroute) combines `ping` and `traceroute` continuously to reveal transient packet loss percentages at each intermediate router hop!', keyPoints: ['`ss -tulpn` replaces legacy `netstat`', '`mtr` shows per-hop continuous packet loss'] },
    ],
    quiz: [
      { id: 'cli-1', question: 'How does `traceroute` uncover the IP address of Hop #3 along a network path?', options: ['Sends a packet with `TTL = 3` so Router #3 decrements it to 0 and replies `ICMP Time Exceeded`', 'Asks DNS Root server for router list', 'Hacks into all ISPs', 'Uses HTTP GET'], correctAnswer: 0, explanation: 'Expiring TTL triggers ICMP Time Exceeded notifications from each hop.' },
      { id: 'cli-2', question: 'Which modern Linux command displays open listening TCP/UDP sockets and owning process PIDs (`-tulpn`)?', options: ['ss (Socket Statistics)', 'ping', 'dig', 'chmod'], correctAnswer: 0, explanation: '`ss` inspects kernel sockets rapidly via Netlink.' },
      { id: 'cli-3', question: 'Which command queries a specific DNS server directly (`@8.8.8.8`) and prints full TTLs and record sections?', options: ['dig', 'ipconfig', 'arp', 'ifconfig'], correctAnswer: 0, explanation: '`dig @8.8.8.8 domain.com MX` gives comprehensive DNS diagnostics.' },
      { id: 'cli-4', question: 'Which `curl` flag reveals verbose step-by-step TCP connect, TLS handshake certificates, and HTTP request/response headers?', options: ['-v (Verbose)', '-s (Silent)', '-o (Output)', '-X'], correctAnswer: 0, explanation: '`curl -v` prints detailed protocol handshake traces.' },
      { id: 'cli-5', question: 'Why is `telnet` deprecated for remote server administration today despite still being used occasionally for quick port testing?', options: ['Telnet transmits passwords and data in completely unencrypted plaintext; use SSH for login and `nc -zv` for port checks', 'Telnet uses IPv6 only', 'Telnet breaks DNS', 'Telnet costs money'], correctAnswer: 0, explanation: 'SSH replaced Telnet securely; `nc -zv` checks raw TCP port openness cleanly.' },
    ],
  },

  'packet-analysis-wireshark': {
    id: 'packet-analysis-wireshark',
    title: 'Packet Capture & Analysis with Wireshark & tcpdump',
    module: 'networking',
    category: '11. Network Troubleshooting & Diagnostics',
    readTime: '11 min',
    difficulty: 'Intermediate',
    summary: 'Deep-dive into live packet inspection using Wireshark display filters and headless Linux `tcpdump` captures—diagnosing TCP retransmissions, TLS alerts, DNS failures, and network security anomalies.',
    introduction: {
      definition: 'Packet analyzers (`Wireshark` GUI and `tcpdump` CLI) capture raw Ethernet frames directly from your Network Interface Card (NIC) via `libpcap`/`Npcap`, dissecting every nested OSI layer byte-by-byte.',
      analogousStory: 'Wireshark is an X-ray / MRI scanner for network cables: instead of guessing why an API returned an obscure timeout, you X-ray the exact packets crossing the wire and immediately spot whether the client forgot a header, a firewall dropped the SYN, or TCP retransmitted 5 times!',
      keyTakeaway: 'Capture remotely on Linux servers using `tcpdump -w trace.pcap`, then inspect visually inside Wireshark using exact display filters like `tcp.analysis.retransmission` or `dns`.',
    },
    whyRequired: {
      problemsSolved: [
        'Proves conclusively whether latency comes from the Network (TCP retransmissions) vs the Server App (slow TTFB after ACK).',
        'Detects cleartext credential leaks, rogue ARP spoofing, and TLS version mismatches.',
      ],
      realWorldImpact: 'Every network engineer and cybersecurity analyst relies on `.pcap` traces as the ultimate ground truth when logs disagree.',
      metricsAffected: ['TCP Retransmission Count', 'ZeroWindow Buffer Stalls', 'TLS Handshake Alert Codes'],
    },
    coreArchitecture: {
      description: 'Promiscuous NIC Driver + libpcap -> `.pcap` capture buffer -> Protocol Dissectors (L2 Ethernet -> L3 IP -> L4 TCP -> L7 DNS/TLS/HTTP).',
      components: [
        { name: 'tcpdump Headless Capture', role: 'Server Capture', details: 'Captures filtered raw packets cleanly on production Linux hosts (`tcpdump -i eth0 port 443 -w out.pcap`).' },
        { name: 'Wireshark Dissector Engine', role: 'Visual L2–L7 Inspector', details: 'Decodes nested frame headers, colors TCP anomalies (black/red retransmissions), and reconstructs TCP streams.' },
      ],
    },
    howItWorks: {
      steps: [
        { stepNumber: 1, action: 'Capture Packets Safely', technicalDetail: 'Filter capture at kernel level (`port 443 and host 10.0.1.5`) so disk isn\'t flooded.' },
        { stepNumber: 2, action: 'Apply Wireshark Display Filters', technicalDetail: 'Filter `tcp.analysis.flags` (retransmissions, dup ACKs, RSTs) or `tls.handshake`.' },
        { stepNumber: 3, action: 'Diagnose Root Cause', technicalDetail: 'Inspect Follow -> TCP Stream and Time-Delta columns to pinpoint network drops vs slow app processing.' },
      ],
    },
    visualizationId: 'wireshark-3d',
    visualizationScene: 'vpn-firewall',
    visualizationModes: [
      { id: 'vpn-encrypted', label: 'Inspect Encrypted vs Plain Frames' },
      { id: 'ddos-blocked', label: 'Spot Dropped / Retransmit Alerts' },
    ],
    visualizationType: 'networking',
    animationSteps: [
      { step: 1, title: 'Step 1: NIC & Firewall Tap Captures `.pcap` Stream', description: 'Packet analyzer taps interface traffic cleanly without interrupting live packets.', activeNodes: ['vpn-client', 'firewall'], packet: { from: 'vpn-client', to: 'firewall', label: 'Capture Frame (.pcap)', type: 'request' } },
      { step: 2, title: 'Step 2: Dissect Layers & Spot TCP Anomalies', description: 'Wireshark dissects L2 MAC -> L3 IP -> L4 TCP flags (SYN, RST, Retransmit) -> L7 TLS/DNS!', activeNodes: ['firewall', 'corp-server'], packet: { from: 'firewall', to: 'corp-server', label: 'Inspect L2–L7 Headers', type: 'response' } },
    ],
    interactiveComponents: [
      { id: 'vpn-client', name: 'Source Capture Endpoint', role: 'Traffic Generator', description: 'Emits normal vs anomalous TCP/DNS/TLS traffic.' },
      { id: 'firewall', name: 'Packet Tap (`tcpdump` / Wireshark)', role: 'L2-L7 Dissector', description: 'Filters and decodes raw binary frames into human-readable OSI trees.' },
      { id: 'corp-server', name: 'Monitored Target Server', role: 'Destination Host', description: 'Target analyzed for slow TTFB, resets, or cipher mismatches.' },
    ],
    realWorldExample: {
      company: 'Troubleshooting Nagle + Delayed ACK 40ms/200ms Hang',
      scenario: 'An internal RPC microservice inexplicably stalls 40ms–200ms on tiny sequential JSON writes.',
      implementation: 'Opening the `.pcap` inside Wireshark immediately reveals alternating client tiny writes stalling waiting on server `Delayed ACK` because `Nagle\'s Algorithm` waited to coalesce packets! Setting `TCP_NODELAY` fixes the latency instantaneously.',
      scaleDetails: 'Classic textbook bug solved in 5 minutes via Wireshark Time-Delta inspection.',
    },
    advantages: [
      'Unfiltered ground truth—logs can lie or omit errors, while raw wire captures show exact truth.',
    ],
    disadvantages: [
      'HTTPS payloads appear as unreadable TLS ciphertext unless session keys (`SSLKEYLOGFILE`) are provided locally during debugging.',
    ],
    relatedTopics: [
      { id: 'network-troubleshooting-tools', title: 'CLI Troubleshooting Tools', module: 'networking' },
      { id: 'tcp-three-way-handshake', title: 'TCP Three-Way Handshake', module: 'networking' },
    ],
    interviewQuestions: [
      { level: 'beginner', question: 'What is the difference between a Wireshark Capture Filter (`tcpdump` syntax) and a Display Filter?', answer: 'Capture Filters (BPF syntax like `port 80`) run BEFORE saving to disk so huge unrelated traffic isn\'t even recorded. Display Filters (Wireshark syntax like `http.request.method == "POST"` or `tcp.analysis.retransmission`) hide non-matching packets visually from an already captured `.pcap` file without deleting anything.', keyPoints: ['Capture Filter = BPF syntax, limits what gets recorded', 'Display Filter = Hides/filters already-captured view'] },
      { level: 'intermediate', question: 'How can you tell in Wireshark whether a 2-second API delay was caused by a slow Network vs a slow Server Database?', answer: 'Compare the timestamps! If `SYN -> SYN-ACK` took 10ms, `HTTP GET` left at `t=0.02s`, `TCP ACK` came back from server at `t=0.03s`, and the `HTTP 200 OK` response arrived at `t=2.03s`, the NETWORK was super fast (10ms RTT!) and the Server spent 2.0 full seconds stuck processing/querying its DB!', keyPoints: ['Fast SYN/ACK + long gap before HTTP 200 = Slow Server Backend', 'Multiple Retransmissions/Dup ACKs = Lossy Network'] },
      { level: 'advanced', question: 'How can developers legitimately decrypt their OWN HTTPS TLS 1.3 traffic inside Wireshark locally without breaking server private keys?', answer: 'With TLS 1.3 Ephemeral ECDHE (`PFS`), even having the server\'s `.key` certificate file CANNOT decrypt Wireshark captures! Instead, export the environment variable `SSLKEYLOGFILE=~/sslkeys.log` before launching Chrome/curl—which logs ephemeral per-session secrets locally so you can load that file in Wireshark\'s TLS preferences to inspect decrypted HTTP/2/3 streams cleanly!', keyPoints: ['Private key alone fails on PFS TLS 1.3', 'Use `SSLKEYLOGFILE` locally in dev to inspect decrypted streams'] },
    ],
    quiz: [
      { id: 'wsr-1', question: 'Which Wireshark Display Filter isolates packets indicating network packet loss and TCP retries?', options: ['tcp.analysis.retransmission', 'dns.qry.name', 'eth.src == ff:ff', 'http.cookie'], correctAnswer: 0, explanation: 'Wireshark flags duplicate sequence segments with `tcp.analysis.retransmission`.' },
      { id: 'wsr-2', question: 'Which CLI command captures traffic on Linux `eth0` for port 443 and writes a `.pcap` file for Wireshark?', options: ['tcpdump -i eth0 port 443 -w trace.pcap', 'ping -w 443 trace.pcap', 'dig eth0 443', 'mkdir trace.pcap'], correctAnswer: 0, explanation: '`-i` selects interface, `-w` writes raw packets to file.' },
      { id: 'wsr-3', question: 'Why does providing a server\'s RSA Private Key to Wireshark FAIL to decrypt modern TLS 1.3 traffic?', options: ['TLS 1.3 uses Ephemeral Diffie-Hellman (Perfect Forward Secrecy) session keys independent of the server private key', 'Wireshark hates HTTPS', 'TLS 1.3 sends plaintext', 'Private keys are stored in DNS'], correctAnswer: 0, explanation: 'PFS requires exporting ephemeral session secrets (`SSLKEYLOGFILE`) for local debugging.' },
      { id: 'wsr-4', question: 'What does seeing `[TCP ZeroWindow]` packets inside a Wireshark capture mean?', options: ['The receiving host\'s application buffer is 100% full and paused the sender via Flow Control', 'Zero packets exist', 'Wi-Fi turned off', 'DNS TTL hit 0'], correctAnswer: 0, explanation: 'ZeroWindow signals the receiver has 0 free buffer bytes left.' },
      { id: 'wsr-5', question: 'What does `Follow -> TCP Stream` allow an analyst to do in Wireshark?', options: ['Reassemble all sequential packets of a single connection into one clean chronological conversation', 'Delete the network adapter', 'Block IP addresses', 'Restart the router'], correctAnswer: 0, explanation: 'Reconstructs complete application request/response text across fragmented packets.' },
    ],
  },
};
