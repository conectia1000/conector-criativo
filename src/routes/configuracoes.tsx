import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell, PageHeader } from "@/components/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SeloConexao } from "@/components/IndisponivelAgora";

const titulo = "Configurações — Conect IA";
const descricao =
  "Ajuste seu nome, idioma, nível de detalhe das respostas e preferências da Conect IA.";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Configuracoes,
});

function Configuracoes() {
  const [nome, setNome] = useState("");
  const [detalhado, setDetalhado] = useState(true);
  const [confirmar, setConfirmar] = useState(true);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl space-y-8 p-6">
        <PageHeader
          titulo="Configurações"
          descricao="Preferências de uso da Conect IA. As opções marcadas dependem de uma conexão futura."
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seu perfil</CardTitle>
            <CardDescription>Como a Conect IA vai chamar você nas conversas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como você quer ser chamado"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idioma">Idioma</Label>
              <Input id="idioma" value="Português (Brasil)" readOnly />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-border p-3">
              <span className="text-sm text-muted-foreground">
                Salvar estas preferências na sua conta
              </span>
              <SeloConexao />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Como a IA responde</CardTitle>
            <CardDescription>Controle o nível de detalhe e as confirmações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Explicações detalhadas</p>
                <p className="text-sm text-muted-foreground">
                  Mostrar sempre as quatro etapas em cada resposta.
                </p>
              </div>
              <Switch checked={detalhado} onCheckedChange={setDetalhado} />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Pedir confirmação antes de executar</p>
                <p className="text-sm text-muted-foreground">
                  Nada é aplicado sem o seu “pode fazer”.
                </p>
              </div>
              <Switch checked={confirmar} onCheckedChange={setConfirmar} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conta e segurança</CardTitle>
            <CardDescription>
              Login, senha, cobrança e permissões de equipe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SeloConexao />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
