export function generateFakeData() {
  const bankNames = [
    "Global Trust Bank", "Secure Financial", "Metro Credit Union", 
    "First National Bank", "Digital Bank Plus", "Premier Banking"
  ];
  
  const firstNames = [
    "John", "Jane", "Michael", "Sarah", "David", "Emily", 
    "Robert", "Lisa", "James", "Anna"
  ];
  
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia",
    "Miller", "Davis", "Rodriguez", "Martinez"
  ];

  // Generate fake account number
  const accountNumber = Array.from({length: 10}, () => 
    Math.floor(Math.random() * 10)
  ).join('');

  // Generate fake routing number
  const routingNumber = Array.from({length: 9}, () => 
    Math.floor(Math.random() * 10)
  ).join('');

  // Generate fake credit card number (starts with 4 for Visa-like)
  const creditCardNumber = '4' + Array.from({length: 15}, () => 
    Math.floor(Math.random() * 10)
  ).join('');

  // Generate fake CVV
  const cvv = Array.from({length: 3}, () => 
    Math.floor(Math.random() * 10)
  ).join('');

  // Generate fake expiry date (future date)
  const currentYear = new Date().getFullYear();
  const expiryMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const expiryYear = String(currentYear + Math.floor(Math.random() * 5) + 1).slice(-2);

  // Generate fake PIN
  const pin = Array.from({length: 4}, () => 
    Math.floor(Math.random() * 10)
  ).join('');

  // Generate fake name
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  // Generate fake bank
  const bankName = bankNames[Math.floor(Math.random() * bankNames.length)];

  return {
    accountNumber,
    routingNumber,
    creditCardNumber,
    cvv,
    expiryMonth,
    expiryYear,
    pin,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    bankName,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
  };
}

export function generateFakeCredentials() {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
  const passwords = [
    'password123', 'admin', 'qwerty', '123456', 'letmein',
    'welcome', 'monkey', 'dragon', 'master', 'shadow'
  ];

  const username = `user${Math.floor(Math.random() * 9999)}`;
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${username}@${domain}`;
  const password = passwords[Math.floor(Math.random() * passwords.length)];

  return {
    username,
    email,
    password
  };
}

export function generateNetworkData() {
  const ipAddress = Array.from({length: 4}, () => 
    Math.floor(Math.random() * 255)
  ).join('.');

  const macAddress = Array.from({length: 6}, () => 
    Math.floor(Math.random() * 255).toString(16).padStart(2, '0')
  ).join(':').toUpperCase();

  const ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995];
  const openPorts = ports.filter(() => Math.random() > 0.7);

  return {
    ipAddress,
    macAddress,
    openPorts,
    hostname: `server-${Math.floor(Math.random() * 999)}.local`
  };
}
