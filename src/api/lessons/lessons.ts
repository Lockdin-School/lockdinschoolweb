import type {AxiosResponse} from "axios";
import {content_api} from "../client.ts";
import type {LessonResponse} from "./models/LessonResponse.ts";

export const getLessonById = async (lessonId: string) : Promise<LessonResponse> => {
    console.log(`getting lesson: ${lessonId}`);
    const response: AxiosResponse<LessonResponse> = await content_api.get(`/lessons/${lessonId}`);

    if (!response) {
        throw new Error(`Failed to fetch material: ${lessonId}`);
    }

    return response.data;
}