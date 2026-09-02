import { SubjectNode } from "./SubjectNode";
import { subjects } from "../data/subjects";

export function KnowledgeTree() {
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