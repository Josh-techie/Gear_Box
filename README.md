# 🛠️ Swiss Army Knife

A modern, scalable web application that consolidates various utility tools into a single, easy-to-use interface. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Current Tools
- **🔐 Base64 Encoder/Decoder** - Convert text to and from Base64 format
- **📝 Word Counter** - Real-time text statistics (characters, words, paragraphs)

### Architecture Highlights
- **Scalable Design**: Easy to add new tools with minimal configuration
- **TypeScript**: Full type safety and better developer experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, minimalist interface with smooth animations
- **Local Storage**: Persistent data storage for user preferences and tool data

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Emoji-based (lightweight, no external dependencies)
- **Storage**: LocalStorage API for client-side persistence

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── tools/             # Individual tool pages
│   │   ├── base64/        # Base64 encoder/decoder
│   │   └── word-counter/  # Word counter tool
│   └── page.tsx           # Homepage dashboard
├── components/
│   ├── layout/            # Layout components
│   │   └── ToolLayout.tsx # Main app layout with navigation
│   └── tools/             # Individual tool components
│       ├── Base64Tool.tsx
│       └── WordCounterTool.tsx
├── lib/
│   ├── tools.ts           # Tool registry and configuration
│   └── storage.ts         # LocalStorage utilities
└── types/
    └── tool.ts            # TypeScript type definitions
```

## Adding New Tools

Adding a new tool is simple and requires only a few steps:

### 1. Create the Tool Component

```tsx
// src/components/tools/YourTool.tsx
'use client';

export default function YourTool() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Your Tool Name
      </h1>
      {/* Your tool implementation */}
    </div>
  );
}
```

### 2. Register the Tool

```typescript
// src/lib/tools.ts
import YourTool from '@/components/tools/YourTool';

export const tools: Tool[] = [
  // ... existing tools
  {
    id: 'your-tool',
    name: 'Your Tool',
    description: 'What your tool does',
    icon: '🔧',
    category: 'productivity',
    path: '/tools/your-tool',
    component: YourTool
  }
];
```

### 3. Create the Route

```tsx
// src/app/tools/your-tool/page.tsx
import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function YourToolPage() {
  const tool = getToolById('your-tool');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="your-tool">
      <ToolComponent />
    </ToolLayout>
  );
}
```

That's it! Your new tool will automatically appear in the navigation and homepage.

## Available Categories

Tools are organized into categories for better organization:

- **text**: Text processing and manipulation tools
- **productivity**: Productivity and utility tools
- **data**: Data generation and manipulation tools

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Data Persistence

The application includes a robust LocalStorage utility (`src/lib/storage.ts`) that provides:

- Type-safe storage operations
- Automatic prefixing to avoid conflicts
- Error handling and fallbacks
- Timestamp tracking
- Bulk operations

Usage example:

```typescript
import { LocalStorage } from '@/lib/storage';

// Save data
LocalStorage.set('user-preferences', { theme: 'dark' });

// Retrieve data
const preferences = LocalStorage.get('user-preferences', { theme: 'light' });

// Remove data
LocalStorage.remove('user-preferences');
```

## Design System

The application uses a consistent design system based on:

- **Colors**: Primary (blue), Secondary (green), Accent (purple)
- **Typography**: Inter font family with consistent scale
- **Spacing**: Tailwind's spacing system
- **Animations**: Subtle transitions and hover effects
- **Responsive**: Mobile-first design approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your new tool following the architecture guidelines
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
