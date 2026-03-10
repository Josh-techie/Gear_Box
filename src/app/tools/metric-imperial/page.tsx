import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function MetricImperialPage() {
  const tool = getToolById('metric-imperial');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="metric-imperial">
      <ToolComponent />
    </ToolLayout>
  );
}
