export type IA = {
  id: string;
  nome: string;
  provedor: string;
  descricao: string;
  conectada: boolean;
};

export const iasDisponiveis: IA[] = [
  {
    id: "gpt-plus",
    nome: "GPT Plus",
    provedor: "OpenAI",
    descricao: "Modelo avançado da OpenAI para criação e ajuste de software.",
    conectada: false,
  },
  {
    id: "claude",
    nome: "Claude",
    provedor: "Anthropic",
    descricao: "Assistente da Anthropic para conversas longas e análise detalhada.",
    conectada: false,
  },
  {
    id: "outra",
    nome: "Outra IA",
    provedor: "Genérico",
    descricao: "Informe uma API compatível quando quiser conectar outro serviço.",
    conectada: false,
  },
];
