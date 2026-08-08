import type {AxiosResponse} from "axios";
import {content_api} from "../client.ts";
import type {GetMaterialsResponse, MaterialResponseDTO} from "./models/MaterialResponse.ts";

export const getMaterialsByTopicId = async (topicId: string) => {
    console.log(`getting materials for topic: ${topicId}`);

    const response: AxiosResponse<GetMaterialsResponse> = await content_api.get(`/topics/${topicId}/materials`);

    if (!response) {
        throw new Error(`Failed to fetch materials for topic : ${topicId}`);
    }

    return response.data;
}

export const getMaterialById = async (materialId: string) : Promise<MaterialResponseDTO> => {
    console.log(`getting material: ${materialId}`);
    const response: AxiosResponse<MaterialResponseDTO> = await content_api.get(`/materials/${materialId}`);

    if (!response) {
        throw new Error(`Failed to fetch material: ${materialId}`);
    }

    return response.data;
}