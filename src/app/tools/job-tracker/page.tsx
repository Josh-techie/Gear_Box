import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function JobTrackerPage() {
  const tool = getToolById('job-tracker');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="job-tracker">
      <ToolComponent />
    </ToolLayout>
  );
}
