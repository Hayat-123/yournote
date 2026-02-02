"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, LogOut, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-stone-50">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          YourNote
        </h2>
        <p className="text-sm text-stone-500">{user?.email}</p>
      </div>
      <div className="px-4 mb-4">
        <Button onClick={() => router.push("/notes?action=new")} className="w-full justify-start" variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          <Button
            asChild
            variant={pathname === "/notes" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href="/notes">
              <FileText className="mr-2 h-4 w-4" />
              All Notes
            </Link>
          </Button>
          {/* Future: Tags or Folders could go here */}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
