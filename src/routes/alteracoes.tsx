import { createFileRoute } from "@tanstack/react-router";

import { AppShell, PageHeader } from "@/components/AppShell";
import { BlocoConexao } from "@/components/IndisponivelAgora";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const titulo = "Alterações — Conect IA";
const descricao =
  "Acompanhe cada mudança feita no seu projeto, com data, motivo e opção de desfazer.";

export const Route = createFileRoute("/alteracoes")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Alteracoes,
});

function Alteracoes() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-8 p-6">
        <PageHeader
          titulo="Alterações"
          descricao="Um diário simples do que foi mudado no seu projeto, escrito em linguagem do dia a dia."
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Como isso vai funcionar</CardTitle>
            <CardDescription>
              A cada pedido concluído, você verá o que mudou, em qual página, e poderá voltar
              atrás com um clique.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Enquanto nada estiver conectado, esta lista permanece vazia de propósito — nenhum
            registro é inventado.
          </CardContent>
        </Card>

        <BlocoConexao
          titulo="Nada foi alterado no seu projeto ainda"
          explicacao="Cada mudança concluída vai aparecer aqui em uma linha do tempo: o que mudou, em qual página, quando, por qual pedido seu, com a comparação de antes e depois e o botão de desfazer. Nenhum registro é inventado enquanto não houver conexão."
        />

      </div>
    </AppShell>
  );
}
