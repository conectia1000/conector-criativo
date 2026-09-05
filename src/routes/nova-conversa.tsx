import { createFileRoute } from "@tanstack/react-router";

import { AppShell, PageHeader } from "@/components/AppShell";
import { ConversaIA } from "@/components/ConversaIA";
import { PreviewPanel } from "@/components/PreviewPanel";
import { iasDisponiveis } from "@/lib/ias";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const iasConectadas = iasDisponiveis.filter((ia) => ia.conectada);
  const nenhumaConectada = iasConectadas.length === 0;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
        <PageHeader
          titulo="Nova conversa"
          descricao="Explique seu pedido com suas próprias palavras. A Conect IA responde sempre em quatro etapas."
        />

        <div className="grid gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-[1fr,320px]">
          <div className="space-y-2">
            <Label htmlFor="nome-projeto">Projeto</Label>
            <Input
              id="nome-projeto"
              placeholder="Novo projeto"
              className="bg-transparent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ia-seletor">Conversar com:</Label>
            <Select disabled={nenhumaConectada}>
              <SelectTrigger id="ia-seletor" className="bg-transparent">
                <SelectValue
                  placeholder={
                    nenhumaConectada
                      ? "Conecte uma IA em Integrações para começar"
                      : "Escolha uma IA"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {iasDisponiveis.map((ia) => (
                  <SelectItem key={ia.id} value={ia.id} disabled={!ia.conectada}>
                    {ia.nome} ({ia.provedor}){!ia.conectada && " — Não conectada"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px]">
          <ConversaIA />
          <PreviewPanel />
        </div>
      </div>
    </AppShell>
  );
}

