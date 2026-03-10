import { getToolById } from '@/lib/tools';
import ToolLayout from '@/components/layout/ToolLayout';

export default function PomodoroPage() {
  const tool = getToolById('pomodoro');
  const ToolComponent = tool?.component;

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolLayout currentToolId="pomodoro">
      <ToolComponent />
    </ToolLayout>
  );
}
