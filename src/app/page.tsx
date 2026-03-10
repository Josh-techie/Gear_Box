import Link from 'next/link';
import { tools } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function HomePage() {
  // Current and future categories with color themes
  const categories = [
    {
      id: 'text',
      name: 'Text Processing',
      description: 'Utilities for text processing and manipulation',
      icon: '�️',
      color: 'yellow',
      colorClasses: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        hover: 'hover:bg-yellow-100 hover:border-yellow-300'
      }
    },
    {
      id: 'productivity',
      name: 'Productivity & Tracking',
      description: 'Tools to boost your daily productivity and track progress',
      icon: '⏳',
      color: 'red',
      colorClasses: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        hover: 'hover:bg-red-100 hover:border-red-300'
      }
    },
    {
      id: 'data',
      name: 'Data Tools',
      description: 'Generate and manipulate test data',
      icon: '📊',
      color: 'blue',
      colorClasses: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        hover: 'hover:bg-blue-100 hover:border-blue-300'
      }
    },
    {
      id: 'security',
      name: 'Cybersecurity & "Hacker" Tools',
      description: 'Security audits, testing, and cryptographic utilities',
      icon: '🕵️',
      color: 'green',
      colorClasses: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        hover: 'hover:bg-green-100 hover:border-green-300'
      },
      upcoming: true
    },
    {
      id: 'design',
      name: 'Design & Mock Data',
      description: 'Creative tools for design and data generation',
      icon: '🎨',
      color: 'purple',
      colorClasses: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        hover: 'hover:bg-purple-100 hover:border-purple-300'
      }
    }
  ];

  const getToolsByCategory = (categoryId: string) => {
    return tools.filter(tool => tool.category === categoryId);
  };

  return (
    <ToolLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛠️ Swiss Army Knife
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal utility hub with all the tools you need for daily tasks
          </p>
        </div>

        {/* Current Tools Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const category = categories.find(cat => cat.id === tool.category);
              const colors = category?.colorClasses || categories[0].colorClasses;
              
              return (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className={`group bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border ${colors.border} ${colors.hover} relative overflow-hidden`}
                >
                  {/* Category Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                    {category?.name || 'General'}
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All Categories Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tool Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryTools = getToolsByCategory(category.id);
              const isUpcoming = category.upcoming;
              
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-lg shadow-md p-6 border ${category.colorClasses.border} relative ${
                    isUpcoming ? 'opacity-75' : ''
                  }`}
                >
                  {isUpcoming && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{category.icon}</div>
                    <h3 className={`text-lg font-semibold ${category.colorClasses.text}`}>
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  
                  {!isUpcoming && (
                    <div className={`text-sm font-medium ${category.colorClasses.text}`}>
                      {categoryTools.length} tool{categoryTools.length !== 1 ? 's' : ''} available
                    </div>
                  )}
                  
                  {isUpcoming && (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>• Password Generator</div>
                        <div>• Hash Generator</div>
                        <div>• URL Encoder/Decoder</div>
                        <div>• JWT Debugger</div>
                        {category.id === 'security' && <div>• Port Scanner</div>}
                        {category.id === 'design' && (
                          <>
                            <div>• Mock Data Generator</div>
                            <div>• Color Picker & Contrast</div>
                            <div>• SVG Path Optimizer</div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Tools Preview */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🕵️</span>
                <h3 className="text-lg font-semibold text-green-700">Cybersecurity Tools</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Password Generator with entropy options</div>
                <div>• MD5, SHA-256, SHA-512 Hash Generator</div>
                <div>• URL Encoder/Decoder</div>
                <div>• JWT Token Debugger</div>
                <div>• Port Scanner & IP Lookup</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🎨</span>
                <h3 className="text-lg font-semibold text-purple-700">More Design Tools</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Color Picker & Contrast Checker</div>
                <div>• SVG Path Optimizer</div>
                <div>• To-Do List with LocalStorage</div>
                <div>• Unix Timestamp Converter</div>
                <div>• And more creative utilities...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Tool CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want to add more tools?</h3>
          <p className="mb-6">
            This system is designed to be easily extensible. Add new tools by creating a component and registering it in the tools configuration.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-md p-4 text-left max-w-2xl mx-auto">
            <code className="text-sm">
              {`// Add to src/lib/tools.ts
{
  id: 'your-tool',
  name: 'Your Tool',
  description: 'What your tool does',
  icon: '🔧',
  category: 'productivity',
  path: '/tools/your-tool',
  component: YourToolComponent
}`}
            </code>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
