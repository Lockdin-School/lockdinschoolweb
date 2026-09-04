const SkeletonLine = ({
                          className = "",
                      }: {
    className?: string;
}) => (
    <div
        className={`animate-pulse rounded-sm bg-gray-300/60 ${className}`}
    />
);

const SkeletonParagraph = ({
                               lines = 3,
                           }: {
    lines?: number;
}) => (
    <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonLine
                key={i}
                className={`h-[18px] ${
                    i === lines - 1 ? "w-[72%]" : "w-full"
                }`}
            />
        ))}
    </div>
);

const SkeletonSection = ({
                             paragraphs = 2,
                         }: {
    paragraphs?: number;
}) => (
    <section className="flex w-full max-w-7xl flex-col items-start border-t pt-8 mt-6 max-sm:px-8">
        {/* Section heading */}
        <SkeletonLine className="h-[36px] w-[220px] mb-7" />

        <div className="w-full space-y-7">
            {Array.from({ length: paragraphs }).map((_, i) => (
                <div key={i} className="w-full">
                    {/* Subtitle */}
                    <SkeletonLine className="h-[20px] w-[280px] mb-4" />

                    {/* Paragraphs */}
                    <SkeletonParagraph lines={3} />
                </div>
            ))}
        </div>
    </section>
);

const SkeletonExample = () => (
    <div className="w-full rounded-2xl bg-[#1e2914] px-8 py-8">
        {/* Example badge */}
        <SkeletonLine className="h-[28px] w-[82px] bg-gray-300/40 mb-5" />

        {/* Example title */}
        <SkeletonLine className="h-[28px] w-[360px] bg-gray-300/40 mb-6" />

        {/* Description */}
        <div className="space-y-3 mb-7">
            <SkeletonLine className="h-[18px] w-full bg-gray-300/40" />
            <SkeletonLine className="h-[18px] w-[82%] bg-gray-300/40" />
        </div>

        {/* Steps */}
        <div className="border-l-2 border-gray-300/30 pl-4 space-y-4">
            <SkeletonLine className="h-[16px] w-[70px] bg-gray-300/40" />

            <SkeletonLine className="h-[18px] w-[90%] bg-gray-300/40" />
            <SkeletonLine className="h-[18px] w-[76%] bg-gray-300/40" />
            <SkeletonLine className="h-[18px] w-[84%] bg-gray-300/40" />
        </div>

        {/* Conclusion */}
        <div className="mt-7 rounded bg-[#0f1610] px-3 py-3">
            <SkeletonLine className="h-[16px] w-[110px] bg-gray-300/30 mb-2" />
            <SkeletonLine className="h-[16px] w-[80%] bg-gray-300/30" />
        </div>
    </div>
);

export const ConceptRendererSkeleton = () => {
    return (
        <div className="my-20 min-h-screen w-full flex flex-col items-center">

            {/* =========================================
                HERO
            ========================================= */}
            <section className="flex max-w-7xl mt-[30vh] w-full flex-col items-start justify-end max-sm:px-8">

                {/* Concept badge */}
                <SkeletonLine className="h-[28px] w-[86px] mb-3" />

                {/* Concept title */}
                <SkeletonLine className="h-[60px] w-[min(40vw,520px)] max-sm:w-[80vw]" />

            </section>


            {/* =========================================
                DEFINITIONS
            ========================================= */}
            <section className="mt-6 flex max-w-7xl w-full flex-col items-start justify-center border-t max-sm:px-8 pt-8">

                {/* Definitions heading */}
                <SkeletonLine className="h-[30px] w-[180px] mb-7" />

                <div className="w-full space-y-5">
                    {[1, 2].map((_, i) => (
                        <div
                            key={i}
                            className="mb-3 flex flex-col gap-y-3 py-3"
                        >
                            {/* Definition title */}
                            <SkeletonLine className="h-[24px] w-[260px]" />

                            {/* Definition text */}
                            <SkeletonParagraph lines={2} />
                        </div>
                    ))}
                </div>
            </section>


            {/* =========================================
                EXPLANATION
            ========================================= */}
            <SkeletonSection paragraphs={2} />


            {/* =========================================
                ANALOGY
            ========================================= */}
            <SkeletonSection paragraphs={1} />


            {/* =========================================
                EXAMPLES
            ========================================= */}
            <section className="mt-6 flex max-w-7xl w-full flex-col items-start justify-center pt-5">

                <div className="w-full space-y-6">
                    {[1, 2].map((_, i) => (
                        <SkeletonExample key={i} />
                    ))}
                </div>

            </section>


            {/* =========================================
                MISCONCEPTIONS
            ========================================= */}
            <section className="mt-6 flex max-w-7xl w-full flex-col items-start justify-center max-sm:px-8">

                {/* Heading */}
                <SkeletonLine className="h-[36px] w-[330px] mb-7" />

                <div className="w-full space-y-8">

                    {[1, 2].map((_, i) => (
                        <div key={i} className="w-full">

                            {/* Misconception */}
                            <SkeletonLine className="h-[20px] w-[150px] mb-3" />

                            <SkeletonParagraph lines={2} />

                            {/* Correction */}
                            <div className="ml-4 mt-5 border-l-2 border-gray-300/50 pl-3">

                                <SkeletonLine className="h-[20px] w-[120px] mb-3" />

                                <SkeletonParagraph lines={2} />

                            </div>

                        </div>
                    ))}

                </div>
            </section>


            {/* =========================================
                SUMMARY
            ========================================= */}
            <section className="mt-6 mb-5 flex max-w-7xl w-full flex-col items-start justify-center">

                <div className="flex h-[70vh] w-full flex-col justify-center space-y-10 bg-[#1e2914] px-8 py-12">

                    {/* Summary badge */}
                    <SkeletonLine className="h-[28px] w-[100px] bg-gray-300/40" />

                    {/* Summary text */}
                    <div className="space-y-4">
                        <SkeletonLine className="h-[20px] w-full bg-gray-300/40" />
                        <SkeletonLine className="h-[20px] w-[94%] bg-gray-300/40" />
                        <SkeletonLine className="h-[20px] w-[72%] bg-gray-300/40" />
                    </div>

                </div>

            </section>


            {/* End */}
            <SkeletonLine className="h-[20px] w-[70px] mb-10" />

        </div>
    );
};