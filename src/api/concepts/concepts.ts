import type {AxiosResponse} from "axios";
import {content_api} from "@/api/client.ts";
import type {Concept, GetConceptsResponse} from "@/api/concepts/models/Concept.ts";

export const getConceptsByTopicId = async (topicId: string) => {
    console.log(`getting materials for topic: ${topicId}`);

    const response: AxiosResponse<GetConceptsResponse> = await content_api.get(`/topics/${topicId}/concepts`);

    if (!response) {
        throw new Error(`Failed to fetch concepts for topic : ${topicId}`);
    }

    return response.data;
}

export const getConceptById = async (conceptId: string) => {
    console.log(`getting material: ${conceptId}`);

    const response: AxiosResponse<Concept> = await content_api.get(`/concepts/${conceptId}`);

    if (!response) {
        throw new Error(`Failed to fetch concept: ${conceptId}`);
    }

    return response.data;
}