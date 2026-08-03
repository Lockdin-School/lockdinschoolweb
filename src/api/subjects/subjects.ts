import {curriculum_api} from "../client.ts";
import type {AxiosResponse} from "axios";
import type {SearchSubjectsResponse} from "./models/SubjectResponse.ts";

export const searchSubjects = async () => {
    console.log("searching subjects");
    const response: AxiosResponse<SearchSubjectsResponse> = await curriculum_api.get("/subjects/");

    if (!response) {
        throw new Error("Failed to fetch subjects");
    }

    return response.data;
}