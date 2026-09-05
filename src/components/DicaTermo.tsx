import { HelpCircle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Ícone de dica para explicar termos técnicos em linguagem simples. */
export function DicaTermo({
  termo,
  explicacao,
  className,
}: {
  termo: string;
  explicacao: string;
  className?: string;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={`O que significa ${termo}`}
            className={cn(
              "inline-flex align-middle text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground",
              className,
            )}
          >
            <HelpCircle className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-60 text-xs">
          <span className="font-semibold">{termo}: </span>
          {explicacao}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
