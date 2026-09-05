import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DicaTermo } from "@/components/DicaTermo";
import {
  RefreshCw,
  MonitorPlay,
  Github,
  Link2,
  GripHorizontal,
  Minus,
  Crosshair,
} from "lucide-react";

const LARGURA = 320;
const ALTURA_ESTIMADA = 360;

function posicaoPadrao() {
  if (typeof window === "undefined") return { x: 24, y: 80 };
  const larguraTela = window.innerWidth;
  const largura = Math.min(LARGURA, larguraTela - 24);
  if (larguraTela < 768) {
    return { x: Math.max(12, (larguraTela - largura) / 2), y: 72 };
  }
  return { x: larguraTela - largura - 24, y: 80 };
}

export function PreviewPanel() {
  const [estado, setEstado] = useState<"sincronizado" | "verificando">("sincronizado");
  const [pos, setPos] = useState(posicaoPadrao);
  const [minimizado, setMinimizado] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const painelRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const limitar = useCallback((x: number, y: number) => {
    const el = painelRef.current;
    const largura = el?.offsetWidth ?? LARGURA;
    const altura = el?.offsetHeight ?? ALTURA_ESTIMADA;
    const maxX = Math.max(8, window.innerWidth - largura - 8);
    const maxY = Math.max(8, window.innerHeight - altura - 8);
    return {
      x: Math.min(Math.max(8, x), maxX),
      y: Math.min(Math.max(8, y), maxY),
    };
  }, []);

  const restaurar = useCallback(() => {
    setMinimizado(false);
    const p = posicaoPadrao();
    setPos(limitar(p.x, p.y));
  }, [limitar]);

  useEffect(() => {
    const padrao = posicaoPadrao();
    setPos(limitar(padrao.x, padrao.y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPos((p) => limitar(p.x, p.y));
    const onResize = () => setPos((p) => limitar(p.x, p.y));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [limitar, minimizado]);

  const iniciarArraste = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      const rect = painelRef.current?.getBoundingClientRect();
      if (!rect) return;
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setArrastando(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
    },
    [],
  );

  const moverArraste = useCallback(
    (e: React.PointerEvent) => {
      if (!arrastando) return;
      setPos(limitar(e.clientX - offset.current.x, e.clientY - offset.current.y));
      e.preventDefault();
    },
    [arrastando, limitar],
  );

  const soltarArraste = useCallback((e: React.PointerEvent) => {
    setArrastando(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ponteiro já liberado */
    }
  }, []);

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

  const barraArraste = {
    onPointerDown: iniciarArraste,
    onPointerMove: moverArraste,
    onPointerUp: soltarArraste,
    onPointerCancel: soltarArraste,
  };

  if (minimizado) {
    return (
      <div
        ref={painelRef}
        className="fixed z-50 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 panel-glow"
        style={{ left: pos.x, top: pos.y, cursor: arrastando ? "grabbing" : "grab", touchAction: "none" }}
        {...barraArraste}
      >
        <MonitorPlay className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium">Prévia</span>
        <button
          type="button"
          onClick={() => setMinimizado(false)}
          className="rounded-full px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Abrir pré-visualização"
        >
          Abrir
        </button>
      </div>
    );
  }

  return (
    <aside
      ref={painelRef}
      className="fixed z-50 flex w-[min(20rem,calc(100vw-1.5rem))] flex-col gap-4 rounded-xl border border-border bg-card p-4 panel-glow"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="-m-1 flex items-center justify-between gap-2 rounded-lg p-1 select-none"
        style={{ cursor: arrastando ? "grabbing" : "grab", touchAction: "none" }}
        {...barraArraste}
      >
        <div className="flex items-center gap-2">
          <GripHorizontal className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">Pré-visualização ao vivo</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={restaurar}
            aria-label="Restaurar posição padrão"
            title="Restaurar posição padrão"
          >
            <Crosshair className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setMinimizado(true)}
            aria-label="Recolher janela"
            title="Recolher"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={atualizar}
          disabled={estado === "verificando"}
          className="h-8 gap-2 text-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${estado === "verificando" ? "animate-spin" : ""}`} />
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

      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-background/50 px-6 py-8 text-center">
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
