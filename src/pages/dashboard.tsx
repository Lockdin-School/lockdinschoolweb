import {ArrowDownFreeIcons} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import type {SearchSubjectsResponse} from "../api/subjects/models/SubjectResponse.ts";
import {Link} from "react-router";
import AppHeader from "../components/AppHeader.tsx";
import {searchSubjects} from "../api/subjects/subjects.ts";

const Dashboard = () => {

    const [subjects, setSubjects] = useState<SearchSubjectsResponse>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const subjects = await searchSubjects();
                setSubjects(subjects);
            } catch (e) {
                console.error("Error fetching subjects: ", e);
            }
        };

        fetchSubjects().then();
    }, []);

    return (
        <div className="w-full h-full flex gap-10 flex-col items-center">
            <AppHeader />
            <section className="flex w-[98vw] h-[80vh]">
                <aside className="w-[20vw] h-full flex flex-col items-start">
                    <p className="text-xs text-[#a2a2a2] flex items-center gap-1 border-border py-2 px-3 border">
                        Filters <HugeiconsIcon size={20} icon={ArrowDownFreeIcons} />
                    </p>
                </aside>
                <main className="w-[60vw] gap-5 flex flex-col items-start">
                    <div className="flex flex-col items-start">
                        <p className="w-full text-xs tracking-tight text-[#a2a2a2] border py-2 px-3 border-border self-start">Subjects</p>
                    </div>
                    <section className="grid gap-3 elevation-1 w-full grid-cols-3">
                        {
                            subjects.map((subject, index) => (
                                <Link to={`/subjects/${subject.id}`} key={index} className="text-start gap-y-0 hover:cursor-pointer w-full flex flex-col  border-border ">
                                    <div className="h-[20vh] mb-2 w-full bg-accent" />
                                    <div className="flex gap-x-2 w-full justify-between items-center">
                                        <p className="tracking-tight text-[#b2b2b2] text-sm">{subject.title}</p>
                                        {/*<p className="text-[#929292] inline-block">{ "·" }</p>*/}
                                        <p className="tracking-tight text-sm text-[#929292] text-sm">{subject.code}</p>
                                    </div>
                                    <p className="tracking-tight text-[#929292] text-xs">{subject.description}</p>
                                    <p className="tracking-tight text-[#929292] text-xs">Estimated hours: 2{subject.estimatedHours}hrs</p>
                                </Link>
                                )
                            )
                        }
                    </section>
                </main>
            </section>
        </div>
    )
};

export default Dashboard;
