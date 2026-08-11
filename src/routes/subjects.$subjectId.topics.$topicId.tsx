import {createFileRoute, Outlet, useParams} from '@tanstack/react-router'
import {useMaterials} from "../api/materials/queries/useMaterials.ts";
import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowLeft02Icon, ArrowRight02Icon} from "@hugeicons/core-free-icons";

export const Route = createFileRoute('/subjects/$subjectId/topics/$topicId')({
    component: TopicLayout,
})

function TopicLayout() {
    const params = useParams({
        strict: false,
    });
    const {topicId, lessonId} = params;

    const {
        data: materials = [],
        // isLoading,
        // isError,
        // error,
    } = useMaterials(topicId!, !!topicId);
    const totalNumOfMaterials = materials.length;
    const materialInView = materials.find((material) => material.material_id == lessonId);

    if (!materialInView) {
        throw new Error("No material In View found");
    }

    // const nextMaterials = materials.find((material) => material.display_order === materialInView.display_order + 1);
    const onDisplay = materialInView.display_order;

    const hasPrevious = onDisplay > materials[0].display_order;
    const hasNext = onDisplay < totalNumOfMaterials;
    // alert(index)

    return (
        <main className="w-full col-span-3 gap-10 justify-between grid grid-cols-3">
            <section className="col-span-2 gap-4 flex-col flex">
                <Outlet/>
                <div className="flex justify-between items-center">
                    <button
                        className={`flex ${!hasPrevious && "opacity-0"}  w-[6rem] justify-center items-center gap-2 text-xs p-2 text-[#a2a2a2] border border-border`}>
                        <HugeiconsIcon icon={ArrowLeft02Icon}/> Previous
                    </button>
                    <button
                        // onClick={() => }
                        className={`flex ${!hasNext && "hidden"} items-center bg-accent text-bg justify-center gap-2 text-sm w-[6rem] p-2 text-[#a2a2a2] border border-border`}>
                        Next <HugeiconsIcon icon={ArrowRight02Icon}/>
                    </button>
                </div>
            </section>
            {/*   MATERIALS WITH TYPE -- RESOURCES */}
            <aside className="w-full  h-full">
                <p className="text-[#929292] text-start text-sm">
                    RESOURCES
                </p>
            </aside>
        </main>
    );
}
