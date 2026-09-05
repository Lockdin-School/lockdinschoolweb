import { createFileRoute, Outlet, useParams } from '@tanstack/react-router';
import { useMaterials } from "@/api/materials/queries/useMaterials.ts";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

export const Route = createFileRoute('/_authenticated/subjects/$subjectId/topics/$topicId')({
    component: TopicLayout,
});

function TopicLayout() {
    const params = useParams({ strict: false });
    const { topicId, materialId } = params;

    // Fetch materials.
    // Ensure your useMaterials hook handles the case where topicId is missing gracefully.
    const {
        data: materials = [],
        isLoading,
        isError,
        error,
    } = useMaterials(topicId!, !!topicId);

    // 1. Handle Loading State
    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p>Loading content...</p>
            </div>
        );
    }

    // 2. Handle Error State
    if (isError) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-red-500">
                <p>Error loading materials</p>
                <pre className="text-xs">{error?.message}</pre>
            </div>
        );
    }

    // 4. Safe Lookup
    const materialInView = materials.find(
        (material) => material.material_id === materialId
    );

    // 5. Handle "Material Not Found" (e.g., URL is valid, but data hasn't loaded yet or ID is wrong)
    if (!materialInView ) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                <p>Material not found in current batch</p>
                <p className="text-xs">Topic ID: {topicId}, Material Id: {materialId}</p>
                <p className="text-xs">Total materials loaded: {materials.length}</p>
                {/* Optional: Render a fallback or just the empty state */}
            </div>
        );
    }

    const totalNumOfMaterials = materials.length;
    const onDisplay = materialInView.display_order;

    // Safety checks for navigation logic
    const hasPrevious = materials.length > 0 && onDisplay > materials[0].display_order;
    const hasNext = onDisplay < totalNumOfMaterials - 1; // Corrected logic: index < total - 1

    return (
        <main className="w-full col-span-3 max-md:grid-cols-1 gap-10 justify-between grid grid-cols-3">
            <section className="col-span-2  gap-4 flex-col flex">
                {/* Render the actual lesson content */}
                <Outlet />

                <div className="flex justify-between  items-center my-5">
                    <button
                        className={`flex justify-center items-center gap-2 text-xs p-2 text-[#a2a2a2] border border-border ${
                            !hasPrevious ? 'opacity-0 cursor-default' : 'hover:bg-gray-100 cursor-pointer'
                        } w-[6rem]`}
                        onClick={() => {
                            // Implement previous logic here
                            console.log('Previous');
                        }}
                    >
                        <HugeiconsIcon icon={ArrowLeft02Icon} /> Previous
                    </button>

                    <button
                        className={`flex items-center bg-accent text-bg justify-center gap-2 text-sm w-[6rem] p-2 border border-border ${
                            !hasNext ? 'hidden' : 'cursor-pointer'
                        }`}
                        onClick={() => {
                            // Implement next logic here
                            console.log('Next');
                        }}
                    >
                        Next <HugeiconsIcon icon={ArrowRight02Icon} />
                    </button>
                </div>
            </section>

            <aside className="w-full lg:block hidden h-full">
                <p className="text-[#929292] text-start text-sm">RESOURCES</p>
                {/* Add your resources list here */}
            </aside>
        </main>
    );
}