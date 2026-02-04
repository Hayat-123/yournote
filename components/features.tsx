import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileText, Code2, ShieldCheck } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-black dark:text-white flex items-center justify-center gap-3">
                        <span className="text-4xl">🔥</span> Features
                    </h2>
                    <p className="mt-4 text-stone-600 dark:text-stone-400">Fast and fully responsive editor.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16 lg:max-w-none lg:grid-cols-3">
                    <Card className="group shadow-zinc-950/5 border-stone-200 bg-white dark:bg-zinc-900/50">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <FileText
                                    className="size-6 text-black dark:text-white"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-bold text-lg">Quick Notes</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-stone-600 dark:text-stone-400">Capture ideas instantly with lightning-fast input and keyboard-first UX. No friction — just flow.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 border-stone-200 bg-white dark:bg-zinc-900/50">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Code2
                                    className="size-6 text-black dark:text-white"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-bold text-lg">Developer Friendly</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">Markdown, code blocks, CLI shortcuts, and Git-style versioning. Feels like home.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 border-stone-200 bg-white dark:bg-zinc-900/50">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ShieldCheck
                                    className="size-6 text-black dark:text-white"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-bold text-lg">Secure by Design</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">Your notes are private. Local-first architecture and optional end-to-end encryption mean full control.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
