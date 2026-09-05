import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, Github, Brain, CreditCard, Mail, Sparkles } from "lucide-react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeloConexao } from "@/components/IndisponivelAgora";
import { iasDisponiveis } from "@/lib/ias";

const titulo = "Integrações — Conect IA";
const descricao =
  "Conecte banco de dados, repositório de código, inteligência artificial, pagamentos e e-mails quando quiser.";

export const Route = createFileRoute("/integracoes")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Integracoes,
});

const servicos = [
  {
    icone: Database,
    nome: "Banco de dados",
    texto: "Guardar cadastros, pedidos e qualquer informação do seu projeto.",
  },
  {
    icone: Github,
    nome: "Código do projeto",
    texto: "Manter uma cópia segura de tudo o que for criado.",
  },
  {
    icone: CreditCard,
    nome: "Pagamentos",
    texto: "Receber pagamentos dentro do seu projeto.",
  },
  { icone: Mail, nome: "E-mails", texto: "Enviar confirmações e avisos automáticos." },
] as const;

function Integracoes() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-8 p-6">
        <PageHeader
          titulo="Integrações"
          descricao="Nada está conectado agora. Esta tela mostra o que poderá ser ligado depois, sem nenhum passo técnico da sua parte."
        />

        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Modelos de IA</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {iasDisponiveis.map((ia) => (
              <Card key={ia.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <Sparkles className="size-5 text-primary" />
                    <SeloConexao />
                  </div>
                  <CardTitle className="mt-2 text-lg">{ia.nome}</CardTitle>
                  <CardDescription>{ia.descricao}</CardDescription>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      Status: <span className="text-foreground">Não conectado</span>
                    </span>
                    <Button size="sm" disabled>
                      Conectar
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Outros serviços</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {servicos.map((s) => (
              <Card key={s.nome}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <s.icone className="size-5 text-primary" />
                    <SeloConexao />
                  </div>
                  <CardTitle className="mt-2 text-lg">{s.nome}</CardTitle>
                  <CardDescription>{s.texto}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

