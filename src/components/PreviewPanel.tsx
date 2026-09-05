import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DicaTermo } from "@/components/DicaTermo";
import { RefreshCw, MonitorPlay, Github, Link2 } from "lucide-react";


export function PreviewPanel() {
  const [estado, setEstado] = useState<"sincronizado" | "verificando">("sincronizado");

  const atualizar = useCallback(() => {
    if (estado === "verificando") return;
    setEstado("verificando");
  }, [estado]);

  useEffect(() => {
    if (estado !== "verificando") return;
    const timer = setTimeout(() => {
      setEstado("sincronizado");
    }, 2500);
    return () => clearTimeout(timer);
  }, [estado]);

  return (
    <aside className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MonitorPlay className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">Pré-visualização ao vivo</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={atualizar}
          disabled={estado === "verificando"}
          className="h-8 gap-2 text-xs"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${estado === "verificando" ? "animate-spin" : ""}`}
          />
          Atualizar agora
        </Button>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            estado === "verificando" ? "bg-amber-400" : "bg-emerald-400"
          }`}
        />
        <span className="text-muted-foreground">
          {estado === "verificando" ? "verificando..." : "sincronizado"}
        </span>
        <DicaTermo
          termo="sincronizar"
          explicacao="Buscar a versão mais recente do seu projeto para que a prévia mostre exatamente o que existe hoje."
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-background/50 px-6 py-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
          <Link2 className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
          Pré-visualização disponível após conectar o GitHub e o Lovable.
          <DicaTermo
            termo="GitHub"
            explicacao="Serviço onde fica guardada, com segurança, cada versão do que foi criado no seu projeto."
            className="ml-1"
          />
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Github className="h-3.5 w-3.5" />
          <span>Status: aguardando conexão</span>
          <DicaTermo
            termo="commit"
            explicacao="Cada vez que uma mudança é salva no seu projeto, ela vira um registro chamado commit — é ele que a prévia vai checar."
          />
        </div>
      </div>

    </aside>
  );
}
