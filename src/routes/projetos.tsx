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
          titulo="Você ainda não tem projetos aqui"
          explicacao="Quando tudo estiver conectado, cada projeto aparece nesta lista com o nome que você escolheu, uma miniatura da página inicial, a data da última alteração e um atalho para continuar a conversa. Por enquanto nada é criado de verdade."
        />

      </div>
    </AppShell>
  );
}
