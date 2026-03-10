'use client';

import { useState, useEffect } from 'react';

export default function UnixTimestampTool() {
  const [unixTimestamp, setUnixTimestamp] = useState<string>('');
  const [humanDate, setHumanDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [timezone, setTimezone] = useState<string>('UTC');
  const [format, setFormat] = useState<'datetime' | 'date' | 'time'>('datetime');

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Dubai',
    'Australia/Sydney',
    'Asia/Kolkata'
  ];

  const formatTimestamp = (timestamp: number, tz: string, fmt: string) => {
    try {
      const date = new Date(timestamp);
      
      // Format based on selected format
      const options: Intl.DateTimeFormatOptions = {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      if (fmt === 'date') {
        return date.toLocaleDateString('en-US', { ...options, hour: undefined, minute: undefined, second: undefined });
      } else if (fmt === 'time') {
        return date.toLocaleTimeString('en-US', { ...options, year: undefined, month: undefined, day: undefined });
      } else {
        return date.toLocaleString('en-US', options);
      }
    } catch (error) {
      return 'Invalid timestamp';
    }
  };

  const formatTimestampForDisplay = (timestamp: number, tz: string, fmt: string) => {
    try {
      const date = new Date(timestamp);
      
      // Use UTC for consistent display regardless of timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      if (fmt === 'date') {
        return date.toLocaleDateString('en-US', { ...options, hour: undefined, minute: undefined, second: undefined });
      } else if (fmt === 'time') {
        return date.toLocaleTimeString('en-US', { ...options, year: undefined, month: undefined, day: undefined });
      } else {
        return date.toLocaleString('en-US', options);
      }
    } catch (error) {
      return 'Invalid timestamp';
    }
  };

  const handleUnixChange = (value: string) => {
    setUnixTimestamp(value);
    
    if (!value.trim()) {
      setHumanDate('');
      return;
    }

    const timestamp = parseInt(value);
    
    // Check if it's a valid timestamp (seconds or milliseconds)
    if (isNaN(timestamp)) {
      setHumanDate('Invalid number');
      return;
    }

    // Determine if it's seconds or milliseconds
    let convertedTimestamp: number;
    if (timestamp < 10000000000) {
      // Unix timestamp in seconds
      convertedTimestamp = timestamp * 1000;
    } else {
      // Unix timestamp in milliseconds
      convertedTimestamp = timestamp;
    }

    const formatted = formatTimestampForDisplay(convertedTimestamp, timezone, format);
    setHumanDate(formatted);
  };

  const handleHumanDateChange = (value: string) => {
    setHumanDate(value);
    
    if (!value.trim()) {
      setUnixTimestamp('');
      return;
    }

    try {
      let date: Date;
      
      // Try different date parsing methods
      if (value.includes('T') || value.includes('-')) {
        // ISO format or date with dashes
        date = new Date(value);
      } else if (value.includes('/') || value.includes(' ')) {
        // Try parsing with Date constructor for various formats
        date = new Date(value);
      } else {
        // Try parsing as a number (in case user entered a timestamp)
        const numValue = parseInt(value);
        if (!isNaN(numValue)) {
          setUnixTimestamp(numValue.toString());
          return;
        } else {
          date = new Date(value);
        }
      }
      
      if (isNaN(date.getTime())) {
        // Try some common formats manually
        const formats = [
          // MM/DD/YYYY
          /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
          // DD/MM/YYYY
          /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
          // YYYY-MM-DD
          /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
          // Month DD, YYYY
          /^(\w+)\s+(\d{1,2}),?\s+(\d{4})$/
        ];
        
        let parsed = false;
        
        for (const format of formats) {
          const match = value.match(format);
          if (match) {
            if (format === formats[0]) { // MM/DD/YYYY
              date = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2])));
              parsed = true;
              break;
            } else if (format === formats[1]) { // DD/MM/YYYY
              date = new Date(Date.UTC(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1])));
              parsed = true;
              break;
            } else if (format === formats[2]) { // YYYY-MM-DD
              date = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3])));
              parsed = true;
              break;
            } else if (format === formats[3]) { // Month DD, YYYY
              const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const monthIndex = monthNames.indexOf(match[1].substring(0, 3));
              if (monthIndex !== -1) {
                date = new Date(Date.UTC(parseInt(match[3]), monthIndex, parseInt(match[2])));
                parsed = true;
                break;
              }
            }
          }
        }
        
        if (!parsed) {
          setUnixTimestamp('Invalid date format');
          return;
        }
      }

      if (isNaN(date.getTime())) {
        setUnixTimestamp('Invalid date');
        return;
      }

      // Convert to Unix timestamp (seconds) - use UTC to ensure consistency
      const timestamp = Math.floor(date.getTime() / 1000);
      setUnixTimestamp(timestamp.toString());
      
      // Update the human date display to show the UTC version for consistency
      const utcFormatted = formatTimestampForDisplay(date.getTime(), timezone, format);
      setHumanDate(utcFormatted);
    } catch (error) {
      setUnixTimestamp('Invalid date format');
    }
  };

  const setCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    setUnixTimestamp(now.toString());
    handleUnixChange(now.toString());
  };

  const setCurrentDate = () => {
    const now = new Date().toISOString();
    setHumanDate(now);
    handleHumanDateChange(now);
  };

  const getTimestampInfo = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    return {
      date,
      daysAgo: days,
      hoursAgo: hours,
      minutesAgo: minutes,
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
      dayOfYear: Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    };
  };

  const commonTimestamps = [
    { name: 'Now', value: Math.floor(currentTime / 1000) },
    { name: 'Unix Epoch', value: 0 },
    { name: 'Y2K', value: 946684800 },
    { name: 'Start of 2023', value: 1672531200 },
    { name: 'Start of 2024', value: 1704067200 },
    { name: 'Start of 2025', value: 1735689600 }
  ];

  const getCurrentTimestampInfo = () => {
    const timestamp = parseInt(unixTimestamp);
    if (isNaN(timestamp)) return null;

    const convertedTimestamp = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
    return getTimestampInfo(convertedTimestamp);
  };

  const timestampInfo = getCurrentTimestampInfo();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">⏱️ Unix Timestamp Converter</h1>
      
      {/* Current Time Display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Time</h3>
          <div className="text-2xl font-mono text-black mb-1">
            {formatTimestampForDisplay(currentTime, timezone, format)}
          </div>
          <div className="text-sm text-black">
            Unix: {Math.floor(currentTime / 1000)} | Millis: {currentTime}
          </div>
        </div>
      </div>

      {/* Main Converter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Unix Timestamp Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unix Timestamp
          </label>
          <div className="space-y-3">
            <input
              type="text"
              value={unixTimestamp}
              onChange={(e) => handleUnixChange(e.target.value)}
              placeholder="Enter Unix timestamp (seconds or milliseconds)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
            <div className="flex gap-2">
              <button
                onClick={setCurrentTimestamp}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Use Current
              </button>
              <button
                onClick={() => setUnixTimestamp('')}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Human Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Human Readable Date
          </label>
          <div className="space-y-3">
            <input
              type="text"
              value={humanDate}
              onChange={(e) => handleHumanDateChange(e.target.value)}
              placeholder="e.g., 2024-01-15, Jan 15, 2024, 01/15/2024, now"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
            <div className="flex gap-2">
              <button
                onClick={setCurrentDate}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Use Current
              </button>
              <button
                onClick={() => setHumanDate('')}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={timezone}
            onChange={(e) => {
              setTimezone(e.target.value);
              if (unixTimestamp) handleUnixChange(unixTimestamp);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output Format
          </label>
          <select
            value={format}
            onChange={(e) => {
              setFormat(e.target.value as 'datetime' | 'date' | 'time');
              if (unixTimestamp) handleUnixChange(unixTimestamp);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="datetime">Date & Time</option>
            <option value="date">Date Only</option>
            <option value="time">Time Only</option>
          </select>
        </div>
      </div>

      {/* Timestamp Information */}
      {timestampInfo && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Timestamp Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Day of Week:</span>
              <span className="ml-2 font-medium text-black">{timestampInfo.dayOfWeek}</span>
            </div>
            <div>
              <span className="text-gray-600">Day of Year:</span>
              <span className="ml-2 font-medium text-black">{timestampInfo.dayOfYear}</span>
            </div>
            <div>
              <span className="text-gray-600">Time Ago:</span>
              <span className="ml-2 font-medium text-black">
                {timestampInfo.daysAgo > 0 ? `${timestampInfo.daysAgo} days` :
                 timestampInfo.hoursAgo > 0 ? `${timestampInfo.hoursAgo} hours` :
                 `${timestampInfo.minutesAgo} minutes`}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Year:</span>
              <span className="ml-2 font-medium text-black">{timestampInfo.date.getFullYear()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Common Timestamps */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Common Timestamps</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {commonTimestamps.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setUnixTimestamp(item.value.toString());
                handleUnixChange(item.value.toString());
              }}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-black">{item.name}</div>
              <div className="text-xs text-black">{item.value}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black">
          <div>
            <strong>Unix Timestamp:</strong> Seconds since January 1, 1970 (UTC)
          </div>
          <div>
            <strong>JavaScript Timestamp:</strong> Milliseconds since January 1, 1970 (UTC)
          </div>
          <div>
            <strong>Current Unix Time:</strong> {Math.floor(currentTime / 1000)}
          </div>
          <div>
            <strong>Current JS Time:</strong> {currentTime}
          </div>
        </div>
      </div>

      {/* Supported Date Formats */}
      <div className="mt-6 bg-green-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Supported Date Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1 text-black">
            <div><strong>ISO Format:</strong> 2024-01-15T10:30:00Z</div>
            <div><strong>Date Only:</strong> 2024-01-15</div>
            <div><strong>US Format:</strong> 01/15/2024</div>
            <div><strong>European:</strong> 15/01/2024</div>
          </div>
          <div className="space-y-1 text-black">
            <div><strong>Long Format:</strong> January 15, 2024</div>
            <div><strong>With Time:</strong> Jan 15, 2024 14:30</div>
            <div><strong>Natural:</strong> now, today, tomorrow</div>
            <div><strong>Relative:</strong> +1 day, -2 weeks</div>
          </div>
        </div>
      </div>
    </div>
  );
}
