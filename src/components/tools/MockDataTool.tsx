'use client';

import { useState } from 'react';

interface MockData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  company: string;
  jobTitle: string;
  website: string;
  creditCard: string;
  uuid: string;
  ipv4: string;
  macAddress: string;
  hexColor: string;
  date: string;
  number: number;
  text: string;
  // Additional fields
  username: string;
  password: string;
  avatar: string;
  bio: string;
  department: string;
  salary: string;
  startDate: string;
  endDate: string;
  rating: number;
  status: string;
  priority: string;
  category: string;
  tags: string[];
  latitude: number;
  longitude: number;
  currency: string;
  price: string;
  percentage: number;
  url: string;
  domain: string;
  ipV6: string;
  userAgent: string;
  jwt: string;
  hash: string;
  timestamp: number;
  isoDate: string;
  time: string;
  timezone: string;
  age: number;
  gender: string;
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  version: string;
  license: string;
  author: string;
  language: string;
  locale: string;
  countryCode: string;
  currencyCode: string;
  phoneCountryCode: string;
  emoji: string;
}

export default function MockDataTool() {
  const [mockData, setMockData] = useState<MockData | null>(null);
  const [selectedFields, setSelectedFields] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: false,
    address: false,
    city: false,
    state: false,
    zipCode: false,
    country: false,
    company: false,
    jobTitle: false,
    website: false,
    creditCard: false,
    uuid: false,
    ipv4: false,
    macAddress: false,
    hexColor: false,
    date: false,
    number: false,
    text: false,
    // Additional fields
    username: false,
    password: false,
    avatar: false,
    bio: false,
    department: false,
    salary: false,
    startDate: false,
    endDate: false,
    rating: false,
    status: false,
    priority: false,
    category: false,
    tags: false,
    latitude: false,
    longitude: false,
    currency: false,
    price: false,
    percentage: false,
    url: false,
    domain: false,
    ipV6: false,
    userAgent: false,
    jwt: false,
    hash: false,
    timestamp: false,
    isoDate: false,
    time: false,
    timezone: false,
    age: false,
    gender: false,
    title: false,
    description: false,
    keywords: false,
    slug: false,
    version: false,
    license: false,
    author: false,
    language: false,
    locale: false,
    countryCode: false,
    currencyCode: false,
    phoneCountryCode: false,
    emoji: false
  });
  const [outputFormat, setOutputFormat] = useState<'json' | 'csv' | 'table' | 'txt' | 'sql' | 'cql' | 'firebase' | 'influxdb' | 'custom' | 'xlsx' | 'xml' | 'dbunit'>('json');
  const [numberOfRecords, setNumberOfRecords] = useState(1);

  // Data pools
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'India', 'Brazil', 'Mexico'];
  const companies = ['Tech Corp', 'Data Solutions', 'Cloud Systems', 'Digital Innovations', 'Smart Technologies', 'Global Services', 'Future Systems', 'Advanced Solutions', 'Tech Innovations', 'Digital Solutions'];
  const jobTitles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer', 'Marketing Manager', 'Sales Representative', 'Project Manager', 'Business Analyst', 'DevOps Engineer', 'Quality Assurance'];
  const domains = ['example.com', 'test.org', 'demo.net', 'sample.co', 'mock.io'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Customer Support', 'Product', 'Design', 'Legal'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Completed', 'Cancelled', 'On Hold'];
  const priorities = ['Low', 'Medium', 'High', 'Critical', 'Urgent'];
  const categories = ['Technology', 'Business', 'Health', 'Education', 'Entertainment', 'Sports', 'Travel', 'Food', 'Fashion', 'Automotive'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Portuguese', 'Russian', 'Italian', 'Korean'];
  const timezones = ['UTC', 'EST', 'PST', 'GMT', 'CET', 'JST', 'AEST', 'IST', 'CST', 'MST'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const licenses = ['MIT', 'Apache 2.0', 'GPL v3', 'BSD', 'ISC', 'LGPL', 'Mozilla', 'Creative Commons'];
  const emojis = ['😀', '😎', '🚀', '💡', '🎉', '❤️', '🌟', '🔥', '💯', '👍'];

  const generateRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];
  const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const generateRandomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);
  const generateRandomEmail = (firstName: string, lastName: string) => {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
    const username = firstName.toLowerCase() + '.' + lastName.toLowerCase() + generateRandomNumber(10, 99);
    return `${username}@${generateRandomItem(domains)}`;
  };
  const generateRandomPhone = () => {
    const areaCode = generateRandomNumber(200, 999);
    const exchange = generateRandomNumber(200, 999);
    const number = generateRandomNumber(1000, 9999);
    return `(${areaCode}) ${exchange}-${number}`;
  };
  const generateRandomAddress = () => `${generateRandomNumber(100, 9999)} ${generateRandomItem(['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm'])} ${generateRandomItem(['St', 'Ave', 'Dr', 'Ln', 'Blvd'])}`;
  const generateRandomZipCode = () => generateRandomNumber(10000, 99999).toString();
  const generateRandomWebsite = (company: string) => {
    const domain = generateRandomItem(domains);
    return `https://www.${company.toLowerCase().replace(/\s+/g, '')}.${domain}`;
  };
  const generateRandomCreditCard = () => {
    const groups = [
      generateRandomNumber(1000, 9999),
      generateRandomNumber(1000, 9999),
      generateRandomNumber(1000, 9999),
      generateRandomNumber(1000, 9999)
    ];
    return groups.join(' ');
  };
  const generateRandomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  const generateRandomIPv4 = () => {
    return `${generateRandomNumber(1, 255)}.${generateRandomNumber(0, 255)}.${generateRandomNumber(0, 255)}.${generateRandomNumber(1, 254)}`;
  };
  const generateRandomMAC = () => {
    const hexChars = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      if (i > 0) mac += ':';
      mac += hexChars[Math.floor(Math.random() * 16)] + hexChars[Math.floor(Math.random() * 16)];
    }
    return mac;
  };
  const generateRandomHexColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  const generateRandomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };
  const generateRandomText = () => {
    const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
    const wordCount = generateRandomNumber(5, 15);
    const selectedWords = [];
    for (let i = 0; i < wordCount; i++) {
      selectedWords.push(generateRandomItem(words));
    }
    return selectedWords.join(' ') + '.';
  };

  // New generation functions
  const generateRandomUsername = (firstName: string, lastName: string) => {
    const username = firstName.toLowerCase() + generateRandomNumber(1, 999) + lastName.charAt(0).toLowerCase();
    return username;
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < generateRandomNumber(8, 16); i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const generateRandomAvatar = () => `https://picsum.photos/seed/${generateRandomString(10)}/100/100.jpg`;

  const generateRandomBio = () => {
    const bios = [
      'Passionate developer with a love for creating innovative solutions.',
      'Creative thinker and problem solver with a can-do attitude.',
      'Experienced professional dedicated to excellence and continuous learning.',
      'Tech enthusiast always exploring new technologies and trends.',
      'Detail-oriented individual committed to delivering high-quality results.'
    ];
    return generateRandomItem(bios);
  };

  const generateRandomSalary = () => `$${generateRandomNumber(30000, 150000).toLocaleString()}`;

  const generateRandomRating = () => parseFloat((Math.random() * 5).toFixed(1));

  const generateRandomTags = () => {
    const allTags = ['javascript', 'react', 'nodejs', 'python', 'design', 'marketing', 'sales', 'analytics', 'cloud', 'mobile'];
    const tagCount = generateRandomNumber(1, 4);
    const selectedTags = [];
    for (let i = 0; i < tagCount; i++) {
      selectedTags.push(generateRandomItem(allTags));
    }
    return selectedTags;
  };

  const generateRandomCoordinates = () => {
    return {
      latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
      longitude: parseFloat((Math.random() * 360 - 180).toFixed(6))
    };
  };

  const generateRandomPrice = () => `$${(Math.random() * 1000).toFixed(2)}`;

  const generateRandomPercentage = () => Math.floor(Math.random() * 101);

  const generateRandomURL = () => `https://www.${generateRandomString(8)}.${generateRandomItem(['com', 'org', 'net', 'io'])}`;

  const generateRandomDomain = () => `${generateRandomString(8)}.${generateRandomItem(['com', 'org', 'net', 'io'])}`;

  const generateRandomIPv6 = () => {
    const segments = [];
    for (let i = 0; i < 8; i++) {
      segments.push(Math.random().toString(16).substring(2, 6));
    }
    return segments.join(':');
  };

  const generateRandomUserAgent = () => {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
    const os = ['Windows', 'MacOS', 'Linux', 'Android', 'iOS'];
    const version = generateRandomNumber(80, 120);
    return `Mozilla/5.0 (${generateRandomItem(os)}) ${generateRandomItem(browsers)}/${version}.0.0.0`;
  };

  const generateRandomJWT = () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: generateRandomString(10), 
      iat: Date.now(), 
      exp: Date.now() + 3600000 
    }));
    return `${header}.${payload}.signature`;
  };

  const generateRandomHash = () => {
    return generateRandomString(32).toUpperCase();
  };

  const generateRandomTimestamp = () => Date.now();

  const generateRandomISODate = () => new Date().toISOString();

  const generateRandomTime = () => {
    const hours = generateRandomNumber(0, 23).toString().padStart(2, '0');
    const minutes = generateRandomNumber(0, 59).toString().padStart(2, '0');
    const seconds = generateRandomNumber(0, 59).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const generateRandomAge = () => generateRandomNumber(18, 80);

  const generateRandomTitle = () => {
    const titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Eng.'];
    return generateRandomItem(titles);
  };

  const generateRandomDescription = () => {
    const descriptions = [
      'A comprehensive solution for modern businesses looking to optimize their operations.',
      'An innovative approach to solving complex problems with cutting-edge technology.',
      'A user-friendly platform designed to streamline workflows and increase productivity.',
      'A robust system built to handle large-scale data processing and analysis.',
      'An elegant interface that makes complex tasks simple and intuitive.'
    ];
    return generateRandomItem(descriptions);
  };

  const generateRandomKeywords = () => {
    const allKeywords = ['innovation', 'technology', 'business', 'growth', 'strategy', 'digital', 'transformation', 'optimization', 'efficiency', 'automation'];
    const keywordCount = generateRandomNumber(2, 5);
    const selectedKeywords = [];
    for (let i = 0; i < keywordCount; i++) {
      selectedKeywords.push(generateRandomItem(allKeywords));
    }
    return selectedKeywords;
  };

  const generateRandomSlug = () => generateRandomString(8).toLowerCase();

  const generateRandomVersion = () => `${generateRandomNumber(0, 5)}.${generateRandomNumber(0, 20)}.${generateRandomNumber(0, 99)}`;

  const generateRandomLicense = () => generateRandomItem(licenses);

  const generateRandomAuthor = () => `${generateRandomItem(firstNames)} ${generateRandomItem(lastNames)}`;

  const generateRandomLanguage = () => generateRandomItem(languages);

  const generateRandomLocale = () => {
    const locales = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN', 'pt-BR', 'it-IT', 'ko-KR'];
    return generateRandomItem(locales);
  };

  const generateRandomCountryCode = () => {
    const codes = ['US', 'CA', 'GB', 'DE', 'FR', 'JP', 'AU', 'IN', 'BR', 'MX'];
    return generateRandomItem(codes);
  };

  const generateRandomCurrencyCode = () => generateRandomItem(currencies);

  const generateRandomPhoneCountryCode = () => {
    const codes = ['+1', '+44', '+49', '+33', '+81', '+61', '+91', '+55', '+86', '+39'];
    return generateRandomItem(codes);
  };

  const generateRandomEmoji = () => generateRandomItem(emojis);

  const generateMockData = () => {
    const records: MockData[] = [];
    
    for (let i = 0; i < numberOfRecords; i++) {
      const firstName = generateRandomItem(firstNames);
      const lastName = generateRandomItem(lastNames);
      const company = generateRandomItem(companies);
      
      const data: MockData = {
        firstName,
        lastName,
        email: generateRandomEmail(firstName, lastName),
        phone: generateRandomPhone(),
        address: generateRandomAddress(),
        city: generateRandomItem(cities),
        state: generateRandomItem(states),
        zipCode: generateRandomZipCode(),
        country: generateRandomItem(countries),
        company,
        jobTitle: generateRandomItem(jobTitles),
        website: generateRandomWebsite(company),
        creditCard: generateRandomCreditCard(),
        uuid: generateRandomUUID(),
        ipv4: generateRandomIPv4(),
        macAddress: generateRandomMAC(),
        hexColor: generateRandomHexColor(),
        date: generateRandomDate(),
        number: generateRandomNumber(1, 1000),
        text: generateRandomText(),
        // Additional fields
        username: generateRandomUsername(firstName, lastName),
        password: generateRandomPassword(),
        avatar: generateRandomAvatar(),
        bio: generateRandomBio(),
        department: generateRandomItem(departments),
        salary: generateRandomSalary(),
        startDate: generateRandomDate(),
        endDate: generateRandomDate(),
        rating: generateRandomRating(),
        status: generateRandomItem(statuses),
        priority: generateRandomItem(priorities),
        category: generateRandomItem(categories),
        tags: generateRandomTags(),
        latitude: generateRandomCoordinates().latitude,
        longitude: generateRandomCoordinates().longitude,
        currency: generateRandomItem(currencies),
        price: generateRandomPrice(),
        percentage: generateRandomPercentage(),
        url: generateRandomURL(),
        domain: generateRandomDomain(),
        ipV6: generateRandomIPv6(),
        userAgent: generateRandomUserAgent(),
        jwt: generateRandomJWT(),
        hash: generateRandomHash(),
        timestamp: generateRandomTimestamp(),
        isoDate: generateRandomISODate(),
        time: generateRandomTime(),
        timezone: generateRandomItem(timezones),
        age: generateRandomAge(),
        gender: generateRandomItem(genders),
        title: generateRandomTitle(),
        description: generateRandomDescription(),
        keywords: generateRandomKeywords(),
        slug: generateRandomSlug(),
        version: generateRandomVersion(),
        license: generateRandomLicense(),
        author: generateRandomAuthor(),
        language: generateRandomLanguage(),
        locale: generateRandomLocale(),
        countryCode: generateRandomCountryCode(),
        currencyCode: generateRandomCurrencyCode(),
        phoneCountryCode: generateRandomPhoneCountryCode(),
        emoji: generateRandomEmoji()
      };
      
      records.push(data);
    }
    
    return records.length === 1 ? records[0] : records;
  };

  const handleGenerate = () => {
    const data = generateMockData();
    setMockData(data as any);
  };

  const handleFieldToggle = (field: keyof typeof selectedFields) => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleCopyToClipboard = () => {
    if (!mockData) return;
    
    let text = '';
    
    if (outputFormat === 'json') {
      text = JSON.stringify(mockData, null, 2);
    } else if (outputFormat === 'csv' && !Array.isArray(mockData)) {
      const headers = Object.keys(selectedFields).filter(key => selectedFields[key as keyof typeof selectedFields]);
      const values = headers.map(header => mockData[header as keyof MockData]).join(',');
      text = headers.join(',') + '\n' + values;
    } else if (outputFormat === 'csv' && Array.isArray(mockData)) {
      const headers = Object.keys(selectedFields).filter(key => selectedFields[key as keyof typeof selectedFields]);
      text = headers.join(',') + '\n';
      mockData.forEach(record => {
        const values = headers.map(header => record[header as keyof MockData]).join(',');
        text += values + '\n';
      });
    }
    
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (!mockData) return;
    
    let content = '';
    let filename = 'mock-data';
    let mimeType = 'text/plain';
    
    if (outputFormat === 'json') {
      content = JSON.stringify(mockData, null, 2);
      filename += '.json';
      mimeType = 'application/json';
    } else if (outputFormat === 'csv') {
      const headers = Object.keys(selectedFields).filter(key => selectedFields[key as keyof typeof selectedFields]);
      if (!Array.isArray(mockData)) {
        content = headers.join(',') + '\n' + headers.map(header => mockData[header as keyof MockData]).join(',');
      } else {
        content = headers.join(',') + '\n';
        mockData.forEach(record => {
          content += headers.map(header => record[header as keyof MockData]).join(',') + '\n';
        });
      }
      filename += '.csv';
      mimeType = 'text/csv';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderOutput = () => {
    if (!mockData) return null;
    
    const records = Array.isArray(mockData) ? mockData : [mockData];
    const headers = Object.keys(selectedFields).filter(key => selectedFields[key as keyof typeof selectedFields]);
    
    if (outputFormat === 'json') {
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{JSON.stringify(mockData, null, 2)}</code>
        </pre>
      );
    } else if (outputFormat === 'table') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {headers.map(header => (
                  <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    {header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {headers.map(header => (
                    <td key={header} className="px-4 py-2 text-sm text-black border-b">
                      {String(record[header as keyof MockData] || '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (outputFormat === 'csv') {
      let csv = headers.join(',') + '\n';
      records.forEach(record => {
        csv += headers.map(header => {
          const value = String(record[header as keyof MockData] || '');
          // Escape quotes and wrap in quotes if contains comma
          if (value.includes(',') || value.includes('"')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',') + '\n';
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{csv}</code>
        </pre>
      );
    } else if (outputFormat === 'txt') {
      // Tab-delimited format
      let txt = headers.join('\t') + '\n';
      records.forEach(record => {
        txt += headers.map(header => String(record[header as keyof MockData] || '')).join('\t') + '\n';
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{txt}</code>
        </pre>
      );
    } else if (outputFormat === 'sql') {
      const tableName = 'mock_data';
      let sql = `-- SQL INSERT statements\n`;
      sql += `CREATE TABLE ${tableName} (\n`;
      sql += headers.map(header => `  ${header} TEXT`).join(',\n');
      sql += `\n);\n\n`;
      
      records.forEach(record => {
        sql += `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (\n`;
        sql += headers.map(header => {
          const value = String(record[header as keyof MockData] || '');
          return `  '${value.replace(/'/g, "''")}'`;
        }).join(',\n');
        sql += `\n);\n\n`;
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{sql}</code>
        </pre>
      );
    } else if (outputFormat === 'cql') {
      // Cassandra CQL format
      const keyspace = 'mock_data_ks';
      const table = 'mock_data';
      let cql = `-- Cassandra CQL\n`;
      cql += `CREATE KEYSPACE IF NOT EXISTS ${keyspace} WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};\n\n`;
      cql += `USE ${keyspace};\n\n`;
      cql += `CREATE TABLE ${table} (\n`;
      cql += `  id UUID PRIMARY KEY,\n`;
      cql += headers.map(header => `  ${header} TEXT`).join(',\n');
      cql += `\n);\n\n`;
      
      records.forEach((record, index) => {
        cql += `INSERT INTO ${table} (id, ${headers.join(', ')}) VALUES (\n`;
        cql += `  ${generateRandomUUID()},\n`;
        cql += headers.map(header => {
          const value = String(record[header as keyof MockData] || '');
          return `  '${value.replace(/'/g, "''")}'`;
        }).join(',\n');
        cql += `\n);\n\n`;
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{cql}</code>
        </pre>
      );
    } else if (outputFormat === 'firebase') {
      // Firebase Firestore format
      let firebase = `// Firebase Firestore data\n`;
      firebase += `const mockData = [\n`;
      
      records.forEach((record, index) => {
        firebase += `  {\n`;
        firebase += `    id: '${generateRandomUUID()}',\n`;
        headers.forEach(header => {
          const value = record[header as keyof MockData];
          if (typeof value === 'string') {
            firebase += `    ${header}: '${value.replace(/'/g, "\\'")}',\n`;
          } else if (Array.isArray(value)) {
            firebase += `    ${header}: ${JSON.stringify(value)},\n`;
          } else {
            firebase += `    ${header}: ${value},\n`;
          }
        });
        firebase += `  },\n`;
      });
      
      firebase += `];\n\n`;
      firebase += `// Usage:\n`;
      firebase += `// import { collection, addDoc } from 'firebase/firestore';\n`;
      firebase += `// mockData.forEach(async (data) => {\n`;
      firebase += `//   await addDoc(collection(db, 'mockData'), data);\n`;
      firebase += `// });`;
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{firebase}</code>
        </pre>
      );
    } else if (outputFormat === 'influxdb') {
      // InfluxDB line protocol format
      let influxdb = `# InfluxDB Line Protocol\n`;
      const measurement = 'mock_data';
      
      records.forEach((record, index) => {
        const tags: string[] = [];
        const fields: string[] = [];
        const timestamp = Date.now() * 1000000; // Convert to nanoseconds
        
        headers.forEach(header => {
          const value = record[header as keyof MockData];
          if (typeof value === 'string' && value.length < 50) {
            tags.push(`${header}="${value.replace(/ /g, '\\ ').replace(/,/g, '\\,')}"`);
          } else {
            fields.push(`${header}="${String(value).replace(/"/g, '\\"')}"`);
          }
        });
        
        influxdb += `${measurement},${tags.join(',')} ${fields.join(',')} ${timestamp}\n`;
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{influxdb}</code>
        </pre>
      );
    } else if (outputFormat === 'custom') {
      // Custom format with configurable separators
      let custom = `# Custom Format\n`;
      custom += `# You can modify this template as needed\n\n`;
      
      records.forEach((record, index) => {
        custom += `Record ${index + 1}:\n`;
        headers.forEach(header => {
          const value = record[header as keyof MockData];
          custom += `  ${header}: ${value}\n`;
        });
        custom += `\n`;
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{custom}</code>
        </pre>
      );
    } else if (outputFormat === 'xlsx') {
      // Excel format (as CSV with Excel-specific formatting)
      let xlsx = `# Excel-compatible format (CSV)\n`;
      xlsx += `# Save as .xlsx or .csv and open in Excel\n\n`;
      xlsx += headers.join(',') + '\n';
      records.forEach(record => {
        xlsx += headers.map(header => {
          let value = String(record[header as keyof MockData] || '');
          // Excel-specific formatting
          if (value.includes(',') || value.includes('"')) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',') + '\n';
      });
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{xlsx}</code>
        </pre>
      );
    } else if (outputFormat === 'xml') {
      // XML format
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<mockData>\n`;
      
      records.forEach((record, index) => {
        xml += `  <record id="${index + 1}">\n`;
        headers.forEach(header => {
          const value = String(record[header as keyof MockData] || '');
          xml += `    <${header}>${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</${header}>\n`;
        });
        xml += `  </record>\n`;
      });
      
      xml += `</mockData>`;
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{xml}</code>
        </pre>
      );
    } else if (outputFormat === 'dbunit') {
      // DBUnit XML format for testing
      let dbunit = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      dbunit += `<dataset>\n`;
      dbunit += `  <table name="mock_data">\n`;
      
      records.forEach((record, index) => {
        dbunit += `    <row>\n`;
        dbunit += `      <column name="id">${index + 1}</column>\n`;
        headers.forEach(header => {
          const value = String(record[header as keyof MockData] || '');
          dbunit += `      <column name="${header}">${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</column>\n`;
        });
        dbunit += `    </row>\n`;
      });
      
      dbunit += `  </table>\n`;
      dbunit += `</dataset>`;
      
      return (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-black">{dbunit}</code>
        </pre>
      );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🎨 Mock Data Generator</h1>
      
      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Field Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Fields</h3>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {Object.entries(selectedFields).map(([field, isSelected]) => (
              <label key={field} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleFieldToggle(field as keyof typeof selectedFields)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-black">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Output Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Output Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Records</label>
              <input
                type="number"
                min="1"
                max="100"
                value={numberOfRecords}
                onChange={(e) => setNumberOfRecords(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="table">Table</option>
                <option value="txt">Tab-Delimited</option>
                <option value="sql">SQL</option>
                <option value="cql">Cassandra CQL</option>
                <option value="firebase">Firebase</option>
                <option value="influxdb">InfluxDB</option>
                <option value="custom">Custom</option>
                <option value="xlsx">Excel</option>
                <option value="xml">XML</option>
                <option value="dbunit">DBUnit XML</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerate}
          className="px-8 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
        >
          Generate Mock Data
        </button>
      </div>

      {/* Output */}
      {mockData && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Generated Data</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopyToClipboard}
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
          
          {renderOutput()}
        </div>
      )}
    </div>
  );
}
