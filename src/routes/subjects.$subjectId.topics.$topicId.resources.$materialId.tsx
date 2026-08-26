
import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute(
    '/subjects/$subjectId/topics/$topicId/resources/$materialId',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>Hello "/subjects/$subjectId/topics/$topicId/resources/$resourceId"!</div>
    )
}
