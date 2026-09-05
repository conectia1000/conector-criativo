import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { BlocoConexao } from "@/components/IndisponivelAgora";

const titulo = "Projetos — Conect IA";
const descricao =
  "Veja e organize todos os seus projetos criados por conversa dentro da Conect IA.";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Projetos,
});

function Projetos() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-8 p-6">
        <PageHeader
          titulo="Projetos"
          descricao="Cada projeto reúne suas conversas, alterações e páginas em um só lugar."
          acao={
            <Button asChild className="gap-2">
              <Link to="/nova-conversa">
                <Plus className="size-4" />
                Criar por conversa
              </Link>
            </Button>
          }
        />

        <BlocoConexao
          titulo="Nenhum projeto para mostrar ainda"
          explicacao="A lista de projetos, com prévia e data da última alteração, aparece assim que a Conect IA for conectada ao seu espaço de trabalho."
        />
      </div>
    </AppShell>
  );
}
