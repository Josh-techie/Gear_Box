'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools';

interface ToolLayoutProps {
  children: ReactNode;
  currentToolId?: string;
}

export default function ToolLayout({ children, currentToolId }: ToolLayoutProps) {
  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  // Category configurations
  const categoryConfig = {
    text: { name: 'Text Processing', icon: '🖋️', color: 'yellow' },
    productivity: { name: 'Productivity', icon: '⏳', color: 'red' },
    data: { name: 'Data Tools', icon: '📊', color: 'blue' },
    design: { name: 'Design & Mock Data', icon: '🎨', color: 'purple' }
  };

  // Color classes for categories
  const colorClasses = {
    yellow: {
      active: 'bg-yellow-100 text-yellow-700',
      hover: 'text-yellow-700 hover:bg-yellow-50',
      dropdown: 'bg-yellow-50 border-yellow-200'
    },
    red: {
      active: 'bg-red-100 text-red-700',
      hover: 'text-red-700 hover:bg-red-50',
      dropdown: 'bg-red-50 border-red-200'
    },
    blue: {
      active: 'bg-blue-100 text-blue-700',
      hover: 'text-blue-700 hover:bg-blue-50',
      dropdown: 'bg-blue-50 border-blue-200'
    },
    purple: {
      active: 'bg-purple-100 text-purple-700',
      hover: 'text-purple-700 hover:bg-purple-50',
      dropdown: 'bg-purple-50 border-purple-200'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🛠️</span>
              <h1 className="text-xl font-bold text-gray-900">Swiss Army Knife</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              {Object.entries(toolsByCategory).map(([category, categoryTools]) => {
                const config = categoryConfig[category as keyof typeof categoryConfig];
                const colors = colorClasses[config.color as keyof typeof colorClasses];
                
                return (
                  <div key={category} className="relative group">
                    <button className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${colors.hover}`}>
                      <span>{config.icon}</span>
                      <span>{config.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg border ${colors.dropdown} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                      <div className="py-1">
                        {categoryTools.map((tool) => (
                          <Link
                            key={tool.id}
                            href={tool.path}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                              currentToolId === tool.id
                                ? colors.active
                                : 'text-gray-700 hover:bg-white hover:bg-opacity-50'
                            }`}
                          >
                            <span>{tool.icon}</span>
                            <span>{tool.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          {Object.entries(toolsByCategory).map(([category, categoryTools]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            const colors = colorClasses[config.color as keyof typeof colorClasses];
            
            return (
              <div key={category} className="mb-4">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${colors.active}`}>
                  <span>{config.icon}</span>
                  <span>{config.name}</span>
                </div>
                <div className="ml-4 mt-1 space-y-1">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentToolId === tool.id
                          ? colors.active
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Your personal utility hub • Built with Next.js & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}
