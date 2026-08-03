import type {AxiosResponse} from "axios";
import {curriculum_api} from "../client.ts";
import type {GetTopicsResponse} from "./models/TopicResponse.ts";

export const getTopicsBySubjectId = async (subjectId: string) => {
    console.log(`getting topics for subject: ${subjectId}`);

    const response: AxiosResponse<GetTopicsResponse> = await curriculum_api.get(`/subjects/${subjectId}/topics`);

    if (!response) {
        throw new Error(`Failed to fetch topics for subject: ${subjectId}`);
    }

    return response.data;
}