import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Selo padrão para tudo que depende de uma conexão futura. */
export function SeloConexao({ className }: { className?: string }) {
  return (
    <Badge variant="outline" className={cn("gap-1 text-xs font-normal", className)}>
      <Lock className="size-3" />
      Disponível após conexão
    </Badge>
  );
}

export function BlocoConexao({
  titulo,
  explicacao,
  className,
}: {
  titulo: string;
  explicacao: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-card/60 p-6 text-center",
        className,
      )}
    >
      <Lock className="mx-auto size-5 text-muted-foreground" />
      <h3 className="mt-3 font-display text-base font-semibold">{titulo}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{explicacao}</p>
      <SeloConexao className="mt-4" />
    </div>
  );
}
