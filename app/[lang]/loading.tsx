import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary animate-pulse">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
          <div className="h-full w-1/2 animate-loading-bar rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
