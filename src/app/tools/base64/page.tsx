import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function Base64Page() {
  const tool = getToolById('base64');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="base64">
      <ToolComponent />
    </ToolLayout>
  );
}
