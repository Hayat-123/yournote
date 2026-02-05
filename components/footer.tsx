import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PenLine className="size-8 text-orange-500" />
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">Start Capturing Your Ideas</h2>
          </div>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
            Simple, fast, and always accessible. Your notes, organized exactly the way you want.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-md px-8 h-12 text-base font-semibold bg-black text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200"
            >
              <Link href="/notes">
                Get Started
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <Logo />
          </div>
          <p className="text-center text-sm leading-5 text-stone-500 dark:text-stone-400">
            &copy; 2026 YourNote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
