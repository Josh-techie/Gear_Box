import { Tool } from '@/types/tool';
import Base64Tool from '@/components/tools/Base64Tool';
import WordCounterTool from '@/components/tools/WordCounterTool';
import JobTrackerTool from '@/components/tools/JobTrackerTool';
import PomodoroTool from '@/components/tools/PomodoroTool';
import MetricImperialTool from '@/components/tools/MetricImperialTool';
import MockDataTool from '@/components/tools/MockDataTool';
import UnixTimestampTool from '@/components/tools/UnixTimestampTool';

export const tools: Tool[] = [
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings with ease',
    icon: '🔐',
    category: 'text',
    path: '/tools/base64',
    component: Base64Tool
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and paragraphs in your text',
    icon: '📝',
    category: 'text',
    path: '/tools/word-counter',
    component: WordCounterTool
  },
  {
    id: 'job-tracker',
    name: 'Job Application Tracker',
    description: 'Track and manage your job applications',
    icon: '💼',
    category: 'productivity',
    path: '/tools/job-tracker',
    component: JobTrackerTool
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus timer with customizable work/break intervals',
    icon: '🍅',
    category: 'productivity',
    path: '/tools/pomodoro',
    component: PomodoroTool
  },
  {
    id: 'metric-imperial',
    name: 'Metric & Imperial Converter',
    description: 'Convert between metric and imperial units for length, weight, temperature, and more',
    icon: '📏',
    category: 'data',
    path: '/tools/metric-imperial',
    component: MetricImperialTool
  },
  {
    id: 'mock-data',
    name: 'Mock Data Generator',
    description: 'Generate fake data for testing and development',
    icon: '🎨',
    category: 'design',
    path: '/tools/mock-data',
    component: MockDataTool
  },
  {
    id: 'unix-timestamp',
    name: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa',
    icon: '⏱️',
    category: 'design',
    path: '/tools/unix-timestamp',
    component: UnixTimestampTool
  }
];

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
};
