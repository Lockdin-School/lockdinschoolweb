import type {AxiosResponse} from "axios";
import {content_api} from "../client.ts";
import type {GetMaterialsResponse} from "./models/MaterialResponse.ts";

export const getMaterialsByTopicId = async (topicId: string) => {
    console.log(`getting materials for topic: ${topicId}`);

    const response: AxiosResponse<GetMaterialsResponse> = await content_api.get(`/topics/${topicId}/materials`);

    if (!response) {
        throw new Error(`Failed to fetch materials for topic : ${topicId}`);
    }

    return response.data;
}