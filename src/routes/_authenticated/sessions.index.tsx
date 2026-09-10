import {createFileRoute} from '@tanstack/react-router'
import AppHeader from "@/components/AppHeader.tsx";

export const Route = createFileRoute('/_authenticated/sessions/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <AppHeader />
            <div className={"mt-20 w-full"}>
                <section className={"flex flex-col w-full items-start px-6"}>
                    <p>Sessions</p>
                </section>
            </div>
        </>
    )
}
