"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useEffect, useState } from "react";
import { Notebook, subscribeToNotebooks } from "@/lib/db";
import { FileText, Search, LayoutDashboard, Notebook as NotebookIcon, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [search, setSearch] = useState("");
  const { state } = useSidebar();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToNotebooks(user.uid, setNotebooks);
    return () => unsubscribe();
  }, [user]);

  const filteredNotebooks = notebooks.filter((nb) =>
    nb.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Sidebar collapsible="icon" className="bg-stone-50 dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 text-orange-600 mb-4 overflow-hidden">
          <div className="bg-orange-600 rounded p-1 shrink-0">
            <NotebookIcon className="h-5 w-5 text-white" />
          </div>
          {state === "expanded" && (
            <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 truncate">
              YourNote
            </h2>
          )}
        </div>

        {state === "expanded" && (
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/notes"}
                tooltip="Dashboard"
              >
                <Link href="/notes">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Notebooks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNotebooks.map((nb) => (
                <SidebarMenuItem key={nb.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(`/notes/${nb.id}`)}
                    tooltip={nb.name}
                  >
                    <Link href={`/notes/${nb.id}`} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 shrink-0" />
                        <span className="truncate">{nb.name}</span>
                      </div>
                      {state === "expanded" && <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {filteredNotebooks.length === 0 && state === "expanded" && (
                <p className="px-3 text-xs text-stone-400 italic">No notebooks</p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
