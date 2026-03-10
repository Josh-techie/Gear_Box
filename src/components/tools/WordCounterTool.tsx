'use client';

import { useState, useEffect } from 'react';

interface Stats {
  characters: number;
  words: number;
  paragraphs: number;
}

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<Stats>({
    characters: 0,
    words: 0,
    paragraphs: 0
  });

  useEffect(() => {
    // Character count
    const charCount = text.length;
    
    // Word count
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Paragraph count
    const paragraphCount = text.trim() === '' ? 0 : text.trim().split(/\n+/).length;
    
    setStats({
      characters: charCount,
      words: wordCount,
      paragraphs: paragraphCount
    });
  }, [text]);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Word Counter</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Your Text
          </label>
          <textarea
            id="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-48 p-4 border-2 border-blue-300 rounded-md resize-vertical focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-gray-800">{stats.characters}</div>
            <div className="text-sm text-gray-600 mt-1">Characters</div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-gray-800">{stats.words}</div>
            <div className="text-sm text-gray-600 mt-1">Words</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-gray-800">{stats.paragraphs}</div>
            <div className="text-sm text-gray-600 mt-1">Paragraphs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
