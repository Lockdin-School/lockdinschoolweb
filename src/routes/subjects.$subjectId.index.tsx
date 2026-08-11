import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/subjects/$subjectId/')({
    component: SubjectOverviewPage,
})

function SubjectOverviewPage() {
    return <div>Hello Subject Overview!</div>
}
