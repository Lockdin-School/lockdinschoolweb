import {api} from "./client.ts";
import type {AxiosResponse} from "axios";
import type {SearchSubjectsResponse} from "./subjects/models/SubjectResponse.ts";

export const searchSubjects = async () => {
    console.log("searching subjects");

    const response: AxiosResponse<SearchSubjectsResponse> = await api.get("/subjects/");

    if (!response) {
        throw new Error("Failed to fetch subjects");
    }

    return response.data;
}