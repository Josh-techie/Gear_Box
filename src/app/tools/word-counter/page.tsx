import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function WordCounterPage() {
  const tool = getToolById('word-counter');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="word-counter">
      <ToolComponent />
    </ToolLayout>
  );
}
