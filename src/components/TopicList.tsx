
import { TopicCollapsible } from "@/components/TopicCollapsible.tsx";

type TopicListProps = {
    topics: any[];
    subjectId: string;
    onTopicSelect?: () => void;
};

export const TopicList = ({
                              topics,
                              subjectId,
                              onTopicSelect,
                          }: TopicListProps) => {


    return (
        <section className="gap-1 p-1 flex mb-24 flex-col w-full">
            {topics.map((topic, index) => {

                return (
                    <TopicCollapsible
                        key={topic.id}
                        topic={topic}
                        index={index}
                        subjectId={subjectId}
                        onSelect={onTopicSelect}
                    />
                );
            })}
        </section>
    );
};