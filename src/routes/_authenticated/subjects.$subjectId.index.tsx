import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/subjects/$subjectId/')({
    component: SubjectOverviewPage,
})

function SubjectOverviewPage() {
    return <div className="mt-16 py-5">Hello Subject Overview!</div>
}
