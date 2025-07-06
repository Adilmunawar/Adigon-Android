"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ChatView } from "@/components/chat-view";
import { SettingsView } from "@/components/settings-view";

export type View = "chat" | "settings";

export default function ChatPage() {
  const [view, setView] = useState<View>("chat");

  return (
    <AppShell view={view} setView={setView}>
      {view === "chat" && <ChatView />}
      {view === "settings" && <SettingsView />}
    </AppShell>
  );
}
