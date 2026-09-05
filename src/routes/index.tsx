import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquarePlus, FolderKanban, GitCompare, Plug, Sparkle } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SeloConexao } from "@/components/IndisponivelAgora";

const titulo = "Conect IA — central de comando para criar software conversando";
const descricao =
  "Peça em português e acompanhe cada etapa: entendido, plano, execução e resultado. Feito para quem não programa.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Inicio,
});

const atalhos = [
  {
    to: "/nova-conversa",
    icone: MessageSquarePlus,
    titulo: "Começar uma conversa",
    texto: "Descreva o que você quer criar ou mudar, sem termos técnicos.",
  },
  {
    to: "/projetos",
    icone: FolderKanban,
    titulo: "Meus projetos",
    texto: "Veja tudo o que você está construindo em um só lugar.",
  },
  {
    to: "/alteracoes",
    icone: GitCompare,
    titulo: "Alterações",
    texto: "Acompanhe o que mudou, quando mudou e por quê.",
  },
  {
    to: "/integracoes",
    icone: Plug,
    titulo: "Integrações",
    texto: "Conecte serviços quando estiver pronto para sair do protótipo.",
  },
] as const;

function Inicio() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-10 p-6">
        <section className="rounded-3xl border border-border surface-command p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <Sparkle className="size-3 text-primary" />
            Sua central de comando
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-3xl font-semibold sm:text-5xl">
            Crie software conversando, em português.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            A Conect IA organiza cada pedido em quatro etapas simples, para você entender o que
            está acontecendo mesmo sem saber programar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link to="/nova-conversa">
                <MessageSquarePlus className="size-4" />
                Começar agora
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/projetos">Ver projetos</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {atalhos.map((a) => (
            <Card key={a.to} className="transition-colors hover:border-primary/50">
              <CardHeader>
                <a.icone className="size-5 text-primary" />
                <CardTitle className="mt-2 text-lg">{a.titulo}</CardTitle>
                <CardDescription>{a.texto}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" size="sm">
                  <Link to={a.to}>Abrir</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-2xl border border-dashed border-border bg-card/60 p-6">
          <h2 className="font-display text-lg font-semibold">Resumo da sua conta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Números de uso, projetos publicados e atividade recente aparecem aqui quando a Conect
            IA estiver conectada aos seus serviços.
          </p>
          <SeloConexao className="mt-4" />
        </section>
      </div>
    </AppShell>
  );
}
