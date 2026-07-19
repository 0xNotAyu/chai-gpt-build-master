import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  text?: string;
  className?: string;
};

export function Loader({
  text = "Thinking...",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground py-2",
        className
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}