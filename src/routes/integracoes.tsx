import { createFileRoute } from "@tanstack/react-router";
import { Database, Github, Brain, CreditCard, Mail } from "lucide-react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SeloConexao } from "@/components/IndisponivelAgora";

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
    icone: Brain,
    nome: "Inteligência artificial",
    texto: "Permitir que a Conect IA execute os pedidos de verdade.",
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
      </div>
    </AppShell>
  );
}
