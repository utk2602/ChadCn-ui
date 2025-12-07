import { ThreeDCard } from '@/registry/animated-ui/3d-card';

export default function ThreeDCardDemo() {
  return (
    <div className="flex items-center justify-center py-20">
      <ThreeDCard className="w-full max-w-sm bg-black dark:bg-zinc-900">
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Hover Me</h2>
          <p className="text-zinc-400">
            Move your cursor over the card to see the 3D effect.
          </p>
        </div>
      </ThreeDCard>
    </div>
  );
}
