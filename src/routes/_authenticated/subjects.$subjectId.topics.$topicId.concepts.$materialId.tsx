import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/subjects/$subjectId/topics/$topicId/concepts/$materialId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_authenticated/subjects/$subjectId/topics/$topicId/concepts/$materialId"!
    </div>
  )
}
