import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  FolderKanban,
  MessageSquarePlus,
  History,
  Plug,
  GitCompare,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogoMark, Wordmark } from "@/components/Logo";


const itens = [
  { title: "Início", url: "/", icon: Home },
  { title: "Projetos", url: "/projetos", icon: FolderKanban },
  { title: "Nova conversa", url: "/nova-conversa", icon: MessageSquarePlus },
  { title: "Histórico", url: "/historico", icon: History },
  { title: "Integrações", url: "/integracoes", icon: Plug },
  { title: "Alterações", url: "/alteracoes", icon: GitCompare },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const recolhida = state === "collapsed";
  const caminho = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <LogoMark className="size-9 shrink-0" />
          {!recolhida && (
            <span className="flex flex-col leading-tight">
              <Wordmark />
              <span className="text-xs text-muted-foreground">Central de comando</span>
            </span>
          )}
        </div>
      </SidebarHeader>


      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itens.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={caminho === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      {!recolhida && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!recolhida && (
        <SidebarFooter className="px-3 pb-4">
          <p className="rounded-lg border border-sidebar-border bg-sidebar-accent px-3 py-2 text-xs text-muted-foreground">
            Modo protótipo: nenhuma conexão externa ativa.
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
