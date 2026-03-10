import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function UnixTimestampPage() {
  const tool = getToolById('unix-timestamp');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="unix-timestamp">
      <ToolComponent />
    </ToolLayout>
  );
}
