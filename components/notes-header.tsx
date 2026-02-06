"use client";

import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "./auth-provider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function NotesHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const isDashboard = pathname === "/notes";
  const pathParts = pathname.split("/").filter(Boolean);
  const notebookId = pathParts[1] || null;
  const noteId = pathParts[2] || null;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear border-b border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {isDashboard ? (
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="/notes">Dashboard</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {notebookId && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {noteId ? (
                    <BreadcrumbLink href={`/notes/${notebookId}`}>Notebook</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>Notebook</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </>
            )}
            {noteId && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Note</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="font-medium"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
