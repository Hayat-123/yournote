'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { useTheme } from 'next-themes'

const menuItems: { name: string; href: string }[] = []

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const { theme, setTheme } = useTheme()

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className={cn(
                    'fixed z-20 w-full border-b transition-all duration-300 group',
                    scrolled ? 'bg-background/80 backdrop-blur-xl border-border' : 'bg-transparent border-transparent',
                    menuState && 'bg-background border-border shadow-lg'
                )}>
                <div className="mx-auto max-w-5xl px-6">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                onClick={() => setMenuState(false)}
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                                <X className="absolute inset-0 m-auto size-6 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 -rotate-180 scale-0 opacity-0" />
                            </button>
                        </div>

                        {/* Mobile Menu Backdrop */}
                        <div
                            className={cn(
                                "fixed inset-0 z-10 bg-background/20 backdrop-blur-sm lg:hidden transition-opacity duration-300",
                                menuState ? "opacity-100" : "pointer-events-none opacity-0"
                            )}
                            onClick={() => setMenuState(false)}
                        />

                        <div className={cn(
                            "absolute top-full left-0 z-20 w-full overflow-hidden transition-all duration-300 lg:static lg:flex lg:w-fit lg:bg-transparent lg:p-0 lg:border-none",
                            menuState ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible lg:visible lg:max-h-none lg:opacity-100"
                        )}>
                            <div className="bg-background border-b p-6 shadow-xl lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none">
                                <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
                                    <div className="lg:hidden w-full">
                                        <ul className="flex flex-col items-center gap-6 text-base w-full">
                                            {menuItems.map((item, index) => (
                                                <li key={index} className="w-full text-center">
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setMenuState(false)}
                                                        className="text-muted-foreground hover:text-foreground block duration-150 py-2">
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center md:w-fit lg:gap-6">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={toggleTheme}
                                                className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-accent transition-colors"
                                                aria-label="Toggle theme"
                                            >
                                                {mounted && (
                                                    theme === 'dark' ? (
                                                        <Sun className="h-5 w-5" />
                                                    ) : (
                                                        <Moon className="h-5 w-5" />
                                                    )
                                                )}
                                            </button>
                                            <span className="lg:hidden text-sm text-muted-foreground">Change Theme</span>
                                        </div>
                                        <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                                className="text-base font-medium"
                                                onClick={() => setMenuState(false)}
                                            >
                                                <Link href="/login">
                                                    <span>Login</span>
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                className="bg-black text-white hover:bg-stone-800 rounded-md px-6 dark:bg-white dark:text-black dark:hover:bg-stone-200"
                                                onClick={() => setMenuState(false)}
                                            >
                                                <Link href="/login?mode=signup">
                                                    <span>Sign Up</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
