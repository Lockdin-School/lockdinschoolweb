import {createFileRoute, useNavigate} from '@tanstack/react-router'
import AppHeader from "@/components/AppHeader.tsx";

export const Route = createFileRoute('/_authenticated/sessions/')({
    component: RouteComponent,
})

const classes = [
    {
        className: "Mathematics",
    },
    {
        className: "Physics",
    },
    {
        className: "Chemistry",
    },
    {
        className: "Life Sciences",
    }
]

function RouteComponent() {
    const navigate = useNavigate();
    return (
        <>
            <AppHeader />
            <div className={"mt-20 flex flex-col items-center w-full"}>
                <section className={"flex flex-col space-y-10 max-w-7xl w-full items-start px-6"}>
                    <p className="text-lg">Sessions</p>

                    <div className="w-full space-y-5">
                        {
                            classes.map(({className}, index) => (
                                <div key={index} className={"text-start border-b w-full"}>
                                    <button
                                        className="font-geist-semibold text-xl text-left tracking-tighter"
                                        onClick={() => {void navigate({to: "/sessions/$className", params: {className}})}}
                                    >
                                        {className}
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        </>
    )
}
