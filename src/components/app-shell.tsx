"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, Settings } from "lucide-react";
import type { View } from "@/app/chat/page";

interface AppShellProps {
  children: ReactNode;
  view: View;
  setView: Dispatch<SetStateAction<View>>;
}

export function AppShell({ children, view, setView }: AppShellProps) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear the session/token here
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tighter">Adigon AI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setView("chat")}
                isActive={view === "chat"}
                tooltip="Chat"
              >
                <MessageSquare />
                <span>Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setView("settings")}
                isActive={view === "settings"}
                tooltip="Settings"
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold">User</p>
                <p className="truncate text-xs text-muted-foreground">user@example.com</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="shrink-0">
                <LogOut className="h-5 w-5"/>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b p-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold capitalize">{view}</h1>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
