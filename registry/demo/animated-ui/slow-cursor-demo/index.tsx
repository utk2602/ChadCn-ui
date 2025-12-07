import { SlowCursor } from '@/registry/animated-ui/slow-cursor';

export default function SlowCursorDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background flex items-center justify-center">
      <SlowCursor />
      <div className="text-center">
        <h3 className="text-2xl font-bold">Move your mouse</h3>
        <p className="text-muted-foreground">The cursor follows with a delay</p>
      </div>
    </div>
  );
}
