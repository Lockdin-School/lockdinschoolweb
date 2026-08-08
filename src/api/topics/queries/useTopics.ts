import {getTopicsBySubjectId} from "../topics.ts";
import {useQuery} from "@tanstack/react-query";

export const useTopics = (subjectId: string) => {
    return useQuery({
        queryKey: ["topics", "subject", subjectId],
        queryFn: () => getTopicsBySubjectId(subjectId),
        enabled: !!subjectId,
    });
};