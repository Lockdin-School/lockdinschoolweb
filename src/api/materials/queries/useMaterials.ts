import {useQuery} from "@tanstack/react-query";
import {getMaterialsByTopicId} from "../materials.ts";

export const useMaterials = (
    topicId: string,
    enabled: boolean
) => {
    return useQuery({
        queryKey: ["materials", "topic", topicId],
        queryFn: () => getMaterialsByTopicId(topicId),
        enabled: enabled && !!topicId,
    });
};