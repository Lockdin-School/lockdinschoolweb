import {createFileRoute, useParams} from '@tanstack/react-router'
import {useConcept} from "@/api/concepts/queries/useConcepts.ts";
import {ConceptRenderer} from "@/features/concepts/components/ConceptRenderer.tsx";
import ConceptHeader from "@/components/headers/ConceptHeader.tsx";
import {ConceptRendererSkeleton} from "@/components/skeletons/ConceptRendererSkeleton.tsx";


export const Route = createFileRoute(
  '/_authenticated/concepts/$materialId',
)({
  component: ConceptPage,
})

function ConceptPage() {
    const {materialId} = useParams({
        from: "/_authenticated/concepts/$materialId"
    });

    const {
        data: concept,
        isLoading: conceptIsLoading,
        isError: conceptIsError,
        error: conceptError,
    } = useConcept(materialId);

  return (
    <>
        <ConceptHeader />
        <div className="w-full flex flex-col">
            {conceptIsLoading && <ConceptRendererSkeleton  />}
            {conceptIsError && <p>{conceptError.message}</p>}
            {concept && <ConceptRenderer concept={concept} />}
        </div>
    </>
  )
}
