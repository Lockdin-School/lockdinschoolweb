import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/subjects/$subjectId/topics/$topicId/exercises/$materialId',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>Hello "/subjects/$subjectId/topics/$topicId/resources/$resourceId"!</div>
    )
}
