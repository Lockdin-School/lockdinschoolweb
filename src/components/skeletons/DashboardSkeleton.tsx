export function DashboardSkeleton() {
    return (
        <section className="flex h-[80vh] w-[98vw] py-5 flex-col items-center">
            <div className="w-full px-2 pb-5">
                <div className="mb-2 h-4 w-44 animate-pulse rounded bg-border" />
                <div className="h-4 w-72 animate-pulse rounded bg-border" />
            </div>

            <main className="flex w-full max-w-7xl flex-col items-start gap-5 max-sm:px-2">
                <div className="flex flex-col items-start">
                    <div className="h-8 w-24 animate-pulse rounded border border-border bg-border" />
                </div>

                <section className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
                    {Array.from({length: 6}, (_, index) => (
                        <div
                            key={index}
                            className="flex w-full flex-col gap-y-0 text-start"
                        >
                            <div className="mb-2 h-[25vh] w-full animate-pulse rounded bg-[#d3d3d3] sm:h-[20vh]" />

                            <div className="flex w-full items-center justify-between gap-x-2">
                                <div className="h-4 w-32 animate-pulse rounded bg-border" />
                                <div className="h-4 w-12 animate-pulse rounded bg-border" />
                            </div>

                            <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-border" />
                        </div>
                    ))}
                </section>
            </main>
        </section>
    );
}