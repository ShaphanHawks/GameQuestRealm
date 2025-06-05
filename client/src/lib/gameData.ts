export const targets = [
  {
    name: "Local Credit Union",
    description: "Small-scale financial institution with basic security",
    payout: 15000,
    difficulty: "Low",
    securityLevel: 2,
    requiredSpecs: 4,
    vulnerabilities: ["Outdated software", "Weak passwords"]
  },
  {
    name: "Regional Bank",
    description: "Mid-tier bank with moderate security measures",
    payout: 45000,
    difficulty: "Medium",
    securityLevel: 5,
    requiredSpecs: 8,
    vulnerabilities: ["SQL injection", "Social engineering"]
  },
  {
    name: "Corporate Server",
    description: "Fortune 500 company's financial database",
    payout: 85000,
    difficulty: "High",
    securityLevel: 7,
    requiredSpecs: 12,
    vulnerabilities: ["Zero-day exploit"]
  },
  {
    name: "International Bank",
    description: "Major global financial institution",
    payout: 150000,
    difficulty: "High",
    securityLevel: 8,
    requiredSpecs: 15,
    vulnerabilities: ["Advanced persistent threat"]
  },
  {
    name: "Central Reserve",
    description: "Federal reserve banking system",
    payout: 300000,
    difficulty: "Extreme",
    securityLevel: 10,
    requiredSpecs: 18,
    vulnerabilities: ["Quantum encryption bypass"]
  },
  {
    name: "Crypto Exchange",
    description: "Major cryptocurrency trading platform",
    payout: 500000,
    difficulty: "Extreme",
    securityLevel: 9,
    requiredSpecs: 16,
    vulnerabilities: ["Smart contract exploit"]
  }
];

export const hackingMethods = [
  {
    id: 'phishing',
    name: 'Phishing Attack',
    description: 'Send fake emails to steal credentials',
    baseSuccessRate: 70,
    traceIncrease: 8,
    requiredData: ['Email addresses', 'Fake login page']
  },
  {
    id: 'brute_force',
    name: 'Brute Force Attack',
    description: 'Systematically try password combinations',
    baseSuccessRate: 45,
    traceIncrease: 15,
    requiredData: ['Username list', 'Password dictionary']
  },
  {
    id: 'sql_injection',
    name: 'SQL Injection',
    description: 'Exploit database vulnerabilities',
    baseSuccessRate: 60,
    traceIncrease: 12,
    requiredData: ['Database schema', 'Injection payloads']
  },
  {
    id: 'social_engineering',
    name: 'Social Engineering',
    description: 'Manipulate employees to reveal information',
    baseSuccessRate: 75,
    traceIncrease: 6,
    requiredData: ['Employee directory', 'Company information']
  },
  {
    id: 'zero_day',
    name: 'Zero-Day Exploit',
    description: 'Use unknown security vulnerabilities',
    baseSuccessRate: 85,
    traceIncrease: 20,
    requiredData: ['Exploit code', 'Target system analysis']
  },
  {
    id: 'ransomware',
    name: 'Ransomware Deployment',
    description: 'Encrypt systems and demand payment',
    baseSuccessRate: 65,
    traceIncrease: 25,
    requiredData: ['Malware payload', 'Encryption keys']
  }
];

export const marketItems = {
  hardware: [
    {
      type: 'cpu',
      name: 'CPU Upgrade',
      description: 'Faster processing for improved hack speeds',
      price: 25000,
      benefits: '+10% success rate, -5% trace increase',
      upgrades: [
        'Basic Processor (2.5 GHz)',
        'Dual-Core Processor (3.2 GHz)',
        'Quad-Core Processor (3.8 GHz)',
        'Octa-Core Processor (4.2 GHz)',
        'Custom Quantum Processor (5.0 GHz)'
      ]
    },
    {
      type: 'ram',
      name: 'RAM Upgrade',
      description: 'More memory for complex operations',
      price: 15000,
      benefits: 'Unlock advanced targets, faster data processing',
      upgrades: [
        '4 GB DDR3',
        '8 GB DDR4',
        '16 GB DDR4',
        '32 GB DDR5',
        '64 GB DDR5 ECC'
      ]
    },
    {
      type: 'network',
      name: 'Network Upgrade',
      description: 'Faster connection speeds and better anonymity',
      price: 20000,
      benefits: 'Reduced trace detection, faster transfers',
      upgrades: [
        '100 Mbps Ethernet',
        '1 Gbps Fiber',
        '10 Gbps Dedicated',
        'Military-Grade Satellite',
        'Quantum Entanglement Link'
      ]
    },
    {
      type: 'os',
      name: 'OS Upgrade',
      description: 'More secure and advanced operating system',
      price: 30000,
      benefits: 'Better security, advanced hacking tools',
      upgrades: [
        'Linux Kernel 3.x',
        'Hardened Linux 4.x',
        'Custom Security OS',
        'Military-Grade OS',
        'AI-Assisted Hacking OS'
      ]
    }
  ],
  software: [
    {
      id: 'sql_injection',
      name: 'SQL Injection Kit',
      description: 'Advanced database exploitation tools',
      price: 35000,
      baseSuccessRate: 60,
      traceIncrease: 12
    },
    {
      id: 'social_engineering',
      name: 'Social Engineering Suite',
      description: 'Psychology-based manipulation tools',
      price: 40000,
      baseSuccessRate: 75,
      traceIncrease: 6
    },
    {
      id: 'zero_day',
      name: 'Zero-Day Exploit Package',
      description: 'Collection of unknown vulnerabilities',
      price: 75000,
      baseSuccessRate: 85,
      traceIncrease: 20
    },
    {
      id: 'ransomware',
      name: 'Ransomware Toolkit',
      description: 'Advanced encryption and deployment system',
      price: 50000,
      baseSuccessRate: 65,
      traceIncrease: 25
    }
  ]
};
