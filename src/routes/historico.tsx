import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { BlocoConexao } from "@/components/IndisponivelAgora";

const titulo = "Histórico — Conect IA";
const descricao = "Reveja suas conversas anteriores com a Conect IA e retome de onde parou.";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Historico,
});

function Historico() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-8 p-6">
        <PageHeader
          titulo="Histórico"
          descricao="Todas as conversas ficam guardadas para você consultar o que pediu e o que foi feito."
          acao={
            <Button asChild variant="outline">
              <Link to="/nova-conversa">Nova conversa</Link>
            </Button>
          }
        />

        <BlocoConexao
          titulo="Nenhuma conversa guardada até agora"
          explicacao="Aqui vão ficar as conversas que você tiver com a Conect IA: o dia, o resumo do que você pediu, em quais etapas parou e um botão para retomar de onde ficou. Nada é salvo enquanto a conexão não existir."
        />

      </div>
    </AppShell>
  );
}
