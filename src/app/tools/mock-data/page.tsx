import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function MockDataPage() {
  const tool = getToolById('mock-data');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="mock-data">
      <ToolComponent />
    </ToolLayout>
  );
}
