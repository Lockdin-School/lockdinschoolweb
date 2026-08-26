import type {AxiosResponse} from "axios";
import {content_api} from "../client.ts";
import type {QuizResponse} from "./models/QuizResponse.ts";

export const getQuizById = async (quizId: string) : Promise<QuizResponse> => {
    console.log(`getting quiz: ${quizId}`);
    const response: AxiosResponse<QuizResponse> = await content_api.get(`/quizzes/${quizId}`);

    if (!response) {
        throw new Error(`Failed to fetch material: ${quizId}`);
    }

    return response.data;
}