import {useQuery} from "@tanstack/react-query";
import {getMaterialById, getMaterialsByTopicId} from "../materials.ts";

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

export const useMaterial = (materialId: string) => {
    return useQuery({
        queryKey: ["materials", materialId],
        queryFn: () => getMaterialById(materialId),
    })
};