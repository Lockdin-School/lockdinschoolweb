import { SubjectNode } from "./SubjectNode";
import type {SubjectResponse} from "@/api/subjects/models/SubjectResponse.ts";

export function KnowledgeTree({subjects}: { subjects: SubjectResponse[]}) {
    return (
        <section className="w-full py-8">
            <div className="space-y-5">
                {subjects.map((subject) => (
                    <SubjectNode
                        key={subject.id}
                        subject={subject}
                    />
                ))}
            </div>
        </section>
    );
}