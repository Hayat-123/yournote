"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NotesHeader } from "@/components/notes-header";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <SidebarProvider>
      <div className="flex bg-stone-50/50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans w-full min-h-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <NotesHeader />
          <main className="flex-1 overflow-auto bg-white dark:bg-stone-900 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
