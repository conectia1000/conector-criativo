import { useState } from "react";
import { LogoMark } from "@/components/Logo";
import { Bot, User, CheckCircle2, ListChecks, PlayCircle, Flag, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SeloConexao } from "@/components/IndisponivelAgora";
import { cn } from "@/lib/utils";

type Etapa = "entendido" | "plano" | "execucao" | "resultado";

type Mensagem =
  | { id: string; autor: "usuario"; texto: string }
  | { id: string; autor: "ia"; pedido: string };

const rotulos: Record<Etapa, { titulo: string; icone: typeof CheckCircle2 }> = {
  entendido: { titulo: "Entendido", icone: CheckCircle2 },
  plano: { titulo: "Plano", icone: ListChecks },
  execucao: { titulo: "Execução", icone: PlayCircle },
  resultado: { titulo: "Resultado", icone: Flag },
};

const sugestoes = [
  "Quero uma página inicial com meus serviços e um botão de contato",
  "Adicione um formulário para receber pedidos de orçamento",
  "Mude as cores do site para tons mais claros",
];

function BlocoEtapa({
  etapa,
  children,
  pendente,
}: {
  etapa: Etapa;
  children: React.ReactNode;
  pendente?: boolean;
}) {
  const { titulo, icone: Icone } = rotulos[etapa];
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4",
        pendente && "border-dashed bg-card/50",
      )}
    >
      <div className="flex items-center gap-2">
        <Icone className={cn("size-4", pendente ? "text-muted-foreground" : "text-primary")} />
        <span className="font-display text-sm font-semibold">{titulo}</span>
        {pendente && <SeloConexao className="ml-auto" />}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export function ConversaIA() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState("");

  function enviar(conteudo: string) {
    const limpo = conteudo.trim();
    if (!limpo) return;
    const id = `${Date.now()}`;
    setMensagens((atual) => [
      ...atual,
      { id: `u-${id}`, autor: "usuario", texto: limpo },
      { id: `a-${id}`, autor: "ia", pedido: limpo },
    ]);
    setTexto("");
  }

  return (
    <div className="flex h-full min-h-[70vh] flex-col gap-4">
      <div className="flex-1 space-y-6">
        {mensagens.length === 0 && (
          <div className="rounded-2xl border border-border surface-command p-8 text-center">
            <LogoMark className="mx-auto size-10" />
            <h2 className="mt-3 font-display text-xl font-semibold">
              Descreva o que você quer, em português simples
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Escreva como se estivesse explicando para uma pessoa. A Conect IA organiza seu
              pedido em etapas: entendido, plano, execução e resultado.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {sugestoes.map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => enviar(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}

        {mensagens.map((m) =>
          m.autor === "usuario" ? (
            <div key={m.id} className="flex justify-end gap-3">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm brand-gradient px-4 py-3 text-sm font-medium">
                {m.texto}
              </div>
              <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-border bg-secondary text-secondary-foreground">
                <User className="size-4" />
              </span>
            </div>
          ) : (
            <div key={m.id} className="flex gap-3">
              <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Bot className="size-4" />
              </span>
              <div className="w-full max-w-[85%] space-y-3">
                <BlocoEtapa etapa="entendido">
                  Seu pedido foi registrado assim: <span className="text-foreground">“{m.pedido}”</span>.
                  Se algo estiver diferente do que você quis dizer, é só reescrever.
                </BlocoEtapa>
                <BlocoEtapa etapa="plano">
                  <ol className="list-decimal space-y-1 pl-5">
                    <li>Confirmar o objetivo e onde a mudança aparece.</li>
                    <li>Preparar as telas e textos necessários.</li>
                    <li>Mostrar uma prévia antes de aplicar.</li>
                    <li>Registrar tudo na página Alterações.</li>
                  </ol>
                </BlocoEtapa>
                <BlocoEtapa etapa="execucao" pendente>
                  A execução real depende de conectar a Conect IA ao seu projeto e a um serviço de
                  inteligência artificial.
                </BlocoEtapa>
                <BlocoEtapa etapa="resultado" pendente>
                  Aqui aparecerá o que mudou, com prévia e opção de desfazer.
                </BlocoEtapa>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="sticky bottom-0 rounded-2xl border border-border bg-card p-3 panel-glow">
        <Textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) enviar(texto);
          }}
          placeholder="Escreva o que você quer criar ou mudar. Ex.: quero uma página de contato com meu telefone."
          className="min-h-28 resize-none border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1">
          <Badge variant="outline" className="text-xs font-normal">
            Ctrl + Enter para enviar
          </Badge>
          <Button onClick={() => enviar(texto)} disabled={!texto.trim()} className="gap-2">
            <Send className="size-4" />
            Enviar pedido
          </Button>
        </div>
      </div>
    </div>
  );
}
