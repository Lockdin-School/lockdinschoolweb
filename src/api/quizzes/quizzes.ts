import type {AxiosResponse} from "axios";
import {content_api} from "../client.ts";
import type {Quiz} from "@/api/quizzes/models/Quiz.ts";

export const getQuizById = async (quizId: string) : Promise<Quiz> => {
    console.log(`getting quiz: ${quizId}`);
    const response: AxiosResponse<Quiz> = await content_api.get(`/quizzes/${quizId}`);

    if (!response) {
        throw new Error(`Failed to fetch material: ${quizId}`);
    }

    return response.data;
}