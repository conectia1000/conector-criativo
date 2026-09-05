import { createFileRoute } from "@tanstack/react-router";

import { AppShell, PageHeader } from "@/components/AppShell";
import { ConversaIA } from "@/components/ConversaIA";

const titulo = "Nova conversa — Conect IA";
const descricao =
  "Converse em português com a Conect IA e acompanhe cada pedido em etapas: entendido, plano, execução e resultado.";

export const Route = createFileRoute("/nova-conversa")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: NovaConversa,
});

function NovaConversa() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
        <PageHeader
          titulo="Nova conversa"
          descricao="Explique seu pedido com suas próprias palavras. A Conect IA responde sempre em quatro etapas."
        />
        <ConversaIA />
      </div>
    </AppShell>
  );
}
