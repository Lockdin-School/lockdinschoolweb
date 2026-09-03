import {useQuery} from "@tanstack/react-query";
import {getConceptById, getConceptsByTopicId} from "@/api/concepts/concepts.ts";


export const useConcepts = (
    topicId: string,
    enabled: boolean
) => {
    return useQuery({
        queryKey: ["concepts", "topic", topicId],
        queryFn: () => getConceptsByTopicId(topicId),
        enabled: enabled && !!topicId,
    });
};

export const useConcept = (conceptId: string) => {
    return useQuery({
        queryKey: ["concepts", conceptId],
        queryFn: () => getConceptById(conceptId),
    })
};