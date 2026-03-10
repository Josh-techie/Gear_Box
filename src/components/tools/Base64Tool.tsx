'use client';

import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try {
      const encoded = btoa(encodeURIComponent(input));
      setOutput(encoded);
      setError('');
    } catch (e) {
      setOutput('');
      setError('Error: Unable to encode. Make sure the input is valid.');
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(atob(input));
      setOutput(decoded);
      setError('');
    } catch (e) {
      setOutput('');
      setError('Error: Unable to decode. Make sure the input is valid Base64.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Base64 Encoder/Decoder</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or decode"
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={encode}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Encode to Base64
          </button>
          <button
            onClick={decode}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Decode from Base64
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-2">
            Result
          </label>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="Result will appear here"
            className="w-full h-32 p-3 border border-gray-300 rounded-md bg-gray-50 resize-vertical text-black"
          />
        </div>
      </div>
    </div>
  );
}
