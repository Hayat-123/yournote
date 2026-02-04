import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wrench className="size-8 text-stone-400 rotate-90" />
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Build Your Mind Like a Developer</h2>
          </div>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl">
            Fast, local-first, and built for code. Notes that work the way you think.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-md px-8 h-12 text-base font-semibold bg-black text-white hover:bg-stone-800"
            >
              <Link href="/notes">
                Get Started
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <Logo />
            <span className="font-bold text-xl tracking-tight">NoteForge</span>
          </div>
          <p className="text-center text-sm leading-5 text-stone-500">
            &copy; 2026 NoteForge, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
